import Image from "next/image";
import { GivingSectionDisplay } from "../types/display";
import PortableTextRenderer from "./PortableTextRenderer";

interface GivingSectionProps {
  givingSection: GivingSectionDisplay;
}

export default function GivingSection({ givingSection }: GivingSectionProps) {
  const { title, heading, impact, backgroundImage, highlightImage } =
    givingSection;

  // Fixed left alignment behavior (duplicating Quote component's left alignment)
  const getImageContainerStyle = () => {
    return {
      left: "0",
      right: "30%",
      transform: "translateX(-10%) translateY(10%)",
    };
  };

  // Fixed object position for left alignment
  const getObjectPosition = () => {
    return "right top"; // Show right side of image, starting from top
  };

  return (
    <div
      className="relative min-h-[50vh] flex items-center justify-center px-8 py-16 overflow-hidden"
      style={{ backgroundColor: "var(--primary)" }}
    >
      {/* Background image */}
      {backgroundImage && (
        <div
          className="absolute inset-y-0 mix-blend-overlay opacity-45"
          style={getImageContainerStyle()}
        >
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alt}
            fill
            className="object-cover"
            style={{
              objectPosition: getObjectPosition(),
            }}
          />
        </div>
      )}

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Decorative line */}
        <div className="w-28 h-1 bg-secondary mx-auto mb-8" />

        {/* Heading content */}
        {heading && heading.length > 0 && (
          <div className="mb-12 text-white">
            <PortableTextRenderer value={heading} />
          </div>
        )}

        {/* Impact content */}
        {impact && impact.length > 0 && (
          <div className="mb-12 text-white">
            <PortableTextRenderer value={impact} />
          </div>
        )}

        {/* Decorative line */}
        <div className="w-28 h-1 bg-secondary mx-auto mt-8" />
      </div>

      {/* Highlight image at bottom */}
      {highlightImage && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <Image
              src={highlightImage.url}
              alt={highlightImage.alt}
              width={100}
              height={100}
              className="object-cover rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
