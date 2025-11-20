import React from "react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CatalogPreviewSection from "@/components/CatalogPreviewSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AppointmentsCTA from "@/components/AppointmentsCTA";
import ContactSection from "@/components/ContactSection";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CatalogPreviewSection />
      <TestimonialsSection />
      <AppointmentsCTA />
      <ContactSection />
    </>
  );
};

export default Home;