import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageTemplate from '@/components/PageTemplate';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, AlertCircle, Home, Package } from 'lucide-react';

const CheckoutPendingPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const merchantOrder = searchParams.get('merchant_order_id');

    return (
        <PageTemplate title="Pago Pendiente">
            <div className="container mx-auto px-4 py-12 max-w-2xl">
                <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <Clock className="w-20 h-20 text-yellow-600" />
                        </div>
                        <CardTitle className="text-3xl text-yellow-800">
                            Pago Pendiente
                        </CardTitle>
                        <CardDescription className="text-lg text-yellow-700">
                            Tu pago está siendo procesado
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="bg-white rounded-lg p-6 space-y-3">
                            <div className="flex justify-between items-center border-b pb-2">
                                <span className="text-gray-600">Estado del pago:</span>
                                <span className="font-semibold text-yellow-600">
                                    {status === 'pending' ? 'Pendiente' : 'En proceso'}
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

                        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-yellow-900 mb-1">
                                        ¿Por qué está pendiente?
                                    </h3>
                                    <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                                        <li>El pago está siendo procesado por el banco</li>
                                        <li>Elegiste un medio de pago que requiere aprobación</li>
                                        <li>Puede tardar hasta 48 horas hábiles</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Package className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-blue-900 mb-1">
                                        ¿Qué sigue?
                                    </h3>
                                    <p className="text-sm text-blue-800">
                                        Te notificaremos por email cuando se apruebe tu pago. 
                                        Puedes guardar el número de orden para hacer seguimiento.
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
                                onClick={() => navigate('/catalogo')}
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

export default CheckoutPendingPage;
