"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Image } from "next-sanity/image";

export default function Navigation({
  logoImage,
  logoType
}: {
  logoImage?: { url: string; alt: string };
  logoType?: { url: string; alt: string };
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      // Disable body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scroll
      document.body.style.overflow = "";
    }

    return () => {
      // Cleanup: always re-enable scroll when component unmounts
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // For background: transparent on homepage when not scrolled, otherwise primary color
  const bgClass =
    pathname === "/" && !isScrolled ? "bg-transparent hidden sm:block" : "bg-primary";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6 ${bgClass}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className={`hover:text-secondary transition-all duration-300 ${
                isScrolled ? "" : "opacity-50"
                }`}
              onClick={() => {
                if (isMenuOpen) {
                  toggleMenu();
                }
              }}
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
              onClick={() => {
                if (isMenuOpen) {
                  toggleMenu();
                }
              }}
            >
              <h5 className={`text-white hover:text-secondary hidden sm:block ${
                isScrolled ? "" : isMenuOpen ? "opacity-50" : pathname === "/" ? "opacity-0" : "opacity-50"
                }`}>THE ANSELM SCHOOL</h5>
            </Link>
          </div>

          <div className="flex items-center hidden lg:block">
            <Link
              href="/give"
              className={`${isScrolled ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => {
                if (isMenuOpen) {
                  toggleMenu();
                }
              }}
            >
              Give
            </Link>
          </div>

          {/* Mobile menu button - only visible on small screens */}
          <button
            onClick={toggleMenu}
            className="lg:hidden ml-4 focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-10 h-8 flex flex-col justify-center items-center z-50">
              {/* Hamburger icon lines */}
              <span
                className={`block h-0.5 w-9 bg-white transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-45 translate-y-0.5" : "-translate-y-2"
                }`}
              />
              <span
                className={`block h-0.5 w-9 bg-white transition-all duration-300 ease-in-out ${
                  isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay - only appears on small screens */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-primary flex flex-col items-center justify-center">

          <div className="flex flex-col items-center space-y-8 py-32">
            <Link
              href="/"
              className="text-5xl text-white hover:text-secondary"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/give"
              className="text-5xl text-white hover:text-secondary"
              onClick={toggleMenu}
            >
              Give
            </Link>
            
          </div>
          
          {logoType && (
            <Image
              src={logoType.url}
              alt={logoType.alt}
              className="opacity-50"
              width={150}
              height={100}
            />
          )}
        </div>
      )}
    </>
  );
}
