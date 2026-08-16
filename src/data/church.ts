import spec from './church.yaml';

export type ChurchSpec = {
  name: string;
  tagline: string;
  vision: string;
  address: {
    line: string;
    city: string;
    region: string;
    postal: string;
    mapsQuery: string;
  };
  phone: string;
  email: string;
  emails: {
    youth: string;
    women: string;
    men: string;
  };
  services: {
    sunday: string[];
    wednesday: string;
    kidsSunday: string;
    kidsWednesday: string;
  };
  youth: {
    sunday: string;
    wednesday: string;
    highSchoolSunday: string;
  };
  pastor: {
    name: string;
    spouse: string;
  };
  bulletin: {
    file: string;
    label: string;
  };
  sermon: {
    series: string;
    title: string;
    speaker: string;
    image: string;
    href: string;
  };
  men: {
    asOf: string;
    blurb: string;
  };
  giving: {
    platePassed: boolean;
    boxes: string;
    subsplashEmbed: string;
    fees: {
      card: string;
      ach: string;
      verifiedOn: string;
    };
  };
  media: {
    org: string;
    messagesEmbed: string;
    sunday: string;
    midweek: string;
    radio: string;
    archive: string;
    app: string;
    youtube: string;
  };
  podcasts: {
    sunday: string;
    wednesday: string;
    radio: string;
  };
  flags: {
    israel2027: boolean;
    vbs2026: boolean;
  };
  live: {
    url: string;
    start: string | null;
    end: string | null;
  };
};

export const church = spec as ChurchSpec;

export function mapsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address.mapsQuery)}`;
}

export function formatServiceTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}:00 ${suffix}` : `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}
