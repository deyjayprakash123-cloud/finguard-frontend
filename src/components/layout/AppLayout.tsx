import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, History, UserPlus, ShieldAlert, PlayCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);

  const handleLoadMahesh = async () => {
    setIsLoadingDemo(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://finguard-backend-itbs.onrender.com';
      const response = await fetch(`${API_URL}/score/mahesh_critical_123`, {
        method: 'POST'
      });
      const scoreData = await response.json();
      navigate('/', { state: { scoreData } });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingDemo(false);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Alert History', path: '/alerts', icon: History },
    { name: 'Onboarding (Demo)', path: '/onboarding', icon: UserPlus },
  ];

  return (
    <div className="flex h-screen w-full bg-background/95">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-md flex flex-col h-full shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <ShieldAlert className="w-6 h-6 text-primary mr-2" />
          <span className="text-xl font-bold font-sans tracking-tight">FinGuard</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border flex flex-col gap-4">
          <button 
            onClick={handleLoadMahesh} 
            disabled={isLoadingDemo}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 py-2 rounded-md transition-colors text-sm font-semibold border border-red-500/20"
          >
            {isLoadingDemo ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
            {isLoadingDemo ? "Loading..." : "Load Mahesh Demo"}
          </button>
          
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-secondary-foreground">
              US
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">User Name</span>
              <span className="text-xs text-muted-foreground">Demo Account</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-background to-secondary/5 -z-10" />
        <div className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
