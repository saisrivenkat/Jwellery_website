import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  BackgroundclassName?: string;
}

const Navbar: React.FC<NavbarProps> = ({ BackgroundclassName = "bg-[#1a0f00]" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${BackgroundclassName} text-white relative z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl md:text-2xl font-serif">
            Sai Pranav Jwellery
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-amber-200 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-amber-200 transition-colors">
              About
            </Link>
            <Link to="/products" className="text-white hover:text-amber-200 transition-colors">
              Products
            </Link>
            <Link to="/blog" className="text-white hover:text-amber-200 transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-white hover:text-amber-200 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full hover:bg-[#3a2a1a] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`
        md:hidden fixed inset-0 bg-[#1a0f00] z-40 transform transition-transform duration-300 ease-in-out
        ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col p-8 space-y-6">
          <Link 
            to="/" 
            className="text-2xl font-serif text-white hover:text-amber-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-2xl font-serif text-white hover:text-amber-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            to="/products" 
            className="text-2xl font-serif text-white hover:text-amber-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Products
          </Link>
          <Link 
            to="/blog" 
            className="text-2xl font-serif text-white hover:text-amber-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className="text-2xl font-serif text-white hover:text-amber-200 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;