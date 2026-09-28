import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../tina/__generated__/client';

export const getChurch = () =>
  requestWithMetadata(client.queries.church({ relativePath: 'church.yaml' }), { priority: 'primary' });

export const getMinistry = (slug: string) =>
  requestWithMetadata(client.queries.ministry({ relativePath: `${slug}.yaml` }), { priority: 'primary' });
