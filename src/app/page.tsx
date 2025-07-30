import { getHeroSection, getPurposeSection, getIdentitySection, getAnselmSection } from '../lib/dataManager'
import { Hero } from '../components/Hero'
import Quote from '../components/Quote'
import PurposeSection from '../components/PurposeSection'
import IdentitySection from '../components/IdentitySection'
// import IdentityMotto from '../components/IdentityMotto'
import AnselmSection from '../components/AnselmSection'
import Footer from '../components/Footer'

// Revalidate content every hour (3600 seconds)
export const revalidate = 3600

export default async function Home() {
  const heroData = await getHeroSection()
  // const featuredQuotes = await getFeaturedQuotes()
  const purposeData = await getPurposeSection()
  const identityData = await getIdentitySection()
  const anselmData = await getAnselmSection()
  
  if (!heroData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Hero section not found</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Hero data={heroData} />
      
      {/* Quote Section - Dynamic from Sanity */}
      {/* {featuredQuotes && featuredQuotes.length > 0 && (
        <section>
          {featuredQuotes.slice(0, 1).map((quote) => (
            <Quote key={quote.id} quote={quote} />
          ))}
        </section>
      )} */}

      {/* Purpose Section - Dynamic from Sanity */}
      {purposeData && (
        <PurposeSection data={purposeData} />
      )}

      {/* Purpose Section Highlight Quote - Dynamic from Sanity */}
      {purposeData?.highlightQuote && (
        <section>
          <Quote quote={purposeData.highlightQuote} />
        </section>
      )}

      {/* Identity Section - Full Version - Dynamic from Sanity */}
      {identityData && (
        <IdentitySection data={identityData} />
      )}


      {/* Identity Motto - Standalone Version - Dynamic from Sanity */}
      {/* {identityData?.motto && (
        <IdentityMotto data={identityData.motto} />
      )} */}

      {/* Anselm Section - Dynamic from Sanity */}
      {anselmData && (
        <AnselmSection anselmSection={anselmData} />
      )}
      
      {/* Footer */}
      <Footer />
    </main>
  );
} 