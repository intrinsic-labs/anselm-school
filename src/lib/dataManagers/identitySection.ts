import { client } from '../sanity'
import { transformImage, SanityImage } from '../dataTransforms'
import { IdentitySectionDisplay, DistinctiveDisplay, MottoDisplay } from '../../types/display'
import { IDENTITY_SECTION_QUERY } from '../../queries/identitySection'
import { IDENTITY_SECTION_QUERYResult } from '@/types/sanity.types'
import { PortableTextBlock } from '@portabletext/types'

/**
 * Transform raw distinctive data into DistinctiveDisplay
 */
function transformDistinctive(rawDistinctive: NonNullable<NonNullable<IDENTITY_SECTION_QUERYResult>["distinctives"]>[number]): DistinctiveDisplay {
  return {
    title: rawDistinctive.title || '',
    shortDescription: rawDistinctive.shortDescription || undefined,
    content: rawDistinctive.content as PortableTextBlock[] || undefined,
    icon: transformImage(rawDistinctive.icon as SanityImage) || undefined
  }
}

/**
 * Transform raw motto data into MottoDisplay
 */
function transformMotto(rawMotto?: NonNullable<IDENTITY_SECTION_QUERYResult>["motto"]): MottoDisplay | undefined {
  if (!rawMotto) return undefined
  
  return {
    primary: rawMotto.primary || undefined,
    sub: rawMotto.sub || undefined,
    showInCarousel: rawMotto.showInCarousel || false,
    mottoExplanation: rawMotto.mottoExplanation as PortableTextBlock[] || undefined
  }
}

/**
 * Fetch and transform identity section data for display
 */
export async function getIdentitySection(): Promise<IdentitySectionDisplay | null> {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    console.log(`Fetching identity section data ${isDev ? 'at runtime (dev mode)' : 'at build time (production)'}...`)
    
    const rawData: IDENTITY_SECTION_QUERYResult = await client.fetch(IDENTITY_SECTION_QUERY)
    
    if (!rawData) {
      console.warn('No identity section data found')
      return null
    }
    
    console.log('Identity section data fetched successfully')
    
    // Transform raw Sanity data into display-ready format
    return {
      titleP1: rawData.titleP1 || undefined,
      titleP2: rawData.titleP2 || undefined,
      distinctives: rawData.distinctives?.map(transformDistinctive) || [],
      motto: transformMotto(rawData.motto),
      ctaText: rawData.ctaText || undefined,
      ctaLink: rawData.ctaLink || undefined
    }
  } catch (error) {
    console.error(`Error fetching identity section ${process.env.NODE_ENV === 'development' ? 'at runtime (dev mode)' : 'at build time (production)'}:`, error)
    return null
  }
} 