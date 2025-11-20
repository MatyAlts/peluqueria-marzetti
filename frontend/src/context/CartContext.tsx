import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
    id: number;
    product: {
        id: number;
        name: string;
        brand: string;
        price: number;
        imageUrl: string;
        stock: number;
    };
    quantity: number;
    subtotal: number;
}

interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
}

interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    addToCart: (productId: number, quantity: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;
    clearCart: () => Promise<void>;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const refreshCart = async () => {
        try {
            const response = await cartApi.getCart();
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (productId: number, quantity: number) => {
        setLoading(true);
        try {
            await cartApi.addItem(productId, quantity);
            await refreshCart();
            toast({
                title: '¡Producto agregado!',
                description: 'El producto se agregó al carrito correctamente.',
            });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'No se pudo agregar el producto al carrito',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId: number, quantity: number) => {
        setLoading(true);
        try {
            await cartApi.updateItem(itemId, quantity);
            await refreshCart();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'No se pudo actualizar la cantidad',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (itemId: number) => {
        setLoading(true);
        try {
            await cartApi.removeItem(itemId);
            await refreshCart();
            toast({
                title: 'Producto eliminado',
                description: 'El producto se eliminó del carrito.',
            });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'No se pudo eliminar el producto',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        setLoading(true);
        try {
            await cartApi.clearCart();
            setCart({ items: [], total: 0, itemCount: 0 });
            toast({
                title: 'Carrito vaciado',
                description: 'Se eliminaron todos los productos del carrito.',
            });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'No se pudo vaciar el carrito',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                addToCart,
                updateQuantity,
                removeItem,
                clearCart,
                refreshCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
