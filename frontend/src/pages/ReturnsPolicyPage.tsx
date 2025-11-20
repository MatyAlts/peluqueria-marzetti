import React from "react";
import PageTemplate from "@/components/PageTemplate";

const ReturnsPolicyPage: React.FC = () => {
  return (
    <PageTemplate title="Política de Devoluciones">
      <div className="prose prose-lg max-w-3xl mx-auto text-marzetti-text-primary">
        <p>
          En Peluquería Marzetti, queremos que estés completamente satisfecho con tus compras.
          Si por alguna razón no lo estás, consulta nuestra política de devoluciones a continuación.
        </p>
        <h2>1. Productos de Peluquería</h2>
        <p>
          Aceptamos devoluciones de productos de peluquería sin abrir y en su empaque original
          dentro de los 7 días posteriores a la compra. Para iniciar una devolución, por favor
          presenta el comprobante de compra. No se aceptan devoluciones de productos que hayan
          sido abiertos, usados o dañados.
        </p>
        <h2>2. Servicios de Peluquería</h2>
        <p>
          Si no estás satisfecho con un servicio recibido, por favor contáctanos dentro de las
          48 horas posteriores a tu cita. Evaluaremos tu caso y buscaremos una solución, que
          puede incluir un ajuste o un servicio de corrección sin costo adicional. No se realizan
          reembolsos en efectivo por servicios ya prestados.
        </p>
        <h2>3. Productos Defectuosos</h2>
        <p>
          Si recibes un producto defectuoso, por favor contáctanos inmediatamente. Lo reemplazaremos
          o te ofreceremos un reembolso completo, una vez que hayamos verificado el defecto.
        </p>
        <h2>4. Proceso de Devolución</h2>
        <p>
          Para devolver un producto, por favor acércate a nuestro salón con el producto y el
          comprobante de compra. Nuestro personal te asistirá con el proceso. Los reembolsos
          se procesarán utilizando el mismo método de pago original, y pueden tardar entre 5 y 10 días hábiles en reflejarse.
        </p>
        <p className="text-sm text-marzetti-text-secondary mt-8">
          Última actualización: 26 de Julio de 2024.
        </p>
      </div>
    </PageTemplate>
  );
};

export default ReturnsPolicyPage;