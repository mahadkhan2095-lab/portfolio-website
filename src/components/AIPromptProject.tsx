import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Brain, Zap, Target, Users, X, ZoomIn, Sparkles, MessageSquare, Settings, BookOpen, TrendingUp } from 'lucide-react';

const AIPromptProject = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Generation',
      description: 'Advanced algorithms analyze context and generate optimized prompts for various AI models and use cases.'
    },
    {
      icon: Target,
      title: 'Multi-Purpose Templates',
      description: 'Pre-built templates for content creation, coding, analysis, creative writing, and business applications.'
    },
    {
      icon: Settings,
      title: 'Customizable Parameters',
      description: 'Fine-tune tone, style, complexity, and output format to match your specific requirements.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Track prompt effectiveness and get insights to improve your AI interactions over time.'
    }
  ];

  const useCases = [
    {
      icon: MessageSquare,
      title: 'Content Creation',
      description: 'Generate prompts for blog posts, social media, marketing copy, and creative writing.',
      examples: ['Blog article outlines', 'Social media captions', 'Product descriptions', 'Email campaigns']
    },
    {
      icon: BookOpen,
      title: 'Educational & Research',
      description: 'Create prompts for learning, research analysis, and academic writing assistance.',
      examples: ['Study guides', 'Research summaries', 'Essay outlines', 'Concept explanations']
    },
    {
      icon: Zap,
      title: 'Business & Productivity',
      description: 'Professional prompts for meetings, reports, strategy, and workflow optimization.',
      examples: ['Meeting agendas', 'Business reports', 'Strategy planning', 'Process improvement']
    },
    {
      icon: Users,
      title: 'Personal Assistant',
      description: 'Daily life prompts for planning, decision-making, and personal development.',
      examples: ['Daily planning', 'Goal setting', 'Decision frameworks', 'Habit tracking']
    }
  ];

  const techStack = [
    { name: 'React 18', category: 'Frontend Framework', description: 'Modern component-based architecture' },
    { name: 'TypeScript', category: 'Language', description: 'Type-safe development' },
    { name: 'Tailwind CSS', category: 'Styling', description: 'Utility-first CSS framework' },
    { name: 'OpenAI API', category: 'AI Integration', description: 'GPT model integration' },
    { name: 'Local Storage', category: 'Data Persistence', description: 'Client-side data storage' },
    { name: 'React Hooks', category: 'State Management', description: 'Modern state handling' }
  ];

  const projectImages = [
    {
      src: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800',
      alt: 'AI Prompt Generator - Main Interface',
      title: 'Main Interface'
    },
    {
      src: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      alt: 'AI Prompt Generator - Template Selection',
      title: 'Template Selection'
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
              className="flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Projects
            </a>
            <h1 className="text-2xl font-bold text-gray-900">AI Prompt Generator Tool</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
                <Brain className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">AI-Powered Prompt Engineering</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                AI Prompt Generator Tool
              </h1>
              
              <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                A sophisticated web application that helps users create effective prompts for AI models, 
                featuring intelligent templates, customization options, and performance analytics.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                  <div className="text-2xl font-bold mb-1">50+</div>
                  <div className="text-purple-200 text-sm">Prompt Templates</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                  <div className="text-2xl font-bold mb-1">10+</div>
                  <div className="text-purple-200 text-sm">AI Model Support</div>
                </div>
              </div>
            </div>
            
            <div className="relative cursor-pointer group" onClick={() => setSelectedImage('https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800')}>
              <img
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800"
                alt="AI Prompt Generator Preview"
                className="rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                <ZoomIn className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl">
                <div className="text-purple-600 font-bold text-lg">AI</div>
                <div className="text-gray-600 text-sm">Powered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help you create the most effective AI prompts for any use case.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                  <feature.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Use Cases & Applications</h2>
            <p className="text-xl text-gray-600">
              Versatile prompt generation for various industries and personal needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors duration-300">
                <div className="flex items-start mb-6">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <useCase.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 mb-4">{useCase.description}</p>
                  </div>
                </div>
                <div className="ml-16">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Example Applications:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {useCase.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Technical Implementation */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Implementation</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Intelligent Prompt Analysis</h3>
                  <p className="text-gray-600">
                    Advanced algorithms analyze user input and context to suggest optimal prompt structures and improvements.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Template Engine</h3>
                  <p className="text-gray-600">
                    Dynamic template system with customizable parameters for different AI models and use cases.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Real-time Preview</h3>
                  <p className="text-gray-600">
                    Live preview functionality showing how prompts will appear and perform with different AI models.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Performance Tracking</h3>
                  <p className="text-gray-600">
                    Built-in analytics to track prompt effectiveness and provide optimization recommendations.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Stack</h2>
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="space-y-4">
                  {techStack.map((tech, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-900 font-medium">{tech.name}</span>
                        <span className="text-purple-600 text-sm font-medium">{tech.category}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">50+ pre-built prompt templates</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Multi-AI model compatibility</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Real-time prompt optimization</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">Performance analytics dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your AI Interactions?</h2>
          <p className="text-xl text-purple-100 mb-8">
            This tool represents the future of AI prompt engineering, combining technical expertise with user-centered design.
          </p>
          <div className="flex justify-center">
            <a
              href="/#projects"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors duration-300"
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

export default AIPromptProject;