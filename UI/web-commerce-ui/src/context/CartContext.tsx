import React, { createContext, useContext, useState, useEffect } from 'react';

type CartContextType = {
  items: any[];
  addItem: (item: any, qty: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, cantidad: number) => void;
  clearCart: () => void;
  setCheckout: (data: any) => void;
  checkout: any;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [checkout, setCheckout] = useState();

  const addItem = (item: any, qty: number) => {
    setItems((prevItems) => {
      return [...prevItems, { ...item, cantidad: qty }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== Number(id)));
  };

  const updateQuantity = (id: number, cantidad: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === Number(id)
          ? { ...item, cantidad: Math.max(0, cantidad) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((total, item) => total + item.cantidad, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.costoConIVA * item.cantidad,
    0
  );

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        setCheckout,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
