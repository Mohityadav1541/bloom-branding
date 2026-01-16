import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/admin/dashboard');
        } catch (err: any) {
            console.error("Login error:", err);
            // If it's a network error (no response), it might mean the backend is unreachable
            if (!err.response) {
                setError('Network Error: Cannot connect to server');
            } else {
                setError(err.response?.data?.msg || 'Invalid credentials');
            }
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md bg-card border border-border/50 rounded-3xl p-8 shadow-2xl"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <Lock className="w-5 h-5" />
                        </div>
                        <h1 className="text-2xl font-display font-bold">Admin Access</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                placeholder="admin@gmail.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                placeholder="Enter password"
                            />
                        </div>

                        <Button type="submit" className="w-full rounded-xl h-12 text-base">
                            Sign In <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
