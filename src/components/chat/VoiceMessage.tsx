import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface VoiceMessageProps {
  duration: number;
  outgoing?: boolean;
}

const BARS = 28;

function generateWave(): number[] {
  return Array.from({ length: BARS }, (_, i) => {
    const base = Math.sin(i * 0.6) * 0.3 + Math.sin(i * 1.2) * 0.2;
    return 0.2 + Math.abs(base) + Math.random() * 0.3;
  });
}

export default function VoiceMessage({ duration, outgoing = false }: VoiceMessageProps) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wave = useRef(generateWave()).current;

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const elapsed = Math.round((progress / 100) * duration);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) { setPlaying(false); return 0; }
          return p + 100 / (duration * 10);
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [playing, duration]);

  const barColor = outgoing ? 'bg-white/70' : 'bg-foreground/25';
  const barActiveColor = outgoing ? 'bg-white' : 'bg-foreground/70';

  return (
    <div className="flex items-center gap-3 min-w-[180px]">
      <button
        onClick={() => setPlaying(p => !p)}
        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all active:scale-95 ${
          outgoing ? 'bg-white/20 hover:bg-white/30' : 'bg-foreground/8 hover:bg-foreground/12'
        }`}
      >
        <Icon name={playing ? 'Pause' : 'Play'} size={16} className={outgoing ? 'text-white' : 'text-foreground'} />
      </button>

      <div className="flex items-center gap-[2px] h-8 flex-1">
        {wave.map((h, i) => {
          const active = (i / BARS) * 100 <= progress;
          return (
            <div
              key={i}
              className={`rounded-full flex-1 transition-colors duration-100 ${active ? barActiveColor : barColor}`}
              style={{
                height: `${h * 100}%`,
                animation: playing ? `waveBar ${0.6 + (i % 5) * 0.15}s ease-in-out ${(i % 7) * 0.08}s infinite` : 'none',
              }}
            />
          );
        })}
      </div>

      <span className={`text-xs tabular-nums flex-shrink-0 ${outgoing ? 'text-white/70' : 'text-muted-foreground'}`}>
        {playing || progress > 0 ? fmt(elapsed) : fmt(duration)}
      </span>
    </div>
  );
}
