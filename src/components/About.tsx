import React, { useState, useEffect } from 'react';
import { Brain, Code, Zap, Users, Sparkles, Star, ArrowRight } from 'lucide-react';

const About = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
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

    const element = document.getElementById('about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Leveraging artificial intelligence to create smarter, more efficient web solutions that adapt to user needs.'
    },
    {
      icon: Code,
      title: 'Modern Development',
      description: 'Using cutting-edge frameworks and technologies to build scalable, maintainable, and performant applications.'
    },
    {
      icon: Zap,
      title: 'Prompt Engineering',
      description: 'Expert in crafting precise prompts to harness AI capabilities for enhanced user experiences and automation.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Committed to understanding client needs and delivering solutions that exceed expectations and drive business growth.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-200/30 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 mr-2 animate-spin" />
            <span className="text-sm font-medium text-blue-800">Get to Know Me</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 relative">
            About Me
            <div className="absolute -top-2 -right-2 w-6 h-6">
              <Star className="w-6 h-6 text-yellow-400 animate-bounce" />
            </div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate web developer who combines traditional development skills with the power of AI 
            to create innovative digital experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image and Stats */}
          <div className="space-y-8">
            <div className={`relative group transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              <img
                src="https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800&h=800"
                alt="Web developer workspace with code on screen"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-xl group-hover:scale-110 transition-transform duration-300 z-20">
                <div className="text-2xl font-bold mb-1 flex items-center">
                  AI-Driven
                  <Zap className="w-5 h-5 ml-2 animate-pulse" />
                </div>
                <div className="text-sm opacity-90">Development</div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-8 right-8 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
            </div>

            <div className={`bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '600ms'}}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                Quick Facts
                <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center group hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">Peshawar</span>
                </div>
                <div className="flex justify-between items-center group hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">0-1 Year</span>
                </div>
                <div className="flex justify-between items-center group hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                  <span className="text-gray-600">Specialization</span>
                  <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">AI & Web Dev</span>
                </div>
                <div className="flex justify-between items-center group hover:bg-green-50 p-2 rounded-lg transition-colors duration-200">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-medium text-green-600 flex items-center">
                    Open for Projects
                    <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-8">
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-4">
                <Brain className="w-4 h-4 text-purple-600 mr-2 animate-pulse" />
                <span className="text-sm font-medium text-purple-800">My Expertise</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                What I Bring to Your Project
                <ArrowRight className="w-6 h-6 ml-2 text-blue-500 animate-bounce" />
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With expertise in both traditional web development and emerging AI technologies, 
                I help businesses stay ahead of the curve by creating intelligent, user-centric web applications 
                that solve real-world problems.
              </p>
            </div>

            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer hover:scale-105 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{animationDelay: `${700 + index * 100}ms`}}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-start space-x-4 relative z-10">
                    <div className={`p-3 rounded-lg transition-all duration-300 ${
                      hoveredFeature === index 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110' 
                        : 'bg-blue-100 group-hover:bg-blue-200 group-hover:scale-110'
                    }`}>
                      <feature.icon className={`w-6 h-6 transition-all duration-300 ${
                        hoveredFeature === index 
                          ? 'text-white animate-bounce' 
                          : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                    {hoveredFeature === index && (
                      <div className="absolute top-2 right-2">
                        <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                      </div>
                    )}
                  </div>
                  
                  {/* Hover particles */}
                  {hoveredFeature === index && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${30 + i * 20}%`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;