import { useState } from 'react';
import Avatar from '@/components/chat/Avatar';
import Icon from '@/components/ui/icon';
import { chats, contacts } from '@/data/mockData';

export default function SearchSection() {
  const [query, setQuery] = useState('');

  const matchedChats = query
    ? chats.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.lastMessage.toLowerCase().includes(query.toLowerCase()))
    : [];
  const matchedContacts = query
    ? contacts.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-3">Поиск</h2>
        <div className="flex items-center gap-2 bg-secondary rounded-2xl px-3 h-10">
          <Icon name="Search" size={16} className="text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Поиск по сообщениям и людям..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
              <Icon name="X" size={14} />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {!query && (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <Icon name="Search" size={36} className="mb-3 opacity-30" />
            <p className="text-sm">Введите запрос для поиска</p>
          </div>
        )}
        {matchedChats.length > 0 && (
          <>
            <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">Чаты</div>
            {matchedChats.map(c => (
              <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-secondary transition-all animate-fade-in">
                <Avatar label={c.avatar} online={c.online} size="sm" />
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.lastMessage}</div>
                </div>
              </div>
            ))}
          </>
        )}
        {matchedContacts.length > 0 && (
          <>
            <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">Контакты</div>
            {matchedContacts.map(c => (
              <div key={c.id} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-secondary transition-all animate-fade-in">
                <Avatar label={c.avatar} online={c.online} size="sm" />
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.status}</div>
                </div>
              </div>
            ))}
          </>
        )}
        {query && matchedChats.length === 0 && matchedContacts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <Icon name="SearchX" size={36} className="mb-3 opacity-30" />
            <p className="text-sm">Ничего не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
}
