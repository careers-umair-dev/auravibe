import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/catalog';
import type { ProductCategory } from '../types/store';

const ALL_CATEGORIES: Array<'All' | ProductCategory> = [
  'All',
  'Earbuds',
  'Headphones',
  'Speakers',
  'Wireless Chargers',
  'Accessories',
];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'best-selling';

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategory = (searchParams.get('category') as 'All' | ProductCategory) || 'All';
  const initialQuery = searchParams.get('q') || '';
  const initialDeals = searchParams.get('filter') === 'deals';
  const initialSort = (searchParams.get('sort') as SortOption) || 'featured';

  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>(
    ALL_CATEGORIES.includes(initialCategory) ? initialCategory : 'All',
  );
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [maxPrice, setMaxPrice] = useState<number>(350);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [dealsOnly, setDealsOnly] = useState<boolean>(initialDeals);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const paramCat = (searchParams.get('category') as 'All' | ProductCategory) || 'All';
    setSelectedCategory(ALL_CATEGORIES.includes(paramCat) ? paramCat : 'All');
    setSearchQuery(searchParams.get('q') || '');
    setDealsOnly(searchParams.get('filter') === 'deals');
    const paramSort = (searchParams.get('sort') as SortOption) || 'featured';
    setSortBy(paramSort);
  }, [searchParams]);

  const handleCategoryChange = (cat: 'All' | ProductCategory) => {
    setSelectedCategory(cat);
    const next = new URLSearchParams(searchParams);
    if (cat === 'All') {
      next.delete('category');
    } else {
      next.set('category', cat);
    }
    setSearchParams(next, { replace: true });
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMaxPrice(350);
    setMinRating(0);
    setInStockOnly(false);
    setDealsOnly(false);
    setSortBy('featured');
    setSearchParams({}, { replace: true });
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (p.price > maxPrice) return false;
      if (p.rating < minRating) return false;
      if (inStockOnly && !p.inStock) return false;
      if (dealsOnly && !p.originalPrice) return false;
      if (q) {
        const hit =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });

    const sorted = [...list];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => a.releaseOrder - b.releaseOrder);
        break;
      case 'best-selling':
        sorted.sort((a, b) => Number(Boolean(b.bestSeller)) - Number(Boolean(a.bestSeller)) || b.reviewCount - a.reviewCount);
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.releaseOrder - b.releaseOrder);
        break;
    }
    return sorted;
  }, [selectedCategory, searchQuery, maxPrice, minRating, inStockOnly, dealsOnly, sortBy]);

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (maxPrice < 350 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (dealsOnly ? 1 : 0);

  return (
    <div className="bg-white">
      {/* Header Banner */}
      <section className="border-b border-[#EAEAF0] bg-[#F8F8FC]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#747583]">
            <Link to="/" className="hover:text-[#7138D4]">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-[#171923]">Shop</span>
            {selectedCategory !== 'All' && (
              <>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="font-medium text-[#7138D4]">{selectedCategory}</span>
              </>
            )}
          </nav>

          <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171923]">
                {dealsOnly ? 'Exclusive Audio Deals' : selectedCategory === 'All' ? 'All Audio Products' : selectedCategory}
              </h1>
              <p className="mt-1.5 text-sm sm:text-[15px] text-[#747583]">
                Explore wireless earbuds, studio headphones, acoustic speakers, and sleek power accessories.
              </p>
            </div>

            <p className="text-xs font-semibold text-[#747583] tabular-nums whitespace-nowrap">
              Showing {filteredProducts.length} of {PRODUCTS.length} products
            </p>
          </div>

          {/* Category Quick Tabs */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1">
            {ALL_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#7138D4] text-white shadow-xs'
                      : 'bg-white border border-[#EAEAF0] text-[#747583] hover:text-[#171923]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-7">
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#747583]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or feature..."
              aria-label="Search products"
              className="w-full rounded-xl border border-[#EAEAF0] bg-[#F8F8FC] py-2.5 pl-10 pr-4 text-sm text-[#171923] placeholder-[#747583] focus:border-[#7138D4] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen((prev) => !prev)}
              className="inline-flex lg:hidden items-center gap-2 rounded-xl border border-[#EAEAF0] bg-white px-4 py-2.5 text-sm font-semibold text-[#171923]"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#7138D4]" />
              Filters
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-[#F0EDFF] px-1.5 py-0.5 text-[11px] font-bold text-[#7138D4] tabular-nums">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-xl border border-[#EAEAF0] bg-white px-3.5 py-2.5 text-sm font-medium text-[#171923] focus:border-[#7138D4] focus:outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Sort: Newest</option>
              <option value="best-selling">Sort: Best Selling</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Sidebar Filters */}
          <aside
            className={`lg:col-span-3 ${
              mobileFiltersOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="rounded-[24px] border border-[#EAEAF0] bg-[#F8F8FC] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-[#171923]">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-[#7138D4] hover:text-[#5425AE]"
                  >
                    Reset all
                  </button>
                )}
              </div>

              {/* Price Range */}
              <div className="border-t border-[#EAEAF0] pt-5">
                <div className="flex items-center justify-between">
                  <label htmlFor="price-range" className="text-sm font-semibold text-[#171923]">
                    Max Price
                  </label>
                  <span className="text-xs font-bold text-[#7138D4] tabular-nums">
                    Up to ${maxPrice}
                  </span>
                </div>
                <input
                  id="price-range"
                  type="range"
                  min={50}
                  max={350}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="mt-3 w-full accent-[#7138D4]"
                />
                <div className="mt-1 flex justify-between text-[11px] text-[#747583] tabular-nums">
                  <span>$50</span>
                  <span>$350</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="border-t border-[#EAEAF0] pt-5">
                <p className="text-sm font-semibold text-[#171923]">Minimum Rating</p>
                <div className="mt-3 space-y-2">
                  {[
                    { label: 'All Ratings', value: 0 },
                    { label: '4.8+ Stars', value: 4.8 },
                    { label: '4.9+ Stars', value: 4.9 },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setMinRating(opt.value)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                        minRating === opt.value
                          ? 'bg-[#F0EDFF] text-[#5425AE] font-semibold'
                          : 'bg-white text-[#747583] hover:text-[#171923]'
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {opt.value > 0 && <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />}
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability & Deals */}
              <div className="border-t border-[#EAEAF0] pt-5 space-y-3">
                <p className="text-sm font-semibold text-[#171923]">Availability</p>
                <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#171923]">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-[#EAEAF0] accent-[#7138D4]"
                  />
                  In Stock Only
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-sm text-[#171923]">
                  <input
                    type="checkbox"
                    checked={dealsOnly}
                    onChange={(e) => setDealsOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-[#EAEAF0] accent-[#7138D4]"
                  />
                  Exclusive Deals Only
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-[28px] border border-[#EAEAF0] bg-[#F8F8FC] px-6 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F0EDFF] text-[#7138D4]">
                  <X className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-display text-xl font-bold text-[#171923]">
                  No products match your filters
                </h2>
                <p className="mt-1.5 max-w-sm text-sm text-[#747583]">
                  Try widening your price range, clearing your search query, or resetting all active filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-6 rounded-xl bg-[#7138D4] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5425AE]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
