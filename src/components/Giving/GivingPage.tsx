import Image from "next/image";
import { GivingSectionDisplay } from "../../types/display";
import PortableTextRenderer from "../PortableTextRenderer";

interface GivingSectionProps {
  givingSection: GivingSectionDisplay;
}

export default function GivingSection({ givingSection }: GivingSectionProps) {
  const { heading, impact, backgroundImage, highlightImage } = givingSection;

  return (
    <div className="flex flex-col w-full">
      {/* Top section with background image */}
      <div
        className="relative min-h-[50vh] flex-col items-center justify-center px-4"
        style={{ backgroundColor: "var(--secondary)" }}
      >
        {/* Background image */}
        {backgroundImage && (
          <div className="absolute inset-0 overflow-hidden justify-items-end">
            <Image
              src={backgroundImage.url}
              alt={backgroundImage.alt}
              width={1000}
              height={80}
              className="object-cover opacity-75 pr-4 overflow-hidden"
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
            <div className="justify-items-end -mb-32">
              <div className="">
                <Image
                  src={highlightImage.url}
                  alt={highlightImage.alt}
                  width={250}
                  height={250}
                  className="object-cover shadow-2xl shadow-black"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom section with white background */}
      <div className="relative bg-white px-4">
        {/* section padding */}
        <div className="max-w-2xl mx-auto pt-12 mt-18">
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
