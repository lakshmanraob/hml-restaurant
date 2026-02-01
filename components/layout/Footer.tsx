import React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-400 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-neutral-100 font-heading font-semibold text-lg mb-4">
              HML Restaurant
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Experience authentic Indian flavors in a family-friendly atmosphere. Join us for live music every Friday!
            </p>
            <p className="text-sm">
              <span className="font-semibold text-neutral-300">Since 2010</span>
              <br />
              Serving Bangalore with love
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-neutral-100 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-sm hover:text-primary-400 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-neutral-100 font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-neutral-300">Mon - Thu:</span> 11:00 AM - 10:00 PM
              </li>
              <li>
                <span className="text-neutral-300">Friday:</span> 11:00 AM - 11:00 PM
                <br />
                <span className="text-primary-400 text-xs">🎵 Live Music 7-10 PM</span>
              </li>
              <li>
                <span className="text-neutral-300">Sat - Sun:</span> 11:00 AM - 11:00 PM
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-neutral-100 font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-neutral-300">Address:</span>
                <br />
                123 MG Road, Koramangala
                <br />
                Bangalore - 560034
              </li>
              <li>
                <span className="text-neutral-300">Phone:</span>
                <br />
                <a href="tel:+918012345678" className="hover:text-primary-400 transition-colors">
                  +91 80 1234 5678
                </a>
              </li>
              <li>
                <span className="text-neutral-300">Email:</span>
                <br />
                <a href="mailto:info@hmlrestaurant.com" className="hover:text-primary-400 transition-colors">
                  info@hmlrestaurant.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              &copy; 2010-{currentYear} HML Restaurant. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm hover:text-primary-400 transition-colors" aria-label="Facebook">
                Facebook
              </Link>
              <Link href="#" className="text-sm hover:text-primary-400 transition-colors" aria-label="Instagram">
                Instagram
              </Link>
              <Link href="#" className="text-sm hover:text-primary-400 transition-colors" aria-label="Twitter">
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
