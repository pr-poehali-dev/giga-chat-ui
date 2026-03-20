import Icon from '@/components/ui/icon';

const groups = [
  {
    title: 'Аккаунт',
    items: [
      { icon: 'User', label: 'Личные данные', desc: 'Имя, фото, статус' },
      { icon: 'Shield', label: 'Конфиденциальность', desc: 'Кто видит ваш статус' },
      { icon: 'Lock', label: 'Безопасность', desc: 'Пароль, двухфакторная' },
    ],
  },
  {
    title: 'Приложение',
    items: [
      { icon: 'Bell', label: 'Уведомления', desc: 'Звук, вибрация' },
      { icon: 'Palette', label: 'Оформление', desc: 'Тема, размер шрифта' },
      { icon: 'HardDrive', label: 'Хранилище', desc: 'Кэш, автозагрузка' },
    ],
  },
  {
    title: 'Связь',
    items: [
      { icon: 'Phone', label: 'Звонки', desc: 'Качество, шумоподавление' },
      { icon: 'Mic', label: 'Голосовые', desc: 'Автоотправка, качество' },
    ],
  },
];

export default function SettingsSection() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-lg font-semibold">Настройки</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {groups.map((group, gi) => (
          <div key={gi} className="mb-2">
            <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">{group.title}</div>
            <div className="bg-card rounded-2xl overflow-hidden border border-border">
              {group.items.map((item, ii) => (
                <button
                  key={ii}
                  className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary transition-all text-left ${
                    ii < group.items.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
                    <Icon name={item.icon} size={16} className="text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
