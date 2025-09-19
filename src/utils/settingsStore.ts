// Global settings store
class SettingsStore {
  private listeners: (() => void)[] = [];
  private settings = {
    email: 'mahadkhan2095@gmail.com',
    phone: '+92 300 8367216',
    location: 'Peshawar'
  };

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const saved = localStorage.getItem('portfolioSettings');
      if (saved) {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  getSettings() {
    return { ...this.settings };
  }

  updateSettings(newSettings: Partial<typeof this.settings>) {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem('portfolioSettings', JSON.stringify(this.settings));
    this.notifyListeners();
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export const settingsStore = new SettingsStore();