"""
Авторизация GigaChat: регистрация, вход, выход, проверка сессии.
POST /register  — создать аккаунт
POST /login     — войти
POST /logout    — выйти
GET  /me        — получить данные текущего пользователя
"""
import json
import os
import hashlib
import secrets
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p34824601_giga_chat_ui")
CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Auth-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(pwd: str) -> str:
    return hashlib.sha256(pwd.encode()).hexdigest()


def make_token() -> str:
    return secrets.token_hex(32)


def get_initials(name: str) -> str:
    parts = name.strip().split()
    if len(parts) >= 2:
        return (parts[0][0] + parts[1][0]).upper()
    return name[:2].upper() if name else "??"


def resp(status: int, data: dict) -> dict:
    return {
        "statusCode": status,
        "headers": {**CORS, "Content-Type": "application/json"},
        "body": json.dumps(data, ensure_ascii=False),
    }


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    qs = event.get("queryStringParameters") or {}
    action = qs.get("action", "")

    # --- REGISTER ---
    if action == "register" and method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = (body.get("name") or "").strip()
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not name or not email or not password:
            return resp(400, {"error": "Заполните все поля"})
        if len(password) < 6:
            return resp(400, {"error": "Пароль должен быть не менее 6 символов"})

        pw_hash = hash_password(password)
        avatar = get_initials(name)
        token = make_token()

        conn = get_conn()
        cur = conn.cursor()
        try:
            cur.execute(
                f"INSERT INTO {SCHEMA}.users (name, email, password_hash, avatar) VALUES (%s, %s, %s, %s) RETURNING id",
                (name, email, pw_hash, avatar),
            )
            user_id = cur.fetchone()[0]
            cur.execute(
                f"INSERT INTO {SCHEMA}.sessions (token, user_id) VALUES (%s, %s)",
                (token, user_id),
            )
            conn.commit()
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            return resp(409, {"error": "Email уже зарегистрирован"})
        finally:
            cur.close()
            conn.close()

        return resp(200, {
            "token": token,
            "user": {"id": user_id, "name": name, "email": email, "avatar": avatar, "status": "На связи"},
        })

    # --- LOGIN ---
    if action == "login" and method == "POST":
        body = json.loads(event.get("body") or "{}")
        email = (body.get("email") or "").strip().lower()
        password = body.get("password") or ""

        if not email or not password:
            return resp(400, {"error": "Введите email и пароль"})

        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT id, name, email, avatar, status FROM {SCHEMA}.users WHERE email=%s AND password_hash=%s",
            (email, pw_hash),
        )
        row = cur.fetchone()
        if not row:
            cur.close()
            conn.close()
            return resp(401, {"error": "Неверный email или пароль"})

        user_id, name, email_db, avatar, status = row
        token = make_token()
        cur.execute(
            f"INSERT INTO {SCHEMA}.sessions (token, user_id) VALUES (%s, %s)",
            (token, user_id),
        )
        cur.execute(f"UPDATE {SCHEMA}.users SET online=TRUE WHERE id=%s", (user_id,))
        conn.commit()
        cur.close()
        conn.close()

        return resp(200, {
            "token": token,
            "user": {"id": user_id, "name": name, "email": email_db, "avatar": avatar, "status": status},
        })

    # --- LOGOUT ---
    if action == "logout" and method == "POST":
        token = event.get("headers", {}).get("X-Auth-Token", "")
        if not token:
            return resp(400, {"error": "Токен не передан"})

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT user_id FROM {SCHEMA}.sessions WHERE token=%s AND expires_at > NOW()",
            (token,),
        )
        row = cur.fetchone()
        if row:
            cur.execute(f"UPDATE {SCHEMA}.users SET online=FALSE WHERE id=%s", (row[0],))
        cur.execute(f"UPDATE {SCHEMA}.sessions SET expires_at=NOW() WHERE token=%s", (token,))
        conn.commit()
        cur.close()
        conn.close()
        return resp(200, {"ok": True})

    # --- ME ---
    if action == "me" and method == "GET":
        token = event.get("headers", {}).get("X-Auth-Token", "")
        if not token:
            return resp(401, {"error": "Не авторизован"})

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""
            SELECT u.id, u.name, u.email, u.avatar, u.status
            FROM {SCHEMA}.sessions s
            JOIN {SCHEMA}.users u ON u.id = s.user_id
            WHERE s.token=%s AND s.expires_at > NOW()
            """,
            (token,),
        )
        row = cur.fetchone()
        cur.close()
        conn.close()

        if not row:
            return resp(401, {"error": "Сессия истекла"})

        user_id, name, email, avatar, status = row
        return resp(200, {"user": {"id": user_id, "name": name, "email": email, "avatar": avatar, "status": status}})

    return resp(404, {"error": "Маршрут не найден"})