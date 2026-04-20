import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, Shield, Loader2 } from 'lucide-react';

export function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleNext = () => setStep(2);
  const handleConnectBank = () => {
    setIsLoading(true);
    // Simulate Setu AA redirect / processing
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 2000);
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const mockSetuTxns = [
      { type: "credit", amount: 50000, narration: "salary transfer" },
      { type: "debit", amount: 15000, narration: "kreditbee emi" },
      { type: "debit", amount: 25000, narration: "mpokket loan emi" },
      { type: "credit", amount: 5000, narration: "lazypay loan credited" },
      { type: "debit", amount: 5000, narration: "simpl repayment" },
      { type: "debit", amount: 10000, narration: "nach return fee due to bounce" }
    ];

    try {
      const userId = fullName || 'mahesh_critical_123';
      const API_URL = import.meta.env.VITE_API_URL || 'https://finguard-backend-itbs.onrender.com';
      
      console.log('Sending data to Render backend...');
      const response = await fetch(`${API_URL}/score/${encodeURIComponent(userId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, name: fullName, transactions: mockSetuTxns })
      });
      const scoreData = await response.json();
      setIsAnalyzing(false);
      navigate('/', { state: { scoreData } });
    } catch (error) {
      console.error(error);
      setIsAnalyzing(false);
      navigate('/');
    }
  };

  return (
    <div className="max-w-2xl mx-auto pt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-2xl border-border/50 bg-card/80 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <CardTitle className="text-3xl">Welcome to FinGuard</CardTitle>
            </div>
            <CardDescription className="text-base">
              Set up your profile to monitor financial health.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    className="bg-background/50" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="Your mobile number" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guardian">Guardian Phone Number (Optional but recommended)</Label>
                  <Input id="guardian" type="tel" placeholder="Guardian's mobile number" className="bg-background/50" />
                  <p className="text-xs text-muted-foreground mt-1">We will alert this number if your financial risk spikes.</p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-lg bg-secondary/50 border border-primary/20 space-y-4 text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium">Connect Bank Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Link your bank account securely via Account Aggregator to allow FinGuard to analyze your statements and signals.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-4"
              >
                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                <h3 className="text-2xl font-bold">Setup Complete!</h3>
                <p className="text-muted-foreground">Your account has been successfully linked. Click Analyze to compute your risk score.</p>
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between border-t border-border/50 pt-6 mt-6">
            {step > 1 && step < 3 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>
            )}
            {step === 1 && (
              <Button className="w-full sm:w-auto ml-auto" onClick={handleNext}>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {step === 2 && (
              <Button className="w-full sm:w-auto ml-auto" onClick={handleConnectBank} disabled={isLoading}>
                {isLoading ? "Redirecting to Setu AA..." : "Connect Bank"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            {step === 3 && (
              <Button className="w-full" disabled={isAnalyzing} onClick={handleAnalyze}>
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Analyzing...
                  </span>
                ) : (
                  "Analyze"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
