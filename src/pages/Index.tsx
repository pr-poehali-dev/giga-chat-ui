import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ChatList from '@/components/chat/ChatList';
import ChatWindow from '@/components/chat/ChatWindow';
import ContactsSection from '@/components/sections/ContactsSection';
import SearchSection from '@/components/sections/SearchSection';
import NotificationsSection from '@/components/sections/NotificationsSection';
import SettingsSection from '@/components/sections/SettingsSection';
import ProfileSection from '@/components/sections/ProfileSection';
import Icon from '@/components/ui/icon';
import { chats } from '@/data/mockData';
import type { Chat } from '@/data/mockData';

type Section = 'chats' | 'contacts' | 'search' | 'notifications' | 'settings' | 'profile';

export default function Index() {
  const [section, setSection] = useState<Section>('chats');
  const [activeChat, setActiveChat] = useState<Chat | null>(chats[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const filteredChats = searchQuery
    ? chats.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : chats;

  const handleSelectChat = (chat: Chat) => {
    setActiveChat(chat);
    setMobileView('chat');
  };

  const renderPanel = () => {
    switch (section) {
      case 'chats': return (
        <div className="flex flex-col h-full">
          <div className="px-4 py-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Чаты</h2>
              <button className="p-1.5 rounded-xl hover:bg-secondary transition-colors">
                <Icon name="PenSquare" size={18} className="text-muted-foreground" />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-secondary rounded-2xl px-3 h-10">
              <Icon name="Search" size={16} className="text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск по чатам..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            <ChatList chats={filteredChats} activeId={activeChat?.id ?? null} onSelect={handleSelectChat} />
          </div>
        </div>
      );
      case 'contacts': return <ContactsSection />;
      case 'search': return <SearchSection />;
      case 'notifications': return <NotificationsSection />;
      case 'settings': return <SettingsSection />;
      case 'profile': return <ProfileSection />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* Vertical nav */}
      <Sidebar active={section} onChange={setSection} darkMode={darkMode} onToggleDark={() => setDarkMode(d => !d)} />

      {/* Left panel */}
      <div
        className={`flex-shrink-0 border-r border-border bg-card flex flex-col overflow-hidden
          ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'}
        `}
        style={{ width: 'var(--gc-sidebar-width)' }}
      >
        {renderPanel()}
      </div>

      {/* Right — chat or empty state */}
      <div className={`flex-1 flex flex-col overflow-hidden bg-background ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>
        {activeChat && section === 'chats' ? (
          <ChatWindow
            key={activeChat.id}
            chat={activeChat}
            onBack={() => setMobileView('list')}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3">
            <div className="w-16 h-16 rounded-3xl bg-secondary flex items-center justify-center">
              <Icon name="MessageCircle" size={28} className="opacity-40" />
            </div>
            <p className="text-sm">
              {section === 'chats' ? 'Выберите чат для начала общения' : 'Переключитесь на чаты'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
