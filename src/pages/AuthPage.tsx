import { useState } from 'react';
import { register, login } from '@/api/auth';
import { useAuth } from '@/context/AuthContext';
import Icon from '@/components/ui/icon';

export default function AuthPage() {
  const { setAuth } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = mode === 'register'
        ? await register(name, email, password)
        : await login(email, password);

      if (data.error) {
        setError(data.error);
      } else {
        setAuth(data.user, data.token);
      }
    } catch {
      setError('Ошибка сети. Попробуйте снова.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm animate-scale-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-3xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg"
            style={{ background: 'hsl(var(--gc-accent))' }}
          >
            G
          </div>
          <h1 className="text-2xl font-bold">GigaChat</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === 'login' ? 'Войдите в свой аккаунт' : 'Создайте аккаунт'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
          <form onSubmit={submit} className="flex flex-col gap-3">
            {mode === 'register' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Имя</label>
                <input
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Алексей Петров"
                  className="h-11 px-4 rounded-2xl bg-secondary text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--gc-accent))] transition-all placeholder:text-muted-foreground"
                />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-11 px-4 rounded-2xl bg-secondary text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--gc-accent))] transition-all placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Пароль</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Минимум 6 символов"
                  className="w-full h-11 px-4 pr-11 rounded-2xl bg-secondary text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--gc-accent))] transition-all placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name={showPwd ? 'EyeOff' : 'Eye'} size={16} />
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/8 rounded-2xl px-3 py-2.5 animate-fade-in">
                <Icon name="AlertCircle" size={15} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-2xl text-sm font-semibold text-white mt-1 transition-all active:scale-95 disabled:opacity-60"
              style={{ background: 'hsl(var(--gc-accent))' }}
            >
              {loading ? 'Загрузка...' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </form>
        </div>

        {/* Switch */}
        <p className="text-center text-sm text-muted-foreground mt-5">
          {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
          <button
            onClick={() => { setMode(m => m === 'login' ? 'register' : 'login'); setError(''); }}
            className="font-semibold transition-colors"
            style={{ color: 'hsl(var(--gc-accent))' }}
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
}
