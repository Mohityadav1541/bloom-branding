import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutGrid, Layers, User, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLayout = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'projects' | 'services' | 'enquiries'>('projects');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-border/50 bg-card/50 backdrop-blur-xl h-screen sticky top-0 flex flex-col p-6">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
                    <span className="font-display font-bold text-lg">Bloom Admin</span>
                </div>

                <nav className="space-y-2 flex-1">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects'
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted'
                            }`}
                    >
                        <LayoutGrid className="w-5 h-5" />
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'services'
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted'
                            }`}
                    >
                        <Layers className="w-5 h-5" />
                        Services
                    </button>
                    <button
                        onClick={() => setActiveTab('enquiries')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'enquiries'
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted'
                            }`}
                    >
                        <MessageSquare className="w-5 h-5" />
                        Enquiries
                    </button>
                </nav>

                <div className="pt-6 border-t border-border/50">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <User className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">Admin User</p>
                            <p className="text-xs text-muted-foreground">Administrator</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full flex items-center justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet context={{ activeTab }} />
            </main>
        </div>
    );
};

export default AdminLayout;
