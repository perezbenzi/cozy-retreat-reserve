import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="text-primary-foreground bg-zinc-950">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - About */}
          <div>
            <h4 className="font-medium text-lg mb-4">TravelStay</h4>
            <p className="text-primary-foreground/80 text-sm">
              Experience comfortable and affordable accommodation in the heart of the city. 
              Perfect for travelers seeking community, comfort, and convenience.
            </p>
          </div>
          
          {/* Column 2 - Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>123 Traveler Street, Downtown, City 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>info@travelstay.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>Reception: 24/7</span>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Quick Links */}
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-primary-foreground/80 text-sm">
              <li>
                <Link to="/rooms" className="hover:text-primary-foreground transition-colors">
                  Our Rooms
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-primary-foreground transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="font-medium text-lg mb-4">Newsletter</h4>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Subscribe to receive updates on special offers and events.
            </p>
            <div className="flex">
              <input type="email" placeholder="Your email address" className="py-2 px-3 rounded-l-md text-foreground w-full focus:outline-none" />
              <button className="px-4 rounded-r-md transition-colors text-zinc-50 bg-neutral-950 hover:bg-neutral-800">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-6 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/70">
          <p>&copy; {currentYear} TravelStay Hostel. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;