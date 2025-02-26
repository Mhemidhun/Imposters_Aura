'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-white'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-black text-white text-sm py-2 px-6 flex justify-end space-x-4">
          <a href="#" className="hover:underline">My Wishlist</a>
          {isLoggedIn ? (
            <button onClick={() => router.push('/account')} className="hover:underline">
              My Account
            </button>
          ) : (
            <button onClick={() => router.push('/login')} className="hover:underline">
              Login
            </button>
          )}
        </div>

        {/* Main Navbar */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <h1 className="text-2xl font-bold">IMPOSTER</h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-gray-700">Home</a>
            <a href="#" className="hover:text-gray-700">Shop</a>
          </div>

          {/* Icons & Menu */}
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 cursor-pointer hidden md:block" />

            {/* Cart Icon */}
            <div className="relative">
              <ShoppingBag className="w-6 h-6 cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden ml-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md py-4">
            <a href="/" className="block px-6 py-2 hover:bg-gray-100">Home</a>
            <a href="#" className="block px-6 py-2 hover:bg-gray-100">Shop</a>
          </div>
        )}
      </nav>

      {/* Push Content Down to Avoid Overlap */}
      <div className="pt-[80px]"></div>
    </>
  );
};

export default Navbar;
