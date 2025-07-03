import { client } from '../sanity'
import { transformImageWithPosition, SanityImageWithPosition } from '../dataTransforms'
import { QuoteDisplay } from '../../types/display'
import { 
  QUOTES_QUERY, 
  FEATURED_QUOTES_QUERY, 
  QUOTES_BY_CATEGORY_QUERY, 
  SINGLE_QUOTE_QUERY 
} from '../../queries/quotes'
import { 
  QUOTES_QUERYResult, 
  FEATURED_QUOTES_QUERYResult, 
  QUOTES_BY_CATEGORY_QUERYResult, 
  SINGLE_QUOTE_QUERYResult 
} from '@/types/sanity.types'

/**
 * Fetch and transform all quotes for display
 */
export async function getQuotes(): Promise<QuoteDisplay[] | null> {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    console.log(`Fetching quotes data ${isDev ? 'at runtime (dev mode)' : 'at build time (production)'}...`)
    
    const rawData: QUOTES_QUERYResult = await client.fetch(QUOTES_QUERY)
    
    if (!rawData || rawData.length === 0) {
      console.warn('No quotes data found')
      return null
    }
    
    console.log(`${rawData.length} quotes fetched successfully`)
    
    // Transform raw Sanity data into display-ready format
    return rawData.map((quote): QuoteDisplay => ({
      id: quote._id,
      title: quote.title || '',
      text: quote.text || '',
      author: quote.author || '',
      source: quote.source || undefined,
      category: quote.category || undefined,
      featured: quote.featured || false,
      showInCarousel: quote.showInCarousel || false,
      authorImage: transformImageWithPosition(quote.authorImage as SanityImageWithPosition) || undefined
    }))
  } catch (error) {
    console.error(`Error fetching quotes ${process.env.NODE_ENV === 'development' ? 'at runtime (dev mode)' : 'at build time (production)'}:`, error)
    return []
  }
}

/**
 * Fetch and transform featured quotes for display
 */
export async function getFeaturedQuotes(): Promise<QuoteDisplay[]> {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    console.log(`Fetching featured quotes data ${isDev ? 'at runtime (dev mode)' : 'at build time (production)'}...`)
    
    const rawData: FEATURED_QUOTES_QUERYResult = await client.fetch(FEATURED_QUOTES_QUERY)
    
    if (!rawData || rawData.length === 0) {
      console.warn('No featured quotes data found')
      return []
    }
    
    console.log(`${rawData.length} featured quotes fetched successfully`)
    
    return rawData.map((quote): QuoteDisplay => ({
      id: quote._id,
      title: quote.title || '',
      text: quote.text || '',
      author: quote.author || '',
      source: quote.source || undefined,
      category: quote.category || undefined,
      featured: quote.featured || false,
      showInCarousel: quote.showInCarousel || false,
      authorImage: transformImageWithPosition(quote.authorImage as SanityImageWithPosition) || undefined
    }))
  } catch (error) {
    console.error(`Error fetching featured quotes ${process.env.NODE_ENV === 'development' ? 'at runtime (dev mode)' : 'at build time (production)'}:`, error)
    return []
  }
}

/**
 * Fetch and transform quotes by category for display
 */
export async function getQuotesByCategory(category: string): Promise<QuoteDisplay[]> {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    console.log(`Fetching quotes by category "${category}" ${isDev ? 'at runtime (dev mode)' : 'at build time (production)'}...`)
    
    const rawData: QUOTES_BY_CATEGORY_QUERYResult = await client.fetch(QUOTES_BY_CATEGORY_QUERY, { category })
    
    if (!rawData || rawData.length === 0) {
      console.warn(`No quotes found for category: ${category}`)
      return []
    }
    
    console.log(`${rawData.length} quotes found for category "${category}"`)
    
    return rawData.map((quote): QuoteDisplay => ({
      id: quote._id,
      title: quote.title || '',
      text: quote.text || '',
      author: quote.author || '',
      source: quote.source || undefined,
      category: quote.category || undefined,
      featured: quote.featured || false,
      showInCarousel: quote.showInCarousel || false,
      authorImage: transformImageWithPosition(quote.authorImage as SanityImageWithPosition) || undefined
    }))
  } catch (error) {
    console.error(`Error fetching quotes by category "${category}" ${process.env.NODE_ENV === 'development' ? 'at runtime (dev mode)' : 'at build time (production)'}:`, error)
    return []
  }
}

/**
 * Fetch and transform a single quote by ID for reference resolution
 */
export async function getQuoteById(id: string): Promise<QuoteDisplay | null> {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    console.log(`Fetching quote by ID "${id}" ${isDev ? 'at runtime (dev mode)' : 'at build time (production)'}...`)
    
    const rawData: SINGLE_QUOTE_QUERYResult = await client.fetch(SINGLE_QUOTE_QUERY, { id })
    
    if (!rawData) {
      console.warn(`No quote found with ID: ${id}`)
      return null
    }
    
    console.log(`Quote with ID "${id}" fetched successfully`)
    
    return {
      id: rawData._id,
      title: rawData.title || '',
      text: rawData.text || '',
      author: rawData.author || '',
      source: rawData.source || undefined,
      category: rawData.category || undefined,
      featured: rawData.featured || false,
      showInCarousel: rawData.showInCarousel || false,
      authorImage: transformImageWithPosition(rawData.authorImage as SanityImageWithPosition) || undefined
    }
  } catch (error) {
    console.error(`Error fetching quote by ID "${id}" ${process.env.NODE_ENV === 'development' ? 'at runtime (dev mode)' : 'at build time (production)'}:`, error)
    return null
  }
} 