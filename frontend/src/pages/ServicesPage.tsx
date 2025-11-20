import React from "react";
import PageTemplate from "@/components/PageTemplate";
import ServicesSection from "@/components/ServicesSection"; // Reusing the section for now

const ServicesPage: React.FC = () => {
  return (
    <PageTemplate title="Nuestros Servicios Detallados">
      <p className="mb-8">Explora todos los servicios que ofrecemos para el cuidado y estilo de tu cabello.</p>
      <ServicesSection /> {/* Reusing the existing section for now */}
      {/* Future: Add more detailed service descriptions, pricing, gallery */}
    </PageTemplate>
  );
};

export default ServicesPage;