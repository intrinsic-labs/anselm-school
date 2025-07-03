
// Import quote-specific data managers
import { 
  getQuotes, 
  getFeaturedQuotes, 
  getQuotesByCategory, 
  getQuoteById 
} from './dataManagers/quotes'

// Import purpose section data manager
import { getPurposeSection } from './dataManagers/purposeSection'
// Re-export purpose section data manager
export { getPurposeSection } 

// Import hero section data manager
import { getHeroSection } from './dataManagers/heroSection'
// Re-export hero section data manager
export { getHeroSection }

// Re-export quote data managers for centralized API
export { 
  getQuotes, 
  getFeaturedQuotes, 
  getQuotesByCategory, 
  getQuoteById 
}