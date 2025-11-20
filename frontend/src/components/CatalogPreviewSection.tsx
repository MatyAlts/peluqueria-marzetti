import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { productApi } from "@/services/api";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  rating: number;
  badges: string[];
}

const CatalogPreviewSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAll();
        // Take only the first 4 products for preview
        setProducts(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-marzetti-text-primary">Catálogo de Productos</h2>
      <p className="text-center text-lg text-marzetti-text-secondary mb-10">
        Elegí tus favoritos y recibilos en casa o retiralos en el salón.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-marzetti-text-secondary">Cargando productos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                id: product.id.toString()
              }}
            />
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link to="/catalogo">
          <Button className="bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary hover:text-white text-lg px-8 py-6 rounded-full transition-all duration-300">
            Ver Catálogo Completo
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CatalogPreviewSection;