import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
    rating: number;
    badges?: string[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await addToCart(Number(product.id), 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetail = () => {
    navigate(`/catalogo/${product.id}`);
  };

  return (
    <Card className="bg-marzetti-card shadow-lg rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {product.badges?.map((badge, index) => (
            <Badge key={index} className="bg-marzetti-primary text-marzetti-secondary text-xs px-2 py-1 hover:scale-110 transition-transform duration-300">
              {badge}
            </Badge>
          ))}
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-marzetti-text-primary mb-1">{product.name}</h3>
        <p className="text-sm text-marzetti-text-secondary mb-2">{product.brand}</p>
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
            />
          ))}
          <span className="text-sm text-marzetti-text-secondary ml-2">({product.rating.toFixed(1)})</span>
        </div>
        <p className="text-xl font-bold text-marzetti-primary">${product.price.toLocaleString('es-AR')}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col space-y-2">
        <Button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary hover:text-white transition-all duration-300"
        >
          {isLoading ? 'Agregando...' : 'Agregar al carrito'}
        </Button>
        <Button
          onClick={handleViewDetail}
          variant="outline"
          className="w-full border-2 border-marzetti-primary text-marzetti-primary hover:bg-marzetti-primary hover:text-marzetti-secondary transition-all duration-300"
        >
          Ver detalle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;