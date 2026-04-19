export const mockRiskScore = {
  score: 62, // 0-50 Green, 51-65 Amber, 66-100 Red
  status: 'Amber',
  label: 'Moderate Risk',
  updatedAt: new Date().toISOString(),
};

export const mockSignalCards = [
  { id: 1, title: 'Circular Debt', value: 'High', status: 'critical', description: 'Borrowing to pay off other debts.' },
  { id: 2, title: 'EMI Ratio', value: '45%', status: 'warning', description: 'EMI to income ratio.' },
  { id: 3, title: 'App Count', value: '8 apps', status: 'critical', description: 'Active loan applications.' },
  { id: 4, title: 'Balance Trend', value: 'Steady', status: 'healthy', description: 'Average monthly balance.' },
  { id: 5, title: 'NACH Bounce', value: '0 this month', status: 'healthy', description: 'Auto-debit failures.' },
];

export const mockRiskTrend = Array.from({ length: 30 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  score: Math.max(0, Math.min(100, 50 + Math.sin(i * 0.5) * 20 + Math.random() * 10)),
}));

export const mockAlertHistory = [
  { id: 1, type: 'WhatsApp', message: 'Alert: Unusually high EMI ratio detected.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), recipient: 'Guardian (Dad)' },
  { id: 2, type: 'WhatsApp', message: 'Alert: NACH Bounce recorded on active loan.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), recipient: 'Guardian (Dad)' },
  { id: 3, type: 'WhatsApp', message: 'Notice: Monthly summary report sent.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), recipient: 'Guardian (Dad)' },
];
