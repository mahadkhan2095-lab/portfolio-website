import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github, Shield, Car, Lock, Smartphone, Wifi, AlertTriangle, Play } from 'lucide-react';
import { apiService } from '../services/api';

const CarAntiTheftProject = () => {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {
    try {
      const response = await apiService.getProjects();
      if (response.success) {
        const carProject = response.projects.find((p: any) => 
          p.title && (p.title.toLowerCase().includes('car') || 
                     p.title.toLowerCase().includes('anti') || 
                     p.title.toLowerCase().includes('theft'))
        );
        setProject(carProject);
        
        // Load features from project or use defaults
        if (carProject?.features && carProject.features.length > 0) {
          setFeatures(carProject.features);
        } else {
          // Default features
          setFeatures([
            { title: 'Real-time Alerts', description: 'Instant notifications when unauthorized access is detected', icon: 'AlertTriangle', color: 'red' },
            { title: 'Mobile Control', description: 'Control and monitor your vehicle remotely via mobile app', icon: 'Smartphone', color: 'blue' },
            { title: 'Auto Lock', description: 'Automatic locking system with advanced security protocols', icon: 'Lock', color: 'green' },
            { title: 'IoT Integration', description: 'Connected device integration for comprehensive monitoring', icon: 'Wifi', color: 'purple' },
            { title: 'Vehicle Tracking', description: 'GPS-based location tracking and movement detection', icon: 'Car', color: 'yellow' },
            { title: 'Multi-layer Security', description: 'Advanced encryption and authentication mechanisms', icon: 'Shield', color: 'indigo' }
          ]);
        }
      }
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
          <button
            onClick={() => window.location.hash = '#/'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => window.location.hash = '#/'}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Projects
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="p-3 bg-red-100 rounded-full">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Demo Video */}
        {project.liveUrl && (
          <div id="demo-video" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Project Demo</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                {project.liveUrl.includes('youtube.com') ? (
                  <iframe
                    src={project.liveUrl.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Car Anti-Theft System Demo"
                  ></iframe>
                ) : (
                  <video
                    className="w-full h-full"
                    controls
                    preload="metadata"
                    style={{ maxHeight: '100%', objectFit: 'contain' }}
                  >
                    <source src="/videos/carantitheft.mp4" type="video/mp4" />
                    <source src={project.liveUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Technologies */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Technologies Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.technologies?.map((tech: string, index: number) => {
              const colors = [
                'from-red-500 to-pink-500',
                'from-blue-500 to-cyan-500', 
                'from-green-500 to-emerald-500',
                'from-purple-500 to-violet-500',
                'from-orange-500 to-yellow-500',
                'from-indigo-500 to-blue-500'
              ];
              const color = colors[index % colors.length];
              
              return (
                <div key={index} className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center space-x-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white font-bold text-xl">{tech.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-gray-700 transition-colors">{tech}</h3>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`w-3 h-3 bg-gradient-to-r ${color} rounded-full animate-pulse`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Security Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = {
                AlertTriangle,
                Smartphone,
                Lock,
                Wifi,
                Car,
                Shield
              }[feature.icon] || Shield;
              
              const colorClasses = {
                red: 'bg-red-100 text-red-600',
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                purple: 'bg-purple-100 text-purple-600',
                yellow: 'bg-yellow-100 text-yellow-600',
                indigo: 'bg-indigo-100 text-indigo-600'
              }[feature.color] || 'bg-gray-100 text-gray-600';
              
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 ${colorClasses.split(' ')[0]} rounded-lg mr-3`}>
                      <IconComponent className={`w-6 h-6 ${colorClasses.split(' ')[1]}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Project Links */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {project.liveUrl && (
              <button
                onClick={() => {
                  const videoElement = document.getElementById('demo-video');
                  if (videoElement) {
                    videoElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo Video
              </button>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
              >
                <Github className="w-5 h-5 mr-2" />
                View Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarAntiTheftProject;