import Image from 'next/image';
import EmailForm from '@/components/emailForm';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Landscape background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-2">
            <div className="flex flex-col items-center justify-center gap-0 relative">
              <Image
                src="/images/logo/Anselm School_logos-02.svg"
                alt="The Anselm School Logo"
                width={220}
                height={220}
                className="mx-auto relative z-10 w-[140px] h-[140px] md:w-[220px] md:h-[220px]"
              />
              <Image
                src="/images/logo/Anselm School_logos-07.svg"
                alt="The Anselm School Logo"
                width={350}
                height={350}
                className="mx-auto -mt-8 w-[220px] h-[220px] md:w-[350px] md:h-[350px]"
              />
            </div>
          </div>
          
          <div className="w-xl">
            <p className="text-2xl md:text-4xl text-white italic mb-8 -mt-10">Opening Fall 2026</p>

            {/* <p className="text-xl md:text-2xl text-white uppercase mb-4">Interest Meeting: May 29</p> */}
            
            <div className="bg-white/10 backdrop-blur-sm p-2 border border-white/30 transition-all">
              <EmailForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Quote Section */}
      <section className="bg-tertiary text-white py-16 px-4 relative overflow-hidden">
        {/* Desktop positioned image - hidden on mobile */}
        <div className="absolute hidden md:block left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 lg:right-[calc(50%-700px)] top-1/3 -translate-y-1/2 md:translate-y-0 md:top-0 z-0 mix-blend-overlay">
          <Image
            src="/images/lewiswriting.png"
            alt="C.S. Lewis writing"
            width={600}
            height={600}
            className="opacity-35 md:opacity-45"
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-center items-center">
            {/* Mobile image - only visible on small screens */}
            <div className="block md:hidden w-full mb-4">
              <Image
                src="/images/lewiswriting.png"
                alt="C.S. Lewis writing"
                width={300}
                height={300}
                className="mx-auto opacity-45 mix-blend-overlay"
              />
            </div>
            
            {/* Quote content */}
            <div className="w-full md:w-2/3 text-center">
              <blockquote className="text-xl md:text-2xl italic mb-4 mt-0">
                &quot;The task of the modern educator is not to cut down jungles but to irrigate deserts.
                The right defense against false sentiments is to inculcate just sentiments.&quot;
              </blockquote>
              <div className="font-ibm-plex-mono text-md">-C.S. Lewis, <span className="italic">The Abolition of Man</span></div>
            </div>
          </div>
        </div>
      </section>
      
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