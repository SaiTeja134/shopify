
import { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import HeroBanner from '@/components/HeroBanner';
import ProductCarousel from '@/components/ProductCarousel';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';
import ScrollObserver from '@/components/ScrollObserver';
import { Product } from '@/context/StoreContext';

const HomePage = () => {
  const { products } = useStore();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    // Simulate featured products (in a real app, would come from API)
    setFeaturedProducts(products.filter((_, index) => index % 2 === 0));
    
    // Simulate new arrivals (in a real app, would come from API)
    setNewArrivals(products.filter((_, index) => index % 2 === 1));
  }, [products]);

  return (
    <div>
      <HeroBanner />
      
      <div className="container mx-auto px-4 py-8">
        <ScrollObserver>
          <ProductCarousel title="Featured Products" products={featuredProducts} />
        </ScrollObserver>
        
        {/* Categories Section */}
        <ScrollObserver className="my-16" animationClass="animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-semibold text-fashion-primary mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Women's Collection",
                image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?q=80&w=1887&auto=format&fit=crop",
                link: "/products"
              },
              {
                name: "Men's Collection",
                image: "https://images.unsplash.com/photo-1625204614387-9d0c1fa7986e?q=80&w=1974&auto=format&fit=crop",
                link: "/products"
              },
              {
                name: "Accessories",
                image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=2070&auto=format&fit=crop",
                link: "/products"
              }
            ].map((category, index) => (
              <div 
                key={index} 
                className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
                onClick={() => window.location.href = category.link}
              >
                <div 
                  className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity duration-300"
                />
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl font-semibold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </ScrollObserver>
        
        <ScrollObserver>
          <ProductCarousel title="New Arrivals" products={newArrivals} />
        </ScrollObserver>
        
        {/* Newsletter Section */}
        <ScrollObserver className="my-16 py-12 bg-gray-100 rounded-lg" animationClass="animate-fade-in">
          <div className="text-center max-w-2xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-fashion-primary mb-4">Join Our Newsletter</h2>
            <p className="text-fashion-secondary mb-6">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-fashion-accent flex-grow max-w-md"
              />
              <button className="bg-fashion-accent hover:bg-fashion-primary text-white font-medium py-3 px-6 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </ScrollObserver>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;
