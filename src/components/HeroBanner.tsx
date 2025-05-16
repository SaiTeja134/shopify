
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Summer Collection '25",
    subtitle: "Discover the latest trends in summer fashion",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    buttonText: "Shop Now",
    link: "/products",
    position: "left", // text position
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Exclusive designer pieces just landed",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
    buttonText: "Explore Collection",
    link: "/new-arrivals",
    position: "right",
  },
  {
    id: 3,
    title: "Accessories Sale",
    subtitle: "Up to 40% off on selected accessories",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    buttonText: "Shop Sale",
    link: "/sale",
    position: "center",
  },
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Image */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Content */}
      <div className="relative h-full flex items-center">
        <div 
          className={`container mx-auto px-4 text-white ${
            slide.position === 'left' 
              ? 'text-left' 
              : slide.position === 'right' 
                ? 'text-right' 
                : 'text-center'
          }`}
        >
          <div 
            className={`max-w-lg ${
              slide.position === 'center' 
                ? 'mx-auto' 
                : slide.position === 'right' 
                  ? 'ml-auto' 
                  : ''
            } animate-slide-down`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h1>
            <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
            <Link to={slide.link}>
              <Button className="bg-fashion-accent hover:bg-white hover:text-fashion-primary text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center gap-2">
                {slide.buttonText}
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-white w-8' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
