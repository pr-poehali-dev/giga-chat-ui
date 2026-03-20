import { useState } from 'react';
import Avatar from '@/components/chat/Avatar';
import Icon from '@/components/ui/icon';
import { contacts } from '@/data/mockData';

export default function ContactsSection() {
  const [search, setSearch] = useState('');
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const groups = filtered.reduce<Record<string, typeof contacts>>((acc, c) => {
    const letter = c.name[0];
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(c);
    return acc;
  }, {});

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-3">Контакты</h2>
        <div className="flex items-center gap-2 bg-secondary rounded-2xl px-3 h-10">
          <Icon name="Search" size={16} className="text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск контактов..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {Object.entries(groups).sort().map(([letter, group]) => (
          <div key={letter}>
            <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">{letter}</div>
            {group.map((c, i) => (
              <button key={c.id} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-secondary transition-all text-left animate-fade-in"
                style={{ animationDelay: `${i * 30}ms` }}>
                <Avatar label={c.avatar} online={c.online} size="sm" />
                <div>
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.status}</div>
                </div>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
