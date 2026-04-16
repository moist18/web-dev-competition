import { createBrowserRouter, Navigate } from 'react-router';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { HomePage } from './pages/HomePage';
import { ScanBarcodePage } from './pages/ScanBarcodePage';
import { AIDetectionPage } from './pages/AIDetectionPage';
import { FoodDetailPage } from './pages/FoodDetailPage';
import { ReportPage } from './pages/ReportPage';
import { FoodHistoryPage } from './pages/FoodHistoryPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AccountSettingsPage } from './pages/AccountSettingsPage';
import { MainLayout } from './components/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    element: <MainLayout />, // Wrap authenticated routes
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/scan-barcode',
        element: <ScanBarcodePage />,
      },
      {
        path: '/ai-detection',
        element: <AIDetectionPage />,
      },
      {
        path: '/food-detail',
        element: <FoodDetailPage />,
      },
      {
        path: '/report',
        element: <ReportPage />,
      },
      {
        path: '/history',
        element: <FoodHistoryPage />,
      },
      {
        path: '/profile',
        element: <UserProfilePage />,
      },
      {
        path: '/about',
        element: <AboutPage />,
      },
      {
        path: '/contact',
        element: <ContactPage />,
      },
      {
        path: '/account-settings',
        element: <AccountSettingsPage />,
      },
    ]
  }
]);