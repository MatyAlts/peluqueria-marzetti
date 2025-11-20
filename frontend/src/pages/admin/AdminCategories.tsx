import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import api from '@/services/api';

interface Category {
    id: number;
    name: string;
    description: string;
}

const AdminCategories: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });
    const navigate = useNavigate();
    const { toast } = useToast();

    const getAuthHeader = () => {
        const token = localStorage.getItem('adminToken');
        return { Authorization: `Bearer ${token}` };
    };

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'No se pudieron cargar las categorías',
                variant: 'destructive'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/admin/categories/${editingId}`, formData, {
                    headers: getAuthHeader()
                });
                toast({ title: 'Categoría actualizada correctamente' });
            } else {
                await api.post('/admin/categories', formData, {
                    headers: getAuthHeader()
                });
                toast({ title: 'Categoría creada correctamente' });
            }
            setShowForm(false);
            setEditingId(null);
            fetchCategories();
            resetForm();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'No se pudo guardar la categoría',
                variant: 'destructive'
            });
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar esta categoría? Esta acción fallará si hay productos asociados.')) return;
        try {
            await api.delete(`/admin/categories/${id}`, {
                headers: getAuthHeader()
            });
            toast({ title: 'Categoría eliminada' });
            fetchCategories();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'No se pudo eliminar la categoría. Puede que tenga productos asociados.',
                variant: 'destructive'
            });
        }
    };

    const handleEdit = (category: Category) => {
        setEditingId(category.id);
        setFormData({
            name: category.name,
            description: category.description,
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
        });
    };

    if (loading) return <div className="p-8">Cargando...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-marzetti-primary/10 to-marzetti-secondary/10 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Button onClick={() => navigate('/admin')} variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Button>
                        <h1 className="text-4xl font-bold text-marzetti-text-primary">
                            Gestión de Categorías
                        </h1>
                    </div>
                    <Button
                        onClick={() => { setShowForm(true); setEditingId(null); resetForm(); }}
                        className="bg-marzetti-primary hover:bg-marzetti-primary-hover"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Nueva Categoría
                    </Button>
                </div>

                {showForm && (
                    <div className="bg-marzetti-card p-6 rounded-lg shadow-lg mb-8">
                        <h2 className="text-2xl font-bold mb-4 text-marzetti-text-primary">
                            {editingId ? 'Editar Categoría' : 'Nueva Categoría'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Descripción</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    rows={3}
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button type="submit" className="bg-marzetti-primary">
                                    {editingId ? 'Actualizar' : 'Crear'}
                                </Button>
                                <Button onClick={() => { setShowForm(false); resetForm(); }} variant="outline">
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="space-y-4">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-marzetti-card p-6 rounded-lg shadow-lg flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-marzetti-text-primary">{category.name}</h3>
                                <p className="text-marzetti-text-secondary mt-1">{category.description || 'Sin descripción'}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={() => handleEdit(category)} variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-1" />
                                    Editar
                                </Button>
                                <Button onClick={() => handleDelete(category.id)} variant="outline" size="sm" className="text-red-500">
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
