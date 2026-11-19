import { Instagram, Mail, Share2, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#EAEAF0] bg-[#F8F8FC]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <BrandLogo />
            <p className="max-w-xs text-sm leading-relaxed text-[#747583]">
              Precision wireless audio and modern everyday power essentials designed for studio-grade clarity and effortless comfort.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <Link
                to="/contact"
                aria-label="AURAVIBE Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#EAEAF0] bg-white text-[#747583] transition-colors hover:border-[#7138D4] hover:text-[#7138D4]"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                aria-label="AURAVIBE YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#EAEAF0] bg-white text-[#747583] transition-colors hover:border-[#7138D4] hover:text-[#7138D4]"
              >
                <Youtube className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                aria-label="Share AURAVIBE"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#EAEAF0] bg-white text-[#747583] transition-colors hover:border-[#7138D4] hover:text-[#7138D4]"
              >
                <Share2 className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-sm font-bold text-[#171923]">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#747583]">
              <li>
                <Link to="/" className="transition-colors hover:text-[#7138D4]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="transition-colors hover:text-[#7138D4]">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-[#7138D4]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-[#7138D4]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div>
            <h3 className="font-display text-sm font-bold text-[#171923]">Customer Support</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#747583]">
              <li>
                <Link to="/support/faqs" className="transition-colors hover:text-[#7138D4]">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/support/shipping" className="transition-colors hover:text-[#7138D4]">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/support/returns" className="transition-colors hover:text-[#7138D4]">
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link to="/support/warranty" className="transition-colors hover:text-[#7138D4]">
                  Warranty Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="font-display text-sm font-bold text-[#171923]">Contact</h3>
            <div className="mt-4 space-y-3 text-sm text-[#747583]">
              <p className="leading-relaxed">
                Questions about product specs, compatibility, or an active order? Reach our support desk directly.
              </p>
              <div className="flex items-center gap-2 text-[#171923] font-medium">
                <Mail className="h-4 w-4 text-[#7138D4] shrink-0" />
                <span>support@auravibe.example</span>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center text-sm font-semibold text-[#7138D4] hover:text-[#5425AE]"
              >
                Send a message →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#EAEAF0] pt-6 text-xs text-[#747583] sm:flex-row sm:items-center">
          <p>&copy; {currentYear} AURAVIBE Audio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/support/privacy" className="transition-colors hover:text-[#171923]">
              Privacy Policy
            </Link>
            <Link to="/support/terms" className="transition-colors hover:text-[#171923]">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
