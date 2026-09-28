import { defineConfig } from 'tinacms';

const text = (name: string, label: string, extra: Record<string, unknown> = {}) => ({
  type: 'string' as const,
  name,
  label,
  ...extra,
});

const lines = (name: string, label: string) => text(name, label, { ui: { component: 'textarea' } });

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || 'main',
  clientId: process.env.PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'church',
        label: 'Church details',
        path: 'src/data',
        format: 'yaml',
        match: { include: 'church' },
        ui: {
          router: () => '/',
          allowedActions: { create: false, delete: false },
        },
        fields: [
          text('name', 'Church name'),
          text('tagline', 'Headline', {
            description: 'The large words on the homepage. Click them on the page to edit.',
          }),
          lines('vision', 'Vision'),
          {
            type: 'object',
            name: 'hero',
            label: 'Homepage video',
            fields: [text('video', 'Video path'), text('poster', 'Poster path')],
          },
          {
            type: 'object',
            name: 'address',
            label: 'Address',
            fields: [
              text('line', 'Street'),
              text('city', 'City'),
              text('region', 'State'),
              text('postal', 'ZIP'),
              text('mapsQuery', 'Maps search'),
            ],
          },
          text('phone', 'Phone'),
          text('email', 'Office email'),
          {
            type: 'object',
            name: 'emails',
            label: 'Other emails',
            fields: [
              text('youth', 'Youth'),
              text('women', 'Women'),
              text('men', 'Men'),
              text('sonshine', 'SonShine'),
            ],
          },
          {
            type: 'object',
            name: 'services',
            label: 'Gatherings',
            fields: [
              {
                type: 'string',
                name: 'sunday',
                label: 'Sunday times',
                list: true,
                description: '24-hour, such as 09:00. The homepage shows these as clock times.',
              },
              text('wednesday', 'Wednesday study', { description: '24-hour, such as 19:00.' }),
              text('kidsSunday', 'Sunday kids'),
              text('kidsWednesday', 'Wednesday kids'),
              {
                type: 'object',
                name: 'middayPrayer',
                label: 'Midday prayer',
                fields: [text('days', 'Days'), text('start', 'Start'), text('end', 'End')],
              },
              {
                type: 'object',
                name: 'fellowshipDinner',
                label: 'Wednesday dinner',
                fields: [text('time', 'Time'), lines('note', 'Note')],
              },
            ],
          },
          {
            type: 'object',
            name: 'youth',
            label: 'Students',
            fields: [
              lines('sunday', 'Sunday'),
              lines('wednesday', 'Wednesday'),
              lines('highSchoolSunday', 'High school Sunday'),
            ],
          },
          {
            type: 'object',
            name: 'pastor',
            label: 'Pastor',
            fields: [text('name', 'Name'), text('spouse', 'Spouse')],
          },
          {
            type: 'object',
            name: 'bulletin',
            label: 'Bulletin',
            fields: [
              text('file', 'PDF path', {
                description: 'Example: /files/Bulletin-08-16-26-pdf.pdf. Keep the filename exact.',
              }),
              text('label', 'Label'),
            ],
          },
          {
            type: 'object',
            name: 'sermon',
            label: "This week's message",
            fields: [
              text('series', 'Series'),
              text('title', 'Message title'),
              text('speaker', 'Speaker'),
              text('image', 'Image path'),
              text('href', 'Link'),
            ],
          },
          {
            type: 'object',
            name: 'men',
            label: 'Men',
            fields: [text('asOf', 'As of'), lines('blurb', 'Men’s study')],
          },
          {
            type: 'object',
            name: 'giving',
            label: 'Giving copy',
            fields: [
              { type: 'boolean', name: 'platePassed', label: 'A plate is passed' },
              lines('lead', 'Lead'),
              lines('boxes', 'Offering boxes'),
              lines('cashEnvelopes', 'Cash envelopes'),
              text('subsplashEmbed', 'Wallet address', {
                description: 'Leave this. It is the giving embed.',
              }),
              {
                type: 'object',
                name: 'fees',
                label: 'Fees',
                fields: [text('card', 'Card'), text('ach', 'Bank'), text('verifiedOn', 'Verified on')],
              },
            ],
          },
          {
            type: 'object',
            name: 'media',
            label: 'Subsplash media',
            fields: [
              text('org', 'Org id'),
              text('messagesEmbed', 'Messages embed'),
              text('sunday', 'Sunday list'),
              text('midweek', 'Midweek list'),
              text('radio', 'Radio list'),
              text('archive', 'Archive'),
              text('app', 'App'),
              text('youtube', 'YouTube'),
            ],
          },
          {
            type: 'object',
            name: 'social',
            label: 'Social',
            fields: [text('instagram', 'Instagram'), text('facebook', 'Facebook')],
          },
          {
            type: 'object',
            name: 'podcasts',
            label: 'Podcasts',
            fields: [text('sunday', 'Sunday'), text('wednesday', 'Wednesday'), text('radio', 'Radio')],
          },
          {
            type: 'object',
            name: 'flags',
            label: 'Show or hide',
            fields: [
              { type: 'boolean', name: 'israel2027', label: 'Show Israel 2027' },
              { type: 'boolean', name: 'vbs2026', label: 'Show VBS 2026' },
              { type: 'boolean', name: 'sundayPrayerLunch', label: 'Show Sunday prayer lunch' },
            ],
          },
          {
            type: 'object',
            name: 'routes',
            label: 'Page switches',
            fields: [
              { type: 'boolean', name: 'give', label: 'Give page' },
              { type: 'boolean', name: 'visit', label: 'Visit page' },
            ],
          },
          {
            type: 'object',
            name: 'live',
            label: 'Live link',
            fields: [text('url', 'URL'), text('start', 'Start'), text('end', 'End')],
          },
        ],
      },
      {
        name: 'ministry',
        label: 'Ministry pages',
        path: 'src/data/ministries',
        format: 'yaml',
        ui: {
          router: ({ document }) => `/ministries/${document._sys.filename}`,
          allowedActions: { create: false, delete: false },
        },
        fields: [
          text('title', 'Title'),
          lines('text', 'Short line'),
          lines('lead', 'Lead'),
          lines('description', 'Search description'),
          text('emailKey', 'Contact inbox'),
          text('image', 'Photo path'),
          text('video', 'Video path'),
          text('poster', 'Poster path'),
          text('form', 'Page form'),
          text('externalUrl', 'Outside website'),
          {
            type: 'object',
            name: 'scripture',
            label: 'Scripture',
            fields: [lines('text', 'Verse'), text('ref', 'Reference')],
          },
          { type: 'string', name: 'paragraphs', label: 'Paragraphs', list: true, ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'facts',
            label: 'Facts',
            list: true,
            fields: [text('label', 'Label'), lines('value', 'Value')],
          },
          {
            type: 'object',
            name: 'areas',
            label: 'Volunteer areas',
            list: true,
            fields: [text('id', 'Id'), text('title', 'Title'), lines('text', 'Text')],
          },
        ],
      },
    ],
  },
});
