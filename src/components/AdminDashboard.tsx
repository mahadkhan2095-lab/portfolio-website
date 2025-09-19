import React, { useState, useEffect, useRef } from 'react';
import { Mail, Users, FolderOpen, Star, TrendingUp, Calendar, MessageSquare, Eye, Image, Settings, ArrowRight, Plus, Edit, Save, X, Trash2 } from 'lucide-react';
import { apiService, Contact } from '../services/api';
import ProjectEditModal from './ProjectEditModal';
import SkillEditModal from './SkillEditModal';

interface DashboardStats {
  totalContacts: number;
  newContacts: number;
  totalProjects: number;
  featuredProjects: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'messages' | 'projects' | 'content' | 'settings' | 'skills' | 'media'>('dashboard');
  const [portfolioSettings, setPortfolioSettings] = useState({
    email: 'mahadkhan2095@gmail.com',
    phone: '+92 300 8367216',
    location: 'Peshawar',
    name: 'Mahad Khan',
    heroTitle: 'AI-Powered Web Developer',
    heroSubtitle: 'Creating innovative digital solutions with artificial intelligence integration',
    aboutText: 'Passionate web developer specializing in modern technologies and AI integration',
    githubUrl: 'https://github.com/mahadkhan',
    linkedinUrl: 'https://linkedin.com/in/mahadkhan',
    experience: '0-1 Year',
    projectsDelivered: '2',
    clientSatisfaction: '100%'
  });
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [skills, setSkills] = useState<any[]>([]);
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [showSkillModal, setShowSkillModal] = useState(false);

