import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'

interface PortableTextRendererProps {
  value: PortableTextBlock[]
  className?: string
  variant?: 'default' | 'large' | 'small'
  textColor?: 'white' | 'dark'
}

export default function PortableTextRenderer({ 
  value, 
  className = '', 
  variant = 'default',
  textColor = 'white'
}: PortableTextRendererProps) {
  
  // Base prose classes with size variants
  const proseClasses = {
    default: 'prose prose-invert max-w-none',
    large: 'prose prose-lg prose-invert max-w-none', 
    small: 'prose prose-sm prose-invert max-w-none'
  }
  
  // Text color classes
  const colorClasses = {
    white: 'text-white',
    dark: 'text-foreground'
  }
  
  const baseClasses = `${colorClasses[textColor]} ${proseClasses[variant]} ${className}`
  
  return (
    <div className={baseClasses}>
      <PortableText 
        value={value}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="leading-relaxed mb-6">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className={`${textColor === 'white' ? 'text-white' : 'text-primary'} mb-4`}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className={`${textColor === 'white' ? 'text-white' : 'text-primary'} mb-4`}>
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className={`${textColor === 'white' ? 'text-white' : 'text-primary'} mb-2`}>
                {children}
              </h4>
            ),
            blockquote: ({ children }) => (
              <blockquote className="italic border-l-4 border-secondary pl-6 my-6">
                {children}
              </blockquote>
            )
          },
          marks: {
            strong: ({ children }) => (
              <strong className="font-semibold">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic border-b-2 border-secondary">{children}</em>
            ),
            underline: ({ children }) => (
              <span className="underline">{children}</span>
            )
          }
        }}
      />
    </div>
  )
} 