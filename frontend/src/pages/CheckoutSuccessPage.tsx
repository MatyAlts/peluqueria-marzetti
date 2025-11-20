import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Package, Home } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const CheckoutSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { clearCart } = useCart();

    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const merchantOrder = searchParams.get('merchant_order_id');

    useEffect(() => {
        // Limpiar el carrito después de un pago exitoso
        clearCart();
    }, [clearCart]);

    return (
        <PageTemplate title="¡Pago Exitoso!">
            <div className="container mx-auto px-4 py-12 max-w-2xl">
                <Card className="border-green-200 bg-green-50">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="w-20 h-20 text-green-600" />
                        </div>
                        <CardTitle className="text-3xl text-green-800">
                            ¡Pago Aprobado!
                        </CardTitle>
                        <CardDescription className="text-lg text-green-700">
                            Tu compra ha sido procesada exitosamente
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-white rounded-lg p-6 space-y-3">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-gray-600">Estado del pago:</span>
                                <span className="font-semibold text-green-600">
                                    {status === 'approved' ? 'Aprobado' : 'Procesado'}
                                </span>
                            </div>
                            {paymentId && (
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-gray-600">ID de pago:</span>
                                    <span className="font-mono text-sm">{paymentId}</span>
                                </div>
                            )}
                            {merchantOrder && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Orden N°:</span>
                                    <span className="font-mono text-sm">{merchantOrder}</span>
                                </div>
                            )}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Package className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-1">
                                        ¿Qué sigue?
                                    </h3>
                                    <p className="text-sm text-blue-800">
                                        Recibirás un email de confirmación con los detalles de tu compra. 
                                        Si realizaste una reserva de turno, te contactaremos pronto para confirmar.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <Button
                                onClick={() => navigate('/')}
                                variant="outline"
                                className="flex-1"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Volver al inicio
                            </Button>
                            <Button
                                onClick={() => navigate('/catalog')}
                                className="flex-1"
                            >
                                <Package className="w-4 h-4 mr-2" />
                                Ver más productos
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageTemplate>
    );
};

export default CheckoutSuccessPage;
