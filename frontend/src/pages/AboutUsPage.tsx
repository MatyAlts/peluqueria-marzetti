import React from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Sparkles, Heart } from "lucide-react";

const AboutUsPage: React.FC = () => {
  return (
    <PageTemplate title="Sobre Nosotros">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-xl text-marzetti-text-primary mb-6">
          En Peluquería Marzetti, transformamos tu estilo y cuidamos la salud de tu cabello con pasión y profesionalismo.
          Somos un equipo de estilistas dedicados a ofrecerte una experiencia única y personalizada.
        </p>
        <p className="text-marzetti-text-secondary">
          Con años de experiencia y una constante actualización en las últimas tendencias y técnicas,
          garantizamos resultados que superan tus expectativas. Utilizamos solo productos de alta gama,
          muchos de ellos cruelty-free y veganos, para asegurar el mejor cuidado para ti y el medio ambiente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <Card className="bg-marzetti-card shadow-lg rounded-lg p-6 text-center">
          <CardHeader>
            <Users className="h-12 w-12 text-marzetti-primary mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold text-marzetti-text-primary">Nuestro Equipo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-marzetti-text-secondary">
              Un grupo de profesionales apasionados, siempre listos para asesorarte y crear el look perfecto para vos.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-marzetti-card shadow-lg rounded-lg p-6 text-center">
          <CardHeader>
            <Sparkles className="h-12 w-12 text-marzetti-primary mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold text-marzetti-text-primary">Nuestra Filosofía</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-marzetti-text-secondary">
              Innovación, calidad y cuidado personalizado son los pilares que nos definen en cada servicio.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-marzetti-card shadow-lg rounded-lg p-6 text-center">
          <CardHeader>
            <Heart className="h-12 w-12 text-marzetti-primary mx-auto mb-4" />
            <CardTitle className="text-xl font-semibold text-marzetti-text-primary">Compromiso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-marzetti-text-secondary">
              Comprometidos con tu satisfacción y con prácticas sostenibles en la industria de la belleza.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default AboutUsPage;