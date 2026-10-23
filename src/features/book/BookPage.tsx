import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { WEEKDAYS } from '../../lib/format';
import type { Business, Category, CategoryGroup, OpenHour, Service } from '../../lib/types';
import Brand from '../../ui/Brand';
import Icon from '../../ui/Icon';
import ServicePicker from './ServicePicker';
import SlotPicker from './SlotPicker';
import Confirm from './Confirm';
import PhoneLogin from '../auth/PhoneLogin';
import { useSession } from '../auth/useSession';

type Step = 'services' | 'slots' | 'confirm' | 'done';

/** צד הלקוח: /b/<slug> — פרופיל, בחירת שירותים, משבצות, אישור (אבן דרך 4). */
export default function BookPage() {
  const { slug } = useParams();
  const { session } = useSession();
  const [business, setBusiness] = useState<Business | null | undefined>(undefined);
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [hours, setHours] = useState<OpenHour[]>([]);

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [slotStart, setSlotStart] = useState<string | null>(null);
  const [step, setStep] = useState<Step>('services');
  const [bookedStatus, setBookedStatus] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    if (!slug) { setBusiness(null); return; }
    supabase.from('businesses').select('*').eq('slug', slug).maybeSingle<Business>().then(async ({ data }) => {
      if (!alive) return;
      if (!data) { setBusiness(null); return; }
      setBusiness(data);
      const [s, c, g, h] = await Promise.all([
        supabase.from('services').select('*').eq('business_id', data.id).eq('active', true).order('sort_order'),
        supabase.from('categories').select('*'),
        supabase.from('category_groups').select('*').order('sort_order'),
        supabase.from('open_hours').select('*').eq('business_id', data.id).order('weekday').order('opens'),
      ]);
      if (!alive) return;
      setServices((s.data ?? []) as Service[]);
      setCategories((c.data ?? []) as Category[]);
      setGroups((g.data ?? []) as CategoryGroup[]);
      setHours((h.data ?? []) as OpenHour[]);
    });
    return () => { alive = false; };
  }, [slug]);

  const selectedServices = useMemo(() => services.filter((s) => selected.has(s.id)), [services, selected]);
  const totalDuration = useMemo(() => selectedServices.reduce((n, s) => n + s.duration_min, 0), [selectedServices]);
  const totalPrice = useMemo(() => selectedServices.reduce((n, s) => n + (s.price ?? 0), 0), [selectedServices]);
  const serviceIds = useMemo(() => selectedServices.map((s) => s.id), [selectedServices]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  if (business === undefined) {
    return <main className="center-card"><p className="muted" role="status">טוענת…</p></main>;
  }
  if (business === null) {
    return (
      <main className="center-card stack">
        <Brand />
        <h1>הדף לא נמצא</h1>
        <p className="muted">הלינק אולי שגוי, או שהעסק כבר לא פעיל.</p>
      </main>
    );
  }

  const addr = [business.city, business.neighborhood, business.address_mode === 'studio' ? business.street_public : null]
    .filter(Boolean).join(', ');
  const heading = step === 'services' ? 'בחירת שירותים' : step === 'slots' ? 'בחירת מועד' : 'אישור';

  return (
    <>
      <header className="topbar"><Brand /></header>
      <main className="page stack">
        <div className="hero stack-sm" style={{ borderRadius: 'var(--radius)', justifyContent: 'flex-end',
          minHeight: business.image_url ? 190 : undefined,
          ...(business.image_url ? { backgroundImage: `linear-gradient(to top, rgb(11 28 48 / 0.8), rgb(11 28 48 / 0.1)), url(${business.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}) }}>
          <h1>{business.name}</h1>
          {business.description && <p className="muted">{business.description}</p>}
          <div className="row wrap" style={{ gap: '0.5rem' }}>
            {addr && (
              <span className="tag" style={{ background: 'rgb(255 255 255 / 0.2)', color: '#fff' }}>
                <Icon name="pin" size={14} /> {addr}
              </span>
            )}
            {business.instagram_url && (
              <a className="tag" style={{ background: 'rgb(255 255 255 / 0.2)', color: '#fff' }}
                 href={business.instagram_url} target="_blank" rel="noreferrer">אינסטגרם</a>
            )}
            {business.rating != null && (
              <span className="tag" style={{ background: 'rgb(255 255 255 / 0.2)', color: '#fff' }}>
                <span style={{ color: '#fbbf24' }}>★</span> {business.rating}{business.review_count != null ? ` (${business.review_count})` : ''}
              </span>
            )}
          </div>
        </div>

        {step === 'done' ? (
          <section className="card stack-sm" role="status">
            <span className="tag success" style={{ alignSelf: 'flex-start' }}>
              <Icon name="check" size={16} /> {bookedStatus === 'confirmed' ? 'התור נקבע' : 'הבקשה נשלחה'}
            </span>
            <h2>{bookedStatus === 'confirmed' ? 'נתראה בקרוב!' : 'ההזמנה ממתינה לאישור העסק'}</h2>
            <p className="muted">
              {bookedStatus === 'confirmed'
                ? 'התור אושר ונשמר ביומן.'
                : 'ברגע שהעסק יאשר, התור יישמר — נעדכן אותך.'}
            </p>
          </section>
        ) : (
          <>
            <div className="stack-sm">
              <h2>{heading}</h2>
              {step === 'services' && hoursSummary(hours) && <p className="muted">{hoursSummary(hours)}</p>}
            </div>

            {step === 'services' && (
              <ServicePicker
                services={services} categories={categories} groups={groups}
                selected={selected} onToggle={toggle}
                onContinue={() => setStep('slots')}
                totalDuration={totalDuration} totalPrice={totalPrice}
              />
            )}
            {step === 'slots' && (
              <SlotPicker
                businessId={business.id} serviceIds={serviceIds}
                onBack={() => setStep('services')}
                onPick={(s) => { setSlotStart(s); setStep('confirm'); }}
              />
            )}
            {step === 'confirm' && slotStart && (
              session ? (
                <Confirm
                  business={business} services={selectedServices} slotStart={slotStart}
                  totalDuration={totalDuration} totalPrice={totalPrice}
                  onBack={() => setStep('slots')}
                  onBooked={(st) => { setBookedStatus(st); setStep('done'); }}
                />
              ) : (
                <PhoneLogin
                  title="כניסה לאישור התור"
                  subtitle="מזמינות עם הטלפון, בלי סיסמה — נשלח קוד ב-SMS."
                />
              )
            )}
          </>
        )}
      </main>
    </>
  );
}

function hoursSummary(hours: OpenHour[]): string | null {
  if (hours.length === 0) return null;
  const days = [...new Set(hours.map((h) => h.weekday))].sort((a, b) => a - b);
  return 'ימי פעילות: ' + days.map((d) => WEEKDAYS[d]).join(', ');
}
