import { Outlet } from 'react-router';
import { DesktopSidebar } from './DesktopSidebar';
import { BottomNavigation } from './BottomNavigation';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex">
      {/* Desktop Sidebar (visible only on md and up) */}
      <DesktopSidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 relative">
        <main className="min-h-screen pb-28 md:pb-8 w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation (visible only below md) */}
      <BottomNavigation />
    </div>
  );
}
