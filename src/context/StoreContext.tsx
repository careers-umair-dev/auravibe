import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/catalog';
import type { CartItem, OrderRecord, Product } from '../types/store';

const CART_KEY = 'auravibe_cart_v1';
const WISHLIST_KEY = 'auravibe_wishlist_v1';
const ORDERS_KEY = 'auravibe_orders_v1';

interface StoreContextValue {
  cart: CartItem[];
  wishlist: string[];
  orders: OrderRecord[];
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addToCart: (productId: string, colorName?: string, quantity?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (productId: string, colorName: string, quantity: number) => void;
  removeFromCart: (productId: string, colorName: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
  shippingCost: number;
  cartTotal: number;
  freeShippingThreshold: number;
  cartDetailedItems: Array<{
    item: CartItem;
    product: Product;
  }>;
  placeOrder: (customer: OrderRecord['customer']) => OrderRecord;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function safeReadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => safeReadStorage<CartItem[]>(CART_KEY, []));
  const [wishlist, setWishlist] = useState<string[]>(() =>
    safeReadStorage<string[]>(WISHLIST_KEY, []),
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    safeReadStorage<OrderRecord[]>(ORDERS_KEY, []),
  );
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const addToCart = (
    productId: string,
    colorName?: string,
    quantity = 1,
    openDrawer = true,
  ) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product || !product.inStock) return;
    const resolvedColor = colorName || product.colors[0]?.name || 'Standard';

    setCart((prev) => {
      const existing = prev.find(
        (entry) => entry.productId === productId && entry.colorName === resolvedColor,
      );
      if (existing) {
        return prev.map((entry) =>
          entry.productId === productId && entry.colorName === resolvedColor
            ? { ...entry, quantity: Math.min(99, entry.quantity + quantity) }
            : entry,
        );
      }
      return [...prev, { productId, colorName: resolvedColor, quantity }];
    });

    showToast(`Added ${product.name} to bag`);
    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const updateCartQuantity = (productId: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName);
      return;
    }
    setCart((prev) =>
      prev.map((entry) =>
        entry.productId === productId && entry.colorName === colorName
          ? { ...entry, quantity: Math.min(99, quantity) }
          : entry,
      ),
    );
  };

  const removeFromCart = (productId: string, colorName: string) => {
    setCart((prev) =>
      prev.filter((entry) => !(entry.productId === productId && entry.colorName === colorName)),
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        if (product) showToast(`Removed ${product.name} from saved items`);
        return prev.filter((id) => id !== productId);
      }
      if (product) showToast(`Saved ${product.name} to wishlist`);
      return [...prev, productId];
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartDetailedItems = useMemo(() => {
    return cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return product ? { item, product } : null;
      })
      .filter((entry): entry is { item: CartItem; product: Product } => entry !== null);
  }, [cart]);

  const cartCount = useMemo(
    () => cartDetailedItems.reduce((sum, entry) => sum + entry.item.quantity, 0),
    [cartDetailedItems],
  );

  const cartSubtotal = useMemo(
    () =>
      cartDetailedItems.reduce(
        (sum, entry) => sum + entry.product.price * entry.item.quantity,
        0,
      ),
    [cartDetailedItems],
  );

  const freeShippingThreshold = 150;
  const shippingCost =
    cartSubtotal === 0 ? 0 : cartSubtotal >= freeShippingThreshold ? 0 : 12;
  const cartTotal = cartSubtotal + shippingCost;

  const placeOrder = (customer: OrderRecord['customer']): OrderRecord => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const record: OrderRecord = {
      orderNumber: `AV-${randomDigits}`,
      createdAt: new Date().toISOString(),
      customer,
      paymentMethod: 'cod',
      items: cartDetailedItems.map(({ item, product }) => ({
        productId: product.id,
        name: product.name,
        colorName: item.colorName,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      })),
      subtotal: cartSubtotal,
      shipping: shippingCost,
      total: cartTotal,
    };
    setOrders((prev) => [record, ...prev]);
    setCart([]);
    return record;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        cartCount,
        cartSubtotal,
        shippingCost,
        cartTotal,
        freeShippingThreshold,
        cartDetailedItems,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
}
