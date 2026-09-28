import { collection, config, fields, singleton } from '@keystatic/core';

const emailKey = fields.select({
  label: 'Contact inbox',
  description: 'Which church address this page uses. Placeholders such as {{email}} fill in from this choice.',
  defaultValue: 'info',
  options: [
    { label: 'Office', value: 'info' },
    { label: 'Youth', value: 'youth' },
    { label: 'Women', value: 'women' },
    { label: 'Men', value: 'men' },
    { label: 'SonShine', value: 'sonshine' },
  ],
});

const ministryForm = fields.select({
  label: 'Page form',
  description: 'Leave as “No form” unless this page should include the groups or volunteer form.',
  defaultValue: 'none',
  options: [
    { label: 'No form', value: 'none' },
    { label: 'Small groups', value: 'groups' },
    { label: 'Volunteer', value: 'volunteer' },
  ],
});

/**
 * Staff admin. Saves commit to GitHub branches named content/…, never straight to main.
 * fields.ignored() keeps Subsplash IDs in the YAML and out of the form.
 */
export default config({
  storage: {
    kind: 'github',
    repo: 'NSDQ-160th/calvary-frederick',
    branchPrefix: 'content/',
  },
  ui: {
    brand: { name: 'Calvary Chapel Frederick' },
    navigation: {
      'This week': ['church'],
      Pages: ['ministries'],
    },
  },
  singletons: {
    church: singletonChurch(),
  },
  collections: {
    ministries: collection({
      label: 'Ministry pages',
      path: 'src/data/ministries/*',
      slugField: 'title',
      format: { data: 'yaml' },
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: {
            label: 'Page address',
            description: 'Leave this. It is the public link, such as /ministries/preschool.',
          },
        }),
        text: fields.text({ label: 'Short line', multiline: true }),
        lead: fields.text({ label: 'Lead', multiline: true }),
        description: fields.text({
          label: 'Search description',
          description: 'One or two sentences. Placeholders such as {{sunday}} are filled from Church details.',
          multiline: true,
        }),
        emailKey,
        scripture: fields.object(
          {
            text: fields.text({ label: 'Verse', multiline: true }),
            ref: fields.text({ label: 'Reference' }),
          },
          { label: 'Scripture' },
        ),
        paragraphs: fields.array(fields.text({ label: 'Paragraph', multiline: true }), {
          label: 'Paragraphs',
          itemLabel: (props) => props.value || 'Paragraph',
        }),
        facts: fields.array(
          fields.object({
            label: fields.text({ label: 'Label' }),
            value: fields.text({ label: 'Value', multiline: true }),
          }),
          {
            label: 'Facts',
            itemLabel: (props) => props.fields.label.value || 'Fact',
          },
        ),
        image: fields.text({
          label: 'Photo path',
          description: 'A file already in the site, such as /images/ministries/preschool.jpg.',
        }),
        video: fields.text({
          label: 'Video path',
          description: 'Leave blank if this page has no looping video. Do not upload a sermon.',
        }),
        poster: fields.text({ label: 'Video poster path' }),
        form: ministryForm,
        areas: fields.array(
          fields.object({
            id: fields.text({
              label: 'Id',
              description: 'Leave this. The page uses it for the volunteer list.',
            }),
            title: fields.text({ label: 'Title' }),
            text: fields.text({ label: 'Text', multiline: true }),
          }),
          {
            label: 'Volunteer areas',
            itemLabel: (props) => props.fields.title.value || 'Area',
          },
        ),
        externalUrl: fields.text({
          label: 'Outside website',
          description: 'Only SonShine uses this. Leave blank on the other pages.',
        }),
      },
    }),
  },
});

