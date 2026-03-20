
CREATE TABLE IF NOT EXISTS t_p34824601_giga_chat_ui.users (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  avatar        TEXT NOT NULL DEFAULT '',
  status        TEXT NOT NULL DEFAULT 'На связи',
  online        BOOLEAN NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p34824601_giga_chat_ui.sessions (
  id         SERIAL PRIMARY KEY,
  token      TEXT NOT NULL UNIQUE,
  user_id    INTEGER NOT NULL REFERENCES t_p34824601_giga_chat_ui.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days')
);

CREATE INDEX IF NOT EXISTS idx_sessions_token   ON t_p34824601_giga_chat_ui.sessions(token);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON t_p34824601_giga_chat_ui.sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_users_email      ON t_p34824601_giga_chat_ui.users(email);
