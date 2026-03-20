import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import Avatar from './Avatar';
import MessageBubble from './MessageBubble';
import CallScreen from './CallScreen';
import type { Chat, Message } from '@/data/mockData';

interface ChatWindowProps {
  chat: Chat;
  onBack?: () => void;
}

export default function ChatWindow({ chat, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [inCall, setInCall] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const recordInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendText = () => {
    if (!input.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      from: 'me',
      type: 'text',
      text: input.trim(),
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setMessages(prev => [...prev, msg]);
    setInput('');
  };

  const startRecord = () => {
    setRecording(true);
    setRecordTime(0);
    recordInterval.current = setInterval(() => setRecordTime(t => t + 1), 1000);
  };

  const stopRecord = () => {
    setRecording(false);
    if (recordInterval.current) clearInterval(recordInterval.current);
    if (recordTime < 1) { setRecordTime(0); return; }
    const msg: Message = {
      id: Date.now().toString(),
      from: 'me',
      type: 'voice',
      duration: recordTime,
      time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setMessages(prev => [...prev, msg]);
    setRecordTime(0);
  };

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="flex flex-col h-full">
      {inCall && (
        <CallScreen name={chat.name} avatar={chat.avatar} onEnd={() => setInCall(false)} />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
        {onBack && (
          <button onClick={onBack} className="p-1.5 rounded-xl hover:bg-secondary transition-colors mr-1">
            <Icon name="ArrowLeft" size={20} />
          </button>
        )}
        <Avatar label={chat.avatar} online={chat.online} size="md" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm truncate">{chat.name}</div>
          <div className="text-xs text-muted-foreground">{chat.online ? 'В сети' : 'Был(а) недавно'}</div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setInCall(true)}
            className="p-2 rounded-xl hover:bg-secondary transition-colors text-foreground"
          >
            <Icon name="Phone" size={18} />
          </button>
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors text-foreground">
            <Icon name="Search" size={18} />
          </button>
          <button className="p-2 rounded-xl hover:bg-secondary transition-colors text-foreground">
            <Icon name="MoreVertical" size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-border bg-card/80 backdrop-blur-sm">
        {recording ? (
          <div className="flex items-center gap-3 h-11 px-4 bg-secondary rounded-2xl">
            <div className="w-2 h-2 rounded-full bg-destructive" style={{ animation: 'recordPulse 1s ease-in-out infinite' }} />
            <span className="text-sm font-medium text-destructive tabular-nums">{fmt(recordTime)}</span>
            <span className="text-xs text-muted-foreground flex-1">Идёт запись...</span>
            <button
              onMouseUp={stopRecord}
              onTouchEnd={stopRecord}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Отправить
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-secondary rounded-2xl px-3.5 h-11">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendText()}
                placeholder="Сообщение..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {input.trim() ? (
              <button
                onClick={sendText}
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-all active:scale-90"
                style={{ background: 'hsl(var(--gc-accent))' }}
              >
                <Icon name="Send" size={18} />
              </button>
            ) : (
              <button
                onMouseDown={startRecord}
                onTouchStart={startRecord}
                onMouseUp={stopRecord}
                onTouchEnd={stopRecord}
                className="w-11 h-11 rounded-2xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors active:scale-90"
              >
                <Icon name="Mic" size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
