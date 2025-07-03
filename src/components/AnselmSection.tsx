import Image from 'next/image'
import { AnselmSectionDisplay } from '../types/display'
import PortableTextRenderer from './PortableTextRenderer'

interface AnselmSectionProps {
  anselmSection: AnselmSectionDisplay
}

export default function AnselmSection({ anselmSection }: AnselmSectionProps) {
  const { title, lifespan, description, quote, portrait } = anselmSection

  // Fixed left alignment behavior (duplicating Quote component's left alignment)
  const getImageContainerStyle = () => {
    return {
      left: '0',
      right: '30%', 
      transform: 'translateX(-10%) translateY(10%)'
    }
  }

  // Fixed object position for left alignment
  const getObjectPosition = () => {
    return 'right top' // Show right side of image, starting from top
  }

  return (
    <div 
      className="relative min-h-[50vh] flex items-center justify-center px-8 py-16 overflow-hidden"
      style={{ backgroundColor: 'var(--primary)' }}
    >
      {/* Portrait image as background */}
      {portrait && (
        <div 
          className="absolute inset-y-0 mix-blend-overlay opacity-45"
          style={getImageContainerStyle()}
        >
          <Image
            src={portrait.url}
            alt={portrait.alt}
            fill
            className="object-cover"
            style={{ 
              objectPosition: getObjectPosition(),
            }}
          />
        </div>
      )}
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Decorative line */}
        <div className="w-28 h-1 bg-secondary mx-auto mb-8" />
        
        {/* Title and lifespan */}
        <div className="mb-8">
          <h2 className="text-white mb-2 italic">{title}</h2>
          <p className="text-white opacity-90 font-ibm-plex-mono">{lifespan}</p>
        </div>
        
        {/* Description content */}
        {description && description.length > 0 && (
          <div className="mb-12 text-white">
            <PortableTextRenderer value={description} />
          </div>
        )}
        
        {/* Quote */}
        <blockquote className="mb-12">
          <h3 className="text-white italic leading-relaxed">
            &ldquo;{quote.text}&rdquo;
          </h3>
        </blockquote>
        
        {/* Quote source */}
        <div className="text-white">
          <p className="text-sm opacity-90 font-ibm-plex-mono">{quote.source}</p>
        </div>
        
        {/* Decorative line */}
        <div className="w-28 h-1 bg-secondary mx-auto mt-8" />
      </div>
    </div>
  )
} 