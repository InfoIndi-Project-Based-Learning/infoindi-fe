import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Flag,
  LogOut,
  Menu,
  X,
  Settings
} from 'lucide-react';
import useAuth from '@/features/auth/hooks/use-auth';
import useAuthStore from '@/features/auth/hooks/use-auth-store';
import { Input } from '@/components/ui/input';

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { logout } = useAuth();
  const { user } = useAuthStore();

  const currentUser = {
    name: user?.name || "Admin",
    email: user?.email || "admin@infoindi.com",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "Admin"}`,
  };

  const navigation = [
    { name: 'Dasbor Utama', href: '/admin', icon: LayoutDashboard },
    { name: 'Kelola Pengguna', href: '/admin/users', icon: Users },
    { name: 'Kategori Post', href: '/admin/categories', icon: FolderKanban },
    { name: 'Tinjau Laporan', href: '/admin/reports', icon: Flag },
    { name: 'Pengaturan', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout.mutate();
  };


  return (
    <div className="min-h-screen bg-slate-50/50 flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:translate-x-0 inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col`}
      >
        {/* Sidebar Header / Logo */}
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo-primary.png" alt="InfoIndi Admin" className="h-8 w-auto group-hover:scale-105 transition-transform" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 scrollbar-hide">
          <div className="px-4 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-4 mt-2">Menu Utama</div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md shadow-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-100' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`} />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 mt-auto">
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            disabled={logout.isPending} 
            className="w-full gap-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl font-semibold transition-colors bg-white border border-rose-100 shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>{logout.isPending ? "Keluar..." : "Keluar dari Sistem"}</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden lg:pl-72">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden h-10 w-10 rounded-xl text-slate-500 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
          </div>

          <div className="flex items-center gap-4">
            
            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
            
            <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-slate-200">
              <Avatar className="w-9 h-9 border-2 border-white shadow-sm ring-1 ring-slate-100">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="bg-blue-50 text-blue-700 font-bold">{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-slate-900 leading-none">{currentUser.name}</p>
                <p className="text-[10px] font-medium text-slate-500 mt-1">{currentUser.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
