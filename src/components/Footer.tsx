
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-fashion-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold">MODULO</Link>
            <p className="text-gray-300 text-sm">
              Your premier destination for modern fashion that combines style, comfort, and sustainability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-fashion-accent transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-fashion-accent transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-fashion-accent transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-fashion-accent transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-gray-300 hover:text-fashion-accent transition-colors">Best Sellers</Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="text-gray-300 hover:text-fashion-accent transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/sale" className="text-gray-300 hover:text-fashion-accent transition-colors">Sale Items</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-fashion-accent transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-fashion-accent transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-fashion-accent transition-colors">Shipping & Returns</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-fashion-accent transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-fashion-accent transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Fashion Street, Design District, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">support@modulo.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} MODULO Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
