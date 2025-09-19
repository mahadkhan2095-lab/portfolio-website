import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Sparkles, Code } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [settings, setSettings] = useState({
    name: 'Mahad Khan',
    githubUrl: 'https://github.com/mahadkhan',
    linkedinUrl: 'https://linkedin.com/in/mahadkhan'
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/settings');
        if (response.ok) {
          const data = await response.json();
          const settings = data.settings || data;
          setSettings({
            name: settings.name || 'Mahad Khan',
            githubUrl: settings.githubUrl || 'https://github.com/mahadkhan',
            linkedinUrl: settings.linkedinUrl || 'https://linkedin.com/in/mahadkhan'
          });
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: settings.githubUrl, label: 'GitHub' },
    { icon: Linkedin, href: settings.linkedinUrl, label: 'LinkedIn' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 relative overflow-hidden ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-indigo-900/80 backdrop-blur-sm'
    }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
        <div className="absolute top-4 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping" />
        <div className="absolute bottom-2 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 group">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                isScrolled ? 'bg-blue-100 text-blue-600' : 'bg-white/10 text-white'
              }`}>
                <Code className="w-5 h-5" />
              </div>
              <h1 className={`text-2xl font-bold transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'text-gray-900' : 'bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'
              }`}>
                {settings.name}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`group relative text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-gray-200 hover:text-white hover:bg-white/10'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{item.label}</span>
                <div className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-blue-600' : 'bg-white'
                }`} />
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400/10 to-purple-400/10" />
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                  isScrolled 
                    ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                aria-label={link.label}
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <link.icon size={18} className="relative z-10" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400/20 to-purple-400/20" />
                <div className={`absolute -inset-1 rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300 ${
                  isScrolled ? 'bg-blue-400' : 'bg-white'
                }`} />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`group md:hidden p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
              isScrolled ? 'text-gray-700 hover:bg-blue-50' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            <div className="relative">
              {isMenuOpen ? <X size={24} className="group-hover:rotate-90 transition-transform duration-300" /> : <Menu size={24} className="group-hover:rotate-12 transition-transform duration-300" />}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400/10 to-purple-400/10" />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex space-x-4 pt-4 border-t border-gray-100">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    aria-label={link.label}
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;