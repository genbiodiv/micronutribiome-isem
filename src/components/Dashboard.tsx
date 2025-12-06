import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  Microscope,
  Dna,
  RefreshCw,
  User,
  ArrowRight,
  Database,
  History
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  Cell,
  Scatter,
  ZAxis,
  ReferenceLine,
  ComposedChart
} from 'recharts';
// Explicitly use 'import type' to avoid runtime errors with Vite
import type { PatientProfile, TimePoint } from '../types';

// --- DATA MOCKING FOR 3 PROFILES WITH TIME SERIES ---

const profiles: Record<string, PatientProfile> = {
  malnutrition: {
    id: "P-DES-042",
    name: "Camilo R. (Bajo Peso)",
    condition: "Malnutrición",
    age: 8,
    description: "Recuperación de disbiosis severa. Reducción progresiva de carga inflamatoria (Proteobacteria) y restauración de diversidad alfa.",
    recommendations: [
      "Suplementación de Zinc y Vitamina A.",
      "Introducción gradual de proteínas hidrolizadas.",
      "Aumentar ingesta calórica densa."
    ],
    timeSeries: [
      {
        id: 't1', label: 'Diagnóstico', shortLabel: 'T1', date: '10 Ene', score: 20,
        metrics: { shannonIndex: 1.5, firmicutesBacteroidetesRatio: 0.3, totalReads: 41000, otusDetected: 110, otusExpected: 680 },
        pcoa: { x: -40, y: 30 },
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 20, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 20, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 50, color: '#ef4444' }, // Severe inflammation
          { phylum: 'Actinobacteria', percentage: 10, color: '#f59e0b' },
        ]
      },
      {
        id: 't2', label: 'Intervención', shortLabel: 'T2', date: '15 Abr', score: 35,
        metrics: { shannonIndex: 1.9, firmicutesBacteroidetesRatio: 0.5, totalReads: 43500, otusDetected: 180, otusExpected: 650 },
        pcoa: { x: -30, y: 25 },
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 28, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 25, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 37, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 10, color: '#f59e0b' },
        ]
      },
      {
        id: 't3', label: 'Seguimiento', shortLabel: 'T3', date: '20 Jul', score: 50,
        metrics: { shannonIndex: 2.4, firmicutesBacteroidetesRatio: 0.7, totalReads: 48000, otusDetected: 290, otusExpected: 620 },
        pcoa: { x: -20, y: 15 },
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 35, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 35, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 20, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 10, color: '#f59e0b' },
        ]
      },
      {
        id: 't4', label: 'Actual', shortLabel: 'T4', date: '20 Oct', score: 65,
        metrics: { shannonIndex: 2.8, firmicutesBacteroidetesRatio: 0.9, totalReads: 52000, otusDetected: 380, otusExpected: 600 },
        pcoa: { x: -10, y: 10 }, // Approaching healthy zone
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 40, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 40, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 10, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 10, color: '#f59e0b' },
        ]
      }
    ]
  },
  healthy: {
    id: "P-SAL-001",
    name: "Ana María G. (Control)",
    condition: "Saludable",
    age: 24,
    description: "Eubiosis mantenida. Alta diversidad funcional y taxonómica. Homeostasis resiliente durante todo el periodo.",
    recommendations: [
      "Mantener dieta rica en fibra (30g/día).",
      "Continuar consumo de alimentos fermentados.",
      "Monitoreo anual preventivo."
    ],
    timeSeries: [
      {
        id: 't1', label: 'Control 1', shortLabel: 'T1', date: '12 Ene', score: 90,
        metrics: { shannonIndex: 4.1, firmicutesBacteroidetesRatio: 1.4, totalReads: 65000, otusDetected: 820, otusExpected: 900 },
        pcoa: { x: 2, y: 2 },
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 55, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 35, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 5, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 5, color: '#f59e0b' },
        ]
      },
      {
        id: 't2', label: 'Control 2', shortLabel: 'T2', date: '14 Abr', score: 88,
        metrics: { shannonIndex: 4.0, firmicutesBacteroidetesRatio: 1.5, totalReads: 67000, otusDetected: 810, otusExpected: 910 },
        pcoa: { x: 3, y: -1 },
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 58, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 32, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 5, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 5, color: '#f59e0b' },
        ]
      },
      {
        id: 't3', label: 'Control 3', shortLabel: 'T3', date: '18 Jul', score: 92,
        metrics: { shannonIndex: 4.2, firmicutesBacteroidetesRatio: 1.4, totalReads: 69000, otusDetected: 850, otusExpected: 920 },
        pcoa: { x: 1, y: 3 },
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 54, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 36, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 5, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 5, color: '#f59e0b' },
        ]
      },
      {
        id: 't4', label: 'Actual', shortLabel: 'T4', date: '22 Oct', score: 92,
        metrics: { shannonIndex: 4.2, firmicutesBacteroidetesRatio: 1.5, totalReads: 68500, otusDetected: 840, otusExpected: 910 },
        pcoa: { x: 2, y: 1 },
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 55, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 35, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 5, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 5, color: '#f59e0b' },
        ]
      }
    ]
  },
  obesity: {
    id: "P-OBS-105",
    name: "Carlos D. (Síndrome Metabólico)",
    condition: "Sobrepeso/Obesidad",
    age: 45,
    description: "Modulación exitosa de la eficiencia energética del microbioma. Descenso de Firmicutes y aumento de degradadores de fibra.",
    recommendations: [
      "Dieta rica en MACs (Carbohidratos Accesibles a la Microbiota).",
      "Restricción calórica moderada.",
      "Introducción de inulina y almidón resistente."
    ],
    timeSeries: [
      {
        id: 't1', label: 'Diagnóstico', shortLabel: 'T1', date: '05 Ene', score: 40,
        metrics: { shannonIndex: 2.4, firmicutesBacteroidetesRatio: 4.8, totalReads: 50000, otusDetected: 320, otusExpected: 500 },
        pcoa: { x: 45, y: -30 }, // Deep in obesity cluster
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 80, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 10, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 8, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 2, color: '#f59e0b' },
        ]
      },
      {
        id: 't2', label: 'Dieta MACs', shortLabel: 'T2', date: '10 Abr', score: 52,
        metrics: { shannonIndex: 2.7, firmicutesBacteroidetesRatio: 3.5, totalReads: 51000, otusDetected: 350, otusExpected: 520 },
        pcoa: { x: 35, y: -25 },
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 70, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 18, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 10, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 2, color: '#f59e0b' },
        ]
      },
      {
        id: 't3', label: 'Ejercicio+', shortLabel: 'T3', date: '15 Jul', score: 64,
        metrics: { shannonIndex: 3.1, firmicutesBacteroidetesRatio: 2.2, totalReads: 53000, otusDetected: 400, otusExpected: 550 },
        pcoa: { x: 25, y: -15 },
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 60, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 28, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 10, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 2, color: '#f59e0b' },
        ]
      },
      {
        id: 't4', label: 'Actual', shortLabel: 'T4', date: '21 Oct', score: 75,
        metrics: { shannonIndex: 3.4, firmicutesBacteroidetesRatio: 1.5, totalReads: 55000, otusDetected: 450, otusExpected: 580 },
        pcoa: { x: 15, y: -10 }, // Closer to healthy
        taxonomy: [
          { phylum: 'Firmicutes', percentage: 50, color: '#3b82f6' },
          { phylum: 'Bacteroidetes', percentage: 38, color: '#10b981' },
          { phylum: 'Proteobacteria', percentage: 10, color: '#ef4444' },
          { phylum: 'Actinobacteria', percentage: 2, color: '#f59e0b' },
        ]
      }
    ]
  }
};

