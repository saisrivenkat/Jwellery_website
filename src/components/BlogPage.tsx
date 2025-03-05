import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const BlogPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The History of Gold Jewelry Through the Ages",
      excerpt: "Explore the fascinating journey of gold jewelry from ancient civilizations to modern designs.",
      date: "July 14, 2023",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      author: "Priya Sharma"
    },
    {
      id: 2,
      title: "How to Choose the Perfect Diamond",
      excerpt: "Learn about the 4Cs of diamonds and how to select the ideal stone for your jewelry.",
      date: "July 15, 2023",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      author: "Rahul Verma"
    },
    {
      id: 3,
      title: "Caring for Your Precious Jewelry",
      excerpt: "Essential tips and best practices to maintain the beauty and longevity of your jewelry collection.",
      date: "June 28, 2023",
      image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      author: "Ananya Patel"
    },
    {
      id: 4,
      title: "Gemstone Meanings and Properties",
      excerpt: "Discover the symbolic meanings and healing properties associated with different gemstones.",
      date: "June 15, 2023",
      image: "https://images.unsplash.com/photo-1633810542706-90e5ff7557be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      author: "Vikram Singh"
    },
    {
      id: 5,
      title: "Wedding Jewelry Traditions Around the World",
      excerpt: "Explore the diverse and beautiful wedding jewelry customs from different cultures and countries.",
      date: "May 30, 2023",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      author: "Meera Kapoor"
    },
    {
      id: 6,
      title: "Jewelry Investment Guide",
      excerpt: "Tips for investing in jewelry that will retain or increase in value over time.",
      date: "May 12, 2023",
      image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      author: "Arjun Mehta"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar BackgroundclassName="bg-[#1a0f00]" />
      
      <section className="py-16 bg-white flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif text-[#1a0f00] mb-4">Our Blog</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the latest trends, jewelry care tips, and stories behind our collections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>By {post.author}</span>
                  </div>
                  <h2 className="text-xl font-medium text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <a 
                    href={`/blog/${post.id}`} 
                    className="text-[#1a0f00] font-medium hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow-sm">
              <a 
                href="#" 
                className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Previous
              </a>
              <a 
                href="#" 
                className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-[#1a0f00]"
              >
                1
              </a>
              <a 
                href="#" 
                className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                2
              </a>
              <a 
                href="#" 
                className="px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Next
              </a>
            </nav>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogPage;