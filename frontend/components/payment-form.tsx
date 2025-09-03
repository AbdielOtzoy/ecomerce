"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { useCart } from "@/stores/cartStore"
import { CartItem } from "@/types"
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { toast } from "sonner"


export default function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false)

  const { getCart, cart } = useCart();
    const [products, setProducts] = useState<CartItem[]>([]);
    useEffect(() => {
    getCart();
    setProducts(  
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cart?.items ?? []).map((item: any) => ({
        createdAt: item.createdAt ?? "",
        id: item.id ?? "",
        price: item.price ?? "",
        productId: item.productId ?? "",
        productName: item.productName ?? "",
        quantity: item.quantity ?? 0,
        updatedAt: item.updatedAt ?? "",
        imageUrl: item.imageUrl ?? "",
        })));
    }, [getCart, cart?.items]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert("Payment processed successfully!")
    }, 2000)
  }
  

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-600" />
              Secure Payment
            </CardTitle>
            <CardDescription>Your payment information is encrypted and secure</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Billing Address */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Billing Address</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select defaultValue="us" required>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="au">Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
                {products.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                    <Image src={item.imageUrl} alt={item.productId} width={50} height={50} className="rounded" />
                    <div className="flex-1">
                        <div className="font-medium">{item.productName}</div>
                        <div className="text-sm text-muted-foreground">Quantity: {item.quantity}</div>
                    </div>
                    <span className="text-lg font-semibold">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</span>
                    </div>
                ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(products.reduce((total, item) => total + (item.quantity * parseFloat(item.price)), 0)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$4.99</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${(products.reduce((total, item) => total + (item.quantity * parseFloat(item.price)), 0) + 4.99).toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
             <div className="w-full flex justify-end">
                <PayPalScriptProvider options={{
                  clientId: "AbPvqO5iP5tIGYSgxc26tZeY5O_LWPDhEsQCUQEnvzbOuTDn-x8KefS6vO4lhlIjWEubwc2ETl0fkIgU",
                  currency: "USD",
                  intent: "capture",
                  
                }}>
                  <PayPalButtons className="w-full" style={{
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal',
                  }} 
                  createOrder={async () => {
                    console.log('Creating order...');
                    const order = await fetch('http://localhost:8000/checkout/order', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        items: products.map(item => ({
                          productId: item.productId,
                          productName: item.productName,
                          quantity: item.quantity,
                          price: parseFloat(item.price),
                        })),
                      }),
                    });
                    const orderData = await order.json();
                    console.log('Order created:', orderData.id);
                    return orderData.id;
                  }}
                  onApprove={async (data) => {
                    console.log('Order approved:', data.orderID);
                    const captureOrder = await fetch(`http://localhost:8000/checkout/capture`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ orderId: data.orderID }),
                    });
                    const captureData = await captureOrder.json();
                    console.log('Order captured:', captureData);
                    if(captureData.status == "COMPLETED"){
                      // Show success toaster
                      toast.success("Payment completed successfully!");
                    }
                    
                  }}
                  />
                </PayPalScriptProvider>
              </div>
          </CardFooter>
        </Card>
        
      </div>
    </div>
  )
}
// createOrder={() => {}}
// onCancel={() => {}}
// onApprove={() => {}}