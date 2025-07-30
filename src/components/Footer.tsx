import Image from 'next/image';
import Link from 'next/link';
import { links } from '../lib/links'
import GetUpdatesButton from './GetUpdatesButton'

export default function Footer() {
  return (
    <footer className="bg-tertiary text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        {/* Logo Section */}
        <div className="flex flex-col lg:flex-row items-center mx-auto mb-8">
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/images/logo/Anselm School_logos-01.svg"
              alt="The Anselm School Logo"
              width={200}
              height={240}
              className="w-auto h-32 lg:h-48 mb-4 lg:mb-0"
            />
          </div>
          <h1 className="text-primary max-w-3xl mx-auto text-center lg:text-left">Help Us Reclaim Classical Education in Charlotte, NC.</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">

          {/* Contact Info */}
          <div className="text-center lg:text-left sm:mb-4 lg:mb-0">
            <h4 className="text-primary font-ibm-plex-mono mb-6 uppercase tracking-wide">Contact Info</h4>
            <div className="space-y-4">
              <div>
                <p className="font-ibm-plex-mono">EMAIL</p>
                <Link
                  href="mailto:egreb@anselmschool.org"
                  className="hover:text-secondary transition-colors"
                >
                  egreb@anselmschool.org
                </Link>
              </div>
              <div className="pt-4">
                <GetUpdatesButton />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left sm:mb-4 lg:mb-0">
            <h4 className="text-primary font-ibm-plex-mono mb-6 uppercase tracking-wide">Quick Links</h4>
            <nav className="space-y-3">
              <div><Link href={links.identity} className="hover:text-secondary transition-colors">About</Link></div>
              <div><Link href={links.donate} className="hover:text-secondary transition-colors">Give</Link></div>
              {/* <div><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></div> */}
              <div><Link href={links.home} className="hover:text-secondary transition-colors">Home</Link></div>
            </nav>
          </div>

          {/* Purpose */}
          <div className="text-center lg:text-left sm:mb-4 lg:mb-0">
            <h4 className="text-primary font-ibm-plex-mono mb-6 uppercase tracking-wide">Purpose</h4>
            <p className="leading-relaxed max-w-xl mx-auto">
              The Anselm School exists to train students in loving the true, doing the good, and beholding the beautiful—cultivating virtue and wisdom so they can live the good life in light of Christ.
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="text-sm opacity-75">
            Copyright © 2025. <span className="text-white">The Anselm School</span>. All rights reserved. Powered by{' '}
            <Link
              href="https://intrinsiclabs.co"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Intrinsic Labs
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
} 