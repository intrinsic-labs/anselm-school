import { MottoDisplay } from '../types/display'

interface IdentityMottoProps {
  data: MottoDisplay
}

export default function IdentityMotto({ data }: IdentityMottoProps) {
  const { primary, sub } = data

  return (
    <div className="relative min-h-[50vh] flex items-center justify-center px-8 py-16 bg-tertiary">
      {/* Overlay for better text readability */}
      {/* <div className="absolute inset-0 bg-tertiary/80" /> */}
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Motto in Latin */}
        {primary && (
          <h1 className="text-white italic mb-6">{primary}</h1>
        )}
        
        <div className="w-28 h-1 bg-secondary mx-auto mb-6" />
        
        {/* Translation */}
        {sub && (
          <p className="text-white font-ibm-plex-mono">{sub}</p>
        )}
      </div>
    </div>
  )
} 