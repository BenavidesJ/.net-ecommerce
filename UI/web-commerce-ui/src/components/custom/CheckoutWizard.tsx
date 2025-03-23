import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { addOrder, payment } from '@/services/order';
import { useToast } from '@/hooks/use-toast';
import { CreditCardIcon } from 'lucide-react';
import { useAuth } from '@/context';
import { PrivateLayout } from '@/layout';

type CheckoutStep = 'review' | 'payment' | 'confirmation';

export function CheckoutWizard() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('review');
  const { totalPrice, clearCart, checkout } = useCart();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmitOrder = async () => {
    try {
      const response = await addOrder(checkout);
      console.log(response);
      if (response) {
        toast({ title: 'Pedido realizado!', variant: 'success' });
        setCurrentStep('payment');
      } else {
        toast({
          title: 'Error',
          description: 'Hubo un error haciendo el pedido. Intente de nuevo',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Error creando el pedido',
        variant: 'destructive',
      });
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await payment({
      amount: totalPrice,
      description: `Pago de Usuario ${currentUser?.nombre} ${currentUser?.apellido}`,
      currency: 'crc',
      items: [],
      returnUrl: 'https://example.com/result',
    });
    setCurrentStep('confirmation');
  };

  const handleConfirmation = () => {
    clearCart();
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'review':
        return (
          <>
            <CardHeader>
              <CardTitle>Revisa tu orden</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checkout.productos.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <span>{item.nombre}</span>
                    <span>{item.color}</span>
                    <span>{item.tamano}</span>
                    <span>${item.costoConIVA.toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/compras')}>
                Cancel
              </Button>
              <Button onClick={handleSubmitOrder}>
                <CreditCardIcon />
                Continue para pagar
              </Button>
            </CardFooter>
          </>
        );
      case 'payment':
        return (
          <>
            <CardHeader>
              <CardTitle>Informacion de Facturacion</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Numero de tarjeta</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Fecha de Expiracion</Label>
                    <Input id="expiry" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre en la tarjeta</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('review')}
              >
                Volver
              </Button>
              <Button onClick={handlePaymentSubmit}>
                <CreditCardIcon />
                Realizar Pago
              </Button>
            </CardFooter>
          </>
        );
      case 'confirmation':
        return (
          <>
            <CardHeader>
              <CardTitle>Gracias por su compra</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src="https://res.cloudinary.com/dh7qptl2n/image/upload/v1733629291/Patito_success_fiixec.jpg"
                alt={`compra exitosa`}
                className="mt-2 w-50 h-50 object-cover"
              />
              <p>
                Su pedido se ha realizado exitosamente. Presione en confirmar
                para completar la orden.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep('payment')}
              >
                Atras
              </Button>
              <Button onClick={handleConfirmation}>Confirmar</Button>
            </CardFooter>
          </>
        );
    }
  };

  return (
    <PrivateLayout>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <Card className="w-full max-w-2xl mx-auto mt-[150px]">
          {renderStep()}
        </Card>
      </div>
    </PrivateLayout>
  );
}
