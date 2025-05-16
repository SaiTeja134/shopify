
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  colors: string[];
  sizes: string[];
  brand: string;
  thumbnails?: string[];
};

export type CartItem = Product & {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
};

type StoreContextType = {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  isAuthenticated: boolean;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: number) => void;
  updateCartItem: (productId: number, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  clearCart: () => void;
  clearWishlist: () => void;
  login: () => void;
  logout: () => void;
  moveToCart: (product: Product) => void;
  getTotalPrice: () => number;
  getItemsCount: () => number;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Premium Denim Jacket",
    price: 89.99,
    description: "Classic denim jacket with a modern fit. Made from high-quality denim that's both durable and comfortable.",
    image: "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?q=80&w=1887&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1544642899-f0d6e5f6ed6f?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600502281976-e0e31b326509?q=80&w=1887&auto=format&fit=crop",
    ],
    category: "jackets",
    rating: 4.8,
    colors: ["blue", "black", "gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    brand: "StyleWorks"
  },
  {
    id: 2,
    name: "Slim-Fit Chino Pants",
    price: 49.99,
    description: "Versatile chino pants with a slim fit. Perfect for both casual and semi-formal occasions.",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1897&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1897&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584865288793-449d2b2a42c8?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1887&auto=format&fit=crop",
    ],
    category: "pants",
    rating: 4.5,
    colors: ["beige", "navy", "olive"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    brand: "UrbanComfort"
  },
  {
    id: 3,
    name: "Cotton V-Neck T-Shirt",
    price: 24.99,
    description: "Soft and breathable cotton t-shirt with a flattering V-neck cut. Essential for any wardrobe.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop",
    ],
    category: "t-shirts",
    rating: 4.3,
    colors: ["white", "black", "gray", "blue", "red"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    brand: "BasicLuxe"
  },
  {
    id: 4,
    name: "Leather Chelsea Boots",
    price: 129.99,
    description: "Classic Chelsea boots crafted from premium leather. Timeless style with modern comfort.",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1935&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1935&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621996659490-3275307652ea?q=80&w=1887&auto=format&fit=crop",
    ],
    category: "shoes",
    rating: 4.7,
    colors: ["brown", "black"],
    sizes: ["7", "8", "9", "10", "11", "12"],
    brand: "UrbanWalk"
  },
  {
    id: 5,
    name: "Wool Blend Overcoat",
    price: 189.99,
    description: "Elegant wool blend overcoat, perfect for colder months. Features a classic cut with modern detailing.",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1887&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?q=80&w=1887&auto=format&fit=crop",
    ],
    category: "coats",
    rating: 4.9,
    colors: ["camel", "gray", "navy"],
    sizes: ["S", "M", "L", "XL"],
    brand: "LuxeWear"
  },
  {
    id: 6,
    name: "Cashmere Scarf",
    price: 59.99,
    description: "Luxuriously soft cashmere scarf. Adds elegance and warmth to any winter outfit.",
    image: "https://images.unsplash.com/photo-1520903920243-32211SetaN73DX.jpg?q=80&w=1887&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1520903920243-32211SetaN73DX.jpg?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=1980&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520903074185-9aa21c1d1a42?q=80&w=1887&auto=format&fit=crop",
    ],
    category: "accessories",
    rating: 4.6,
    colors: ["red", "beige", "black", "gray"],
    sizes: ["One Size"],
    brand: "CozyLuxe"
  },
  {
    id: 7,
    name: "Aviator Sunglasses",
    price: 79.99,
    description: "Classic aviator sunglasses with UV protection. Metal frames with comfortable nose pads.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1880&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1880&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1880&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1870&auto=format&fit=crop",
    ],
    category: "accessories",
    rating: 4.4,
    colors: ["gold", "silver", "black"],
    sizes: ["One Size"],
    brand: "SunStyle"
  },
  {
    id: 8,
    name: "Leather Crossbody Bag",
    price: 99.99,
    description: "Compact yet spacious leather crossbody bag. Perfect for everyday use with multiple compartments.",
    image: "https://images.unsplash.com/photo-1590874103328-eac8a90f5120?q=80&w=1876&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1590874103328-eac8a90f5120?q=80&w=1876&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608731267464-c0c889c2ff92?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?q=80&w=1887&auto=format&fit=crop",
    ],
    category: "bags",
    rating: 4.7,
    colors: ["brown", "black", "tan"],
    sizes: ["One Size"],
    brand: "LeatherCraft"
  }
];

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [products] = useState<Product[]>(sampleProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      const savedWishlist = localStorage.getItem('wishlist');
      const savedAuth = localStorage.getItem('isAuthenticated');

      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedAuth) setIsAuthenticated(JSON.parse(savedAuth));
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }, [cart, wishlist, isAuthenticated]);

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prev, { 
          ...product, 
          quantity,
          selectedColor: color || product.colors[0],
          selectedSize: size || product.sizes[0]
        }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartItem = (productId: number, quantity: number) => {
    setCart(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const moveToCart = (product: Product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      wishlist,
      isAuthenticated,
      addToCart,
      removeFromCart,
      updateCartItem,
      addToWishlist,
      removeFromWishlist,
      clearCart,
      clearWishlist,
      login,
      logout,
      moveToCart,
      getTotalPrice,
      getItemsCount,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
