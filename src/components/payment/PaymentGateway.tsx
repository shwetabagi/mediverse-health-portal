
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { CreditCard, Lock, Calendar, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentGatewayProps {
  amount: number;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  onPaymentSuccess?: () => void;
  onPaymentCancel?: () => void;
}

export const PaymentGateway = ({ amount, items, onPaymentSuccess, onPaymentCancel }: PaymentGatewayProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      billingAddress: '',
      city: '',
      zipCode: '',
      country: 'US',
    }
  });

  const handlePayment = async (data: any) => {
    setIsProcessing(true);
    console.log('Processing payment:', data);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful!",
        description: `Your payment of $${amount.toFixed(2)} has been processed successfully.`
      });
      onPaymentSuccess?.();
    }, 3000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Secure Payment</h1>
        <p className="text-green-100">Complete your order with our secure payment gateway</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your order details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 text-lg font-bold">
              <span>Total:</span>
              <span>${amount.toFixed(2)}</span>
            </div>
            <Badge className="w-full justify-center" variant="outline">
              <Lock className="h-4 w-4 mr-2" />
              Secure SSL Encrypted Payment
            </Badge>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Payment Information</span>
            </CardTitle>
            <CardDescription>Enter your payment details securely</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Payment Method Selection */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <Button
                variant={selectedPaymentMethod === 'card' ? 'default' : 'outline'}
                onClick={() => setSelectedPaymentMethod('card')}
                className="h-12"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Card
              </Button>
              <Button
                variant={selectedPaymentMethod === 'paypal' ? 'default' : 'outline'}
                onClick={() => setSelectedPaymentMethod('paypal')}
                className="h-12"
              >
                PayPal
              </Button>
              <Button
                variant={selectedPaymentMethod === 'apple' ? 'default' : 'outline'}
                onClick={() => setSelectedPaymentMethod('apple')}
                className="h-12"
              >
                Apple Pay
              </Button>
            </div>

            {selectedPaymentMethod === 'card' && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cardholderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cardholder Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input {...field} placeholder="John Doe" className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input 
                              {...field} 
                              placeholder="1234 5678 9012 3456"
                              className="pl-10"
                              onChange={(e) => {
                                const formatted = formatCardNumber(e.target.value);
                                field.onChange(formatted);
                              }}
                              maxLength={19}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input 
                                {...field} 
                                placeholder="MM/YY"
                                className="pl-10"
                                onChange={(e) => {
                                  const formatted = formatExpiryDate(e.target.value);
                                  field.onChange(formatted);
                                }}
                                maxLength={5}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="123"
                              maxLength={4}
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="billingAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Billing Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="123 Main Street" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="New York" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="10001" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={onPaymentCancel}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isProcessing}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {selectedPaymentMethod === 'paypal' && (
              <div className="text-center py-8">
                <Button 
                  onClick={() => {
                    setIsProcessing(true);
                    setTimeout(() => {
                      setIsProcessing(false);
                      toast({
                        title: "Payment Successful!",
                        description: `Your PayPal payment of $${amount.toFixed(2)} has been processed.`
                      });
                      onPaymentSuccess?.();
                    }, 2000);
                  }}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)} with PayPal`}
                </Button>
              </div>
            )}

            {selectedPaymentMethod === 'apple' && (
              <div className="text-center py-8">
                <Button 
                  onClick={() => {
                    setIsProcessing(true);
                    setTimeout(() => {
                      setIsProcessing(false);
                      toast({
                        title: "Payment Successful!",
                        description: `Your Apple Pay payment of $${amount.toFixed(2)} has been processed.`
                      });
                      onPaymentSuccess?.();
                    }, 1500);
                  }}
                  disabled={isProcessing}
                  className="w-full bg-black hover:bg-gray-800"
                >
                  {isProcessing ? 'Processing...' : `Pay $${amount.toFixed(2)} with Apple Pay`}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
