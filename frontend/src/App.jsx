import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

const About = lazy(() => import('./pages/About'));
const Attraction = lazy(() => import('./pages/Attraction'));
const StreetViewPage = lazy(() => import('./pages/StreetViewPage'));
const DistrictPosts = lazy(() => import('./pages/DistrictPosts'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Dharmapuri = lazy(() => import('./pages/districts/Dharmapuri'));
const Krishnagiri = lazy(() => import('./pages/districts/Krishnagiri'));
const Namakkal = lazy(() => import('./pages/districts/Namakkal'));
const Salem = lazy(() => import('./pages/districts/Salem'));

const RouteFallback = () => <div className="shell" style={{ padding: '2rem 1rem' }}>Loading...</div>;

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute message="Please Sign In to continue" />}>
            <Route path="/about" element={<About />} />
            <Route path="/attractions" element={<Attraction />} />
            <Route path="/street-view/:attractionId" element={<StreetViewPage />} />
            <Route path="/salem" element={<Salem />} />
            <Route path="/dharmapuri" element={<Dharmapuri />} />
            <Route path="/krishnagiri" element={<Krishnagiri />} />
            <Route path="/namakkal" element={<Namakkal />} />
            <Route path="/district-posts" element={<DistrictPosts />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
