import { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/#categories' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const { cartCount, wishlist, setIsCartDrawerOpen, setIsSearchOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCategoriesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname === '/') {
      const target = document.getElementById('categories');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    navigate('/shop');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#EAEAF0] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* Left: Brand */}
        <BrandLogo />

        {/* Center: Desktop Nav Links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            if (item.to === '/#categories') {
              return (
                <a
                  key={item.label}
                  href="/#categories"
                  onClick={handleCategoriesClick}
                  className="relative py-1 text-sm font-medium text-[#747583] transition-colors duration-200 hover:text-[#171923] whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#7138D4] after:transition-all after:duration-200 hover:after:w-full"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `relative py-1 text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#7138D4] after:transition-all after:duration-200 ${
                    isActive
                      ? 'text-[#171923] after:w-full'
                      : 'text-[#747583] hover:text-[#171923] after:w-0 hover:after:w-full'
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search products"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#171923] transition-colors hover:bg-[#F8F8FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4]"
          >
            <Search className="h-[19px] w-[19px]" />
          </button>

          <Link
            to="/wishlist"
            aria-label={`Saved items (${wishlist.length})`}
            className="relative hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full text-[#171923] transition-colors hover:bg-[#F8F8FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4]"
          >
            <Heart className="h-[19px] w-[19px]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FCEAF1] px-1 text-[10px] font-bold text-[#C43874] tabular-nums">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label={`Open shopping bag (${cartCount} items)`}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#171923] transition-colors hover:bg-[#F8F8FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4]"
          >
            <ShoppingBag className="h-[19px] w-[19px]" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#7138D4] px-1 text-[10px] font-bold text-white tabular-nums transition-transform">
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-[#7138D4] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#5425AE] active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4] focus-visible:ring-offset-2"
          >
            Shop Now
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-full text-[#171923] transition-colors hover:bg-[#F8F8FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#EAEAF0] bg-white px-4 py-4 shadow-lg">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              if (item.to === '/#categories') {
                return (
                  <a
                    key={item.label}
                    href="/#categories"
                    onClick={handleCategoriesClick}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#171923] hover:bg-[#F8F8FC]"
                  >
                    {item.label}
                  </a>
                );
              }
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F0EDFF] text-[#5425AE]'
                        : 'text-[#171923] hover:bg-[#F8F8FC]'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#171923] hover:bg-[#F8F8FC]"
            >
              Saved Wishlist ({wishlist.length})
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-[#171923] hover:bg-[#F8F8FC]"
            >
              Shopping Bag ({cartCount})
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-[#7138D4] px-4 py-3 text-sm font-semibold text-white hover:bg-[#5425AE]"
            >
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