function singletonChurch() {
  return singleton({
    label: 'Church details',
    path: 'src/data/church',
    format: { data: 'yaml' as const },
    schema: {
      name: fields.text({ label: 'Church name' }),
      tagline: fields.text({ label: 'Tagline' }),
      vision: fields.text({ label: 'Vision', multiline: true }),
      sermon: fields.object(
        {
          series: fields.text({ label: 'Series' }),
          title: fields.text({ label: 'Message title' }),
          speaker: fields.text({ label: 'Speaker' }),
          image: fields.text({
            label: 'Image path',
            description: 'Example: /images/media/acts.jpg',
          }),
          href: fields.text({ label: 'Link', description: 'Usually /media.' }),
        },
        { label: 'This week’s message' },
      ),
      bulletin: fields.object(
        {
          file: fields.text({
            label: 'PDF path',
            description:
              'Example: /files/Bulletin-08-16-26-pdf.pdf. Keep the filename exactly, including -pdf.',
          }),
          label: fields.text({ label: 'Label' }),
        },
        { label: 'Bulletin' },
      ),
      services: fields.object(
        {
          sunday: fields.array(fields.text({ label: 'Time', description: '24-hour, such as 09:00.' }), {
            label: 'Sunday times',
            itemLabel: (props) => props.value || 'Time',
          }),
          wednesday: fields.text({ label: 'Wednesday study', description: '24-hour, such as 19:00.' }),
          kidsSunday: fields.text({ label: 'Sunday kids' }),
          kidsWednesday: fields.text({ label: 'Wednesday kids' }),
          middayPrayer: fields.object(
            {
              days: fields.text({ label: 'Days' }),
              start: fields.text({ label: 'Start', description: '24-hour.' }),
              end: fields.text({ label: 'End', description: '24-hour.' }),
            },
            { label: 'Midday prayer' },
          ),
          fellowshipDinner: fields.object(
            {
              time: fields.text({ label: 'Time', description: '24-hour.' }),
              note: fields.text({ label: 'Note', multiline: true }),
            },
            { label: 'Wednesday dinner' },
          ),
        },
        { label: 'Gatherings' },
      ),
      men: fields.object(
        {
          asOf: fields.text({ label: 'As of', description: 'Year-month, such as 2026-08.' }),
          blurb: fields.text({ label: 'Men’s study', multiline: true }),
        },
        { label: 'Men' },
      ),
      hero: fields.object(
        {
          video: fields.text({ label: 'Video path', description: 'Website loop only. Not a sermon.' }),
          poster: fields.text({ label: 'Poster path' }),
        },
        { label: 'Homepage video' },
      ),
      address: fields.object(
        {
          line: fields.text({ label: 'Street' }),
          city: fields.text({ label: 'City' }),
          region: fields.text({ label: 'State' }),
          postal: fields.text({ label: 'ZIP' }),
          mapsQuery: fields.text({ label: 'Maps search' }),
        },
        { label: 'Address' },
      ),
      phone: fields.text({ label: 'Phone' }),
      email: fields.text({ label: 'Office email' }),
      emails: fields.object(
        {
          youth: fields.text({ label: 'Youth' }),
          women: fields.text({ label: 'Women' }),
          men: fields.text({ label: 'Men' }),
          sonshine: fields.text({ label: 'SonShine' }),
        },
        { label: 'Other emails' },
      ),
      youth: fields.object(
        {
          sunday: fields.text({ label: 'Sunday', multiline: true }),
          wednesday: fields.text({ label: 'Wednesday', multiline: true }),
          highSchoolSunday: fields.text({ label: 'High school Sunday', multiline: true }),
        },
        { label: 'Students' },
      ),
      pastor: fields.object(
        {
          name: fields.text({ label: 'Name' }),
          spouse: fields.text({ label: 'Spouse' }),
        },
        { label: 'Pastor' },
      ),
      giving: fields.object(
        {
          platePassed: fields.checkbox({ label: 'A plate is passed in the service' }),
          lead: fields.text({ label: 'Lead', multiline: true }),
          boxes: fields.text({ label: 'Offering boxes', multiline: true }),
          cashEnvelopes: fields.text({ label: 'Cash envelopes', multiline: true }),
          subsplashEmbed: fields.ignored(),
          fees: fields.ignored(),
        },
        { label: 'Giving copy' },
      ),
      social: fields.object(
        {
          instagram: fields.text({ label: 'Instagram' }),
          facebook: fields.text({ label: 'Facebook' }),
        },
        { label: 'Social' },
      ),
      flags: fields.object(
        {
          israel2027: fields.checkbox({
            label: 'Show Israel 2027',
            description: 'Leave off until the church gives dates.',
          }),
          vbs2026: fields.checkbox({ label: 'Show VBS 2026' }),
          sundayPrayerLunch: fields.checkbox({ label: 'Show Sunday prayer lunch' }),
        },
        { label: 'Show or hide' },
      ),
      media: fields.ignored(),
      podcasts: fields.ignored(),
      routes: fields.ignored(),
      live: fields.ignored(),
    },
  });
}
