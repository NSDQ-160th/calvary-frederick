import { church, formatServiceTime } from './church';

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

export type MinistryArea = {
  id: string;
  title: string;
  text: string;
};

export type MinistryForm = 'groups' | 'volunteer';

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
  form?: MinistryForm;
  areas: MinistryArea[];
  externalUrl?: string;
};

type EmailKey = 'info' | 'youth' | 'women' | 'men' | 'sonshine';

type MinistrySpec = {
  slug: string;
  title: string;
  text: string;
  image: string;
  video?: string;
  poster: string;
  emailKey: EmailKey;
  lead: string;
  description: string;
  scripture: { text: string; ref: string };
  paragraphs: string[];
  facts: MinistryFact[];
  form?: MinistryForm;
  areas?: MinistryArea[];
  externalUrl?: string;
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
  sonshineEmail: church.emails.sonshine,
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
    video: item.video?.trim() ?? '',
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
    form: item.form,
    areas: (item.areas ?? []).map((area) => ({
      id: area.id,
      title: area.title,
      text: fill(area.text, extra),
    })),
    externalUrl: item.externalUrl,
  };
}

const ministryFiles = import.meta.glob('./ministries/*.yaml', {
  eager: true,
  import: 'default',
}) as Record<string, Omit<MinistrySpec, 'slug'> & { slug?: string; form?: MinistryForm | 'none' }>;

const ministryOrder = [
  'preschool',
  'children',
  'students',
  'young-adults',
  'women',
  'men',
  'small-groups',
  'volunteer',
  'school-of-ministry',
  'sonshine',
  'discipleship',
];

function slugFromPath(filePath: string): string {
  return filePath.split('/').pop()?.replace(/\.yaml$/, '') ?? '';
}

const ministrySpecs: MinistrySpec[] = Object.entries(ministryFiles)
  .map(([filePath, data]) => {
    const form = data.form === 'none' || data.form === undefined ? undefined : data.form;
    return { ...data, slug: slugFromPath(filePath), form };
  })
  .sort((a, b) => {
    const ai = ministryOrder.indexOf(a.slug);
    const bi = ministryOrder.indexOf(b.slug);
    return (ai === -1 ? ministryOrder.length : ai) - (bi === -1 ? ministryOrder.length : bi);
  });

export const ministries: Ministry[] = ministrySpecs.map(hydrate);

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
