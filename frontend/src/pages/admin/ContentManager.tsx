import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ContentManager = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        heroTitle: '',
        heroSubtitle: '',
        heroVideoUrl: '',
        heroBadge: '',
        showreelLink: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.get(`${apiUrl}/api/homepage`);
            if (res.data) {
                setFormData({
                    heroTitle: res.data.heroTitle || '',
                    heroSubtitle: res.data.heroSubtitle || '',
                    heroVideoUrl: res.data.heroVideoUrl || '',
                    heroBadge: res.data.heroBadge || '',
                    showreelLink: res.data.showreelLink || ''
                });
            }
        } catch (error) {
            console.error("Error fetching homepage content:", error);
            toast({
                title: "Error",
                description: "Failed to load content",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.put(`${apiUrl}/api/homepage`, formData);
            toast({
                title: "Success",
                description: "Homepage content updated successfully",
            });
        } catch (error) {
            console.error("Error updating content:", error);
            toast({
                title: "Error",
                description: "Failed to update content",
                variant: "destructive"
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Edit Homepage Content</h2>
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="space-y-4 border p-4 rounded-xl bg-card">
                    <h3 className="font-semibold text-lg border-b pb-2">Hero Section</h3>

                    <div className="space-y-2">
                        <Label htmlFor="heroBadge">Badge Text</Label>
                        <Input
                            id="heroBadge"
                            value={formData.heroBadge}
                            onChange={handleChange}
                            placeholder="e.g. Future of Branding"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heroTitle">Main Title</Label>
                        <Input
                            id="heroTitle"
                            value={formData.heroTitle}
                            onChange={handleChange}
                            placeholder="e.g. We Help Brands Bloom & Thrive"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heroSubtitle">Subtitle</Label>
                        <Textarea
                            id="heroSubtitle"
                            value={formData.heroSubtitle}
                            onChange={handleChange}
                            className="h-24"
                            placeholder="Subtitle text..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="heroVideoUrl">Background Video URL</Label>
                        <Input
                            id="heroVideoUrl"
                            value={formData.heroVideoUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                        <p className="text-xs text-muted-foreground">Direct link to mp4 file</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="showreelLink">Showreel Link</Label>
                        <Input
                            id="showreelLink"
                            value={formData.showreelLink}
                            onChange={handleChange}
                            placeholder="/work"
                        />
                    </div>
                </div>

                <Button type="submit" disabled={saving} className="w-full">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
            </form>
        </div>
    );
};

export default ContentManager;
