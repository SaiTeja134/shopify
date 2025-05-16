
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CreditCard, ShieldCheck, User, MapPin, Check, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

enum CheckoutStep {
  Address = 0,
  Payment = 1,
  Confirmation = 2,
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.Address);
  
  // Form states
  const [formData, setFormData] = useState({
    // Address form
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    // Payment form
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    savePayment: false,
  });
  
  const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'paypal' | 'upi'>('creditCard');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };
  
  // Calculate order summary
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 6.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;
  
  const handleNextStep = () => {
    // Validate form fields based on current step
    if (currentStep === CheckoutStep.Address) {
      // Simple validation for address form
      const { firstName, lastName, email, address, city, state, zipCode } = formData;
      if (!firstName || !lastName || !email || !address || !city || !state || !zipCode) {
        toast.error('Please fill in all required fields');
        return;
      }
    } else if (currentStep === CheckoutStep.Payment) {
      // Simple validation for payment form
      if (paymentMethod === 'creditCard') {
        const { cardName, cardNumber, expiryDate, cvv } = formData;
        if (!cardName || !cardNumber || !expiryDate || !cvv) {
          toast.error('Please fill in all payment details');
          return;
        }
      }
    }
    
    setCurrentStep(prev => prev + 1 as CheckoutStep);
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1 as CheckoutStep);
  };
  
  const handlePlaceOrder = () => {
    toast.success('Order placed successfully!');
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  // Render step components
  const renderAddressForm = () => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-fashion-primary mb-6">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-fashion-secondary mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-fashion-secondary mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-fashion-secondary mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-fashion-secondary mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-fashion-secondary mb-2">Street Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-fashion-secondary mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-fashion-secondary mb-2">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-fashion-secondary mb-2">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-fashion-secondary mb-2">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
          </select>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button 
          onClick={handleNextStep}
          className="bg-fashion-accent hover:bg-fashion-primary py-6 px-8"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-fashion-primary mb-6">Payment Method</h2>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-4">
          <div
            onClick={() => setPaymentMethod('creditCard')}
            className={`
              flex-1 min-w-[180px] border rounded-md p-4 cursor-pointer
              ${paymentMethod === 'creditCard' ? 'border-fashion-accent bg-fashion-accent/5' : 'border-gray-200 hover:border-fashion-accent'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${paymentMethod === 'creditCard' ? 'bg-fashion-accent text-white' : 'bg-gray-100'}`}>
                <CreditCard size={20} />
              </div>
              <div>
                <h3 className="font-medium">Credit Card</h3>
                <p className="text-sm text-fashion-secondary">Visa, Mastercard, Amex</p>
              </div>
            </div>
          </div>
          
          <div
            onClick={() => setPaymentMethod('paypal')}
            className={`
              flex-1 min-w-[180px] border rounded-md p-4 cursor-pointer
              ${paymentMethod === 'paypal' ? 'border-fashion-accent bg-fashion-accent/5' : 'border-gray-200 hover:border-fashion-accent'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${paymentMethod === 'paypal' ? 'bg-fashion-accent text-white' : 'bg-gray-100'}`}>
                <i className="text-xl">P</i>
              </div>
              <div>
                <h3 className="font-medium">PayPal</h3>
                <p className="text-sm text-fashion-secondary">Fast and secure</p>
              </div>
            </div>
          </div>
          
          <div
            onClick={() => setPaymentMethod('upi')}
            className={`
              flex-1 min-w-[180px] border rounded-md p-4 cursor-pointer
              ${paymentMethod === 'upi' ? 'border-fashion-accent bg-fashion-accent/5' : 'border-gray-200 hover:border-fashion-accent'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${paymentMethod === 'upi' ? 'bg-fashion-accent text-white' : 'bg-gray-100'}`}>
                <i className="text-xl">U</i>
              </div>
              <div>
                <h3 className="font-medium">UPI</h3>
                <p className="text-sm text-fashion-secondary">Google Pay, PhonePe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {paymentMethod === 'creditCard' && (
        <div className="mb-8">
          <div className="p-6 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-4">Card Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-fashion-secondary mb-2">Name on Card</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-fashion-secondary mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-fashion-secondary mb-2">Expiration Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fashion-secondary mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="savePayment"
                  name="savePayment"
                  checked={formData.savePayment}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-fashion-accent focus:ring-fashion-accent mr-2"
                />
                <label htmlFor="savePayment" className="text-sm text-fashion-secondary">
                  Save this card for future purchases
                </label>
              </div>
              
              <div className="flex items-center text-sm text-fashion-secondary mt-6">
                <ShieldCheck size={16} className="mr-2" />
                <span>Your payment info is secure and encrypted</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {paymentMethod === 'paypal' && (
        <div className="mb-8 p-6 border rounded-md bg-gray-50 text-center">
          <p className="mb-4">Click "Review Order" to be redirected to PayPal to complete your purchase securely.</p>
          <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal" className="h-12 mx-auto" />
        </div>
      )}
      
      {paymentMethod === 'upi' && (
        <div className="mb-8 p-6 border rounded-md bg-gray-50 text-center">
          <p className="mb-4">You'll be shown a QR code to complete the payment after reviewing your order.</p>
          <div className="flex justify-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" className="h-10" />
          </div>
        </div>
      )}
      
      <div className="mt-8 flex justify-between">
        <Button 
          onClick={handlePreviousStep}
          variant="outline"
          className="border-fashion-secondary text-fashion-secondary hover:text-fashion-accent hover:border-fashion-accent"
        >
          Back to Shipping
        </Button>
        
        <Button 
          onClick={handleNextStep}
          className="bg-fashion-accent hover:bg-fashion-primary py-6 px-8"
        >
          Review Order
        </Button>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-fashion-primary mb-6">Order Summary</h2>
      
      <div className="border rounded-md overflow-hidden mb-6">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-medium">Items ({cart.length})</h3>
        </div>
        
        <div className="p-4 divide-y">
          {cart.map((item) => (
            <div key={item.id} className="flex py-3 first:pt-0 last:pb-0">
              <div className="w-16 h-16 flex-shrink-0 mr-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-fashion-secondary">
                  {item.selectedColor && (
                    <span className="mr-2 capitalize">{item.selectedColor}</span>
                  )}
                  {item.selectedSize && (
                    <span>Size: {item.selectedSize}</span>
                  )}
                </p>
                <div className="flex justify-between mt-1">
                  <span className="text-sm">Qty: {item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="font-medium">Shipping Address</h3>
            <button className="text-sm text-fashion-accent hover:underline">Edit</button>
          </div>
          <div className="p-4">
            <p className="font-medium">{formData.firstName} {formData.lastName}</p>
            <p>{formData.address}</p>
            <p>{formData.city}, {formData.state} {formData.zipCode}</p>
            <p>{formData.country}</p>
            <p className="mt-2">{formData.phone}</p>
            <p>{formData.email}</p>
          </div>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="font-medium">Payment Method</h3>
            <button className="text-sm text-fashion-accent hover:underline">Edit</button>
          </div>
          <div className="p-4">
            {paymentMethod === 'creditCard' && (
              <div className="flex items-center">
                <CreditCard size={20} className="mr-2" />
                <div>
                  <p className="font-medium">{formData.cardName}</p>
                  <p className="text-fashion-secondary">
                    **** **** **** {formData.cardNumber.slice(-4)}
                  </p>
                </div>
              </div>
            )}
            {paymentMethod === 'paypal' && (
              <div className="flex items-center">
                <p className="font-medium">PayPal</p>
              </div>
            )}
            {paymentMethod === 'upi' && (
              <div className="flex items-center">
                <p className="font-medium">UPI Payment</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden mb-8">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-medium">Order Total</h3>
        </div>
        <div className="p-4">
          <div className="space-y-2 text-fashion-secondary">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-lg text-fashion-primary">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button 
          onClick={handlePreviousStep}
          variant="outline"
          className="border-fashion-secondary text-fashion-secondary hover:text-fashion-accent hover:border-fashion-accent"
        >
          Back to Payment
        </Button>
        
        <Button 
          onClick={handlePlaceOrder}
          className="bg-fashion-accent hover:bg-fashion-primary py-6 px-8"
        >
          Place Order
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative flex justify-between">
            <div className="absolute top-1/2 h-0.5 w-full bg-gray-200 -translate-y-1/2 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${currentStep >= CheckoutStep.Address 
                  ? 'bg-fashion-accent text-white' 
                  : 'bg-gray-200 text-fashion-secondary'
                }
              `}>
                {currentStep > CheckoutStep.Address ? <Check size={20} /> : <ShoppingCart size={20} />}
              </div>
              <span className="mt-2 text-sm">Cart</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${currentStep >= CheckoutStep.Address 
                  ? 'bg-fashion-accent text-white' 
                  : 'bg-gray-200 text-fashion-secondary'
                }
              `}>
                {currentStep > CheckoutStep.Address ? <Check size={20} /> : <MapPin size={20} />}
              </div>
              <span className="mt-2 text-sm">Shipping</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${currentStep >= CheckoutStep.Payment 
                  ? 'bg-fashion-accent text-white' 
                  : 'bg-gray-200 text-fashion-secondary'
                }
              `}>
                <CreditCard size={20} />
              </div>
              <span className="mt-2 text-sm">Payment</span>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${currentStep >= CheckoutStep.Confirmation 
                  ? 'bg-fashion-accent text-white' 
                  : 'bg-gray-200 text-fashion-secondary'
                }
              `}>
                <Check size={20} />
              </div>
              <span className="mt-2 text-sm">Confirm</span>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Cart sidebar */}
          <div className="mb-8 bg-white rounded-md shadow-sm border p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Order Summary</h3>
              <span className="text-sm text-fashion-secondary">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
            </div>
            
            <div className="space-y-2 text-sm text-fashion-secondary mb-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          {/* Step content */}
          {currentStep === CheckoutStep.Address && renderAddressForm()}
          {currentStep === CheckoutStep.Payment && renderPaymentForm()}
          {currentStep === CheckoutStep.Confirmation && renderConfirmation()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
