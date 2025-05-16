
import ProductCard from './ProductCard';
import { Product } from '@/context/StoreContext';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  return (
    <div className="animate-fade-in">
      {title && (
        <h2 className="text-2xl font-semibold mb-6 text-fashion-primary">{title}</h2>
      )}
      
      {products.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
