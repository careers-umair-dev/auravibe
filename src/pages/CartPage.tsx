import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { useStore } from '../context/StoreContext';

export function CartPage() {
  const {
    cartDetailedItems,
    cartCount,
    cartSubtotal,
    shippingCost,
    cartTotal,
    freeShippingThreshold,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useStore();

  const remainingForFree = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#EAEAF0] pb-6">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171923]">
              Shopping Bag
            </h1>
            <p className="mt-1 text-sm text-[#747583] tabular-nums">
              {cartCount === 0
                ? 'Your shopping bag is currently empty.'
                : `${cartCount} ${cartCount === 1 ? 'item' : 'items'} in your bag`}
            </p>
          </div>
          {cartDetailedItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="self-start text-xs font-semibold text-[#747583] underline-offset-4 hover:text-[#C43874] hover:underline"
            >
              Clear Bag
            </button>
          )}
        </div>

        {cartDetailedItems.length === 0 ? (
          <div className="my-14 flex flex-col items-center justify-center rounded-[28px] border border-[#EAEAF0] bg-[#F8F8FC] px-6 py-16 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EDFF] text-[#7138D4]">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-[#171923]">
              Nothing in your bag yet
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#747583]">
              Browse our latest wireless headphones, earbuds, portable speakers, and charging pads to add items to your order.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7138D4] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5425AE]"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-4">
              {cartDetailedItems.map(({ item, product }) => (
                <div
                  key={`${item.productId}-${item.colorName}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-[24px] border border-[#EAEAF0] bg-white p-5"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="h-28 w-full sm:w-32 shrink-0 overflow-hidden rounded-2xl bg-[#F8F8FC]"
                  >
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between gap-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#747583]">
                          {product.category}
                        </span>
                        <Link
                          to={`/product/${product.slug}`}
                          className="mt-0.5 block font-display text-lg font-bold text-[#171923] hover:text-[#7138D4]"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-[#747583] mt-0.5">
                          Finish: {item.colorName}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id, item.colorName)}
                        aria-label={`Remove ${product.name}`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#747583] transition-colors hover:bg-[#FCEAF1] hover:text-[#C43874]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#EAEAF0]">
                      <div className="flex items-center gap-4">
                        <div className="inline-flex items-center rounded-xl border border-[#EAEAF0] bg-[#F8F8FC] p-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(product.id, item.colorName, item.quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#171923] hover:bg-white"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartQuantity(product.id, item.colorName, item.quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#171923] hover:bg-white"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-xs text-[#747583] tabular-nums">
                          ${product.price.toFixed(2)} each
                        </span>
                      </div>

                      <span className="font-display text-base font-bold text-[#171923] tabular-nums">
                        ${(product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#5425AE] hover:text-[#7138D4]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Summary Column */}
            <aside className="lg:col-span-4 rounded-[24px] border border-[#EAEAF0] bg-[#F8F8FC] p-6">
              <h2 className="font-display text-lg font-bold text-[#171923]">Order Summary</h2>

              <div className="mt-4 rounded-xl bg-white p-3.5 border border-[#EAEAF0]">
                <p className="text-xs font-medium text-[#171923]">
                  {remainingForFree === 0
                    ? 'Your order qualifies for free standard delivery.'
                    : `Add $${remainingForFree.toFixed(2)} more to unlock free delivery.`}
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

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-[#747583]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#171923] tabular-nums">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#747583]">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#171923] tabular-nums">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between border-t border-[#EAEAF0] pt-3 font-display text-lg font-bold text-[#171923]">
                  <span>Total</span>
                  <span className="tabular-nums">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7138D4] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#5425AE]"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
