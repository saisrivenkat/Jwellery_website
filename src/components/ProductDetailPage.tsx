import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { supabase, isSupabaseConnected } from '../SupabaseClient';
import { Jewelry } from '../types';
import Navbar from './Navbar';
import Footer from './Footer';

// Mock data for fallback
const mockJewelryItems: Jewelry[] = [
  {
    id: 1,
    jwelerry_name: "Emerald Statement Necklace",
    jwelerry_price: "$1,299.99",
    jwelerry_description: "This stunning emerald statement necklace features seven oval-cut emeralds set in 18k gold. Each emerald is surrounded by a halo of small diamonds, creating a luxurious and eye-catching piece. The necklace is designed with a delicate gold chain that complements the bold emerald centerpieces. Perfect for special occasions or to add elegance to any outfit.",
    jwelerry_details: [
      "18k Gold Setting",
      "Seven Oval-Cut Emeralds (Total 5.2 carats)",
      "Diamond Accents (Total 1.8 carats)",
      "Adjustable Chain Length: 16-18 inches",
      "Handcrafted in India"
    ],
    jwelerry_category: "Necklace",
    image_url: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608042314453-ae338d80c427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    isNew: true
  },
  {
    id: 2,
    jwelerry_name: "Layered Gold Chain Necklace",
    jwelerry_price: "$899.99",
    jwelerry_description: "This elegant layered gold chain necklace features four strands of varying lengths, creating a sophisticated cascading effect. Crafted from 22k gold, each chain has a different texture and thickness, adding depth and visual interest. The necklace can be worn with formal attire or to elevate a casual look. The secure clasp ensures comfortable all-day wear.",
    jwelerry_details: [
      "22k Gold",
      "Four Layered Chains",
      "Lengths: 16, 18, 20, and 22 inches",
      "Total Weight: 18 grams",
      "Lobster Clasp Closure"
    ],
    jwelerry_category: "Necklace",
    image_url: [
      "https://images.unsplash.com/photo-1599459183200-28c8a0644175?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    isNew: true
  },
  {
    id: 3,
    jwelerry_name: "Diamond Tennis Bracelet",
    jwelerry_price: "$2,499.99",
    jwelerry_description: "A classic diamond tennis bracelet featuring 36 round brilliant-cut diamonds set in 14k white gold. Each diamond is individually set in a four-prong setting, allowing maximum light to enhance the brilliance of each stone. The bracelet features a secure double safety clasp to prevent loss.",
    jwelerry_details: [
      "14k White Gold",
      "36 Round Brilliant-Cut Diamonds (Total 3.6 carats)",
      "Length: 7 inches",
      "Double Safety Clasp",
      "Conflict-Free Diamonds"
    ],
    jwelerry_category: "Bracelets",
    image_url: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    isNew: true
  },
  {
    id: 4,
    jwelerry_name: "Sapphire Stud Earrings",
    jwelerry_price: "$799.99",
    jwelerry_description: "Elegant sapphire stud earrings featuring round blue sapphires surrounded by a halo of small diamonds. The deep blue color of the sapphires is complemented by the sparkle of the diamonds, creating a timeless and sophisticated look.",
    jwelerry_details: [
      "18k White Gold",
      "2 Round Blue Sapphires (Total 1.2 carats)",
      "Diamond Accents (Total 0.5 carats)",
      "Secure Screw Backs",
      "Handcrafted"
    ],
    jwelerry_category: "Earrings",
    image_url: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1633810542706-90e5ff7557be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    ],
    isNew: false
  }
];

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Jewelry | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    // Check Supabase connection first
    const checkConnection = async () => {
      const connected = await isSupabaseConnected();
      setIsConnected(connected);
      return connected;
    };

    async function fetchProduct() {
      try {
        if (!id) return;
        
        // Check connection first
        const connected = await checkConnection();
        
        // If connection is not available, use mock data
        if (!connected) {
          const mockProduct = mockJewelryItems.find(item => item.id === parseInt(id));
          if (mockProduct) {
            setProduct(mockProduct);
          }
          return;
        }
        
        const { data, error } = await supabase.from('jwelerry').select('*').eq('id', parseInt(id));
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setProduct(data[0] as Jewelry);
        } else {
          // Fallback to mock data if product not found
          const mockProduct = mockJewelryItems.find(item => item.id === parseInt(id));
          if (mockProduct) {
            setProduct(mockProduct);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        // Fallback to mock data if Supabase connection fails
        const mockProduct = mockJewelryItems.find(item => item.id === parseInt(id));
        if (mockProduct) {
          setProduct(mockProduct);
        }
        setIsConnected(false);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
    // Reset image index when product changes
    setCurrentImageIndex(0);
  }, [id]);

  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.image_url.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.image_url.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a0f00]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="bg-[#1a0f00] text-white py-2 px-6 rounded-md hover:bg-[#3a2a1a] transition-colors">
            Browse All Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Process image URLs to handle both direct URLs and Supabase storage paths
  const processedImages = product.image_url.map(url => 
    url.startsWith('http') 
      ? url 
      : `https://zoisqpjdagwrmfzniotl.supabase.co/storage/v1/object/public/${url}`
  );

  // Convert string details to array if needed
  const detailsArray = Array.isArray(product.jwelerry_details) 
    ? product.jwelerry_details 
    : typeof product.jwelerry_details === 'string'
      ? product.jwelerry_details.split('\n').filter(item => item.trim() !== '')
      : [];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Navbar />

      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link to="/products" className="flex items-center text-gray-600 hover:text-[#1a0f00]">
          <ArrowLeft size={20} className="mr-1" />
          <span>Back to Products</span>
        </Link>
        
        {isConnected === false && (
          <p className="text-sm text-gray-500 mt-2">
            Showing demo product. Connect to Supabase for live data.
          </p>
        )}
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-2 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img 
                src={processedImages[currentImageIndex]} 
                alt={product.jwelerry_name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Image Navigation - Improved for Mobile */}
            <div className="flex justify-center items-center gap-4 my-4">
              <button 
                onClick={prevImage}
                className="bg-[#1a0f00] text-white rounded-full p-3 shadow-md hover:bg-[#3a2a1a] transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="text-sm text-gray-500">
                {currentImageIndex + 1} / {processedImages.length}
              </div>
              
              <button 
                onClick={nextImage}
                className="bg-[#1a0f00] text-white rounded-full p-3 shadow-md hover:bg-[#3a2a1a] transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Thumbnail Navigation */}
            {processedImages.length > 1 && (
              <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                {processedImages.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-[#1a0f00]' : 'opacity-70'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.jwelerry_name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            {product.isNew && (
              <div className="inline-block bg-[#1a0f00] text-white text-xs px-3 py-1 rounded-full mb-2">
                New
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-serif mb-2">{product.jwelerry_name}</h1>
            <p className="text-xl md:text-2xl font-semibold text-[#1a0f00] mb-4">{product.jwelerry_price}</p>
            
            <div className="border-t border-b border-gray-200 py-6 my-6">
              <h2 className="text-lg font-medium mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{product.jwelerry_description}</p>
              
              {detailsArray.length > 0 && (
                <>
                  <h2 className="text-lg font-medium mb-3">Product Details</h2>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {detailsArray.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            
            <div className="text-sm text-gray-500">
              <p>Category: {product.jwelerry_category}</p>
              <p>Product ID: {product.id}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProductDetailPage;