import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../SupabaseClient';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Jewelry } from '../../types';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<Jewelry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [categories, setCategories] = useState<
    { id: number; category: string }[]
  >([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query =await supabase.from('jwelerry').select('*');

        if (selectedCategory !== 'ALL') {
          query = query.eq('jwelerry_category', selectedCategory);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProducts(data as Jewelry[]);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from('category').select('*');
        if (error) throw error;
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [selectedCategory]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?'))
      return;

    try {
      // First get the product to get image URLs
      const { data: product, error: fetchError } = await supabase.rpc(
        'getjwelerrybyid',
        { id_input: id }
      );

      if (fetchError) throw fetchError;

      // Delete the product
      const { error: deleteError } = await supabase
        .from('jwelerry')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      // Delete images from storage if they're not URLs
      if (product && product.length > 0) {
        const imageUrls = product[0].image_url;
        for (const url of imageUrls) {
          if (!url.startsWith('http')) {
            // It's a storage path, delete it
            const { error: storageError } = await supabase.storage
              .from('jwelerry')
              .remove([url]);

            if (storageError)
              console.error('Error deleting image:', storageError);
          }
        }
      }

      // Update the products list
      setProducts(products.filter((product) => product.id !== id));

      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.jwelerry_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <div className="md:pl-64">
        <AdminHeader />

        <main className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-serif text-gray-800 mb-4 sm:mb-0">
              Products
            </h2>

            <Link
              to="/admin/products/add"
              className="inline-flex items-center bg-[#1a0f00] text-white py-2 px-4 rounded-md hover:bg-[#3a2a1a] transition-colors"
            >
              <Plus size={18} className="mr-1" />
              Add New Product
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                  />
                </div>

                <div className="w-full md:w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                  >
                    <option value="ALL">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a0f00]"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products found</p>
                <Link
                  to="/admin/products/add"
                  className="inline-flex items-center bg-[#1a0f00] text-white py-2 px-4 rounded-md hover:bg-[#3a2a1a] transition-colors"
                >
                  <Plus size={18} className="mr-1" />
                  Add New Product
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-md object-cover"
                                src={
                                  product.image_url[0].startsWith('http')
                                    ? product.image_url[0]
                                    : `https://zoisqpjdagwrmfzniotl.supabase.co/storage/v1/object/public/${product.image_url[0]}`
                                }
                                alt={product.jwelerry_name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.jwelerry_name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {product.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {product.jwelerry_category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.jwelerry_price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              to={`/admin/products/edit/${product.id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProducts;
