import type { IslandRegistry } from '@tinacms/astro/experimental';
import HomePreview from '../components/tina/HomePreview.astro';
import MinistryHeader from '../components/tina/MinistryHeader.astro';
import { getChurch, getMinistry } from './tina-data';

export const islands: IslandRegistry = {
  home: {
    fetch: () => getChurch(),
    component: HomePreview,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      data: (data as { data?: { church?: unknown } }).data?.church,
    }),
  },
  ministry: {
    fetch: (_request, params) => getMinistry(params.get('slug') ?? ''),
    component: MinistryHeader,
    wrapper: { tag: 'header', className: 'min-hero' },
    propsFromData: (data) => ({
      data: (data as { data?: { ministry?: unknown } }).data?.ministry,
    }),
  },
};
