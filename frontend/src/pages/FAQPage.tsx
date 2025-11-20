import React from "react";
import PageTemplate from "@/components/PageTemplate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto dura un alisado?",
    answer: "La duración de un alisado varía entre 2 y 4 meses, dependiendo del tipo de cabello, los productos utilizados y los cuidados post-tratamiento. Te recomendamos usar productos sin sulfatos para prolongar su efecto.",
  },
  {
    question: "¿Trabajan con productos veganos?",
    answer: "Sí, en Peluquería Marzetti nos preocupamos por el bienestar animal y el medio ambiente. Contamos con una selección de líneas de productos 100% veganos y cruelty-free. Consulta con tu estilista para conocer las opciones disponibles.",
  },
  {
    question: "¿Hacen envíos de productos?",
    answer: "Actualmente, ofrecemos retiro en salón para todos los productos comprados online. Estamos trabajando para implementar envíos a domicilio en [ZONAS_DE_ENVÍO] próximamente. ¡Mantente atento a nuestras novedades!",
  },
  {
    question: "¿Cuál es su política de cancelación de turnos?",
    answer: "Para cancelar o modificar un turno, te pedimos que nos avises con al menos 24 horas de anticipación. Esto nos permite reorganizar nuestra agenda y ofrecer el horario a otros clientes. Las cancelaciones con menos de 24 horas de aviso pueden incurrir en un cargo.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos efectivo, tarjetas de débito y crédito (Visa, Mastercard, American Express) y pagos a través de Mercado Pago. Consulta por nuestras opciones de cuotas sin interés en el salón.",
  },
];

const FAQPage: React.FC = () => {
  return (
    <PageTemplate title="Preguntas Frecuentes">
      <p className="mb-8 max-w-2xl mx-auto text-center">
        Encuentra respuestas a las preguntas más comunes sobre nuestros servicios, productos y políticas.
      </p>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-marzetti-text-primary hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-marzetti-text-secondary text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PageTemplate>
  );
};

export default FAQPage;