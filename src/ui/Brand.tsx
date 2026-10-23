import { APP_NAME } from '../lib/config';

// סימן המותג: עלה כותרת כפול — מזכיר גם ציפורן מעוצבת וגם פרח.
export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id="brand-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00aeef" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <path d="M16 3c5 4.5 7.5 9.3 7.5 14.2A7.5 7.5 0 0 1 16 25a7.5 7.5 0 0 1-7.5-7.8C8.5 12.3 11 7.5 16 3z" fill="url(#brand-g)" />
      <path d="M16 11.5c2.4 2.2 3.6 4.4 3.6 6.6a3.6 3.6 0 0 1-7.2 0c0-2.2 1.2-4.4 3.6-6.6z" fill="#fff" opacity="0.9" />
      <path d="M6.5 27.5h19" stroke="url(#brand-g)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Brand() {
  return (
    <span className="brand">
      <BrandMark />
      {APP_NAME}
    </span>
  );
}
