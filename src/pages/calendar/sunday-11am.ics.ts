import type { APIRoute } from 'astro';
import { icsResponse, serviceIcs } from '../../lib/ics';

export const GET: APIRoute = () =>
  icsResponse(
    serviceIcs({
      uid: 'sunday-11am',
      summary: 'Sunday worship — 11:00 AM',
      weekday: 0,
      hour: 11,
      minute: 0,
      byday: 'SU',
    }),
    'sunday-11am.ics',
  );
