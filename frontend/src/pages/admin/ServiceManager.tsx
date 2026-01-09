import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Service {
    _id: string;
    title: string;
    description: string;
    image: string;
    features: string[];
    icon: string;
    color: string;
}

const ServiceManager = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<Service | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        features: '', // Comma separated
        icon: 'Target', // Default
        color: 'from-primary to-accent'
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/services');
            setServices(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            try {
                await axios.delete(`http://localhost:5000/api/services/${id}`);
                setServices(services.filter(s => s._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            features: formData.features.split(',').map(s => s.trim()).filter(s => s)
        };

        try {
            if (isEditing) {
                const res = await axios.patch(`http://localhost:5000/api/services/${isEditing._id}`, payload);
                setServices(services.map(s => s._id === isEditing._id ? res.data : s));
                setIsEditing(null);
            } else {
                const res = await axios.post('http://localhost:5000/api/services', payload);
                setServices([...services, res.data]);
                setIsCreating(false);
            }
            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', image: '', features: '', icon: 'Target', color: 'from-primary to-accent' });
    };

    const startEdit = (service: Service) => {
        setIsEditing(service);
        setFormData({
            title: service.title,
            description: service.description,
            image: service.image,
            features: service.features.join(', '),
            icon: service.icon,
            color: service.color
        });
        setIsCreating(false);
    };

    const startCreate = () => {
        resetForm();
        setIsCreating(true);
        setIsEditing(null);
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border/50 shadow-sm">
                <span className="font-medium">Total Services: {services.length}</span>
                <Button onClick={startCreate} disabled={isCreating || !!isEditing}>
                    <Plus className="w-4 h-4 mr-2" /> Add Service
                </Button>
            </div>

            {/* Form Section */}
            <AnimatePresence>
                {(isCreating || isEditing) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-card border border-border rounded-xl p-6 shadow-lg mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">{isEditing ? 'Edit Service' : 'New Service'}</h3>
                                <Button variant="ghost" size="icon" onClick={() => { setIsCreating(false); setIsEditing(null); }}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Title</label>
                                    <input required className="w-full bg-muted/50 border border-border rounded-lg p-2" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Icon Name (Lucide)</label>
                                    <input required className="w-full bg-muted/50 border border-border rounded-lg p-2" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} placeholder="e.g., Target, Palette" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <textarea required className="w-full bg-muted/50 border border-border rounded-lg p-2 h-24" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Image URL</label>
                                    <input required className="w-full bg-muted/50 border border-border rounded-lg p-2" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Features (comma separated)</label>
                                    <input className="w-full bg-muted/50 border border-border rounded-lg p-2" value={formData.features} onChange={e => setFormData({ ...formData, features: e.target.value })} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Gradient Colors (Tailwind)</label>
                                    <input className="w-full bg-muted/50 border border-border rounded-lg p-2" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} placeholder="from-primary to-accent" />
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => { setIsCreating(false); setIsEditing(null); }}>Cancel</Button>
                                    <Button type="submit"><Check className="w-4 h-4 mr-2" /> {isEditing ? 'Update' : 'Create'} Service</Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(service => (
                    <motion.div
                        key={service._id}
                        layout
                        className="bg-card border border-border/50 rounded-xl overflow-hidden group hover:border-primary/50 transition-colors"
                    >
                        <div className="h-40 overflow-hidden relative">
                            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                                <h3 className="text-white font-bold text-lg">{service.title}</h3>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{service.description}</p>
                            <div className="flex justify-end gap-2">
                                <Button size="sm" variant="outline" onClick={() => startEdit(service)}>
                                    <Pencil className="w-3 h-3 mr-2" /> Edit
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(service._id)}>
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ServiceManager;
