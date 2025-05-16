
import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, HeartOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, moveToCart, clearWishlist } = useStore();

  const handleRemoveItem = (id: number, name: string) => {
    removeFromWishlist(id);
    toast.success(`${name} removed from wishlist!`);
  };

  const handleMoveToCart = (id: number, name: string) => {
    const product = wishlist.find(item => item.id === id);
    if (product) {
      moveToCart(product);
      toast.success(`${name} moved to cart!`);
    }
  };

  const handleClearWishlist = () => {
    clearWishlist();
    toast.success('Wishlist cleared!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-fashion-primary mb-8">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <HeartOff size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium text-fashion-primary mb-4">Your wishlist is empty</h2>
            <p className="text-fashion-secondary mb-8">Explore our products and add your favorites to the wishlist!</p>
            <Link to="/products">
              <Button className="bg-fashion-accent hover:bg-fashion-primary">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                className="text-fashion-secondary border-fashion-secondary hover:text-fashion-accent hover:border-fashion-accent"
                onClick={handleClearWishlist}
              >
                Clear All
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-fashion-primary">Product</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-fashion-primary">Price</th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-fashion-primary">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {wishlist.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-16 h-16 rounded-md object-cover mr-4"
                            />
                            <div>
                              <Link 
                                to={`/product/${item.id}`} 
                                className="text-fashion-primary font-medium hover:text-fashion-accent"
                              >
                                {item.name}
                              </Link>
                              <p className="text-sm text-fashion-secondary mt-1">{item.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-fashion-primary font-medium">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <Button 
                              onClick={() => handleMoveToCart(item.id, item.name)}
                              className="bg-fashion-accent hover:bg-fashion-primary gap-1"
                              size="sm"
                            >
                              <ShoppingCart size={16} />
                              <span className="hidden sm:inline">Move to Cart</span>
                            </Button>
                            <Button 
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                              size="sm"
                            >
                              <Trash2 size={16} />
                              <span className="hidden sm:inline ml-1">Remove</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
