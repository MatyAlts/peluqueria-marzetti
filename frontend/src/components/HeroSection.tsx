import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center text-center p-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1597347343908-50a7dc97d518?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="absolute inset-0 bg-marzetti-secondary opacity-60 transition-opacity duration-500"></div>
      <div className="relative z-10 text-white max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight animate-slide-up">
          Cortes y color que hablan por vos
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Peluquería profesional con productos de alta gama. Reservá tu turno y llevate a casa el cuidado que tu cabello merece.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button
            onClick={() => navigate('/turnos')}
            className="bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary hover:text-white text-lg px-8 py-6 rounded-full transition-all duration-300"
          >
            Reservar Turno
          </Button>
          <Button
            onClick={() => navigate('/catalogo')}
            variant="outline"
            className="border-2 border-marzetti-secondary bg-white text-marzetti-secondary hover:bg-marzetti-secondary hover:text-white text-lg px-8 py-6 rounded-full transition-all duration-300"
          >
            Ver Catálogo
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-3 animate-scale-in" style={{ animationDelay: "0.6s" }}>
          <Badge variant="secondary" className="bg-marzetti-primary text-marzetti-secondary px-4 py-2 text-base hover:bg-marzetti-primary-hover transition-all duration-300 hover:scale-110">Colorimetría experta</Badge>
          <Badge variant="secondary" className="bg-marzetti-primary text-marzetti-secondary px-4 py-2 text-base hover:bg-marzetti-primary-hover transition-all duration-300 hover:scale-110" style={{ animationDelay: "0.7s" }}>Tratamientos veganos</Badge>
          <Badge variant="secondary" className="bg-marzetti-primary text-marzetti-secondary px-4 py-2 text-base hover:bg-marzetti-primary-hover transition-all duration-300 hover:scale-110" style={{ animationDelay: "0.8s" }}>Productos profesionales</Badge>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;