import { church, formatPhone, formatServiceTime } from './church';

const sunday = church.services.sunday.map(formatServiceTime).join(' and ');
const wednesday = formatServiceTime(church.services.wednesday);

/** Published facts only. First sentence is the answer engine snippet. */
export const visitFaqs = [
  {
    q: 'What time is church at Calvary Chapel Frederick?',
    a: `Sunday services are at ${sunday}. Midweek Bible study is Wednesday at ${wednesday}. Midday prayer is ${church.services.middayPrayer.days} from ${formatServiceTime(church.services.middayPrayer.start)} to ${formatServiceTime(church.services.middayPrayer.end)}.`,
  },
  {
    q: 'Where is Calvary Chapel Frederick located?',
    a: `Calvary Chapel Frederick meets at ${church.address.line}, ${church.address.city}, ${church.address.region} ${church.address.postal}, in downtown Frederick, Maryland.`,
  },
  {
    q: 'Is there children’s ministry at Calvary Chapel Frederick?',
    a: `Yes. On Sunday, children’s ministry is for ${church.services.kidsSunday}. On Wednesday, children’s church is ${church.services.kidsWednesday}. Middle school meets Sunday at 9:00 AM; high school attends the main service.`,
  },
  {
    q: 'What kind of church is Calvary Chapel Frederick?',
    a: 'Calvary Chapel Frederick is a Calvary Chapel church that teaches the Bible verse by verse, chapter by chapter. The tagline is “Simply Teaching The Word Simply.”',
  },
  {
    q: 'Who is the pastor of Calvary Chapel Frederick?',
    a: `Pastor ${church.pastor.name} leads the church. He came to faith at the U.S. Naval Academy, served at Cornerstone Chapel in Leesburg, and began teaching in Frederick in 2006.`,
  },
  {
    q: 'How do I visit Calvary Chapel Frederick?',
    a: 'Come to a Sunday or Wednesday gathering, or use the Plan a Visit form on this page. You are welcome to bring a Bible; extras are available.',
  },
];

export const siteFaqs = [
  ...visitFaqs,
  {
    q: 'How can I watch a sermon from Calvary Chapel Frederick?',
    a: 'Watch on-demand messages at calvaryfrederick.com/media, on YouTube, or in the church app. Sunday, midweek, archive, and Truth with Grace radio are on Subsplash.',
  },
  {
    q: 'How do I give to Calvary Chapel Frederick?',
    a: `The church does not pass a plate. Give in the sanctuary offering boxes, online at calvaryfrederick.com/give, or by bill-pay and check to ${church.address.line}, ${church.address.city}, ${church.address.region} ${church.address.postal}.`,
  },
  {
    q: 'How do I contact Calvary Chapel Frederick?',
    a: `Call ${formatPhone()} or email ${church.email}.`,
  },
];
