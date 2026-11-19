import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/catalog';
import { SafeImage } from './SafeImage';

export function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
    setQuery('');
  }, [isSearchOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const matches = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return PRODUCTS.slice(0, 4);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.shortDescription.toLowerCase().includes(trimmed),
    );
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#171923]/40 pt-16 sm:pt-24 px-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Search AURAVIBE catalog"
    >
      <div
        className="fixed inset-0"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-[#EAEAF0] bg-white shadow-2xl">
        <form onSubmit={handleSubmit} className="flex items-center border-b border-[#EAEAF0] px-5 py-4 gap-3">
          <Search className="h-5 w-5 text-[#7138D4] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search headphones, earbuds, speakers, wireless chargers..."
            className="w-full bg-transparent text-base text-[#171923] placeholder-[#747583] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#747583] hover:bg-[#F8F8FC] hover:text-[#171923]"
          >
            <X className="h-4 w-4" />
          </button>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#747583]">
              {query.trim() ? `Results (${matches.length})` : 'Popular Products'}
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#7138D4] hover:text-[#5425AE]"
            >
              View in Shop
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {matches.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-medium text-[#171923]">
                No audio products found for &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-xs text-[#747583]">
                Try searching for earbuds, headphones, speakers, or chargers.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {matches.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigate(`/product/${product.slug}`);
                  }}
                  className="flex items-center gap-3 rounded-2xl border border-[#EAEAF0] p-2.5 text-left transition-colors hover:border-[#7138D4]/40 hover:bg-[#F8F8FC]"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[#F8F8FC]">
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#747583]">
                      {product.category}
                    </p>
                    <p className="font-display text-sm font-semibold text-[#171923] truncate">
                      {product.name}
                    </p>
                    <p className="text-xs font-bold text-[#7138D4] tabular-nums mt-0.5">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
