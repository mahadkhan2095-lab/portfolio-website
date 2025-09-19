import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Monitor, Code, Palette, X, ZoomIn, Sparkles, Zap, Brain } from 'lucide-react';

const PortfolioProject = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showSourceCode, setShowSourceCode] = useState(false);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Design',
      description: 'Built with AI assistance for optimal user experience and modern design patterns.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with Vite build tool and modern React architecture.'
    },
    {
      icon: Code,
      title: 'Clean Architecture',
      description: 'Well-structured TypeScript code with component-based architecture and best practices.'
    },
    {
      icon: Palette,
      title: 'Modern UI/UX',
      description: 'Beautiful design with Tailwind CSS, smooth animations, and responsive layout.'
    }
  ];

  const techStack = [
    { name: 'React 18', category: 'Frontend Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Vite', category: 'Build Tool' },
    { name: 'Lucide React', category: 'Icons' },
    { name: 'ESLint', category: 'Code Quality' },
    { name: 'PostCSS', category: 'CSS Processing' },
    { name: 'Responsive Design', category: 'Mobile-First' }
  ];

  const projectImages = [
    {
      src: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
      alt: 'Portfolio Website - Desktop View',
      title: 'Desktop View'
    },
    {
      src: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      alt: 'Portfolio Website - Mobile View',
      title: 'Mobile View'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <a 
              href="/#projects" 
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </a>
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Website</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">AI-Powered Portfolio</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Modern Portfolio Website
              </h1>
              
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                A cutting-edge portfolio website showcasing AI-powered web development skills with modern 
                technologies, responsive design, and exceptional user experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/"
                  className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors duration-300 flex items-center justify-center"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Live Demo
                </a>
                <button
                  onClick={() => setShowSourceCode(true)}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-300 flex items-center justify-center"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View Source Code
                </button>
              </div>
            </div>
            
            <div className="relative cursor-pointer group" onClick={() => setSelectedImage('https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800')}>
              <img
                src="https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800"
                alt="Portfolio Website Preview"
                className="rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                <ZoomIn className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
                <div className="text-indigo-600 font-bold text-lg">Live</div>
                <div className="text-gray-600 text-sm">Website</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Overview</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This portfolio website represents the perfect blend of modern web development and AI-powered design, 
              showcasing technical expertise and creative vision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-indigo-100 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Technical Details */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Development Approach</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. AI-Assisted Planning</h3>
                  <p className="text-gray-600">
                    Leveraged AI tools for optimal component architecture, user experience design, and content strategy.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Modern Tech Stack</h3>
                  <p className="text-gray-600">
                    Built with React 18, TypeScript, and Vite for optimal performance and developer experience.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Responsive Design</h3>
                  <p className="text-gray-600">
                    Mobile-first approach with Tailwind CSS ensuring perfect display across all devices.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Performance Optimization</h3>
                  <p className="text-gray-600">
                    Optimized loading times, smooth animations, and efficient code splitting for best user experience.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technologies Used</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <div className="space-y-4">
                  {techStack.map((tech, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-b-0">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                        <span className="text-gray-900 font-medium">{tech.name}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{tech.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Fully responsive design</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">AI-powered content and design</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Modern animations and interactions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">SEO optimized and accessible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Live Website</h2>
          <p className="text-xl text-indigo-100 mb-8">
            See this portfolio in action and explore all its features and capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors duration-300"
            >
              View Live Demo
            </a>
            <a
              href="/#contact"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-300"
            >
              Hire Me for Similar Work
            </a>
          </div>
        </div>
      </section>

      {/* Source Code Modal */}
      {showSourceCode && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowSourceCode(false)}>
          <div className="relative w-full max-w-4xl max-h-full bg-gray-900 rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-white text-lg font-semibold">Portfolio Source Code Preview</h3>
              <button
                onClick={() => setShowSourceCode(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-green-400 text-sm mb-2">// React Component Structure</div>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-900...">
      <div className="max-w-6xl mx-auto px-4...">
        {/* Hero content */}
      </div>
    </section>
  );
};`}
                  </pre>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-blue-400 text-sm mb-2">// TypeScript Interface</div>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`interface ProjectFeature {
  icon: React.ComponentType;
  title: string;
  description: string;
}

interface TechStack {
  name: string;
  category: string;
}`}
                  </pre>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-yellow-400 text-sm mb-2">// Tailwind CSS Classes</div>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`className="bg-gradient-to-br from-indigo-600 to-purple-800 
           text-white py-20 px-4 sm:px-6 lg:px-8
           hover:scale-105 transition-transform duration-300
           rounded-xl shadow-lg"`}
                  </pre>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-purple-400 text-sm mb-2">// Vite Configuration</div>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Additional configurations...
})`}
                  </pre>
                </div>
              </div>
              <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-yellow-400 font-medium">Privacy Notice</span>
                </div>
                <p className="text-gray-300 text-sm">
                  This is a preview showing code structure and patterns. Complete source code is available 
                  for serious inquiries and potential collaborations.
                </p>
              </div>
              <div className="mt-4 flex gap-3">
                <button 
                  onClick={() => setShowSourceCode(false)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  Close Preview
                </button>
                <a 
                  href="/#contact"
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                >
                  Request Full Code
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 sm:-top-12 sm:right-0 z-10 bg-black/50 sm:bg-transparent rounded-full p-2 sm:p-0 text-white hover:text-gray-300 transition-colors duration-300"
            >
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Full size view"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '95vw', maxHeight: '95vh' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioProject;