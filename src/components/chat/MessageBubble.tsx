import Icon from '@/components/ui/icon';
import VoiceMessage from './VoiceMessage';
import type { Message } from '@/data/mockData';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const outgoing = message.from === 'me';

  return (
    <div className={`flex ${outgoing ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div
        className={`max-w-[72%] px-4 py-2.5 rounded-2xl ${
          outgoing
            ? 'rounded-br-sm text-white'
            : 'rounded-bl-sm bg-[hsl(var(--gc-bubble-in))] text-foreground'
        }`}
        style={outgoing ? { background: 'hsl(var(--gc-bubble-out))', color: 'hsl(var(--gc-bubble-out-fg))' } : {}}
      >
        {message.type === 'voice' ? (
          <VoiceMessage duration={message.duration ?? 10} outgoing={outgoing} />
        ) : (
          <p className="text-sm leading-relaxed break-words">{message.text}</p>
        )}
        <div className={`flex items-center gap-1 mt-1 justify-end ${outgoing ? 'text-white/50' : 'text-muted-foreground'}`}>
          <span className="text-[10px]">{message.time}</span>
          {outgoing && (
            <Icon
              name={message.read ? 'CheckCheck' : 'Check'}
              size={12}
              className={message.read ? 'text-sky-300' : ''}
            />
          )}
        </div>
      </div>
    </div>
  );
}
