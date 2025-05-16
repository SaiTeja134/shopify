
import { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Filter from '@/components/Filter';
import ProductGrid from '@/components/ProductGrid';
import { Product } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { Filter as FilterIcon, X } from 'lucide-react';

const ProductsPage = () => {
  const { products } = useStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    sizes: [] as string[],
    colors: [] as string[],
    brands: [] as string[],
    sortBy: 'default',
  });

  const handleFilterChange = (filters: {
    sizes: string[];
    colors: string[];
    brands: string[];
    sortBy: string;
  }) => {
    setActiveFilters(filters);
  };

  useEffect(() => {
    let result = [...products];
    
    // Apply size filter
    if (activeFilters.sizes.length > 0) {
      result = result.filter(product => 
        product.sizes.some(size => 
          activeFilters.sizes.includes(size.toLowerCase())
        )
      );
    }
    
    // Apply color filter
    if (activeFilters.colors.length > 0) {
      result = result.filter(product => 
        product.colors.some(color => 
          activeFilters.colors.includes(color.toLowerCase())
        )
      );
    }
    
    // Apply brand filter
    if (activeFilters.brands.length > 0) {
      result = result.filter(product => 
        activeFilters.brands.includes(product.brand.toLowerCase())
      );
    }
    
    // Apply sorting
    switch (activeFilters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // In a real app, would sort by date
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // 'default' - featured products
        break;
    }
    
    setFilteredProducts(result);
  }, [products, activeFilters]);

  // Count active filters
  const activeFiltersCount = 
    activeFilters.sizes.length + 
    activeFilters.colors.length + 
    activeFilters.brands.length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-fashion-primary mb-2">All Products</h1>
          <p className="text-fashion-secondary">Discover our latest collection</p>
        </div>
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            {isFilterOpen ? (
              <>
                <X size={18} />
                Hide Filters
              </>
            ) : (
              <>
                <FilterIcon size={18} />
                Show Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </>
            )}
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className={`
            md:w-64 flex-shrink-0
            ${isFilterOpen ? 'block' : 'hidden'} 
            md:block
          `}>
            <Filter onFilterChange={handleFilterChange} />
          </div>
          
          {/* Product listing */}
          <div className="flex-grow">
            {/* Results summary */}
            <div className="mb-6 flex flex-wrap items-center justify-between">
              <p className="text-fashion-secondary">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              
              {/* Active filters pills (desktop) */}
              <div className="hidden md:flex flex-wrap gap-2 items-center">
                {activeFiltersCount > 0 && (
                  <span className="text-sm text-fashion-secondary">Active filters:</span>
                )}
                
                {activeFilters.sizes.map(size => (
                  <div key={size} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <span>{size.toUpperCase()}</span>
                    <button className="text-gray-500 hover:text-fashion-accent">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {activeFilters.colors.map(color => (
                  <div key={color} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <span style={{textTransform: 'capitalize'}}>{color}</span>
                    <button className="text-gray-500 hover:text-fashion-accent">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                
                {activeFilters.brands.map(brand => (
                  <div key={brand} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <span style={{textTransform: 'capitalize'}}>{brand}</span>
                    <button className="text-gray-500 hover:text-fashion-accent">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
