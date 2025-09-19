import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: 'https://github.com/mahadkhan', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/mahadkhan', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:mahadkhan2095@gmail.com', label: 'Email' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Mahad Khan</h3>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                AI-powered web developer creating innovative digital solutions that combine 
                traditional development skills with cutting-edge artificial intelligence.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                    aria-label={link.label}
                  >
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">
                    About Me
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-3">
                <li className="text-gray-300">Web Development</li>
                <li className="text-gray-300">AI Integration</li>
                <li className="text-gray-300">Prompt Engineering</li>
                <li className="text-gray-300">E-commerce Solutions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              <span>Made by Mahad Khan © {currentYear}</span>
            </div>
            
            <button
              onClick={scrollToTop}
              className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;