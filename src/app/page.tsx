import { getHeroSection, getPurposeSection, getIdentitySection, getAnselmSection } from '../lib/dataManager'
import { Hero } from '../components/Hero'
import Quote from '../components/Quote'
import PurposeSection from '../components/PurposeSection'
import IdentitySection from '../components/IdentitySection'
import IdentityMotto from '../components/IdentityMotto'
import AnselmSection from '../components/AnselmSection'
import Image from 'next/image';
import Link from 'next/link';

// Ensure this page is statically generated at build time
export const revalidate = false

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

      {/* Identity Section - Full Version - Dynamic from Sanity */}
      {identityData && (
        <IdentitySection data={identityData} />
      )}
    

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


      {/* Identity Motto - Standalone Version - Dynamic from Sanity */}
      {/* {identityData?.motto && (
        <IdentityMotto data={identityData.motto} />
      )} */}

      {/* Anselm Section - Dynamic from Sanity */}
      {anselmData && (
        <AnselmSection anselmSection={anselmData} />
      )}
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-tertiary text-white text-center w-full mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-6">
          <Image
            src="/images/logo/Anselm School_logos-07.svg"
            alt="The Anselm School Logo"
            width={130}
            height={130}
            className="mx-auto md:mx-0"
          />
          <p className="text-md">© The Anselm School. All Rights Reserved. Website by <Link href="https://intrinsiclabs.co" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Intrinsic Labs LLC.</Link></p>
        </div>
      </footer>
    </main>
  );
} 