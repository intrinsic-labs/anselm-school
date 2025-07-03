import { DisplayImage } from '../lib/dataTransforms'
import { PortableTextBlock } from '@portabletext/types'

/**
 * Display-ready hero section data
 * Clean interface focused on what the UI actually needs
 */
export interface HeroSectionDisplay {
  headline: string
  subheadline?: string
  openingStatement?: string
  ctaText: string
  donationCtaText: string
  backgroundImage?: DisplayImage
  logomark?: DisplayImage
  logotype?: DisplayImage
}

/**
 * Display-ready image with position information
 */
export interface DisplayImageWithPosition extends DisplayImage {
  position?: string
}

/**
 * Display-ready quote data
 * Clean interface focused on what the UI actually needs
 */
export interface QuoteDisplay {
  id: string               // For React keys and references
  title: string           // Required in schema
  text: string           // Required in schema  
  author: string         // Required in schema
  source?: string        // Optional in schema
  category?: string      // Optional in schema
  featured: boolean      // Has initialValue: false
  showInCarousel: boolean // Has initialValue: false
  authorImage?: DisplayImageWithPosition // Optional image with position
}

/**
 * Display-ready purpose section data
 * Clean interface focused on what the UI actually needs
 */
export interface PurposeSectionDisplay {
  titleP1?: string          // Optional in schema
  titleP2?: string          // Optional in schema
  content: PortableTextBlock[] // Rich text content from Sanity
  highlightQuote?: QuoteDisplay // Optional reference to quote
  backgroundImage?: DisplayImage // Optional background image
}

/**
 * Display-ready distinctive data for identity section
 */
export interface DistinctiveDisplay {
  title: string                  // Required in schema
  shortDescription?: string      // Optional in schema
  content?: PortableTextBlock[]  // Rich text content from Sanity
  icon?: DisplayImage           // Optional image
}

/**
 * Display-ready motto data for identity section
 */
export interface MottoDisplay {
  primary?: string              // Optional in schema
  sub?: string                  // Optional in schema
  showInCarousel: boolean       // Has initialValue: false
  mottoExplanation?: PortableTextBlock[] // Rich text content from Sanity
}

/**
 * Display-ready identity section data
 * Clean interface focused on what the UI actually needs
 */
export interface IdentitySectionDisplay {
  titleP1?: string               // Has initialValue: 'Our'
  titleP2?: string               // Has initialValue: 'Identity'
  distinctives: DistinctiveDisplay[] // Array of distinctives
  motto?: MottoDisplay         // Optional motto object
  ctaText?: string            // Has initialValue: 'Learn More'
  ctaLink?: string            // Has initialValue: '#about'
}

/**
 * Display-ready Anselm section data
 * Clean interface focused on what the UI actually needs
 */
export interface AnselmSectionDisplay {
  id: string                    // For React keys and references
  title: string                 // Has initialValue: 'Saint Anselm of Canterbury'
  lifespan: string             // Has initialValue: 'c. 1033-1109'
  description: PortableTextBlock[] // Rich text content from Sanity
  quote: {                     // Quote object
    text: string               // Has initialValue
    source: string             // Has initialValue: 'Proslogion'
  }
  portrait?: DisplayImage      // Optional portrait image
} 