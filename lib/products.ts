export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: string | null
  recurring: boolean
  comingSoon: boolean
  requiresAddress: boolean
}

export const products: Product[] = [
  {
    id: 'free-flyer',
    slug: 'free-flyer',
    name: 'WEEKLY FLYER',
    description: 'Try our free weekly events flyer: every music show for every venue, printable pdf.',
    price: null,
    recurring: false,
    comingSoon: false,
    requiresAddress: false,
  },
  {
    id: 'digital-subscription',
    slug: 'digital-subscription',
    name: 'DIGITAL SUBSCRIPTION',
    description: 'Get the weekly flyer delivered to your inbox every week.',
    price: '$10/mo',
    recurring: true,
    comingSoon: true,
    requiresAddress: false,
  },
  // {
  //   id: 'printed-subscription',
  //   slug: 'printed-subscription',
  //   name: 'PRINTED TRIFOLD',
  //   description: 'Get a physical printed trifold mailed to you every week.',
  //   price: '$20/mo',
  //   recurring: true,
  //   comingSoon: true,
  //   requiresAddress: true,
  // },
  // {
  //   id: 'maxamalist-entertainment',
  //   slug: 'maxamalist',
  //   name: 'MAXAMALIST: ENTERTAINMENT',
  //   description: 'A comprehensive zine-deluxe guide to Portland music and arts culture.',
  //   price: null,
  //   recurring: false,
  //   comingSoon: true,
  //   requiresAddress: false,
  // },
  //   {
  //   id: 'maxamalist-knowledge',
  //   slug: 'maxamalist-knowledge',
  //   name: 'MAXAMALIST: ANALOG KNOWLEDGE',
  //   description: 'Fear not the cultural amnesia of techno-apocalypse, get this field guide to all the best record stores, book stores, museums and more.',
  //   price: null,
  //   recurring: false,
  //   comingSoon: true,
  //   requiresAddress: false,
  // },
  // {
  //   id: 'maxamalist-makers',
  //   slug: 'maxamalist-makers',
  //   name: 'MAXAMALIST: MAKERS',
  //   description: 'Want to find real people who make real things in the real world? Get this maximaLIST of people and spaces that make this place.',
  //   price: null,
  //   recurring: false,
  //   comingSoon: true,
  //   requiresAddress: false,
  // },
  // {
  //   id: 'maxamalist-max',
  //   slug: 'maxamalist-max',
  //   name: 'MAXAMALIST: MAX-PACK',
  //   description: 'MAX-OUT and GET EVERYTHING! This include all printed MAXIMALIST material and a subscription for the weekly show flyer sent to you (snail mail or digital subscription) for 1 year.',
  //   price: null,
  //   recurring: false,
  //   comingSoon: true,
  //   requiresAddress: false,
  // },
]
