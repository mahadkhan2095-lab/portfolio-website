import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Calendar, MessageCircle, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    projectType: 'web-development'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactSettings, setContactSettings] = useState({
    email: 'contact@example.com',
    phone: '+1 234 567 8900',
    location: 'Location'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Save to database first
      const dbResponse = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Contact: ${formData.projectType.replace('-', ' ')}`,
          message: `Company: ${formData.company || 'Not provided'}\nProject Type: ${formData.projectType.replace('-', ' ')}\n\nMessage:\n${formData.message}`
        })
      });
      
      // Create form data for Web3Forms (backup email)
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', '3e6d8513-9998-469d-8615-272bc72927da');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company || 'Not provided');
      formDataToSend.append('project_type', formData.projectType.replace('-', ' '));
      formDataToSend.append('message', formData.message);
      formDataToSend.append('subject', `Portfolio Contact: ${formData.projectType.replace('-', ' ')}`);
      formDataToSend.append('from_name', formData.name);
      
      // Send email using Web3Forms
      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });
      
      const emailResult = await emailResponse.json();
      
      if (emailResult.success) {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            company: '',
            message: '',
            projectType: 'web-development'
          });
        }, 3000);
      } else {
        throw new Error(emailResult.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert(`Failed to send message. Please try again or contact directly at ${contactSettings.email}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/settings');
        if (response.ok) {
          const data = await response.json();
          const settings = data.settings || data;
          setContactSettings({
            email: settings.email || 'contact@example.com',
            phone: settings.phone || '+1 234 567 8900',
            location: settings.location || 'Location'
          });
        }
      } catch (error) {
        console.error('Error loading settings from database:', error);
      }
    };
    loadSettings();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: contactSettings.email,
      href: `mailto:${contactSettings.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: contactSettings.phone,
      href: '#',
      isPhone: true
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: contactSettings.phone,
      href: '#',
      isWhatsApp: true
    },
    {
      icon: MapPin,
      label: 'Location',
      value: contactSettings.location,
      href: '#',
      isLocation: true
    }
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = contactSettings.phone.replace(/[^0-9]/g, '');
    const message = 'Hi! I found your portfolio and would like to discuss a project with you.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const projectTypes = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'ai-integration', label: 'AI Integration' },
    { value: 'e-commerce', label: 'E-commerce' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'other', label: 'Other' }
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-12 shadow-lg">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Thank you for reaching out!
              </h3>
              <p className="text-gray-600 mb-6">
                I've received your message and will get back to you within 24 hours. 
                Looking forward to discussing your project!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <a href={`mailto:${contactSettings.email}`} className="text-blue-600 hover:text-blue-700 text-sm">
                  {contactSettings.email}
                </a>
                <button
                  onClick={handleWhatsAppClick}
                  className="group relative bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center text-sm font-medium overflow-hidden hover:scale-105 hover:shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <MessageCircle className="w-4 h-4 mr-2 group-hover:animate-bounce relative z-10" />
                  <span className="relative z-10">Chat on WhatsApp</span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse group-hover:animate-ping" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into reality? Let's discuss your project 
            and explore how AI-powered web development can elevate your business.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg h-fit">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  if (info.isWhatsApp) {
                    return (
                      <button
                        key={index}
                        onClick={handleWhatsAppClick}
                        className="flex items-start space-x-4 group hover:bg-green-50 p-3 rounded-lg transition-colors duration-300 w-full text-left"
                      >
                        <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors duration-300">
                          <info.icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-500 mb-1">
                            {info.label}
                          </div>
                          <div className="text-gray-900 font-medium">
                            {info.value}
                          </div>
                          <div className="text-xs text-green-600 mt-1 font-medium">
                            Click to chat instantly!
                          </div>
                        </div>
                      </button>
                    );
                  } else if (info.isPhone || info.isLocation) {
                    return (
                      <div
                        key={index}
                        className="flex items-start space-x-4 group hover:bg-blue-50 p-3 rounded-lg transition-colors duration-300"
                      >
                        <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                          <info.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-500 mb-1">
                            {info.label}
                          </div>
                          <div className="text-gray-900 font-medium">
                            {info.value}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <a
                        key={index}
                        href={info.href}
                        className="flex items-start space-x-4 group hover:bg-blue-50 p-3 rounded-lg transition-colors duration-300"
                      >
                        <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                          <info.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium text-gray-500 mb-1">
                            {info.label}
                          </div>
                          <div className="text-gray-900 font-medium break-words">
                            {info.value}
                          </div>
                        </div>
                      </a>
                    );
                  }
                })}
              </div>

              <div className="border-t border-gray-100 pt-6 mt-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">Quick Contact Tip</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Click the WhatsApp button above for instant messaging - I'll respond within minutes!
                  </p>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Why Work With Me?
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600 text-sm">Quick response time</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600 text-sm">Clear communication</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600 text-sm">Quality guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                      placeholder="Your company"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                    >
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center overflow-hidden hover:scale-105 hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300" />
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      <span className="relative z-10">Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 relative z-10" />
                      <span className="relative z-10">Send Message</span>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;