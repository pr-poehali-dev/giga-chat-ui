import Avatar from '@/components/chat/Avatar';
import Icon from '@/components/ui/icon';

const notifications = [
  { id: '1', avatar: 'АГ', name: 'Анастасия Громова', text: 'Отправила голосовое сообщение', time: '2 мин назад', unread: true },
  { id: '2', avatar: '🎨', name: 'Команда дизайна', text: 'Виктория: Правки отправила', time: '40 мин назад', unread: true },
  { id: '3', avatar: 'АН', name: 'Андрей Новиков', text: 'Пришли документы по проекту', time: '2 часа назад', unread: true },
  { id: '4', avatar: 'МО', name: 'Максим Орлов', text: 'Отправил голосовое сообщение', time: 'Вчера', unread: false },
  { id: '5', avatar: 'ДК', name: 'Дмитрий Карпов', text: 'Ок, договорились!', time: 'Вчера', unread: false },
];

export default function NotificationsSection() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold">Уведомления</h2>
        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          Прочитать все
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {notifications.map((n, i) => (
          <div
            key={n.id}
            className={`flex items-start gap-3 px-3 py-3 rounded-2xl transition-all animate-fade-in cursor-pointer hover:bg-secondary ${n.unread ? 'bg-secondary/40' : ''}`}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <Avatar label={n.avatar} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`text-sm ${n.unread ? 'font-semibold' : 'font-medium'}`}>{n.name}</span>
                <span className="text-[11px] text-muted-foreground">{n.time}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.text}</p>
            </div>
            {n.unread && (
              <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'hsl(var(--gc-accent))' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
