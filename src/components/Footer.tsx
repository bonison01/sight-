import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950 text-blue-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/lovable-uploads/logo-blue.png"
                alt="VisionWell Clinic"
                className="h-10 w-auto mr-3"
                loading="lazy"
              />
              <span className="text-2xl font-bold text-white">
                Vision<span className="text-blue-300">Well</span>
              </span>
            </div>

            <p className="text-blue-100 mb-6 max-w-md">
              VisionWell is committed to providing the best in vision care — from premium lenses to expert eye check-ups. 
              Helping you see life more clearly, every day.
            </p>

            <div className="flex space-x-5 mt-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-blue-200 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-blue-200 hover:text-white transition-colors">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Patient Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Patient Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  Eye Health Tips
                </a>
              </li>
              <li>
                <Link to="/admin/login" className="text-blue-200 hover:text-white transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 mt-10 pt-8 text-center">
          <p className="text-blue-200 text-sm">
            © 2025 VisionWell Clinic. All rights reserved.
          </p>
          <p className="text-blue-400 text-xs mt-1">
            Designed with care for better vision and a brighter future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
