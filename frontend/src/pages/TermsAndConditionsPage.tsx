import React from "react";
import PageTemplate from "@/components/PageTemplate";

const TermsAndConditionsPage: React.FC = () => {
  return (
    <PageTemplate title="Términos y Condiciones">
      <div className="prose prose-lg max-w-3xl mx-auto text-marzetti-text-primary">
        <p>
          Bienvenido a Peluquería Marzetti. Al acceder y utilizar nuestro sitio web y servicios,
          aceptas cumplir con los siguientes términos y condiciones. Por favor, léelos atentamente.
        </p>
        <h2>1. Uso del Sitio Web</h2>
        <p>
          Este sitio web está destinado a proporcionar información sobre nuestros servicios de peluquería
          y productos capilares, así como para facilitar la reserva de turnos y la compra de productos.
          No debes utilizar este sitio para fines ilegales o no autorizados.
        </p>
        <h2>2. Reservas de Turnos</h2>
        <p>
          Todas las reservas de turnos están sujetas a disponibilidad. Te pedimos que llegues a tiempo
          para tu cita. Las cancelaciones o modificaciones deben realizarse con al menos 24 horas de
          anticipación. Consulta nuestra política de cancelación para más detalles.
        </p>
        <h2>3. Compras de Productos</h2>
        <p>
          Los precios de los productos están indicados en pesos argentinos (ARS) e incluyen impuestos.
          Nos reservamos el derecho de modificar los precios en cualquier momento. Las compras realizadas
          a través del sitio web están sujetas a nuestra política de devoluciones.
        </p>
        <h2>4. Propiedad Intelectual</h2>
        <p>
          Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y software,
          es propiedad de Peluquería Marzetti o de sus proveedores de contenido y está protegido por leyes
          de propiedad intelectual.
        </p>
        <h2>5. Limitación de Responsabilidad</h2>
        <p>
          Peluquería Marzetti no será responsable por daños directos, indirectos, incidentales, consecuentes
          o punitivos que resulten del uso o la imposibilidad de usar este sitio web o nuestros servicios.
        </p>
        <h2>6. Ley Aplicable</h2>
        <p>
          Estos términos y condiciones se rigen por las leyes de Argentina. Cualquier disputa que surja
          en relación con estos términos será sometida a la jurisdicción exclusiva de los tribunales de Mendoza, Argentina.
        </p>
        <p className="text-sm text-marzetti-text-secondary mt-8">
          Última actualización: 26 de Julio de 2024.
        </p>
      </div>
    </PageTemplate>
  );
};

export default TermsAndConditionsPage;