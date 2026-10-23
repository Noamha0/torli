// אייקונים מצוירים לפרויקט (לא סט גנרי). קו מעוגל 1.75, 24×24.
// בכוונה: חץ "חזרה" מצביע ימינה — ב-RTL החזרה היא ימינה.

type Name =
  | 'back' | 'next' | 'check' | 'copy' | 'plus' | 'trash' | 'chevron'
  | 'chat' | 'clock' | 'pin' | 'home' | 'studio' | 'logout' | 'edit';

const paths: Record<Name, React.ReactNode> = {
  back: <path d="M9 5l7 7-7 7" />,
  next: <path d="M15 5l-7 7 7 7" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  copy: (
    <>
      <rect x="8" y="8" width="11" height="12" rx="3" />
      <path d="M5 15.5V7a3 3 0 0 1 3-3h7" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  trash: (
    <>
      <path d="M4.5 7h15M9.5 7V5.5a1.5 1.5 0 0 1 1.5-1.5h2a1.5 1.5 0 0 1 1.5 1.5V7" />
      <path d="M6.5 7l.8 11.2A2 2 0 0 0 9.3 20h5.4a2 2 0 0 0 2-1.8L17.5 7" />
    </>
  ),
  chevron: <path d="M6 9.5l6 6 6-6" />,
  // בועת שיחה עם שלוש נקודות — לשיתוף בוואטסאפ, בלי להעתיק לוגו מסחרי
  chat: (
    <>
      <path d="M12 4c4.7 0 8 3.1 8 7s-3.3 7-8 7c-1.1 0-2.1-.2-3-.5L5 19l1-3.6C4.7 14.2 4 12.7 4 11c0-3.9 3.3-7 8-7z" />
      <path d="M8.8 11h.01M12 11h.01M15.2 11h.01" strokeWidth="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 1.8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  home: (
    <>
      <path d="M4.5 11L12 4.5l7.5 6.5" />
      <path d="M6.5 9.5V19h11V9.5" />
      <path d="M10.5 19v-4.5h3V19" />
    </>
  ),
  // חלון ראווה עם סוכך — סטודיו/חנות
  studio: (
    <>
      <path d="M4 9.5L5.5 5h13L20 9.5" />
      <path d="M4 9.5c0 1.4 1.1 2.5 2.7 2.5S9.3 10.9 9.3 9.5c0 1.4 1.2 2.5 2.7 2.5s2.7-1.1 2.7-2.5c0 1.4 1.1 2.5 2.6 2.5S20 10.9 20 9.5" />
      <path d="M5.5 12v7.5h13V12M10 19.5v-4h4v4" />
    </>
  ),
  logout: (
    <>
      <path d="M14 4.5h3.5a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H14" />
      <path d="M10 8l-4 4 4 4M6 12h9" />
    </>
  ),
  edit: (
    <>
      <path d="M15.5 5.5l3 3L9 18H6v-3z" />
      <path d="M13.5 7.5l3 3" />
    </>
  ),
};

export default function Icon({ name, size = 22 }: { name: Name; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
