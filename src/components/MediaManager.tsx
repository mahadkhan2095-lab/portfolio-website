import React, { useState, useEffect } from 'react';
import { Image, Upload, X, ArrowLeft, Folder, Plus } from 'lucide-react';

const MediaManager = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projectImages, setProjectImages] = useState<{[key: string]: string[]}>({});
  const [projectThumbnails, setProjectThumbnails] = useState<{[key: string]: string}>({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProjects();
    loadProjectImages();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (response.ok) {
        const data = await response.json();
        const projects = data.projects || data;
        setProjects(projects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadProjectImages = () => {
    try {
      const saved = localStorage.getItem('mediaManager_projectImages');
      if (saved) {
        setProjectImages(JSON.parse(saved));
      }
      
      const savedThumbnails = localStorage.getItem('mediaManager_projectThumbnails');
      if (savedThumbnails) {
        setProjectThumbnails(JSON.parse(savedThumbnails));
      }
    } catch (error) {
      console.error('Error loading project images:', error);
    }
  };

  const saveProjectImages = (newImages: {[key: string]: string[]}) => {
    setProjectImages(newImages);
    localStorage.setItem('mediaManager_projectImages', JSON.stringify(newImages));
  };

  const setProjectThumbnail = (projectId: string, imageUrl: string) => {
    const newThumbnails = { ...projectThumbnails, [projectId]: imageUrl };
    setProjectThumbnails(newThumbnails);
    localStorage.setItem('mediaManager_projectThumbnails', JSON.stringify(newThumbnails));
  };

  const handleFileUpload = (files: FileList | null, projectId: string) => {
    if (!files) return;
    
    setUploading(true);
    const newImages: string[] = [];
    
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push(e.target.result as string);
          if (newImages.length === files.length) {
            const updatedImages = {
              ...projectImages,
              [projectId]: [...(projectImages[projectId] || []), ...newImages]
            };
            saveProjectImages(updatedImages);
            setUploading(false);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (projectId: string, imageIndex: number) => {
    const updatedImages = {
      ...projectImages,
      [projectId]: projectImages[projectId]?.filter((_, i) => i !== imageIndex) || []
    };
    saveProjectImages(updatedImages);
  };

  const handleProfileUpload = (files: FileList | null) => {
    if (!files) return;
    
    setUploading(true);
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const imageData = e.target.result as string;
        
        // Save to project images format
        const updatedImages = {
          ...projectImages,
          profile: [imageData]
        };
        saveProjectImages(updatedImages);
        
        // Also save to general media manager format
        const generalImages = JSON.parse(localStorage.getItem('mediaManager_uploadedImages') || '{}');
        generalImages.profile = [imageData];
        localStorage.setItem('mediaManager_uploadedImages', JSON.stringify(generalImages));
        
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (selectedProject) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <button
                onClick={() => setSelectedProject(null)}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Projects
              </button>
              <h1 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h1>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Project Images</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {projectImages[selectedProject._id]?.length || 0} images
                </span>
              </div>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6 hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="file-upload"
                onChange={(e) => handleFileUpload(e.target.files, selectedProject._id)}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {uploading ? (
                  <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                ) : (
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                )}
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {uploading ? 'Uploading...' : 'Upload Project Images'}
                </p>
                <p className="text-gray-500">
                  Click to select or drag and drop images here
                </p>
              </label>
            </div>

            {/* Current Thumbnail */}
            {projectThumbnails[selectedProject._id] && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Thumbnail</h3>
                <div className="relative inline-block">
                  <img
                    src={projectThumbnails[selectedProject._id]}
                    alt="Current thumbnail"
                    className="w-48 h-32 object-cover rounded-lg shadow-lg border-2 border-blue-500"
                  />
                  <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Active Thumbnail
                  </div>
                </div>
              </div>
            )}

            {/* Images Grid */}
            {projectImages[selectedProject._id] && projectImages[selectedProject._id].length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {projectImages[selectedProject._id].map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`${selectedProject.title} ${index + 1}`}
                        className={`w-full h-32 object-cover rounded-lg shadow-sm cursor-pointer transition-all ${
                          projectThumbnails[selectedProject._id] === image 
                            ? 'ring-2 ring-blue-500 ring-offset-2' 
                            : 'hover:ring-2 hover:ring-gray-300'
                        }`}
                        onClick={() => setProjectThumbnail(selectedProject._id, image)}
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this image?')) {
                            removeImage(selectedProject._id, index);
                          }
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                        title="Delete image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        Image {index + 1}
                      </div>
                      {projectThumbnails[selectedProject._id] === image && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Thumbnail
                        </div>
                      )}
                      {projectThumbnails[selectedProject._id] !== image && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setProjectThumbnail(selectedProject._id, image);
                          }}
                          className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-1"
                        >
                          <span>📌</span>
                          <span>Set Thumbnail</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Image className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No images uploaded yet</p>
                <p className="text-sm">Upload images to showcase this project and set thumbnails</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Media Manager</h1>
          <p className="text-gray-600">Upload and manage images for your projects</p>
        </div>

        {/* Profile Picture Upload */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm">👤</span>
            </div>
            Profile Picture
          </h3>
          <div className="flex items-center space-x-4">
            {projectImages.profile && projectImages.profile.length > 0 && (
              <div className="relative">
                <img
                  src={projectImages.profile[0]}
                  alt="Current profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-blue-300"
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            )}
            <div className="flex-1">
              <button
                onClick={() => document.getElementById('profile-upload-main')?.click()}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg"
              >
                <span className="text-xl">📸</span>
                <span>Upload Profile Picture</span>
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-upload-main"
                onChange={(e) => handleProfileUpload(e.target.files)}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">This will appear in the About section</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <Folder className="w-8 h-8 text-blue-600" />
                <span className="text-sm text-gray-500">
                  {projectImages[project._id]?.length || 0} images
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.technologies?.slice(0, 2).map((tech: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{project.technologies.length - 2}
                    </span>
                  )}
                </div>
                <Plus className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-2">No projects found</p>
            <p className="text-sm text-gray-400">Create projects first to manage their images</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaManager;