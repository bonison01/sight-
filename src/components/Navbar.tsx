import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import { useCart } from '@/hooks/useCartContext';
import CartSidebar from './CartSidebar';
import ProfileDropdown from './ProfileDropdown';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const handleCartClick = () => setCartOpen(true);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* 🔵 Healthcare-Themed Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Left: Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/lovable-uploads/logo-blue.png"
                  alt="VisionWell Logo"
                  className="h-10 w-auto"
                />
                <span className="hidden md:block text-white text-xl font-semibold tracking-wide">
                  Safe<span className="text-blue-200">Sight</span>
                </span>
              </Link>
            </div>

            {/* Right: Nav Links + Icons */}
            <div className="flex items-center space-x-6">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-white hover:text-blue-100 px-3 py-2 text-sm font-medium transition-colors duration-300 hover:bg-blue-700/50 rounded-md"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Cart Button */}
              <button
                onClick={handleCartClick}
                className="relative p-2 text-white hover:text-blue-100 hover:bg-blue-700/60 transition-all duration-300 rounded-full transform hover:scale-110"
                aria-label="Open cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              <ProfileDropdown />

              {/* Mobile Menu Toggle */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-white hover:text-blue-100 p-2 hover:bg-blue-700/60 transition-colors rounded-md"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden transition-all duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900 shadow-lg border-t border-blue-600">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className="block text-white hover:text-blue-100 px-3 py-2 text-base font-medium hover:bg-blue-700/50 transition-colors rounded-md"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
