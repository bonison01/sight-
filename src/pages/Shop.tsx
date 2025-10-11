import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuthContext';
import { useCart } from '@/hooks/useCartContext';
import Layout from '../components/Layout';
import CartSidebar from '../components/CartSidebar';
import { Loader2, Package, ShoppingCart, User, Plus, Minus, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  offer_price: number | null;
  image_url: string | null;
  description: string | null;
  category: string | null;
  is_active: boolean;
  stock_quantity: number | null;
}

interface GroupedProducts {
  [category: string]: Product[];
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<GroupedProducts>({});
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const { addToCart, cartCount, refreshCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products for shop page...');
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, offer_price, image_url, description, category, is_active, stock_quantity')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;

      console.log('Products fetched successfully:', data?.length || 0);
      setProducts(data || []);

      const initialQuantities: { [key: string]: number } = {};
      (data || []).forEach(product => {
        initialQuantities[product.id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products. Please try again later.",
        variant: "destructive",
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);

    const grouped = filtered.reduce((acc: GroupedProducts, product) => {
      const category = product.category || 'Other';
      const categoryName = getCategoryDisplayName(category);
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(product);
      return acc;
    }, {});

    setGroupedProducts(grouped);
  };

  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'chicken':
        return 'Chicken';
      case 'red_meat':
        return 'Red Meat';
      case 'chilli_condiments':
        return 'Chilli Condiments';
      default:
        return 'Other';
    }
  };

  const getCategories = () => {
    const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    return categories.map(cat => ({
      value: cat!,
      label: getCategoryDisplayName(cat!)
    }));
  };

  const handleBuyNow = async (product: Product) => {
    if (isAuthenticated) {
      try {
        await addToCart(product.id, quantities[product.id] || 1);
        await refreshCart();
        setTimeout(() => {
          navigate('/checkout');
        }, 100);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to process purchase. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      navigate('/checkout', {
        state: {
          guestCheckout: true,
          product: product,
          quantity: quantities[product.id] || 1
        }
      });
    }
  };

  const handleAddToCart = async (product: Product) => {
    await addToCart(product.id, quantities[product.id] || 1);
  };

  const updateQuantity = (productId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  const handleCartClick = () => {
    setCartOpen(true);
  };

  const renderProductCard = (product: Product) => {
    const displayPrice = product.offer_price || product.price;
    const hasOffer = product.offer_price && product.offer_price < product.price;

    return (
      <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="aspect-square">
          <img
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2 md:p-4">
          <h3 className="text-sm md:text-lg font-semibold text-green-900 mb-1 md:mb-2 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
            {product.description || 'No description available'}
          </p>
          <div className="flex items-center justify-between mb-2 md:mb-4">
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-bold text-green-800">₹{displayPrice}</span>
              {hasOffer && (
                <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
              )}
            </div>
            {product.stock_quantity !== null && (
              <span className="text-xs md:text-sm text-gray-500">
                Stock: {product.stock_quantity}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center space-x-1 md:space-x-2 mb-2 md:mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(product.id, -1)}
              disabled={quantities[product.id] <= 1}
              className="h-6 w-6 md:h-8 md:w-8 p-0 border-green-300 hover:bg-green-50 text-green-700"
            >
              <Minus className="w-2 h-2 md:w-3 md:h-3" />
            </Button>
            <span className="text-xs md:text-sm font-medium px-1 md:px-3">{quantities[product.id] || 1}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(product.id, 1)}
              className="h-6 w-6 md:h-8 md:w-8 p-0 border-green-300 hover:bg-green-50 text-green-700"
            >
              <Plus className="w-2 h-2 md:w-3 md:h-3" />
            </Button>
          </div>

          <div className="space-y-1 md:space-y-2">
            <Button
              onClick={() => handleBuyNow(product)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 text-xs md:text-sm py-2 md:py-2 transition-all duration-300 transform hover:scale-105"
              disabled={product.stock_quantity === 0}
            >
              <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              {product.stock_quantity === 0 ? 'Out of Stock' : 'Buy Now'}
            </Button>

            <Button
              onClick={() => handleAddToCart(product)}
              variant="outline"
              className="w-full text-xs md:text-sm py-2 border-green-400 text-green-700 hover:bg-green-50 transition-all duration-300"
              disabled={product.stock_quantity === 0}
            >
              Add to Cart
            </Button>

            <Button
              onClick={() => navigate(`/product/${product.id}`)}
              variant="ghost"
              className="w-full text-xs md:text-sm py-1 md:py-2 text-green-700 hover:bg-green-50"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <Button
        onClick={handleCartClick}
        className="fixed bottom-6 right-6 z-40 rounded-full h-14 w-14 bg-gradient-to-r from-green-600 to-green-800 text-white shadow-xl transition-all duration-300 transform hover:scale-110"
      >
        <ShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
            {cartCount}
          </span>
        )}
      </Button>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Discover our fresh, flavorful, and authentic collection
          </p>

          <div className="mt-8">
            {isAuthenticated ? (
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2 text-green-200">
                  <User className="h-5 w-5" />
                  <span>Welcome back, {user?.email}</span>
                </div>
                <Button
                  onClick={handleCartClick}
                  variant="outline"
                  className="bg-green-500 text-white border border-green-500 hover:bg-white hover:text-green-600 transition-all"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({cartCount})
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-green-100 text-lg">Browse, shop, and checkout as a guest • Sign in for a better experience</p>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => navigate('/auth')}
                    variant="outline"
                    className="bg-white text-green-700 border border-white hover:bg-green-700 hover:text-white transition-all"
                  >
                    Sign In / Register
                  </Button>
                  <Button
                    onClick={handleCartClick}
                    variant="outline"
                    className="bg-green-500 text-white border border-green-500 hover:bg-white hover:text-green-600 transition-all"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Cart ({cartCount})
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-green-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-green-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-700">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filter by:</span>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-green-300 focus:ring-green-600">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {getCategories().map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
              <span className="ml-2 text-green-700">Loading products...</span>
            </div>
          ) : Object.keys(groupedProducts).length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-green-800 mb-4">Available Products</h2>
                <p className="text-green-700 max-w-2xl mx-auto">
                  Choose from our selection of {filteredProducts.length} premium products
                </p>
              </div>

              {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <div key={category} className="mb-16">
                  <div className="flex items-center mb-8">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                      {category}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-300 to-transparent ml-4"></div>
                    <span className="text-sm text-green-600 ml-4">{categoryProducts.length} items</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
                    {categoryProducts.map(renderProductCard)}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="text-center py-20">
              <Package className="h-20 w-20 text-green-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-green-900 mb-4">No Products Found</h3>
              <p className="text-green-700 mb-8 max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you’re looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                View All Products
              </Button>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-xl shadow-lg max-w-md mx-auto border border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-4">More Products Coming Soon!</h3>
                <p className="text-green-700 mb-6">
                  We're constantly adding new products to our collection. Stay tuned!
                </p>
                <div className="bg-white p-4 rounded-lg border border-green-300 shadow-sm">
                  <p className="text-green-800 font-medium">
                    Sign up for our newsletter to get updates on new arrivals.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
