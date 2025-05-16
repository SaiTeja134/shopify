
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Trash2, RefreshCcw, ShoppingBag, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import ProductCarousel from '@/components/ProductCarousel';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, products, removeFromCart, updateCartItem, clearCart, getTotalPrice } = useStore();
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // Get recommended products (products not in cart)
    setRecommendedProducts(
      products.filter(p => !cart.some(item => item.id === p.id)).slice(0, 4)
    );
  }, [products, cart]);
  
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    updateCartItem(id, quantity);
  };
  
  const handleRemoveItem = (id: number, name: string) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart!`);
  };
  
  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared!');
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  // Calculate cart summary
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 6.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-fashion-primary mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="mb-6 flex justify-center">
              <ShoppingBag size={64} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-medium text-fashion-primary mb-4">Your cart is empty</h2>
            <p className="text-fashion-secondary mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products">
              <Button className="bg-fashion-accent hover:bg-fashion-primary">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border mb-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-fashion-primary">Product</th>
                        <th className="px-6 py-4 text-center text-sm font-medium text-fashion-primary">Quantity</th>
                        <th className="px-6 py-4 text-right text-sm font-medium text-fashion-primary">Price</th>
                        <th className="px-6 py-4 text-center text-sm font-medium text-fashion-primary">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {cart.map((item) => (
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
                                <p className="text-sm text-fashion-secondary mt-1">
                                  {item.selectedColor && (
                                    <span className="mr-2 capitalize">{item.selectedColor}</span>
                                  )}
                                  {item.selectedSize && (
                                    <span>Size: {item.selectedSize}</span>
                                  )}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              <button 
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-l-md"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                value={item.quantity}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  if (!isNaN(val)) {
                                    handleUpdateQuantity(item.id, val);
                                  }
                                }}
                                className="w-10 h-8 border-y text-center"
                              />
                              <button 
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-r-md"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-fashion-primary font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center">
                              <Button 
                                onClick={() => handleRemoveItem(item.id, item.name)}
                                variant="ghost"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                size="sm"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  className="text-fashion-secondary border-fashion-secondary hover:text-fashion-accent hover:border-fashion-accent flex items-center gap-2"
                  onClick={handleClearCart}
                >
                  <RefreshCcw size={16} />
                  Clear Cart
                </Button>
                
                <Link to="/products">
                  <Button
                    variant="outline"
                    className="text-fashion-accent border-fashion-accent hover:bg-fashion-accent hover:text-white"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-fashion-primary mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-fashion-secondary">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-fashion-secondary">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-fashion-secondary">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-lg text-fashion-primary">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Coupon Code */}
                <div className="mb-6">
                  <label htmlFor="coupon" className="block text-sm text-fashion-secondary mb-2">
                    Have a coupon?
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      placeholder="Enter coupon code"
                      className="flex-grow border rounded-l-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
                    />
                    <Button className="rounded-l-none bg-fashion-accent hover:bg-fashion-primary">
                      Apply
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-fashion-accent hover:bg-fashion-primary text-white flex items-center justify-center gap-2 py-6"
                >
                  Proceed to Checkout
                  <ChevronRight size={16} />
                </Button>
                
                <div className="mt-6 text-sm text-fashion-secondary text-center">
                  <p>Secure checkout powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <ProductCarousel title="You Might Also Like" products={recommendedProducts} />
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;
