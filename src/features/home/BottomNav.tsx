import { useNavigate } from 'react-router-dom';

type Tab = 'home' | 'search' | 'appointments' | 'favorites' | 'profile';

const items: { key: Tab; label: string; to: string; icon: React.ReactNode }[] = [
  { key: 'home', label: 'בית', to: '/', icon: <path d="M4.5 11L12 4.5l7.5 6.5M6.5 9.5V19h11V9.5" /> },
  { key: 'search', label: 'חיפוש', to: '/', icon: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></> },
  { key: 'appointments', label: 'התורים שלי', to: '/', icon: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4.5l3 1.8" /></> },
  { key: 'favorites', label: 'מועדפים', to: '/', icon: <path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" /> },
  { key: 'profile', label: 'פרופיל', to: '/', icon: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.3 3-5.5 7-5.5s7 2.2 7 5.5" /></> },
];

/** דוק ניווט תחתון צף (Tor-Li). מסכי המשנה נבנים בהמשך. */
export default function BottomNav({ active }: { active: Tab }) {
  const nav = useNavigate();
  return (
    <nav
      style={{
        position: 'fixed', insetInline: '1rem', bottom: 'calc(0.75rem + env(safe-area-inset-bottom))', zIndex: 30,
        maxWidth: '30rem', marginInline: 'auto',
        display: 'grid', gridAutoFlow: 'column', gridAutoColumns: '1fr',
        padding: '0.5rem', borderRadius: 999,
        background: 'rgb(255 255 255 / 0.88)', backdropFilter: 'blur(16px)',
        border: '1px solid var(--border)',
        boxShadow: '0 12px 32px -4px rgb(0 174 239 / 0.18), 0 2px 8px -2px rgb(15 23 42 / 0.08)',
      }}
      aria-label="ניווט ראשי"
    >
      {items.map((it) => {
        const on = it.key === active;
        return (
          <button
            key={it.key}
            onClick={() => nav(it.to)}
            aria-current={on ? 'page' : undefined}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              padding: '0.3rem', fontSize: '0.68rem', fontWeight: on ? 600 : 500,
              color: on ? 'var(--accent-bright)' : 'var(--muted)',
            }}
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              {it.icon}
            </svg>
            {it.label}
            <span style={{ width: 4, height: 4, borderRadius: 999, background: on ? 'var(--accent-bright)' : 'transparent' }} />
          </button>
        );
      })}
    </nav>
  );
}
