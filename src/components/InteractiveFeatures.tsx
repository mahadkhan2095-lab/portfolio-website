import React, { useState, useEffect } from 'react';
import { Code, Zap, Sparkles, MousePointer, Star } from 'lucide-react';

const InteractiveFeatures = () => {
  const [clickCount, setClickCount] = useState(0);
  const [showStars, setShowStars] = useState(false);
  const [ripples, setRipples] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [shakeCard, setShakeCard] = useState(false);
  const [glowCard, setGlowCard] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);



  const handleMagicClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setClickCount(prev => prev + 1);
    setShowStars(true);
    setShakeCard(true);
    
    // Add ripple effect
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setShowStars(false);
      setShakeCard(false);
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };
  
  const handleHoverClick = () => {
    setGlowCard(true);
    setTimeout(() => setGlowCard(false), 2000);
  };

  const techStacks = {
    default: ['React', 'TypeScript', 'AI', 'Node.js', 'Python', 'Next.js'],
    magic: ['JavaScript', 'React Hooks', 'CSS Animations', 'DOM Events'],
    code: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    ai: ['Python', 'TensorFlow', 'Machine Learning', 'Neural Networks']
  };
  
  const [currentTech, setCurrentTech] = useState(0);
  const currentTechStack = activeCard ? techStacks[activeCard as keyof typeof techStacks] : techStacks.default;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech(prev => (prev + 1) % currentTechStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentTechStack]);

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>



      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Interactive Tech Stack */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-8">
            Experience the Magic of
          </h2>
          <div className="relative inline-block">
            <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-500">
              {currentTechStack[currentTech]}
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-xl animate-pulse" />
          </div>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Magic Click Card */}
          <div
            className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group overflow-hidden ${
              shakeCard ? 'animate-pulse' : ''
            }`}
            onClick={handleMagicClick}
            onMouseEnter={() => setActiveCard('magic')}
            onMouseLeave={() => setActiveCard(null)}
            style={{
              transform: shakeCard ? 'scale(1.05)' : 'scale(1)',
              boxShadow: shakeCard ? '0 0 30px rgba(168, 85, 247, 0.5)' : 'none'
            }}
          >
            {/* Ripple Effects */}
            {ripples.map(ripple => (
              <div
                key={ripple.id}
                className="absolute bg-purple-400/30 rounded-full animate-ping pointer-events-none"
                style={{
                  left: ripple.x - 25,
                  top: ripple.y - 25,
                  width: 50,
                  height: 50
                }}
              />
            ))}
            
            <div className="text-center relative z-10">
              <div className={`bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                shakeCard ? 'animate-spin scale-125' : 'group-hover:scale-110'
              }`}>
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Click for Magic!</h3>
              <p className="text-purple-200 text-sm mb-4">Clicked {clickCount} times</p>
              {showStars && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <Star
                      key={i}
                      className="absolute w-6 h-6 text-yellow-400 animate-bounce"
                      style={{
                        left: `${10 + i * 10}%`,
                        top: `${20 + (i % 2) * 40}%`,
                        animationDelay: `${i * 0.1}s`,
                        transform: `rotate(${i * 45}deg)`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Particle explosion effect */}
            {showStars && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"
                    style={{
                      left: `${50 + Math.cos(i * 30 * Math.PI / 180) * 30}%`,
                      top: `${50 + Math.sin(i * 30 * Math.PI / 180) * 30}%`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Hover Effect Card */}
          <div 
            className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-300 group overflow-hidden cursor-pointer ${
              glowCard ? 'animate-pulse' : ''
            }`}
            onClick={handleHoverClick}
            onMouseEnter={() => setActiveCard('code')}
            onMouseLeave={() => setActiveCard(null)}
            style={{
              boxShadow: glowCard ? '0 0 40px rgba(59, 130, 246, 0.6)' : 'none'
            }}
          >
            <div className="text-center relative z-10">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-180 hover:scale-125 transition-all duration-500">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Click Me!</h3>
              <p className="text-blue-200 text-sm">Watch the magic happen</p>
            </div>
            
            {/* Sliding background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            
            {/* Floating code symbols */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              {['<', '>', '{', '}', '/', '*'].map((symbol, i) => (
                <div
                  key={symbol}
                  className="absolute text-blue-300/50 font-mono text-2xl animate-bounce"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${30 + (i % 2) * 30}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                >
                  {symbol}
                </div>
              ))}
            </div>
            
            {/* Glow effect when clicked */}
            {glowCard && (
              <div className="absolute inset-0 bg-blue-400/20 animate-pulse rounded-2xl" />
            )}
          </div>

          {/* Pulse Animation Card */}
          <div 
            className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-green-400/50 transition-all duration-300 group cursor-pointer hover:scale-105"
            onMouseEnter={() => setActiveCard('ai')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="text-center relative z-10">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse group-hover:animate-spin">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Powered</h3>
              <p className="text-green-200 text-sm">Always learning & improving</p>
            </div>
            
            {/* Animated border */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
            
            {/* Electric effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-8 bg-green-400/60 animate-pulse"
                  style={{
                    left: `${20 + i * 12}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.3}s`,
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              ))}
            </div>
            
            {/* Pulsing rings */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-green-400/30 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-emerald-400/40 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" style={{animationDelay: '0.5s'}} />
            </div>
          </div>
        </div>

        {/* Interactive Quote */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-4xl mx-auto">
            <MousePointer className="w-8 h-8 text-purple-400 mx-auto mb-4 animate-bounce" />
            <blockquote className="text-2xl font-light text-white/90 italic mb-4">
              "Every pixel tells a story, every line of code creates possibilities"
            </blockquote>
            <p className="text-purple-300">- Mahad Khan, AI-Powered Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFeatures;