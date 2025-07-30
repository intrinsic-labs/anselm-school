import Image from 'next/image'
import { QuoteDisplay } from '../types/display'

interface QuoteProps {
  quote: QuoteDisplay
}

export default function Quote({ quote }: QuoteProps) {
  const { text, author, source, authorImage } = quote

  // Get container styles based on position
  const getImageContainerStyle = (position?: string) => {
    switch (position) {
      case 'left':
        return {
          left: '0',
          right: '30%', 
          transform: 'translateX(-10%) translateY(10%)'
        }
      case 'right':
        return {
          left: '30%',
          right: '0',
          transform: 'translateX(10%) translateY(10%)'
        }
      case 'center':
      default:
        return {
          left: '50%',
          right: 'auto',
          width: '100%', 
          transform: 'translateX(-50%)'
        }
    }
  }

  // Get object position for the image within its container
  const getObjectPosition = (position?: string) => {
    switch (position) {
      case 'left':
        return 'right top' // Show right side of image, starting from top
      case 'right':
        return 'left top' // Show left side of image, starting from top
      case 'center':
      default:
        return 'center top' // Show center of image, starting from top
    }
  }

  return (
    <div 
      className="relative min-h-[50vh] flex items-center justify-center px-8 py-16 bg-tertiary"
    >
      {/* Author image as background */}
      {authorImage && (
        <div 
          className="absolute inset-y-0"
          style={getImageContainerStyle(authorImage.position)}
        >
          <Image
            src={authorImage.url}
            alt={authorImage.alt}
            fill
            className="object-cover opacity-45"
            style={{ 
              objectPosition: getObjectPosition(authorImage.position),
            }}
          />
        </div>
      )}
      
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Decorative line */}
        <div className="w-28 h-1 bg-secondary mx-auto mb-8" />
        
        {/* Quote text */}
        <blockquote className="mb-12">
          <h3 className="text-white italic leading-relaxed">
            &ldquo;{text}&rdquo;
          </h3>
        </blockquote>
        
        {/* Author information - no image, just text */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-white">
            <p className="font-medium font-ibm-plex-mono">{author}</p>
            {source && (
              <p className="text-sm opacity-90 font-ibm-plex-mono">{source}</p>
            )}
          </div>
        </div>
        
        {/* Decorative line */}
        <div className="w-28 h-1 bg-secondary mx-auto mt-8" />
      </div>
    </div>
  )
} 