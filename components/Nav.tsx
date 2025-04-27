"use client";
import React, { useState } from "react";
import Link from "next/link"; // Importing Link from next/link
import { FiMenu, FiX } from "react-icons/fi"; // Importing icons from react-icons

/**
 * Nav Component
 * Created by Gabriel Levi Carneiro Ramos
 *
 * Navigation bar component
 *  - A logo displayed on the left, which also works as nav to home.
 *  - A toggleable mobile menu using React state.
 *  - React Icons (FiMenu and FiX) for the mobile menu button.
 *
 * Styled using Tailwind CSS and responsive.
 */
const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [{ name: "Home", href: "/" }];

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <img
                className="h-8 w-auto object-contain"
                src="/logo.png"
                alt="Pokemon App Logo"
              />
            </Link>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" aria-hidden="true" /> // Close icon
              ) : (
                <FiMenu className="h-6 w-6" aria-hidden="true" /> // Menu icon
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-lg font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
