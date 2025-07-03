import { getHeroSection, getPurposeSection } from '../lib/dataManager'
import { Hero } from '../components/Hero'
import Quote from '../components/Quote'
import PurposeSection from '../components/PurposeSection'
import Image from 'next/image';
import Link from 'next/link';

// Ensure this page is statically generated at build time
export const revalidate = false

export default async function Home() {
  const heroData = await getHeroSection()
  // const featuredQuotes = await getFeaturedQuotes()
  const purposeData = await getPurposeSection()
  
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
      
      {/* Description Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-[1.1]">
          <Image
            src="/images/hero-bg.jpg"
            alt="Landscape background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-xl md:text-2xl mb-12 text-white">
            The Anselm School is a classical Christian school opening in Charlotte, NC in 2026. 
            Our aim is to train the hearts and minds of students to be lovers of wisdom, knowledge, and virtue.
          </p>
          
          {/* <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <a href="#" className="btn btn-filled">Give Today</a>
            <a href="#" className="btn btn-outline">Get Updates</a>
          </div> */}
          
          <p className="text-xl italic text-white">Full website coming soon.</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-primary text-white text-center w-full mx-auto opacity-50">
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