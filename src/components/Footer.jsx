import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-6"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brend va haqida */}
          <div>
            <h3 className="text-xl font-bold mb-4">Samos</h3>
            <p className="text-gray-200">
              Samos - bu zamonaviy ijtimoiy tarmoq platformasi. Do‘stlaringiz bilan bog‘laning,
              yangiliklaringizni ulashing va real vaqtda muloqot qiling.
            </p>
          </div>

          {/* Tez havolalar */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-200 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-200 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Aloqa ma'lumotlari */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-200">Email: support@samos.com</p>
            <p className="text-gray-200">Phone: +998 93 300 77 09</p>
            <p className="text-gray-200">Address: Tashkent, Uzbekistan</p>
          </div>
        </div>

        {/* Pastki qism */}
        <div className="mt-8 border-t border-blue-500 pt-4 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} Samos. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;