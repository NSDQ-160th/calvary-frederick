import { church } from './church';
import catalog from './media-catalog.json';

export type Teaching = {
  id: string;
  slug: string;
  title: string;
  date: string;
  speaker: string;
  seriesId: string;
};

export type Series = {
  id: string;
  slug: string;
  title: string;
  collection: 'radio' | null;
  cover: string;
  more: boolean;
  teachings: Teaching[];
  page: number;
};

export type MediaCatalog = {
  source: string;
  checked: string;
  latest: Teaching;
  series: Series[];
};

export const media = catalog as MediaCatalog;

export const SNAP_ORIGIN = 'https://calvarychapelfrederick1.snappages.site';

export function seriesById(id: string): Series | undefined {
  return media.series.find((item) => item.id === id);
}

export function seriesPath(series: Pick<Series, 'id' | 'slug'>): string {
  return `/media/series/${series.id}/${series.slug}`;
}

export function snapSeriesUrl(series: Pick<Series, 'id' | 'slug'>): string {
  return `${SNAP_ORIGIN}/media/series/${series.id}/${series.slug}`;
}

export function snapTeachingUrl(teaching: Pick<Teaching, 'id' | 'slug'>): string {
  return `${SNAP_ORIGIN}/media/${teaching.id}/${teaching.slug}`;
}

export function subsplashSeriesUrl(id: string): string {
  return `https://subsplash.com/${church.media.org}/media/ms/+${id}`;
}

export function featuredSeries(limit = 8): Series[] {
  return media.series.filter((item) => item.page === 1).slice(0, limit);
}

export function seriesWithTeachings(): Series[] {
  return media.series.filter((item) => item.teachings.length > 0);
}

export function latestSeries(): Series | undefined {
  return seriesById(media.latest.seriesId);
}

export function recentTeachings(limit = 4): Teaching[] {
  const series = latestSeries();
  const list = series?.teachings ?? [media.latest];
  return list.slice(0, limit);
}

export const mediaCollections = [
  {
    key: 'sunday',
    id: church.media.sunday,
    label: 'Sunday',
    text: 'Weekend messages',
    icon: 'play' as const,
  },
  {
    key: 'midweek',
    id: church.media.midweek,
    label: 'Midweek',
    text: 'Wednesday study',
    icon: 'book' as const,
  },
  {
    key: 'radio',
    id: church.media.radio,
    label: 'Truth with Grace',
    text: 'Daily radio teaching',
    icon: 'headphones' as const,
  },
  {
    key: 'archive',
    id: church.media.archive,
    label: 'Archive',
    text: 'Verse by verse',
    icon: 'book' as const,
  },
];
