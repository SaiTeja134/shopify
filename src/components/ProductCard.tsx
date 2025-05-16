
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, addToWishlist, wishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  
  const isInWishlist = wishlist.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInWishlist) {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.info(`${product.name} is already in your wishlist!`);
    }
  };

  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden h-64">
          <img 
            src={product.image} 
            alt={product.name} 
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Button 
              onClick={handleAddToCart} 
              size="sm" 
              className="bg-white text-fashion-primary hover:bg-fashion-accent hover:text-white rounded-full p-2"
            >
              <ShoppingCart size={18} />
            </Button>
            <Button 
              onClick={handleAddToWishlist} 
              size="sm" 
              className={`
                ${isInWishlist ? 'bg-fashion-accent text-white' : 'bg-white text-fashion-primary hover:bg-fashion-accent hover:text-white'}
                rounded-full p-2
              `}
            >
              <Heart size={18} fill={isInWishlist ? "white" : "none"} />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center text-amber-500 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                className={i < Math.floor(product.rating) ? "text-amber-500" : "text-gray-300"} 
              />
            ))}
            <span className="text-gray-600 text-xs ml-1">({product.rating})</span>
          </div>
          
          <h3 className="font-medium text-fashion-primary mb-1 truncate">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-fashion-accent">${product.price.toFixed(2)}</span>
            
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color) => (
                <div 
                  key={color}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{backgroundColor: color}}
                />
              ))}
              {product.colors.length > 3 && <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
