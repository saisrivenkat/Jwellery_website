import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 19.0760, // Latitude for Mumbai
  lng: 72.8777, // Longitude for Mumbai
};

const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar BackgroundclassName="bg-[#1a0f00]" />
      
      <section className="py-16 bg-white flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif text-[#1a0f00] mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have a question about our products, 
              need assistance with an order, or want to schedule a consultation, our team is here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-serif text-[#1a0f00] mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-[#1a0f00] p-3 rounded-full text-white mr-4">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      123 Jewelry Lane, Diamond District<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#1a0f00] p-3 rounded-full text-white mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                    <p className="text-gray-600">+91 12345 67890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#1a0f00] p-3 rounded-full text-white mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@saipranavjwellery.com</p>
                    <p className="text-gray-600">support@saipranavjwellery.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-[#1a0f00] p-3 rounded-full text-white mr-4">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 11:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif text-[#1a0f00] mb-6">Send Us a Message</h2>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                    placeholder="Product Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="bg-[#1a0f00] text-white py-2 px-6 rounded-md hover:bg-[#3a2a1a] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-serif text-[#1a0f00] mb-6 text-center">Visit Our Store</h2>
            <div className="bg-gray-200 h-96 rounded-lg overflow-hidden">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;