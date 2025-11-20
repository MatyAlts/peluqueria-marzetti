import React, { useEffect, useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { promotionApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface Promotion {
  id: number;
  title: string;
  description: string;
  code?: string;
  imageUrl?: string;
  actionUrl?: string;
}

const PromotionsPage: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await promotionApi.getActive();
        setPromotions(response.data);
      } catch (error) {
        toast({
          title: "No pudimos cargar las promos",
          description: "Intenta nuevamente en unos minutos.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [toast]);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Codigo copiado",
        description: code,
      });
    } catch (error) {
      toast({
        title: "No se pudo copiar",
        description: "Copialo manualmente, por favor.",
        variant: "destructive",
      });
    }
  };

  const renderContent = () => {
    if (loading) {
      return <p className="text-marzetti-text-secondary">Cargando promociones...</p>;
    }

    if (promotions.length === 0) {
      return (
        <div className="rounded-lg border border-dashed border-marzetti-primary/50 bg-marzetti-card p-8 text-center">
          <p className="text-lg text-marzetti-text-secondary">
            Aun no hay promociones activas. Vuelve pronto.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo) => (
          <Card
            key={promo.id}
            className="bg-marzetti-card shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group"
          >
            {promo.imageUrl && (
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-marzetti-text-primary">
                {promo.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-marzetti-text-secondary mb-4">{promo.description}</p>
              {promo.code && (
                <div className="flex items-center justify-between bg-marzetti-background-light p-3 rounded-md border border-marzetti-primary">
                  <span className="text-marzetti-text-primary font-medium flex items-center gap-2">
                    <Tag className="h-4 w-4 text-marzetti-primary" /> Codigo: {promo.code}
                  </span>
                  <Button
                    variant="ghost"
                    className="text-marzetti-primary hover:bg-marzetti-primary hover:text-marzetti-secondary transition-all duration-300"
                    onClick={() => handleCopy(promo.code!)}
                  >
                    Copiar
                  </Button>
                </div>
              )}
              <Button
                className="w-full mt-4 bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary hover:text-white transition-all duration-300"
                disabled={!promo.actionUrl}
                asChild={Boolean(promo.actionUrl)}
              >
                {promo.actionUrl ? (
                  <a href={promo.actionUrl} target="_self" rel="noreferrer">
                    Reservar / Comprar
                  </a>
                ) : (
                  <>Reservar / Comprar</>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <PageTemplate title="Promociones Exclusivas">
      <p className="mb-8">Aprovecha nuestras ofertas especiales en servicios y productos.</p>
      {renderContent()}
    </PageTemplate>
  );
};

export default PromotionsPage;
