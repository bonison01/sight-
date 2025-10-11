
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-12 bg-gradient-to-r from-green-800 to-green-900 text-green-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/logo white.png" 
                alt="Googoo Foods" 
                className="h-10 w-auto mr-3"
                loading="lazy"
              />
              {/* <span className="text-2xl font-bold text-white">mateng</span> */}
              {/* <span className="text-2xl font-bold text-green-200 ml-1">Foods</span> */}
            </div>
            <p className="text-green-100 mb-4 max-w-md">
              Connecting with the love ones.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="text-green-100 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-green-100 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="text-green-100 hover:text-white transition-colors">Shop</Link></li>
              {/* <li><Link to="/reviews" className="text-green-100 hover:text-white transition-colors">Reviews</Link></li> */}
              <li><Link to="/contact" className="text-green-100 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-green-100 hover:text-white transition-colors">Track Order</a></li>
              <li><Link to="/admin/login" className="text-green-100 hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-500 mt-8 pt-8 text-center">
          <p className="text-green-100">
            © 2025 Mateng. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
