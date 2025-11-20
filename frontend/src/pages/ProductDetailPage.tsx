import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "@/components/PageTemplate";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { productApi } from "@/services/api";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  rating: number;
  badges: string[];
  description: string;
  ingredients: string;
  howToUse: string;
  stock: number;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await productApi.getById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (product) {
      setAddingToCart(true);
      try {
        await addToCart(product.id, quantity);
      } finally {
        setAddingToCart(false);
      }
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <PageTemplate title="Cargando...">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-marzetti-text-secondary">Cargando detalles del producto...</p>
        </div>
      </PageTemplate>
    );
  }

  if (!product) {
    return (
      <PageTemplate title="Producto No Encontrado">
        <p>Lo sentimos, el producto que buscas no existe o ha sido eliminado.</p>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title={product.name}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image Gallery */}
        <div className="flex flex-col items-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg mb-4 transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-4xl font-bold text-marzetti-text-primary mb-2">{product.name}</h1>
          <p className="text-xl text-marzetti-text-secondary mb-4">{product.brand}</p>

          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
              />
            ))}
            <span className="text-lg text-marzetti-text-secondary ml-2">({product.rating.toFixed(1)})</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {product.badges?.map((badge, index) => (
              <Badge key={index} className="bg-marzetti-primary text-marzetti-secondary text-sm px-3 py-1 hover:scale-110 transition-transform duration-300">
                {badge}
              </Badge>
            ))}
          </div>

          <p className="text-5xl font-bold text-marzetti-primary mb-6">${product.price.toLocaleString('es-AR')}</p>

          <p className="text-marzetti-text-primary text-lg mb-6">{product.description}</p>

          <div className="space-y-4 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-marzetti-text-primary mb-2">Ingredientes Clave:</h3>
              <p className="text-marzetti-text-secondary">{product.ingredients || "No especificado"}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-marzetti-text-primary mb-2">Modo de Uso:</h3>
              <p className="text-marzetti-text-secondary">{product.howToUse || "No especificado"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-8">
            {/* Quantity Selector */}
            <div className="flex items-center border rounded-md">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="px-4 text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={incrementQuantity}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
            </div>
                        <Button
              className="flex-grow bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary hover:text-white text-lg py-3 transition-all duration-300"
              onClick={handleAddToCart}
              disabled={addingToCart || product.stock === 0}
            >
              {addingToCart ? 'Agregando...' : 'Agregar al carrito'}
            </Button>
          </div>

          {product.stock > 0 ? (
            <p className="text-green-600 font-medium">En stock ({product.stock} unidades)</p>
          ) : (
            <p className="text-red-600 font-medium">Sin stock</p>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default ProductDetailPage;