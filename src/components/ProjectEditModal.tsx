import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Image, Upload, Bot, Sparkles, MessageCircle, Send } from 'lucide-react';

interface ProjectEditModalProps {
  project: any;
  onSave: (projectData: any) => void;
  onClose: () => void;
}

const ProjectEditModal: React.FC<ProjectEditModalProps> = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [''],
    liveUrl: '',
    githubUrl: '',
    featured: false,
    category: 'web',
    status: 'completed',
    images: [] as string[],
    features: [] as any[]
  });
  const [currentImage, setCurrentImage] = useState<string>('');
  const [availableImages, setAvailableImages] = useState<string[]>([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiConversation, setAiConversation] = useState<{role: 'ai' | 'user', message: string}[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [aiStep, setAiStep] = useState(0);

  useEffect(() => {
    if (project && project._id) {
      const projectImages = project.images || [];
      setFormData({
        title: project.title || '',
        description: project.description || '',
        technologies: project.technologies || [''],
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false,
        category: project.category || 'web',
        status: project.status || 'completed',
        images: projectImages,
        features: project.features || []
      });
      
      // Get the actual thumbnail image from the website project cards
      let currentImg = getProjectThumbnail();
      setCurrentImage(currentImg);
    } else {
      // For new projects, show AI assistant
      setShowAIAssistant(true);
      setAiConversation([{
        role: 'ai',
        message: "Hi! I'm your AI assistant. I'll help you create an amazing project description. Let's start with the basics - what's your project about? Tell me everything!"
      }]);
    }
    
    const savedImages = localStorage.getItem('mediaManager_uploadedImages');
    if (savedImages) {
      const parsedImages = JSON.parse(savedImages);
      setAvailableImages(parsedImages.projects || []);
    }
  }, [project]);

  // Exact copy of getProjectImage function from Projects.tsx
  const getProjectImage = (projectId: string, defaultImage: string, index: number) => {
    try {
      // First check for specific project image
      const savedProjectImages = localStorage.getItem('mediaManager_projectImages');
      if (savedProjectImages) {
        const parsedProjectImages = JSON.parse(savedProjectImages);
        if (parsedProjectImages[projectId]) {
          return parsedProjectImages[projectId];
        }
      }

      // Then check for general project images
      const savedImages = localStorage.getItem('mediaManager_uploadedImages');
      if (savedImages) {
        const parsedImages = JSON.parse(savedImages);
        if (parsedImages.projects && parsedImages.projects[index]) {
          return parsedImages.projects[index];
        }
      }
    } catch (error) {
      console.error('Error loading project images:', error);
    }
    // Finally use default
    return defaultImage;
  };

  // Get thumbnail for project edit modal using same logic as admin dashboard
  const getProjectThumbnail = () => {
    if (!project || !project._id) return '';
    
    // First check if project has uploaded images in database
    if (project.images && project.images.length > 0) {
      return project.images[0];
    }
    
    // Then check localStorage and defaults
    // Map database project to website project format
    let projectId = project._id;
    let defaultImage = 'https://via.placeholder.com/400x200/e5e7eb/6b7280?text=No+Image';
    let index = 0;
    
    // Match with hardcoded projects from Projects.tsx
    if (project.title?.toLowerCase().includes('facebook')) {
      projectId = '1';
      defaultImage = 'https://images.pexels.com/photos/267389/pexels-photo-267389.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
      index = 0;
    } else if (project.title?.toLowerCase().includes('portfolio')) {
      projectId = '2';
      defaultImage = 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800&h=600';
      index = 1;
    }
    
    return getProjectImage(projectId, defaultImage, index);
  };

  const aiQuestions = [
    "What's your project about? Tell me everything!",
    "What technologies did you use or plan to use?",
    "What problem does your project solve?",
    "What are the key features of your project?",
    "Who is your target audience?",
    "What makes your project unique?"
  ];

  const generateAIContent = (userResponses: string[]) => {
    const responses = userResponses.join(' ');
    
    // Extract technologies from user responses
    const techKeywords = {
      'react': 'React',
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'node': 'Node.js',
      'express': 'Express.js',
      'mongodb': 'MongoDB',
      'mysql': 'MySQL',
      'python': 'Python',
      'django': 'Django',
      'flask': 'Flask',
      'vue': 'Vue.js',
      'angular': 'Angular',
      'css': 'CSS',
      'html': 'HTML',
      'tailwind': 'Tailwind CSS',
      'bootstrap': 'Bootstrap',
      'firebase': 'Firebase',
      'aws': 'AWS',
      'docker': 'Docker',
      'git': 'Git',
      'api': 'REST API',
      'graphql': 'GraphQL'
    };
    
    const detectedTechs = [];
    const lowerResponses = responses.toLowerCase();
    
    for (const [keyword, tech] of Object.entries(techKeywords)) {
      if (lowerResponses.includes(keyword)) {
        detectedTechs.push(tech);
      }
    }
    
    // Generate category based on keywords
    let category = 'web';
    if (lowerResponses.includes('mobile') || lowerResponses.includes('app') || lowerResponses.includes('android') || lowerResponses.includes('ios')) {
      category = 'mobile';
    } else if (lowerResponses.includes('ai') || lowerResponses.includes('machine learning') || lowerResponses.includes('ml') || lowerResponses.includes('neural')) {
      category = 'ai';
    }
    
    // Generate professional description
    const description = `This innovative project addresses real-world challenges by ${responses.toLowerCase().includes('solve') ? 'solving' : 'providing solutions for'} user needs. Built with modern technologies, it features a user-friendly interface and robust functionality. The project demonstrates expertise in ${detectedTechs.slice(0, 3).join(', ')} and showcases best practices in software development. Key highlights include seamless user experience, scalable architecture, and efficient performance optimization.`;
    
    return {
      description,
      technologies: detectedTechs.length > 0 ? detectedTechs : ['JavaScript', 'HTML', 'CSS'],
      category
    };
  };

  const handleAIResponse = () => {
    if (!userInput.trim()) return;
    
    const newConversation = [...aiConversation, { role: 'user' as const, message: userInput }];
    setAiConversation(newConversation);
    setIsAIGenerating(true);
    
    setTimeout(() => {
      if (aiStep < aiQuestions.length - 1) {
        const nextStep = aiStep + 1;
        setAiStep(nextStep);
        setAiConversation(prev => [...prev, {
          role: 'ai',
          message: aiQuestions[nextStep]
        }]);
      } else {
        // Generate final content
        const userResponses = newConversation.filter(msg => msg.role === 'user').map(msg => msg.message);
        const aiContent = generateAIContent(userResponses);
        
        setFormData(prev => ({
          ...prev,
          description: aiContent.description,
          technologies: aiContent.technologies,
          category: aiContent.category
        }));
        
        setAiConversation(prev => [...prev, {
          role: 'ai',
          message: "Perfect! I've generated your project content based on our conversation. You can review and edit everything before saving. The AI-generated content is now filled in the form below!"
        }]);
        
        setTimeout(() => {
          setShowAIAssistant(false);
        }, 2000);
      }
      setIsAIGenerating(false);
    }, 1500);
    
    setUserInput('');
  };

  const skipAI = () => {
    setShowAIAssistant(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...formData.technologies];
    newTechnologies[index] = value;
    setFormData(prev => ({ ...prev, technologies: newTechnologies }));
  };

  const addTechnology = () => {
    setFormData(prev => ({ ...prev, technologies: [...prev.technologies, ''] }));
  };

  const removeTechnology = (index: number) => {
    if (formData.technologies.length > 1) {
      const newTechnologies = formData.technologies.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, technologies: newTechnologies }));
    }
  };

  const addFeature = () => {
    setFormData(prev => ({ 
      ...prev, 
      features: [...prev.features, { title: '', description: '', icon: 'Shield', color: 'blue' }] 
    }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ ...prev, images: [result] }));
        setCurrentImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, images: [] }));
    setCurrentImage('');
  };

  const selectExistingImage = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, images: [imageUrl] }));
    setCurrentImage(imageUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      technologies: formData.technologies.filter(tech => tech.trim() !== '')
    };
    console.log('Submitting project data:', cleanedData);
    onSave(cleanedData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              {project._id ? 'Edit Project' : (
                <>
                  <Bot className="w-6 h-6 mr-2 text-blue-600" />
                  AI-Powered Project Creation
                </>
              )}
            </h3>
            <div className="flex items-center space-x-2">
              {!project._id && !showAIAssistant && (
                <button
                  onClick={() => setShowAIAssistant(true)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center text-sm"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI Help
                </button>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* AI Assistant Panel */}
          {showAIAssistant && (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-blue-600" />
                  AI Project Assistant
                </h4>
                <button
                  onClick={skipAI}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Skip AI
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-4 max-h-60 overflow-y-auto mb-4">
                {aiConversation.map((msg, index) => (
                  <div key={index} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {msg.role === 'ai' && <Bot className="w-4 h-4 mt-0.5 text-blue-600" />}
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isAIGenerating && (
                  <div className="flex justify-start mb-3">
                    <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAIResponse()}
                  placeholder="Tell me about your project..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isAIGenerating}
                />
                <button
                  onClick={handleAIResponse}
                  disabled={isAIGenerating || !userInput.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description * {formData.description && <span className="text-green-600 text-xs">(AI Generated)</span>}
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Image
              </label>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Project Image:</p>
                <div className="relative w-full h-48 rounded-lg border-2 border-blue-300 overflow-hidden">
                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt="Current project image"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling!.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  <div 
                    className={`w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${currentImage ? 'hidden' : 'flex'}`}
                    style={{ display: currentImage ? 'none' : 'flex' }}
                  >
                    <div className="text-center">
                      <Image className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm font-medium">No Image Selected</p>
                      <p className="text-gray-400 text-xs">Upload or choose an image</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={() => document.getElementById('image-upload')?.click()}
                      className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                      title="Change Image"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      title="Delete Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {currentImage && (
                    <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Current Image
                    </div>
                  )}
                </div>
              </div>

              {/* Available Images from Media Manager */}
              {availableImages.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Choose from Available Images ({availableImages.length}):</p>
                  <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-lg p-2">
                    {availableImages.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => selectExistingImage(image)}
                        className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          currentImage === image 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Available image ${index + 1}`}
                          className="w-full h-20 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/100x80/e5e7eb/6b7280?text=Error';
                          }}
                        />
                        {currentImage === image && (
                          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                            <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                              Selected
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Image */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Upload New Image</p>
                  <p className="text-xs text-gray-500">Click to browse files</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies Used {formData.technologies.length > 1 && <span className="text-green-600 text-xs">(AI Generated)</span>}
              </label>
              <div className="space-y-2">
                {formData.technologies.map((tech, index) => (
                  <div key={index} className="flex space-x-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechnologyChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., React, TypeScript"
                    />
                    {formData.technologies.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTechnology}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Technology
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Live URL
                </label>
                <input
                  type="url"
                  name="liveUrl"
                  value={formData.liveUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://your-project.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="githubUrl"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category {formData.category !== 'web' && <span className="text-green-600 text-xs">(AI Generated)</span>}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile App</option>
                  <option value="ai">AI/ML</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Project</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Features (Optional)
              </label>
              <div className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <input
                        type="text"
                        placeholder="Feature title"
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="flex space-x-2">
                        <select
                          value={feature.icon}
                          onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="Shield">🛡️ Shield</option>
                          <option value="Lock">🔒 Lock</option>
                          <option value="Car">🚗 Car</option>
                          <option value="Smartphone">📱 Phone</option>
                          <option value="Wifi">📶 Wifi</option>
                          <option value="AlertTriangle">⚠️ Alert</option>
                        </select>
                        <select
                          value={feature.color}
                          onChange={(e) => handleFeatureChange(index, 'color', e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="red">Red</option>
                          <option value="blue">Blue</option>
                          <option value="green">Green</option>
                          <option value="purple">Purple</option>
                          <option value="yellow">Yellow</option>
                          <option value="indigo">Indigo</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <textarea
                        placeholder="Feature description"
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Feature
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {project._id ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditModal;