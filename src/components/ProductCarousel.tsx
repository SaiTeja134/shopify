
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const scrollAmount = clientWidth * 0.8;
    
    const newScrollLeft = direction === 'left'
      ? Math.max(scrollLeft - scrollAmount, 0)
      : Math.min(scrollLeft + scrollAmount, scrollWidth - clientWidth);

    carouselRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const checkScroll = () => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10); // small buffer
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', checkScroll);
      }
    };
  }, [products]);

  return (
    <div className="my-12 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-fashion-primary">{title}</h2>
        
        <div className="flex space-x-3">
          <Button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            variant="outline"
            className="rounded-full w-10 h-10 p-0 flex items-center justify-center border-fashion-secondary text-fashion-secondary disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            variant="outline"
            className="rounded-full w-10 h-10 p-0 flex items-center justify-center border-fashion-secondary text-fashion-secondary disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
      
      <div 
        ref={carouselRef} 
        className="flex space-x-4 overflow-x-auto scrollbar-none pb-4 -mx-4 px-4"
        onScroll={checkScroll}
      >
        {products.map((product) => (
          <div key={product.id} className="min-w-[260px] md:min-w-[280px]" style={{ flex: '0 0 auto' }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
