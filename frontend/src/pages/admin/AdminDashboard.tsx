import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, FolderTree, LogOut, ShoppingBag, Tag } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const adminUser = localStorage.getItem("adminUser");

  return (
    <div className="min-h-screen bg-gradient-to-br from-marzetti-primary/10 to-marzetti-secondary/10 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-marzetti-text-primary">
              Panel de Administracion
            </h1>
            <p className="text-marzetti-text-secondary mt-2">Bienvenido, {adminUser}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Cerrar Sesion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/ventas">
            <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-marzetti-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-marzetti-text-primary">
                  <ShoppingBag className="h-8 w-8 text-marzetti-primary" />
                  CRM de Ventas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-marzetti-text-secondary">Ver y gestionar todas las ventas realizadas</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/productos">
            <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-marzetti-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-marzetti-text-primary">
                  <Package className="h-8 w-8 text-marzetti-primary" />
                  Gestion de Productos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-marzetti-text-secondary">
                  Agregar, editar y eliminar productos del catalogo
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/categorias">
            <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-marzetti-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-marzetti-text-primary">
                  <FolderTree className="h-8 w-8 text-marzetti-primary" />
                  Gestion de Categorias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-marzetti-text-secondary">Administrar categorias de productos</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/promociones">
            <Card className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-marzetti-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-marzetti-text-primary">
                  <Tag className="h-8 w-8 text-marzetti-primary" />
                  Gestion de Promociones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-marzetti-text-secondary">
                  Crear, editar, pausar o eliminar promos activas en el sitio
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="mt-8">
          <Button onClick={() => navigate("/")} variant="outline">
            <- Volver al sitio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
