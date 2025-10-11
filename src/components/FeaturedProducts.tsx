import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .eq('is_active', true)
        .limit(6);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Loading Skeleton with green tint
  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-green-100 animate-pulse rounded-lg">
              <div className="aspect-square w-full rounded-t-lg bg-green-200"></div>
              <div className="p-3 space-y-2">
                <div className="h-3 bg-green-200 rounded w-3/4"></div>
                <div className="h-2 bg-green-200 rounded w-1/2"></div>
                <div className="h-4 bg-green-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <div className="h-10 bg-green-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  // 🟢 No Products State
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-green-700 text-lg">No featured products available</p>
      </div>
    );
  }

  // 🟢 Products Grid
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product) => (
          <div key={product.id} className="group hover:scale-[1.02] transition-transform duration-300">
            <ProductCard product={product} showBuyNowAndCart={true} />
          </div>
        ))}
      </div>

      {/* 🟢 Shop More Button */}
      <div className="text-center mt-8">
        <Link
          to="/shop"
          className="inline-flex items-center bg-green-700 text-white px-6 py-3 rounded-lg font-semibold 
                     hover:bg-green-800 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 
                     transition-all duration-200 gap-2 shadow-md"
        >
          Shop More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
