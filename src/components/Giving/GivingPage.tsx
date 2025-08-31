import Image from "next/image";
import { GivingSectionDisplay } from "../../types/display";
import PortableTextRenderer from "../PortableTextRenderer";

interface GivingSectionProps {
  givingSection: GivingSectionDisplay;
}

export default function GivingSection({ givingSection }: GivingSectionProps) {
  const { heading, impact, backgroundImage, highlightImage } = givingSection;

  return (
    <div className="flex flex-col">
      {/* Top section with background image */}
      <div
        className="relative min-h-[50vh] flex-col items-center justify-center"
        style={{ backgroundColor: "var(--secondary)" }}
      >
        {/* Background image */}
        {backgroundImage && (
          <div className="absolute inset-0">
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt}
              fill
              className="object-cover opacity-75"
            />
          </div>
        )}

        {/* About giving content */}
        <div className="relative z-10 max-w-2xl mx-auto text-left py-12">
          {/* Heading content */}
          {heading && heading.length > 0 && (
            <div className="mb-12 text-white">
              <PortableTextRenderer value={heading} underlineItalic={false} />
            </div>
          )}

          {/* Decorative line */}
          <div className="w-28 h-1 bg-white mb-8" />

          <div className="font-ibm-plex-mono pb-4 text-primary">
            <h4>YOUR IMPACT</h4>
          </div>

          {/* Impact content */}
          {impact && impact.length > 0 && (
            <div className="mb-12 text-white">
              <PortableTextRenderer value={impact} />
            </div>
          )}

          {/* Highlight image at bottom */}
          {highlightImage && (
            <div className="justify-items-end">
              <div className="drop-shadow-lg">
                <Image
                  src={highlightImage.url}
                  alt={highlightImage.alt}
                  width={200}
                  height={200}
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom section with white background */}
      <div className="relative bg-white">
        {/* section padding */}
        <div className="max-w-2xl mx-auto py-12">
          <div className="text-left italic text-primary">
            <h1>Thank You.</h1>
          </div>

          <div className="text-left text-primary">
            <p>We cannot do this work without your help.</p>
          </div>

          <div className="pt-12">
            <iframe
              src="https://subsplash.com/u/-2CKX3G/give?embed=true"
              width="100%"
              height="630"
              frameBorder="0"
              // I know this is deprecated but it does make the embed look right
              scrolling="no"
              style={{border:"none",overflow:"hidden"}}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
