import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConnected } from '../SupabaseClient';
import { Jewelry, Category, ShopProps } from '../types';
import Navbar from './Navbar';
import Footer from './Footer';

export const ProductsPage: React.FC<ShopProps> = ({
  showMorevisible = false,
  category = 'ALL',
}) => {
  const [products, setProducts] = useState<Jewelry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  // Check Supabase connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await isSupabaseConnected();
      setIsConnected(connected);
    };
    checkConnection();
  }, []);

  async function getProducts(cat: string) {
    try {
      // If we already know connection failed, use mock data immediately
      // if (isConnected === false) {
      //   setProducts(mockJewelryItems);
      //   return;
      // }

      if (cat === undefined || cat === null || cat === 'ALL') {
        const { data, error } = await supabase.from('jwelerry').select('*');
        if (error) throw error;
        setProducts(data as Jewelry[]);
      } else {
        const { data, error } = await supabase
          .from('jwelerry')
          .select('*')
          .eq('jwelerry_category', cat);
        if (error) throw error;
        setProducts(data as Jewelry[]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data if Supabase connection fails
      setProducts(mockJewelryItems);
      setIsConnected(false);
    }
  }

  async function getCategories() {
    try {
      // If we already know connection failed, use mock data immediately
      if (isConnected === false) {
        setCategories(mockCategories);
        return;
      }

      const { data, error } = await supabase.from('category').select();
      if (error) throw error;
      setCategories(data as Category[]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to mock categories if Supabase connection fails
      setCategories(mockCategories);
      setIsConnected(false);
    }
  }

  useEffect(() => {
    // if (category) {
    //   setSelectedCategory(category);
    // }
    getProducts(selectedCategory);
    getCategories();
  }, [selectedCategory, category, isConnected]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(event.target.value)
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      {!showMorevisible && <Navbar BackgroundclassName="bg-[#1a0f00]" />}

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            {!showMorevisible ? (
              <h2 className="text-3xl font-serif text-[#1a0f00]">
                All Products
              </h2>
            ) : (
              <h2 className="text-3xl font-serif text-[#1a0f00]">
                Latest Products
              </h2>
            )}

            {isConnected === false && (
              <p className="text-sm text-gray-500 mt-2">
                Showing demo products. Connect to Supabase for live data.
              </p>
            )}
          </div>

          {!showMorevisible && (
            <div className="flex justify-end mb-6">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-[#1a0f00]"
                >
                  <option value="ALL">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={
                        product.image_url[0].startsWith('http')
                          ? product.image_url[0]
                          : `https://zoisqpjdagwrmfzniotl.supabase.co/storage/v1/object/public/${product.image_url[0]}`
                      }
                      alt={product.jwelerry_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <div className="absolute top-2 right-2 bg-[#1a0f00] text-white text-xs px-3 py-1 rounded-full">
                        New
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {product.jwelerry_name}
                    </h3>
                    <p className="text-[#1a0f00] font-semibold">
                      {product.jwelerry_price}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {product.jwelerry_category}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {showMorevisible && (
            <div className="text-center mt-10">
              <Link
                to="/products"
                className="inline-block bg-[#1a0f00] text-white py-2 px-6 rounded-md hover:bg-[#3a2a1a] transition-colors"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {!showMorevisible && <Footer />}
    </>
  );
};

// Mock data for fallback
const mockJewelryItems: Jewelry[] = [
  {
    id: 1,
    jwelerry_name: 'Emerald Statement Necklace',
    jwelerry_price: '$1,299.99',
    jwelerry_description:
      'This stunning emerald statement necklace features seven oval-cut emeralds set in 18k gold. Each emerald is surrounded by a halo of small diamonds, creating a luxurious and eye-catching piece.',
    jwelerry_details: [
      '18k Gold Setting',
      'Seven Oval-Cut Emeralds (Total 5.2 carats)',
      'Diamond Accents (Total 1.8 carats)',
      'Adjustable Chain Length: 16-18 inches',
      'Handcrafted in India',
    ],
    jwelerry_category: 'Necklace',
    image_url: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    isNew: true,
  },
  {
    id: 2,
    jwelerry_name: 'Layered Gold Chain Necklace',
    jwelerry_price: '$899.99',
    jwelerry_description:
      'This elegant layered gold chain necklace features four strands of varying lengths, creating a sophisticated cascading effect.',
    jwelerry_details: [
      '22k Gold',
      'Four Layered Chains',
      'Lengths: 16, 18, 20, and 22 inches',
      'Total Weight: 18 grams',
      'Lobster Clasp Closure',
    ],
    jwelerry_category: 'Necklace',
    image_url: [
      'https://images.unsplash.com/photo-1599459183200-28c8a0644175?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    isNew: true,
  },
  {
    id: 3,
    jwelerry_name: 'Diamond Tennis Bracelet',
    jwelerry_price: '$2,499.99',
    jwelerry_description:
      'A classic diamond tennis bracelet featuring 36 round brilliant-cut diamonds set in 14k white gold.',
    jwelerry_details: [
      '14k White Gold',
      '36 Round Brilliant-Cut Diamonds (Total 3.6 carats)',
      'Length: 7 inches',
      'Double Safety Clasp',
      'Conflict-Free Diamonds',
    ],
    jwelerry_category: 'Bracelets',
    image_url: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    isNew: true,
  },
  {
    id: 4,
    jwelerry_name: 'Sapphire Stud Earrings',
    jwelerry_price: '$799.99',
    jwelerry_description:
      'Elegant sapphire stud earrings featuring round blue sapphires surrounded by a halo of small diamonds.',
    jwelerry_details: [
      '18k White Gold',
      '2 Round Blue Sapphires (Total 1.2 carats)',
      'Diamond Accents (Total 0.5 carats)',
      'Secure Screw Backs',
      'Handcrafted',
    ],
    jwelerry_category: 'Earrings',
    image_url: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1633810542706-90e5ff7557be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    ],
    isNew: false,
  },
];

const mockCategories: Category[] = [
  { id: 1, category: 'Necklace' },
  { id: 2, category: 'Earrings' },
  { id: 3, category: 'Rings' },
  { id: 4, category: 'Bracelets' },
];

export default ProductsPage;
