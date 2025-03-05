import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../SupabaseClient';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };
  
  const sidebarItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: <LayoutDashboard size={20} />
    },
    {
      name: 'Products',
      path: '/admin/products',
      icon: <ShoppingBag size={20} />
    },
    {
      name: 'Customers',
      path: '/admin/customers',
      icon: <Users size={20} />
    },
    {
      name: 'Blog Posts',
      path: '/admin/blog',
      icon: <FileText size={20} />
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: <Settings size={20} />
    }
  ];
  
  const sidebarContent = (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <Link to="/admin" className="text-xl font-serif text-[#1a0f00]">
          Admin Panel
        </Link>
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700"
          onClick={toggleMobileMenu}
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="p-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-[#1a0f00] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          <LogOut size={20} />
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </>
  );
  
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-white shadow-md text-gray-700"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        {sidebarContent}
      </div>
      
      {/* Mobile sidebar */}
      <div className={`md:hidden fixed inset-0 z-20 transform ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out`}>
        <div className="relative flex flex-col w-full max-w-xs h-full bg-white shadow-xl">
          {sidebarContent}
        </div>
        
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-gray-600 opacity-75"
          onClick={toggleMobileMenu}
        ></div>
      </div>
    </>
  );
};

export default AdminSidebar;