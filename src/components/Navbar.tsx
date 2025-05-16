
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';

const Navbar = () => {
  const { isAuthenticated, getItemsCount } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-fashion-primary font-bold text-2xl">
          MODULO
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-fashion-secondary hover:text-fashion-accent transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-fashion-secondary hover:text-fashion-accent transition-colors">
            Products
          </Link>
          <Link to="/wishlist" className="text-fashion-secondary hover:text-fashion-accent transition-colors">
            Wishlist
          </Link>
        </div>

        {/* Search, Cart, Wishlist Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-fashion-accent w-40 lg:w-64"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search size={18} className="text-gray-400" />
            </button>
          </form>

          {/* Cart */}
          <Link to="/cart" className="relative text-fashion-secondary hover:text-fashion-accent transition-colors">
            <ShoppingCart size={22} />
            {getItemsCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-fashion-accent text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {getItemsCount()}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link to="/wishlist" className="text-fashion-secondary hover:text-fashion-accent transition-colors">
            <Heart size={22} />
          </Link>

          {/* Login/Register */}
          {!isAuthenticated ? (
            <Link to="/login">
              <Button variant="outline" className="border-fashion-accent text-fashion-accent hover:bg-fashion-accent hover:text-white transition-colors">
                Login / Register
              </Button>
            </Link>
          ) : (
            <Link to="/account">
              <Button variant="outline" className="border-fashion-accent text-fashion-accent hover:bg-fashion-accent hover:text-white transition-colors">
                My Account
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-fashion-primary" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white mt-4 px-4 py-4 flex flex-col animate-fade-in">
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-fashion-accent w-full"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search size={18} className="text-gray-400" />
            </button>
          </form>
          
          <Link 
            to="/" 
            className="py-2 text-fashion-secondary hover:text-fashion-accent transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="py-2 text-fashion-secondary hover:text-fashion-accent transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            to="/wishlist" 
            className="py-2 text-fashion-secondary hover:text-fashion-accent transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Wishlist
          </Link>
          <Link 
            to="/cart" 
            className="py-2 text-fashion-secondary hover:text-fashion-accent transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Cart ({getItemsCount()})
          </Link>
          
          {!isAuthenticated ? (
            <Link 
              to="/login"
              className="mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="w-full bg-fashion-accent hover:bg-fashion-primary text-white">
                Login / Register
              </Button>
            </Link>
          ) : (
            <Link 
              to="/account"
              className="mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="w-full bg-fashion-accent hover:bg-fashion-primary text-white">
                My Account
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
