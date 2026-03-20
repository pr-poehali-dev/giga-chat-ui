import Icon from '@/components/ui/icon';

type Section = 'chats' | 'contacts' | 'search' | 'notifications' | 'settings' | 'profile';

interface SidebarProps {
  active: Section;
  onChange: (s: Section) => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const items: { id: Section; icon: string; label: string }[] = [
  { id: 'chats', icon: 'MessageCircle', label: 'Чаты' },
  { id: 'contacts', icon: 'Users', label: 'Контакты' },
  { id: 'search', icon: 'Search', label: 'Поиск' },
  { id: 'notifications', icon: 'Bell', label: 'Уведомления' },
];

const bottomItems: { id: Section; icon: string; label: string }[] = [
  { id: 'settings', icon: 'Settings', label: 'Настройки' },
  { id: 'profile', icon: 'User', label: 'Профиль' },
];

export default function Sidebar({ active, onChange, darkMode, onToggleDark }: SidebarProps) {
  return (
    <div className="flex flex-col h-full items-center py-4 gap-1 bg-card border-r border-border" style={{ width: 'var(--gc-nav-width)' }}>
      {/* Logo */}
      <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3 text-white font-bold text-sm flex-shrink-0"
        style={{ background: 'hsl(var(--gc-accent))' }}>
        G
      </div>

      {/* Nav */}
      <div className="flex flex-col gap-1 flex-1">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            title={item.label}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${
              active === item.id
                ? 'text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
            style={active === item.id ? { background: 'hsl(var(--gc-accent))' } : {}}
          >
            <Icon name={item.icon} size={20} />
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-1">
        <button
          onClick={onToggleDark}
          title={darkMode ? 'Светлая тема' : 'Тёмная тема'}
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
        >
          <Icon name={darkMode ? 'Sun' : 'Moon'} size={18} />
        </button>
        {bottomItems.map(item => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            title={item.label}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all active:scale-90 ${
              active === item.id
                ? 'text-white'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
            style={active === item.id ? { background: 'hsl(var(--gc-accent))' } : {}}
          >
            <Icon name={item.icon} size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}
