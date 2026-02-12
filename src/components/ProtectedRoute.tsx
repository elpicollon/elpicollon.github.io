import { Navigate, useLocation } from 'react-router-dom';
import { getProjectByRoute } from '../config/projects';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const project = getProjectByRoute(location.pathname);

    // If project exists and is explicitly unpublished (false), redirect to home
    // If project doesn't exist in config (undefined), we let it pass 
    // (it might be a 404 handled by router or a non-project page)
    if (project && project.published === false) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
