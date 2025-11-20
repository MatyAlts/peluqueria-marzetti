import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import api from "@/services/api";

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  rating: number;
  description: string;
  ingredients: string;
  howToUse: string;
  stock: number;
  badges: string[];
  category: Category;
  categoryId: number;
}

type ProductForm = {
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  rating: number;
  description: string;
  ingredients: string;
  howToUse: string;
  stock: number;
  badges: string[];
  categoryId: number;
};

const emptyForm: ProductForm = {
  name: "",
  brand: "",
  price: 0,
  imageUrl: "",
  rating: 0,
  description: "",
  ingredients: "",
  howToUse: "",
  stock: 0,
  badges: [],
  categoryId: 0,
};

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ProductForm>(emptyForm);
  const navigate = useNavigate();
  const { toast } = useToast();

  const getAuthHeader = () => {
    const token = localStorage.getItem("adminToken");
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchProducts();
    fetchCategories();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/products/${editingId}`, formData, {
          headers: getAuthHeader(),
        });
        toast({ title: "Producto actualizado correctamente" });
      } else {
        await api.post("/admin/products", formData, {
          headers: getAuthHeader(),
        });
        toast({ title: "Producto creado correctamente" });
      }
      setShowForm(false);
      setEditingId(null);
      fetchProducts();
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "No se pudo guardar el producto",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await api.delete(`/admin/products/${id}`, {
        headers: getAuthHeader(),
      });
      toast({ title: "Producto eliminado" });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "No se pudo eliminar el producto",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price,
      imageUrl: product.imageUrl,
      rating: product.rating,
      description: product.description,
      ingredients: product.ingredients,
      howToUse: product.howToUse,
      stock: product.stock,
      badges: product.badges || [],
      categoryId: product.category?.id || product.categoryId || 0,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData(emptyForm);
  };

  if (loading) return <div className="p-8">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-marzetti-primary/10 to-marzetti-secondary/10 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/admin")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
            <h1 className="text-4xl font-bold text-marzetti-text-primary">Gestión de Productos</h1>
          </div>
          <Button
            onClick={() => {
              setShowForm(true);
              setEditingId(null);
              resetForm();
            }}
            className="bg-marzetti-primary hover:bg-marzetti-primary-hover"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>

        {showForm && (
          <div className="bg-marzetti-card p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-marzetti-text-primary">
              {editingId ? "Editar Producto" : "Nuevo Producto"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Marca</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Categoría</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value={0}>Seleccionar categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">URL de Imagen</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Ingredientes</label>
                <textarea
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={2}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Modo de Uso</label>
                <textarea
                  value={formData.howToUse}
                  onChange={(e) => setFormData({ ...formData, howToUse: e.target.value })}
                  className="w-full p-2 border rounded"
                  rows={2}
                />
              </div>
              <div className="col-span-2 flex gap-4">
                <Button type="submit" className="bg-marzetti-primary">
                  {editingId ? "Actualizar" : "Crear"}
                </Button>
                <Button
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  variant="outline"
                  type="button"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-marzetti-card p-4 rounded-lg shadow-lg">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded mb-4" />
              <h3 className="text-lg font-bold text-marzetti-text-primary">{product.name}</h3>
              <p className="text-sm text-marzetti-text-secondary">{product.brand}</p>
              <p className="text-xl font-bold text-marzetti-primary mt-2">
                ${product.price.toLocaleString("es-AR")}
              </p>
              <p className="text-sm text-marzetti-text-secondary">Stock: {product.stock}</p>
              <p className="text-sm text-marzetti-text-secondary">
                Categoría: {product.category?.name || "Sin categoría"}
              </p>
              <div className="flex gap-2 mt-4">
                <Button onClick={() => handleEdit(product)} variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(product.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
