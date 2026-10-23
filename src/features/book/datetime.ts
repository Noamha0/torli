// עיצוב תאריך/שעה בזמן ישראל (Asia/Jerusalem), עברית. ישמש גם את היומן באבן דרך 3.
const TZ = 'Asia/Jerusalem';

const dayFmt = new Intl.DateTimeFormat('he-IL', { weekday: 'long', day: 'numeric', month: 'long', timeZone: TZ });
const timeFmt = new Intl.DateTimeFormat('he-IL', { hour: '2-digit', minute: '2-digit', timeZone: TZ });
const keyFmt = new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: TZ });

/** "יום שלישי, 28 באוקטובר" */
export const dayLabel = (iso: string) => dayFmt.format(new Date(iso));
/** "14:30" */
export const timeLabel = (iso: string) => timeFmt.format(new Date(iso));
/** "2026-10-28" — מפתח קיבוץ ליום */
export const dayKey = (iso: string) => keyFmt.format(new Date(iso));
