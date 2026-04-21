import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useMotionValue, animate, AnimatePresence } from 'framer-motion';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { AlertTriangle, Activity, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockRiskScore, mockSignalCards, mockRiskTrend } from '@/data/mockData';

export function DashboardPage() {
  const location = useLocation();
  const scoreData = location.state?.scoreData;

  const [displayScore, setDisplayScore] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const count = useMotionValue(0);

  const finalScore = scoreData ? scoreData.risk_score : mockRiskScore.score;
  const finalStatus = scoreData ? (scoreData.is_critical ? 'Critical' : (finalScore > 50 ? 'Amber' : 'Green')) : mockRiskScore.status;

  let displayCards = mockSignalCards;
  if (scoreData?.signals) {
    displayCards = [
      { id: 1, title: 'Circular Debt', value: scoreData.signals.circular_debt > 0 ? 'Detected' : 'None', status: scoreData.signals.circular_debt > 0 ? 'critical' : 'healthy', description: 'Borrowing to pay off other debts.' },
      { id: 2, title: 'EMI Ratio', value: `${(scoreData.signals.emi_ratio * 100).toFixed(0)}%`, status: scoreData.signals.emi_ratio > 0.5 ? 'warning' : 'healthy', description: 'EMI to income ratio.' },
      { id: 3, title: 'App Count', value: `${scoreData.signals.app_count} apps`, status: scoreData.signals.app_count > 2 ? 'critical' : 'healthy', description: 'Active loan applications.' },
      { id: 4, title: 'Balance Trend', value: scoreData.signals.balance_trend < 0 ? 'Declining' : 'Steady', status: scoreData.signals.balance_trend < 0 ? 'warning' : 'healthy', description: 'Average monthly balance.' },
      { id: 5, title: 'NACH Bounce', value: `${scoreData.signals.nach_bounce} this month`, status: scoreData.signals.nach_bounce > 0 ? 'critical' : 'healthy', description: 'Auto-debit failures.' },
    ];
  }

  useEffect(() => {
    // Animate the risk score value on load sweeping from 0 to final score
    const timeout = setTimeout(() => {
      const controls = animate(count, finalScore, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayScore(Math.round(latest));
        }
      });
      return controls.stop;
    }, 500);
    return () => clearTimeout(timeout);
  }, [finalScore, count]);

  useEffect(() => {
    if (scoreData) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [scoreData]);

  const getScoreColor = (score: number) => {
    if (score <= 50) return '#39ff14'; // Neon Green
    if (score <= 65) return '#ffbf00'; // Neon Amber
    return '#ff073a'; // Neon Red
  };

  const chartData = [{ name: 'Risk', value: finalScore, fill: getScoreColor(finalScore) }];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Financial Health Dashboard</h1>
        <p className="text-muted-foreground mt-2">Real-time analysis of your risk profile and signals.</p>
      </div>

      {/* Top Section: Radial Gauge */}
      <Card className="overflow-hidden border-border/50 bg-card/40 backdrop-blur-md">
        <CardContent className="p-0 sm:flex items-center">
          <div className="sm:w-1/3 flex justify-center p-6 bg-background/50">
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  cx="50%" 
                  cy="50%" 
                  innerRadius="70%" 
                  outerRadius="100%" 
                  barSize={20} 
                  data={chartData} 
                  startAngle={180} 
                  endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar 
                    background={{ fill: 'hsl(var(--muted))' }}
                    dataKey="value"
                    cornerRadius={10} 
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
                <span className="text-5xl font-extrabold tracking-tighter" style={{ color: getScoreColor(displayScore) }}>
                  {displayScore}
                </span>
                <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest mt-1">
                  Risk Score
                </span>
              </div>
            </div>
          </div>
          <div className="sm:w-2/3 p-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              Spiral Risk Level: 
               <Badge style={{ backgroundColor: getScoreColor(finalScore) }} className="text-white hover:opacity-80">
                 {finalStatus}
               </Badge>
            </h2>
            <p className="text-muted-foreground text-lg mb-4">
              {scoreData && scoreData.is_critical 
                ? "Your current risk is considered critical. Multiple warnings detected. Immediate action required to restore financial health." 
                : "Your current risk is considered moderate. Some critical signals have been detected that require attention. Avoid taking on new debts."}
            </p>
            <div className="flex gap-4">
               <div className="bg-secondary/50 px-4 py-2 rounded-md flex items-center gap-2">
                 <Activity className="w-5 h-5 text-blue-500" />
                 <span className="text-sm font-medium">Updated 5 min ago</span>
               </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Middle Section: Signal Cards Grid */}
      <div>
        <h3 className="text-xl font-bold mb-4">Risk Signals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayCards.map((card, index) => {
            const isCritical = card.status === 'critical';
            const isWarning = card.status === 'warning';
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full border ${isCritical ? 'border-destructive/80 bg-destructive/10 animate-glow-pulse' : isWarning ? 'border-amber-500/50 bg-amber-500/5' : 'border-border/50 bg-card/40 backdrop-blur-md'} transition-all hover:scale-105`}>
                  <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold text-muted-foreground">{card.title}</span>
                      {isCritical ? <AlertTriangle className="w-5 h-5 text-red-500" /> : isWarning ? <AlertTriangle className="w-5 h-5 text-amber-500" /> : <CheckCircle className="w-5 h-5 text-green-500" />}
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${isCritical ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-foreground'}`}>
                        {card.value}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Risk Trend Chart */}
      <Card className="border-border/50 bg-card/40 backdrop-blur-md">
        <CardHeader>
          <CardTitle>Risk Trend</CardTitle>
          <CardDescription>30-day historical view of your Spiral Risk Score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockRiskTrend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => val.replace('Day', 'D')} 
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={false}
                  isAnimationActive={true}
                  activeDot={{ r: 6, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-[#39ff14]/20 border border-[#39ff14]/50 text-[#39ff14] px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(57,255,20,0.2)] flex items-center gap-3 z-50 backdrop-blur-md"
          >
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold text-lg drop-shadow-md">Analysis Complete! Telegram Alert Sent.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
