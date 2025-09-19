import React, { useState, useEffect } from 'react';
import { Code2, Globe, Cpu, Zap, Palette, Sparkles, Star, Brain } from 'lucide-react';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
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

    const element = document.getElementById('skills');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      icon: Code2,
      title: 'Frontend Development',
      skills: ['React 18', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3', 'Component Architecture'],
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Styling & Design',
      skills: ['Tailwind CSS', 'Responsive Design', 'CSS Grid', 'Flexbox', 'Mobile-First Design', 'CSS Animations'],
      color: 'orange'
    },
    {
      icon: Zap,
      title: 'Build Tools & Development',
      skills: ['Vite', 'ESLint', 'PostCSS', 'npm', 'Git Version Control', 'VS Code'],
      color: 'yellow'
    },
    {
      icon: Cpu,
      title: 'AI-Assisted Development',
      skills: ['AI-Powered Code Generation', 'Content Creation with AI', 'Design Assistance', 'Problem-Solving Prompts', 'Development Workflow Optimization', 'AI-Enhanced Productivity'],
      color: 'purple'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      skills: ['User Interface Design', 'User Experience Design', 'Figma', 'Adobe XD', 'Prototyping', 'Design Systems'],
      color: 'indigo'
    },
    {
      icon: Globe,
      title: 'Additional Skills',
      skills: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'WordPress', 'MS Office'],
      color: 'green'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 border-blue-200',
    green: 'bg-green-100 text-green-600 border-green-200',
    purple: 'bg-purple-100 text-purple-600 border-purple-200',
    orange: 'bg-orange-100 text-orange-600 border-orange-200',
    pink: 'bg-pink-100 text-pink-600 border-pink-200',
    yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200',
    indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200'
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-white via-gray-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-200/30 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full mb-6">
            <Brain className="w-4 h-4 text-purple-600 mr-2 animate-pulse" />
            <span className="text-sm font-medium text-purple-800">My Toolkit</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 relative">
            Skills & Technologies
            <div className="absolute -top-2 -right-2 w-6 h-6">
              <Star className="w-6 h-6 text-yellow-400 animate-bounce" />
            </div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit spanning modern web development, AI integration, 
            and cutting-edge technologies to bring your vision to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:scale-105 relative overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{animationDelay: `${300 + index * 100}ms`}}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-center mb-6 relative z-10">
                <div className={`p-3 rounded-xl border transition-all duration-300 ${
                  hoveredSkill === index 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent scale-110' 
                    : colorClasses[category.color] + ' group-hover:scale-110'
                }`}>
                  <category.icon className={`w-6 h-6 transition-all duration-300 ${
                    hoveredSkill === index ? 'animate-bounce' : ''
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-4 group-hover:text-blue-600 transition-colors duration-300 flex items-center">
                  {category.title}
                  {hoveredSkill === index && (
                    <Sparkles className="w-4 h-4 ml-2 text-yellow-400 animate-spin" />
                  )}
                </h3>
              </div>

              <div className="space-y-3 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center justify-between group-hover:translate-x-1 transition-transform duration-300 hover:bg-blue-50 p-2 rounded-lg"
                    style={{ animationDelay: `${skillIndex * 50}ms` }}
                  >
                    <span className="text-gray-700 font-medium group-hover:text-gray-800 transition-colors duration-200">{skill}</span>
                    <div className="flex-1 mx-3 border-b border-dotted border-gray-300 group-hover:border-blue-300 transition-colors duration-300"></div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      hoveredSkill === index 
                        ? 'bg-blue-500 animate-ping' 
                        : 'bg-blue-400 opacity-60'
                    }`}></div>
                  </div>
                ))}
              </div>
              
              {/* Hover particles */}
              {hoveredSkill === index && (
                <div className="absolute inset-0 pointer-events-none z-5">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${20 + i * 25}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Prompt Engineering Showcase */}
        <div className="mt-20">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI Prompt Engineering Expertise
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Specialized in creating effective prompts for various AI models, optimizing AI interactions, 
                and building AI-powered applications with advanced prompt engineering techniques.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-2xl font-bold text-purple-600 mb-2 relative z-10 group-hover:animate-bounce">50+</div>
                  <div className="text-gray-900 font-medium mb-1 relative z-10">Prompt Templates</div>
                  <div className="text-gray-600 text-sm relative z-10">Created for various use cases</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-2xl font-bold text-blue-600 mb-2 relative z-10 group-hover:animate-bounce">10+</div>
                  <div className="text-gray-900 font-medium mb-1 relative z-10">AI Models</div>
                  <div className="text-gray-600 text-sm relative z-10">GPT, Claude, Gemini expertise</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-2xl font-bold text-green-600 mb-2 relative z-10 group-hover:animate-bounce">95%</div>
                  <div className="text-gray-900 font-medium mb-1 relative z-10">Optimization Rate</div>
                  <div className="text-gray-600 text-sm relative z-10">Improved prompt effectiveness</div>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-2xl font-bold text-orange-600 mb-2 relative z-10 group-hover:animate-bounce">100%</div>
                  <div className="text-gray-900 font-medium mb-1 relative z-10">AI Integration</div>
                  <div className="text-gray-600 text-sm relative z-10">Successful project implementations</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Prompt Engineering Skills</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Advanced prompt optimization techniques
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Multi-turn conversation design
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Context window management
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Chain-of-thought prompting
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Applications</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Content generation and optimization
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Code generation and debugging
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Data analysis and insights
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Automated workflow creation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;