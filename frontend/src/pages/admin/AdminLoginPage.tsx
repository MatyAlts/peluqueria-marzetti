import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const AdminLoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await authApi.login(username, password);
            localStorage.setItem('adminToken', response.data.token);
            localStorage.setItem('adminUser', response.data.username);
            toast({
                title: 'Inicio de sesión exitoso',
                description: `Bienvenido, ${response.data.username}`,
            });
            navigate('/admin');
        } catch (error: any) {
            toast({
                title: 'Error de autenticación',
                description: error.response?.data || 'Usuario o contraseña incorrectos',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-marzetti-primary/20 to-marzetti-secondary/20">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-marzetti-text-primary">
                        Admin Panel
                    </CardTitle>
                    <p className="text-center text-marzetti-text-secondary">
                        Peluquería Marzetti
                    </p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-marzetti-text-primary mb-1">
                                Usuario
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-marzetti-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-marzetti-text-primary mb-1">
                                Contraseña
                            </label>
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
                            className="w-full bg-marzetti-primary hover:bg-marzetti-primary-hover text-marzetti-secondary">
                            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>
                        <p className="text-sm text-center text-marzetti-text-secondary mt-4">
                            Usuario por defecto: admin / admin123
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLoginPage;
