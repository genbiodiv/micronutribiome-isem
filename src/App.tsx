
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ViewState } from './types';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);

  return (
    <div className="min-h-screen bg-white">
      {view === ViewState.LANDING ? (
        <LandingPage onLaunchDemo={() => setView(ViewState.DASHBOARD)} />
      ) : (
        <Dashboard onBack={() => setView(ViewState.LANDING)} />
      )}
    </div>
  );
}

export default App;

