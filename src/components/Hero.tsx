"use client";

import { HeroSectionDisplay } from '../types/display'
import Image from 'next/image'
import GetUpdatesButton from './GetUpdatesButton'
import { links } from '../lib/links'

interface HeroProps {
  data: HeroSectionDisplay
}

export function Hero({ data }: HeroProps) {

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center">
      {/* Background Image */}
      {data.backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${data.backgroundImage.url})` }}
        />
      )}
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 mt-8 md:mt-0">
        {/* Logo */}
        {data.logomark && (
          <div className="-mb-12">
            <Image 
              src={data.logomark.url} 
              alt={data.logomark.alt}
              className="mx-auto"
              width={180}
              height={180}
            />
          </div>
        )}
        {data.logotype && (
          <div className="md:mb-0">
            <Image 
              src={data.logotype.url} 
              alt={data.logotype.alt}
              className="mx-auto max-h-75"
              width={325}
              height={50}
            />
          </div>
        )}
        
        {/* Headline */}
        <h1 className="mb-8 -mt-12 italic">
          {data.headline}
        </h1>
        
        {/* Subheadline */}
        {data.subheadline && (
          <p className="mb-6 opacity-90">
            {data.subheadline}
          </p>
        )}
        
        {/* Opening Statement */}
        {/* {data.openingStatement && (
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-85">
            {data.openingStatement}
          </p>
        )} */}
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

          {/* This is the email signup button */}
          <GetUpdatesButton>
            {data.ctaText}
          </GetUpdatesButton>


          <a
            href={links.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-primary"
          >
            {data.donationCtaText}
          </a>
        </div>
      </div>


    </section>
  )
} 