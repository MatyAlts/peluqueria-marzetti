import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/ServicesPage";
import CatalogPage from "./pages/CatalogPage";
import PromotionsPage from "./pages/PromotionsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import ReturnsPolicyPage from "./pages/ReturnsPolicyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCategories from "./pages/admin/AdminCategories";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import CheckoutPendingPage from "./pages/CheckoutPendingPage";
import CheckoutFailurePage from "./pages/CheckoutFailurePage";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<ServicesPage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/catalogo/:id" element={<ProductDetailPage />} />
              <Route path="/carrito" element={<CartPage />} />
              <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
              <Route path="/checkout/pending" element={<CheckoutPendingPage />} />
              <Route path="/checkout/failure" element={<CheckoutFailurePage />} />
              <Route path="/promociones" element={<PromotionsPage />} />
              <Route path="/turnos" element={<AppointmentsPage />} />
              <Route path="/testimonios" element={<TestimonialsPage />} />
              <Route path="/nosotros" element={<AboutUsPage />} />
              <Route path="/contacto" element={<ContactPage />} />
              <Route path="/preguntas-frecuentes" element={<FAQPage />} />
              <Route path="/politica-privacidad" element={<PrivacyPolicyPage />} />
              <Route path="/terminos-condiciones" element={<TermsAndConditionsPage />} />
              <Route path="/devoluciones" element={<ReturnsPolicyPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/productos" element={<AdminProducts />} />
              <Route path="/admin/categorias" element={<AdminCategories />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;