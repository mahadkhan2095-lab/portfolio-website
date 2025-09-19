import React, { useState, useEffect } from 'react';
import { Save, X, Edit, Image, Type, FileText, ArrowLeft } from 'lucide-react';

interface ContentData {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutText: string;
  aboutHighlights: string[];
}

interface ContentEditorProps {
  onBack: () => void;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onBack }) => {
  const [content, setContent] = useState<ContentData>({
    heroTitle: 'AI-Powered Web Developer',
    heroSubtitle: 'Creating innovative digital solutions with artificial intelligence integration',
    heroDescription: 'Passionate about combining traditional web development with cutting-edge AI technologies to build exceptional user experiences.',
    aboutTitle: 'About Me',
    aboutText: 'Passionate web developer specializing in modern technologies and AI integration. I create innovative digital solutions that combine traditional development with cutting-edge artificial intelligence.',
    aboutHighlights: ['5+ Years Experience', 'AI Integration Expert', 'Full-Stack Developer', 'Modern Technologies']
  });

  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load saved content from localStorage
    const savedContent = localStorage.getItem('portfolioContent');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent({ ...content, ...parsed });
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  const handleEdit = (field: string, value: string) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleSave = async (field: string) => {
    setSaving(true);
    const updatedContent = { ...content, [field]: tempValue };
    setContent(updatedContent);
    
    // Save to localStorage
    localStorage.setItem('portfolioContent', JSON.stringify(updatedContent));
    
    setEditingField(null);
    setTempValue('');
    setSaving(false);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...content.aboutHighlights];
    newHighlights[index] = value;
    const updatedContent = { ...content, aboutHighlights: newHighlights };
    setContent(updatedContent);
    localStorage.setItem('portfolioContent', JSON.stringify(updatedContent));
  };

  const addHighlight = () => {
    const updatedContent = { ...content, aboutHighlights: [...content.aboutHighlights, 'New Highlight'] };
    setContent(updatedContent);
    localStorage.setItem('portfolioContent', JSON.stringify(updatedContent));
  };

  const removeHighlight = (index: number) => {
    const newHighlights = content.aboutHighlights.filter((_, i) => i !== index);
    const updatedContent = { ...content, aboutHighlights: newHighlights };
    setContent(updatedContent);
    localStorage.setItem('portfolioContent', JSON.stringify(updatedContent));
  };

  const EditableField = ({ 
    label, 
    field, 
    value, 
    type = 'text',
    rows = 1 
  }: { 
    label: string; 
    field: string; 
    value: string; 
    type?: 'text' | 'textarea';
    rows?: number;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {editingField === field ? (
        <div className="space-y-2">
          {type === 'textarea' ? (
            <textarea
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              rows={rows}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <input
              type="text"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => handleSave(field)}
              disabled={saving}
              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-1"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg group">
          <span className="text-gray-900 flex-1">{value}</span>
          <button
            onClick={() => handleEdit(field, value)}
            className="opacity-0 group-hover:opacity-100 text-blue-600 hover:text-blue-700 transition-all duration-200 ml-2"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            Content Editor
          </h2>
          <p className="text-gray-600 mt-1">Edit your portfolio content and messaging</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
            <Type className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Hero Section</h3>
            <p className="text-sm text-gray-500">Main landing page content</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <EditableField
            label="Hero Title"
            field="heroTitle"
            value={content.heroTitle}
          />
          
          <EditableField
            label="Hero Subtitle"
            field="heroSubtitle"
            value={content.heroSubtitle}
            type="textarea"
            rows={2}
          />
          
          <EditableField
            label="Hero Description"
            field="heroDescription"
            value={content.heroDescription}
            type="textarea"
            rows={3}
          />
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
            <Image className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">About Section</h3>
            <p className="text-sm text-gray-500">Personal information and highlights</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <EditableField
            label="About Title"
            field="aboutTitle"
            value={content.aboutTitle}
          />
          
          <EditableField
            label="About Text"
            field="aboutText"
            value={content.aboutText}
            type="textarea"
            rows={4}
          />
          
          {/* Highlights */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Highlights</label>
              <button
                onClick={addHighlight}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Highlight
              </button>
            </div>
            <div className="space-y-2">
              {content.aboutHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => removeHighlight(index)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
        
        {/* Hero Preview */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Hero Section</h4>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.heroTitle}</h1>
          <h2 className="text-xl text-gray-700 mb-3">{content.heroSubtitle}</h2>
          <p className="text-gray-600">{content.heroDescription}</p>
        </div>
        
        {/* About Preview */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-3">About Section</h4>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{content.aboutTitle}</h3>
          <p className="text-gray-700 mb-4">{content.aboutText}</p>
          <div className="flex flex-wrap gap-2">
            {content.aboutHighlights.map((highlight, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;