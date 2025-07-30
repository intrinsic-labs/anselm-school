import { urlFor } from './sanity'

// Helper types for Sanity image references
export interface SanityImageAsset {
  _id: string
  url: string
}

// Sanity hotspot and crop types
export interface SanityImageHotspot {
  _type: 'sanity.imageHotspot'
  x: number
  y: number
  height: number
  width: number
}

export interface SanityImageCrop {
  _type: 'sanity.imageCrop'
  top: number
  bottom: number
  left: number
  right: number
}

export interface SanityImage {
  asset?: SanityImageAsset
  alt?: string
  hotspot?: SanityImageHotspot
  crop?: SanityImageCrop
}

export interface SanityImageWithPosition extends SanityImage {
  position?: string
}

// Display-focused image type
export interface DisplayImage {
  url: string
  alt: string
  hotspot?: SanityImageHotspot
  crop?: SanityImageCrop
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
    alt: sanityImage.alt || '',
    hotspot: sanityImage.hotspot,
    crop: sanityImage.crop
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
    position: sanityImage.position || 'center',
    hotspot: sanityImage.hotspot,
    crop: sanityImage.crop
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
    alt: sanityImage.alt || '',
    hotspot: sanityImage.hotspot,
    crop: sanityImage.crop
  }
}

/**
 * Calculate object-position CSS value from Sanity hotspot data
 * Hotspot coordinates are normalized (0-1) with origin at top-left
 */
export function getObjectPosition(hotspot?: SanityImageHotspot): string {
  if (!hotspot) return 'center'
  
  // Convert normalized coordinates to percentages
  const x = Math.round(hotspot.x * 100)
  const y = Math.round(hotspot.y * 100)
  
  return `${x}% ${y}%`
} 