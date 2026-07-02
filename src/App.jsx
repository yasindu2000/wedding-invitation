import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Calendar, MapPin, ChevronUp } from 'lucide-react';
import './index.css';

const FloatingPetals = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-4 bg-[#e8a3a3] opacity-40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-5%`,
            borderRadius: '50% 0 50% 50%',
            filter: 'blur(1px)',
            transformOrigin: 'center'
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, 360, 720]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  // Background MP3 Audio (WebM is not supported on all mobile devices)
  const calmAudioUrl = "/calm-audio-2.mp3";

  // Scroll to top functionality
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const targetDate = new Date("October 15, 2026 16:30:00").getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current) {
      // Skip the instrumental intro (adjust the number of seconds if needed)
      audioRef.current.currentTime = 18; 
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch(err => console.log("Audio play failed:", err));
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden font-montserrat text-wedding-emerald bg-wedding-light selection:bg-wedding-gold selection:text-white">
      
      {/* Background Audio */}
      <audio 
          ref={audioRef} 
          src={calmAudioUrl} 
          loop={false}
          onEnded={(e) => { e.target.currentTime = 18; e.target.play(); }}
        />

      {/* Landing / Welcome Screen Overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background for Landing (Blurred Video) */}
            <div className="absolute inset-0 w-full h-full">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                onEnded={(e) => { e.target.currentTime = 0; e.target.play(); }}
                className="object-cover object-center w-full h-full scale-110 blur-xl brightness-50"
                src="/bg-video.mp4"
              />
              <div className="absolute inset-0 bg-[#3a2f26]/60 mix-blend-multiply"></div>
            </div>

            {/* Content of Landing Screen */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="relative z-10 flex flex-col items-center text-center text-wedding-light"
            >
              <h1 className="font-cinzel text-3xl md:text-5xl uppercase tracking-[0.4em] mb-4 drop-shadow-lg font-light text-white/90">
                Wedding Ceremony
              </h1>
              <h2 className="mb-16 text-4xl font-semibold tracking-wide text-white font-sinhala md:text-6xl drop-shadow-lg">
                විවාහ මංගල්‍යය
              </h2>
              
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(212, 175, 55, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnter}
                className="bg-[#9e7638] text-white/90 font-sinhala text-base sm:text-lg md:text-xl py-3 px-8 md:py-4 md:px-10 rounded-full border border-white/20 shadow-2xl tracking-widest transition-all mb-4"
              >
                ආරාධනය විවෘත කරන්න
              </motion.button>
              
              <p className="text-xs tracking-widest font-sinhala md:text-sm text-white/60">
                ආරම්භ කිරීමට ක්ලික් කරන්න
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Audio Controller */}
      <AnimatePresence>
        {hasEntered && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleAudio}
            className="fixed z-50 p-4 text-white transition-all duration-300 border rounded-full shadow-xl bottom-6 right-6 bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30"
          >
            {isAudioPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section with Video Background */}
      <section className="relative h-[100svh] flex flex-col items-center justify-center text-wedding-light px-4 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            onEnded={(e) => { e.target.currentTime = 0; e.target.play(); }}
            className="object-cover object-center w-full h-full"
            src="/bg-video.mp4"
          />
          {/* Overlay gradient to ensure text readability */}
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/20 to-black/40"></div>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="z-10 pt-20 text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <p className="font-cinzel text-sm md:text-lg uppercase tracking-[0.3em] text-wedding-gold/90 mb-2">
              You are invited to celebrate the wedding of
            </p>
            <p className="text-sm font-sinhala md:text-lg text-white/80">
              අපගේ විවාහ මංගල්‍යයට ඔබට ආදරයෙන් ආරාධනා කරමු
            </p>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="font-playball text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] mb-6 leading-tight drop-shadow-2xl text-white">
            Amaya <br className="md:hidden" /> <span className="text-wedding-gold text-5xl md:text-7xl">&amp;</span> Kavindu
          </motion.h1>
          
          <motion.div variants={fadeInUp} className="inline-block px-8 py-4 mt-4 border-t border-b border-wedding-gold/40">
            <p className="text-lg tracking-widest font-cinzel md:text-2xl text-white/90">
              15 . 10 . 2026
            </p>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 animate-bounce"
        >
          <svg className="w-6 h-6 text-white/70" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </section>

      {/* Formal Invitation Section */}
      <section className="py-24 relative bg-[#fdfbf7] overflow-hidden min-h-screen flex items-center justify-center">
        {/* Background image generated */}
        <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('/floral-bg.jpg')] bg-cover bg-center"></div>
        <FloatingPetals />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative z-10 max-w-4xl px-4 mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <div className="flex items-center justify-center gap-4 mb-8 text-[#b58b45]">
              <div className="h-[1px] w-16 bg-[#b58b45]/40"></div>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z"/></svg>
              <div className="h-[1px] w-16 bg-[#b58b45]/40"></div>
            </div>
            <p className="font-sinhala tracking-widest text-[#5a4d3c] mb-12 text-sm md:text-base">
              පවුල් දෙකෙහි ආදරයෙන් එක්වනමොහොතක්
            </p>
          </motion.div>

          {/* Bride Parents */}
          <motion.div variants={fadeInUp} className="mb-10">
            <p className="font-cinzel text-xs md:text-sm tracking-[0.2em] text-[#5a4d3c]/80 uppercase mb-2">
              Loving Daughter of Mrs. Mangalika
            </p>
            <p className="font-sinhala text-[#5a4d3c] text-sm md:text-base mb-4">
              ප්‍රේමදාස මැතිතුමාගේ සහ මංගලිකා මැතිණියගේ ආදරණීය දියණිය
            </p>
            <h3 className="font-sinhala text-3xl sm:text-4xl md:text-5xl text-[#b58b45] mt-2 mb-8">අමායා</h3>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-10">
            <p className="font-cinzel text-[#b58b45] italic text-lg md:text-xl mb-2">With</p>
            <p className="font-sinhala text-[#b58b45] text-lg md:text-xl">සමඟ</p>
          </motion.div>

          {/* Groom Parents */}
          <motion.div variants={fadeInUp} className="mb-16">
            <p className="font-cinzel text-xs md:text-sm tracking-[0.2em] text-[#5a4d3c]/80 uppercase mb-2">
              Loving Son of Mr. Wijesiri
            </p>
            <p className="font-sinhala text-[#5a4d3c] text-sm md:text-base mb-4">
              විජේසිරි මැතිතුමාගේ සහ සෙනෙහෙලතා මැතිණියගේ ආදරණීය පුතණුවන්
            </p>
            <h3 className="font-sinhala text-3xl sm:text-4xl md:text-5xl text-[#b58b45] mt-2">කවිඳු</h3>
          </motion.div>

          {/* Bottom text */}
          <motion.div variants={fadeInUp} className="border-t border-b border-[#b58b45]/20 py-8 px-4 mt-8 max-w-2xl mx-auto">
            <p className="font-sinhala text-xs md:text-sm text-[#5a4d3c] leading-[2.5em] tracking-[0.4em] mb-4">
              අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන් පැවැත්වෙන ප්‍රිය සම්භාෂණයට සහභාගී වන මෙන
            </p>
            <p className="font-sinhala text-[#b58b45] text-sm md:text-base tracking-[0.3em]">
              ඔබට / ඔබ දෙපළට / ඔබ සැමට කෙරෙන ගෞරවනීය ඇරයුමයි!
            </p>
          </motion.div>
          
          <motion.p variants={fadeInUp} className="font-sinhala text-[#b58b45] text-xl md:text-2xl tracking-[0.8em] mt-16 font-semibold">
            විවාහ උත්සවය
          </motion.p>
        </motion.div>
      </section>

      {/* Grand Names Section */}
      <section className="py-24 relative bg-white overflow-hidden min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 opacity-30 bg-[url('/floral-bg.jpg')] bg-cover bg-center rotate-180"></div>
        <FloatingPetals />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10 text-center"
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <p className="font-cinzel text-xl md:text-2xl tracking-[0.5em] text-[#5a4d3c] uppercase mb-4">Amaya</p>
            <h2 className="font-sinhala text-5xl sm:text-6xl md:text-[6rem] text-[#8c6b29] font-bold drop-shadow-sm">අමායා</h2>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="flex flex-col items-center justify-center mb-12">
            <p className="font-playball text-4xl text-[#5a4d3c] mb-4">&amp;</p>
            <div className="w-16 h-[1px] bg-[#b58b45]/50 mb-4"></div>
            <p className="font-sinhala text-2xl text-[#8c6b29]">සහ</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="mb-16">
            <p className="font-cinzel text-xl md:text-2xl tracking-[0.5em] text-[#5a4d3c] uppercase mb-4">Kavindu</p>
            <h2 className="font-sinhala text-5xl sm:text-6xl md:text-[6rem] text-[#8c6b29] font-bold drop-shadow-sm">කවිඳු</h2>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="mt-20 text-[#5a4d3c]">
            <p className="font-cinzel text-sm md:text-base tracking-[0.4em] font-semibold mb-2">15 OCT 2026 • 04:30 PM</p>
            <p className="mb-10 text-sm font-semibold tracking-widest font-sinhala md:text-base">15 ඔක්තෝබර් 2026 • සවස 4.30</p>
            
            <div className="max-w-2xl mx-auto text-xs md:text-sm tracking-widest leading-[2em] text-[#7a6a57]">
              <p className="font-cinzel uppercase mb-4 font-semibold text-[#8c6b29]">Together with our families, we joyfully invite you to celebrate our special day.</p>
              <p className="font-sinhala">අපගේ ආදරණීය පවුල් සමග එක්ව, අපගේ ජීවිතයේ සොඳුරුතම දිනය සැමරීමට ඔබගේ ගෞරවනීය පැමිණීම ආදරයෙන් බලාපොරොත්තු වෙමු.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="py-24 md:py-32 px-4 relative bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-[#fdfbf7]">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="relative max-w-4xl p-8 mx-auto overflow-hidden text-center shadow-2xl glass-card rounded-3xl md:p-16 bg-white/80"
        >
          <div className="absolute top-0 left-0 w-32 h-32 m-6 transition-all duration-700 border-t-4 border-l-4 opacity-50 border-wedding-gold/60 rounded-tl-3xl hover:scale-105"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 m-6 transition-all duration-700 border-b-4 border-r-4 opacity-50 border-wedding-gold/60 rounded-br-3xl hover:scale-105"></div>
          
          <div className="mb-12">
            <h2 className="mb-2 text-4xl tracking-wider uppercase font-cinzel md:text-5xl text-wedding-emerald">The Details</h2>
            <h3 className="font-sinhala text-2xl text-[#9e7638] font-semibold">විස්තර</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-12 mt-12 md:grid-cols-2">
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-8 space-y-4 border shadow-sm rounded-2xl bg-wedding-gold/5 border-wedding-gold/10"
            >
              <div className="flex items-center justify-center mx-auto mb-6 rounded-full shadow-lg w-14 h-14 bg-wedding-emerald text-wedding-gold">
                <Calendar size={28} />
              </div>
              <h3 className="text-2xl font-bold font-cinzel text-wedding-emerald">When</h3>
              <h4 className="font-sinhala text-xl text-[#9e7638]">දිනය සහ වේලාව</h4>
              
              <div className="pt-4 border-t border-wedding-gold/20">
                <p className="text-xl font-medium text-gray-800">Thursday, October 15th, 2026</p>
                <p className="mt-1 text-lg text-gray-600 font-sinhala">2026 ඔක්තෝබර් 15 වන බ්‍රහස්පතින්දා</p>
                <p className="mt-4 text-lg text-gray-600">Ceremony begins at 4:30 PM</p>
                <p className="text-gray-500 font-sinhala text-md">සවස 4:30 ට</p>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="p-8 space-y-4 border shadow-sm rounded-2xl bg-wedding-gold/5 border-wedding-gold/10"
            >
              <div className="flex items-center justify-center mx-auto mb-6 rounded-full shadow-lg w-14 h-14 bg-wedding-emerald text-wedding-gold">
                <MapPin size={28} />
              </div>
              <h3 className="text-2xl font-bold font-cinzel text-wedding-emerald">Where</h3>
              <h4 className="font-sinhala text-xl text-[#9e7638]">ස්ථානය</h4>
              
              <div className="pt-4 border-t border-wedding-gold/20">
                <p className="text-xl font-bold text-wedding-emerald">The Grand Cinnamon</p>
                <p className="mt-1 text-lg text-gray-600 font-sinhala">ද ග්‍රෑන්ඩ් සිනමන් හෝටලය</p>
                <p className="mt-4 text-lg text-gray-600">No 23, Galle Road,</p>
                <p className="text-gray-500 font-sinhala text-md">අංක 23, ගාලු පාර,</p>
                <p className="text-lg text-gray-600">Colombo 03</p>
                <p className="text-gray-500 font-sinhala text-md">කොළඹ 03</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="relative px-4 py-24 overflow-hidden text-center bg-wedding-emerald text-wedding-light">
        {/* Subtle background overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative z-10"
        >
          <div className="mb-16">
            <motion.h2 variants={fadeInUp} className="mb-2 text-3xl tracking-widest uppercase font-cinzel md:text-5xl text-wedding-gold drop-shadow-lg">
              Counting the Days
            </motion.h2>
            <motion.h3 variants={fadeInUp} className="text-xl tracking-widest font-sinhala md:text-2xl text-white/80">
              දින ගණනය කිරීම
            </motion.h3>
          </div>
          
          <div className="flex flex-wrap justify-center max-w-4xl gap-6 mx-auto md:gap-8">
            {Object.entries(timeLeft).map(([unit, value], index) => {
              const sinhalaLabels = {
                days: 'දින',
                hours: 'පැය',
                minutes: 'මිනිත්තු',
                seconds: 'තත්පර'
              };
              
              return (
                <motion.div 
                  variants={fadeInUp}
                  key={unit} 
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="flex flex-col items-center justify-center w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-wedding-gold/40 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:bg-white/10 transition-colors"
                >
                  <span className="mb-1 text-4xl font-bold font-cinzel md:text-5xl text-wedding-gold drop-shadow-md">{value}</span>
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/80 font-cinzel">{unit}</span>
                  <span className="text-[10px] md:text-xs text-white/60 font-sinhala">{sinhalaLabels[unit]}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* RSVP Section */}
      <section className="relative px-4 py-24 md:py-32 bg-wedding-light">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="relative z-10 max-w-2xl mx-auto text-center"
        >
          <div className="mb-12">
            <h2 className="mb-2 text-4xl uppercase font-cinzel md:text-6xl text-wedding-emerald">RSVP</h2>
            <h3 className="font-sinhala text-2xl text-[#9e7638] font-semibold">පැමිණීම දැනුම් දීම</h3>
          </div>
          
          <p className="mb-4 text-lg text-gray-600 font-cinzel">Please respond by September 15th, 2026</p>
          <p className="mb-10 text-gray-500 text-md font-sinhala">කරුණාකර 2026 සැප්තැම්බර් 15 ට පෙර ඔබගේ පැමිණීම දැනුම් දෙන්න</p>
          
          <form className="p-8 space-y-6 text-left bg-white border shadow-2xl md:p-12 rounded-3xl border-gray-100/50" onSubmit={(e) => e.preventDefault()}>
            
            <motion.div whileFocus="focus" initial="rest" animate="rest">
              <label className="block mb-2">
                <span className="text-sm font-bold tracking-wider uppercase text-wedding-emerald font-cinzel">Name</span>
                <span className="ml-2 text-sm text-gray-500 font-sinhala">/ නම</span>
              </label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-4 transition-all border border-gray-200 outline-none rounded-xl focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-gray-50 focus:bg-white" 
                placeholder="Your full name" 
              />
            </motion.div>

            <motion.div>
              <label className="block mb-2">
                <span className="text-sm font-bold tracking-wider uppercase text-wedding-emerald font-cinzel">Will you attend?</span>
                <span className="ml-2 text-sm text-gray-500 font-sinhala">/ ඔබ පැමිණෙනවාද?</span>
              </label>
              <div className="relative">
                <select 
                  required
                  className="w-full px-4 py-4 text-gray-700 transition-all border border-gray-200 outline-none appearance-none rounded-xl focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-gray-50 focus:bg-white font-sinhala"
                >
                  <option value="">Please select / තෝරන්න...</option>
                  <option value="yes">Yes, I will attend / ඔව්, මම පැමිණෙනවා</option>
                  <option value="no">No, I can't attend / නැත, මට පැමිණිය නොහැක</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 pointer-events-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </motion.div>

            <motion.div>
              <label className="block mb-2">
                <span className="text-sm font-bold tracking-wider uppercase text-wedding-emerald font-cinzel">Message</span>
                <span className="ml-2 text-sm text-gray-500 font-sinhala">/ පණිවිඩයක්</span>
              </label>
              <textarea 
                rows="4" 
                className="w-full px-4 py-4 transition-all border border-gray-200 outline-none resize-none rounded-xl focus:ring-2 focus:ring-wedding-gold focus:border-transparent bg-gray-50 focus:bg-white font-sinhala" 
                placeholder="Any special requests or wishes... / ඔබට යම් විශේෂ යමක් පැවසීමට ඇත්නම්..."
              ></textarea>
            </motion.div>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0px 10px 20px rgba(2, 77, 56, 0.2)" }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              className="relative flex flex-col items-center justify-center w-full px-8 py-5 mt-6 overflow-hidden tracking-widest uppercase shadow-lg bg-wedding-emerald text-wedding-light rounded-xl group"
            >
              <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out transform -translate-x-full bg-white/20 group-hover:translate-x-full"></div>
              <span className="text-lg font-bold font-cinzel">Send RSVP</span>
              <span className="mt-1 text-sm font-sinhala text-white/80">දැනුම් දෙන්න</span>
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#012a1e] text-center text-wedding-light/60 border-t border-wedding-gold/20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-1 mb-8 rounded-full bg-wedding-gold/50"></div>
          <p className="mb-4 text-5xl font-playball text-wedding-gold drop-shadow-lg">
            Amaya & Kavindu
          </p>
          <p className="mb-8 text-xl font-sinhala text-white/70">
            අමායා සහ කවිඳු
          </p>
          <p className="text-xs tracking-[0.3em] uppercase font-cinzel text-white/40">
            © 2026. All rights reserved.
          </p>
        </motion.div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && hasEntered && (
          <motion.button 
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.5 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-50 p-3 rounded-full bg-[#9e7638] text-white shadow-[0_0_20px_rgba(158,118,56,0.6)] hover:bg-[#b58b45] transition-colors border border-white/20"
          >
            <ChevronUp size={28} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
