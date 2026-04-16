import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Download, 
  Cpu, 
  Layers, 
  Shield, 
  Zap, 
  Package, 
  Command, 
  Monitor 
} from 'lucide-react';
import { cn } from './utils/cn';

interface IconProps {
  size?: number;
  className?: string;
}

const GithubIcon = ({ size = 20, className = "" }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const FrontierLogo = ({ size = 32, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="grad-logo" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5e9bff"/>
        <stop offset="1" stopColor="#a78bfa"/>
      </linearGradient>
      <radialGradient id="glow-logo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#5e9bff" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
      </radialGradient>
      <filter id="shadow-logo" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#5e9bff" floodOpacity="0.45"/>
      </filter>
      <clipPath id="clip-logo">
        <circle cx="100" cy="100" r="76"/>
      </clipPath>
    </defs>
    <circle cx="100" cy="100" r="96" fill="url(#glow-logo)"/>
    <circle cx="100" cy="100" r="76" fill="#0d1117" filter="url(#shadow-logo)"/>
    <circle cx="100" cy="100" r="76" stroke="url(#grad-logo)" strokeWidth="3" fill="none"/>
    <circle cx="100" cy="100" r="76" fill="url(#glow-logo)" clipPath="url(#clip-logo)"/>
    <line x1="62" y1="83" x2="114" y2="83" stroke="url(#grad-logo)" strokeWidth="6.5" strokeLinecap="round"/>
    <line x1="62" y1="100" x2="100" y2="100" stroke="url(#grad-logo)" strokeWidth="6.5" strokeLinecap="round"/>
    <line x1="62" y1="117" x2="120" y2="117" stroke="url(#grad-logo)" strokeWidth="6.5" strokeLinecap="round"/>
    <circle cx="126" cy="83" r="4" fill="url(#grad-logo)" opacity="0.85"/>
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 h-16 flex items-center justify-between",
      scrolled ? "bg-frontier-bg/80 backdrop-blur-xl border-b border-frontier-border/50 shadow-2xl" : "bg-transparent"
    )}>
      <div className="flex items-center gap-3">
        <FrontierLogo size={36} />
        <div className="flex items-center gap-2">
          <span className="font-space font-bold text-lg tracking-tight">FrontierOS</span>
          <span className="text-[10px] font-black bg-gradient-to-r from-frontier-accent to-frontier-accent2 text-white px-1.5 py-0.5 rounded-full tracking-wider uppercase">Alpha</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <ul className="hidden md:flex items-center gap-8 list-none">
          <li><a href="#features" className="text-sm font-medium text-frontier-muted hover:text-frontier-text transition-colors">Features</a></li>
          <li><a href="#performance" className="text-sm font-medium text-frontier-muted hover:text-frontier-text transition-colors">Performance</a></li>
          <li><a href="#community" className="text-sm font-medium text-frontier-muted hover:text-frontier-text transition-colors">Community</a></li>
        </ul>
        <div className="h-4 w-[1px] bg-frontier-border/50 hidden md:block" />
        <div className="flex items-center gap-3">
          <a 
            href="https://github.com/dvnentity/FrontierOS" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-full border border-frontier-border/50 hover:border-frontier-accent/50 hover:bg-frontier-accent/10 transition-all text-frontier-muted hover:text-frontier-accent"
          >
            <GithubIcon size={20} />
          </a>
          <a 
            href="#download" 
            className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-frontier-accent text-white text-sm font-semibold shadow-lg shadow-frontier-accent/25 hover:translate-y-[-2px] hover:shadow-frontier-accent/40 active:translate-y-0 transition-all"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </div>
    </nav>
  );
};

interface FeatureCardProps {
  icon: any;
  title: string;
  desc: string;
  delay: number;
}

const FeatureCard = ({ icon: Icon, title, desc, delay }: FeatureCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="group relative p-8 rounded-2xl glass-card hover:bg-frontier-card/80 transition-all duration-500 overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-frontier-accent/5 blur-[40px] rounded-full group-hover:bg-frontier-accent/10 transition-all duration-500" />
    <div className="w-12 h-12 rounded-xl bg-frontier-accent/10 border border-frontier-accent/20 flex items-center justify-center text-frontier-accent mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold font-space mb-3 text-frontier-text">{title}</h3>
    <p className="text-frontier-muted leading-relaxed">{desc}</p>
  </motion.div>
);

