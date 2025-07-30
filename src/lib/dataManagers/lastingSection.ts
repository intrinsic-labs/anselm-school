import { client } from '../sanity'
import { transformImage, SanityImage } from '../dataTransforms'
import { LastingSectionDisplay } from '../../types/display'
import { LASTING_SECTION_QUERY } from '../../queries/lastingSection'
import { LASTING_SECTION_QUERYResult } from '@/types/sanity.types'
import { PortableTextBlock } from '@portabletext/types'

/**
 * Fetch and transform purpose section data for display
 */
export async function getLastingSection(): Promise<LastingSectionDisplay | null> {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    console.log(`Fetching purpose section data ${isDev ? 'at runtime (dev mode)' : 'at build time (production)'}...`)
    
    const rawData: LASTING_SECTION_QUERYResult = await client.fetch(LASTING_SECTION_QUERY)
    
    if (!rawData) {
      console.warn('No lasting section data found')
      return null
    }
    
    console.log('Lasting section data fetched successfully')
    
    // Transform raw Sanity data into display-ready format
    return {
      titleP1: rawData.titleP1 || undefined,
      titleP2: rawData.titleP2 || undefined,
      content: rawData.content as PortableTextBlock[] || [],
      backgroundImage: transformImage(rawData.backgroundImage as SanityImage) || undefined
    }
  } catch (error) {
    console.error(`Error fetching lasting section ${process.env.NODE_ENV === 'development' ? 'at runtime (dev mode)' : 'at build time (production)'}:`, error)
    return null
  }
} 