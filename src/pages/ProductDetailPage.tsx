
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import ScrollObserver from '@/components/ScrollObserver';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, addToWishlist, wishlist } = useStore();
  
  const product = products.find(p => p.id === Number(id));
  
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  
  const isInWishlist = wishlist.some(item => product && item.id === product.id);
  
  // Get similar products
  const similarProducts = products
    .filter(p => p.id !== Number(id))
    .slice(0, 4);
  
  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="mb-6">The product you are looking for does not exist.</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.info(`${product.name} is already in your wishlist!`);
    }
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate('/checkout');
  };

  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex text-sm text-fashion-secondary">
            <li className="hover:text-fashion-accent">
              <a href="/">Home</a>
            </li>
            <li className="mx-2">/</li>
            <li className="hover:text-fashion-accent">
              <a href="/products">Products</a>
            </li>
            <li className="mx-2">/</li>
            <li className="text-fashion-primary font-medium truncate">{product.name}</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4 animate-fade-in">
            <div className="bg-gray-50 rounded-lg overflow-hidden h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
              <img 
                src={selectedImage} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            
            {product.thumbnails && product.thumbnails.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.thumbnails.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`
                      border-2 rounded-md overflow-hidden h-24
                      ${selectedImage === image ? 'border-fashion-accent' : 'border-transparent'}
                    `}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="animate-slide-up">
            <div className="flex items-center text-amber-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                  className={i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300"} 
                />
              ))}
              <span className="text-fashion-secondary ml-2">{product.rating} Rating</span>
            </div>
            
            <h1 className="text-3xl font-bold text-fashion-primary mb-2">{product.name}</h1>
            <p className="text-fashion-secondary mb-4">{product.brand}</p>
            
            <div className="text-2xl font-bold text-fashion-accent mb-6">${product.price.toFixed(2)}</div>
            
            <p className="text-fashion-secondary mb-8">{product.description}</p>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-medium text-fashion-primary mb-3">Color: <span className="capitalize">{selectedColor}</span></h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      w-8 h-8 rounded-full border-2 
                      ${selectedColor === color ? 'border-fashion-accent p-0.5' : 'border-gray-200'}
                    `}
                  >
                    <span 
                      className="block w-full h-full rounded-full" 
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-medium text-fashion-primary mb-3">Size: {selectedSize}</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-10 h-10 flex items-center justify-center rounded-md border
                      ${selectedSize === size 
                        ? 'border-fashion-accent bg-fashion-accent text-white' 
                        : 'border-gray-300 hover:border-fashion-accent'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="font-medium text-fashion-primary mb-3">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-l-md"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 border-y text-center"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-fashion-accent hover:bg-fashion-primary"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
              
              <Button 
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-fashion-primary hover:bg-black"
              >
                <ShoppingBag size={18} />
                Buy Now
              </Button>
              
              <Button 
                onClick={handleAddToWishlist}
                variant="outline"
                className={`
                  px-4 border-fashion-secondary
                  ${isInWishlist 
                    ? 'bg-fashion-accent text-white border-fashion-accent' 
                    : 'text-fashion-secondary hover:text-fashion-accent hover:border-fashion-accent'}
                `}
              >
                <Heart size={18} fill={isInWishlist ? "white" : "none"} />
              </Button>
            </div>
            
            {/* Shipping Info */}
            <div className="border-t border-b py-6 space-y-4">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-fashion-secondary" />
                <span className="text-fashion-secondary">Free shipping on orders over $50</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-fashion-secondary" />
                <span className="text-fashion-secondary">2-year warranty on all products</span>
              </div>
              
              <div className="flex items-center gap-3">
                <RotateCcw size={20} className="text-fashion-secondary" />
                <span className="text-fashion-secondary">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
        
        <ScrollObserver className="mb-16">
          <h2 className="text-2xl font-semibold text-fashion-primary mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </ScrollObserver>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
