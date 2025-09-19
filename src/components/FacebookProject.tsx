import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Monitor, Smartphone, Tablet, Eye, Code, Palette, X, ZoomIn } from 'lucide-react';

const FacebookProject = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [projectImages, setProjectImages] = useState<string[]>([]);

  // Load Facebook project specific images
  React.useEffect(() => {
    const loadFacebookProjectImages = async () => {
      try {
        // Get Facebook project ID
        const response = await fetch('http://localhost:5000/api/projects');
        if (response.ok) {
          const data = await response.json();
          const projects = data.projects || data;
          const facebookProject = projects.find((p: any) => 
            p.title.toLowerCase().includes('facebook')
          );
          
          if (facebookProject) {
            // Load project-specific images
            const savedImages = localStorage.getItem('mediaManager_projectImages');
            if (savedImages) {
              const parsedImages = JSON.parse(savedImages);
              if (parsedImages[facebookProject._id]) {
                setProjectImages(parsedImages[facebookProject._id]);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error loading Facebook project images:', error);
      }
    };
    
    loadFacebookProjectImages();
  }, []);
  const features = [
    {
      icon: Eye,
      title: 'Pixel-Perfect Design',
      description: 'Meticulously crafted to match Facebook\'s original login page with attention to every detail.'
    },
    {
      icon: Monitor,
      title: 'Responsive Layout',
      description: 'Seamlessly adapts to desktop and mobile devices for optimal user experience.'
    },
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Well-structured HTML, CSS, and JavaScript following best practices and modern standards.'
    },
    {
      icon: Palette,
      title: 'UI/UX Focus',
      description: 'Enhanced user interface with smooth animations and interactive elements.'
    }
  ];

  const techStack = [
    'HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Flexbox', 'CSS Grid', 'Media Queries', 'Form Validation'
  ];

  const getProjectImage = (index: number, fallback: string) => {
    return projectImages[index] || fallback;
  };

  const projectImageData = [
    {
      src: getProjectImage(0, 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop'),
      alt: 'Facebook Login Page - Desktop View',
      title: 'Desktop View'
    },
    {
      src: getProjectImage(1, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=600&fit=crop'),
      alt: 'Facebook Login Page - Mobile View',
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
            <h1 className="text-2xl font-bold text-gray-900">Facebook Login Replica</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                <Palette className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">UI/UX Design Project</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Facebook Login Page Replica
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                A pixel-perfect recreation of Facebook's login page, showcasing advanced UI/UX design skills 
                and responsive web development techniques.
              </p>
              

            </div>
            
            <div className="relative cursor-pointer group" onClick={() => setSelectedImage(getProjectImage(0, 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop'))}>
              <img
                src={getProjectImage(0, 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop')}
                alt="Facebook Login Page Preview"
                className="rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                <ZoomIn className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
                <div className="text-blue-600 font-bold text-lg">100%</div>
                <div className="text-gray-600 text-sm">Pixel Perfect</div>
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
              This project demonstrates my ability to recreate complex UI designs with precision and enhance them with modern web technologies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Responsive Design</h2>
            <p className="text-xl text-gray-600">
              Perfectly optimized for all device sizes and screen resolutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projectImageData.map((image, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => setSelectedImage(image.src)}>
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold">{image.title}</h3>
                    </div>
                    <div className="absolute top-4 right-4">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Development Process</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Design Analysis</h3>
                  <p className="text-gray-600">
                    Carefully studied Facebook's original login page design, analyzing layout, typography, colors, and interactive elements.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. HTML Structure</h3>
                  <p className="text-gray-600">
                    Built semantic HTML structure with proper accessibility considerations and form elements.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. CSS Styling</h3>
                  <p className="text-gray-600">
                    Implemented pixel-perfect styling using modern CSS techniques including Flexbox and Grid.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. JavaScript Enhancement</h3>
                  <p className="text-gray-600">
                    Added interactive features, form validation, and smooth animations for enhanced user experience.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technologies Used</h2>
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <div className="grid grid-cols-2 gap-4">
                  {techStack.map((tech, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">100% responsive across all devices</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Pixel-perfect design replication</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Enhanced with modern animations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Optimized performance and accessibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Similar Work?</h2>
          <p className="text-xl text-blue-100 mb-8">
            I can help you create stunning UI/UX designs and bring them to life with modern web technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300"
            >
              Start Your Project
            </a>
            <a
              href="/#projects"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
            >
              View More Projects
            </a>
          </div>
        </div>
      </section>

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

export default FacebookProject;