import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  // 1. CART STATE
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('saur_haul_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: "sh-001",
          slug: "phantom-oversized-fleece-hoodie",
          name: "PHANTOM OVERSIZED FLEECE HOODIE",
          price: 2499,
          originalPrice: 3999,
          frontImage: "https://i.pinimg.com/736x/0f/c0/c3/0fc0c34cf8c79249fc9a247ec3fb4212.jpg",
          size: "L",
          color: "Pitch Black",
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('saur_haul_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // 2. COUPON STATE
  const [coupon, setCoupon] = useState(null);

  // 3. USER & AUTH STATE
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('saur_haul_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) localStorage.setItem('saur_haul_user', JSON.stringify(user));
      else localStorage.removeItem('saur_haul_user');
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // 4. ORDERS STATE
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('saur_haul_orders');
      return saved ? JSON.parse(saved) : [
        {
          orderNumber: "SH-84920",
          date: "18 Nov 2026",
          items: [
            {
              name: "DRAGON STATEMENT WAFFLE TEE",
              size: "L",
              color: "Washed Carbon",
              price: 1299,
              quantity: 1,
              image: "https://i.pinimg.com/736x/b7/8d/3b/b78d3bf33fb5020221930276afc87e4a.jpg"
            }
          ],
          subtotal: 1299,
          shipping: 0,
          total: 1299,
          paymentMethod: "Prepaid UPI",
          status: "Dispatched from Jodhpur",
          trackingNumber: "DTDC-JH-984210"
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('saur_haul_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // 5. SEARCH OVERLAY STATE
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // CART CALCULATIONS
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const freeShippingThreshold = 1999;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 150;

  let discountAmount = 0;
  if (coupon) {
    if (coupon.type === 'fixed') {
      discountAmount = Math.min(coupon.value, cartSubtotal);
    } else if (coupon.type === 'percent') {
      discountAmount = Math.round((cartSubtotal * coupon.value) / 100);
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - discountAmount + (cart.length > 0 ? shippingFee : 0));

  // CART ACTIONS
  const addToCart = (product, size, color, quantity = 1) => {
    if (!size && product.sizes && product.sizes.length > 0) {
      size = product.sizes[0];
    }
    if (!color && product.colors && product.colors.length > 0) {
      color = product.colors[0].name;
    }

    setCart((prev) => {
      const idx = prev.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      if (idx > -1) {
        const next = [...prev];
        next[idx] = {
          ...next[idx],
          quantity: next[idx].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            frontImage: product.frontImage || product.images?.[0],
            size,
            color,
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (id, size, color) => {
    setCart((prev) => prev.filter(
      (item) => !(item.id === id && item.size === size && item.color === color)
    ));
  };

  const updateQuantity = (id, size, color, qty) => {
    if (qty <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (codeStr) => {
    const code = codeStr.trim().toUpperCase();
    if (code === 'HAUL100') {
      setCoupon({ code: 'HAUL100', type: 'fixed', value: 100 });
      return { success: true, message: '₹100 discount applied!' };
    } else if (code === 'SAUR10') {
      setCoupon({ code: 'SAUR10', type: 'percent', value: 10 });
      return { success: true, message: '10% discount applied!' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try HAUL100' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  // AUTH ACTIONS
  const login = (email, password) => {
    const mockUser = {
      name: email.split('@')[0].toUpperCase(),
      email,
      phone: "+91 99829 08861",
      address: {
        street: "142 Circuit House Road",
        city: "Jodhpur",
        state: "Rajasthan",
        postalCode: "342001"
      }
    };
    setUser(mockUser);
    return { success: true };
  };

  const register = (name, email, password, phone) => {
    const newUser = {
      name,
      email,
      phone: phone || "+91 99829 08861",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: ""
      }
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateAddress = (address) => {
    if (user) {
      setUser({ ...user, address });
    }
  };

  // ORDER ACTIONS
  const placeOrder = (orderData) => {
    const orderNumber = `SH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      orderNumber,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart.map(item => ({
        name: item.name,
        size: item.size,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
        image: item.frontImage
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: cartTotal,
      customer: {
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: `${orderData.address}, ${orderData.city}, ${orderData.state} - ${orderData.postalCode}`
      },
      paymentMethod: orderData.paymentMethod || "Prepaid UPI",
      paymentStatus: "Pending Gateway Authorization (Live Integration Required)",
      status: "Order Received // Awaiting Dispatch",
      trackingNumber: `SAUR-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    return newOrder;
  };

  return (
    <ShopContext.Provider value={{
      cart,
      cartCount,
      cartSubtotal,
      shippingFee,
      freeShippingThreshold,
      isFreeShipping,
      coupon,
      discountAmount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      user,
      login,
      register,
      logout,
      updateAddress,
      orders,
      placeOrder,
      isSearchOpen,
      openSearch: () => setIsSearchOpen(true),
      closeSearch: () => setIsSearchOpen(false),
      products: PRODUCTS
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
