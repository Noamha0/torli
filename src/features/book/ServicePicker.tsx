import { useMemo } from 'react';
import { formatDuration, formatPrice } from '../../lib/format';
import type { Category, CategoryGroup, Service } from '../../lib/types';
import Icon from '../../ui/Icon';

interface Props {
  services: Service[];
  categories: Category[];
  groups: CategoryGroup[];
  selected: Set<string>;
  onToggle: (id: string) => void;
  onContinue: () => void;
  totalDuration: number;
  totalPrice: number;
}

/** בחירת סל שירותים, מקובץ לפי תחום (קבוצת קטגוריות). */
export default function ServicePicker({
  services, categories, groups, selected, onToggle, onContinue, totalDuration, totalPrice,
}: Props) {
  const groupKeyOf = useMemo(() => {
    const cat = new Map(categories.map((c) => [c.id, c.group_key]));
    return (s: Service) => cat.get(s.category_id) ?? 'other';
  }, [categories]);

  const sections = useMemo(
    () => groups
      .map((g) => ({ group: g, items: services.filter((s) => groupKeyOf(s) === g.key) }))
      .filter((sec) => sec.items.length > 0),
    [groups, services, groupKeyOf],
  );

  return (
    <div className="stack">
      {services.length === 0 ? (
        <div className="notice warn">עדיין לא הוגדרו שירותים בעסק הזה.</div>
      ) : (
        sections.map(({ group, items }) => (
          <section key={group.key} className="stack-sm">
            <h3>{group.name}</h3>
            <div className="list card" style={{ padding: '0.25rem 1rem' }}>
              {items.map((s) => {
                const on = selected.has(s.id);
                return (
                  <label key={s.id} className="service-row" style={{ cursor: 'pointer' }}>
                    <div className="meta">
                      <b>{s.name}</b>
                      <span className="muted">{formatDuration(s.duration_min)} · {formatPrice(s.price)}</span>
                    </div>
                    <span className="chip" aria-pressed={on} style={{ pointerEvents: 'none' }}>
                      {on ? <><Icon name="check" size={16} /> נבחר</> : 'בחירה'}
                    </span>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() => onToggle(s.id)}
                      aria-label={s.name}
                    />
                  </label>
                );
              })}
            </div>
          </section>
        ))
      )}

      {selected.size > 0 && (
        <div className="wizard-actions">
          <button className="btn block" onClick={onContinue}>
            המשך · {formatDuration(totalDuration)}{totalPrice > 0 ? ` · ${formatPrice(totalPrice)}` : ''}
          </button>
        </div>
      )}
    </div>
  );
}
