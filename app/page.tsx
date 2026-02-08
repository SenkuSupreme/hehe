"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import confetti from "canvas-confetti";

export default function Home() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Calculate anger level (0-1 scale)
  const angerLevel = Math.min(noCount / 15, 1);
  const isAngry = noCount >= 5;
  const isVeryAngry = noCount >= 10;
  const isFurious = noCount >= 15;

  const [loading, setLoading] = useState(true);
  const [packageOpened, setPackageOpened] = useState(false);

  const reactionGifs = useMemo(() => [
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnYxcTFvdmV6aG1rZWZ0bTdkajdoenlvMHlyNzZ2ZGF6MHV3OHo0ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTiTnMhJTwNHChdTZS/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnF4NnBxbWI3NnZ0Z2o5Nm5memcwdnVrNW15ZWg4YnA5aDBiZjA4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BEob5qwFkSJ7G/giphy.gif",
    "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDV1OXNtZ2NsZWQwYzV4czU3eXRoNjBxcXU2bnNjaXJyb3NqeHNodiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG51NHQ4bHEwcnp0bjN0bGl2dGkyNjN0eHd0dmU4dnVwZ2lzZzJrciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iHe7mA9M9SsyQ/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3Q0emNpdHRoMGZrNXc1dHhwNHBicnNmNTBzeWo5ajlpeTZkNHJmdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohhwqDZTMN0TPIgdG/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzFjMXNkOWdjYTVlZnV5bXk2NGlmdnlpdjR2eTZlcXM1OWxrbmY2ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ANbD1CCdA3iI8/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWh4cG43Zzcxc2Q4YTM0bTFsdHl6aDZrbWt6eDNidHN2MjExc2ZqYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JszbHyYidYQmtimjND/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnFxY2hvOGlxNnN0MnFyY2FheWMzZW0yazlrcnE0OWNlaXp2MWdkZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TePqFNn1GAiCskp9Ep/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExajJsejdoa3h6cDd5b2hsY2Fkbmk3bHZncXUyY2VjOHlyaWJvZWRkdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qxCYGGPbQp3yj5aSsL/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2xhaXM3MmNtNTh6ejdzMTZ3c2l2cWQwdGlkdmhnbGJhZXdlaDYwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vhk9HwPx3TO0w/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGV3bTZ1Z2w3azk0eHFxc2o1NTNic29sM25zaHk1YnhjYm9icTZoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7TWecD5OaqpKE/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG5xdmRrYjhod2puNmtnbGp4Y3kydzc0czJpMzZlb3dnOW1ncjZpNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTcnTehwgRcbgymhTW/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDY3dTc3b3l5dzd4ZzRqZXN4d29tbnZ0NGp2b2xlamp6OHJ1MjIzaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LmQlNCoMhsDhmTj1Dp/giphy.gif",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGk4Ync4bjQ5MGpmZ2tvNGk5dXY1cnlyM2p0OW45ZXgyeXIxemIyNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zPZIJr2THWhidTrr7q/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNzNiN3F3eW0xdWJva2dpZ2U1YTJmOHdnanJtcThhem9ocDFnMWs5MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JzOyy8vKMCwvK/giphy.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWpmcmJkMzV5dHRlZXFjejJiZmZxdnZ0MXVkeXNkZDZ3cTNwbjU5NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LTFmLb6e88cPz2sjux/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2hid3g1Nmt2YWpzZTQyY2s1dTcxZm52cXgyaWNwYW04djI3MmFqbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zZbf6UpZslp3nvFjIR/giphy.gif",
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmRhaTYxcTJ2Y21rMDQ5NDFmZ3R0Y293dzBpeHAybGM1NGg5NTM1byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qcgqx1nqscEJq/giphy.gif",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWNzenA0bmE1YnE1NjRvbm9ncThjYnJnc3JxcTI3MnRlYzRvbzB6diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7tkYn6ElNK5XA0wixN/giphy.gif",
  ], []);

  const celebrationGif = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmQ1MHd6dGQybXA0NTFqYnJjNWx4MzFmNm9oYTJ0NHl2ZjlmemQ0ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif";

  useEffect(() => {
    setMounted(true);
    
    // Preload all GIFs
    const allGifs = [...reactionGifs, celebrationGif];
    let loaded = 0;
    
    const preload = async () => {
      // Wait for celebration GIF + first 5 reactions to ensure common paths are lag-free
      const essentialGifs = [celebrationGif, ...reactionGifs.slice(0, 5)];
      const remainingGifs = reactionGifs.slice(5);

      const essentialPromises = essentialGifs.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; 
        });
      });
      
      await Promise.all(essentialPromises);
      setLoading(false);

      // Load rest in background
      remainingGifs.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preload();
  }, [reactionGifs, celebrationGif]);

  // Check if she said yes immediately (surprised!)
  const isSurprised = yesPressed && noCount === 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  const phrases = [
    "No 😠",
    "Are you sure? 🤨",
    "Really sure? 🥺",
    "Think again! 💭",
    "Last chance! ⚠️",
    "Surely not? 😱",
    "You might regret this! 🧠",
    "Give it another thought! 🤔",
    "Are you certain? 🧐",
    "This could be a mistake! 😬",
    "Have a heart! ❤️",
    "Don't be so cold! ❄️",
    "Change of heart? ✨",
    "Wouldn't you reconsider? 💖",
    "Is that your final answer? 😤",
    "You're breaking my heart 💔",
    "Pretty please? 🎀",
    "I'll buy you chocolate! 🍫",
    "Just say YES! ✅",
    "The No button is hiding! 🏃💨",
  ];

  const hideNoButton = noCount >= phrases.length - 1;



  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const throwConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      // Launch from left edge
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ff69b4', '#ff1493', '#ffd700', '#c084fc'],
      });
      // Launch from right edge
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#ff69b4', '#ff1493', '#ffd700', '#c084fc'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    // Initial burst from center
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffd700', '#c084fc'],
    });
    
    frame();
  }, []);

  const handleYesClick = () => {
    setYesPressed(true);
    throwConfetti();
  };

  const getCurrentGif = () => {
    if (yesPressed) return celebrationGif;
    return reactionGifs[noCount % reactionGifs.length];
  };

  const getNoButtonText = () => phrases[Math.min(noCount, phrases.length - 1)];
  const yesButtonSize = Math.min(noCount * 1.5 + 18, 44);

  useEffect(() => {
    document.title = yesPressed ? "Yay! It's a YES! 💖" : noCount > 10 ? "Please say yes... 🥺" : "Be My Valentine? 💝";
  }, [yesPressed, noCount]);

  // Dynamic colors based on anger
  const getNebulaColor = () => {
    if (isFurious) return 'rgba(220, 38, 38, 0.4)';
    if (isVeryAngry) return 'rgba(234, 88, 12, 0.35)';
    if (isAngry) return 'rgba(236, 72, 153, 0.3)';
    return 'rgba(139, 92, 246, 0.25)';
  };

  const getCardGlow = () => {
    if (isFurious) return '#dc2626';
    if (isVeryAngry) return '#ea580c';
    if (isAngry) return '#ec4899';
    return '#8b5cf6';
  };

  // Floating elements with more variety for "fun"
  // Floating elements - INCREASED & DYNAMIC
  const floatingElements = useMemo(() => 
    [...Array(50)].map((_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 15 + Math.random() * 20,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * -20, // Negative delay to start mid-animation
      floatX: (Math.random() - 0.5) * 50, // Random X movement
      floatY: -100 - Math.random() * 50,  // Always float up
    })), []
  );

  // Mouse position for subtle parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let requestId: number;
    const handleMouseMove = (e: MouseEvent) => {
      // Throttled update using requestAnimationFrame
      if (!requestId) {
        requestId = requestAnimationFrame(() => {
          setMousePos({
            x: (e.clientX / window.innerWidth - 0.5) * 20, // -10 to 10px
            y: (e.clientY / window.innerHeight - 0.5) * 20
          });
          requestId = 0;
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestId) cancelAnimationFrame(requestId);
    };
  }, []);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#050510] z-50 transition-all duration-1000">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin" />
          <div className="absolute inset-0 bg-pink-500 blur-2xl opacity-20 animate-pulse" />
        </div>
        <div className="mt-8 text-center space-y-2">
          <p className="text-pink-300 font-black text-2xl tracking-[0.3em] uppercase animate-pulse">
            Loading Magic...
          </p>
          <p className="text-purple-400 text-sm font-medium opacity-50">
            Gathering all the love & GIFs ✨
          </p>
        </div>
      </div>
    );
  }

  // Initial "Package" Screen
  if (!packageOpened) {
    return (
      <div 
        className="fixed inset-0 flex items-center justify-center bg-[#050510] z-50 transition-all duration-1000"
      >
        <div className="absolute inset-0 opacity-20 animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle at center, #4c1d95 0%, transparent 70%)',
          }}
        />
        <div className="relative group active:scale-95 transition-transform duration-200">
          <div 
            className="relative z-10 text-center animate-bounce cursor-pointer p-8 rounded-full"
            onClick={() => {
              setPackageOpened(true);
              // Initial confetti pop
              confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#ff69b4', '#ff1493', '#ffd700', '#c084fc', '#ffffff'],
              });
            }}
          >
            <div className="text-9xl mb-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 drop-shadow-[0_0_50px_rgba(236,72,153,0.8)] filter">
              🎁
            </div>
            <p className="text-white font-bold text-2xl tracking-[0.2em] uppercase animate-pulse drop-shadow-md">
              Tap to Open
            </p>
            {/* Glow behind the box */}
            <div className="absolute inset-0 bg-pink-500/20 blur-[60px] rounded-full animate-pulse -z-10" />
          </div>
          <div className="absolute -inset-20 bg-linear-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 blur-[80px] rounded-full -z-20 animate-spin-slow" />
        </div>
        
        {/* Floating background elements for package screen too */}
        {floatingElements.map((el, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              fontSize: `${el.size}px`,
              opacity: 0.3,
              animation: `float-up ${el.duration}s linear infinite`,
              animationDelay: `${el.delay}s`,
            }}
          >
             <span className="transition-transform hover:scale-125 duration-300">
             {i % 8 === 0 ? '🌸' : i % 8 === 1 ? '🎀' : i % 8 === 2 ? '✨' : i % 8 === 3 ? '🦋' : i % 8 === 4 ? '🍬' : i % 8 === 5 ? '💖' : i % 8 === 6 ? '💌' : '🍭'}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 overflow-hidden flex items-center justify-center p-4 ${isShaking ? 'animate-shake' : ''}`}>
      
      {/* ===== SIMPLIFIED BACKGROUND WITH PARALLAX ===== */}
      <div 
        className="absolute inset-0 overflow-hidden transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        {/* Base gradient - FIXED FUN VIBE with more dynamic elements */}
        <div 
          className="absolute inset-0 transition-all duration-1000 animate-pulse-slow"
          style={{
            background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', // Always cool purple/blue
            backgroundSize: '200% 200%',
          }}
        />
        
        {/* Animated Gradient Orbs for depth */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: '-3s' }} />
        </div>


        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        {/* Single nebula cloud */}
        <div 
          className="absolute w-[600px] h-[600px] top-1/4 left-1/4 rounded-full transition-all duration-1000 opacity-60 mix-blend-screen"
          style={{
            background: `radial-gradient(circle, ${getNebulaColor()} 0%, transparent 70%)`,
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* CSS Shooting Stars - minimal impact */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.1),0_0_0_8px_rgba(255,255,255,0.1),0_0_20px_rgba(255,255,255,1)] animate-shooting-star" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[60%] left-[50%] w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.1),0_0_0_8px_rgba(255,255,255,0.1),0_0_20px_rgba(255,255,255,1)] animate-shooting-star" style={{ animationDelay: '6s' }} />
        </div>

        {/* Vignette */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${0.3 + angerLevel * 0.3}) 100%)`,
          }}
        />
      </div>

      {/* Floating Hearts - increased density & movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((el, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              fontSize: `${el.size}px`,
              opacity: 0.4,
              animation: `float-up ${el.duration}s linear infinite`,
              animationDelay: `${el.delay}s`,
              filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))'
            }}
          >
            <span className="transition-transform hover:scale-125 duration-300">
             {i % 8 === 0 ? '🌸' : i % 8 === 1 ? '🎀' : i % 8 === 2 ? '✨' : i % 8 === 3 ? '🦋' : i % 8 === 4 ? '🍬' : i % 8 === 5 ? '💖' : i % 8 === 6 ? '💌' : '🍭'}
            </span>
          </div>
        ))}
      </div>

      {yesPressed ? (
        /* ===== CELEBRATION SCREEN ===== */
        <div className="z-20 text-center space-y-6 p-6 max-w-lg animate-fade-in">
          {/* GIF with glow - BIGGER */}
          <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
            <div 
              className="absolute -inset-4 rounded-full opacity-50"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                filter: 'blur(30px)',
              }}
            />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={celebrationGif} alt="Celebration" className="w-full h-full object-cover" loading="eager" />
            </div>
          </div>
          
          {/* Different messages based on if they said yes immediately */}
          {isSurprised ? (
            <>
              <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-500 to-purple-500 mb-4 animate-pulse">
                MY HEART! 💖
              </h1>
              <p className="text-xl md:text-2xl font-bold text-white/95 leading-tight">
                An immediate YES?! <br/> You just made my day so special! ✨
              </p>
              <p className="text-lg text-purple-200/90 mt-4 italic">
                "I really, really like you. Every moment <br/> we talk feels like magic." 🌸
              </p>
              <p className="text-base text-pink-300/60 mt-6 font-medium">
                (I'm literally blushing right now 🙈)
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 mb-4">
                FINALLY! ❤️
              </h1>
              <p className="text-xl md:text-2xl font-bold text-white/95">
                I'm the happiest person right now! 
              </p>
              <p className="text-lg text-purple-200/90 mt-4">
                Thank you for being my Valentine. <br/> I really like you more than words can say! 💌
              </p>
              
              {noCount > 0 && (
                <p className="text-sm text-purple-300/50 mt-6 bg-white/5 py-2 px-4 rounded-full inline-block">
                  (Worth every one of those {noCount} clicks! ❣️)
                </p>
              )}
            </>
          )}

          <div className="flex justify-center gap-3 text-3xl mt-4">
            {['💖', '✨', '💝', '✨', '💖'].map((c, i) => (
              <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{c}</span>
            ))}
          </div>
        </div>
      ) : (
        /* ===== MAIN CARD ===== */
        <div className="z-20 relative max-w-md w-full animate-float group">
          {/* Main Card Glow - Animated */}
          <div 
            className="absolute -inset-4 rounded-4xl transition-all duration-700 opacity-60 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${getCardGlow()}, #ff0080, ${getCardGlow()})`,
              filter: 'blur(30px)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 5s linear infinite',
            }}
          />
          
          {/* Card Border Trace Effect */}
          <div className="absolute -inset-px rounded-4xl bg-linear-to-r from-white/20 via-white/50 to-white/20 p-px animate-gradient-shift">
            <div className="absolute inset-0 bg-linear-to-r from-pink-500 via-purple-500 to-pink-500 rounded-4xl opacity-30 blur-[2px]" />
          </div>

          {/* Card Body */}
          <div 
            className="relative p-8 md:p-10 rounded-4xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(165deg, rgba(25, 25, 55, 0.9) 0%, rgba(10, 10, 25, 0.98) 100%)',
              backdropFilter: 'blur(40px)',
              boxShadow: `0 30px 60px -15px rgba(0,0,0,0.6)`,
            }}
          >
            {/* Animated Light Sweep */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-sweep pointer-events-none" />
            {/* Inner Glow Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />


            {/* GIF Container - BIGGER */}
            <div className="relative mx-auto w-44 h-44 md:w-56 md:h-56 mb-8" key={noCount}>
              <div 
                className="absolute -inset-2 rounded-xl transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${getCardGlow()}60, ${getCardGlow()}30)`,
                  filter: 'blur(10px)',
                }}
              />
              <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-white/20 shadow-xl bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getCurrentGif()} alt="Reaction" className="w-full h-full object-cover" loading="eager" />
              </div>
            </div>

            {/* Title - ensure it's always visible */}
            <div className="relative z-10 space-y-2">
              
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                Will you be my
              </h1>
              <h2 
                className="text-4xl md:text-5xl font-black mb-8 text-center text-transparent bg-clip-text animate-pulse-slow"
                style={{
                  backgroundImage: isFurious 
                    ? 'linear-gradient(90deg, #ef4444, #f97316)'
                    : isAngry
                      ? 'linear-gradient(90deg, #f472b6, #fb7185)'
                      : 'linear-gradient(90deg, #ff0080, #7928ca)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Valentine?
              </h2>
            </div>

            {/* Buttons - ensure always visible */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              {/* YES BUTTON */}
              <button
                className="px-10 py-4 text-white font-black rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none shadow-xl border border-white/10"
                style={{
                  fontSize: `${yesButtonSize}px`,
                  background: 'linear-gradient(135deg, #ff0080 0%, #7928ca 100%)',
                  boxShadow: `0 0 40px rgba(255, 0, 128, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)`,
                }}
                onClick={handleYesClick}
              >
                Yes! 💖
              </button>

              {/* NO BUTTON */}
              {!hideNoButton && (
                <button
                  className={`px-6 py-2.5 font-medium rounded-full transition-all duration-300 focus:outline-none border ${
                    noCount > 15 ? 'opacity-50 scale-90' : ''
                  } ${noCount > 18 ? 'opacity-30 scale-75' : ''}`}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderColor: isFurious ? 'rgba(220, 38, 38, 0.4)' : 'rgba(255,255,255,0.2)',
                    color: isFurious ? 'rgba(254, 202, 202, 0.8)' : 'rgba(255,255,255,0.7)',
                  }}
                  onClick={handleNoClick}
                >
                  {getNoButtonText()}
                </button>
              )}

              {hideNoButton && (
                <div className="text-center mt-2">
                  <p className="text-pink-400 font-medium text-sm">The No button ran away! 🏃💨</p>
                  <p className="text-purple-300/60 text-xs mt-1">Guess you have to say YES!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-3 left-0 right-0 text-center z-10">
        <p className="text-purple-300/40 text-xs">Made with ♥ just for you</p>
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift { animation: gradient-shift 3s linear infinite; }

        @keyframes sweep {
          0% { transform: translateX(-100%) skewX(-45deg); }
          50%, 100% { transform: translateX(200%) skewX(-45deg); }
        }
        .animate-sweep { animation: sweep 6s ease-in-out infinite; }
        
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        @keyframes shooting-star {
          0% { transform: rotate(315deg) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          20% { transform: rotate(315deg) translateX(-1000px); opacity: 0; }
          100% { transform: rotate(315deg) translateX(-1000px); opacity: 0; }
        }
        .animate-shooting-star {
          animation: shooting-star 8s linear infinite;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }

        @keyframes float-up {
          0% { transform: translateY(100vh) translateX(-20px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(20px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
