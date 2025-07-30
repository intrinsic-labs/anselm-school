import Image from 'next/image'
import { LastingSectionDisplay } from '../types/display'
import { getObjectPosition } from '../lib/dataTransforms'
import PortableTextRenderer from './PortableTextRenderer'

interface LastingSectionProps {
  data: LastingSectionDisplay
}

export default function LastingSection({ data }: LastingSectionProps) {
  const { titleP1, titleP2, content, backgroundImage } = data

  return (
    <div 
      className="relative min-h-[50vh] flex items-center justify-center px-8 py-16 "
      id="purpose"
      style={!backgroundImage ? { backgroundColor: 'var(--tertiary)' } : undefined}
    >
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt}
          fill
          className="object-cover"
          style={{
            objectPosition: getObjectPosition(backgroundImage.hotspot)
          }}
          priority
        />
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-primary/70" />
      
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Section Title */}
        {titleP1 && titleP2 && (
          <div className="mb-12">
            <p className="text-white font-ibm-plex-mono uppercase">{titleP1}</p>
            <h1 className="text-white italic mb-6">{titleP2}</h1>
            <div className="w-28 h-1 bg-secondary mx-auto" />
          </div>
        )}
        
        {/* Content */}
        <PortableTextRenderer 
          value={content}
          variant="large"
          textColor="white"
        />
      </div>
    </div>
  )
} 