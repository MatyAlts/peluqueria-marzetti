import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { Plus, Edit, Trash2, ArrowLeft, Tag } from "lucide-react";

interface Promotion {
  id: number;
  title: string;
  description: string;
  code?: string;
  imageUrl?: string;
  actionUrl?: string;
  active: boolean;
}

const AdminPromotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Promotion>>({
    title: "",
    description: "",
    code: "",
    imageUrl: "",
    actionUrl: "",
    active: true,
  });
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
    fetchPromotions();
  }, [navigate]);

  const fetchPromotions = async () => {
    try {
      const response = await api.get("/admin/promotions", {
        headers: getAuthHeader(),
      });
      setPromotions(response.data);
    } catch (error) {
      toast({
        title: "Error al cargar promociones",
        description: "Revisa tu conexion o vuelve a intentarlo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/promotions/${editingId}`, formData, {
          headers: getAuthHeader(),
        });
        toast({ title: "Promocion actualizada correctamente" });
      } else {
        await api.post("/admin/promotions", formData, {
          headers: getAuthHeader(),
        });
        toast({ title: "Promocion creada correctamente" });
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchPromotions();
    } catch (error: any) {
      toast({
        title: "No pudimos guardar la promocion",
        description: error.response?.data?.message || "Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Seguro que deseas eliminar esta promocion?")) return;
    try {
      await api.delete(`/admin/promotions/${id}`, {
        headers: getAuthHeader(),
      });
      toast({ title: "Promocion eliminada" });
      fetchPromotions();
    } catch (error: any) {
      toast({
        title: "No se pudo eliminar",
        description: error.response?.data?.message || "Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingId(promotion.id);
    setFormData(promotion);
    setShowForm(true);
  };

  const handleToggleActive = async (promotion: Promotion) => {
    try {
      await api.put(
        `/admin/promotions/${promotion.id}`,
        { active: !promotion.active },
        { headers: getAuthHeader() }
      );
      fetchPromotions();
    } catch (error: any) {
      toast({
        title: "No se pudo actualizar el estado",
        description: error.response?.data?.message || "Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      code: "",
      imageUrl: "",
      actionUrl: "",
      active: true,
    });
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
            <h1 className="text-4xl font-bold text-marzetti-text-primary">
              Gestion de Promociones
            </h1>
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
            Nueva promocion
          </Button>
        </div>

        {showForm && (
          <div className="bg-marzetti-card p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-marzetti-text-primary">
              {editingId ? "Editar promocion" : "Nueva promocion"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Titulo</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Descripcion
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Codigo</label>
                <input
                  type="text"
                  value={formData.code ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Opcional"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Estado
                </label>
                <select
                  value={formData.active ? "true" : "false"}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.value === "true" })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="true">Activa</option>
                  <option value="false">Inactiva</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  URL de imagen
                </label>
                <input
                  type="text"
                  value={formData.imageUrl ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Link del boton
                </label>
                <input
                  type="text"
                  value={formData.actionUrl ?? ""}
                  onChange={(e) =>
                    setFormData({ ...formData, actionUrl: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Ej: /turnos o https://tuurl.com"
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
          {promotions.map((promotion) => (
            <div
              key={promotion.id}
              className="bg-marzetti-card p-4 rounded-lg shadow-lg flex flex-col gap-3"
            >
              {promotion.imageUrl && (
                <img
                  src={promotion.imageUrl}
                  alt={promotion.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-marzetti-text-primary">
                  {promotion.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    promotion.active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {promotion.active ? "Activa" : "Inactiva"}
                </span>
              </div>
              <p className="text-sm text-marzetti-text-secondary line-clamp-3">
                {promotion.description}
              </p>
              {promotion.code && (
                <div className="flex items-center gap-2 text-marzetti-primary text-sm">
                  <Tag className="h-4 w-4" />
                  <span>Codigo: {promotion.code}</span>
                </div>
              )}
              <div className="flex gap-2 mt-auto">
                <Button onClick={() => handleEdit(promotion)} variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button
                  onClick={() => handleDelete(promotion.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
                <Button
                  onClick={() => handleToggleActive(promotion)}
                  variant="outline"
                  size="sm"
                >
                  {promotion.active ? "Pausar" : "Activar"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPromotions;
