
import { useState, useEffect } from 'react';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type FilterOption = {
  label: string;
  value: string;
  checked: boolean;
};

type FilterProps = {
  onFilterChange: (filters: {
    sizes: string[];
    colors: string[];
    brands: string[];
    sortBy: string;
  }) => void;
};

const Filter = ({ onFilterChange }: FilterProps) => {
  const [sizeOptions, setSizeOptions] = useState<FilterOption[]>([
    { label: 'XS', value: 'xs', checked: false },
    { label: 'S', value: 's', checked: false },
    { label: 'M', value: 'm', checked: false },
    { label: 'L', value: 'l', checked: false },
    { label: 'XL', value: 'xl', checked: false },
    { label: 'XXL', value: 'xxl', checked: false },
  ]);

  const [colorOptions, setColorOptions] = useState<FilterOption[]>([
    { label: 'Black', value: 'black', checked: false },
    { label: 'White', value: 'white', checked: false },
    { label: 'Blue', value: 'blue', checked: false },
    { label: 'Red', value: 'red', checked: false },
    { label: 'Green', value: 'green', checked: false },
    { label: 'Beige', value: 'beige', checked: false },
  ]);

  const [brandOptions, setBrandOptions] = useState<FilterOption[]>([
    { label: 'StyleWorks', value: 'styleworks', checked: false },
    { label: 'UrbanComfort', value: 'urbancomfort', checked: false },
    { label: 'BasicLuxe', value: 'basicluxe', checked: false },
    { label: 'LeatherCraft', value: 'leathercraft', checked: false },
    { label: 'LuxeWear', value: 'luxewear', checked: false },
  ]);

  const [sortBy, setSortBy] = useState<string>('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    size: true,
    color: true,
    brand: true,
  });

  useEffect(() => {
    const selectedSizes = sizeOptions.filter(option => option.checked).map(option => option.value);
    const selectedColors = colorOptions.filter(option => option.checked).map(option => option.value);
    const selectedBrands = brandOptions.filter(option => option.checked).map(option => option.value);
    
    onFilterChange({
      sizes: selectedSizes,
      colors: selectedColors,
      brands: selectedBrands,
      sortBy,
    });
  }, [sizeOptions, colorOptions, brandOptions, sortBy, onFilterChange]);

  const toggleSizeOption = (index: number) => {
    setSizeOptions(prev => prev.map((option, i) => 
      i === index ? { ...option, checked: !option.checked } : option
    ));
  };

  const toggleColorOption = (index: number) => {
    setColorOptions(prev => prev.map((option, i) => 
      i === index ? { ...option, checked: !option.checked } : option
    ));
  };

  const toggleBrandOption = (index: number) => {
    setBrandOptions(prev => prev.map((option, i) => 
      i === index ? { ...option, checked: !option.checked } : option
    ));
  };

  const clearAllFilters = () => {
    setSizeOptions(prev => prev.map(option => ({ ...option, checked: false })));
    setColorOptions(prev => prev.map(option => ({ ...option, checked: false })));
    setBrandOptions(prev => prev.map(option => ({ ...option, checked: false })));
    setSortBy('default');
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getSelectedFiltersCount = () => {
    return sizeOptions.filter(o => o.checked).length + 
           colorOptions.filter(o => o.checked).length +
           brandOptions.filter(o => o.checked).length;
  };

  return (
    <div className="animate-fade-in">
      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4 flex justify-between items-center">
        <Button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          variant="outline"
          className="flex items-center gap-2 border-fashion-secondary text-fashion-secondary"
        >
          <span>Filters</span>
          {getSelectedFiltersCount() > 0 && (
            <span className="bg-fashion-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getSelectedFiltersCount()}
            </span>
          )}
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-fashion-accent"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Best Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {isMobileFilterOpen && (
        <div className="md:hidden bg-white p-4 mb-4 rounded-lg shadow-md border animate-fade-in">
          <div className="flex justify-between items-center mb-4 pb-2 border-b">
            <h3 className="font-semibold text-fashion-primary">Filter Products</h3>
            <button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="text-fashion-secondary"
            >
              <X size={20} />
            </button>
          </div>

          {/* Size Filter */}
          <div className="mb-4 pb-3 border-b">
            <div 
              className="flex justify-between items-center mb-2 cursor-pointer" 
              onClick={() => toggleSection('size')}
            >
              <h4 className="font-medium">Size</h4>
              {expandedSections.size ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {expandedSections.size && (
              <div className="flex flex-wrap gap-2 mt-2">
                {sizeOptions.map((option, index) => (
                  <label 
                    key={option.value} 
                    className={`
                      px-3 py-1 text-sm border rounded-md cursor-pointer
                      ${option.checked 
                        ? 'bg-fashion-accent text-white border-fashion-accent' 
                        : 'text-fashion-secondary border-gray-300 hover:border-fashion-accent'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => toggleSizeOption(index)}
                      className="hidden"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Color Filter */}
          <div className="mb-4 pb-3 border-b">
            <div 
              className="flex justify-between items-center mb-2 cursor-pointer" 
              onClick={() => toggleSection('color')}
            >
              <h4 className="font-medium">Color</h4>
              {expandedSections.color ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {expandedSections.color && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {colorOptions.map((option, index) => (
                  <label 
                    key={option.value} 
                    className={`
                      flex items-center space-x-2 px-2 py-1 text-sm rounded-md cursor-pointer
                      ${option.checked ? 'text-fashion-primary' : 'text-fashion-secondary'}
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => toggleColorOption(index)}
                      className="hidden"
                    />
                    <div 
                      className={`
                        w-5 h-5 rounded-full flex items-center justify-center
                        border ${option.checked ? 'border-fashion-accent' : 'border-gray-300'}
                      `} 
                      style={{backgroundColor: option.value}}
                    >
                      {option.checked && option.value !== 'white' && (
                        <Check size={12} className="text-white" />
                      )}
                      {option.checked && option.value === 'white' && (
                        <Check size={12} className="text-black" />
                      )}
                    </div>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="mb-4">
            <div 
              className="flex justify-between items-center mb-2 cursor-pointer" 
              onClick={() => toggleSection('brand')}
            >
              <h4 className="font-medium">Brand</h4>
              {expandedSections.brand ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {expandedSections.brand && (
              <div className="space-y-2 mt-2">
                {brandOptions.map((option, index) => (
                  <label 
                    key={option.value} 
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={option.checked}
                      onChange={() => toggleBrandOption(index)}
                      className="rounded border-gray-300 text-fashion-accent focus:ring-fashion-accent mr-2"
                    />
                    <span className={option.checked ? 'text-fashion-primary' : 'text-fashion-secondary'}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            <Button 
              onClick={clearAllFilters} 
              variant="outline" 
              className="text-fashion-secondary border-fashion-secondary hover:text-fashion-accent hover:border-fashion-accent flex-1"
            >
              Clear All
            </Button>
            <Button 
              onClick={() => setIsMobileFilterOpen(false)}
              className="bg-fashion-accent hover:bg-fashion-primary text-white flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Filters */}
      <div className="hidden md:block bg-white p-5 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-5 pb-3 border-b">
          <h3 className="font-semibold text-fashion-primary text-lg">Filters</h3>
          <button 
            onClick={clearAllFilters}
            className="text-sm text-fashion-accent hover:underline flex items-center gap-1"
          >
            <X size={14} />
            Clear All
          </button>
        </div>
        
        {/* Sort By (Desktop) */}
        <div className="mb-6 pb-5 border-b">
          <h4 className="font-medium mb-3">Sort By</h4>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-fashion-accent"
          >
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Best Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {/* Size Filter */}
        <div className="mb-6 pb-5 border-b">
          <h4 className="font-medium mb-3">Size</h4>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((option, index) => (
              <label 
                key={option.value} 
                className={`
                  px-3 py-1 text-sm border rounded-md cursor-pointer transition-colors
                  ${option.checked 
                    ? 'bg-fashion-accent text-white border-fashion-accent' 
                    : 'text-fashion-secondary border-gray-300 hover:border-fashion-accent'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => toggleSizeOption(index)}
                  className="hidden"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="mb-6 pb-5 border-b">
          <h4 className="font-medium mb-3">Color</h4>
          <div className="grid grid-cols-2 gap-3">
            {colorOptions.map((option, index) => (
              <label 
                key={option.value} 
                className={`
                  flex items-center space-x-2 cursor-pointer
                  ${option.checked ? 'text-fashion-primary' : 'text-fashion-secondary'}
                `}
              >
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => toggleColorOption(index)}
                  className="hidden"
                />
                <div 
                  className={`
                    w-5 h-5 rounded-full flex items-center justify-center
                    border ${option.checked ? 'border-fashion-accent' : 'border-gray-300'}
                  `} 
                  style={{backgroundColor: option.value}}
                >
                  {option.checked && option.value !== 'white' && (
                    <Check size={12} className="text-white" />
                  )}
                  {option.checked && option.value === 'white' && (
                    <Check size={12} className="text-black" />
                  )}
                </div>
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h4 className="font-medium mb-3">Brand</h4>
          <div className="space-y-2">
            {brandOptions.map((option, index) => (
              <label 
                key={option.value} 
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={option.checked}
                  onChange={() => toggleBrandOption(index)}
                  className="rounded border-gray-300 text-fashion-accent focus:ring-fashion-accent mr-2"
                />
                <span className={option.checked ? 'text-fashion-primary' : 'text-fashion-secondary'}>
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
