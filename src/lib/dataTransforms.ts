import { urlFor } from './sanity'

// Helper type for Sanity image references
export interface SanityImageAsset {
  _id: string
  url: string
}

export interface SanityImage {
  asset?: SanityImageAsset
  alt?: string
}

export interface SanityImageWithPosition extends SanityImage {
  position?: string
}

// Display-focused image type
export interface DisplayImage {
  url: string
  alt: string
}

export interface DisplayImageWithPosition extends DisplayImage {
  position?: string
}

/**
 * Transform a Sanity image object into a display-ready image with URL and alt text
 */
export function transformImage(sanityImage?: SanityImage): DisplayImage | null {
  if (!sanityImage?.asset) return null
  
  return {
    url: urlFor(sanityImage).url(),
    alt: sanityImage.alt || ''
  }
}

/**
 * Transform a Sanity image with position into a display-ready image with URL, alt text, and position
 */
export function transformImageWithPosition(sanityImage?: SanityImageWithPosition): DisplayImageWithPosition | null {
  if (!sanityImage?.asset) return null
  
  return {
    url: urlFor(sanityImage).url(),
    alt: sanityImage.alt || '',
    position: sanityImage.position || 'center'
  }
}

/**
 * Transform a Sanity image with width and height options for responsive images
 * This is the infrastructure for comprehensive image handling later
 */
export function transformImageWithOptions(
  sanityImage?: SanityImage,
  options?: { width?: number; height?: number; quality?: number }
): DisplayImage | null {
  if (!sanityImage?.asset) return null
  
  let builder = urlFor(sanityImage)
  
  if (options?.width) builder = builder.width(options.width)
  if (options?.height) builder = builder.height(options.height)
  if (options?.quality) builder = builder.quality(options.quality)
  
  return {
    url: builder.url(),
    alt: sanityImage.alt || ''
  }
} 