import { client } from '../sanity'
import { transformImage, transformImageWithPosition, SanityImage, SanityImageWithPosition } from '../dataTransforms'
import { PurposeSectionDisplay, QuoteDisplay } from '../../types/display'
import { PURPOSE_SECTION_QUERY } from '../../queries/purposeSection'
import { PURPOSE_SECTION_QUERYResult } from '@/types/sanity.types'
import { PortableTextBlock } from '@portabletext/types'

/**
 * Transform raw quote reference into QuoteDisplay
 */
function transformQuoteReference(rawQuote?: NonNullable<PURPOSE_SECTION_QUERYResult>["highlightQuote"]): QuoteDisplay | undefined {
  if (!rawQuote) return undefined
  
  return {
    id: rawQuote._id,
    title: rawQuote.title || '',
    text: rawQuote.text || '',
    author: rawQuote.author || '',
    source: rawQuote.source || undefined,
    category: rawQuote.category || undefined,
    featured: rawQuote.featured || false,
    authorImage: transformImageWithPosition(rawQuote.authorImage as SanityImageWithPosition) || undefined
  }
}

/**
 * Fetch and transform purpose section data for display
 */
export async function getPurposeSection(): Promise<PurposeSectionDisplay | null> {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    console.log(`Fetching purpose section data ${isDev ? 'at runtime (dev mode)' : 'at build time (production)'}...`)
    
    const rawData: PURPOSE_SECTION_QUERYResult = await client.fetch(PURPOSE_SECTION_QUERY)
    
    if (!rawData) {
      console.warn('No purpose section data found')
      return null
    }
    
    console.log('Purpose section data fetched successfully')
    
    // Transform raw Sanity data into display-ready format
    return {
      titleP1: rawData.titleP1 || undefined,
      titleP2: rawData.titleP2 || undefined,
      content: rawData.content as PortableTextBlock[] || [],
      highlightQuote: transformQuoteReference(rawData.highlightQuote),
      backgroundImage: transformImage(rawData.backgroundImage as SanityImage) || undefined
    }
  } catch (error) {
    console.error(`Error fetching purpose section ${process.env.NODE_ENV === 'development' ? 'at runtime (dev mode)' : 'at build time (production)'}:`, error)
    return null
  }
} 