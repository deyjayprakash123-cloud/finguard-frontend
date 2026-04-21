import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { OnboardingPage } from '@/pages/OnboardingPage';
import { AlertHistoryPage } from '@/pages/AlertHistoryPage';
import { LandingPage } from '@/pages/LandingPage';
import { useEffect } from 'react';

function App() {
  // Apply dark mode by default for demo
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="alerts" element={<AlertHistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
