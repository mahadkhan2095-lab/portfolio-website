const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

export interface Contact {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: 'new' | 'read' | 'replied';
  createdAt?: string;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'ai' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  username: string;
  email: string;
  role: 'admin' | 'client';
}

export interface Skill {
  _id?: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'ui-ux' | 'other';
  proficiency: number;
  icon?: string;
  color: string;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('authToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Contact methods
  async createContact(contact: Omit<Contact, '_id' | 'createdAt' | 'status'>): Promise<{ success: boolean; message: string }> {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
  }

  async getContacts(): Promise<{ success: boolean; contacts: Contact[] }> {
    return this.request('/contacts');
  }

  async updateContactStatus(id: string, status: string, notes?: string): Promise<{ success: boolean; contact: Contact }> {
    return this.request(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  }

  async deleteContact(id: string): Promise<{ success: boolean; message: string }> {
    return this.request(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Project methods
  async getProjects(featured?: boolean, category?: string): Promise<{ success: boolean; projects: Project[] }> {
    const params = new URLSearchParams();
    if (featured !== undefined) params.append('featured', featured.toString());
    if (category) params.append('category', category);
    
    return this.request(`/projects?${params.toString()}`);
  }

  async getProject(id: string): Promise<{ success: boolean; project: Project }> {
    return this.request(`/projects/${id}`);
  }

  async createProject(project: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; project: Project }> {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: string, project: Partial<Project>): Promise<{ success: boolean; project: Project }> {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: string): Promise<{ success: boolean; message: string }> {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Auth methods
  async login(email: string, password: string): Promise<{ success: boolean; token: string; user: User }> {
    const response = await this.request<{ success: boolean; token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.success && response.token) {
      localStorage.setItem('authToken', response.token);
    }
    
    return response;
  }

  async register(userData: { username: string; email: string; password: string; role?: string }): Promise<{ success: boolean; message: string }> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Admin methods
  async getDashboardStats(): Promise<{
    success: boolean;
    stats: {
      totalContacts: number;
      newContacts: number;
      totalProjects: number;
      featuredProjects: number;
    };
    recentContacts: Contact[];
  }> {
    return this.request('/admin/dashboard');
  }

  async getContactsWithPagination(page: number = 1, limit: number = 10): Promise<{
    success: boolean;
    contacts: Contact[];
    pagination: {
      current: number;
      pages: number;
      total: number;
    };
  }> {
    return this.request(`/admin/contacts?page=${page}&limit=${limit}`);
  }

  // Skills methods
  async getSkills(category?: string, active?: boolean): Promise<{ success: boolean; skills: Skill[] }> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (active !== undefined) params.append('active', active.toString());
    
    return this.request(`/skills?${params.toString()}`);
  }

  async getSkill(id: string): Promise<{ success: boolean; skill: Skill }> {
    return this.request(`/skills/${id}`);
  }

  async createSkill(skill: Omit<Skill, '_id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; skill: Skill }> {
    return this.request('/skills', {
      method: 'POST',
      body: JSON.stringify(skill),
    });
  }

  async updateSkill(id: string, skill: Partial<Skill>): Promise<{ success: boolean; skill: Skill }> {
    return this.request(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skill),
    });
  }

  async deleteSkill(id: string): Promise<{ success: boolean; message: string }> {
    return this.request(`/skills/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics methods
  async getContactAnalytics(period: string = '30'): Promise<{
    success: boolean;
    analytics: {
      contactsByDay: Array<{ _id: string; count: number }>;
      statusDistribution: Array<{ _id: string; count: number }>;
      period: string;
    };
  }> {
    return this.request(`/analytics/contacts?period=${period}`);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}

export const apiService = new ApiService();