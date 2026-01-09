import { useOutletContext } from 'react-router-dom';
import ProjectManager from './ProjectManager';
import ServiceManager from './ServiceManager';

const AdminDashboard = () => {
    const { activeTab } = useOutletContext<{ activeTab: 'projects' | 'services' }>();

    return (
        <div className="max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground">
                    {activeTab === 'projects' ? 'Project Management' : 'Service Management'}
                </h1>
                <p className="text-muted-foreground mt-2">
                    {activeTab === 'projects'
                        ? 'Manage your portfolio projects, images, and categories.'
                        : 'Update your service offerings and details.'}
                </p>
            </header>

            {activeTab === 'projects' ? <ProjectManager /> : <ServiceManager />}
        </div>
    );
};

export default AdminDashboard;
