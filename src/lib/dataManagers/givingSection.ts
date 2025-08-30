import { client } from '../sanity'
import { transformImage, SanityImage } from '../dataTransforms'
import { GivingSectionDisplay } from '../../types/display'
import { GIVING_SECTION_QUERY } from '../../queries/givingSection'
import { GIVING_SECTION_QUERYResult } from '@/types/sanity.types'
import { PortableTextBlock } from '@portabletext/types'

/**
 * Fetch and transform giving section data for display
 */
export async function getGivingSection(): Promise<GivingSectionDisplay | null> {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    console.log(`Fetching giving section data ${isDev ? 'at runtime (dev mode)' : 'at build time (production)'}...`)

    const rawData: GIVING_SECTION_QUERYResult = await client.fetch(GIVING_SECTION_QUERY)

    if (!rawData) {
      console.warn('No giving section data found')
      return null
    }
    
    console.log('Giving section data fetched successfully')
    
    // Transform raw Sanity data into display-ready format
    return {
      id: rawData._id,
      title: rawData.title || '',
      heading: rawData.heading as PortableTextBlock[] || [],
      impact: rawData.impact as PortableTextBlock[] || [],
      backgroundImage: transformImage(rawData.backgroundImage as SanityImage) || undefined,
      highlightImage: transformImage(rawData.highlightImage as SanityImage) || undefined
    }
  } catch (error) {
    console.error(`Error fetching giving section ${process.env.NODE_ENV === 'development' ? 'at runtime (dev mode)' : 'at build time (production)'}:`, error)
    return null
  }
} 