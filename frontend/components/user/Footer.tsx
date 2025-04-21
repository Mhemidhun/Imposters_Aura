"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  // Show/hide scroll button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300); // Show after 300px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white py-10 border-t relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left Section - Brand */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">OVERRIDE CLUB</h2>
            <p className="text-gray-500 mt-2">
              Override Club is a very slick and clean eCommerce template.
            </p>
            {/* Social Media Icons */}
            <div className="flex mt-3 space-x-3 text-gray-500">
              <Twitter className="w-5 h-5 cursor-pointer hover:text-black" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-black" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-black" />
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold text-black mb-2">Information</h3>
              <ul className="text-gray-500 space-y-1">
                <li><Link href="#">Our stores</Link></li>
                <li><Link href="#">About us</Link></li>
                <li><Link href="#">Business with us</Link></li>
                <li><Link href="#">Delivery information</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-2">Account</h3>
              <ul className="text-gray-500 space-y-1">
                <li><Link href="#">My account</Link></li>
                <li><Link href="#">Wishlist</Link></li>
                <li><Link href="#">Order history</Link></li>
                <li><Link href="#">Specials</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-2">Useful Links</h3>
              <ul className="text-gray-500 space-y-1">
                <li><Link href="#">Shipping Policy</Link></li>
                <li><Link href="#">Stores</Link></li>
                <li><Link href="#">Returns</Link></li>
                <li><Link href="#">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-black mb-2">Service</h3>
              <ul className="text-gray-500 space-y-1">
                <li><Link href="#">Support</Link></li>
                <li><Link href="#">Warranty</Link></li>
                <li><Link href="#">FAQ</Link></li>
                <li><Link href="#">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t pt-6 text-center text-gray-500 text-sm">
          © 2025 OVERRIDE CLUB | Made by Your Team
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-md hover:bg-gray-800 transition"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
