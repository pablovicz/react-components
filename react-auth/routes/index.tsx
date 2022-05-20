import { Routes, Route } from 'react-router-dom';
import { Audit } from '../pages/Admin/Audit';
import { CreateUser } from '../pages/Admin/CreateUser';
import { Users } from '../pages/Admin/Users';
import { ConfigKeys } from '../pages/Configurations/CofigKeys';
import { Integrations } from '../pages/Configurations/Integrations';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { MonitoringApis } from '../pages/Monitoring/MonitoringApis';
import { MonitoringItens } from '../pages/Monitoring/MonitoringItens';
import { MonitoringResults } from '../pages/Monitoring/MonitoringResults';
import { Redirect } from '../pages/Redirect';
import { ResetPassword } from '../pages/ResetPassword';
import { ProtectedRoute } from './components/ProtectedRoute';

export const appPath = '';


export function AppRoutes() {

    return (

        <Routes>
            <Route path={'/'} element={<Login />} />
            <Route path={'/reset/:userId/:token'} element={<ResetPassword />} />
            <Route path={'/home'} element={<ProtectedRoute element={<Home />} allowedProfiles={['ROLE_ADMIN', 'ROLE_DEV', 'ROLE_BUSINESS']} />} />
            <Route path={'/monitoring/itens'} element={<ProtectedRoute element={<MonitoringItens />} allowedProfiles={['ROLE_ADMIN', 'ROLE_DEV', 'ROLE_BUSINESS']} />} />
            <Route path={'/monitoring/results'} element={<ProtectedRoute element={<MonitoringResults />} allowedProfiles={['ROLE_ADMIN', 'ROLE_DEV', 'ROLE_BUSINESS']} />} />
            <Route path={'/monitoring/apis'} element={<ProtectedRoute element={<MonitoringApis />} allowedProfiles={['ROLE_ADMIN', 'ROLE_DEV', 'ROLE_BUSINESS']} />} />
            <Route path={'/config/integrations'} element={<ProtectedRoute element={<Integrations />} allowedProfiles={['ROLE_ADMIN', 'ROLE_DEV']} />} />
            <Route path={'/config/keys'} element={<ProtectedRoute element={<ConfigKeys />} allowedProfiles={['ROLE_ADMIN', 'ROLE_DEV']} />} />
            <Route path={'/admin/users'} element={<ProtectedRoute element={<Users />} allowedProfiles={['ROLE_ADMIN']} />} />
            <Route path={'/admin/create'} element={<ProtectedRoute element={<CreateUser />} allowedProfiles={['ROLE_ADMIN']} />} />
            <Route path={'/admin/audit'} element={<ProtectedRoute element={<Audit />} allowedProfiles={['ROLE_ADMIN', 'ROLE_DEV', 'ROLE_BUSINESS']} />} />
            <Route path="*" element={<Redirect />} />
        </Routes>
    );
}