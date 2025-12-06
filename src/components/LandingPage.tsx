
import React from 'react';
import { 
  ArrowRight, 
  Dna, 
  Microscope, 
  Activity, 
  Database, 
  Layers, 
  Check,
  ChevronRight,
  Target,
  Users,
  Globe,
  TrendingUp,
  MapPin,
  Zap,
  Leaf
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const LandingPage: React.FC<{ onLaunchDemo: () => void }> = ({ onLaunchDemo }) => {
  const pocData = [
    { name: 'Bajo Peso', val: 35, color: '#f59e0b' },
    { name: 'Peso Saludable', val: 78, color: '#10b981' },
    { name: 'Sobrepeso', val: 42, color: '#ef4444' },
  ];

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 selection:bg-emerald-100">
      
      {/* Header / Nav */}
      <header className="fixed w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Dna className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">MicroNutriBiome</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#problem" className="hover:text-emerald-600 transition">El Problema</a>
            <a href="#solution" className="hover:text-emerald-600 transition">ISEM</a>
            <a href="#market" className="hover:text-emerald-600 transition">Mercado</a>
            <a href="#business" className="hover:text-emerald-600 transition">Negocio</a>
          </nav>
          <button 
            onClick={onLaunchDemo}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-sm font-semibold transition shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Ver Demo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Slide 1: Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-emerald-600 font-bold tracking-wider uppercase text-sm mb-2 block">Índice de Salud Ecomicrobiana</span>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-6">
            Score nutricional basado en <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">ecología del microbioma</span>.
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Del bosque al consultorio. Una narrativa científica que integra datos masivos para monitorear la salud interna real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onLaunchDemo} className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2">
              Lanzar Dashboard
            </button>
            <div className="flex items-center gap-3 px-6 py-4 border border-slate-200 rounded-xl">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src="https://ui-avatars.com/api/?name=Rafik+Neme&background=0D8ABC&color=fff" alt="Rafik" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900">Rafik Tarek Neme</p>
                <p className="text-slate-500 text-xs">Investigador Principal</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full blur-3xl opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=1000" 
            alt="Microbiome Art" 
            className="relative rounded-2xl shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition duration-700"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 max-w-xs">
            <p className="font-serif italic text-slate-600">"Si podemos leer un bosque, también podemos leer el ecosistema más íntimo del cuerpo humano."</p>
          </div>
        </div>
      </section>

      {/* Slide 2: The Shift */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">El Cambio de Paradigma</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 opacity-60">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Antes</h3>
              <p className="text-slate-500">Una muestra = Una variable</p>
              <p className="text-sm text-slate-400 mt-2">Visión reduccionista</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 relative">
              <div className="absolute -top-3 -right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">HOY</div>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">GenBioDiv</h3>
              <p className="text-slate-600">Una muestra = <strong>Miles de variables</strong></p>
              <p className="text-sm text-emerald-600 mt-2">Visión Ecosistémica</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 3 & 4: Problem */}
      <section id="problem" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">El Problema: Nutrición a Ciegas</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Subjetividad</h4>
                  <p className="text-slate-600">Las evaluaciones dietarias dependen de la memoria del paciente.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Biomarcadores Limitados</h4>
                  <p className="text-slate-600">Los exámenes tradicionales son lentos, costosos y aislados.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white">
            <h3 className="text-2xl font-bold mb-4 text-emerald-400">El Integrador Real: Microbioma</h3>
            <p className="mb-6 opacity-90">
              A diferencia del genoma, que no cambia, la microbiota cambia todo el tiempo. Es el indicador perfecto para monitorear intervenciones.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <span className="block text-2xl font-bold mb-1">Inflamación</span>
                <span className="text-xs opacity-70">Detectada antes de síntomas</span>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <span className="block text-2xl font-bold mb-1">Dieta</span>
                <span className="text-xs opacity-70">Impacto inmediato medible</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5 & 6: Solution (ISEM) */}
      <section id="solution" className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Nuestra Solución: ISEM</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Un pipeline científico robusto que transforma datos biológicos complejos en una métrica clínica de 0 a 100.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { step: '01', title: 'Muestra', desc: 'No invasiva, tomada por el paciente.' },
              { step: '02', title: 'Secuenciación', desc: 'Illumina MiSeq. Infraestructura local.', highlight: true },
              { step: '03', title: 'Bioinformática', desc: 'Pipeline ecológico + estadístico.' },
              { step: '04', title: 'ISEM Score', desc: 'Reporte clínico accionable.' }
            ].map((item, i) => (
              <div key={i} className={`p-6 rounded-xl border ${item.highlight ? 'bg-white border-emerald-500 shadow-lg' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-3xl font-bold text-slate-200 mb-2 block">{item.step}</span>
                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Score Breakdown Visualization */}
          <div className="bg-white rounded-3xl p-8 shadow-xl max-w-4xl mx-auto border border-slate-100 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 w-full">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Composición del Score</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 text-right font-bold text-emerald-600">30%</div>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[30%]"></div>
                  </div>
                  <div className="text-sm text-slate-700 w-40 font-medium">Diversidad Ecológica</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-right font-bold text-blue-600">25%</div>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[25%]"></div>
                  </div>
                  <div className="text-sm text-slate-700 w-40 font-medium">Equilibrio Taxonómico</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-right font-bold text-violet-600">25%</div>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 w-[25%]"></div>
                  </div>
                  <div className="text-sm text-slate-700 w-40 font-medium">Patrón Dietario Inferido</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 text-right font-bold text-amber-500">20%</div>
                  <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[20%]"></div>
                  </div>
                  <div className="text-sm text-slate-700 w-40 font-medium">Riesgo Metabólico Asociado</div>
                </div>
              </div>
            </div>
            <div className="w-px h-48 bg-slate-100 hidden md:block"></div>
            <div className="text-center px-8">
              <div className="w-32 h-32 rounded-full border-8 border-emerald-500 flex items-center justify-center mb-4 mx-auto">
                <span className="text-4xl font-bold text-slate-900">0-100</span>
              </div>
              <p className="text-sm text-slate-500 font-medium">Métrica estandarizada para la clínica</p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 7: POC */}
      <section id="validation" className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4">PRUEBA DE CONCEPTO - HUN</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Validación en Entorno Clínico</h2>
            <p className="text-slate-600 mb-6">
              Estudio con 60 voluntarios en el Hospital Universidad del Norte. Demostramos que el análisis ecosistémico distingue claramente entre condiciones nutricionales.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-700">
                <Check className="w-5 h-5 text-emerald-500" /> 3 Perfiles contrastados
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <Check className="w-5 h-5 text-emerald-500" /> Secuenciación en Uninorte
              </li>
              <li className="flex items-center gap-2 text-slate-700">
                <Check className="w-5 h-5 text-emerald-500" /> Primero en el Caribe
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 h-80">
            <h3 className="text-sm font-bold text-slate-500 mb-4 text-center">Diversidad Microbiana Promedio (Índice Shannon Estimado)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pocData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="val" radius={[8, 8, 0, 0]}>
                  {pocData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* NEW SECTION: MARKET OPPORTUNITY (Based on Slides 12-14) */}
      <section id="market" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Oportunidad de Mercado</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Nutrición Personalizada & Secuenciación de Microbioma. Un mercado en expansión acelerada.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Global */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-4 text-blue-400">
                 <Globe className="w-6 h-6" />
                 <span className="font-bold text-sm uppercase tracking-wide">Panorama Global</span>
              </div>
              <div className="text-5xl font-bold text-white mb-2">$18B</div>
              <p className="text-slate-400 text-sm mb-4">Tamaño actual del mercado de nutrición personalizada.</p>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <TrendingUp className="w-4 h-4" /> Proyección 2030: ~$40B
              </div>
            </div>

            {/* Regional */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
               <div className="flex items-center gap-3 mb-4 text-emerald-400">
                 <MapPin className="w-6 h-6" />
                 <span className="font-bold text-sm uppercase tracking-wide">Latinoamérica</span>
              </div>
              <div className="text-5xl font-bold text-white mb-2">$1B</div>
              <p className="text-slate-400 text-sm mb-4">Región de crecimiento más rápido (&gt;5% anual).</p>
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <TrendingUp className="w-4 h-4" /> Proyección 2034: $2.8B
              </div>
            </div>

            {/* National/Niche */}
            <div className="bg-gradient-to-br from-emerald-900/50 to-blue-900/50 border border-emerald-500/30 p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500 blur-2xl opacity-20"></div>
               <div className="flex items-center gap-3 mb-4 text-white">
                 <Target className="w-6 h-6" />
                 <span className="font-bold text-sm uppercase tracking-wide">Colombia (Nicho)</span>
              </div>
              <div className="text-5xl font-bold text-white mb-2">$1M+</div>
              <p className="text-slate-300 text-sm mb-4">Early Adopters & Biohackers (0.5% meta).</p>
              <div className="border-t border-white/10 pt-4 mt-4">
                 <p className="text-xs text-emerald-300 font-mono">OBJETIVO: 7,500 TESTS / AÑO</p>
              </div>
            </div>
          </div>
          
          {/* MARKET DRIVERS (Slide 15) */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 pt-12 border-t border-white/10">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Vacío Tecnológico</h4>
                <p className="text-sm text-slate-400">La infraestructura existe, pero el servicio apenas comienza.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center shrink-0">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Costo-Eficiencia</h4>
                <p className="text-sm text-slate-400">Procesamiento local en Colombia. Reducción operativa.</p>
              </div>
            </div>
             <div className="flex gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0">
                <Leaf className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Food as Medicine</h4>
                <p className="text-sm text-slate-400">Mercado funcional crece al 9% anual. Bienestar microbiano.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 9: Business Model */}
      <section id="business" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Modelo de Negocio: Suscripción</h2>
            <p className="text-slate-500">Monitoreo continuo para resultados constantes.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="text-emerald-600 font-bold mb-2 uppercase tracking-wide text-sm">B2C • Paciente</div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Suscripción Anual</h3>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                ~$200 <span className="text-xl font-normal text-slate-500">USD</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">~800.000 COP por test/reporte</p>
              
              <ul className="space-y-4 mb-8 text-slate-600">
                <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-500" /> 2 Pruebas de Microbioma al año</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-500" /> Acceso a Dashboard Personal</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-emerald-500" /> Recomendaciones IA</li>
              </ul>
              <button onClick={onLaunchDemo} className="w-full py-3 rounded-lg border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition">
                Ver Prototipo
              </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 rounded-2xl shadow-xl relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Users className="w-24 h-24" />
              </div>
              <div className="text-white/80 font-bold mb-2 uppercase tracking-wide text-sm">B2B • Institucional</div>
              <h3 className="text-2xl font-bold mb-4">Clínicas y Hospitales</h3>
              <p className="text-emerald-100 mb-8">Solución integral para nutrición clínica, bariatría y medicina funcional.</p>
              
              <ul className="space-y-4 mb-8 text-white">
                <li className="flex gap-3"><Check className="w-5 h-5 text-white" /> Suscripción Mensual por Volumen</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-white" /> Dashboard Institucional Centralizado</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-white" /> API de integración con HIS</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-white" /> Soporte Bioinformático Prioritario</li>
              </ul>
              <button className="w-full bg-white text-emerald-800 py-3 rounded-lg font-bold hover:bg-emerald-50 transition">
                Contactar Ventas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 10: Footer / Team */}
      <footer className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-8">El Equipo</h2>
               
               <div className="space-y-8">
                  {/* Rafik */}
                  <div className="flex gap-4">
                     <div className="w-16 h-16 bg-slate-200 rounded-full overflow-hidden border border-slate-300 shrink-0">
                       <img src="https://ui-avatars.com/api/?name=Rafik+Neme&background=0D8ABC&color=fff" alt="Rafik" />
                     </div>
                     <div>
                       <p className="font-bold text-slate-900 text-lg">Rafik Tarek Neme Garrido, Dr. rer. nat.</p>
                       <p className="text-sm text-emerald-600 font-medium mb-1">Genómica Evolutiva & Biodiversidad</p>
                       <p className="text-sm text-slate-600 leading-snug">
                         Líder del Grupo de Genómica y Biodiversidad. Experto en problemas biológicos complejos basados en datos genómicos.
                       </p>
                     </div>
                  </div>

                  {/* Eder */}
                  <div className="flex gap-4">
                     <div className="w-16 h-16 bg-slate-200 rounded-full overflow-hidden border border-slate-300 shrink-0">
                       <img src="https://ui-avatars.com/api/?name=Eder+Hernandez&background=059669&color=fff" alt="Eder" />
                     </div>
                     <div>
                       <p className="font-bold text-slate-900 text-lg">Dr. Eder Hernández Ruíz</p>
                       <p className="text-sm text-blue-600 font-medium mb-1">Médico Internista</p>
                       <p className="text-sm text-slate-600 leading-snug">
                         Líder del Programa Clínica de Obesidad y Control Metabólico del Hospital Universidad del Norte.
                       </p>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Próximos Pasos</h2>
              <div className="mb-6">
                 <p className="text-slate-600 mb-2">Buscamos inversión semilla para completar:</p>
                 <p className="text-3xl font-bold text-slate-900">30 Millones COP</p>
              </div>
              <ul className="mb-8 space-y-3 text-slate-700">
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500" /> Validación TRL 6 con HUN</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500" /> Calibración final del ISEM Score</li>
                <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-500" /> Documentación para transferencia SaaS</li>
              </ul>
              <div>
                <p className="font-bold text-slate-900 mb-1">Contacto</p>
                <a href="mailto:rneme@uninorte.edu.co" className="text-emerald-600 hover:underline font-medium text-lg">rneme@uninorte.edu.co</a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-slate-400 text-sm border-t border-slate-100 pt-8">
            &copy; 2024 MicroNutriBiome - GenBioDiv. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

// Helper component for footer icons
function CheckCircle(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}