interface SectionHeadingProps {
  label: string;
  title: string;
  desc?: string;
}

const SectionHeading = ({ label, title, desc }: SectionHeadingProps) => (
  <div className="text-center mb-16 px-6">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-block text-[11px] font-black text-frontier-accent tracking-[0.2em] uppercase mb-4 py-1 px-3 border border-frontier-accent/20 rounded-full bg-frontier-accent/5"
    >
      {label}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-3xl md:text-5xl font-bold font-space mb-6 tracking-tight"
    >
      {title}
    </motion.h2>
    {desc && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-frontier-muted max-w-2xl mx-auto text-lg leading-relaxed"
      >
        {desc}
      </motion.p>
    )}
  </div>
);

const App = () => {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-frontier-accent/30 selection:text-white">
      {/* Background Layering */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 right-0 h-[800px] bg-gradient-to-b from-frontier-accent/10 via-frontier-bg to-transparent opacity-60" />
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
        
        {/* Animated Blobs */}
        <motion.div 
          animate={{ x: [0, 30, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-frontier-accent/20 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -60, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-frontier-accent2/10 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-frontier-green/5 blur-[150px] rounded-full" 
        />
      </div>

      <Navbar />

      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
          <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0 pointer-events-none opacity-50">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-frontier-accent/10 blur-[100px] rounded-full" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-frontier-accent2/10 blur-[100px] rounded-full" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center max-w-5xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-frontier-accent/30 mb-10 group cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-frontier-accent animate-pulse-slow shadow-lg shadow-frontier-accent/50" />
              <span className="text-xs font-bold text-frontier-accent/80 tracking-wide uppercase">Built on Arch Linux • v0.1.0 Alpha</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-8xl font-black font-space tracking-tighter mb-8 leading-[0.95]"
            >
              The OS built for<br />
              <span className="gradient-text drop-shadow-[0_0_20px_rgba(94,155,255,0.3)]">the next frontier.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-frontier-muted max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              FrontierOS is a blazing-fast, minimal Arch-based Linux distribution designed for power users who refuse to settle for ordinary.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 px-4"
            >
              <a 
                href="https://github.com/dvnentity/FrontierOS/releases" 
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-frontier-accent to-frontier-accent2 text-white font-bold flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-frontier-accent/25 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <Download size={20} className="relative z-10" />
                <span className="relative z-10">Download ISO</span>
              </a>
              <a 
                href="https://github.com/dvnentity/FrontierOS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 rounded-full border border-frontier-border hover:bg-frontier-border/30 transition-all text-frontier-text flex items-center justify-center hover:scale-110 active:scale-95 shadow-xl"
              >
                <GithubIcon size={24} />
              </a>
            </motion.div>
          </motion.div>

        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
          <SectionHeading 
            label="Infrastructure" 
            title="Engineered for Performance"
            desc="FrontierOS is stripped of all non-essential bloat, giving you the pure power of Arch Linux with curated optimizations."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Zap} 
              title="Instant Response" 
              desc="Optimized process scheduling and low-latency kernel tweaks ensure your system reacts as fast as you do." 
              delay={0.1}
            />
            <FeatureCard 
              icon={Shield} 
              title="Immutable Ready" 
              desc="Optional immutable core layers for mission-critical stability while keeping the flexibility of Arch." 
              delay={0.2}
            />
            <FeatureCard 
              icon={Cpu} 
              title="Minimalist Core" 
              desc="With an idle memory footprint under 500MB, every cycle of your hardware goes where it matters most." 
              delay={0.3}
            />
            <FeatureCard 
              icon={Package} 
              title="Frontier Repo" 
              desc="Access to a specialized repository containing bleeding-edge drivers and curated configuration templates." 
              delay={0.4}
            />
            <FeatureCard 
              icon={Monitor} 
              title="Modern Graphics" 
              desc="Built-in support for Wayland, HDR, and high-refresh-rate displays out of the box with zero configuration." 
              delay={0.5}
            />
            <FeatureCard 
              icon={Command} 
              title="Custom CLI" 
              desc="Powerful 'fos' command-line tool for system maintenance, snapshotting, and cloud-syncing your dotfiles." 
              delay={0.6}
            />
          </div>
        </section>

        {/* Performance Stats */}
        <section id="performance" className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-frontier-accent font-black tracking-widest text-[11px] uppercase mb-4 block"
                >
                  By the Numbers
                </motion.span>
                <h2 className="text-4xl md:text-5xl font-bold font-space mb-8 leading-tight">
                  Designed for the <br />1% power users.
                </h2>
                <div className="space-y-8">
                  {[
                    { label: "Boot Time", val: "4.2s", desc: "Average time to interactive desktop." },
                    { label: "Idle RAM", val: "412MB", desc: "Clean boot footprint on Niri." },
                    { label: "Latency", val: "-35%", desc: "Input lag reduction compared to stock kernels." }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-6 group"
                    >
                      <div className="text-4xl font-space font-black text-white group-hover:text-frontier-accent transition-colors">
                        {stat.val}
                      </div>
                      <div>
                        <div className="font-bold text-frontier-text mb-1">{stat.label}</div>
                        <div className="text-frontier-muted text-sm">{stat.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <div className="aspect-square rounded-full border border-frontier-border/50 flex items-center justify-center p-12 relative">
                  <div className="absolute inset-0 bg-frontier-accent/5 blur-[100px] rounded-full" />
                  <div className="relative z-10 w-full h-full rounded-full border border-frontier-accent/20 flex items-center justify-center animate-pulse-slow">
                    <div className="w-1/2 h-1/2 rounded-full border-2 border-dashed border-frontier-accent2/30 animate-spin-slow" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Layers size={120} className="text-frontier-accent drop-shadow-[0_0_30px_rgba(94,155,255,0.4)]" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Community / CTA */}
        <section id="community" className="py-24 px-6">
          <div className="max-w-4xl mx-auto glass-card rounded-[40px] p-8 md:p-16 text-center relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-bold font-space mb-8">Ready to push the <span className="gradient-text">frontier?</span></h2>
            <p className="text-frontier-muted text-lg mb-12 max-w-xl mx-auto">
              Join the alpha testers helping shape FrontierOS into the ultimate Arch-based experience. Community driven, forever open.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://github.com/dvnentity/FrontierOS/releases" 
                className="px-10 py-5 rounded-full bg-white text-frontier-bg font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
              >
                Get Started
              </a>
              <a 
                href="https://github.com/dvnentity/FrontierOS" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-5 rounded-full border border-frontier-border hover:bg-frontier-border/30 transition-all text-frontier-text"
              >
                <GithubIcon size={24} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-frontier-border/50 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <FrontierLogo size={24} />
            <span className="font-space font-bold">FrontierOS</span>
          </div>
          
          <div className="text-frontier-muted text-sm text-center">
            Built with 🤍 by <a href="https://github.com/dvnentity" className="text-frontier-accent hover:underline">dvnentity</a>
            &nbsp;•&nbsp; <span>v0.1.0-alpha</span> &nbsp;•&nbsp; Based on Arch Linux
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/dvnentity/FrontierOS" target="_blank" rel="noopener noreferrer" className="text-frontier-muted hover:text-frontier-text transition-colors">
              <GithubIcon size={20} />
            </a>
            <a href="#" className="text-frontier-muted hover:text-frontier-text transition-colors text-xs font-bold uppercase tracking-widest">Documentation</a>
            <a href="#" className="text-frontier-muted hover:text-frontier-text transition-colors text-xs font-bold uppercase tracking-widest">Privacy</a>
          </div>
        </div>
        <div className="mt-8 text-center text-[10px] text-frontier-muted/50 uppercase tracking-[0.3em]">
          © 2025 FrontierOS Project. Open Source. Forever Free.
        </div>
      </footer>
    </div>
  );
};

export default App;
