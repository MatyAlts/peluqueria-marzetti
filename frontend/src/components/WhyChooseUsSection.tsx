import React from "react";
import { CheckCircle, Award, ShieldCheck, CalendarCheck, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  { icon: Award, text: "Profesionales certificados" },
  { icon: ShieldCheck, text: "Productos cruelty-free" },
  { icon: CalendarCheck, text: "Turnos online" },
  { icon: Star, text: "Garantía de satisfacción" },
  { icon: MapPin, text: "Ubicación céntrica" },
];

const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="container mx-auto py-16 px-4 bg-marzetti-background-light">
      <h2 className="text-4xl font-bold text-center mb-12 text-marzetti-text-primary">Tu cabello en manos expertas</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Benefits List */}
        <div className="space-y-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-4">
              <CheckCircle className="h-8 w-8 text-marzetti-primary" />
              <p className="text-xl text-marzetti-text-primary">{benefit.text}</p>
            </div>
          ))}
        </div>

        {/* Featured Card */}
        <Card className="bg-marzetti-highlight-background text-white p-8 rounded-lg shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1596465683128-f83dd29f717c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Asesoría personalizada"
            className="w-full h-64 object-cover rounded-md mb-6"
          />
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-3xl font-bold text-marzetti-primary">Asesoría Personalizada</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <CardDescription className="text-gray-300 text-lg">
              En Peluquería Marzetti, cada cliente es único. Te ofrecemos un diagnóstico capilar completo y una asesoría personalizada para encontrar el estilo y los tratamientos que mejor se adapten a vos y a las últimas tendencias.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;