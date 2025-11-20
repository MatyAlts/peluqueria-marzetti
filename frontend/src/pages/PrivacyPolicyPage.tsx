import React from "react";
import PageTemplate from "@/components/PageTemplate";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageTemplate title="Política de Privacidad">
      <div className="prose prose-lg max-w-3xl mx-auto text-marzetti-text-primary">
        <p>
          En Peluquería Marzetti, valoramos tu privacidad y nos comprometemos a proteger tu información personal.
          Esta política de privacidad describe cómo recopilamos, usamos y protegemos tus datos cuando utilizas
          nuestros servicios y visitas nuestro sitio web.
        </p>
        <h2>1. Información que Recopilamos</h2>
        <p>
          Recopilamos información que nos proporcionas directamente, como tu nombre, dirección de correo electrónico,
          número de teléfono y detalles de los servicios que solicitas al reservar un turno o realizar una compra.
          También podemos recopilar datos de uso del sitio web a través de cookies y tecnologías similares.
        </p>
        <h2>2. Uso de la Información</h2>
        <p>
          Utilizamos tu información para:
        </p>
        <ul>
          <li>Procesar tus reservas y compras.</li>
          <li>Comunicarnos contigo sobre tus citas y pedidos.</li>
          <li>Mejorar nuestros servicios y la experiencia en nuestro sitio web.</li>
          <li>Enviar comunicaciones de marketing (si has dado tu consentimiento).</li>
        </ul>
        <h2>3. Compartir Información</h2>
        <p>
          No vendemos ni alquilamos tu información personal a terceros. Podemos compartir tus datos con proveedores
          de servicios de confianza que nos ayudan a operar nuestro negocio (por ejemplo, plataformas de reserva,
          procesadores de pago), siempre bajo estrictos acuerdos de confidencialidad.
        </p>
        <h2>4. Tus Derechos</h2>
        <p>
          Tienes derecho a acceder, corregir o eliminar tu información personal. Si deseas ejercer estos derechos,
          por favor contáctanos a través de los datos proporcionados en nuestra sección de contacto.
        </p>
        <h2>5. Cambios en la Política de Privacidad</h2>
        <p>
          Podemos actualizar esta política de privacidad periódicamente. Te notificaremos sobre cualquier cambio
          publicando la nueva política en esta página.
        </p>
        <p className="text-sm text-marzetti-text-secondary mt-8">
          Última actualización: 26 de Julio de 2024.
        </p>
      </div>
    </PageTemplate>
  );
};

export default PrivacyPolicyPage;