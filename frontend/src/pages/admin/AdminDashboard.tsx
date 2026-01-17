import { useOutletContext } from 'react-router-dom';
import ProjectManager from './ProjectManager';
import ServiceManager from './ServiceManager';
import EnquiryManager from './EnquiryManager';
import ContentManager from './ContentManager';

const AdminDashboard = () => {
    const { activeTab } = useOutletContext<{ activeTab: 'projects' | 'services' | 'enquiries' | 'content' }>();

    const getHeaderInfo = () => {
        switch (activeTab) {
            case 'projects':
                return {
                    title: 'Project Management',
                    description: 'Manage your portfolio projects, images, and categories.'
                };
            case 'services':
                return {
                    title: 'Service Management',
                    description: 'Update your service offerings and details.'
                };
            case 'enquiries':
                return {
                    title: 'Enquiry Management',
                    description: 'View and manage client enquiries and messages.'
                };
            case 'content':
                return {
                    title: 'Content Management',
                    description: 'Update homepage text, banners, and media.'
                };
            default:
                return { title: '', description: '' };
        }
    };

    const info = getHeaderInfo();

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground">
                    {info.title}
                </h1>
                <p className="text-muted-foreground mt-2">
                    {info.description}
                </p>
            </header>

            {activeTab === 'projects' && <ProjectManager />}
            {activeTab === 'services' && <ServiceManager />}
            {activeTab === 'enquiries' && <EnquiryManager />}
            {activeTab === 'content' && <ContentManager />}
        </div>
    );
};

export default AdminDashboard;
