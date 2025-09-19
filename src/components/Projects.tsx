import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Sparkles, Star, Play } from 'lucide-react';
import { apiService } from '../services/api';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [projectImages, setProjectImages] = useState<{[key: string]: string}>({});
  const [projectThumbnails, setProjectThumbnails] = useState<{[key: string]: string}>({});
  const [generalProjectImages, setGeneralProjectImages] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('projects');
    if (element) observer.observe(element);

    loadProjects();

    return () => observer.disconnect();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await apiService.getProjects();
      if (response.success) {
        setProjects(response.projects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reload projects when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadProjects();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Load project images and thumbnails from localStorage
  useEffect(() => {
    try {
      // Load specific project images
      const savedProjectImages = localStorage.getItem('mediaManager_projectImages');
      if (savedProjectImages) {
        const parsedProjectImages = JSON.parse(savedProjectImages);
        setProjectImages(parsedProjectImages);
      }

      // Load project thumbnails
      const savedThumbnails = localStorage.getItem('mediaManager_projectThumbnails');
      if (savedThumbnails) {
        const parsedThumbnails = JSON.parse(savedThumbnails);
        setProjectThumbnails(parsedThumbnails);
      }

      // Load general project images
      const savedImages = localStorage.getItem('mediaManager_uploadedImages');
      if (savedImages) {
        const parsedImages = JSON.parse(savedImages);
        if (parsedImages.projects && parsedImages.projects.length > 0) {
          setGeneralProjectImages(parsedImages.projects);
        }
      }
    } catch (error) {
      console.error('Error loading project images:', error);
    }
  }, []);

  const getProjectImage = (project: any, index: number) => {
    try {
      // First priority: Selected thumbnail from MediaManager
      if (projectThumbnails[project._id]) {
        return projectThumbnails[project._id];
      }
      
      // Second priority: First uploaded image for this project
      if (projectImages[project._id] && projectImages[project._id].length > 0) {
        return projectImages[project._id][0];
      }
      
      // Third priority: Database images
      if (project.images && project.images.length > 0) {
        return project.images[0];
      }
      
      // Fourth priority: General project images
      if (generalProjectImages[index]) {
        return generalProjectImages[index];
      }
      
      // Use project-specific defaults based on title
      if (project.title && project.title.toLowerCase().includes('facebook')) {
        return 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=300&fit=crop';
      }
      if (project.title && project.title.toLowerCase().includes('portfolio')) {
        return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop';
      }
      if (project.title && project.title.toLowerCase().includes('ai')) {
        return 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop';
      }
      
    } catch (error) {
      console.error('Error loading project images:', error);
    }
    
    // Final fallback with better placeholder
    return `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&auto=format&q=80`;
  };



  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-indigo-200/30 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2 animate-spin" />
            <span className="text-sm font-medium text-blue-800">My Work</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 relative">
            Featured Projects
            <div className="absolute -top-2 -right-2 w-6 h-6">
              <Star className="w-6 h-6 text-yellow-400 animate-bounce" />
            </div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work combining traditional web development with AI innovation 
            to create powerful, user-centered solutions.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading projects...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project._id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: `${300 + index * 200}ms`}}
              >

                
                <div className="relative overflow-hidden">
                  <img
                    src={getProjectImage(project, index)}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop&auto=format&q=80`;
                    }}
                  />
                  {/* Project-specific symbols */}
                  {project.title === 'Portfolio Website' ? (
                    <>
                      <div className="absolute top-4 left-4 text-white/70 text-2xl font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {'<>'}
                      </div>
                      <div className="absolute top-4 right-4 text-white/70 text-xl font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {'{ }'}
                      </div>
                      <div className="absolute bottom-4 left-4 text-white/70 text-lg font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {'</>'}
                      </div>
                    </>
                  ) : project.title && (project.title.toLowerCase().includes('car') || project.title.toLowerCase().includes('anti') || project.title.toLowerCase().includes('theft')) ? (
                    <>
                      <div className="absolute top-4 left-4 text-white/80 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        🔒
                      </div>
                      <div className="absolute top-4 right-4 text-white/80 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        🚗
                      </div>
                      <div className="absolute bottom-4 left-4 text-white/80 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        🛡️
                      </div>
                      <div className="absolute bottom-4 right-4 text-white/80 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        🔐
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute top-4 left-4 text-white/70 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        ✨
                      </div>
                      <div className="absolute top-4 right-4 text-white/70 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        🎨
                      </div>
                      <div className="absolute bottom-4 left-4 text-white/70 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        📱
                      </div>
                    </>
                  )}
                </div>
                
                <div className="p-6 relative">
                  {/* Background symbols */}
                  {project.title === 'Portfolio Website' ? (
                    <>
                      <div className="absolute top-4 right-4 text-blue-200 text-4xl font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {'</'}
                      </div>
                      <div className="absolute bottom-4 right-4 text-blue-200 text-3xl font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {'/>'}
                      </div>
                    </>
                  ) : project.title && (project.title.toLowerCase().includes('car') || project.title.toLowerCase().includes('anti') || project.title.toLowerCase().includes('theft')) ? (
                    <>
                      <div className="absolute top-4 right-4 text-red-100 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        🚨
                      </div>
                      <div className="absolute bottom-4 right-4 text-red-100 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        🔑
                      </div>
                      <div className="absolute top-1/2 left-4 text-red-100 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        ⚠️
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="absolute top-4 right-4 text-gray-100 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        🖌️
                      </div>
                      <div className="absolute bottom-4 right-4 text-gray-100 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        💡
                      </div>
                    </>
                  )}
                  
                  <h3 
                    className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200 cursor-pointer relative z-10"
                    onClick={() => {
                      if (project.title === 'Facebook Login Page' || project.title.toLowerCase().includes('facebook')) {
                        window.location.hash = '#/facebook-project';
                      } else if (project.title === 'Portfolio Website' || project.title.toLowerCase().includes('portfolio')) {
                        window.location.hash = '#/portfolio-project';
                      } else if (project.title && (project.title.toLowerCase().includes('car') || project.title.toLowerCase().includes('anti') || project.title.toLowerCase().includes('theft'))) {
                        window.location.hash = '#/car-antitheft-project';
                      }
                    }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed relative z-10">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {project.technologies?.map((tag: string, tagIndex: number) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 relative z-10">
                    {project.liveUrl && (
                      project.title && (project.title.toLowerCase().includes('car') || project.title.toLowerCase().includes('anti') || project.title.toLowerCase().includes('theft')) ? (
                        <button
                          onClick={() => window.location.hash = '#/car-antitheft-project'}
                          className="flex items-center font-medium transition-colors duration-200 text-red-600 hover:text-red-700"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch Demo
                        </button>
                      ) : (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center font-medium transition-colors duration-200 text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      )
                    )}
                    {project.githubUrl && !project.title?.toLowerCase().includes('facebook') && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Want to see more of my work or discuss a project?
          </p>
          <a
            href="#contact"
            className="group relative bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 inline-block hover:scale-105 hover:shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center">
              Get In Touch
              <div className="ml-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;