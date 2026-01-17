import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Trash2, Mail, Calendar, MessageSquare } from 'lucide-react';

interface Enquiry {
    _id: string;
    name: string;
    email: string;
    serviceInterest: string;
    message: string;
    status: string;
    createdAt: string;
}

const EnquiryManager = () => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEnquiries = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.get(`${apiUrl}/api/enquiries`);
            setEnquiries(res.data);
        } catch (error) {
            console.error("Error fetching enquiries:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this enquiry?')) {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
                await axios.delete(`${apiUrl}/api/enquiries/${id}`);
                setEnquiries(enquiries.filter(e => e._id !== id));
            } catch (error) {
                console.error("Error deleting enquiry:", error);
            }
        }
    };

    if (loading) return <div>Loading enquiries...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-display font-bold">Enquiries</h2>
                <span className="text-muted-foreground">{enquiries.length} messages</span>
            </div>

            <div className="grid gap-4">
                {enquiries.map((enquiry) => (
                    <div key={enquiry._id} className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-semibold text-lg">{enquiry.name}</h3>
                                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                                    <Mail className="w-4 h-4" />
                                    <a href={`mailto:${enquiry.email}`} className="hover:text-primary transition-colors">{enquiry.email}</a>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(enquiry._id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {enquiry.serviceInterest && (
                                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                    {enquiry.serviceInterest}
                                </div>
                            )}

                            <div className="flex gap-2 text-sm bg-muted/30 p-4 rounded-lg">
                                <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
                                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">{enquiry.message}</p>
                            </div>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
                                <Calendar className="w-3 h-3" />
                                <span>{new Date(enquiry.createdAt).toLocaleDateString()} at {new Date(enquiry.createdAt).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {enquiries.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        No enquiries found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnquiryManager;
