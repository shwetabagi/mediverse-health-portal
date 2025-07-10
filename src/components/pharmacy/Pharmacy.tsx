
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Star, 
  Truck, 
  Shield,
  Clock,
  Filter,
  Pill,
  Heart,
  AlertCircle
} from 'lucide-react';

export const Pharmacy = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<{[key: number]: number}>({});

  const products = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      price: 12.99,
      originalPrice: 15.99,
      description: 'Effective pain relief and fever reducer',
      manufacturer: 'PharmaCorp',
      rating: 4.5,
      reviews: 234,
      inStock: true,
      stockCount: 50,
      prescription: false,
      image: '/api/placeholder/150/150',
      tags: ['pain relief', 'fever', 'headache'],
      delivery: '2-3 days',
      offer: '20% OFF'
    },
    {
      id: 2,
      name: 'Lisinopril 10mg',
      category: 'Heart & Blood Pressure',
      price: 45.50,
      originalPrice: null,
      description: 'ACE inhibitor for high blood pressure',
      manufacturer: 'CardioMed',
      rating: 4.7,
      reviews: 156,
      inStock: true,
      stockCount: 25,
      prescription: true,
      image: '/api/placeholder/150/150',
      tags: ['blood pressure', 'heart', 'hypertension'],
      delivery: '1-2 days',
      offer: null
    },
    {
      id: 3,
      name: 'Vitamin D3 1000IU',
      category: 'Vitamins & Supplements',
      price: 18.99,
      originalPrice: 22.99,
      description: 'Essential vitamin for bone health',
      manufacturer: 'VitaLife',
      rating: 4.3,
      reviews: 89,
      inStock: true,
      stockCount: 100,
      prescription: false,
      image: '/api/placeholder/150/150',
      tags: ['vitamin', 'bone health', 'immunity'],
      delivery: '2-3 days',
      offer: '15% OFF'
    },
    {
      id: 4,
      name: 'Omeprazole 20mg',
      category: 'Digestive Health',
      price: 28.75,
      originalPrice: null,
      description: 'Proton pump inhibitor for acid reflux',
      manufacturer: 'GastroHealth',
      rating: 4.6,
      reviews: 178,
      inStock: false,
      stockCount: 0,
      prescription: true,
      image: '/api/placeholder/150/150',
      tags: ['acid reflux', 'heartburn', 'stomach'],
      delivery: 'Out of stock',
      offer: null
    },
    {
      id: 5,
      name: 'Multivitamin Complex',
      category: 'Vitamins & Supplements',
      price: 32.99,
      originalPrice: 39.99,
      description: 'Complete daily nutrition support',
      manufacturer: 'NutriMax',
      rating: 4.4,
      reviews: 267,
      inStock: true,
      stockCount: 75,
      prescription: false,
      image: '/api/placeholder/150/150',
      tags: ['multivitamin', 'nutrition', 'daily health'],
      delivery: '2-3 days',
      offer: '18% OFF'
    },
    {
      id: 6,
      name: 'Ibuprofen 400mg',
      category: 'Pain Relief',
      price: 9.99,
      originalPrice: null,
      description: 'Anti-inflammatory pain reliever',
      manufacturer: 'ReliefPharma',
      rating: 4.2,
      reviews: 145,
      inStock: true,
      stockCount: 60,
      prescription: false,
      image: '/api/placeholder/150/150',
      tags: ['pain relief', 'anti-inflammatory', 'muscle pain'],
      delivery: '1-2 days',
      offer: null
    }
  ];

  const categories = ['all', 'Pain Relief', 'Heart & Blood Pressure', 'Vitamins & Supplements', 'Digestive Health'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [productId, count]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return total + (product?.price || 0) * count;
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Online Pharmacy</h1>
            <p className="text-green-100">Order medicines and health products with fast delivery</p>
          </div>
          <div className="relative">
            <Button className="bg-white/20 hover:bg-white/30 text-white">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart ({getTotalItems()})
            </Button>
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500">
                {getTotalItems()}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search medicines, supplements, or health products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shopping Cart Summary */}
      {getTotalItems() > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">
                  {getTotalItems()} items in cart
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold text-green-800">
                  ${getTotalPrice().toFixed(2)}
                </span>
                <Button className="bg-green-600 hover:bg-green-700">
                  Checkout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              {/* Product Image */}
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4 relative">
                <Pill className="h-12 w-12 text-gray-400" />
                {product.offer && (
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    {product.offer}
                  </Badge>
                )}
                {product.prescription && (
                  <Badge className="absolute top-2 left-2 bg-blue-500">
                    Prescription
                  </Badge>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.manufacturer}</p>
                </div>

                <Badge variant="outline">{product.category}</Badge>

                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-2">
                  {product.inStock ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600">In Stock ({product.stockCount})</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-red-600">Out of Stock</span>
                    </>
                  )}
                </div>

                {/* Delivery Info */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4" />
                  <span>Delivery: {product.delivery}</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex items-center space-x-2">
                  {cart[product.id] ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-medium px-4">{cart[product.id]}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Pill className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all categories.</p>
          </CardContent>
        </Card>
      )}

      {/* Important Notice */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-800">
              <p className="font-medium mb-1">Important Notice:</p>
              <p>Prescription medicines require a valid prescription from a licensed healthcare provider. Please consult your doctor before purchasing prescription medications. Free delivery on orders over $50.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4">
          <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h4 className="font-medium mb-1">Licensed Pharmacy</h4>
          <p className="text-sm text-gray-600">Fully licensed and regulated</p>
        </Card>
        <Card className="text-center p-4">
          <Truck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h4 className="font-medium mb-1">Fast Delivery</h4>
          <p className="text-sm text-gray-600">Same day delivery available</p>
        </Card>
        <Card className="text-center p-4">
          <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h4 className="font-medium mb-1">24/7 Support</h4>
          <p className="text-sm text-gray-600">Pharmacist available anytime</p>
        </Card>
      </div>
    </div>
  );
};
