"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/post", label: "Post" },
    { href: "/Create-Ad", label: "Create Ad" },
    { href: "/Contact", label: "Contact" },
    { href: "/Dashboard", label: "Dashboard" },
  ];

  return (
    <header className="w-full px-3 md:px-10 bg-black rounded-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        
        <h1 className="text-2xl font-bold text-blue-600">Blogify</h1>

        {/* Nav */}
        <nav
          className={`absolute md:static 
            left-5 top-[65px] w-[89%] 
            md:left-auto md:top-auto md:w-auto
            bg-white md:bg-transparent 
            text-black md:text-white 
            z-10 shadow-md md:shadow-none 
            flex flex-col md:flex-row 
            p-6 md:p-0 md:items-center 
            gap-4 md:gap-6 
            transition-all duration-300 
            ${
              menuOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible md:opacity-100 md:visible"
            }`}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition px-3 py-2 rounded-md ${
                pathname === item.href
                  ? "text-blue-600 font-semibold"
                  : "text-black md:text-white hover:text-blue-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
        </button>
      </div>
    </header>
  );
};

export default NavBar;
