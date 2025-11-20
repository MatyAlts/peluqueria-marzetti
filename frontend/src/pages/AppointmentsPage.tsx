import React from "react";
import PageTemplate from "@/components/PageTemplate";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare } from "lucide-react"; // Changed Whatsapp to MessageSquare
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AppointmentsPage: React.FC = () => {
  return (
    <PageTemplate title="Reservar Turno">
      <p className="mb-12 max-w-2xl mx-auto text-center">
        Agenda tu cita de forma rápida y sencilla. Elige el servicio, la fecha y la hora que mejor se adapte a tu agenda.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="bg-marzetti-card shadow-lg rounded-lg p-6 text-center">
          <CardHeader>
            <Calendar className="h-16 w-16 text-marzetti-primary mx-auto mb-4 transition-transform duration-300 hover:animate-bounce-subtle" />
            <CardTitle className="text-2xl font-semibold text-marzetti-text-primary">Reserva Online</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-marzetti-text-secondary mb-6">
              Utiliza nuestro sistema de reservas online para seleccionar tu servicio y horario preferido.
            </p>
            <Button className="w-full bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary hover:text-white text-lg py-3 transition-all duration-300">
              <Calendar className="mr-2 h-5 w-5" />
              Ir al Sistema de Reservas
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-marzetti-card shadow-lg rounded-lg p-6 text-center">
          <CardHeader>
            <MessageSquare className="h-16 w-16 text-green-500 mx-auto mb-4" /> {/* Changed Whatsapp to MessageSquare */}
            <CardTitle className="text-2xl font-semibold text-marzetti-text-primary">Reservar por WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-marzetti-text-secondary mb-6">
              ¿Prefieres una atención más personalizada? Envíanos un mensaje y te ayudaremos a agendar.
            </p>
            <a
              href="https://wa.me/5492612692207?text=Hola!%20Quisiera%20consultar%20por%20un%20turno."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3 rounded-full transition-colors"
            >
              <MessageSquare className="mr-2 h-5 w-5" /> {/* Changed Whatsapp to MessageSquare */}
              Enviar WhatsApp
            </a>
          </CardContent>
        </Card>
      </div>
      <p className="text-sm text-gray-500 mt-12 text-center">
        *Recordá nuestras políticas de cancelación y tolerancia. Te pedimos llegar 5 minutos antes de tu turno.
      </p>
    </PageTemplate>
  );
};

export default AppointmentsPage;