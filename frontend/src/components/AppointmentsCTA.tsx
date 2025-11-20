import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const AppointmentsCTA: React.FC = () => {
  return (
    <section className="bg-marzetti-secondary py-16 px-4 text-white text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6">Reservá tu turno online</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Elegí el servicio, la fecha y la hora que mejor se adapte a vos. ¡Te esperamos!
        </p>
        <Button className="bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary hover:text-white text-lg px-10 py-7 rounded-full animate-pulse-glow transition-all duration-300">
          <Calendar className="mr-3 h-5 w-5 animate-bounce-subtle" />
          Reservar Turno Ahora
        </Button>
        <p className="text-sm text-gray-400 mt-6">
          *Recordá nuestras políticas de cancelación y tolerancia.
        </p>
      </div>
    </section>
  );
};

export default AppointmentsCTA;