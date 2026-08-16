import type { APIRoute } from 'astro';
import { icsResponse, serviceIcs } from '../../lib/ics';

export const GET: APIRoute = () =>
  icsResponse(
    serviceIcs({
      uid: 'wednesday-7pm',
      summary: 'Wednesday Bible study — 7:00 PM',
      weekday: 3,
      hour: 19,
      minute: 0,
      byday: 'WE',
    }),
    'wednesday-7pm.ics',
  );
