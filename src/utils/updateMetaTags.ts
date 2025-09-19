export const updateMetaTags = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/settings');
    if (!response.ok) {
      console.warn('Settings API not available, using defaults');
      return;
    }
    const data = await response.json();
    const settings = data.settings || data;
      
      const name = settings.name || 'Portfolio Developer';
      const title = settings.heroTitle || 'Web Developer';
      const subtitle = settings.heroSubtitle || 'Creating innovative digital solutions';
      
      // Update document title
      document.title = `${name} - ${title} | Portfolio`;
      
      // Update meta tags
      const updateMeta = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          meta.name = name;
          document.head.appendChild(meta);
        }
        meta.content = content;
      };
      
      const updateProperty = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };
      
      // Update meta tags
      updateMeta('description', `${name} - ${title} specializing in modern web development. ${subtitle}`);
      updateMeta('author', name);
      
      // Update Open Graph tags
      updateProperty('og:title', `${name} - ${title}`);
      updateProperty('og:description', `${subtitle}. Creating innovative digital solutions.`);
      
      // Update Twitter Card tags
      updateMeta('twitter:title', `${name} - ${title}`);
      updateMeta('twitter:description', subtitle);
      
      // Update loading text
      const loadingText = document.querySelector('.loading-text');
      if (loadingText) {
        loadingText.textContent = `Welcome to ${name}'s Portfolio`;
      }
    }
  } catch (error) {
    console.error('Error updating meta tags:', error);
  }
};