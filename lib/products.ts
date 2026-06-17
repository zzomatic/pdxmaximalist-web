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
    description: 'The PDXmaximaLIST weekly events flyer — every show, every venue, one page. Free to download every week.',
    price: null,
    recurring: false,
    comingSoon: false,
    requiresAddress: false,
  },
  {
    id: 'digital-subscription',
    slug: 'digital-subscription',
    name: 'DIGITAL SUBSCRIPTION',
    description: 'Get the weekly flyer delivered to your inbox every Monday morning. Never miss a show.',
    price: '$X/mo',
    recurring: true,
    comingSoon: false,
    requiresAddress: false,
  },
  {
    id: 'printed-subscription',
    slug: 'printed-subscription',
    name: 'PRINTED TRIFOLD',
    description: 'A physical printed trifold mailed to your door every week. Real paper, real stamps, real Portland.',
    price: '$X/mo',
    recurring: true,
    comingSoon: false,
    requiresAddress: true,
  },
  {
    id: 'field-guide',
    slug: 'field-guide',
    name: 'FIELD GUIDE',
    description: 'A comprehensive printed booklet of Portland music venues, DIY spaces, and underground culture.',
    price: null,
    recurring: false,
    comingSoon: true,
    requiresAddress: false,
  },
]
