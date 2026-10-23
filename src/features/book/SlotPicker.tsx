import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { dayKey, dayLabel, timeLabel } from './datetime';

interface Slot { slot_start: string; slot_end: string; }

interface Props {
  businessId: string;
  serviceIds: string[];
  onPick: (slotStart: string) => void;
  onBack: () => void;
}

/** לוח המשבצות הפנויות לסל הנבחר, מקובץ לפי יום. מקור: available_slots RPC. */
export default function SlotPicker({ businessId, serviceIds, onPick, onBack }: Props) {
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const key = serviceIds.join(',');

  useEffect(() => {
    let alive = true;
    setSlots(null);
    setError(null);
    supabase
      .rpc('available_slots', { p_business_id: businessId, p_service_ids: serviceIds })
      .then(({ data, error }) => {
        if (!alive) return;
        if (error) { setError('לא הצלחנו לטעון תורים פנויים. אפשר לנסות שוב.'); setSlots([]); }
        else setSlots((data ?? []) as Slot[]);
      });
    return () => { alive = false; };
  }, [businessId, key]); // eslint-disable-line react-hooks/exhaustive-deps

  if (slots === null) return <p className="muted" role="status">טוענת תורים פנויים…</p>;

  const byDay = new Map<string, Slot[]>();
  for (const s of slots) {
    const k = dayKey(s.slot_start);
    const arr = byDay.get(k);
    if (arr) arr.push(s); else byDay.set(k, [s]);
  }

  return (
    <div className="stack">
      <button type="button" className="btn ghost" onClick={onBack} style={{ alignSelf: 'flex-start' }}>
        החלפת שירותים
      </button>

      {error && <p className="error" role="alert">{error}</p>}

      {slots.length === 0 && !error && (
        <div className="notice warn">אין תורים פנויים בטווח הקרוב. כדאי לבדוק שוב מאוחר יותר.</div>
      )}

      {[...byDay.values()].map((daySlots) => (
        <section key={dayKey(daySlots[0].slot_start)} className="stack-sm">
          <h3>{dayLabel(daySlots[0].slot_start)}</h3>
          <div className="chips">
            {daySlots.map((s) => (
              <button key={s.slot_start} type="button" className="chip" onClick={() => onPick(s.slot_start)}>
                {timeLabel(s.slot_start)}
              </button>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
