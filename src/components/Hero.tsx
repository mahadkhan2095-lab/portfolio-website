import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const [settings, setSettings] = useState({
    name: 'Mahad Khan',
    heroTitle: 'AI-Powered Web Developer',
    heroSubtitle: 'I craft exceptional web experiences using cutting-edge AI and intelligent prompt engineering',
    projectsDelivered: '2',
    experience: '0-1',
    clientSatisfaction: '100%'
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/settings');
        if (response.ok) {
          const data = await response.json();
          const settings = data.settings || data;
          setSettings({
            name: settings.name || 'Mahad Khan',
            heroTitle: settings.heroTitle || 'AI-Powered Web Developer',
            heroSubtitle: settings.heroSubtitle || 'I craft exceptional web experiences using cutting-edge AI and intelligent prompt engineering',
            projectsDelivered: settings.projectsDelivered || '2',
            experience: settings.experience || '0-1',
            clientSatisfaction: settings.clientSatisfaction || '100%'
          });
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/90 to-indigo-900/90"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      
      {/* Additional Floating Code Elements */}
      <div className="absolute top-32 right-32 text-blue-300/30 text-6xl font-mono animate-bounce" style={{animationDelay: '0.5s'}}>{'<>'}</div>
      <div className="absolute bottom-32 left-32 text-purple-300/30 text-4xl font-mono animate-bounce" style={{animationDelay: '1s'}}>{'{ }'}</div>
      <div className="absolute top-1/3 left-16 text-indigo-300/30 text-5xl font-mono animate-bounce" style={{animationDelay: '1.5s'}}>{'</>'}</div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm font-medium text-white">{settings.heroTitle}</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {settings.name}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 font-light max-w-3xl mx-auto leading-relaxed">
              {settings.heroSubtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto leading-relaxed">
            Specializing in modern web development with AI integration, I help businesses transform their ideas into 
            powerful digital solutions that engage users and drive results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 relative z-10">
            <a
              href="#projects"
              className="group relative bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-full" />
              <span className="flex items-center relative z-10">
                View My Work
                <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 group-hover:animate-bounce transition-transform duration-300" />
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />
            </a>
            <button
              onClick={() => window.location.hash = '#/order-site'}
              className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center">
                Order Your Site
                <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse group-hover:animate-ping" />
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping group-hover:animate-bounce" />
            </button>
            <a
              href="#contact"
              className="group relative bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
              <span className="relative z-10 flex items-center">
                Get In Touch
                <div className="ml-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
              </span>
              <div className="absolute -inset-1 bg-white rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto relative z-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{settings.projectsDelivered}</div>
              <div className="text-blue-200 text-sm">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{settings.experience}</div>
              <div className="text-blue-200 text-sm">Year Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{settings.clientSatisfaction}</div>
              <div className="text-blue-200 text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;