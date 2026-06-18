import { Link } from 'wouter';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#001F3F] to-[#000814] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/manus-storage/genius-logo-shield-cropped_9229f373.png" 
                alt="The Genius Institute" 
                className="h-16 w-16"
              />
              <span className="font-merriweather text-lg font-bold text-[#D4AF37]">The Genius Institute</span>
            </div>
            <p className="text-gray-300 text-sm">
              AI-powered learning platform for Heritage-Based Curriculum education across Zimbabwe and SADC.
            </p>
            <p className="text-[#D4AF37] text-sm font-semibold mt-2">Aim Higher In Christ.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-merriweather text-lg font-bold mb-4 text-[#D4AF37]">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">Courses</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">Pricing</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">About</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="font-merriweather text-lg font-bold mb-4 text-[#D4AF37]">Subjects</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-300">Mathematics</li>
              <li className="text-gray-300">Science</li>
              <li className="text-gray-300">Chemistry</li>
              <li className="text-gray-300">Physics</li>
              <li className="text-gray-300">Agriculture</li>
              <li className="text-gray-300">Commerce</li>
            </ul>
            <p className="text-gray-400 text-xs mt-3">Primary to A-Level</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-merriweather text-lg font-bold mb-4 text-[#D4AF37]">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone size={18} className="text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide">Phone</p>
                  <a
                    href="tel:+263788335945"
                    className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm font-semibold"
                  >
                    +263 788 335945
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail size={18} className="text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide">Email</p>
                  <a
                    href="mailto:hello@thegeniusinstitute.co.zw"
                    className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm font-semibold break-all"
                  >
                    hello@thegeniusinstitute.co.zw
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wide">Location</p>
                  <p className="text-gray-300 text-sm font-semibold">Harare, Zimbabwe</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} The Genius Institute. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
