import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  HelpCircle,
  Home,
  LayoutDashboard,
  LogInIcon,
  Menu,
  Compass,
  X,
  PlusCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import useAuthStore from "@/features/auth/hooks/use-auth-store";
import useAuth from "@/features/auth/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { NotificationBell } from "@/features/notification/components/notification-bell";

const links = [
  {
    name: "Beranda",
    href: "/",
    icon: Home,
  },
  {
    name: "Eksplor",
    href: "/explore",
    icon: Compass,
  },
  {
    name: "Bantuan",
    href: "/bantuan",
    icon: HelpCircle,
  },
];

export function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleOpenMenu = () => setIsOpen(true);
  const handleCloseMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentUser = {
    name: user?.name || "User",
    email: user?.email || "",
    avatar: user?.profile?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || "User"}`,
  };

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <nav 
      className={cn(
        "fixed z-50 top-0 left-0 w-full px-5 md:px-8 lg:px-20 py-3.5 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/90 backdrop-blur-md border-gray-200/50 shadow-sm" 
          : "bg-white/80 backdrop-blur-sm border-transparent"
      )}
    >
      <div className="flex w-full items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo-primary.png" alt="InfoIndi Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-indigo-950 leading-none">InfoIndi</span>
            <span className="text-[10px] font-bold text-indigo-600/80 tracking-widest uppercase mt-0.5">infoin di ub</span>
          </div>
        </Link>

        {/* Desktop Links (Centered) */}
        <ul className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          {links.map((link, idx) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <li key={idx}>
                <Link 
                  to={link.href} 
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-indigo-50 text-indigo-600" 
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop Action Area */}
        <div className="hidden md:flex items-center gap-3">
          {user?.name ? (
            <>
              <Link to="/create-post" className="hidden sm:inline-flex">
                <Button 
                  size="sm" 
                  className="gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-md shadow-blue-600/10 text-xs px-4"
                >
                  <PlusCircle className="w-4 h-4" />
                  Buat Postingan
                </Button>
              </Link>
              <NotificationBell />
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" className="h-9 w-9 p-0 rounded-full ring-2 ring-gray-100 hover:ring-indigo-100 transition-all">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 text-xs font-bold">
                          {currentUser.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-100 shadow-xl rounded-2xl p-1.5 z-50">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="font-bold text-sm text-gray-900 truncate">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{currentUser.email}</p>
                  </div>
                  <div className="p-1 space-y-0.5">
                    <DropdownMenuItem
                      className="gap-2 rounded-xl py-2 cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                      onClick={() => navigate("/dashboard")}
                    >
                      <LayoutDashboard className="w-4 h-4 text-gray-400" />
                      <span>Dasbor Saya</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="gap-2 rounded-xl py-2 cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                      onClick={() => navigate("/settings")}
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span>Pengaturan Profil</span>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-100" />
                  <div className="p-1">
                    <DropdownMenuItem
                      className="gap-2 rounded-xl py-2 cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 hover:bg-red-50 transition-colors text-sm"
                      onClick={handleLogout}
                      disabled={logout.isPending}
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>{logout.isPending ? "Mengeluarkan..." : "Keluar"}</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button 
              className="rounded-full px-6 font-semibold shadow-none transition-all bg-indigo-600 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20"
            >
              <Link to="/auth/login" className="flex items-center gap-2">
                <LogInIcon className="w-4 h-4" />
                Login
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          onClick={handleOpenMenu}
        >
          <Menu className="w-6 h-6" />
        </Button>

        <MobileMenu
          isOpen={isOpen}
          pathname={pathname}
          user={user}
          currentUser={currentUser}
          handleCloseMenu={handleCloseMenu}
          handleLogout={handleLogout}
          isLogoutPending={logout.isPending}
        />
      </div>
    </nav>
  );
}

function MobileMenu({
  isOpen,
  pathname,
  user,
  currentUser,
  handleCloseMenu,
  handleLogout,
  isLogoutPending
}: {
  isOpen: boolean;
  pathname: string;
  user: any;
  currentUser: any;
  handleCloseMenu: () => void;
  handleLogout: () => void;
  isLogoutPending: boolean;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 h-screen bg-gray-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={handleCloseMenu}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 w-72 h-screen bg-white shadow-2xl z-50 transition-transform duration-300 ease-in-out md:hidden flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h5 className="text-lg font-bold text-gray-900">Menu Navigasi</h5>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleCloseMenu}
            className="rounded-full text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col px-3 gap-1">
            {links.map((link, idx) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <li key={idx}>
                  <Link 
                    to={link.href}
                    onClick={handleCloseMenu}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-colors",
                      isActive 
                        ? "bg-indigo-50 text-indigo-600" 
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {user?.name && (
            <div className="mt-4 px-3 border-t border-gray-100 pt-4">
              <h6 className="text-xs font-bold text-gray-400 uppercase mb-2 px-4">Menu Pengguna</h6>
              <ul className="flex flex-col gap-1">
                <li>
                  <Link 
                    to="/dashboard"
                    onClick={handleCloseMenu}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dasbor Saya
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/settings"
                    onClick={handleCloseMenu}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    Pengaturan Profil
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-100">
          {user?.name ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 mb-2 px-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold">{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  handleLogout();
                  handleCloseMenu();
                }}
                disabled={isLogoutPending}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isLogoutPending ? "Keluar..." : "Keluar dari Akun"}
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full rounded-xl py-6 font-bold shadow-none text-base transition-all bg-indigo-600 hover:bg-indigo-700"
              onClick={handleCloseMenu}
            >
              <Link to="/auth/login" className="flex items-center justify-center gap-2 w-full">
                <LogInIcon className="w-5 h-5" />
                Login ke Akun
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
