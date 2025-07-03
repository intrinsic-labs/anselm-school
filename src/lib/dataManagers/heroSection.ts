import { SanityImage, transformImage } from "../dataTransforms"
import { client } from "../sanity"
import { HeroSectionDisplay } from "@/types/display"
import { HERO_SECTION_QUERY } from "@/queries/heroSection"
import { HERO_SECTION_QUERYResult } from "@/types/sanity.types"

/**
 * Fetch and transform hero section data for display
 * In development: runs on every request for hot reloading
 * In production build: runs once at build time for static generation
 */
export async function getHeroSection(): Promise<HeroSectionDisplay | null> {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    console.log(`Fetching hero section data ${isDev ? 'at runtime (dev mode)' : 'at build time (production)'}...`)
    
    const rawData: HERO_SECTION_QUERYResult = await client.fetch(HERO_SECTION_QUERY)
    
    if (!rawData) {
      console.warn('No hero section data found')
      return null
    }
    
    console.log('Hero section data fetched successfully')
    
    // Transform raw Sanity data into display-ready format
    return {
      headline: rawData.headline || '',
      subheadline: rawData.subheadline || undefined,
      openingStatement: rawData.openingStatement || undefined,
      ctaText: rawData.ctaText || 'Get Updates',
      donationCtaText: rawData.donationCtaText || 'Give Today',
      backgroundImage: transformImage(rawData.backgroundImage as SanityImage) || undefined,
      logomark: transformImage(rawData.logomark as SanityImage) || undefined,
      logotype: transformImage(rawData.logotype as SanityImage) || undefined
    }
  } catch (error) {
    console.error(`Error fetching hero section ${process.env.NODE_ENV === 'development' ? 'at runtime (dev mode)' : 'at build time (production)'}:`, error)
    return null
  }
}