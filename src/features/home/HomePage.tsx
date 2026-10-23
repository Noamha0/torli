import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { APP_NAME } from '../../lib/config';
import type { Business, CategoryGroup } from '../../lib/types';
import { BrandMark } from '../../ui/Brand';
import Icon from '../../ui/Icon';
import BottomNav from './BottomNav';

interface SvcRow { business_id: string; category_id: string; }
interface CatRow { id: string; group_key: string; }
interface HourRow { business_id: string; weekday: number; opens: string; closes: string; }

const WD: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
function israelNow() {
  const p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jerusalem', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const get = (t: string) => p.find((x) => x.type === t)?.value ?? '';
  return { wd: WD[get('weekday')] ?? 0, hhmm: `${get('hour')}:${get('minute')}` };
}

/** עמוד הבית: גילוי עסקים — חיפוש, סינון, כרטיסי תמונה עם דירוג וסטטוס (עיצוב Tor-Li / Stitch). */
export default function HomePage() {
  const nav = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [bizGroups, setBizGroups] = useState<Map<string, Set<string>>>(new Map());
  const [hours, setHours] = useState<HourRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [favs, setFavs] = useState<Set<string>>(new Set());

  useEffect(() => {
    let alive = true;
    Promise.all([
      supabase.from('businesses').select('*').eq('status', 'listed').order('rating', { ascending: false, nullsFirst: false }),
      supabase.from('services').select('business_id,category_id').eq('active', true),
      supabase.from('categories').select('id,group_key'),
      supabase.from('category_groups').select('*').order('sort_order'),
      supabase.from('open_hours').select('business_id,weekday,opens,closes'),
    ]).then(([b, s, c, g, h]) => {
      if (!alive) return;
      const catGroup = new Map((c.data as CatRow[] ?? []).map((x) => [x.id, x.group_key]));
      const map = new Map<string, Set<string>>();
      for (const row of (s.data as SvcRow[] ?? [])) {
        const gk = catGroup.get(row.category_id);
        if (!gk) continue;
        let set = map.get(row.business_id);
        if (!set) { set = new Set(); map.set(row.business_id, set); }
        set.add(gk);
      }
      setBusinesses((b.data ?? []) as Business[]);
      setGroups((g.data ?? []) as CategoryGroup[]);
      setBizGroups(map);
      setHours((h.data ?? []) as HourRow[]);
      setLoading(false);
    });
    return () => { alive = false; };
  }, []);

  const groupName = useMemo(() => new Map(groups.map((g) => [g.key, g.name])), [groups]);

  const openNow = useMemo(() => {
    const { wd, hhmm } = israelNow();
    const set = new Set<string>();
    for (const h of hours) {
      if (h.weekday === wd && h.opens <= hhmm && hhmm < h.closes) set.add(h.business_id);
    }
    return set;
  }, [hours]);

  const filtered = useMemo(() => {
    const term = q.trim();
    return businesses.filter((b) => {
      if (activeGroup && !bizGroups.get(b.id)?.has(activeGroup)) return false;
      if (term && !(b.name.includes(term) || (b.city ?? '').includes(term))) return false;
      return true;
    });
  }, [businesses, bizGroups, activeGroup, q]);

  const nearby = useMemo(() => businesses.slice(0, 8), [businesses]);

  function toggleFav(id: string) {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function header(b: Business): React.CSSProperties {
    return b.image_url
      ? { backgroundImage: `linear-gradient(to top, rgb(11 28 48 / 0.5), rgb(11 28 48 / 0) 55%), url(${b.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : { background: 'var(--hero)' };
  }

  return (
    <div style={{ paddingBottom: '7rem' }}>
      <header className="topbar">
        <span className="brand"><BrandMark />{APP_NAME}</span>
        <button className="icon-btn" aria-label="פרופיל" onClick={() => nav('/')}><UserIcon /></button>
      </header>

      <main className="page stack">
        <div className="stack-sm">
          <h1>המומלצים שלי</h1>
          <p className="muted">עסקי יופי וטיפוח לידך — מזמינות תור בלחיצה, בלי התכתבויות.</p>
        </div>

        <div className="card" style={{ background: 'var(--hero)', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '1rem 1.1rem' }}>
          <div style={{ width: 44, height: 44, flex: 'none', borderRadius: 999, background: 'rgb(255 255 255 / 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>★</div>
          <div style={{ minWidth: 0 }}>
            <b style={{ display: 'block' }}>תור-לי VIP</b>
            <span style={{ fontSize: '0.86rem', opacity: 0.92 }}>קביעת תור מהירה אצל העסקים המובילים, בלי המתנה.</span>
          </div>
        </div>

        <div className="input-prefix" style={{ direction: 'rtl', borderRadius: 999, background: '#eff4ff', border: '1.5px solid transparent' }}>
          <span><SearchIcon /></span>
          <input type="search" placeholder="חיפוש עסק או עיר" value={q} onChange={(e) => setQ(e.target.value)} aria-label="חיפוש" />
        </div>

        <div className="chips" role="group" aria-label="תחום">
          <button type="button" className="chip" aria-pressed={activeGroup === null} onClick={() => setActiveGroup(null)}>הכל</button>
          {groups.map((g) => (
            <button type="button" key={g.key} className="chip" aria-pressed={activeGroup === g.key} onClick={() => setActiveGroup(g.key)}>{g.name}</button>
          ))}
        </div>

        {!loading && activeGroup === null && !q && nearby.length > 1 && (
          <section className="stack-sm">
            <h2>קרובים אליך</h2>
            <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', marginInline: '-16px', padding: '0.25rem 16px 0.5rem' }}>
              {nearby.map((b) => (
                <button key={b.id} onClick={() => nav(`/b/${b.slug}`)} style={{ flex: '0 0 auto', width: 170, textAlign: 'start' }}>
                  <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ height: 100, ...header(b) }} />
                    <div style={{ padding: '0.55rem 0.7rem' }}>
                      <b style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.9rem' }}>{b.name}</b>
                      <span className="muted" style={{ fontSize: '0.78rem' }}>
                        {b.rating != null && <><span style={{ color: '#f59e0b' }}>★</span> {b.rating} · </>}{b.city}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <h2>{activeGroup ? groupName.get(activeGroup) : 'כל העסקים'}</h2>

        {loading ? (
          <p className="muted" role="status">טוענת…</p>
        ) : filtered.length === 0 ? (
          <div className="notice warn">לא נמצאו עסקים שתואמים את החיפוש.</div>
        ) : (
          filtered.map((b) => {
            const gks = [...(bizGroups.get(b.id) ?? [])];
            const loc = [b.city, b.neighborhood].filter(Boolean).join(', ');
            const open = openNow.has(b.id);
            return (
              <article key={b.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: 160, ...header(b) }}>
                  <button type="button" className="icon-btn" aria-label={favs.has(b.id) ? 'הסרה מהמועדפים' : 'הוספה למועדפים'} onClick={() => toggleFav(b.id)} style={{ position: 'absolute', insetInlineStart: 10, top: 10, background: 'rgb(255 255 255 / 0.92)' }}>
                    <HeartIcon filled={favs.has(b.id)} />
                  </button>
                  {b.rating != null && (
                    <span style={{ position: 'absolute', insetInlineEnd: 10, top: 10, background: 'rgb(255 255 255 / 0.92)', color: 'var(--text)', padding: '0.2rem 0.6rem', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ color: '#f59e0b' }}>★</span>{b.rating}{b.review_count != null && <span style={{ color: 'var(--muted)', fontWeight: 500 }}>({b.review_count})</span>}
                    </span>
                  )}
                  <div style={{ position: 'absolute', insetInlineStart: 10, bottom: 10, display: 'flex', gap: 6 }}>
                    <span className="tag" style={{ background: 'rgb(255 255 255 / 0.92)', color: 'var(--text)' }}>{b.address_mode === 'studio' ? 'סטודיו' : 'עד הבית'}</span>
                    {open && <span className="tag success">פתוח עכשיו</span>}
                  </div>
                </div>
                <div className="stack-sm" style={{ padding: '0.9rem 1.1rem 1.1rem' }}>
                  <div className="row between">
                    <h2 style={{ fontSize: '1.05rem' }}>{b.name}</h2>
                    {b.status === 'listed' && <span style={{ color: 'var(--accent)' }}><Icon name="check" size={18} /></span>}
                  </div>
                  {loc && <p className="muted"><Icon name="pin" size={14} /> {loc}</p>}
                  {gks.length > 0 && (
                    <div className="chips">{gks.map((k) => <span key={k} className="tag lavender">{groupName.get(k)}</span>)}</div>
                  )}
                  <button className="btn block" onClick={() => nav(`/b/${b.slug}`)}><Icon name="clock" size={18} />קביעת תור</button>
                </div>
              </article>
            );
          })
        )}
      </main>

      <BottomNav active="home" />
    </div>
  );
}

function SearchIcon() {
  return <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>;
}
function UserIcon() {
  return <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.3 3-5.5 7-5.5s7 2.2 7 5.5" /></svg>;
}
function HeartIcon({ filled }: { filled: boolean }) {
  return <svg width={20} height={20} viewBox="0 0 24 24" fill={filled ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z" /></svg>;
}
