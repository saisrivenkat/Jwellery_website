import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar BackgroundclassName="bg-[#1a0f00]" />
      
      <section className="py-16 bg-white flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif text-[#1a0f00] mb-8 text-center">Our Story</h1>
            
            <div className="mb-12">
              <img 
                src="https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
                alt="Jewelry workshop" 
                className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
              />
              
              <h2 className="text-2xl font-serif text-[#1a0f00] mb-4">Our Heritage</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Founded in 1995, Sai Pranav Jwellery began as a small family workshop with a passion for creating beautiful, handcrafted jewelry. What started as a modest endeavor has grown into a respected name in the jewelry industry, known for exceptional craftsmanship and timeless designs.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                For over 25 years, we have maintained our commitment to quality and artistry, blending traditional techniques with contemporary aesthetics to create pieces that are both classic and modern.
              </p>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-serif text-[#1a0f00] mb-4">Our Craftsmanship</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Each piece of jewelry at Sai Pranav is meticulously crafted by our team of skilled artisans, many of whom have been with us for decades. Our craftsmen combine traditional techniques passed down through generations with modern technology to create jewelry of exceptional quality.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We source only the finest materials – ethically mined gemstones, certified diamonds, and precious metals of the highest purity. Every stone is carefully selected for its color, clarity, and cut, ensuring that each piece meets our exacting standards.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <img 
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Jewelry crafting" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Gemstone selection" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-serif text-[#1a0f00] mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-[#1a0f00] mb-3">Quality</h3>
                  <p className="text-gray-700">
                    We never compromise on the quality of our materials or craftsmanship, ensuring that each piece will be treasured for generations.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-[#1a0f00] mb-3">Integrity</h3>
                  <p className="text-gray-700">
                    We are committed to ethical sourcing and transparent business practices in all aspects of our operation.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium text-[#1a0f00] mb-3">Innovation</h3>
                  <p className="text-gray-700">
                    While respecting tradition, we continuously explore new designs and techniques to create jewelry that is both timeless and contemporary.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif text-[#1a0f00] mb-4">Our Promise</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                At Sai Pranav Jwellery, we promise to provide you with jewelry that not only enhances your beauty but also tells a story. Each piece is created with love and attention to detail, designed to be worn and cherished for years to come.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We invite you to explore our collection and experience the artistry and elegance that defines Sai Pranav Jwellery.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;