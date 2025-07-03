import { PortableText } from '@portabletext/react'
import { PurposeSectionDisplay } from '../types/display'

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
        <div className="text-white prose prose-lg prose-invert max-w-none">
          <PortableText 
            value={content}
            components={{
              block: {
                normal: ({ children }) => <p className="leading-relaxed mb-6">{children}</p>,
                h2: ({ children }) => <h2 className="text-white mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-white mb-4">{children}</h3>,
                
                blockquote: ({ children }) => <blockquote className="italic border-l-4 border-secondary pl-6 my-6">{children}</blockquote>
              },
              marks: {
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                em: ({ children }) => <em className="italic border-b-2 border-secondary">{children}</em>,
                underline: ({ children }) => <span className="underline">{children}</span>
              }
            }}
          />
        </div>
      </div>
    </div>
  )
} 