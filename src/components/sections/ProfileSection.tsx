import Icon from '@/components/ui/icon';

export default function ProfileSection() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold">Профиль</h2>
        <button className="text-sm font-medium hover:text-muted-foreground transition-colors" style={{ color: 'hsl(var(--gc-accent))' }}>
          Изменить
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="flex flex-col items-center py-8 px-4 border-b border-border">
          <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center text-2xl font-bold mb-3 text-foreground relative">
            АП
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-card" />
          </div>
          <div className="font-semibold text-lg">Алексей Петров</div>
          <div className="text-sm text-muted-foreground mt-0.5">+7 (999) 123-45-67</div>
          <div className="mt-2 px-3 py-1 bg-secondary rounded-full text-xs text-muted-foreground">
            Привет! Я использую GigaChat 👋
          </div>
        </div>

        {/* Info */}
        <div className="px-2 py-2">
          <div className="bg-card rounded-2xl overflow-hidden border border-border">
            {[
              { icon: 'Mail', label: 'Email', value: 'alex@gigachat.ru' },
              { icon: 'MapPin', label: 'Город', value: 'Москва' },
              { icon: 'Calendar', label: 'Дата рег.', value: 'Март 2024' },
            ].map((item, i, arr) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
                  <Icon name={item.icon} size={16} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                  <div className="text-sm font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-2 py-2">
          <div className="bg-card rounded-2xl overflow-hidden border border-border">
            <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-all text-left text-destructive">
              <div className="w-8 h-8 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Icon name="LogOut" size={16} className="text-destructive" />
              </div>
              <span className="text-sm font-medium">Выйти из аккаунта</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
