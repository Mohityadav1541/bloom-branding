import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Project {
    _id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    subProjects: string[];
}

const ProjectManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<Project | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Added env var

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        image: '',
        subProjects: '' // Comma separated for input
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${apiUrl}/api/projects`);
            setProjects(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`${apiUrl}/api/projects/${id}`);
                setProjects(projects.filter(p => p._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            subProjects: formData.subProjects.split(',').map(s => s.trim()).filter(s => s)
        };

        try {
            if (isEditing) {
                const res = await axios.patch(`${apiUrl}/api/projects/${isEditing._id}`, payload);
                setProjects(projects.map(p => p._id === isEditing._id ? res.data : p));
                setIsEditing(null);
            } else {
                const res = await axios.post(`${apiUrl}/api/projects`, payload);
                setProjects([...projects, res.data]);
                setIsCreating(false);
            }
            resetForm();
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setFormData({ title: '', category: '', description: '', image: '', subProjects: '' });
    };

    const startEdit = (project: Project) => {
        setIsEditing(project);
        setFormData({
            title: project.title,
            category: project.category,
            description: project.description,
            image: project.image,
            subProjects: project.subProjects.join(', ')
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
                <span className="font-medium">Total Projects: {projects.length}</span>
                <Button onClick={startCreate} disabled={isCreating || !!isEditing}>
                    <Plus className="w-4 h-4 mr-2" /> Add Project
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
                                <h3 className="text-xl font-bold">{isEditing ? 'Edit Project' : 'New Project'}</h3>
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
                                    <label className="text-sm font-medium">Category</label>
                                    <input required className="w-full bg-muted/50 border border-border rounded-lg p-2" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} placeholder="e.g., Jewellery, Fashion" />
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
                                    <label className="text-sm font-medium">Sub Projects (comma separated)</label>
                                    <input className="w-full bg-muted/50 border border-border rounded-lg p-2" value={formData.subProjects} onChange={e => setFormData({ ...formData, subProjects: e.target.value })} placeholder="Client A, Client B, Client C" />
                                </div>
                                <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={() => { setIsCreating(false); setIsEditing(null); }}>Cancel</Button>
                                    <Button type="submit"><Check className="w-4 h-4 mr-2" /> {isEditing ? 'Update' : 'Create'} Project</Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {projects.map(project => (
                    <motion.div
                        key={project._id}
                        layout
                        className="bg-card border border-border/50 p-6 rounded-xl flex items-center gap-6 group hover:border-primary/50 transition-colors"
                    >
                        <img src={project.image} alt={project.title} className="w-24 h-16 object-cover rounded-lg bg-muted" />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">{project.category}</span>
                            </div>
                            <h3 className="font-bold text-lg">{project.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="secondary" onClick={() => startEdit(project)}>
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="destructive" onClick={() => handleDelete(project._id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </motion.div>
                ))}
                {projects.length === 0 && !isLoading && (
                    <div className="text-center py-12 text-muted-foreground">No projects found. Create one to get started.</div>
                )}
            </div>
        </div>
    );
};

export default ProjectManager;
