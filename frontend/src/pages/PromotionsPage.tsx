import React from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

const promotions = [
  {
    title: "20% OFF en tu primer corte",
    description: "Válido para nuevos clientes en cualquier servicio de corte.",
    code: "PRIMERCORTE20",
    imageUrl: "https://images.unsplash.com/photo-1597347343908-50a7dc97d518?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Combo Color + Tratamiento",
    description: "Disfruta de un servicio de colorimetría y un tratamiento capilar profundo con un 15% de descuento.",
    code: "COLORCARE15",
    imageUrl: "https://images.unsplash.com/photo-1596465683128-f83dd29f717c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Productos seleccionados al 3x2",
    description: "Lleva 3 productos de marcas seleccionadas y paga solo 2. ¡El de menor valor es gratis!",
    code: "PROMO3X2",
    imageUrl: "https://images.unsplash.com/photo-1626094020000-111499777780?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const PromotionsPage: React.FC = () => {
  return (
    <PageTemplate title="Promociones Exclusivas">
      <p className="mb-8">Aprovecha nuestras ofertas especiales en servicios y productos.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo, index) => (
          <Card key={index} className="bg-marzetti-card shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group">
            <img src={promo.imageUrl} alt={promo.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-marzetti-text-primary">{promo.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-marzetti-text-secondary mb-4">{promo.description}</p>
              {promo.code && (
                <div className="flex items-center justify-between bg-marzetti-background-light p-3 rounded-md border border-marzetti-primary">
                  <span className="text-marzetti-text-primary font-medium flex items-center">
                    <Tag className="h-4 w-4 mr-2 text-marzetti-primary" /> Código: {promo.code}
                  </span>
                  <Button variant="ghost" className="text-marzetti-primary hover:bg-marzetti-primary hover:text-marzetti-secondary transition-all duration-300">
                    Copiar
                  </Button>
                </div>
              )}
              <Button className="w-full mt-4 bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary hover:text-white transition-all duration-300">
                Reservar / Comprar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTemplate>
  );
};

export default PromotionsPage;