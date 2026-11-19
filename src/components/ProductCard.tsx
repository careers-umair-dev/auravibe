import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import type { Product } from '../types/store';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const saved = isWishlisted(product.id);

  const badgeTone =
    product.badge === 'Best Seller'
      ? 'bg-[#FCEAF1] text-[#C43874]'
      : product.badge === 'Sale'
        ? 'bg-[#EAF1FF] text-[#325EC4]'
        : 'bg-[#F0EDFF] text-[#5425AE]';

  return (
    <article className="group flex flex-col bg-white rounded-[24px] border border-[#EAEAF0] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(23,25,35,0.06)]">
      {/* Product Image Area (~62% card focus) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#F8F8FC]">
        <Link
          to={`/product/${product.slug}`}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4]"
          aria-label={`View ${product.name}`}
        >
          <SafeImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span
            className={`absolute top-3 left-3 rounded-lg px-2.5 py-1 text-[11px] font-semibold tracking-wide whitespace-nowrap ${badgeTone}`}
          >
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4] ${
            saved
              ? 'bg-[#FCEAF1] border-[#F6C8DB] text-[#C43874]'
              : 'bg-white/90 border-[#EAEAF0] text-[#747583] hover:text-[#171923] hover:bg-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col pt-4 px-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#747583]">
          {product.category}
        </span>

        <Link
          to={`/product/${product.slug}`}
          className="mt-1 font-display text-[17px] font-semibold leading-snug text-[#171923] transition-colors hover:text-[#7138D4] line-clamp-1"
        >
          {product.name}
        </Link>

        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-[#F59E0B]" aria-label={`Rated ${product.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`h-3.5 w-3.5 ${
                  idx < Math.round(product.rating)
                    ? 'fill-[#F59E0B] text-[#F59E0B]'
                    : 'text-[#EAEAF0]'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-[#747583] tabular-nums">
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-[16px] font-bold text-[#171923] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#747583] line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.inStock ? (
            <button
              type="button"
              onClick={() => addToCart(product.id, product.colors[0]?.name, 1, true)}
              aria-label={`Add ${product.name} to cart`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F0EDFF] text-[#7138D4] transition-all duration-200 hover:bg-[#7138D4] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7138D4] shrink-0"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          ) : (
            <span className="text-xs font-medium text-[#747583] whitespace-nowrap">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
