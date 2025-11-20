import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin, Clock } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-marzetti-secondary text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <p className="flex items-center mb-2">
            <Phone className="h-4 w-4 mr-2 text-marzetti-primary" />
            <a href="tel:+5492612692207" className="hover:text-marzetti-primary transition-colors">+54 9 261 2692207</a>
          </p>
          <p className="flex items-start mb-2">
            <MapPin className="h-4 w-4 mr-2 text-marzetti-primary mt-1" />
            Santiago Araujo 637, Villa Nueva, Mendoza
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li><Link to="/servicios" className="hover:text-marzetti-primary transition-colors">Servicios</Link></li>
            <li><Link to="/catalogo" className="hover:text-marzetti-primary transition-colors">Catálogo</Link></li>
            <li><Link to="/turnos" className="hover:text-marzetti-primary transition-colors">Turnos</Link></li>
            <li><Link to="/preguntas-frecuentes" className="hover:text-marzetti-primary transition-colors">Preguntas Frecuentes</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/cristianmarzettieventos" target="_blank" rel="noopener noreferrer" className="hover:text-marzetti-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-marzetti-primary transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            {/* Add TikTok if available */}
          </div>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Horarios</h3>
          <p className="flex items-center mb-2">
            <Clock className="h-4 w-4 mr-2 text-marzetti-primary" />
            Lunes a Sábados: 9:00 a 20:00 hs
          </p>
          <ul className="space-y-2 mt-4 text-sm text-gray-400">
            <li><Link to="/politica-privacidad" className="hover:text-marzetti-primary transition-colors">Política de Privacidad</Link></li>
            <li><Link to="/terminos-condiciones" className="hover:text-marzetti-primary transition-colors">Términos y Condiciones</Link></li>
            <li><Link to="/devoluciones" className="hover:text-marzetti-primary transition-colors">Política de Devoluciones</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto text-center text-sm text-gray-400 mt-8 pt-4 border-t border-gray-700">
        &copy; {new Date().getFullYear()} Peluqueria Marzetti. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;