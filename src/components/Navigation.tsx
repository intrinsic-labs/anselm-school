"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Image } from "next-sanity/image";

export default function Navigation({
  logoImage,
}: {
  logoImage?: { url: string; alt: string };
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // For background: transparent on homepage when not scrolled, otherwise primary color
  const bgClass =
    pathname === "/" && !isScrolled ? "bg-transparent" : "bg-primary";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6 ${bgClass}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="hover:text-secondary transition-all duration-300"
          >
            {logoImage && (
              <Image
                src={logoImage.url}
                alt={logoImage.alt}
                className="h-14 w-auto"
                width={100}
                height={48}
              />
            )}
          </Link>
          <Link
            href="/"
          >
            <h5 className="text-white">THE ANSELM SCHOOL</h5>
          </Link>
        </div>

        <div className="flex items-center">
          <Link
            href="/give"
            className={`${isScrolled ? "btn-primary" : "btn-outline-primary"}`}
          >
            Give
          </Link>
        </div>
      </div>
    </nav>
  );
}
