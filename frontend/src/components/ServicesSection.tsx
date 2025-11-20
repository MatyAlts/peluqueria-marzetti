import React from "react";
import { Scissors, Brush, Sparkles, Droplet, HeartHandshake, UserRound } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Scissors,
    title: "Corte & Brushing",
    description: "Estilo a tu medida, con acabado pulido. Desde $15.000",
  },
  {
    icon: Brush,
    title: "Color & Mechas",
    description: "Técnicas modernas: balayage, babylights, gloss. Desde $30.000",
  },
  {
    icon: Sparkles,
    title: "Alisado & Botox",
    description: "Cabello más suave, brillante y sin frizz. Desde $40.000",
  },
  {
    icon: Droplet,
    title: "Tratamientos",
    description: "Nutrición profunda y reconstrucción capilar. Desde $20.000",
  },
  {
    icon: HeartHandshake,
    title: "Peinados & Eventos",
    description: "Looks que duran toda la noche. Desde $25.000",
  },
  {
    icon: UserRound,
    title: "Barbería",
    description: "Afeitado clásico y perfilado de barba. Desde $12.000",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-marzetti-text-primary">Nuestros Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col items-center text-center p-6 bg-marzetti-card shadow-lg rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 group">
            <CardHeader className="pb-4">
              <service.icon className="h-12 w-12 text-marzetti-primary mb-4 transition-transform duration-300 group-hover:animate-bounce-subtle" />
              <CardTitle className="text-2xl font-semibold text-marzetti-text-primary">{service.title}</CardTitle>
            </CardHeader>
            <CardDescription className="text-marzetti-text-secondary mb-4 flex-grow">
              {service.description}
            </CardDescription>
          </Card>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-12">
        <Button className="bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary hover:text-white text-lg px-8 py-6 rounded-full transition-all duration-300">
          Ver Detalle de Servicios
        </Button>
        <Button variant="outline" className="border-2 border-marzetti-primary text-marzetti-primary hover:bg-marzetti-primary hover:text-marzetti-secondary text-lg px-8 py-6 rounded-full transition-all duration-300">
          Solicitar Presupuesto
        </Button>
      </div>
    </section>
  );
};

export default ServicesSection;