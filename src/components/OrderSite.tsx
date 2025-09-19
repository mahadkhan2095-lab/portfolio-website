import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const OrderSite = () => {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    requirements: '',
    timeline: '',
    budget: ''
  });

  const packages = [
    {
      id: 'basic',
      name: 'Basic Website',
      price: '$299',
      features: [
        'Responsive Design',
        '3-5 Pages',
        'Contact Form',
        'Basic SEO',
        'Mobile Optimized',
        '1 Month Support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional Website',
      price: '$599',
      features: [
        'Everything in Basic',
        '5-10 Pages',
        'CMS Integration',
        'Advanced SEO',
        'Social Media Integration',
        'Analytics Setup',
        '3 Months Support'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Website',
      price: '$999',
      features: [
        'Everything in Professional',
        'Unlimited Pages',
        'E-commerce Ready',
        'Custom Animations',
        'AI Integration',
        'Performance Optimization',
        '6 Months Support'
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `New Website Order Request:
    
Package: ${selectedPackage}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Business: ${formData.businessName}
Requirements: ${formData.requirements}
Timeline: ${formData.timeline}
Budget: ${formData.budget}`;

    const whatsappUrl = `https://wa.me/923008367216?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-white">Order Your Website</h1>
            <button
              onClick={() => window.location.hash = ''}
              className="text-white hover:text-blue-200 transition-colors"
            >
              ← Back to Portfolio
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get Your Dream Website
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Choose from our carefully crafted packages or let's discuss your custom requirements. 
            Professional web development with AI integration and modern design.
          </p>
        </div>

        {/* Packages Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border transition-all duration-300 hover:scale-105 cursor-pointer ${
                selectedPackage === pkg.id
                  ? 'border-blue-400 bg-white/20'
                  : 'border-white/20 hover:border-white/40'
              } ${pkg.popular ? 'ring-2 ring-blue-400' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-blue-300 mb-4">{pkg.price}</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-blue-100">
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                className={`group relative w-full py-3 rounded-lg font-semibold transition-all duration-300 overflow-hidden hover:scale-105 ${
                  selectedPackage === pkg.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r transition-opacity duration-300 ${
                  selectedPackage === pkg.id
                    ? 'from-blue-400 to-purple-400 opacity-100'
                    : 'from-white/10 to-white/20 opacity-0 group-hover:opacity-100'
                }`} />
                <span className="relative z-10 flex items-center justify-center">
                  {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
                  {selectedPackage === pkg.id && (
                    <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </span>
                <div className={`absolute -inset-1 rounded-lg blur-sm transition-opacity duration-300 ${
                  selectedPackage === pkg.id
                    ? 'bg-blue-400 opacity-30'
                    : 'bg-white opacity-0 group-hover:opacity-20'
                }`} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Let's Start Your Project
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-blue-100 font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                  placeholder="Your full name"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                />
              </div>
              
              <div>
                <label className="block text-blue-100 font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                  placeholder="your@email.com"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-blue-100 font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                  placeholder="+1 (555) 123-4567"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                />
              </div>
              
              <div>
                <label className="block text-blue-100 font-semibold mb-2">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                  placeholder="Your business name"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-blue-100 font-semibold mb-2">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white'
                  }}
                >
                  <option value="" style={{ backgroundColor: '#1e40af', color: 'white' }}>Select timeline</option>
                  <option value="3-5 days" style={{ backgroundColor: '#1e40af', color: 'white' }}>3-5 days (Simple landing page)</option>
                  <option value="1-2 weeks" style={{ backgroundColor: '#1e40af', color: 'white' }}>1-2 weeks (Basic website)</option>
                  <option value="2-3 weeks" style={{ backgroundColor: '#1e40af', color: 'white' }}>2-3 weeks (Professional website)</option>
                  <option value="3-4 weeks" style={{ backgroundColor: '#1e40af', color: 'white' }}>3-4 weeks (Complex website with AI)</option>
                  <option value="1-2 months" style={{ backgroundColor: '#1e40af', color: 'white' }}>1-2 months (E-commerce or advanced features)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-blue-100 font-semibold mb-2">Budget</label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                  placeholder="e.g., $500, $1000-$1500, or your budget range"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-blue-100 font-semibold mb-2">Project Requirements</label>
              <textarea
                name="requirements"
                rows={5}
                value={formData.requirements}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                placeholder="Describe your project requirements, features needed, design preferences, etc."
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              />
            </div>
            
            {selectedPackage && (
              <div className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
                <p className="text-blue-100">
                  <strong>Selected Package:</strong> {packages.find(p => p.id === selectedPackage)?.name}
                </p>
              </div>
            )}
            
            <div className="text-center">
              <button
                type="submit"
                className="group relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center">
                  Send Order via WhatsApp
                  <MessageCircle className="ml-3 w-5 h-5 group-hover:animate-bounce" />
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-300" />
                <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse group-hover:animate-ping" />
              </button>
              <p className="text-blue-200 mt-4 text-sm">
                Your order details will be sent via WhatsApp for quick communication
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderSite;