import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { SafeImage } from './SafeImage';

export function CartDrawer() {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cartDetailedItems,
    cartCount,
    cartSubtotal,
    shippingCost,
    cartTotal,
    freeShippingThreshold,
    updateCartQuantity,
    removeFromCart,
  } = useStore();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#171923]/40 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping bag"
    >
      <div
        className="fixed inset-0"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EAEAF0] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-5 w-5 text-[#7138D4]" />
            <h2 className="font-display text-lg font-bold text-[#171923]">
              Shopping Bag ({cartCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Close shopping bag"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#747583] transition-colors hover:bg-[#F8F8FC] hover:text-[#171923]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free shipping indicator */}
        {cartDetailedItems.length > 0 && (
          <div className="border-b border-[#EAEAF0] bg-[#F8F8FC] px-6 py-3">
            <p className="text-xs font-medium text-[#171923]">
              {remainingForFreeShipping === 0
                ? 'Your order qualifies for complimentary standard delivery.'
                : `Add $${remainingForFreeShipping.toFixed(2)} more to unlock free standard delivery.`}
            </p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#EAEAF0]">
              <div
                className="h-full rounded-full bg-[#7138D4] transition-all duration-300"
                style={{
                  width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {cartDetailedItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EDFF] text-[#7138D4]">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-[#171923]">
                Your bag is empty
              </h3>
              <p className="mt-1.5 max-w-xs text-sm text-[#747583]">
                Explore our headphones, wireless earbuds, and acoustic speakers to get started.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/shop');
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7138D4] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5425AE]"
              >
                Browse Collection
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#EAEAF0]">
              {cartDetailedItems.map(({ item, product }) => (
                <li
                  key={`${item.productId}-${item.colorName}`}
                  className="flex gap-4 py-4 first:pt-0"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#F8F8FC] border border-[#EAEAF0]"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-display text-sm font-semibold text-[#171923] hover:text-[#7138D4] line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-[#747583] mt-0.5">{item.colorName}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id, item.colorName)}
                        aria-label={`Remove ${product.name}`}
                        className="text-[#747583] hover:text-[#C43874] p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-xl border border-[#EAEAF0] bg-[#F8F8FC]">
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(product.id, item.colorName, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="inline-flex h-8 w-8 items-center justify-center text-[#171923] hover:text-[#7138D4]"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateCartQuantity(product.id, item.colorName, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="inline-flex h-8 w-8 items-center justify-center text-[#171923] hover:text-[#7138D4]"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <span className="font-display text-sm font-bold text-[#171923] tabular-nums">
                        ${(product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer summary */}
        {cartDetailedItems.length > 0 && (
          <div className="border-t border-[#EAEAF0] bg-white px-6 py-5">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#747583]">
                <span>Subtotal</span>
                <span className="font-medium text-[#171923] tabular-nums">
                  ${cartSubtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#747583]">
                <span>Shipping</span>
                <span className="font-medium text-[#171923] tabular-nums">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#EAEAF0] pt-2.5 font-display text-base font-bold text-[#171923]">
                <span>Total</span>
                <span className="tabular-nums">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/cart');
                }}
                className="rounded-xl border border-[#EAEAF0] bg-white px-4 py-3 text-sm font-semibold text-[#171923] transition-colors hover:bg-[#F8F8FC]"
              >
                View Bag
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#7138D4] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5425AE]"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
