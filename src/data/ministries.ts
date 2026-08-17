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

const sunday = church.services.sunday.map(formatServiceTime).join(' and ');
const wednesday = formatServiceTime(church.services.wednesday);

export const ministries: Ministry[] = [
  {
    slug: 'preschool',
    title: 'Preschool',
    text: 'Little ones are welcome when we gather.',
    image: '/images/ministries/preschool.jpg',
    video: '/videos/ministries/preschool.mp4',
    poster: '/images/ministries/preschool.jpg',
    email: church.email,
    lead: 'Little ones are welcome when we gather.',
    description: `Preschool at Calvary Chapel Frederick. Sunday children’s ministry is ${church.services.kidsSunday}. Wednesday children’s church ${church.services.kidsWednesday}. Downtown Frederick, MD.`,
    scripture: {
      text: 'Jesus said, “Let the little children come to me and do not hinder them, for to such belongs the kingdom of heaven.”',
      ref: 'Matthew 19:14',
    },
    paragraphs: [
      `The youngest children are part of Sunday children’s ministry — ${church.services.kidsSunday}. Come any Sunday at ${sunday}.`,
      `On Wednesday at ${wednesday}, children’s church is ${church.services.kidsWednesday}. We would love to meet your family.`,
    ],
    facts: [
      { label: 'Sunday', value: `${sunday} · ${church.services.kidsSunday}` },
      { label: 'Wednesday', value: `${wednesday} · children’s church ${church.services.kidsWednesday}` },
    ],
  },
  {
    slug: 'children',
    title: 'Children',
    text: 'Bible teaching for infants through 5th grade.',
    image: '/images/ministries/children.jpg',
    video: '/videos/ministries/children.mp4',
    poster: '/images/ministries/children.jpg',
    email: church.email,
    lead: 'Bible teaching for infants through 5th grade.',
    description: `Children’s ministry at Calvary Chapel Frederick. Sunday ${church.services.kidsSunday}. Wednesday children’s church ${church.services.kidsWednesday}. Downtown Frederick, MD.`,
    scripture: {
      text: 'Jesus said, “Let the little children come to me and do not hinder them, for to such belongs the kingdom of heaven.”',
      ref: 'Matthew 19:14',
    },
    paragraphs: [
      `Sunday children’s ministry is ${church.services.kidsSunday}. We teach the Bible with crafts and games at their age.`,
      `Wednesday children’s church is ${church.services.kidsWednesday}, during the ${wednesday} Bible study.`,
    ],
    facts: [
      { label: 'Sunday', value: `${sunday} · ${church.services.kidsSunday}` },
      { label: 'Wednesday', value: `${wednesday} · children’s church ${church.services.kidsWednesday}` },
    ],
  },
  {
    slug: 'students',
    title: 'Students',
    text: 'Middle and high school — Sunday and Ignite midweek.',
    image: '/images/ministries/youth.jpg',
    video: '/videos/ministries/students.mp4',
    poster: '/images/ministries/youth.jpg',
    email: church.emails.youth,
    lead: 'Middle and high school — Sunday and Ignite midweek.',
    description: `Student ministry at Calvary Chapel Frederick. ${church.youth.sunday}. Midweek Ignite for middle and high school. Email ${church.emails.youth}.`,
    scripture: {
      text: 'Let no one despise you for your youth, but set the believers an example in speech, in conduct, in love, in faith, in purity.',
      ref: '1 Timothy 4:12',
    },
    paragraphs: [
      `${church.youth.sunday}. High school attends the main service.`,
      `Midweek, middle and high school meet together for Ignite at ${wednesday}.`,
    ],
    facts: [
      { label: 'Sunday', value: church.youth.sunday },
      { label: 'High school Sunday', value: church.youth.highSchoolSunday },
      { label: 'Midweek', value: church.youth.wednesday },
    ],
  },
  {
    slug: 'young-adults',
    title: 'Young Adults',
    text: 'Growing in the Word with others in this season.',
    image: '/images/ministries/young-adults.jpg',
    video: '/videos/ministries/young-adults.mp4',
    poster: '/images/ministries/young-adults.jpg',
    email: church.email,
    lead: 'Growing in the Word with others in this season.',
    description:
      'Young adults at Calvary Chapel Frederick grow in the Word together. Join us Sunday or Wednesday in downtown Frederick, MD.',
    scripture: {
      text: 'Iron sharpens iron, and one man sharpens another.',
      ref: 'Proverbs 27:17',
    },
    paragraphs: [
      'Young adults are welcome in the Sunday and Wednesday gatherings as we teach the Bible verse by verse.',
      `Come Sunday at ${sunday} or Wednesday at ${wednesday}, then email us if you want to connect with others in this season.`,
    ],
    facts: [
      { label: 'Sunday', value: sunday },
      { label: 'Wednesday', value: wednesday },
    ],
  },
  {
    slug: 'women',
    title: 'Women',
    text: 'Women growing together in the Word.',
    image: '/images/ministries/women.jpg',
    video: '/videos/ministries/women.mp4',
    poster: '/images/ministries/women.jpg',
    email: church.emails.women,
    lead: 'Women growing together in the Word.',
    description: `Women’s ministry at Calvary Chapel Frederick. Women growing together in the Word. Email ${church.emails.women}. Downtown Frederick, MD.`,
    scripture: {
      text: 'Your word is a lamp to my feet and a light to my path.',
      ref: 'Psalm 119:105',
    },
    paragraphs: [
      'Women at Calvary Chapel Frederick grow together in the Word.',
      `Email ${church.emails.women} to ask about the next gathering.`,
    ],
    facts: [{ label: 'Contact', value: church.emails.women }],
  },
  {
    slug: 'men',
    title: 'Men',
    text: 'Inductive study in Mark — 2nd and 4th Thursdays.',
    image: '/images/ministries/men.jpg',
    video: '/videos/ministries/men.mp4',
    poster: '/images/ministries/men.jpg',
    email: church.emails.men,
    lead: 'Inductive study in the Gospel of Mark.',
    description: `Men’s ministry at Calvary Chapel Frederick. ${church.men.blurb} Email ${church.emails.men}.`,
    scripture: {
      text: 'Be watchful, stand firm in the faith, act like men, be strong.',
      ref: '1 Corinthians 16:13',
    },
    paragraphs: [church.men.blurb, `Email ${church.emails.men} to join a Thursday study.`],
    facts: [
      { label: 'When', value: '2nd and 4th Thursday · 10:00 AM or 7:00 PM' },
      { label: 'Study', value: 'Inductive study — Gospel of Mark' },
    ],
  },
  {
    slug: 'small-groups',
    title: 'Small Groups',
    text: 'Grow in faith and community through the week.',
    image: '/images/ministries/groups.jpg',
    video: '/videos/ministries/small-groups.mp4',
    poster: '/images/ministries/groups.jpg',
    email: church.email,
    lead: 'Grow in faith and community through the week.',
    description:
      'Small groups at Calvary Chapel Frederick. Grow in faith and community through the week. Downtown Frederick, MD.',
    scripture: {
      text: 'And let us consider how to stir up one another to love and good works, not neglecting to meet together.',
      ref: 'Hebrews 10:24–25',
    },
    paragraphs: [
      'Small groups help people grow in faith and community through the week.',
      `Email ${church.email} if you want to get connected with a group.`,
    ],
    facts: [{ label: 'Contact', value: church.email }],
  },
  {
    slug: 'volunteer',
    title: 'Volunteer',
    text: 'Greeting, kids, A/V, coffee, and more.',
    image: '/images/ministries/serve.jpg',
    video: '/videos/ministries/volunteer.mp4',
    poster: '/images/ministries/serve.jpg',
    email: church.email,
    lead: 'Greeting, kids, A/V, coffee, and more.',
    description:
      'Volunteer at Calvary Chapel Frederick. Serve in greeting, kids, A/V, coffee, and more. Downtown Frederick, MD.',
    scripture: {
      text: 'For even the Son of Man came not to be served but to serve.',
      ref: 'Mark 10:45',
    },
    paragraphs: [
      'There is a place to serve — greeting, kids, A/V, coffee, and more.',
      `Email ${church.email} if you want to help. Stay after a service and introduce yourself to a greeter.`,
    ],
    facts: [
      { label: 'Teams', value: 'Greeting, kids, A/V, coffee, and more' },
      { label: 'Contact', value: church.email },
    ],
  },
];

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
