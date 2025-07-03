import { PurposeSectionDisplay } from '../types/display'
import PortableTextRenderer from './PortableTextRenderer'

interface PurposeSectionProps {
  data: PurposeSectionDisplay
}

export default function PurposeSection({ data }: PurposeSectionProps) {
  const { titleP1, titleP2, content, backgroundImage } = data

  return (
    <div 
      className="relative min-h-[50vh] flex items-center justify-center px-8 py-16"
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : { backgroundColor: 'var(--tertiary)' }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-tertiary/80" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
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