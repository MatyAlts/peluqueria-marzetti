import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Search, Eye, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

interface OrderItem {
    id: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
}

interface Order {
    id: number;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    totalAmount: number;
    status: string;
    items: OrderItem[];
    createdAt: string;
}

const AdminOrders: React.FC = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchOrders();
    }, [navigate]);

    useEffect(() => {
        filterOrders();
    }, [orders, searchTerm, statusFilter]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get<Order[]>('/api/orders');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterOrders = () => {
        let filtered = [...orders];

        // Filter by status
        if (statusFilter !== 'ALL') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                order =>
                    order.orderNumber.toLowerCase().includes(term) ||
                    order.customerName.toLowerCase().includes(term) ||
                    order.customerEmail.toLowerCase().includes(term) ||
                    order.customerPhone.toLowerCase().includes(term)
            );
        }

        setFilteredOrders(filtered);
    };

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            PENDING: { label: 'Pendiente', variant: 'secondary' as const },
            PAID: { label: 'Pagado', variant: 'default' as const },
            CONFIRMED: { label: 'Confirmado', variant: 'default' as const },
            PROCESSING: { label: 'Procesando', variant: 'secondary' as const },
            SHIPPED: { label: 'Enviado', variant: 'secondary' as const },
            DELIVERED: { label: 'Entregado', variant: 'default' as const },
            CANCELLED: { label: 'Cancelado', variant: 'destructive' as const },
            REJECTED: { label: 'Rechazado', variant: 'destructive' as const },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'secondary' as const };
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(amount);
    };

    const calculateStats = () => {
        const paidOrders = orders.filter(o => o.status === 'PAID' || o.status === 'CONFIRMED' || o.status === 'PROCESSING' || o.status === 'SHIPPED' || o.status === 'DELIVERED');
        const totalRevenue = paidOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalOrders = orders.length;
        const totalProducts = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

        return { totalRevenue, totalOrders, totalProducts };
    };

    const stats = calculateStats();

    const viewOrderDetails = (order: Order) => {
        setSelectedOrder(order);
        setDialogOpen(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-marzetti-primary/10 to-marzetti-secondary/10 flex items-center justify-center">
                <div className="text-xl text-marzetti-text-primary">Cargando ventas...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-marzetti-primary/10 to-marzetti-secondary/10 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-6">
                    <Link to="/admin">
                        <Button variant="outline" size="icon" className="mr-4">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold text-marzetti-text-primary">
                            CRM de Ventas
                        </h1>
                        <p className="text-marzetti-text-secondary mt-2">
                            Gestiona y visualiza todas las ventas realizadas
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card className="bg-marzetti-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-marzetti-text-secondary">
                                Total Facturado
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-marzetti-text-primary">
                                {formatCurrency(stats.totalRevenue)}
                            </div>
                            <p className="text-xs text-marzetti-text-secondary mt-1">
                                Ventas confirmadas
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-marzetti-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-marzetti-text-secondary">
                                Total Órdenes
                            </CardTitle>
                            <ShoppingCart className="h-4 w-4 text-marzetti-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-marzetti-text-primary">
                                {stats.totalOrders}
                            </div>
                            <p className="text-xs text-marzetti-text-secondary mt-1">
                                Todas las órdenes
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-marzetti-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-marzetti-text-secondary">
                                Productos Vendidos
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-marzetti-secondary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-marzetti-text-primary">
                                {stats.totalProducts}
                            </div>
                            <p className="text-xs text-marzetti-text-secondary mt-1">
                                Unidades totales
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="mb-6 bg-marzetti-card">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-marzetti-text-secondary" />
                                <Input
                                    placeholder="Buscar por número de orden, cliente, email o teléfono..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[200px]">
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">Todos los estados</SelectItem>
                                    <SelectItem value="PENDING">Pendiente</SelectItem>
                                    <SelectItem value="PAID">Pagado</SelectItem>
                                    <SelectItem value="CONFIRMED">Confirmado</SelectItem>
                                    <SelectItem value="PROCESSING">Procesando</SelectItem>
                                    <SelectItem value="SHIPPED">Enviado</SelectItem>
                                    <SelectItem value="DELIVERED">Entregado</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelado</SelectItem>
                                    <SelectItem value="REJECTED">Rechazado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Orders Table */}
                <Card className="bg-marzetti-card">
                    <CardHeader>
                        <CardTitle className="text-marzetti-text-primary">
                            Listado de Ventas ({filteredOrders.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Número de Orden</TableHead>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Contacto</TableHead>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead className="text-center">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center py-8 text-marzetti-text-secondary">
                                                No se encontraron ventas
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredOrders.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">
                                                    {order.orderNumber}
                                                </TableCell>
                                                <TableCell>{order.customerName}</TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <div>{order.customerEmail}</div>
                                                        <div className="text-marzetti-text-secondary">
                                                            {order.customerPhone}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{formatDate(order.createdAt)}</TableCell>
                                                <TableCell>{getStatusBadge(order.status)}</TableCell>
                                                <TableCell className="text-right font-semibold">
                                                    {formatCurrency(order.totalAmount)}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => viewOrderDetails(order)}
                                                    >
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Ver detalles
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Order Details Dialog */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Detalles de la Venta</DialogTitle>
                            <DialogDescription>
                                Información completa de la orden {selectedOrder?.orderNumber}
                            </DialogDescription>
                        </DialogHeader>
                        {selectedOrder && (
                            <div className="space-y-6">
                                {/* Customer Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold text-sm text-marzetti-text-secondary mb-2">
                                            Información del Cliente
                                        </h3>
                                        <div className="space-y-1 text-sm">
                                            <div><strong>Nombre:</strong> {selectedOrder.customerName}</div>
                                            <div><strong>Email:</strong> {selectedOrder.customerEmail}</div>
                                            <div><strong>Teléfono:</strong> {selectedOrder.customerPhone}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-marzetti-text-secondary mb-2">
                                            Información de la Orden
                                        </h3>
                                        <div className="space-y-1 text-sm">
                                            <div><strong>Número:</strong> {selectedOrder.orderNumber}</div>
                                            <div><strong>Fecha:</strong> {formatDate(selectedOrder.createdAt)}</div>
                                            <div><strong>Estado:</strong> {getStatusBadge(selectedOrder.status)}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <h3 className="font-semibold text-sm text-marzetti-text-secondary mb-2">
                                        Productos
                                    </h3>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Producto</TableHead>
                                                <TableHead className="text-center">Cantidad</TableHead>
                                                <TableHead className="text-right">Precio Unit.</TableHead>
                                                <TableHead className="text-right">Subtotal</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selectedOrder.items.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell>{item.productName}</TableCell>
                                                    <TableCell className="text-center">{item.quantity}</TableCell>
                                                    <TableCell className="text-right">
                                                        {formatCurrency(item.price)}
                                                    </TableCell>
                                                    <TableCell className="text-right font-semibold">
                                                        {formatCurrency(item.subtotal)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Total */}
                                <div className="flex justify-end pt-4 border-t">
                                    <div className="text-right">
                                        <div className="text-sm text-marzetti-text-secondary mb-1">
                                            Total de la Orden
                                        </div>
                                        <div className="text-2xl font-bold text-marzetti-text-primary">
                                            {formatCurrency(selectedOrder.totalAmount)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default AdminOrders;
