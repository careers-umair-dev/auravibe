import { useEffect, useState } from 'react';
import {
  Check,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  ZoomIn,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SafeImage } from '../components/SafeImage';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/catalog';

export function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  useEffect(() => {
    setSelectedImageIdx(0);
    setSelectedColor(product?.colors[0]?.name || '');
    setQuantity(1);
    setIsZoomed(false);
    setActiveTab('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-24 text-center">
        <h1 className="font-display text-3xl font-bold text-[#171923]">Product not found</h1>
        <p className="mt-2 text-sm text-[#747583]">
          The product you are looking for may have moved or is no longer listed.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center rounded-xl bg-[#7138D4] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5425AE]"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const saved = isWishlisted(product.id);
  const activeImage = product.gallery[selectedImageIdx] || product.image;
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addToCart(product.id, selectedColor, quantity, false);
    navigate('/checkout');
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#747583]">
          <Link to="/" className="hover:text-[#7138D4]">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/shop" className="hover:text-[#7138D4]">
            Shop
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#7138D4]"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-[#171923] truncate">{product.name}</span>
        </nav>

        {/* Main 2-Column Product Layout */}
        <div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left: Gallery with Zoom */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsZoomed(false)}
              onClick={() => setIsZoomed((prev) => !prev)}
              className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[28px] border border-[#EAEAF0] bg-[#F8F8FC]"
            >
              <div
                className="h-full w-full transition-transform duration-200 ease-out"
                style={{
                  transform: isZoomed ? 'scale(1.6)' : 'scale(1)',
                  transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                }}
              >
                <SafeImage
                  src={activeImage}
                  alt={product.name}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed((prev) => !prev);
                }}
                aria-label={isZoomed ? 'Zoom out' : 'Zoom in product image'}
                className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#171923] shadow-xs border border-[#EAEAF0]"
              >
                <ZoomIn className="h-3.5 w-3.5 text-[#7138D4]" />
                {isZoomed ? 'Reset Zoom' : 'Zoom'}
              </button>
            </div>

            {product.gallery.length > 1 && (
              <div className="flex items-center gap-3">
                {product.gallery.map((imgSrc, idx) => (
                  <button
                    key={imgSrc + idx}
                    type="button"
                    onClick={() => {
                      setSelectedImageIdx(idx);
                      setIsZoomed(false);
                    }}
                    className={`h-20 w-24 overflow-hidden rounded-2xl border-2 transition-all ${
                      selectedImageIdx === idx
                        ? 'border-[#7138D4] shadow-xs'
                        : 'border-[#EAEAF0] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <SafeImage
                      src={imgSrc}
                      alt={`${product.name} view ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#7138D4]">
                <span>{product.category}</span>
                {product.badge && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#5425AE]">{product.badge}</span>
                  </>
                )}
              </div>

              <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171923]">
                {product.name}
              </h1>

              {/* Rating & Stock */}
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5 text-[#F59E0B]">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-4 w-4 ${
                          idx < Math.round(product.rating)
                            ? 'fill-[#F59E0B] text-[#F59E0B]'
                            : 'text-[#EAEAF0]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#171923] tabular-nums">
                    {product.rating}
                  </span>
                  <span className="text-xs text-[#747583] tabular-nums">
                    ({product.reviewCount} reviews)
                  </span>
                </div>

                <span aria-hidden="true" className="text-[#EAEAF0]">|</span>

                <span
                  className={`text-xs font-semibold ${
                    product.inStock ? 'text-[#16805B]' : 'text-[#C43874]'
                  }`}
                >
                  {product.inStock
                    ? `In Stock (${product.stockCount} available)`
                    : 'Currently Out of Stock'}
                </span>
              </div>

              {/* Pricing */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-display text-3xl font-extrabold text-[#171923] tabular-nums">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-[#747583] line-through tabular-nums">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-[#C43874]">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <p className="mt-4 text-[15px] leading-relaxed text-[#747583]">
                {product.shortDescription}
              </p>
            </div>

            {/* Color Selection */}
            <div className="border-t border-[#EAEAF0] pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#747583]">
                Finish: <span className="text-[#171923]">{selectedColor}</span>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                {product.colors.map((color) => {
                  const active = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all ${
                        active
                          ? 'border-[#7138D4] bg-[#F0EDFF] text-[#5425AE]'
                          : 'border-[#EAEAF0] bg-white text-[#171923] hover:border-[#747583]'
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-black/15"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="border-t border-[#EAEAF0] pt-5 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center rounded-xl border border-[#EAEAF0] bg-[#F8F8FC] p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#171923] hover:bg-white"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    aria-label="Increase quantity"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#171923] hover:bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  disabled={!product.inStock}
                  onClick={() => addToCart(product.id, selectedColor, quantity, true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#7138D4] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5425AE] disabled:cursor-not-allowed disabled:bg-[#EAEAF0] disabled:text-[#747583] whitespace-nowrap"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${
                    saved
                      ? 'border-[#F6C8DB] bg-[#FCEAF1] text-[#C43874]'
                      : 'border-[#EAEAF0] bg-white text-[#747583] hover:text-[#171923]'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${saved ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                type="button"
                disabled={!product.inStock}
                onClick={handleBuyNow}
                className="w-full rounded-xl border border-[#7138D4] bg-[#F0EDFF] px-6 py-3.5 text-sm font-bold text-[#5425AE] transition-colors hover:bg-[#7138D4] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buy Now — Express Checkout
              </button>
            </div>

            {/* Shipping & Return Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl border border-[#EAEAF0] bg-[#F8F8FC] p-4">
              <div className="flex items-center gap-2.5">
                <Truck className="h-4 w-4 text-[#7138D4] shrink-0" />
                <span className="text-xs text-[#171923]">Free shipping over $150</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="h-4 w-4 text-[#7138D4] shrink-0" />
                <span className="text-xs text-[#171923]">30-day easy returns</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#7138D4] shrink-0" />
                <span className="text-xs text-[#171923]">1-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Details Tabs */}
        <section className="mt-14 border-t border-[#EAEAF0] pt-10">
          <div className="flex items-center gap-2 border-b border-[#EAEAF0] pb-4 overflow-x-auto">
            {[
              { id: 'overview', label: 'Description & Features' },
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'reviews', label: `Customer Reviews (${product.reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as 'overview' | 'specs' | 'reviews')}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-[#7138D4] text-white'
                    : 'bg-[#F8F8FC] text-[#747583] hover:text-[#171923]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <h2 className="font-display text-xl font-bold text-[#171923]">
                    Acoustic Design &amp; Overview
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#747583]">
                    {product.description}
                  </p>
                </div>
                <div className="lg:col-span-5 rounded-[24px] border border-[#EAEAF0] bg-[#F8F8FC] p-6">
                  <h3 className="font-display text-base font-bold text-[#171923]">Key Highlights</h3>
                  <ul className="mt-4 space-y-3">
                    {product.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-[#171923]">
                        <Check className="h-4 w-4 text-[#7138D4] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl overflow-hidden rounded-[24px] border border-[#EAEAF0]">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-[#EAEAF0]">
                    {product.specs.map((spec) => (
                      <tr key={spec.label} className="bg-white">
                        <th className="w-2/5 bg-[#F8F8FC] px-5 py-3.5 font-semibold text-[#171923]">
                          {spec.label}
                        </th>
                        <td className="px-5 py-3.5 text-[#747583] tabular-nums">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {product.reviews.map((rev) => (
                  <article
                    key={rev.id}
                    className="rounded-[24px] border border-[#EAEAF0] bg-white p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-[#F59E0B]">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                        ))}
                      </div>
                      <span className="text-xs text-[#747583]">{rev.date}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#171923]">{rev.comment}</p>
                    <p className="mt-4 font-display text-sm font-bold text-[#171923]">
                      {rev.author}
                    </p>
                    <p className="text-xs text-[#747583]">{rev.role}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-16 border-t border-[#EAEAF0] pt-12">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-[#171923]">
              You Might Also Like
            </h2>
            <Link
              to="/shop"
              className="text-sm font-semibold text-[#5425AE] hover:text-[#7138D4]"
            >
              View All →
            </Link>
          </div>
          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
