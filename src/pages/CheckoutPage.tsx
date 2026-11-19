import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CheckCircle2,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';
import { useStore } from '../context/StoreContext';
import type { OrderRecord } from '../types/store';

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

export function CheckoutPage() {
  const { cartDetailedItems, cartSubtotal, shippingCost, cartTotal, placeOrder } = useStore();

  const [form, setForm] = useState<FormFields>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  const updateField = (key: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: FormErrors = {};
    if (form.fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!/^[+\d\s()-]{7,20}$/.test(form.phone.trim())) {
      next.phone = 'Please enter a valid phone number.';
    }
    if (form.address.trim().length < 5) {
      next.address = 'Please enter your complete street delivery address.';
    }
    if (form.city.trim().length < 2) {
      next.city = 'Please enter your city.';
    }
    if (form.postalCode.trim().length < 3) {
      next.postalCode = 'Please enter a valid postal code.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || cartDetailedItems.length === 0) return;

    const record = placeOrder({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),
    });
    setConfirmedOrder(record);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (confirmedOrder) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="rounded-[28px] border border-[#EAEAF0] bg-[#F8F8FC] p-6 sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E4F5EF] text-[#16805B]">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#7138D4]">
              Order Confirmed — Preparing Shipment
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold text-[#171923]">
              Thank you, {confirmedOrder.customer.fullName}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#747583]">
              Your Cash on Delivery order <span className="font-bold text-[#171923] tabular-nums">#{confirmedOrder.orderNumber}</span> has been recorded. Payment of{' '}
              <span className="font-bold text-[#171923] tabular-nums">
                ${confirmedOrder.total.toFixed(2)}
              </span>{' '}
              will be collected upon delivery.
            </p>

            {/* Delivery Details */}
            <div className="mt-7 grid grid-cols-1 gap-4 rounded-2xl border border-[#EAEAF0] bg-white p-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#747583]">
                  Delivery Address
                </p>
                <p className="mt-1.5 text-sm font-medium text-[#171923]">
                  {confirmedOrder.customer.fullName}
                </p>
                <p className="text-xs text-[#747583] mt-0.5">
                  {confirmedOrder.customer.address}
                </p>
                <p className="text-xs text-[#747583]">
                  {confirmedOrder.customer.city}, {confirmedOrder.customer.postalCode}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#747583]">
                  Payment &amp; Contact
                </p>
                <p className="mt-1.5 text-sm font-medium text-[#171923]">
                  Cash on Delivery (COD)
                </p>
                <p className="text-xs text-[#747583] mt-0.5">{confirmedOrder.customer.email}</p>
                <p className="text-xs text-[#747583] tabular-nums">{confirmedOrder.customer.phone}</p>
              </div>
            </div>

            {/* Receipt Items */}
            <div className="mt-6 rounded-2xl border border-[#EAEAF0] bg-white p-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#EAEAF0]">
                <PackageCheck className="h-4 w-4 text-[#7138D4]" />
                <h2 className="font-display text-sm font-bold text-[#171923]">Order Receipt</h2>
              </div>
              <ul className="divide-y divide-[#EAEAF0]">
                {confirmedOrder.items.map((item) => (
                  <li
                    key={`${item.productId}-${item.colorName}`}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#F8F8FC]">
                        <SafeImage
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#171923] truncate">{item.name}</p>
                        <p className="text-xs text-[#747583]">
                          {item.colorName} · Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#171923] tabular-nums shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 space-y-1.5 border-t border-[#EAEAF0] pt-3 text-sm">
                <div className="flex justify-between text-[#747583]">
                  <span>Subtotal</span>
                  <span className="tabular-nums">${confirmedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#747583]">
                  <span>Shipping</span>
                  <span className="tabular-nums">
                    {confirmedOrder.shipping === 0
                      ? 'Free'
                      : `$${confirmedOrder.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-display text-base font-bold text-[#171923] pt-1">
                  <span>Total Due on Delivery</span>
                  <span className="tabular-nums">${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-xl bg-[#7138D4] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5425AE]"
              >
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center rounded-xl border border-[#EAEAF0] bg-white px-6 py-3 text-sm font-semibold text-[#171923] hover:bg-[#F8F8FC]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartDetailedItems.length === 0) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-20 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EDFF] text-[#7138D4]">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold text-[#171923]">
          Your bag is empty
        </h1>
        <p className="mt-1.5 text-sm text-[#747583]">
          Add items to your shopping bag before proceeding to checkout.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7138D4] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5425AE]"
        >
          Browse Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#747583] hover:text-[#7138D4]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Shopping Bag
        </Link>

        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-[#171923]">
          Checkout
        </h1>
        <p className="mt-1 text-sm text-[#747583]">
          Complete your delivery information below to place your Cash on Delivery order.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Customer Information & Payment */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-[24px] border border-[#EAEAF0] bg-white p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-lg font-bold text-[#171923]">
                Delivery Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-semibold text-[#171923]">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Jordan Taylor"
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[#171923] focus:outline-none ${
                      errors.fullName
                        ? 'border-[#C43874] bg-[#FCEAF1]/30'
                        : 'border-[#EAEAF0] bg-[#F8F8FC] focus:border-[#7138D4] focus:bg-white'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs font-medium text-[#C43874]">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#171923]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@example.com"
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[#171923] focus:outline-none ${
                      errors.email
                        ? 'border-[#C43874] bg-[#FCEAF1]/30'
                        : 'border-[#EAEAF0] bg-[#F8F8FC] focus:border-[#7138D4] focus:bg-white'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs font-medium text-[#C43874]">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-[#171923]">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="+1 555 234 5678"
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[#171923] focus:outline-none ${
                      errors.phone
                        ? 'border-[#C43874] bg-[#FCEAF1]/30'
                        : 'border-[#EAEAF0] bg-[#F8F8FC] focus:border-[#7138D4] focus:bg-white'
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs font-medium text-[#C43874]">{errors.phone}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-semibold text-[#171923]">
                    Complete Delivery Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    value={form.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="Street name, building, apartment or suite"
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[#171923] focus:outline-none ${
                      errors.address
                        ? 'border-[#C43874] bg-[#FCEAF1]/30'
                        : 'border-[#EAEAF0] bg-[#F8F8FC] focus:border-[#7138D4] focus:bg-white'
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs font-medium text-[#C43874]">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className="block text-xs font-semibold text-[#171923]">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    placeholder="Seattle"
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[#171923] focus:outline-none ${
                      errors.city
                        ? 'border-[#C43874] bg-[#FCEAF1]/30'
                        : 'border-[#EAEAF0] bg-[#F8F8FC] focus:border-[#7138D4] focus:bg-white'
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs font-medium text-[#C43874]">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-xs font-semibold text-[#171923]">
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    value={form.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value)}
                    placeholder="98101"
                    className={`mt-1.5 w-full rounded-xl border px-4 py-3 text-sm text-[#171923] focus:outline-none ${
                      errors.postalCode
                        ? 'border-[#C43874] bg-[#FCEAF1]/30'
                        : 'border-[#EAEAF0] bg-[#F8F8FC] focus:border-[#7138D4] focus:bg-white'
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-xs font-medium text-[#C43874]">{errors.postalCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Option */}
            <div className="rounded-[24px] border border-[#EAEAF0] bg-white p-6 sm:p-8">
              <h2 className="font-display text-lg font-bold text-[#171923]">Payment Method</h2>
              <div className="mt-4 flex items-start gap-4 rounded-2xl border-2 border-[#7138D4] bg-[#F0EDFF]/60 p-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#7138D4] text-white">
                  <Banknote className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-[#171923]">
                    Cash on Delivery (COD)
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#747583]">
                    Pay in cash directly to the courier when your AURAVIBE order arrives at your doorstep. No card charge is collected online.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-5 rounded-[24px] border border-[#EAEAF0] bg-[#F8F8FC] p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-[#171923]">Order Summary</h2>

            <ul className="mt-4 divide-y divide-[#EAEAF0]">
              {cartDetailedItems.map(({ item, product }) => (
                <li
                  key={`${item.productId}-${item.colorName}`}
                  className="flex items-center justify-between gap-3 py-3.5 first:pt-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white border border-[#EAEAF0]">
                      <SafeImage
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-semibold text-[#171923] truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#747583]">
                        {item.colorName} · Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-display text-sm font-bold text-[#171923] tabular-nums shrink-0">
                    ${(product.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2.5 border-t border-[#EAEAF0] pt-4 text-sm">
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
                <span>Total (Pay on Delivery)</span>
                <span className="tabular-nums">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7138D4] px-6 py-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5425AE]"
            >
              Confirm COD Order
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#747583]">
              <ShieldCheck className="h-4 w-4 text-[#7138D4]" />
              <span>30-day return guarantee &amp; 1-year product warranty</span>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
