import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldAlert, Clock, Send } from 'lucide-react';
import { mockAlertHistory } from '@/data/mockData';

export function AlertHistoryPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-xl">
          <ShieldAlert className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alert History</h1>
          <p className="text-muted-foreground mt-1">Review notifications sent to your designated guardian.</p>
        </div>
      </div>

      <div className="space-y-4">
        {mockAlertHistory.length === 0 ? (
          <Card className="bg-card/50 border-dashed">
            <CardContent className="py-12 flex flex-col items-center text-center text-muted-foreground">
              <ShieldAlert className="w-12 h-12 mb-4 opacity-20" />
              <p>No alerts have been triggered yet.</p>
            </CardContent>
          </Card>
        ) : (
          mockAlertHistory.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-border/50 bg-card/50 hover:bg-card/80 transition-colors">
                <div className="flex items-stretch">
                  <div className={`w-2 ${alert.message.includes('Alert') ? 'bg-red-500' : 'bg-blue-500'}`} />
                  <CardContent className="p-6 flex-1 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`${alert.message.includes('Alert') ? 'text-red-500 border-red-500/20 bg-red-500/10' : 'text-blue-500 border-blue-500/20 bg-blue-500/10'}`}>
                          {alert.type}
                        </Badge>
                        <span className="text-sm font-medium flex items-center text-muted-foreground gap-1">
                          <Send className="w-3 h-3" /> To: {alert.recipient}
                        </span>
                      </div>
                      <p className="text-lg font-medium">{alert.message}</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-1 shrink-0 bg-background/50 px-3 py-1.5 rounded-full border border-border/50">
                      <Clock className="w-4 h-4" />
                      {new Date(alert.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
