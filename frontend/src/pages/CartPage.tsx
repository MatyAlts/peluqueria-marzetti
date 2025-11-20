import React, { useState } from 'react';
import PageTemplate from '@/components/PageTemplate';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { orderApi, paymentApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Initialize MercadoPago with Public Key
initMercadoPago('APP_USR-343cc514-310b-4641-83b9-8815a0b31cf0', { locale: 'es-AR' });

const CartPage: React.FC = () => {
    const { cart, loading, updateQuantity, removeItem, clearCart } = useCart();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [customerData, setCustomerData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
    });

    const validateCustomerData = () => {
        if (!customerData.customerName || !customerData.customerEmail) {
            toast({
                title: 'Datos incompletos',
                description: 'Por favor completa tu nombre y email',
                variant: 'destructive',
            });
            return false;
        }
        return true;
    };

    const handleCheckout = async () => {
        if (!validateCustomerData()) return;

        setCheckoutLoading(true);
        try {
            const response = await orderApi.createOrder(customerData);
            toast({
                title: '¡Pedido creado!',
                description: `Tu número de orden es: ${response.data.orderNumber}`,
            });
            setCustomerData({ customerName: '', customerEmail: '', customerPhone: '' });
            // Redirect to order confirmation or home
            setTimeout(() => navigate('/'), 2000);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'No se pudo crear el pedido',
                variant: 'destructive',
            });
        } finally {
            setCheckoutLoading(false);
        }
    };

    const handleMercadoPagoCheckout = async () => {
        if (!validateCustomerData()) return;

        setCheckoutLoading(true);
        try {
            // 1. Create Order first
            const orderResponse = await orderApi.createOrder(customerData);
            const orderNumber = orderResponse.data.orderNumber;

            // 2. Create Preference for this order
            const preferenceResponse = await paymentApi.createPreference(orderNumber);
            setPreferenceId(preferenceResponse.data.preferenceId);

            toast({
                title: 'Listo para pagar',
                description: 'Usa el botón de Mercado Pago para finalizar.',
            });

        } catch (error: any) {
            console.error(error);
            toast({
                title: 'Error',
                description: 'No se pudo iniciar el pago con Mercado Pago',
                variant: 'destructive',
            });
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (loading && !cart) {
        return (
            <PageTemplate title="Carrito de Compras">
                <p>Cargando carrito...</p>
            </PageTemplate>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <PageTemplate title="Carrito de Compras">
                <div className="text-center py-12">
                    <ShoppingBag className="mx-auto h-24 w-24 text-marzetti-text-secondary mb-4" />
                    <h2 className="text-2xl font-bold text-marzetti-text-primary mb-2">
                        Tu carrito está vacío
                    </h2>
                    <p className="text-marzetti-text-secondary mb-6">
                        Agrega productos para comenzar tu compra
                    </p>
                    <Button
                        onClick={() => navigate('/catalogo')}
                        className="bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary"
                    >
                        Ver Catálogo
                    </Button>
                </div>
            </PageTemplate>
        );
    }

    return (
        <PageTemplate title="Carrito de Compras">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-marzetti-card p-4 rounded-lg shadow-lg flex gap-4"
                        >
                            <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-24 h-24 object-cover rounded"
                            />
                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-marzetti-text-primary">
                                    {item.product.name}
                                </h3>
                                <p className="text-sm text-marzetti-text-secondary">{item.product.brand}</p>
                                <p className="text-xl font-bold text-marzetti-primary mt-2">
                                    ${item.product.price.toLocaleString('es-AR')}
                                </p>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1 || loading}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        disabled={item.quantity >= item.product.stock || loading}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-sm text-marzetti-text-secondary">
                                    Subtotal: ${item.subtotal.toLocaleString('es-AR')}
                                </p>
                            </div>
                        </div>
                    ))}
                    <Button
                        variant="outline"
                        onClick={clearCart}
                        disabled={loading}
                        className="w-full border-red-500 text-red-500 hover:bg-red-50"
                    >
                        Vaciar Carrito
                    </Button>
                </div>

                {/* Checkout Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-marzetti-card p-6 rounded-lg shadow-lg sticky top-24">
                        <h2 className="text-2xl font-bold text-marzetti-text-primary mb-4">
                            Resumen del Pedido
                        </h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-marzetti-text-secondary">
                                <span>Items ({cart.itemCount})</span>
                                <span>${cart.total.toLocaleString('es-AR')}</span>
                            </div>
                            <div className="border-t pt-2 flex justify-between text-xl font-bold text-marzetti-text-primary">
                                <span>Total</span>
                                <span>${cart.total.toLocaleString('es-AR')}</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                value={customerData.customerName}
                                onChange={(e) =>
                                    setCustomerData({ ...customerData, customerName: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={customerData.customerEmail}
                                onChange={(e) =>
                                    setCustomerData({ ...customerData, customerEmail: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="tel"
                                placeholder="Teléfono (opcional)"
                                value={customerData.customerPhone}
                                onChange={(e) =>
                                    setCustomerData({ ...customerData, customerPhone: e.target.value })
                                }
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        {!preferenceId ? (
                            <div className="space-y-3">
                                <Button
                                    onClick={handleCheckout}
                                    disabled={checkoutLoading || loading}
                                    className="w-full bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary text-lg py-6"
                                >
                                    {checkoutLoading ? 'Procesando...' : 'Realizar Pedido (Efectivo/A convenir)'}
                                </Button>

                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">O pagá con</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                <Button
                                    onClick={handleMercadoPagoCheckout}
                                    disabled={checkoutLoading || loading}
                                    className="w-full bg-[#009EE3] hover:bg-[#008ED0] text-white text-lg py-6"
                                >
                                    {checkoutLoading ? 'Cargando...' : 'Pagar con Mercado Pago'}
                                </Button>
                            </div>
                        ) : (
                            <div className="mt-4">
                                <Wallet initialization={{ preferenceId: preferenceId }} customization={{ visual: { buttonBackground: 'black', borderRadius: '16px' } }} />
                                <Button
                                    variant="ghost"
                                    onClick={() => setPreferenceId(null)}
                                    className="w-full mt-2 text-sm text-gray-500"
                                >
                                    Cancelar y volver
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageTemplate>
    );
};

export default CartPage;
