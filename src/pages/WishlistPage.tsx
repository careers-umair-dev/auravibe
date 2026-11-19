import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/catalog';

export function WishlistPage() {
  const { wishlist } = useStore();
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="border-b border-[#EAEAF0] pb-6">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171923]">
            Saved Wishlist
          </h1>
          <p className="mt-1 text-sm text-[#747583] tabular-nums">
            {savedProducts.length}{' '}
            {savedProducts.length === 1 ? 'product saved' : 'products saved'}
          </p>
        </div>

        {savedProducts.length === 0 ? (
          <div className="my-14 flex flex-col items-center justify-center rounded-[28px] border border-[#EAEAF0] bg-[#F8F8FC] px-6 py-16 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FCEAF1] text-[#C43874]">
              <Heart className="h-7 w-7" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-[#171923]">
              No saved products yet
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#747583]">
              Tap the heart icon on any AURAVIBE product card to keep track of your favorites here.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7138D4] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#5425AE]"
            >
              Explore Audio Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
