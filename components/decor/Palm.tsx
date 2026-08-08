export function Palm({ className, color = "#F6C90E" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 140V70" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <path d="M50 75C50 75 20 60 8 30C8 30 40 30 50 60" fill={color} opacity="0.9" />
      <path d="M50 75C50 75 80 60 92 30C92 30 60 30 50 60" fill={color} opacity="0.9" />
      <path d="M50 68C50 68 25 45 22 18C22 18 48 25 50 55" fill={color} opacity="0.7" />
      <path d="M50 68C50 68 75 45 78 18C78 18 52 25 50 55" fill={color} opacity="0.7" />
      <path d="M50 65C50 65 44 30 30 8C30 8 52 12 50 50" fill={color} opacity="0.55" />
      <path d="M50 65C50 65 56 30 70 8C70 8 48 12 50 50" fill={color} opacity="0.55" />
    </svg>
  );
}
