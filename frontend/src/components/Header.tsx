import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCart();
  const auth = useAuth();
  const hasAdminToken = Boolean(localStorage.getItem("adminToken")) || auth.role === "ADMIN";

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/servicios" },
    { name: "Catálogo", path: "/catalogo" },
    { name: "Promociones", path: "/promociones" },
    { name: "Turnos", path: "/turnos" },
    { name: "Nosotros", path: "/nosotros" },
    { name: "Contacto", path: "/contacto" },
  ];

  const logout = () => {
    auth.logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const renderAuthButtons = (variant: "desktop" | "mobile") => (
    <div className={`flex items-center gap-3 ${variant === "mobile" ? "mt-3" : ""}`}>
      {hasAdminToken && (
        <Button asChild variant="outline" size="sm">
          <Link to="/admin">Admin</Link>
        </Button>
      )}
      {auth.token ? (
        <>
          <span className="text-sm text-white/80">
            Hola, <strong>{auth.username}</strong>
          </span>
          <Button variant="ghost" size="sm" className="text-white" onClick={logout}>
            Cerrar sesión
          </Button>
        </>
      ) : (
        <Button
          variant="secondary"
          size="sm"
          className="bg-white text-marzetti-primary hover:bg-marzetti-primary hover:text-white"
          asChild
        >
          <Link to="/cuenta">Ingresar / Crear cuenta</Link>
        </Button>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-marzetti-secondary shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-marzetti-primary animate-fadeIn hover:scale-105 transition-transform duration-300"
        >
          Peluquería Marzetti
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-lg transition-all duration-300 hover:text-marzetti-primary hover:scale-110 ${
                location.pathname === item.path
                  ? "text-marzetti-primary font-bold border-b-2 border-marzetti-primary"
                  : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/carrito"
            className="relative text-lg text-white hover:text-marzetti-primary transition-all duration-300 hover:scale-110"
          >
            <ShoppingCart className="h-6 w-6" />
            {cart && cart.itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-marzetti-primary text-marzetti-secondary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cart.itemCount}
              </span>
            )}
          </Link>
          {renderAuthButtons("desktop")}
        </nav>

        <button
          className="md:hidden text-white text-3xl transition-transform duration-300 hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-marzetti-secondary px-4 py-6 space-y-4 animate-slideDown border-t border-marzetti-primary/20">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block text-lg transition-colors duration-300 hover:text-marzetti-primary ${
                location.pathname === item.path ? "text-marzetti-primary font-bold" : "text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/carrito"
            className="flex items-center gap-2 text-lg text-white hover:text-marzetti-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingCart className="h-5 w-5" />
            Carrito {cart && cart.itemCount > 0 && `(${cart.itemCount})`}
          </Link>
          {renderAuthButtons("mobile")}
        </nav>
      )}
    </header>
  );
};

export default Header;
