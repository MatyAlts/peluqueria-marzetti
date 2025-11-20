import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { productApi, categoryApi } from "@/services/api";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  rating: number;
  badges: string[];
  category: {
    id: number;
    name: string;
  };
}

interface Category {
  id: number;
  name: string;
  description: string;
}

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0, 50000]);

  // Fetch products and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsResponse, categoriesResponse] = await Promise.all([
          productApi.getAll(),
          categoryApi.getAll()
        ]);
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search, category, and price
  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      // Skip products with missing data
      if (!product || !product.name || !product.brand) return false;

      // Filter by search term
      const matchesSearch = !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by category (using category ID for exact match)
      const matchesCategory = selectedCategory === "all" ||
        (product.category && product.category.id && product.category.id.toString() === selectedCategory);

      // Filter by price range
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, selectedCategory, priceRange]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceRange([0, 50000]);
  };

  if (loading) {
    return (
      <PageTemplate title="Nuestro Catálogo">
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-marzetti-text-secondary">Cargando productos...</p>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title="Nuestro Catálogo">
      <div className="container mx-auto px-4">

        {/* Filters Section */}
        <div className="bg-marzetti-card rounded-lg shadow-md p-6 mb-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div className="md:col-span-2">
              <Label htmlFor="search">Buscar productos</Label>
              <Input
                id="search"
                type="text"
                placeholder="Buscar por nombre o marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Category Filter */}
            <div>
              <Label htmlFor="category">Categoría</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" className="mt-1">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.filter(cat => cat && cat.id).map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={handleResetFilters}
                className="w-full"
              >
                Limpiar filtros
              </Button>
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mt-6">
            <Label>Rango de precio: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}</Label>
            <Slider
              min={0}
              max={50000}
              step={500}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-2"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-marzetti-text-secondary">
              No se encontraron productos que coincidan con los filtros.
            </p>
          </div>
        ) : (
          <>
            <p className="text-marzetti-text-secondary mb-4 text-left">
              Mostrando {filteredProducts.length} de {products.length} productos
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    id: product.id.toString()
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </PageTemplate>
  );
};

export default CatalogPage;