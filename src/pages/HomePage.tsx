import { useState } from 'react';
import {
  ArrowRight,
  Cable,
  CheckCircle2,
  ChevronRight,
  Headphones,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Speaker,
  Star,
  Truck,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { SafeImage } from '../components/SafeImage';
import {
  ABOUT_CRAFT_IMAGE,
  CATEGORIES,
  HERO_IMAGE,
  PRODUCTS,
  TESTIMONIALS,
} from '../data/catalog';
import type { ProductCategory } from '../types/store';

function CategoryIcon({ category }: { category: ProductCategory }) {
  switch (category) {
    case 'Speakers':
      return <Speaker className="h-5 w-5" />;
    case 'Headphones':
      return <Headphones className="h-5 w-5" />;
    case 'Accessories':
      return <Cable className="h-5 w-5" />;
    case 'Wireless Chargers':
      return <Zap className="h-5 w-5" />;
    default:
      return <Headphones className="h-5 w-5" />;
  }
}

export function HomePage() {
  const [email, setEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 3);
  const collectionHighlight = PRODUCTS.filter((p) => !p.featured).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed) {
      setNewsletterError('Please enter your email address.');
      return;
    }
    if (!emailPattern.test(trimmed)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setNewsletterError(null);
    setSubscribedEmail(trimmed);
    setEmail('');
  };

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-5 sm:pt-7">
        <div className="aura-hero-bg relative overflow-hidden rounded-[28px] lg:rounded-[34px] border border-[#EAEAF0]/70">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6 px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            {/* Left Column: Content */}
            <div className="lg:col-span-6 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7138D4]">
                Premium Audio Collection
              </p>

              <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight text-[#171923] text-balance">
                Feel Every <span className="text-[#7138D4]">Beat.</span>
                <br />
                Experience Every Moment.
              </h1>

              <p className="mt-4 sm:mt-5 text-[15px] sm:text-base leading-relaxed text-[#747583] max-w-lg">
                Discover premium audio experiences designed to elevate your everyday moments. Explore exceptional sound, modern technology, and timeless style.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3.5">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7138D4] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#5425AE] active:scale-[0.98] whitespace-nowrap"
                >
                  Shop Collection
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center rounded-xl border border-[#EAEAF0] bg-white px-6 py-3.5 text-sm font-semibold text-[#171923] transition-colors duration-200 hover:bg-[#F8F8FC] whitespace-nowrap"
                >
                  Explore Products
                </a>
              </div>

              {/* Three trust indicators */}
              <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#171923]/8 pt-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#7138D4] shadow-xs">
                    <Truck className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#171923]">Free Shipping</p>
                    <p className="text-[11px] text-[#747583]">On eligible orders</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#7138D4] shadow-xs">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#171923]">Secure Shopping</p>
                    <p className="text-[11px] text-[#747583]">Protected checkout</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#7138D4] shadow-xs">
                    <RotateCcw className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold text-[#171923]">Easy Returns</p>
                    <p className="text-[11px] text-[#747583]">Hassle-free experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Lifestyle Portrait + Overlapping Promo Circle */}
            <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[470px]">
                <div className="aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-[28px] lg:rounded-full bg-gradient-to-tr from-[#E3DBFF] to-[#D9E7FF] p-2 shadow-[0_24px_60px_rgba(113,56,212,0.14)]">
                  <SafeImage
                    src={HERO_IMAGE}
                    alt="Listener enjoying wireless AURAVIBE over-ear headphones in soft pastel light"
                    loading="eager"
                    className="h-full w-full rounded-[22px] lg:rounded-full object-cover object-center"
                  />
                </div>

                {/* Overlapping Pink Circular Promotional Badge */}
                <Link
                  to="/shop?filter=deals"
                  aria-label="Shop deals up to 30% off"
                  className="animate-gentle-float absolute -bottom-3 left-3 sm:bottom-6 sm:-left-4 flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full bg-[#EE3F7D] text-center text-white shadow-[0_14px_30px_rgba(238,63,125,0.34)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4]"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider opacity-95">
                    Up To
                  </span>
                  <span className="font-display text-2xl sm:text-[28px] font-extrabold leading-none my-0.5 tabular-nums">
                    30%
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider">Off</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Products Section */}
      <section id="featured" className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-14 sm:pt-18">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171923]">
              Featured Products
            </h2>
            <p className="mt-1 text-sm sm:text-[15px] text-[#747583]">
              Discover our most popular audio essentials.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#5425AE] transition-colors hover:text-[#7138D4] whitespace-nowrap"
          >
            View All Products
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Shop By Category Section */}
      <section id="categories" className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171923]">
              Shop By Category
            </h2>
            <p className="mt-1 text-sm sm:text-[15px] text-[#747583]">
              Explore audio hardware and everyday charging essentials by collection.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#5425AE] transition-colors hover:text-[#7138D4] whitespace-nowrap"
          >
            Explore All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.id)}`}
              style={{ backgroundColor: cat.bgColor }}
              className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[24px] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(23,25,35,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4]"
            >
              <div className="relative z-10">
                <span
                  style={{ backgroundColor: cat.iconBg, color: cat.iconColor }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                >
                  <CategoryIcon category={cat.id} />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-[#171923]">
                  {cat.title}
                </h3>
                <p className="mt-1 text-xs sm:text-[13px] text-[#747583]">{cat.description}</p>
                <span
                  style={{ color: cat.iconColor }}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold transition-transform duration-200 group-hover:translate-x-1"
                >
                  Shop Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>

              <div className="mt-4 flex justify-end">
                <div className="h-28 w-36 overflow-hidden rounded-2xl bg-white/80 shadow-xs">
                  <SafeImage
                    src={cat.image}
                    alt={`${cat.title} collection`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Promotional Banner Section */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20">
        <div className="aura-gradient flex flex-col items-center justify-between gap-6 rounded-[28px] px-6 py-8 text-center text-white shadow-[0_20px_45px_rgba(84,37,174,0.22)] md:flex-row md:px-12 md:py-10 md:text-left">
          {/* Left Circular White Badge */}
          <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 flex-col items-center justify-center rounded-full bg-white text-center text-[#171923] shadow-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7138D4]">
              Limited
            </span>
            <span className="font-display text-xs font-extrabold leading-tight">
              Time Offer
            </span>
          </div>

          {/* Center Copy */}
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              Exceptional Sound. Exclusive Deals.
            </h2>
            <p className="mt-2 text-sm sm:text-[15px] text-white/90">
              Upgrade your listening experience with special offers on selected audio products.
            </p>
          </div>

          {/* Right White CTA */}
          <Link
            to="/shop?filter=deals"
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#171923] shadow-sm transition-all duration-200 hover:bg-[#F0EDFF] hover:text-[#5425AE] whitespace-nowrap"
          >
            Shop Deals
          </Link>
        </div>
      </section>

      {/* 5. Benefits / Trust Section */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-14 sm:pt-16">
        <div className="grid grid-cols-1 gap-6 rounded-[24px] border border-[#EAEAF0] bg-white p-6 sm:p-8 md:grid-cols-3">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F0EDFF] text-[#7138D4]">
              <Truck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-[#171923]">Free Delivery</h3>
              <p className="mt-1 text-sm text-[#747583]">
                Enjoy convenient delivery on eligible orders over $150.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E4F5EF] text-[#16805B]">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-[#171923]">Easy Shopping</h3>
              <p className="mt-1 text-sm text-[#747583]">
                Simple ordering and a smooth shopping experience from bag to doorstep.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCEAF1] text-[#C43874]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-bold text-[#171923]">Product Warranty</h3>
              <p className="mt-1 text-sm text-[#747583]">
                Shop confidently with dedicated product warranty coverage included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Best Sellers & Essentials */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171923]">
              Best Sellers &amp; Studio Essentials
            </h2>
            <p className="mt-1 text-sm sm:text-[15px] text-[#747583]">
              Everyday acoustic companions and sleek charging gear trusted by listeners.
            </p>
          </div>
          <Link
            to="/shop?sort=best-selling"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#5425AE] transition-colors hover:text-[#7138D4] whitespace-nowrap"
          >
            Browse Best Sellers
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collectionHighlight.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Why Choose AURAVIBE? */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 rounded-[28px] bg-[#F8F8FC] border border-[#EAEAF0] p-6 sm:p-10 lg:p-12">
          <div className="lg:col-span-6 overflow-hidden rounded-2xl bg-white shadow-xs">
            <SafeImage
              src={ABOUT_CRAFT_IMAGE}
              alt="AURAVIBE wireless headphones, tabletop speaker, and magnetic charger on a sunlit studio desk"
              className="aspect-[16/10] w-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 lg:pl-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7138D4]">
              Crafted For Sound
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171923] text-balance">
              Why Choose AURAVIBE?
            </h2>
            <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#747583]">
              We build audio hardware around three fundamentals: accurate acoustic tuning without listener fatigue, breathable ergonomic geometry, and durable anodized metals made to age gracefully.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#EAEAF0] pt-6">
              <div>
                <p className="font-display text-base font-bold text-[#171923]">Pure Tuning</p>
                <p className="mt-1 text-xs leading-relaxed text-[#747583]">
                  Balanced mids and tight low-end calibrated for long listening.
                </p>
              </div>
              <div>
                <p className="font-display text-base font-bold text-[#171923]">All-Day Fit</p>
                <p className="mt-1 text-xs leading-relaxed text-[#747583]">
                  Lightweight headbands and soft cushions reduce clamping pressure.
                </p>
              </div>
              <div>
                <p className="font-display text-base font-bold text-[#171923]">Modern Power</p>
                <p className="mt-1 text-xs leading-relaxed text-[#747583]">
                  USB-C PD and Qi2 charging designed to match your workspace.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-[#EAEAF0] bg-white px-5 py-3 text-sm font-semibold text-[#171923] transition-colors hover:border-[#7138D4] hover:text-[#7138D4]"
              >
                Learn About Our Craft
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Reviews */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20">
        <div className="max-w-xl">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171923]">
            Listener Stories
          </h2>
          <p className="mt-1 text-sm sm:text-[15px] text-[#747583]">
            Feedback from designers, engineers, and everyday music lovers using AURAVIBE gear.
          </p>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between rounded-[24px] border border-[#EAEAF0] bg-white p-6 transition-shadow hover:shadow-[0_12px_28px_rgba(23,25,35,0.05)]"
            >
              <div>
                <div className="flex items-center gap-0.5 text-[#F59E0B]" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[#171923]">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-[#EAEAF0] pt-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F0EDFF] font-display text-xs font-bold text-[#5425AE]">
                  {review.initials}
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-[#171923]">{review.name}</p>
                  <p className="text-xs text-[#747583]">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. Newsletter Subscription */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <div className="rounded-[28px] bg-[#F0EDFF] px-6 py-10 sm:px-12 sm:py-14 text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#171923]">
              Stay Connected With AURAVIBE
            </h2>
            <p className="mt-2.5 text-sm sm:text-[15px] text-[#747583]">
              Subscribe to receive new arrivals, exclusive offers, and the latest updates.
            </p>

            {subscribedEmail ? (
              <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-[#16805B] shadow-xs">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>You&apos;re subscribed with {subscribedEmail}. Watch your inbox for product updates.</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                noValidate
                className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md mx-auto"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (newsletterError) setNewsletterError(null);
                  }}
                  placeholder="Enter your email address"
                  className="flex-1 rounded-xl border border-[#EAEAF0] bg-white px-4 py-3 text-sm text-[#171923] placeholder-[#747583] focus:border-[#7138D4] focus:outline-none focus:ring-2 focus:ring-[#7138D4]/20"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-[#7138D4] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5425AE] whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}

            {newsletterError && (
              <p role="alert" className="mt-2.5 text-xs font-medium text-[#C43874]">
                {newsletterError}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
