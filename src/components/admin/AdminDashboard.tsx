import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../SupabaseClient';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { ShoppingBag, Users, FileText, TrendingUp } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [productCount, setProductCount] = useState<number | null>(null);
  const [categoryCount, setCategoryCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Get product count
        const { count: productCount, error: productError } = await supabase
          .from('jwelerry')
          .select('*', { count: 'exact', head: true });

        if (productError) throw productError;
        setProductCount(productCount);

        // Get category count
        const { count: categoryCount, error: categoryError } = await supabase
          .from('category')
          .select('*', { count: 'exact', head: true });

        if (categoryError) throw categoryError;
        setCategoryCount(categoryCount);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Set fallback values
        setProductCount(0);
        setCategoryCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const dashboardCards = [
    {
      title: 'Total Products',
      value: loading ? '...' : productCount ?? 0,
      icon: <ShoppingBag size={24} className="text-blue-500" />,
      bgColor: 'bg-blue-50',
      link: '/admin/products',
    },
    {
      title: 'Categories',
      value: loading ? '...' : categoryCount ?? 0,
      icon: <FileText size={24} className="text-green-500" />,
      bgColor: 'bg-green-50',
      link: '/admin/categories',
    },
    {
      title: 'Customers',
      value: '0',
      icon: <Users size={24} className="text-purple-500" />,
      bgColor: 'bg-purple-50',
      link: '/admin/customers',
    },
    {
      title: 'Total Sales',
      value: '$0',
      icon: <TrendingUp size={24} className="text-amber-500" />,
      bgColor: 'bg-amber-50',
      link: '/admin/sales',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <div className="md:pl-64">
        <AdminHeader />

        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-serif text-gray-800 mb-4">
              Dashboard Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardCards.map((card, index) => (
                <Link
                  key={index}
                  to={card.link}
                  className={`${card.bgColor} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">{card.title}</p>
                      <p className="text-2xl font-semibold text-gray-800 mt-1">
                        {card.value}
                      </p>
                    </div>
                    <div className="p-3 rounded-full bg-white shadow-sm">
                      {card.icon}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Recent Products
                </h3>
                <Link
                  to="/admin/products"
                  className="text-sm text-[#1a0f00] hover:underline"
                >
                  View All
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1a0f00]"></div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {productCount
                      ? 'Loading recent products...'
                      : 'No products added yet'}
                  </p>
                  <Link
                    to="/admin/products/add"
                    className="inline-block mt-4 bg-[#1a0f00] text-white py-2 px-4 rounded-md hover:bg-[#3a2a1a] transition-colors"
                  >
                    Add New Product
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Quick Actions
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/admin/products/add"
                  className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-blue-50 rounded-md mr-3">
                    <ShoppingBag size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Add Product</p>
                    <p className="text-sm text-gray-500">
                      Create a new product listing
                    </p>
                  </div>
                </Link>

                <Link
                  to="/admin/blog/add"
                  className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-green-50 rounded-md mr-3">
                    <FileText size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Add Blog Post</p>
                    <p className="text-sm text-gray-500">
                      Create a new blog article
                    </p>
                  </div>
                </Link>

                <Link
                  to="/admin/settings"
                  className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-purple-50 rounded-md mr-3">
                    {/* <Settings size={20} className="text-purple-500" /> */}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Settings</p>
                    <p className="text-sm text-gray-500">
                      Configure your store
                    </p>
                  </div>
                </Link>

                <Link
                  to="/"
                  target="_blank"
                  className="flex items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-amber-50 rounded-md mr-3">
                    <TrendingUp size={20} className="text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">View Store</p>
                    <p className="text-sm text-gray-500">
                      See your live website
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