  useEffect(() => {
    // Skip backend calls for demo mode
    const authToken = localStorage.getItem('authToken');
    if (authToken && authToken.startsWith('demo-token')) {
      setLoading(false);
      setStats({
        totalContacts: 0,
        newContacts: 0,
        totalProjects: 2,
        featuredProjects: 1
      });
      setRecentContacts([]);
      setProjects([]);
      setSkills([]);
      return;
    }
    
    loadDashboardData();
    loadProjects();
    loadSkills();
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (authToken && authToken.startsWith('demo-token')) {
        // Use default settings for demo mode
        setPortfolioSettings({
          email: 'mahadkhan2095@gmail.com',
          phone: '+92 300 8367216',
          location: 'Peshawar',
          name: 'Mahad Khan',
          heroTitle: 'AI-Powered Web Developer',
          heroSubtitle: 'Creating innovative digital solutions with artificial intelligence integration',
          aboutText: 'Passionate web developer specializing in modern technologies and AI integration',
          githubUrl: 'https://github.com/mahadkhan',
          linkedinUrl: 'https://linkedin.com/in/mahadkhan',
          experience: '0-1 Year',
          projectsDelivered: '2',
          clientSatisfaction: '100%'
        });
        return;
      }
      
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        const settings = data.settings || data;
        setPortfolioSettings({
          email: settings.email || 'mahadkhan2095@gmail.com',
          phone: settings.phone || '+92 300 8367216',
          location: settings.location || 'Peshawar',
          name: settings.name || 'Mahad Khan',
          heroTitle: settings.heroTitle || 'AI-Powered Web Developer',
          heroSubtitle: settings.heroSubtitle || 'Creating innovative digital solutions with artificial intelligence integration',
          aboutText: settings.aboutText || 'Passionate web developer specializing in modern technologies and AI integration',
          githubUrl: settings.githubUrl || 'https://github.com/mahadkhan',
          linkedinUrl: settings.linkedinUrl || 'https://linkedin.com/in/mahadkhan',
          experience: settings.experience || '0-1 Year',
          projectsDelivered: settings.projectsDelivered || '2',
          clientSatisfaction: settings.clientSatisfaction || '100%'
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const loadDashboardData = async () => {
    try {
      const response = await apiService.getDashboardStats();
      if (response.success) {
        setStats(response.stats);
        setRecentContacts(response.recentContacts);
        console.log('Loaded contacts:', response.recentContacts);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await apiService.getProjects();
      if (response.success) {
        setProjects(response.projects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadSkills = async () => {
    try {
      const response = await apiService.getSkills();
      if (response.success) {
        setSkills(response.skills);
      }
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleSaveProject = async (projectData: any) => {
    try {
      console.log('Saving project with data:', projectData);
      if (editingProject._id) {
        console.log('Updating project with ID:', editingProject._id);
        const result = await apiService.updateProject(editingProject._id, projectData);
        console.log('Update result:', result);
      } else {
        console.log('Creating new project');
        const result = await apiService.createProject(projectData);
        console.log('Create result:', result);
      }
      await loadProjects();
      await loadDashboardData();
      setShowProjectModal(false);
      setEditingProject(null);
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project: ' + error.message);
    }
  };

  const toggleFeatured = async (projectId: string, currentFeatured: boolean) => {
    try {
      await apiService.updateProject(projectId, { featured: !currentFeatured });
      await loadProjects();
      await loadDashboardData();
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await apiService.deleteProject(projectId);
        console.log('Delete response:', response);
        if (response.success) {
          await loadProjects();
          await loadDashboardData();
          alert('Project deleted successfully!');
        } else {
          alert('Failed to delete project: ' + response.message);
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project: ' + error.message);
      }
    }
  };

  const handleEditSkill = (skill: any) => {
    setEditingSkill(skill);
    setShowSkillModal(true);
  };

  const handleSaveSkill = async (skillData: any) => {
    try {
      if (editingSkill._id) {
        await apiService.updateSkill(editingSkill._id, skillData);
      } else {
        await apiService.createSkill(skillData);
      }
      await loadSkills();
      setShowSkillModal(false);
      setEditingSkill(null);
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        await apiService.deleteSkill(skillId);
        await loadSkills();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const toggleSkillActive = async (skillId: string, currentActive: boolean) => {
    try {
      await apiService.updateSkill(skillId, { isActive: !currentActive });
      await loadSkills();
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const updateContactStatus = async (contactId: string, status: string) => {
    try {
      await apiService.updateContactStatus(contactId, status);
      loadDashboardData(); // Refresh data
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (contactId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await apiService.deleteContact(contactId);
        loadDashboardData();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'new';
      case 'read': return 'read';
      case 'replied': return 'replied';
      case 'viewed': return 'viewed';
      default: return status;
    }
  };

  const handleCardClick = (view: 'messages' | 'projects' | 'content' | 'settings' | 'skills' | 'media') => {
    setCurrentView(view);
    if (view !== 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEdit = (field: string, currentValue: string) => {
    setIsEditing(field);
    setTempValue(currentValue);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async (field: string) => {
    const updatedSettings = { ...portfolioSettings, [field]: tempValue };
    setPortfolioSettings(updatedSettings);
    setIsEditing(null);
    setTempValue('');
    
    try {
      await fetch('http://localhost:5000/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      });
    } catch (error) {
      console.error('Error saving settings:', error);
    }
    
    console.log('Saved field:', field.replace(/[\r\n]/g, ''), 'Length:', tempValue.length);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setTempValue('');
  };

  const renderDashboardCards = () => {
    const cards = [
      {
        id: 'messages',
        title: 'Messages',
        value: stats?.totalContacts || 0,
        subtitle: `${stats?.newContacts || 0} new messages`,
        icon: MessageSquare,
        color: 'blue',
        bgColor: 'bg-blue-100',
        iconColor: 'text-blue-600',
        hoverColor: 'hover:bg-blue-50'
      },

      {
        id: 'projects',
        title: 'Projects',
        value: stats?.totalProjects || 0,
        subtitle: `${stats?.featuredProjects || 0} featured`,
        icon: FolderOpen,
        color: 'green',
        bgColor: 'bg-green-100',
        iconColor: 'text-green-600',
        hoverColor: 'hover:bg-green-50'
      },
      {
        id: 'skills',
        title: 'Skills',
        value: skills.length || 0,
        subtitle: `${skills.filter(s => s.isActive).length} active`,
        icon: TrendingUp,
        color: 'emerald',
        bgColor: 'bg-emerald-100',
        iconColor: 'text-emerald-600',
        hoverColor: 'hover:bg-emerald-50'
      },


      {
        id: 'media',
        title: 'Media Manager',
        value: 'Upload',
        subtitle: 'Project images',
        icon: Image,
        color: 'purple',
        bgColor: 'bg-purple-100',
        iconColor: 'text-purple-600',
        hoverColor: 'hover:bg-purple-50'
      },
      {
        id: 'settings',
        title: 'Settings',
        value: 'Configure',
        subtitle: 'Site configuration',
        icon: Settings,
        color: 'gray',
        bgColor: 'bg-gray-100',
        iconColor: 'text-gray-600',
        hoverColor: 'hover:bg-gray-50'
      }
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleCardClick(card.id as 'messages' | 'projects' | 'content' | 'settings' | 'skills');
            }}
            className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${card.hoverColor} overflow-hidden`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${card.bgColor} group-hover:scale-110 transition-all duration-300`}>
                  <card.icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-lg font-bold text-gray-800 mb-1">{card.value}</p>
                <p className="text-xs text-gray-600">{card.subtitle}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        ))}
      </div>
    );
  };

  const renderMessagesView = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
          <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
          Messages
        </h2>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="group px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Dashboard</span>
        </button>
      </div>
      
      {/* Mobile Cards View */}
      <div className="block lg:hidden space-y-4">
        {recentContacts.map((contact, index) => (
          <div key={contact._id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-102" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{contact.name}</h3>
                  <p className="text-sm text-gray-500">{contact.email}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status || 'new')}`}>
                {getStatusText(contact.status || 'new')}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-3 line-clamp-2">{contact.subject}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {contact.createdAt && formatDate(contact.createdAt)}
              </span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    console.log('Selected contact:', contact);
                    setSelectedContact(contact);
                  }} 
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  View
                </button>
                <a 
                  href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                  className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Reply
                </a>
                <button 
                  onClick={() => deleteContact(contact._id!)}
                  className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/50 divide-y divide-gray-200">
              {recentContacts.map((contact, index) => (
                <tr key={contact._id} className="hover:bg-blue-50/50 transition-colors duration-200" style={{ animationDelay: `${index * 50}ms` }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                        <div className="text-sm text-gray-500">{contact.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">{contact.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {contact.createdAt && formatDate(contact.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status || 'new')} shadow-sm`}>
                      {getStatusText(contact.status || 'new')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button 
                      onClick={() => {
                        console.log('Selected contact:', contact);
                        setSelectedContact(contact);
                      }} 
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      View
                    </button>
                    <a 
                      href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
                      className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors inline-block"
                    >
                      Reply
                    </a>
                    <button 
                      onClick={() => deleteContact(contact._id!)}
                      className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Updated getProjectImage function to use mediaUploadedImages state
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

      // Then check for general project images from state or localStorage
      if (mediaUploadedImages.projects && mediaUploadedImages.projects[index]) {
        return mediaUploadedImages.projects[index];
      }
      
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

  // Get thumbnail for admin panel using same logic as website
  const getProjectThumbnail = (project: any, index: number) => {
    // First check if project has uploaded images in database
    if (project.images && project.images.length > 0) {
      return project.images[0];
    }
    
    // Use hardcoded default images for known projects
    if (project.title && project.title.toLowerCase().includes('facebook')) {
      return 'https://picsum.photos/400/300?random=1';
    }
    if (project.title && project.title.toLowerCase().includes('portfolio')) {
      return 'https://picsum.photos/400/300?random=2';
    }
    
    // For other projects, use placeholder
    return 'https://via.placeholder.com/400x200/e5e7eb/6b7280?text=' + encodeURIComponent(project.title || 'Project');
  };

  const renderProjectsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => {
              setEditingProject({});
              setShowProjectModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <FolderOpen className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Projects</h3>
            <p className="text-3xl font-bold text-blue-600">{projects.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Featured</h3>
            <p className="text-3xl font-bold text-yellow-600">{projects.filter(p => p.featured).length}</p>
          </div>
        </div>
        <div 
          onClick={() => {
            setEditingProject({});
            setShowProjectModal(true);
          }}
          className="bg-white rounded-lg shadow p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer transition-colors"
        >
          <div className="text-center">
            <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Add New Project</h3>
            <p className="text-sm text-gray-500">Click to create</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={project._id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    {project.featured && (
                      <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        Featured
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies?.slice(0, 3).map((tech: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleFeatured(project._id, project.featured)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      project.featured 
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {project.featured ? 'Featured' : 'Not Featured'}
                  </button>
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    project.status === 'completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors flex items-center"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Media view state - moved outside render function
  const [mediaUploadedImages, setMediaUploadedImages] = useState<{[key: string]: string[]}>({});
  const [mediaDragOver, setMediaDragOver] = useState<string | null>(null);
  const [mediaUploading, setMediaUploading] = useState<string | null>(null);

  // Load existing images from localStorage
  useEffect(() => {
    try {
      const savedImages = localStorage.getItem('mediaManager_uploadedImages');
      if (savedImages) {
        const parsedImages = JSON.parse(savedImages);
        setMediaUploadedImages(parsedImages);
      }
    } catch (error) {
      console.error('Error loading saved images:', error);
    }
  }, []);

  const renderMediaView = () => {

    const handleFileUpload = (files: FileList | null, category: string) => {
      if (!files) return;
      
      setMediaUploading(category);
      const newImages: string[] = [];
      
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              const updatedImages = {
                ...mediaUploadedImages,
                [category]: [...(mediaUploadedImages[category] || []), ...newImages]
              };
              setMediaUploadedImages(updatedImages);
              
              // Save to localStorage for Projects component
              localStorage.setItem('mediaManager_uploadedImages', JSON.stringify(updatedImages));
              
              // Force re-render of projects if on projects view
              if (currentView === 'projects') {
                loadProjects();
              }
              
              setMediaUploading(null);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    };

    const handleDrop = (e: React.DragEvent, category: string) => {
      e.preventDefault();
      setMediaDragOver(null);
      handleFileUpload(e.dataTransfer.files, category);
    };

    const removeImage = (category: string, index: number) => {
      const updatedImages = {
        ...mediaUploadedImages,
        [category]: mediaUploadedImages[category]?.filter((_, i) => i !== index) || []
      };
      setMediaUploadedImages(updatedImages);
      
      // Update localStorage
      localStorage.setItem('mediaManager_uploadedImages', JSON.stringify(updatedImages));
    };

    const ImageUploadCard = ({ category, title, description, multiple = false }: {
      category: string;
      title: string;
      description: string;
      multiple?: boolean;
    }) => (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Image className="w-5 h-5 mr-2 text-blue-600" />
            {title}
          </h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {mediaUploadedImages[category]?.length || 0} images
          </span>
        </div>
        
        <div
          className={`border-2 border-dashed rounded-xl p-6 sm:p-8 transition-all duration-300 cursor-pointer ${
            mediaDragOver === category 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setMediaDragOver(category);
          }}
          onDragLeave={() => setMediaDragOver(null)}
          onDrop={(e) => handleDrop(e, category)}
          onClick={() => document.getElementById(`${category}-upload`)?.click()}
        >
          <input
            type="file"
            accept="image/*"
            multiple={multiple}
            className="hidden"
            id={`${category}-upload`}
            onChange={(e) => handleFileUpload(e.target.files, category)}
          />
          
          <div className="text-center">
            {mediaUploading === category ? (
              <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-3"></div>
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-white" />
              </div>
            )}
            <p className="text-sm font-medium text-gray-900 mb-1">
              {mediaUploading === category ? 'Uploading...' : `Upload ${title}`}
            </p>
            <p className="text-xs text-gray-500">{description}</p>
            <p className="text-xs text-blue-600 mt-2">Click or drag & drop images here</p>
          </div>
        </div>
        
        {mediaUploadedImages[category] && mediaUploadedImages[category].length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Images</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mediaUploadedImages[category].map((image, index) => (
                <div key={index} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <img
                    src={image}
                    alt={`${category} ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(category, index);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform scale-75 group-hover:scale-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-6">
        {/* Header with Stats */}
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-3">
                    <Image className="w-6 h-6" />
                  </div>
                  Media Manager
                </h2>
                <p className="text-white/80">Manage all your portfolio images in one place</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{Object.values(mediaUploadedImages).flat().length}</div>
                  <div className="text-xs text-white/70">Total Images</div>
                </div>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="group px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  <span>Back</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Picture Upload */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm">👤</span>
            </div>
            Profile Picture
          </h3>
          <div className="flex items-center space-x-4">
            {mediaUploadedImages.profile && mediaUploadedImages.profile[0] && (
              <div className="relative">
                <img
                  src={mediaUploadedImages.profile[0]}
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
                onClick={() => document.getElementById('profile-upload-quick')?.click()}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg"
              >
                <span className="text-xl">📸</span>
                <span>Upload Profile Picture</span>
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="profile-upload-quick"
                onChange={(e) => handleFileUpload(e.target.files, 'profile')}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">This will appear in the About section</p>
            </div>
          </div>
        </div>

        {/* Section Management Cards */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
              <Plus className="w-4 h-4 text-white" />
            </div>
            Portfolio Sections
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { key: 'about', label: 'About Me', icon: '👤', color: 'from-indigo-500 to-purple-500', action: () => setCurrentView('about') },
              { key: 'skills', label: 'Skills', icon: '🎯', color: 'from-emerald-500 to-teal-500', action: () => setCurrentView('skills') },
              { key: 'technologies', label: 'Technologies', icon: '🛠️', color: 'from-cyan-500 to-blue-500', action: () => setCurrentView('technologies') }
            ].map((item) => (
              <div
                key={item.key}
                onClick={item.action}
                className="group relative p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-solid border-gray-200 hover:border-gray-300 transform hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <p className="text-sm font-medium text-center text-gray-700">{item.label}</p>
                <p className="text-xs text-center text-gray-500">Manage content</p>
                <ArrowRight className="w-4 h-4 text-gray-400 absolute top-2 right-2 group-hover:text-gray-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Upload Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
              <Image className="w-4 h-4 text-white" />
            </div>
            Quick Image Upload
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'hero', label: 'Hero', icon: '🏠', color: 'from-blue-500 to-purple-500' },
              { key: 'projects', label: 'Projects', icon: '🚀', color: 'from-green-500 to-blue-500' },
              { key: 'profile', label: 'Profile', icon: '👤', color: 'from-purple-500 to-pink-500' },
              { key: 'about', label: 'About', icon: '📝', color: 'from-orange-500 to-red-500' }
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => document.getElementById(`${item.key}-upload`)?.click()}
                className="group relative p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-dashed border-gray-200 hover:border-gray-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
                <p className="text-sm font-medium text-center text-gray-700">{item.label}</p>
                <p className="text-xs text-center text-gray-500">{mediaUploadedImages[item.key]?.length || 0} images</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id={`${item.key}-upload`}
                  onChange={(e) => handleFileUpload(e.target.files, item.key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { category: 'hero', title: 'Hero Section', desc: 'Main banner images', icon: '🏠', color: 'blue' },
            { category: 'projects', title: 'Project Gallery', desc: 'Screenshots & mockups', icon: '🚀', color: 'green' },
            { category: 'profile', title: 'Profile Photos', desc: 'Professional headshots', icon: '👤', color: 'purple' },
            { category: 'about', title: 'About Section', desc: 'Personal & skill images', icon: '📝', color: 'orange' }
          ].map((section) => (
            <div key={section.category} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className={`p-4 bg-gradient-to-r ${
                section.color === 'blue' ? 'from-blue-500 to-blue-600' :
                section.color === 'green' ? 'from-green-500 to-green-600' :
                section.color === 'purple' ? 'from-purple-500 to-purple-600' :
                'from-orange-500 to-orange-600'
              } text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{section.icon}</span>
                    <div>
                      <h3 className="font-semibold">{section.title}</h3>
                      <p className="text-sm text-white/80">{section.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{mediaUploadedImages[section.category]?.length || 0}</div>
                    <div className="text-xs text-white/70">images</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                {mediaUploadedImages[section.category] && mediaUploadedImages[section.category].length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {mediaUploadedImages[section.category].slice(0, 6).map((image, index) => (
                      <div key={index} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img src={image} alt={`${section.category} ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => removeImage(section.category, index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Image className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No images uploaded yet</p>
                  </div>
                )}
                
                <button
                  onClick={() => document.getElementById(`${section.category}-detailed-upload`)?.click()}
                  className={`w-full py-3 px-4 bg-gradient-to-r ${
                    section.color === 'blue' ? 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' :
                    section.color === 'green' ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' :
                    section.color === 'purple' ? 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' :
                    'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                  } text-white rounded-xl transition-all duration-300 hover:shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Images</span>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id={`${section.category}-detailed-upload`}
                  onChange={(e) => handleFileUpload(e.target.files, section.category)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white">💡</span>
            </div>
            Pro Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-medium text-gray-800 mb-2">📐 Optimal Sizes</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Hero: 1920×1080px</li>
                <li>Projects: 1200×800px</li>
                <li>Profile: 400×400px</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-medium text-gray-800 mb-2">📁 Best Formats</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>JPG for photos</li>
                <li>PNG for graphics</li>
                <li>WebP for web</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <h4 className="font-medium text-gray-800 mb-2">⚡ Performance</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Keep under 2MB</li>
                <li>Compress images</li>
                <li>Use modern formats</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSettingsView = () => {
    const EditableField = ({ label, field, value, type = 'text' }: { label: string; field: string; value: string; type?: string }) => (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {isEditing === field ? (
          <div className="flex space-x-2">
            {type === 'textarea' ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={type}
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            <button
              onClick={() => handleSave(field)}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-900">{value}</span>
            <button
              onClick={() => handleEdit(field, value)}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Settings</h2>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Back
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="space-y-4">
              <EditableField label="Full Name" field="name" value={portfolioSettings.name} />
              <EditableField label="Email Address" field="email" value={portfolioSettings.email} type="email" />
              <EditableField label="Phone Number" field="phone" value={portfolioSettings.phone} type="tel" />
              <EditableField label="Location" field="location" value={portfolioSettings.location} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Social Links</h3>
            <div className="space-y-4">
              <EditableField label="GitHub URL" field="githubUrl" value={portfolioSettings.githubUrl} type="url" />
              <EditableField label="LinkedIn URL" field="linkedinUrl" value={portfolioSettings.linkedinUrl} type="url" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Content Management</h3>
            <div className="space-y-4">
              <EditableField label="Hero Title" field="heroTitle" value={portfolioSettings.heroTitle} />
              <EditableField label="Hero Subtitle" field="heroSubtitle" value={portfolioSettings.heroSubtitle} type="textarea" />
              <EditableField label="About Text" field="aboutText" value={portfolioSettings.aboutText} type="textarea" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Statistics</h3>
            <div className="space-y-4">
              <EditableField label="Experience" field="experience" value={portfolioSettings.experience} />
              <EditableField label="Projects Delivered" field="projectsDelivered" value={portfolioSettings.projectsDelivered} />
              <EditableField label="Client Satisfaction" field="clientSatisfaction" value={portfolioSettings.clientSatisfaction} />
            </div>
          </div>
        </div>
        

      </div>
    );
  };

  const renderAboutView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">About Me Section</h2>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio Text</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Write your bio here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Images</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Upload profile images</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeaturedProjectsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.filter(p => p.featured).map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
            </div>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech: string, index: number) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTechnologiesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Technologies & Tools</h2>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          ← Back
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Frontend</h3>
          <div className="space-y-2">
            {skills.filter(s => s.category === 'frontend').map((skill) => (
              <div key={skill._id} className="flex items-center justify-between">
                <span className="text-gray-700">{skill.name}</span>
                <span className="text-sm text-gray-500">{skill.proficiency}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Backend</h3>
          <div className="space-y-2">
            {skills.filter(s => s.category === 'backend').map((skill) => (
              <div key={skill._id} className="flex items-center justify-between">
                <span className="text-gray-700">{skill.name}</span>
                <span className="text-sm text-gray-500">{skill.proficiency}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tools</h3>
          <div className="space-y-2">
            {skills.filter(s => s.category === 'tools').map((skill) => (
              <div key={skill._id} className="flex items-center justify-between">
                <span className="text-gray-700">{skill.name}</span>
                <span className="text-sm text-gray-500">{skill.proficiency}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountView = () => {
    const [accountForm, setAccountForm] = useState({
      currentEmail: 'admin@portfolio.com',
      currentPassword: 'admin123',
      newEmail: '',
      newPassword: '',
      newUsername: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const handleAccountUpdate = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsUpdating(true);

      try {
        const response = await fetch('/api/auth/update-credentials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(accountForm)
        });
        const result = await response.json();

        if (result.success) {
          localStorage.setItem('authToken', result.token);
          alert('Credentials updated successfully! You are now using your new account.');
          setCurrentView('dashboard');
        } else {
          alert('Error: ' + result.message);
        }
      } catch (error) {
        alert('Error updating credentials');
      } finally {
        setIsUpdating(false);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            ← Back
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Update Admin Credentials</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> You are currently using demo credentials. Update them to secure your admin panel.
            </p>
          </div>

          <form onSubmit={handleAccountUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Username</label>
                <input
                  type="text"
                  value={accountForm.newUsername}
                  onChange={(e) => setAccountForm({...accountForm, newUsername: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Email</label>
                <input
                  type="email"
                  value={accountForm.newEmail}
                  onChange={(e) => setAccountForm({...accountForm, newEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter new email"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={accountForm.newPassword}
                onChange={(e) => setAccountForm({...accountForm, newPassword: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter new password"
                minLength={6}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Updating...' : 'Update Credentials'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderSkillsView = () => {
    const skillsByCategory = skills.reduce((acc: any, skill: any) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    const categoryNames = {
      frontend: 'Frontend',
      backend: 'Backend',
      database: 'Database',
      tools: 'Tools',
      'ui-ux': 'UI/UX',
      other: 'Other'
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Skills Management</h2>
          <div className="flex space-x-3">
            <button 
              onClick={() => {
                setEditingSkill({});
                setShowSkillModal(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <Star className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Skills</h3>
              <p className="text-3xl font-bold text-blue-600">{skills.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <Eye className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Skills</h3>
              <p className="text-3xl font-bold text-green-600">{skills.filter(s => s.isActive).length}</p>
            </div>
          </div>
          <div 
            onClick={() => {
              setEditingSkill({});
              setShowSkillModal(true);
            }}
            className="bg-white rounded-lg shadow p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 cursor-pointer transition-colors"
          >
            <div className="text-center">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Add New Skill</h3>
              <p className="text-sm text-gray-500">Click to create</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills]: [string, any]) => (
            <div key={category} className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {categoryNames[category as keyof typeof categoryNames] || category}
                </h3>
                <button
                  onClick={() => {
                    setEditingSkill({ category });
                    setShowSkillModal(true);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categorySkills.map((skill: any) => (
                    <div key={skill._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: skill.color }}
                          ></div>
                          <h4 className="font-medium text-gray-900">{skill.name}</h4>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEditSkill(skill)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSkill(skill._id)}
                            className="text-red-600 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => toggleSkillActive(skill._id, skill.isActive)}
                          className={`px-3 py-1 text-xs rounded-full transition-colors ${
                            skill.isActive 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {skill.isActive ? 'Active' : 'Inactive'}
                        </button>
                        <span className="text-xs text-gray-500">Order: {skill.order}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {currentView === 'dashboard' && 'Admin Dashboard'}
                    {currentView === 'messages' && '💬 Messages'}
                    {currentView === 'about' && '👤 About Me'}
                    {currentView === 'projects' && '🚀 All Projects'}
                    {currentView === 'featured-projects' && '⭐ Featured Projects'}
                    {currentView === 'skills' && '🎯 Skills Management'}
                    {currentView === 'technologies' && '🛠️ Technologies'}
                    {currentView === 'media' && '🖼️ Media Manager'}
                    {currentView === 'settings' && '⚙️ Settings'}
                  </h1>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    {currentView === 'dashboard' && 'Manage your portfolio contacts and projects'}
                    {currentView === 'messages' && 'View and manage contact messages'}
                    {currentView === 'about' && 'Edit your profile and bio content'}
                    {currentView === 'projects' && 'Manage all your portfolio projects'}
                    {currentView === 'featured-projects' && 'Manage showcase projects'}
                    {currentView === 'skills' && 'Manage your skills and expertise'}
                    {currentView === 'technologies' && 'Manage your tech stack and tools'}
                    {currentView === 'media' && 'Upload and manage images'}
                    {currentView === 'settings' && 'Edit contact information and content'}
                    {currentView === 'account' && 'Update your admin login credentials'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-green-100 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 text-sm font-medium">Online</span>
                </div>
                <button
                  onClick={() => setCurrentView('account')}
                  className="group px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Account</span>
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    window.location.hash = '#/';
                  }}
                  className="group px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <span className="text-sm font-medium">Logout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Render different views */}
        {currentView === 'dashboard' && (
          <>
            {renderDashboardCards()}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Activity
                </h2>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2 text-blue-600" />
                      Latest Messages
                    </h3>
                    <div className="space-y-3">
                      {recentContacts.slice(0, 3).map((contact, index) => (
                        <div key={contact._id} className="group flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-102">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {contact.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                            <p className="text-xs text-gray-500 truncate">{contact.subject}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status || 'new')} shadow-sm`}>
                            {getStatusText(contact.status || 'new')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">
                      Quick Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <Mail className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{stats?.totalContacts || 0}</p>
                        <p className="text-sm text-gray-600">Total Messages</p>
                      </div>
                      <div className="group text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                        <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                          <FolderOpen className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-2xl font-bold text-green-600">{stats?.totalProjects || 0}</p>
                        <p className="text-sm text-gray-600">Projects</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {currentView === 'messages' && renderMessagesView()}
        {currentView === 'about' && renderAboutView()}
        {currentView === 'projects' && renderProjectsView()}
        {currentView === 'skills' && renderSkillsView()}
        {currentView === 'technologies' && renderTechnologiesView()}
        {currentView === 'settings' && renderSettingsView()}
        {currentView === 'account' && renderAccountView()}
        {currentView === 'media' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Media Manager</h2>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Back
              </button>
            </div>
            <iframe 
              src="#/media-manager" 
              className="w-full h-screen border-0 rounded-lg"
              title="Media Manager"
            />
          </div>
        )}

        {/* Project Edit Modal */}
        {showProjectModal && (
          <ProjectEditModal
            project={editingProject}
            onSave={handleSaveProject}
            onClose={() => {
              setShowProjectModal(false);
              setEditingProject(null);
            }}
          />
        )}

        {/* Skill Edit Modal */}
        {showSkillModal && (
          <SkillEditModal
            skill={editingSkill}
            onSave={handleSaveSkill}
            onClose={() => {
              setShowSkillModal(false);
              setEditingSkill(null);
            }}
          />
        )}



        {/* Contact Detail Modal */}
        {selectedContact && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20 animate-slideUp">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {selectedContact.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Contact Details</h3>
                      <p className="text-sm text-gray-500">Message from {selectedContact.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <p className="text-gray-900 font-medium">{selectedContact.name}</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900 font-medium break-words">{selectedContact.email}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <p className="text-gray-900 font-medium">{selectedContact.subject}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{selectedContact.message}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <p className="text-gray-900 font-medium">
                      {selectedContact.createdAt && formatDate(selectedContact.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => updateContactStatus(selectedContact._id!, 'replied')}
                      className="group flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Mark as Replied</span>
                    </button>
                    <button
                      onClick={() => updateContactStatus(selectedContact._id!, 'viewed')}
                      className="group flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <span>Mark as Viewed</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                      className="group flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Reply via Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;