import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User } from 'lucide-react';

const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium text-gray-800">Admin Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-[#1a0f00]" target="_blank">
            View Site
          </Link>
          
          <button className="relative p-2 text-gray-600 hover:text-[#1a0f00] hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#1a0f00] rounded-full flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;