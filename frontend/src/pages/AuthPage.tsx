import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const AuthPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegister) {
        await auth.register(username, email, password);
        toast({ title: "Cuenta creada", description: "Te iniciamos sesión automáticamente." });
      } else {
        await auth.login(username, password);
        toast({ title: "Sesión iniciada", description: `Bienvenido, ${username}` });
      }
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Oops",
        description: error.response?.data || "No pudimos procesar tu solicitud",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marzetti-primary/10 to-marzetti-secondary/20 px-4">
      <Card className="w-full max-w-lg shadow-xl bg-marzetti-card">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-marzetti-text-primary">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </CardTitle>
          <p className="text-center text-marzetti-text-secondary">
            Acceso para clientes. Los admins siguen usando su login dedicado.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-marzetti-text-primary mb-1">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-marzetti-primary"
                required
              />
            </div>
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-marzetti-text-primary mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-marzetti-primary"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-marzetti-text-primary mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-marzetti-primary"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary"
            >
              {loading ? "Procesando..." : isRegister ? "Registrarme" : "Ingresar"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-marzetti-text-secondary">
            {isRegister ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}{" "}
            <button
              type="button"
              className="text-marzetti-primary font-semibold"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Inicia sesión" : "Crear cuenta"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
