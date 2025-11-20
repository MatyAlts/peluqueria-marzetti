import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sofía G.",
    service: "Color & Mechas",
    comment: "¡Increíble el cambio de look! El color quedó justo como lo quería y el trato fue excelente. Súper recomendados.",
    avatar: "/user.svg",
  },
  {
    name: "Martín R.",
    service: "Corte & Barbería",
    comment: "Siempre salgo impecable. El corte es preciso y el perfilado de barba, perfecto. Un ambiente muy profesional.",
    avatar: "/user.svg",
  },
  {
    name: "Valentina P.",
    service: "Tratamiento Capilar",
    comment: "Mi cabello está mucho más sano y brillante después del tratamiento. ¡Se nota la calidad de los productos y la atención!",
    avatar: "/user.svg",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="container mx-auto py-16 px-4 bg-marzetti-background-light">
      <h2 className="text-4xl font-bold text-center mb-12 text-marzetti-text-primary">Lo que dicen nuestras clientas y clientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-marzetti-card shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardContent className="p-0">
              <p className="text-lg italic text-marzetti-text-primary mb-4">"{testimonial.comment}"</p>
              <p className="font-semibold text-marzetti-primary">{testimonial.name}</p>
              <p className="text-sm text-marzetti-text-secondary">{testimonial.service}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;