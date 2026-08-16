import { church } from '../data/church';

const TZ = 'America/New_York';
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;

type Civil = { year: number; month: number; day: number; hour: number; minute: number };

function nyParts(date: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );
  return {
    weekday: WEEKDAYS.indexOf(parts.weekday as (typeof WEEKDAYS)[number]),
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

/** Next occurrence of a weekly service in America/New_York. */
export function nextService(weekday: number, hour: number, minute: number): Civil {
  const now = new Date();
  for (let i = 0; i < 8; i += 1) {
    const probe = new Date(now.getTime() + i * 86_400_000);
    const parts = nyParts(probe);
    if (parts.weekday !== weekday) continue;
    if (i === 0 && (parts.hour > hour || (parts.hour === hour && parts.minute >= minute))) continue;
    return { year: parts.year, month: parts.month, day: parts.day, hour, minute };
  }
  throw new Error('Could not find next service occurrence');
}

function stamp(value: Civil): string {
  const y = String(value.year).padStart(4, '0');
  const m = String(value.month).padStart(2, '0');
  const d = String(value.day).padStart(2, '0');
  const h = String(value.hour).padStart(2, '0');
  const min = String(value.minute).padStart(2, '0');
  return `${y}${m}${d}T${h}${min}00`;
}

function utcNow(): string {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export function serviceIcs(opts: {
  uid: string;
  summary: string;
  weekday: number;
  hour: number;
  minute: number;
  byday: 'SU' | 'WE';
}): string {
  const start = nextService(opts.weekday, opts.hour, opts.minute);
  const location = `${church.address.line}, ${church.address.city}, ${church.address.region} ${church.address.postal}`;
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Calvary Chapel Frederick//site//EN',
    `X-WR-TIMEZONE:${TZ}`,
    'BEGIN:VEVENT',
    `UID:${opts.uid}@calvaryfrederick.com`,
    `DTSTAMP:${utcNow()}`,
    `DTSTART;TZID=${TZ}:${stamp(start)}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${opts.byday}`,
    `SUMMARY:${opts.summary}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ];
  return lines.join('\r\n');
}

export function icsResponse(body: string, filename: string): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
