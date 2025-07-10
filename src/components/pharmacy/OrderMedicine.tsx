
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Pill, Search, ShoppingCart, Plus, Minus, Truck, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const OrderMedicine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const { toast } = useToast();

  const medicines = [
    {
      id: '1',
      name: 'Paracetamol 500mg',
      type: 'Tablet',
      price: 12.99,
      inStock: true,
      prescription: false,
      description: 'Pain relief and fever reducer'
    },
    {
      id: '2',
      name: 'Ibuprofen 200mg',
      type: 'Capsule',
      price: 8.50,
      inStock: true,
      prescription: false,
      description: 'Anti-inflammatory pain reliever'
    },
    {
      id: '3',
      name: 'Amoxicillin 250mg',
      type: 'Capsule',
      price: 24.99,
      inStock: true,
      prescription: true,
      description: 'Antibiotic for bacterial infections'
    },
    {
      id: '4',
      name: 'Vitamin D3 1000IU',
      type: 'Tablet',
      price: 15.75,
      inStock: true,
      prescription: false,
      description: 'Vitamin D supplement'
    },
    {
      id: '5',
      name: 'Cough Syrup',
      type: 'Liquid',
      price: 9.99,
      inStock: false,
      prescription: false,
      description: 'Relief for cough and cold symptoms'
    },
    {
      id: '6',
      name: 'Blood Pressure Monitor',
      type: 'Device',
      price: 89.99,
      inStock: true,
      prescription: false,
      description: 'Digital blood pressure monitor'
    }
  ];

  const addToCart = (medicineId: string) => {
    setCart(prev => ({
      ...prev,
      [medicineId]: (prev[medicineId] || 0) + 1
    }));
    const medicine = medicines.find(m => m.id === medicineId);
    toast({
      title: "Added to Cart",
      description: `${medicine?.name} added to your cart.`
    });
  };

  const removeFromCart = (medicineId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[medicineId] > 1) {
        newCart[medicineId]--;
      } else {
        delete newCart[medicineId];
      }
      return newCart;
    });
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [medicineId, quantity]) => {
      const medicine = medicines.find(m => m.id === medicineId);
      return total + (medicine ? medicine.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const handleCheckout = () => {
    if (getCartItemCount() === 0) {
      toast({
        title: "Cart Empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order Placed Successfully!",
      description: `Your order of ${getCartItemCount()} items totaling $${getCartTotal().toFixed(2)} has been placed.`
    });
    setCart({});
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="h-5 w-5 text-orange-600" />
            <span>Order Medicine</span>
          </CardTitle>
          <CardDescription>Browse and order medications and health products</CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Cart Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search medicines, supplements, devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-5 w-5 text-orange-600" />
                <span className="font-medium">Cart ({getCartItemCount()})</span>
              </div>
              <span className="text-lg font-bold">${getCartTotal().toFixed(2)}</span>
            </div>
            <Button 
              onClick={handleCheckout}
              className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine) => (
          <Card key={medicine.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{medicine.name}</h3>
                    <p className="text-gray-600 text-sm">{medicine.type}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {medicine.prescription && (
                      <Badge variant="outline" className="text-xs">Prescription</Badge>
                    )}
                    <Badge className={medicine.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">{medicine.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">
                    ${medicine.price.toFixed(2)}
                  </span>
                  
                  {cart[medicine.id] ? (
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromCart(medicine.id)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{cart[medicine.id]}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToCart(medicine.id)}
                        disabled={!medicine.inStock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => addToCart(medicine.id)}
                      disabled={!medicine.inStock}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delivery Info */}
      <Card className="bg-orange-50 border-orange-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Truck className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-orange-900">Free Delivery</h4>
                <p className="text-orange-700 text-sm">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium text-orange-900">Quick Delivery</h4>
                <p className="text-orange-700 text-sm">Same day delivery available</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
