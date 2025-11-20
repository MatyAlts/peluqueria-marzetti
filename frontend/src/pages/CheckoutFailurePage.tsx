import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, AlertTriangle, Home, ShoppingCart, CreditCard } from 'lucide-react';

const CheckoutFailurePage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');

    return (
        <PageTemplate title="Pago Rechazado">
            <div className="container mx-auto px-4 py-12 max-w-2xl">
                <Card className="border-red-200 bg-red-50">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <XCircle className="w-20 h-20 text-red-600" />
                        </div>
                        <CardTitle className="text-3xl text-red-800">
                            Pago Rechazado
                        </CardTitle>
                        <CardDescription className="text-lg text-red-700">
                            No pudimos procesar tu pago
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-white rounded-lg p-6 space-y-3">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-gray-600">Estado del pago:</span>
                                <span className="font-semibold text-red-600">
                                    {status === 'rejected' ? 'Rechazado' : 'Fallido'}
                                </span>
                            </div>
                            {paymentId && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">ID de intento:</span>
                                    <span className="font-mono text-sm">{paymentId}</span>
                                </div>
                            )}
                        </div>

                        <div className="bg-red-50 border border-red-300 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-red-900 mb-1">
                                        Posibles causas:
                                    </h3>
                                    <ul className="text-sm text-red-800 space-y-1 list-disc list-inside">
                                        <li>Fondos insuficientes en la tarjeta</li>
                                        <li>Datos de la tarjeta incorrectos</li>
                                        <li>La tarjeta está vencida o bloqueada</li>
                                        <li>El banco rechazó la transacción</li>
                                        <li>Se excedió el límite de compras diarias</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <CreditCard className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-1">
                                        ¿Qué puedes hacer?
                                    </h3>
                                    <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                                        <li>Verifica los datos de tu tarjeta</li>
                                        <li>Intenta con otra tarjeta</li>
                                        <li>Contacta a tu banco para más información</li>
                                        <li>Intenta el pago nuevamente más tarde</li>
                                    </ul>
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
                                onClick={() => navigate('/carrito')}
                                className="flex-1 bg-red-600 hover:bg-red-700"
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Reintentar pago
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageTemplate>
    );
};

export default CheckoutFailurePage;