// --- SUB-COMPONENTS ---

const SimulationModal: React.FC<{ 
  isVisible: boolean; 
  onComplete: () => void; 
  profile: PatientProfile;
  timePoint: TimePoint;
}> = ({ isVisible, onComplete, profile, timePoint }) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [otuCount, setOtuCount] = useState(0);
  
  const steps = [
    "Extracción de DNA (PowerSoil Pro)",
    "Amplificación PCR (Región V4 16S rRNA)",
    "Construcción de Librería (Illumina MiSeq)",
    "Secuenciación (2x250bp Paired-end)",
    "Denoising (DADA2 / QIIME2)",
    "Análisis de Rarefacción (Chao1)"
  ];

  useEffect(() => {
    if (isVisible) {
      setProgress(0);
      setStep(0);
      setLogs([]);
      setOtuCount(0);
      let currentProgress = 0;
      
      const interval = setInterval(() => {
        currentProgress += 1;
        setProgress(Math.min(currentProgress, 100));

        // Logic to add logs based on progress
        if (currentProgress > 10 && step === 0) {
          setStep(1); setLogs(prev => [...prev, "> [OK] DNA Yield: Verified for sample " + timePoint.id]);
        }
        if (currentProgress > 30 && step === 1) {
          setStep(2); setLogs(prev => [...prev, "> [OK] PCR Cycle 25 complete. Amplicons verified."]);
        }
        if (currentProgress > 50 && step === 2) {
          setStep(3); setLogs(prev => [...prev, "> [INFO] Cluster Density: 950 K/mm2"]);
        }
        if (currentProgress > 70 && step === 3) {
          setStep(4); setLogs(prev => [...prev, "> [PROCESS] DADA2 denoising... Resolving ASVs."]);
        }
        if (currentProgress > 85 && step === 4) {
          setStep(5); 
          setLogs(prev => [...prev, "> [ANALYSIS] Calculating Alpha Diversity & Rarefaction curves..."]);
        }

        // Animate OTU count near end
        if (currentProgress > 80 && currentProgress < 98) {
             setOtuCount(prev => Math.min(prev + Math.floor(Math.random() * 50), timePoint.metrics.otusDetected));
        }

        if (currentProgress >= 100) {
          setOtuCount(timePoint.metrics.otusDetected); // Ensure final number match
          clearInterval(interval);
          setTimeout(onComplete, 1500); // Slight delay to read final stats
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isVisible, profile, timePoint]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-2xl bg-black border border-emerald-500/50 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Terminal Header */}
        <div className="bg-slate-900 border-b border-emerald-500/30 px-4 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="ml-2 text-emerald-500 text-xs font-bold">ISEM_CORE_V2.4 -- SIMULATION: {timePoint.label}</span>
          </div>
          <span className="text-emerald-500/50 text-xs">RUN_ID: {profile.id.split('-')[1]}_{timePoint.id.toUpperCase()}</span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 flex-1 flex flex-col justify-between overflow-hidden">
          <div className="space-y-2 text-sm shrink-0">
             {steps.map((s, idx) => (
               <div key={idx} className={`flex items-center gap-3 ${idx === step ? 'text-emerald-400 font-bold' : idx < step ? 'text-emerald-700' : 'text-slate-800'}`}>
                 <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${idx <= step ? 'border-emerald-500' : 'border-slate-800'}`}>
                   {idx < step && <div className="w-2 h-2 bg-emerald-500"></div>}
                   {idx === step && <div className="w-2 h-2 bg-emerald-500 animate-pulse"></div>}
                 </div>
                 {s}
               </div>
             ))}
          </div>

          {/* ECOLOGICAL YIELD VISUALIZATION */}
          {step >= 5 && (
            <div className="my-4 border border-emerald-500/30 bg-emerald-900/10 p-4 rounded animate-in fade-in duration-500">
                <h4 className="text-emerald-400 text-xs font-bold mb-3 uppercase tracking-wider border-b border-emerald-500/30 pb-1">
                    &gt; Ecological Yield Analysis (OTUs)
                </h4>
                
                <div className="space-y-3">
                    {/* Detected */}
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-emerald-300">Observed OTUs (Actual)</span>
                            <span className="text-white font-bold">{otuCount}</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-emerald-500 transition-all duration-300"
                                style={{ width: `${(otuCount / 1000) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Expected */}
                    <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-emerald-600">Expected OTUs (Chao1 Estimator)</span>
                            <span className="text-emerald-600 font-bold">{timePoint.metrics.otusExpected}</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-emerald-900">
                            <div 
                                className="h-full bg-emerald-900/50"
                                style={{ width: `${(timePoint.metrics.otusExpected / 1000) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs">
                     <span className="text-emerald-500 font-bold">Coverage: {Math.round((otuCount / timePoint.metrics.otusExpected) * 100)}%</span>
                     <span className="text-slate-500">|</span>
                     <span className={`${otuCount < 300 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {otuCount < 300 ? '⚠ LOW DIVERSITY WARNING' : 'BIODIVERSITY OK'}
                     </span>
                </div>
            </div>
          )}
          
          <div className="mt-4 bg-slate-900/50 p-3 rounded border border-slate-800 h-32 overflow-y-auto font-mono text-xs">
            {logs.map((log, i) => (
              <p key={i} className="text-emerald-300 font-light leading-tight mb-1">{log}</p>
            ))}
            <span className="animate-pulse text-emerald-500">_</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-800 h-1 w-full shrink-0">
          <div className="h-full bg-emerald-500 transition-all duration-100 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const Dashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentProfileId, setCurrentProfileId] = useState<string>('healthy');
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(3); // Default to last (current)
  const [isSimulating, setIsSimulating] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const profile = profiles[currentProfileId];
  const currentTimePoint = profile.timeSeries[selectedTimeIndex];

  const handleProfileChange = (key: string) => {
    setCurrentProfileId(key);
    setSelectedTimeIndex(3); // Reset to latest
    setShowResults(false);
    setIsSimulating(true);
  };

  const handleSimulationComplete = () => {
    setIsSimulating(false);
    setShowResults(true);
  };

  // Generate Reference Data (Background Clouds)
  const generateReferenceData = () => {
    const points = [];
    // Healthy Cluster (Centered roughly at 0,0)
    for(let i=0; i<40; i++) {
      points.push({ x: (Math.random() * 20) - 10, y: (Math.random() * 20) - 10, z: 60, type: 'reference', cluster: 'healthy' });
    }
    // Dysbiosis Cluster (Malnutrition/Obesity zones)
    // Left/Top: Malnutrition
    for(let i=0; i<15; i++) {
      points.push({ x: (Math.random() * 20) - 45, y: (Math.random() * 20) + 20, z: 60, type: 'reference', cluster: 'dysbiosis' });
    }
    // Right/Bottom: Obesity
    for(let i=0; i<15; i++) {
      points.push({ x: (Math.random() * 20) + 30, y: (Math.random() * 20) - 40, z: 60, type: 'reference', cluster: 'dysbiosis' });
    }

    return points;
  };
  const referenceData = generateReferenceData();

  // Combine PCoA Data: Reference + Trajectory Line + Current Point
  const pcoaTrajectory = profile.timeSeries.map(t => ({ x: t.pcoa.x, y: t.pcoa.y, type: 'trajectory', label: t.shortLabel }));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <SimulationModal 
        isVisible={isSimulating} 
        onComplete={handleSimulationComplete}
        profile={profile}
        timePoint={currentTimePoint}
      />

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap gap-4 justify-between items-center sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Dna className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-slate-800 hidden sm:inline">MicroNutriBiome</span>
        </div>

        {/* Clinical Profile Selector */}
        <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
          <button 
            onClick={() => handleProfileChange('malnutrition')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2 ${currentProfileId === 'malnutrition' ? 'bg-white shadow-sm text-red-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <AlertCircle className="w-4 h-4" /> Desnutrición
          </button>
          <button 
            onClick={() => handleProfileChange('healthy')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2 ${currentProfileId === 'healthy' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <CheckCircle2 className="w-4 h-4" /> Saludable
          </button>
          <button 
            onClick={() => handleProfileChange('obesity')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition flex items-center gap-2 ${currentProfileId === 'obesity' ? 'bg-white shadow-sm text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <User className="w-4 h-4" /> Sobrepeso
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => { setShowResults(false); setIsSimulating(true); }}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-md text-sm hover:bg-slate-800 transition shadow-sm hover:shadow"
          >
            <Microscope className="w-4 h-4" /> Simulación 16S ({currentTimePoint.shortLabel})
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`flex-1 p-6 max-w-7xl mx-auto w-full transition-opacity duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* HEADER & TIMELINE */}
        <header className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{profile.name}</h1>
              <div className="flex items-center gap-3 mt-1 text-slate-500 text-sm">
                <span className="px-2 py-0.5 bg-slate-200 rounded text-slate-700 font-medium">ID: {profile.id}</span>
                <span>Edad: {profile.age}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {currentTimePoint.date} (Muestreo: {currentTimePoint.label})</span>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg border flex flex-col items-end ${
              currentTimePoint.score >= 75 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
              currentTimePoint.score >= 40 ? 'bg-blue-50 border-blue-200 text-blue-700' :
              'bg-red-50 border-red-200 text-red-700'
            }`}>
              <span className="text-xs uppercase tracking-wide opacity-70 font-bold">ISEM Score ({currentTimePoint.shortLabel})</span>
              <span className="text-3xl font-bold">{currentTimePoint.score}</span>
            </div>
          </div>
          
          {/* Timeline Selector */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
                <History className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Línea de Tiempo (4 Muestreos/Año)</span>
            </div>
            <div className="relative flex justify-between items-center">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-0"></div>
                
                {profile.timeSeries.map((pt, idx) => (
                    <button 
                        key={pt.id}
                        onClick={() => setSelectedTimeIndex(idx)}
                        className={`relative z-10 flex flex-col items-center group focus:outline-none`}
                    >
                        <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                            selectedTimeIndex === idx 
                            ? 'bg-emerald-600 border-emerald-600 scale-125' 
                            : 'bg-white border-slate-300 hover:border-emerald-400'
                        }`}></div>
                        <div className={`mt-2 px-3 py-1 rounded text-xs font-medium transition-colors ${
                            selectedTimeIndex === idx 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-white text-slate-500 group-hover:text-emerald-600'
                        }`}>
                            <span className="block font-bold">{pt.shortLabel}</span>
                            <span className="text-[10px]">{pt.date}</span>
                        </div>
                    </button>
                ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COL 1: ADVANCED METRICS (PCoA & Taxonomy) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Ecological Map (PCoA) */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-600" />
                    Mapa de Trayectoria (PCoA)
                  </h2>
                  <p className="text-xs text-slate-500">Evolución del estado del paciente vs. Población Referencia.</p>
                </div>
              </div>

              <div className="h-80 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    
                    {/* Render Lines First (Behind) */}
                    <ReferenceLine x={0} stroke="#cbd5e1" strokeDasharray="3 3" />
                    <ReferenceLine y={0} stroke="#cbd5e1" strokeDasharray="3 3" />
                    
                    <XAxis type="number" dataKey="x" name="PC1" tick={false} axisLine={false} domain={[-50, 50]} />
                    <YAxis type="number" dataKey="y" name="PC2" tick={false} axisLine={false} domain={[-50, 50]} />
                    {/* Increase Z Axis range to allow the selected bubble to be significantly larger */}
                    <ZAxis type="number" dataKey="z" range={[60, 600]} />
                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={() => null} />
                    
                    {/* 1. Background Reference */}
                    <Scatter name="Referencia" data={referenceData} fill="#e2e8f0" shape="circle" isAnimationActive={false} />
                    
                    {/* 2. Patient Trajectory Line */}
                    <Line 
                        data={pcoaTrajectory} 
                        type="monotone" 
                        dataKey="y" 
                        stroke="#94a3b8" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        dot={{r: 4, fill: '#64748b'}} 
                        activeDot={false}
                        isAnimationActive={false}
                    />

                    {/* 3. Current Selection Highlight (Drawn Last = Top Layer) */}
                    <Scatter 
                        name="Selección" 
                        data={[{ x: currentTimePoint.pcoa.x, y: currentTimePoint.pcoa.y, z: 500 }]} 
                        fill="#10b981" 
                        shape="circle"
                        isAnimationActive={false}
                    >
                         {/* Heavy white stroke to visually separate from background dots */}
                         <Cell fill="#10b981" stroke="#ffffff" strokeWidth={4} />
                    </Scatter>

                  </ComposedChart>
                </ResponsiveContainer>
                
                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded border border-slate-100 text-xs shadow-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></div> Selección Actual ({currentTimePoint.shortLabel})
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-0.5 border-t-2 border-slate-400 border-dashed"></div> Trayectoria Histórica
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200"></div> Población Ref.
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Taxonomy Stacked Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                 <h2 className="text-lg font-bold text-slate-900">Composición Taxonómica ({currentTimePoint.label})</h2>
                 <div className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">16S rRNA V4</div>
              </div>
              
              <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart layout="vertical" data={[{ name: 'Paciente', ...currentTimePoint.taxonomy.reduce((acc, curr) => ({...acc, [curr.phylum]: curr.percentage}), {}) }]}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" hide />
                    <RechartsTooltip />
                    {currentTimePoint.taxonomy.map((tax, idx) => (
                      <Bar key={idx} dataKey={tax.phylum} stackId="a" fill={tax.color} radius={idx === 0 ? [4, 0, 0, 4] : idx === currentTimePoint.taxonomy.length - 1 ? [0, 4, 4, 0] : [0, 0, 0, 0]} />
                    ))}
                   </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-4 mt-2 justify-center">
                {currentTimePoint.taxonomy.map((tax, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: tax.color }}></div>
                    {tax.phylum} ({tax.percentage}%)
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COL 2: METRICS & ACTIONABLES */}
          <div className="space-y-6">
            
            {/* Key Biomarkers */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">Biomarcadores ({currentTimePoint.shortLabel})</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">Diversidad Alfa (Shannon)</span>
                    <span className="text-sm font-bold text-slate-900">{currentTimePoint.metrics.shannonIndex}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${(currentTimePoint.metrics.shannonIndex / 5) * 100}%` }}></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Objetivo: &gt; 3.5</p>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">Ratio Firmicutes/Bacteroidetes</span>
                    <span className="text-sm font-bold text-slate-900">{currentTimePoint.metrics.firmicutesBacteroidetesRatio}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${currentTimePoint.metrics.firmicutesBacteroidetesRatio > 2 || currentTimePoint.metrics.firmicutesBacteroidetesRatio < 0.5 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                      style={{ width: `${Math.min(currentTimePoint.metrics.firmicutesBacteroidetesRatio * 20, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Rango Óptimo: 0.8 - 1.2</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div>
                        <span className="text-xs text-slate-500 block mb-1">OTUs (Observados)</span>
                        <span className="text-lg font-bold text-slate-900 block leading-none">{currentTimePoint.metrics.otusDetected}</span>
                    </div>
                    <div>
                        <span className="text-xs text-slate-500 block mb-1">Chao1 (Esperados)</span>
                        <span className="text-lg font-bold text-slate-500 block leading-none">{currentTimePoint.metrics.otusExpected}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <div className="p-2 bg-slate-50 rounded text-slate-500">
                    <Database className="w-4 h-4" />
                    <span className="text-xs font-mono">SEQ_READS</span>
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-slate-900">{currentTimePoint.metrics.totalReads.toLocaleString()}</span>
                    <span className="text-xs text-slate-500">Lecturas de alta calidad</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations AI */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                 <div className="p-1 bg-emerald-500/20 rounded">
                   <RefreshCw className="w-4 h-4 text-emerald-400" />
                 </div>
                 <h2 className="text-sm font-bold text-emerald-100">PLAN DE ACCIÓN ISEM</h2>
              </div>
              
              <ul className="space-y-4">
                {profile.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-slate-300 leading-snug">
                    <div className="mt-0.5">
                       <ArrowRight className="w-4 h-4 text-emerald-500" />
                    </div>
                    {rec}
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Evolución ISEM Score</h4>
                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={profile.timeSeries}>
                      <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={{r:3, fill:'#10b981'}} />
                      <XAxis dataKey="shortLabel" tick={{fill:'#94a3b8', fontSize: 10}} tickLine={false} axisLine={false} />
                      <YAxis domain={[0, 100]} hide />
                      <RechartsTooltip 
                        contentStyle={{backgroundColor: '#1e293b', border: 'none', color: '#fff', fontSize: '12px'}}
                        itemStyle={{color: '#fff'}}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default Dashboard;
