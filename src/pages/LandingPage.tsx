import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Brain, Bell, Users, ChevronRight, Lock, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Magnetic Button Component
const MagneticButton = ({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// Animated Flowchart SVG Component
const AnimatedFlowchart = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-card/30 backdrop-blur-md rounded-2xl border border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-cyan-500/5 pointer-events-none" />
      <h3 className="text-2xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">System Architecture Evolution</h3>
      
      <div className="flex flex-col gap-12 relative z-10">
        {/* Phase 1 */}
        <div className="space-y-4">
          <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">Phase 1 (Now)</Badge>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Node icon={<Brain className="w-6 h-6 text-indigo-400"/>} title="XGBoost Prototype" desc="Local AI Model" />
            <Path active />
            <Node icon={<Server className="w-6 h-6 text-blue-400"/>} title="FastAPI" desc="Backend Logic" />
            <Path active />
            <Node icon={<Bell className="w-6 h-6 text-cyan-400"/>} title="Telegram API" desc="Instant Alerts" />
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Phase 2 */}
        <div className="space-y-4 opacity-75">
          <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Phase 2 (Real World RBI Path)</Badge>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Node icon={<Lock className="w-6 h-6 text-cyan-500"/>} title="RBI Account Aggregator" desc="Setu API" />
            <Path />
            <Node icon={<Shield className="w-6 h-6 text-emerald-400"/>} title="Bank-Grade Encryption" desc="Zero Knowledge" />
            <Path />
            <Node icon={<Users className="w-6 h-6 text-purple-400"/>} title="Guardian Network" desc="Decentralized Trust" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Node = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center p-4 bg-background/80 backdrop-blur-xl rounded-xl border border-white/10 w-48 text-center relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
    <div className="mb-2 p-3 bg-white/5 rounded-full">{icon}</div>
    <div className="font-semibold text-sm">{title}</div>
    <div className="text-xs text-muted-foreground mt-1">{desc}</div>
  </motion.div>
);

const Path = ({ active }: { active?: boolean }) => {
  return (
    <div className="h-16 w-1 sm:h-1 sm:w-16 sm:flex-1 relative overflow-hidden self-center">
      <div className="absolute inset-0 bg-white/10 sm:h-1 sm:w-full w-1 h-full rounded" />
      {active && (
        <motion.div 
          className="absolute top-0 left-0 bottom-0 sm:bottom-auto right-0 sm:right-auto bg-gradient-to-r sm:bg-gradient-to-r from-indigo-500 to-cyan-500 blur-sm rounded h-1/2 w-1 sm:h-1 sm:w-1/2"
          animate={{
            y: ['-100%', '200%'],
            x: ['-100%', '200%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </div>
  );
};

const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${className}`}>
    {children}
  </span>
);


export function LandingPage() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen animate-float" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPgo8L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md bg-background/50 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-indigo-400" />
          <span className="text-xl font-bold tracking-tighter">FinGuard</span>
        </div>
        <Button variant="ghost" className="text-white hover:text-cyan-300 hover:bg-white/5" onClick={() => navigate('/onboarding')}>
          Get Started
        </Button>
      </nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20"
      >
        <Badge className="mb-6 bg-white/5 text-muted-foreground border-white/10 z-10">Revolutionizing Financial Well-being</Badge>
        
        {/* Animated Water Shield - Family Focus */}
        <div className="relative w-48 h-48 mx-auto mb-8 flex items-center justify-center animate-float">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-md shadow-[inset_0_0_20px_rgba(34,211,238,0.5),0_0_30px_rgba(34,211,238,0.3)] animate-bubble" />
          {/* Glass edge highlights */}
          <div className="absolute inset-2 bg-gradient-to-tr from-transparent via-white/20 to-transparent border border-white/30 backdrop-blur-sm animate-bubble" style={{ animationDelay: '-2s' }} />
          {/* The Core Icon */}
          <Users className="w-20 h-20 text-cyan-200 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl mx-auto z-10">
          Predictive Security for your <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-mesh" style={{ backgroundSize: '200% auto' }}>
            Financial Future.
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          FinGuard uses advanced behavioral AI to detect financial distress spirals before they happen, protecting you and your loved ones.
        </p>
        
        <MagneticButton
          onClick={() => navigate('/onboarding')}
          className="relative group bg-foreground text-background px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
            Analyze My Risk <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </MagneticButton>
      </motion.section>

      {/* The Why Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto space-y-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold mt-4">Financial Security for the Vulnerable</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              While others track past spending, <span className="text-foreground font-medium">we guard future behavior.</span> We identify predatory debt cycles and stop them fast.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Brain className="w-10 h-10 text-indigo-400" />}
              title="Real-time Detection"
              desc="Our XGBoost pipeline analyzes your transaction metadata and behavioral signals continuously to detect anomalies immediately."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Bell className="w-10 h-10 text-cyan-400" />}
              title="Instant Intervention"
              desc="When critical patterns like cyclical debt emerge, our Telegram bot fires instant alerts directly to you, minimizing damage."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Users className="w-10 h-10 text-emerald-400" />}
              title="Guardian Trust"
              desc="A family-centric security approach. Share alerts automatically with designated guardians, fostering a supportive safety net."
              delay={0.3}
            />
          </div>

        </div>
      </section>

      {/* Flowchart Section */}
      <section className="py-32 px-4 bg-black/40 border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
          >
            <AnimatedFlowchart />
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 px-4 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-4xl font-bold">Ready to secure your peace of mind?</h2>
          <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-6 text-lg hover:scale-105 transition-transform" onClick={() => navigate('/onboarding')}>
            Start the Demo
          </Button>
        </motion.div>
      </section>
    </div>
  );
}

const FeatureCard = ({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="p-8 rounded-2xl bg-card/40 backdrop-blur-md border border-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all duration-300 relative group overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <div className="mb-6 bg-white/5 inline-block p-4 rounded-2xl ring-1 ring-white/10">{icon}</div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);
