import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Sparkles, Star } from 'lucide-react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'Facebook Login Page Replica',
      description: 'A pixel-perfect replica of Facebook\'s login page with custom enhancements and responsive design. Built using modern web technologies with attention to detail and user experience.',
      image: 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      liveUrl: '#/facebook-project',
      githubUrl: '#',
      featured: false
    },

    {
      title: 'Portfolio Website',
      description: 'Personal portfolio website showcasing my skills and projects as a web developer. Built with modern technologies and responsive design.',
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive'],
      liveUrl: '#/portfolio-project',
      githubUrl: '#',
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

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

        {/* Featured Projects */}
        {/* Projects */}
        <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 relative ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: `${300 + index * 200}ms`}}
              >

                
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
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
                  
                  <a href={
                    project.title === 'Facebook Login Page Replica' ? '#/facebook-project' :
                    project.title === 'Portfolio Website' ? '#/portfolio-project' : '#'
                  }>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200 cursor-pointer relative z-10">
                      {project.title}
                    </h3>
                  </a>
                  <p className="text-gray-600 mb-4 leading-relaxed relative z-10">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4 relative z-10">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                    {project.title !== 'Facebook Login Page Replica' && (
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
        </div>

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