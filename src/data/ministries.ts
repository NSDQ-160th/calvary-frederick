import { church, formatServiceTime } from './church';
import spec from './ministries.yaml';

export type MinistryTile = {
  href: string;
  image: string;
  title: string;
  text: string;
};

export type MinistryFact = {
  label: string;
  value: string;
};

export type Ministry = {
  slug: string;
  title: string;
  text: string;
  image: string;
  video: string;
  poster: string;
  email: string;
  lead: string;
  description: string;
  scripture: { text: string; ref: string };
  paragraphs: string[];
  facts: MinistryFact[];
};

type EmailKey = 'info' | 'youth' | 'women' | 'men';

type MinistrySpec = {
  slug: string;
  title: string;
  text: string;
  image: string;
  video: string;
  poster: string;
  emailKey: EmailKey;
  lead: string;
  description: string;
  scripture: { text: string; ref: string };
  paragraphs: string[];
  facts: MinistryFact[];
};

const sunday = church.services.sunday.map(formatServiceTime).join(' and ');
const wednesday = formatServiceTime(church.services.wednesday);

const vars: Record<string, string> = {
  sunday,
  wednesday,
  kidsSunday: church.services.kidsSunday,
  kidsWednesday: church.services.kidsWednesday,
  youthSunday: church.youth.sunday,
  youthWednesday: church.youth.wednesday,
  highSchoolSunday: church.youth.highSchoolSunday,
  menBlurb: church.men.blurb.trim(),
  infoEmail: church.email,
  youthEmail: church.emails.youth,
  womenEmail: church.emails.women,
  menEmail: church.emails.men,
};

function emailFor(key: EmailKey): string {
  if (key === 'info') return church.email;
  return church.emails[key];
}

function fill(template: string, extra: Record<string, string> = {}): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) => extra[name] ?? vars[name] ?? '');
}

function hydrate(item: MinistrySpec): Ministry {
  const email = emailFor(item.emailKey);
  const extra = { email };
  return {
    slug: item.slug,
    title: item.title,
    text: fill(item.text, extra),
    image: item.image,
    video: item.video,
    poster: item.poster,
    email,
    lead: fill(item.lead, extra),
    description: fill(item.description, extra),
    scripture: item.scripture,
    paragraphs: item.paragraphs.map((paragraph) => fill(paragraph, extra)),
    facts: item.facts.map((fact) => ({
      label: fact.label,
      value: fill(fact.value, extra),
    })),
  };
}

export const ministries: Ministry[] = (spec as MinistrySpec[]).map(hydrate);

export const ministryTiles: MinistryTile[] = ministries.map((item) => ({
  href: `/ministries/${item.slug}`,
  image: item.image,
  title: item.title,
  text: item.text,
}));

export function ministryBySlug(slug: string): Ministry | undefined {
  return ministries.find((item) => item.slug === slug);
}

export function otherMinistries(slug: string): Ministry[] {
  return ministries.filter((item) => item.slug !== slug);
}
