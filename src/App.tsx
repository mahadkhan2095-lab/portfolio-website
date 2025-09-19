import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FacebookProject from './components/FacebookProject';
import PortfolioProject from './components/PortfolioProject';
import AIPromptProject from './components/AIPromptProject';
import OrderSite from './components/OrderSite';
import InteractiveFeatures from './components/InteractiveFeatures';
import BackToTop from './components/BackToTop';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  if (currentPath === '#/facebook-project') {
    return <FacebookProject />;
  }
  
  if (currentPath === '#/portfolio-project') {
    return <PortfolioProject />;
  }
  
  if (currentPath === '#/ai-prompt-project') {
    return <AIPromptProject />;
  }
  
  if (currentPath === '#/order-site') {
    return <OrderSite />;
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <InteractiveFeatures />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;