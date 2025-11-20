import React from "react";
import PageTemplate from "@/components/PageTemplate";
import ContactSection from "@/components/ContactSection"; // Reusing the section for now

const ContactPage: React.FC = () => {
  return (
    <PageTemplate title="Contáctanos">
      <p className="mb-8">Estamos aquí para responder tus preguntas y ayudarte a agendar tu próxima visita.</p>
      <ContactSection /> {/* Reusing the existing section for now */}
    </PageTemplate>
  );
};

export default ContactPage;