import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import Avatar from './Avatar';

interface CallScreenProps {
  name: string;
  avatar: string;
  onEnd: () => void;
}

export default function CallScreen({ name, avatar, onEnd }: CallScreenProps) {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-card rounded-3xl p-8 flex flex-col items-center gap-6 w-72 shadow-2xl animate-scale-in">
        <div className="animate-pulse-ring rounded-3xl">
          <Avatar label={avatar} size="lg" online />
        </div>
        <div className="text-center">
          <div className="font-semibold text-lg">{name}</div>
          <div className="text-muted-foreground text-sm mt-0.5">{fmt(seconds)}</div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setMuted(m => !m)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
              muted ? 'bg-destructive text-white' : 'bg-secondary text-foreground hover:bg-accent'
            }`}
          >
            <Icon name={muted ? 'MicOff' : 'Mic'} size={20} />
          </button>
          <button
            onClick={() => setSpeaker(s => !s)}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95 ${
              speaker ? 'bg-hsl(var(--gc-accent)) text-white' : 'bg-secondary text-foreground hover:bg-accent'
            }`}
            style={speaker ? { background: 'hsl(var(--gc-accent))', color: 'white' } : {}}
          >
            <Icon name={speaker ? 'Volume2' : 'VolumeX'} size={20} />
          </button>
        </div>

        <button
          onClick={onEnd}
          className="w-14 h-14 bg-destructive hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all active:scale-90 shadow-lg"
        >
          <Icon name="PhoneOff" size={22} />
        </button>
      </div>
    </div>
  );
}
