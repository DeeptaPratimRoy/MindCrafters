
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  User as UserIcon, 
  MapPin, 
  TrendingUp, 
  Briefcase,
  Home,
  Info,
  Mail,
  LogOut,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const publicPages = ["Home", "About", "Contact", "TechStack"];
const dashboardPages = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "SkillMap", icon: MapPin, label: "Skill Genome" },
  { name: "Careers", icon: TrendingUp, label: "Career Paths" },
  { name: "Pulse", icon: TrendingUp, label: "Industry Pulse" },
  { name: "Opportunities", icon: Briefcase, label: "Opportunity Bridge" },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const isPublicPage = publicPages.includes(currentPageName);
  const isDashboardPage = dashboardPages.some(page => page.name === currentPageName);

  React.useEffect(() => {
    checkUser();
  }, []);

  React.useEffect(() => {
    if (!user && isDashboardPage && !isLoading) {
      User.loginWithRedirect(window.location.href);
    }
  }, [user, isDashboardPage, isLoading]);

  const checkUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      setUser(null);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await User.logout();
    setUser(null);
  };

  // Public pages layout
  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Public Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to={createPageUrl("Home")} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PathPilot
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link 
                  to={createPageUrl("Home")} 
                  className={`text-sm font-medium transition-colors ${currentPageName === 'Home' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                >
                  <Home className="w-4 h-4 inline mr-2" />
                  Home
                </Link>
                <Link 
                  to={createPageUrl("About")} 
                  className={`text-sm font-medium transition-colors ${currentPageName === 'About' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                >
                  <Info className="w-4 h-4 inline mr-2" />
                  About
                </Link>
                <Link 
                  to={createPageUrl("Contact")} 
                  className={`text-sm font-medium transition-colors ${currentPageName === 'Contact' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  Contact
                </Link>
                
                {user ? (
                  <Link to={createPageUrl("Dashboard")}>
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    onClick={() => User.loginWithRedirect(window.location.origin + createPageUrl("Dashboard"))}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Get Started
                  </Button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-slate-200">
                <div className="flex flex-col space-y-4">
                  <Link to={createPageUrl("Home")} className="text-slate-600 hover:text-blue-600 px-2">Home</Link>
                  <Link to={createPageUrl("About")} className="text-slate-600 hover:text-blue-600 px-2">About</Link>
                  <Link to={createPageUrl("Contact")} className="text-slate-600 hover:text-blue-600 px-2">Contact</Link>
                  {user ? (
                    <Link to={createPageUrl("Dashboard")} className="px-2">
                      <Button size="sm">Dashboard</Button>
                    </Link>
                  ) : (
                    <Button 
                      onClick={() => User.loginWithRedirect(window.location.origin + createPageUrl("Dashboard"))}
                      size="sm"
                      className="mx-2"
                    >
                      Get Started
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>

        <main>{children}</main>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <p className="text-slate-600">Loading PathPilot...</p>
        </div>
      </div>
    );
  }

  // Dashboard layout with sidebar (only if user is logged in)
  if (isDashboardPage && user) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-slate-50">
          <Sidebar className="border-r border-slate-200">
            <SidebarHeader className="border-b border-slate-200 p-6">
              <Link to={createPageUrl("Dashboard")} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900">PathPilot</h2>
                  <p className="text-xs text-slate-500">AI Career Advisor</p>
                </div>
              </Link>
            </SidebarHeader>
            
            <SidebarContent className="p-2">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-medium text-slate-500 uppercase tracking-wider px-2 py-2">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {dashboardPages.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton 
                          asChild 
                          className={`hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 rounded-lg mb-1 ${
                            currentPageName === item.name ? 'bg-blue-50 text-blue-700' : ''
                          }`}
                        >
                          <Link to={createPageUrl(item.name)} className="flex items-center gap-3 px-3 py-2">
                            <item.icon className="w-4 h-4" />
                            <span className="font-medium">{item.label || item.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-slate-200 p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 rounded-lg p-2">
                    <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-sm truncate">{user?.full_name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to={createPageUrl("Profile")} className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 flex flex-col">
            <header className="bg-white border-b border-slate-200 px-6 py-4 md:hidden">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
                <h1 className="text-xl font-semibold">PathPilot</h1>
              </div>
            </header>
            <div className="flex-1 overflow-auto">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  // If not authenticated and trying to access dashboard, show loading (useEffect will redirect)
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white animate-pulse" />
        </div>
        <p className="text-slate-600">Redirecting to login...</p>
      </div>
    </div>
  );
}
