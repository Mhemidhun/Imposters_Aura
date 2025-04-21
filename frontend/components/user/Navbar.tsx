"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaShoppingBag, FaBars } from "react-icons/fa";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (user) setUsername(user);
  }, []);

  return (
    <nav className="w-full bg-black py-10 px-6 z-50 fixed ">
      <div className="w-full border-t mt-[-15px] border-white-600 absolute left-0"></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10 flex-wrap">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>

        {/* Left Navigation (Responsive) */}
        <div className={`flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 bg-black px-2 w-full md:w-auto ${isMenuOpen ? "block" : "hidden"} md:flex`}>
          <Link href="/shop" className="text-white hover:text-orange-500 transition-colors font-medium">
            SHOP ALL
            <span className="ml-1">+</span>
          </Link>
          <button className="text-white hover:text-orange-500 transition-colors font-medium">
            ABOUT <span className="ml-1">+</span>
          </button>
        </div>

        {/* Logo (Centered) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bg-black px-8 z-20">
          <Link href="/">
            <Image src="/logoCrop.png" alt="Override Club" width={235} height={60} priority />
          </Link>
        </div>

        {/* Right Navigation (Responsive) */}
        <div className="flex items-center space-x-6 bg-black px-2">
          <button className="text-white hover:text-orange-500 transition-colors">
            <FaSearch size={18} />
          </button>

          {username ? (
            <span className="text-white font-medium">{username}</span>
          ) : (
            <Link href="/login" className="text-white hover:text-orange-500 transition-colors font-medium">
              LOGIN
            </Link>
          )}

          <Link href="/cart" className="text-white hover:text-orange-500 transition-colors">
            <FaShoppingBag size={20} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
