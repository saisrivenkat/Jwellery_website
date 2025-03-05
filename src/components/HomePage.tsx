import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductsPage from './ProductsPage';
import { ShoppingBag, Info, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'Ananya Sharma',
      location: 'Delhi',
      text: 'The craftsmanship of my necklace is exceptional. I\'ve received so many compliments, and it\'s become my favorite piece to wear for special occasions.',
      initial: 'A'
    },
    {
      name: 'Rajesh Patel',
      location: 'Mumbai',
      text: 'I purchased a pair of earrings for my wife\'s birthday, and she absolutely loves them. The quality is outstanding, and the design is truly unique.',
      initial: 'R'
    },
    {
      name: 'Priya Reddy',
      location: 'Bangalore',
      text: 'The attention to detail in my bracelet is remarkable. It\'s elegant yet durable, and I wear it almost every day. Truly worth the investment.',
      initial: 'P'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#1a0f00] via-[#3a2a1a] to-[#1a0f00] text-white">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-yellow-300 blur-3xl"></div>
          <div className="absolute top-[40%] right-[15%] w-32 h-32 rounded-full bg-amber-500 blur-3xl"></div>
          <div className="absolute bottom-[20%] left-[25%] w-40 h-40 rounded-full bg-yellow-200 blur-3xl"></div>
        </div>
        
        <Navbar BackgroundclassName="bg-transparent" />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium mb-4">
                Handcrafted Excellence Since 1995
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight">
                Where <span className="text-amber-300">Elegance</span> Meets <span className="text-amber-300">Artistry</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-lg mx-auto md:mx-0">
                Discover our collection of timeless jewelry pieces, each telling a unique story of craftsmanship and beauty.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  to="/products" 
                  className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 px-8 rounded-md hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-medium shadow-lg"
                >
                  Explore Collection
                </Link>
                <Link 
                  to="/about" 
                  className="inline-block bg-white/10 backdrop-blur-sm text-white border border-white/30 py-3 px-8 rounded-md hover:bg-white/20 transition-colors font-medium"
                >
                  Our Story
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative max-w-2xl mx-auto">
                {/* Main image with floating effect */}
                <div className="relative z-10 animate-float">
                  <img 
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                    alt="Elegant gold necklace" 
                    className="rounded-lg shadow-2xl object-cover w-full aspect-[4/3]"
                  />
                  
                  {/* Decorative frame */}
                  <div className="absolute inset-0 border-8 border-amber-300/20 rounded-lg"></div>
                </div>
                
                {/* Floating accent images */}
                <div className="absolute -bottom-10 -left-10 z-20 animate-float-delay">
                  <img 
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                    alt="Gemstone detail" 
                    className="rounded-lg w-32 h-32 object-cover shadow-xl border-4 border-white"
                  />
                </div>
                
                <div className="absolute -top-8 -right-8 z-20 animate-float-slow">
                  <img 
                    src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                    alt="Diamond bracelet" 
                    className="rounded-lg w-28 h-28 object-cover shadow-xl border-4 border-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile banner image (visible only on small screens) */}
        <div className="md:hidden px-4 pb-12 relative z-10">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Elegant gold necklace" 
              className="rounded-lg shadow-xl object-cover w-full aspect-[4/3]"
            />
            <div className="absolute -bottom-4 -right-4">
              <img 
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Gemstone detail" 
                className="rounded-lg w-20 h-20 object-cover shadow-lg border-2 border-white"
              />
            </div>
          </div>
        </div>
        
        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* About Section Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-[#1a0f00] mb-4">About Sai Pranav Jwellery</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Since 1995, Sai Pranav Jwellery has been crafting exquisite jewelry pieces that combine traditional 
                craftsmanship with contemporary design. Our master artisans create each piece with meticulous attention 
                to detail, ensuring that every gem is perfectly set and every design is flawlessly executed.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center text-[#1a0f00] font-medium hover:underline"
              >
                Learn more about our story
                <Info size={16} className="ml-2" />
              </Link>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded shadow-sm text-center">
                  <h3 className="text-2xl font-serif text-[#1a0f00] mb-2">25+</h3>
                  <p className="text-gray-600">Years of Excellence</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm text-center">
                  <h3 className="text-2xl font-serif text-[#1a0f00] mb-2">1000+</h3>
                  <p className="text-gray-600">Unique Designs</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm text-center">
                  <h3 className="text-2xl font-serif text-[#1a0f00] mb-2">5000+</h3>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm text-center">
                  <h3 className="text-2xl font-serif text-[#1a0f00] mb-2">12</h3>
                  <p className="text-gray-600">Expert Artisans</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <ProductsPage showMorevisible={true} />

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-[#1a0f00]">What Our Customers Say</h2>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Carousel Navigation */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-[#1a0f00] transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-[#1a0f00] transition-colors z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>

            {/* Testimonial Cards */}
            <div className="overflow-hidden">
              <div 
                className="transition-transform duration-500 ease-in-out flex"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-[#1a0f00] rounded-full flex items-center justify-center text-white font-serif text-xl">
                          {testimonial.initial}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentTestimonial === index ? 'bg-[#1a0f00]' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-[#1a0f00] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-6">Have Questions About Our Collection?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our jewelry experts are ready to assist you in finding the perfect piece or answering any questions about our craftsmanship and materials.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center bg-white text-[#1a0f00] py-3 px-8 rounded-md hover:bg-gray-200 transition-colors font-medium"
          >
            Contact Us
            <Phone size={16} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;