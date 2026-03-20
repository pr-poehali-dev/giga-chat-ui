import Avatar from './Avatar';
import type { Chat } from '@/data/mockData';

interface ChatListProps {
  chats: Chat[];
  activeId: string | null;
  onSelect: (chat: Chat) => void;
}

export default function ChatList({ chats, activeId, onSelect }: ChatListProps) {
  return (
    <div className="flex flex-col gap-0.5 px-2">
      {chats.map((chat, i) => (
        <button
          key={chat.id}
          onClick={() => onSelect(chat)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all text-left group animate-fade-in ${
            activeId === chat.id
              ? 'bg-secondary'
              : 'hover:bg-secondary/60'
          }`}
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <Avatar label={chat.avatar} online={chat.online} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm truncate">{chat.name}</span>
              <span className="text-[11px] text-muted-foreground ml-2 flex-shrink-0">{chat.lastTime}</span>
            </div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-xs text-muted-foreground truncate">{chat.lastMessage}</span>
              {chat.unread > 0 && (
                <span
                  className="ml-2 flex-shrink-0 min-w-[18px] h-[18px] text-[10px] font-bold text-white rounded-full flex items-center justify-center px-1"
                  style={{ background: 'hsl(var(--gc-accent))' }}
                >
                  {chat.unread}
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
