import type { APIRoute } from 'astro';
import { icsResponse, serviceIcs } from '../../lib/ics';

export const GET: APIRoute = () =>
  icsResponse(
    serviceIcs({
      uid: 'sunday-9am',
      summary: 'Sunday worship — 9:00 AM',
      weekday: 0,
      hour: 9,
      minute: 0,
      byday: 'SU',
    }),
    'sunday-9am.ics',
  );
