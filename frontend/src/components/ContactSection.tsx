import React from "react";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react"; // Changed Whatsapp to MessageSquare
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactSection: React.FC = () => {
  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-marzetti-text-primary">Contacto</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-marzetti-text-primary">Encontranos</h3>
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-lg text-marzetti-text-primary">
              <Phone className="h-6 w-6 mr-3 text-marzetti-primary transition-transform duration-300 hover:scale-110" />
              <a href="tel:+5492612692207" className="hover:text-marzetti-primary transition-all duration-300 hover:underline">+54 9 261 2692207</a>
            </div>
            <div className="flex items-center text-lg text-marzetti-text-primary">
              <MapPin className="h-6 w-6 mr-3 text-marzetti-primary" />
              Santiago Araujo 637, Villa Nueva, Mendoza
            </div>
            <div className="flex items-center text-lg text-marzetti-text-primary">
              <Mail className="h-6 w-6 mr-3 text-marzetti-primary transition-transform duration-300 hover:scale-110" />
              <a href="mailto:cmarzettisegatore@gmail.com" className="hover:text-marzetti-primary transition-all duration-300 hover:underline">cmarzettisegatore@gmail.com</a> {/* Placeholder email */}
            </div>
          </div>

          <a
            href="https://wa.me/5492612692207?text=Hola!%20Quisiera%20consultar%20por%20un%20turno."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 rounded-full transition-colors mb-8"
          >
            <MessageSquare className="h-6 w-6 mr-3" /> {/* Changed Whatsapp to MessageSquare */}
            Enviar WhatsApp
          </a>

          {/* Map */}
          <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.8700000000003!2d-68.80000000000001!3d-32.88888888888889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e091f00000001%3A0x0000000000000000!2sSantiago%20Araujo%20637%2C%20Villa%20Nueva%2C%20Mendoza!5e0!3m2!1sen!2sar!4v1678912345678!5m2!1sen!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Peluqueria Marzetti"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-marzetti-text-primary">Envíanos un mensaje</h3>
          <form className="space-y-6 bg-marzetti-card p-8 rounded-lg shadow-lg">
            <div>
              <Label htmlFor="name" className="text-marzetti-text-primary">Nombre</Label>
              <Input id="name" type="text" placeholder="Tu nombre" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="text-marzetti-text-primary">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="message" className="text-marzetti-text-primary">Mensaje</Label>
              <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} className="mt-1" />
            </div>
            <Button type="submit" className="w-full bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary hover:text-white text-lg py-3 transition-all duration-300">
              Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;