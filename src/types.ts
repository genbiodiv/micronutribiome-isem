

export interface ISEMComponent {
  name: string;
  score: number;
  weight: number;
  description: string;
  color: string;
}

export interface PCACoordinate {
  x: number;
  y: number;
  z?: number; // Size/Importance
  label?: string;
  type: 'reference' | 'trajectory' | 'current';
  cluster?: 'healthy' | 'dysbiosis';
}

export interface TaxonomyData {
  phylum: string;
  percentage: number;
  color: string;
}

export interface TimePoint {
  id: string;
  label: string; // e.g. "T1 (Diagnóstico)"
  shortLabel: string; // e.g. "T1"
  date: string;
  score: number;
  metrics: {
    shannonIndex: number; // Alpha diversity
    firmicutesBacteroidetesRatio: number;
    totalReads: number;
    otusDetected: number; // Observed species
    otusExpected: number; // Chao1 estimator
  };
  taxonomy: TaxonomyData[];
  pcoa: { x: number; y: number };
}

export interface PatientProfile {
  id: string;
  name: string;
  condition: 'Malnutrición' | 'Saludable' | 'Sobrepeso/Obesidad';
  age: number;
  description: string;
  recommendations: string[];
  timeSeries: TimePoint[];
}

export enum ViewState {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD'
}

