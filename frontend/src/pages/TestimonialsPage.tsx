import React from "react";
import PageTemplate from "@/components/PageTemplate";
import TestimonialsSection from "@/components/TestimonialsSection"; // Reusing the section for now

const TestimonialsPage: React.FC = () => {
  return (
    <PageTemplate title="Testimonios de Clientes">
      <p className="mb-8">Descubre lo que nuestros clientes satisfechos tienen para decir sobre su experiencia en Peluquería Marzetti.</p>
      <TestimonialsSection /> {/* Reusing the existing section for now */}
      {/* Future: Add more testimonials, filter by service, add a form to submit new testimonials */}
    </PageTemplate>
  );
};

export default TestimonialsPage;