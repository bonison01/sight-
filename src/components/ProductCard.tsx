import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuthContext';
import { useCart } from '@/hooks/useCartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  showBuyNowAndCart?: boolean;
}

const ProductCard = ({ product, showBuyNowAndCart = false }: ProductCardProps) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isAuthenticated) addToCart(product.id, 1);
  };

  const handleBuyNow = () => {
    if (isAuthenticated) {
      addToCart(product.id, 1).then(() => navigate('/checkout'));
    } else {
      navigate('/checkout', { 
        state: { guestCheckout: true, product, quantity: 1 }
      });
    }
  };

  const displayPrice = product.offer_price || product.price;
  const hasOffer = product.offer_price && product.offer_price < product.price;

  return (
    <Card className="h-full flex flex-col group hover:shadow-lg transition-shadow border-green-100 hover:border-green-400">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image_url || '/placeholder-image.png'}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-green-600 text-white shadow-md">
              Featured
            </Badge>
          )}
          {hasOffer && (
            <Badge className="absolute top-2 right-2 bg-green-500 text-white shadow-md">
              Offer
            </Badge>
          )}
          {product.stock_quantity === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg">
              <Badge variant="destructive" className="text-lg bg-red-600 text-white">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between p-4">
        <div>
          <CardTitle className="text-lg mb-2 line-clamp-2 text-gray-900">
            {product.name}
          </CardTitle>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-green-700">
                ₹{displayPrice}
              </span>
              {hasOffer && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.price}
                </span>
              )}
            </div>
            {product.category && (
              <Badge variant="outline" className="mt-2 border-green-300 text-green-700 bg-green-50">
                {product.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {showBuyNowAndCart ? (
            <>
              {/* 🟢 Buy Now */}
              <Button
                onClick={handleBuyNow}
                className="w-full bg-green-700 text-white hover:bg-green-800 focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                disabled={product.stock_quantity === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {product.stock_quantity === 0 ? 'Out of Stock' : 'Buy Now'}
              </Button>

              {/* 🛒 Add to Cart */}
              {isAuthenticated && product.stock_quantity > 0 && (
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="w-full border-green-600 text-green-700 hover:bg-green-50"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              )}

              {/* 👁️ View Details */}
              <Link to={`/product/${product.id}`} className="w-full">
                <Button variant="ghost" className="w-full text-green-700 hover:text-green-800 hover:bg-green-50">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </Link>
            </>
          ) : (
            <>
              {/* 🟢 Default Layout */}
              <div className="flex space-x-2">
                <Link to={`/product/${product.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-700 hover:bg-green-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </Link>

                {isAuthenticated && product.stock_quantity > 0 && (
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-green-700 text-white hover:bg-green-800 focus:ring-2 focus:ring-green-400"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
