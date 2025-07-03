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

// Import identity section data manager
import { getIdentitySection } from './dataManagers/identitySection'
// Re-export identity section data manager
export { getIdentitySection }

// Import anselm section data manager
import { getAnselmSection } from './dataManagers/anselmSection'
// Re-export anselm section data manager
export { getAnselmSection }

// Re-export quote data managers for centralized API
export { 
  getQuotes, 
  getFeaturedQuotes, 
  getQuotesByCategory, 
  getQuoteById 
}