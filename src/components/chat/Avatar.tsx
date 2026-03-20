interface AvatarProps {
  label: string;
  online?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-9 h-9 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-14 h-14 text-base',
};

const dotMap = {
  sm: 'w-2.5 h-2.5 border-[1.5px]',
  md: 'w-3 h-3 border-2',
  lg: 'w-3.5 h-3.5 border-2',
};

const colorMap: Record<string, string> = {
  А: 'bg-rose-100 text-rose-700',
  Б: 'bg-amber-100 text-amber-700',
  В: 'bg-violet-100 text-violet-700',
  Г: 'bg-emerald-100 text-emerald-700',
  Д: 'bg-sky-100 text-sky-700',
  Е: 'bg-pink-100 text-pink-700',
  М: 'bg-blue-100 text-blue-700',
  Н: 'bg-orange-100 text-orange-700',
  С: 'bg-teal-100 text-teal-700',
  К: 'bg-indigo-100 text-indigo-700',
};

export default function Avatar({ label, online, size = 'md' }: AvatarProps) {
  const firstChar = label[0] || '?';
  const colorClass = colorMap[firstChar] || 'bg-slate-100 text-slate-600';
  const isEmoji = /\p{Emoji}/u.test(label);

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizeMap[size]} ${isEmoji ? 'bg-slate-100 text-foreground' : colorClass} rounded-2xl flex items-center justify-center font-semibold select-none`}
      >
        {label}
      </div>
      {online !== undefined && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 ${dotMap[size]} rounded-full border-white dark:border-card ${online ? 'bg-emerald-400' : 'bg-slate-300 dark:bg-slate-500'}`}
        />
      )}
    </div>
  );
}
