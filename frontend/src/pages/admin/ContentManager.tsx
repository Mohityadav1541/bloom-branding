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
        showreelLink: '',
        storyTeamImage: '',
        storyFounderImage: '',
        storyVisionImage: '',
        storyMissionImage: '',
        founderName: '',
        founderRole: '',
        founderBio1: '',
        founderBio2: '',
        contactEmail: '',
        contactLocation: '',
        contactInstagram: '',
        contactLinkedin: '',
        clientLogos: [] as string[]
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
                    showreelLink: res.data.showreelLink || '',
                    storyTeamImage: res.data.storyTeamImage || '',
                    storyFounderImage: res.data.storyFounderImage || '',
                    storyVisionImage: res.data.storyVisionImage || '',
                    storyMissionImage: res.data.storyMissionImage || '',
                    founderName: res.data.founderName || '',
                    founderRole: res.data.founderRole || '',
                    founderBio1: res.data.founderBio1 || '',
                    founderBio2: res.data.founderBio2 || '',
                    contactEmail: res.data.contactEmail || '',
                    contactLocation: res.data.contactLocation || '',
                    contactInstagram: res.data.contactInstagram || '',
                    contactLinkedin: res.data.contactLinkedin || '',
                    clientLogos: res.data.clientLogos || []
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

    const handleLogoChange = (index: number, value: string) => {
        const newLogos = [...formData.clientLogos];
        newLogos[index] = value;
        setFormData({ ...formData, clientLogos: newLogos });
    };

    const addLogo = () => {
        setFormData({ ...formData, clientLogos: [...formData.clientLogos, ''] });
    };

    const removeLogo = (index: number) => {
        const newLogos = formData.clientLogos.filter((_, i) => i !== index);
        setFormData({ ...formData, clientLogos: newLogos });
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



                {/* Founder Section */}
                <div className="space-y-4 border p-4 rounded-xl bg-card mt-6">
                    <h3 className="font-semibold text-lg border-b pb-2">Founder Info (My Journey)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="founderName">Founder Name</Label>
                            <Input id="founderName" value={formData.founderName} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="founderRole">Founder Role</Label>
                            <Input id="founderRole" value={formData.founderRole} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="founderBio1">Bio Paragraph 1</Label>
                        <Textarea id="founderBio1" value={formData.founderBio1} onChange={handleChange} className="h-24" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="founderBio2">Bio Paragraph 2</Label>
                        <Textarea id="founderBio2" value={formData.founderBio2} onChange={handleChange} className="h-24" />
                    </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-4 border p-4 rounded-xl bg-card mt-6">
                    <h3 className="font-semibold text-lg border-b pb-2">Contact & Footer Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Email Address</Label>
                            <Input id="contactEmail" value={formData.contactEmail} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactLocation">Location (Based In)</Label>
                            <Input id="contactLocation" value={formData.contactLocation} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactInstagram">Instagram Link</Label>
                            <Input id="contactInstagram" value={formData.contactInstagram} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactLinkedin">LinkedIn Link</Label>
                            <Input id="contactLinkedin" value={formData.contactLinkedin} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                {/* Client Logos Section */}
                <div className="space-y-4 border p-4 rounded-xl bg-card mt-6">
                    <h3 className="font-semibold text-lg border-b pb-2">Client Logos</h3>
                    <div className="space-y-2">
                        <Label>Logo URLs</Label>
                        <p className="text-xs text-muted-foreground mb-2">Add image URLs for client logos.</p>
                        {formData.clientLogos.map((logo, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <Input
                                    value={logo}
                                    onChange={(e) => handleLogoChange(index, e.target.value)}
                                    placeholder="https://..."
                                />
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeLogo(index)}>
                                    X
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={addLogo} className="mt-2">
                            + Add Logo
                        </Button>
                    </div>
                </div>

                <div className="space-y-4 border p-4 rounded-xl bg-card mt-6">
                    <h3 className="font-semibold text-lg">Our Story Images</h3>

                    <div className="space-y-2">
                        <Label htmlFor="storyTeamImage">Team Photo URL</Label>
                        <div className="flex gap-4 items-start">
                            <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                {formData.storyTeamImage ? (
                                    <img src={formData.storyTeamImage} alt="Team" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground text-center p-1">Default</div>
                                )}
                            </div>
                            <Input
                                id="storyTeamImage"
                                value={formData.storyTeamImage}
                                onChange={handleChange}
                                placeholder="https://... (Leave empty for default)"
                                className="flex-1"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="storyFounderImage">Founder Photo URL</Label>
                        <div className="flex gap-4 items-start">
                            <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                {formData.storyFounderImage ? (
                                    <img src={formData.storyFounderImage} alt="Founder" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground text-center p-1">Default</div>
                                )}
                            </div>
                            <Input
                                id="storyFounderImage"
                                value={formData.storyFounderImage}
                                onChange={handleChange}
                                placeholder="https://... (Leave empty for default)"
                                className="flex-1"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="storyVisionImage">Vision Image URL</Label>
                        <div className="flex gap-4 items-start">
                            <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                {formData.storyVisionImage ? (
                                    <img src={formData.storyVisionImage} alt="Vision" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground text-center p-1">Default</div>
                                )}
                            </div>
                            <Input
                                id="storyVisionImage"
                                value={formData.storyVisionImage}
                                onChange={handleChange}
                                placeholder="https://... (Leave empty for default)"
                                className="flex-1"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="storyMissionImage">Mission Image URL</Label>
                        <div className="flex gap-4 items-start">
                            <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                {formData.storyMissionImage ? (
                                    <img src={formData.storyMissionImage} alt="Mission" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground text-center p-1">Default</div>
                                )}
                            </div>
                            <Input
                                id="storyMissionImage"
                                value={formData.storyMissionImage}
                                onChange={handleChange}
                                placeholder="https://... (Leave empty for default)"
                                className="flex-1"
                            />
                        </div>
                    </div>
                </div>


                <Button type="submit" disabled={saving} className="w-full mt-6">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
            </form >
        </div >
    );
};

export default ContentManager;
