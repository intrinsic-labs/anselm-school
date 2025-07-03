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