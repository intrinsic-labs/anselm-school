"use client"
import { useState } from 'react'
import { IdentitySectionDisplay } from '../types/display'
import PortableTextRenderer from './PortableTextRenderer'

interface IdentitySectionProps {
  data: IdentitySectionDisplay
}

export default function IdentitySection({ data }: IdentitySectionProps) {
  const { titleP1, titleP2, distinctives, motto, ctaText, ctaLink } = data
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <>
      {/* First Section: Title and Distinctives */}
      <div className="relative min-h-[50vh] flex items-center justify-center px-8 py-16 bg-light-gray">
        {/* Overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-tertiary/80" /> */}
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Section Title */}
          {titleP1 && titleP2 && (
            <div className="mb-12">
              <p className="text-white font-ibm-plex-mono uppercase">{titleP1}</p>
              <h1 className="text-white italic mb-6">{titleP2}</h1>
              <div className="w-36 h-1 bg-secondary mx-auto" />
            </div>
          )}
          
          {/* Distinctives Accordion */}
          {distinctives.length > 0 && (
            <div className="w-[600px] mx-auto mb-12">
              {distinctives.map((distinctive, index) => (
                <div key={index} className="mb-6 w-full text-center">
                  {/* Clickable Title */}
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="w-full text-center group"
                  >
                    <h3 className={`font-normal group-hover:text-primary transition-colors duration-200 ${expandedIndex === index ? 'text-primary' : 'text-white'}`}>
                      {distinctive.title}
                      <span className="ml-4 text-secondary transition-colors duration-200">
                        {expandedIndex === index ? '←' : '→'}
                      </span>
                    </h3>
                  </button>
                  
                  {/* Expandable Content */}
                  {expandedIndex === index && (
                    <div className="mt-4 pt-4 border-t border-primary/30 w-full">
                      {/* Short Description */}
                      {distinctive.shortDescription && (
                        <p className="text-white mb-4 leading-relaxed w-full">
                          {distinctive.shortDescription}
                        </p>
                      )}
                      
                      {/* Full Content */}
                      {distinctive.content && (
                        <div className="w-full">
                          <PortableTextRenderer 
                            value={distinctive.content}
                            variant="default"
                            textColor="dark"
                            className="text-left w-full"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Divider between items */}
                  {index < distinctives.length - 1 && (
                    <div className="w-16 h-1 bg-secondary mx-auto mt-6" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Second Section: Motto and CTA */}
      {(motto && (motto.primary || motto.sub)) || (ctaText && ctaLink) ? (
        <div className="relative min-h-[40vh] flex items-center justify-center px-8 py-16 bg-tertiary">
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            {/* Motto Section */}
            {motto && (motto.primary || motto.sub) && (
              <div className="mb-12 text-center">
                {motto.primary && (
                  <h2 className="text-white italic mb-2">{motto.primary}</h2>
                )}
                {motto.sub && (
                  <p className="text-white font-ibm-plex-mono mb-6">{motto.sub}</p>
                )}
                <div className="w-36 h-1 bg-secondary mx-auto" />

                {motto.mottoExplanation && (
                  <PortableTextRenderer 
                    value={motto.mottoExplanation}
                    variant="default"
                    textColor="white"
                    className="max-w-xl mx-auto mt-6"
                  />
                )}
              </div>
            )}
            
            {/* Call to Action */}
            {/* {ctaText && ctaLink && (
              <div className="text-center">
                <a href={ctaLink} className="btn-outline-primary">
                  {ctaText}
                </a>
              </div>
            )} */}
          </div>
        </div>
      ) : null}
    </>
  )
} 