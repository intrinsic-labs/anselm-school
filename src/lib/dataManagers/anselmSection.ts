import { client } from '../sanity'
import { transformImage, SanityImage } from '../dataTransforms'
import { AnselmSectionDisplay } from '../../types/display'
import { ANSELM_SECTION_QUERY } from '../../queries/anselmSection'
import { ANSELM_SECTION_QUERYResult } from '@/types/sanity.types'
import { PortableTextBlock } from '@portabletext/types'

/**
 * Fetch and transform Anselm section data for display
 */
export async function getAnselmSection(): Promise<AnselmSectionDisplay | null> {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    console.log(`Fetching Anselm section data ${isDev ? 'at runtime (dev mode)' : 'at build time (production)'}...`)
    
    const rawData: ANSELM_SECTION_QUERYResult = await client.fetch(ANSELM_SECTION_QUERY)
    
    if (!rawData) {
      console.warn('No Anselm section data found')
      return null
    }
    
    console.log('Anselm section data fetched successfully')
    
    // Transform raw Sanity data into display-ready format
    return {
      id: rawData._id,
      title: rawData.title || '',
      lifespan: rawData.lifespan || '',
      description: rawData.description as PortableTextBlock[] || [],
      quote: {
        text: rawData.quote?.text || '',
        source: rawData.quote?.source || ''
      },
      portrait: transformImage(rawData.portrait as SanityImage) || undefined
    }
  } catch (error) {
    console.error(`Error fetching Anselm section ${process.env.NODE_ENV === 'development' ? 'at runtime (dev mode)' : 'at build time (production)'}:`, error)
    return null
  }
} 