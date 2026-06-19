'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { PricingCard } from '@/components/ui/pricing';
import { Button } from '@/components/ui/button';
import {
  Check, ChevronRight, ArrowRight, Zap, BarChart3, Bell,
  Wrench, Layers, Cpu, Play, X, Send, Menu,
  Globe2, ChevronDown,
} from 'lucide-react';

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
type Lang = 'EN' | 'ES' | 'FR' | 'PT';

const T: Record<Lang, Record<string, string>> = {
  EN: {
    nav_solutions: 'Solutions', nav_how: 'How it Works', nav_pricing: 'Pricing', nav_login: 'Login',
    hero_badge: 'IoT-Powered Textile Intelligence',
    hero_h1a: 'Machines that', hero_h1b: 'transform quality', hero_h1c: 'into every stitch.',
    hero_desc: 'Monitor, anticipate, and respond before a failure occurs. Digitize your plant today — no replacements needed.',
    hero_cta: 'Request Demo', hero_watch: 'Watch it in action',
    stat1: 'Downtime reduction', stat2: 'Machine uptime', stat3: 'Alert response',
    sol_eyebrow: 'What we solve', sol_title: 'Industrial intelligence\nfor every loom',
    sol_desc: 'Our platform connects directly to your existing machinery via non-invasive IoT sensors. Get real-time visibility and predictive intelligence from day one.',
    f1t: 'Real-time Monitoring', f1d: 'Track RPM, temperature, vibration and output across all your machines live on one dashboard.',
    f2t: 'Predictive Alerts',    f2d: 'AI detects anomalies before they cause failures. Alerts via SMS or email with recommended actions.',
    f3t: 'Automated Reports',    f3d: 'Daily, weekly or monthly efficiency reports generated automatically and exported to PDF.',
    f4t: 'Maintenance Scheduler',f4d: 'Plan preventive maintenance based on real usage data. Reduce unplanned stops by up to 40%.',
    f5t: 'Advanced Analytics',   f5d: 'Visualize production KPIs and quality metrics with interactive charts and heat maps.',
    f6t: 'IoT Integration',      f6d: 'Install non-invasive sensors in hours on any loom, dyeing or knitting machine — no shutdown.',
    how_eyebrow: 'The process', how_title: 'Up and running\nin 3 steps',
    s1t: 'Install Sensors', s1d: 'Certified technicians install IoT sensors on your existing machines in hours. Zero production downtime.',
    s2t: 'Connect the Platform', s2d: 'Live data flows to your DyeTex dashboard instantly. Monitor every machine from any device.',
    s3t: 'Act on Intelligence', s3d: 'Receive predictive alerts, schedule maintenance, generate reports — all driven by real data.',
    video_eyebrow: 'See it live', video_title: 'Watch DyeTex in action',
    team_eyebrow: 'The people', team_title: 'Built by engineers,\nfor engineers',
    team_desc: 'A multidisciplinary team of software engineers, IoT specialists and textile industry veterans based in Lima, Peru.',
    v1: 'Industry-first design thinking', v2: 'Real-world sensor deployments', v3: 'Continuous iteration with clients',
    mission_title: 'Mission', vision_title: 'Vision',
    mission_text: 'Provide textile companies with efficient solutions that optimize machine performance through real-time monitoring, increasing productivity and reducing unplanned downtime.',
    vision_text: 'Become the leading platform for the textile industry, transforming machinery management and contributing to industrial growth across Latin America.',
    product_eyebrow: 'The platform', product_title: 'Every screen built\nfor the plant floor',
    product_desc: 'Real-time monitoring, smart alerts, automated reports and predictive maintenance — all in one place.',
    pricing_eyebrow: 'Plans', pricing_title: 'Made for every plant',
    pricing_desc: 'Start monitoring your machines today. Scale as your operation grows.',
    cta_eyebrow: 'Stay ahead', cta_title: 'Turn your factory\ninto a smart facility',
    cta_desc: 'Join 200+ textile plants already reducing downtime with DyeTex. Get early access, product updates and industry insights.',
    cta_ph: 'your@email.com', cta_btn: 'Get Early Access', cta_note: 'No spam. Unsubscribe anytime.',
    cta_ok: "You're on the list — we'll be in touch!",
    footer_tagline: 'Smart monitoring for textile machinery.',
    chat_status: 'Online · DyeTex AI', chat_greeting: "Hello! I'm Clara, DyeTex's AI assistant. How can I help you today?",
    chat_ph: 'Ask me anything...', chat_s1: 'App benefits', chat_s2: 'Contact us',
    chat_s3: 'What it monitors', chat_s4: 'Reports', chat_s5: 'Pricing', chat_s6: 'Installation',
  },
  ES: {
    nav_solutions:'Soluciones', nav_how:'Cómo Funciona', nav_pricing:'Planes', nav_login:'Ingresar',
    hero_badge:'Inteligencia Textil con IoT',
    hero_h1a:'Máquinas que', hero_h1b:'transforman calidad', hero_h1c:'en cada puntada.',
    hero_desc:'Monitorea, anticipa y responde antes de que ocurra una falla. Digitaliza tu planta sin reemplazar maquinaria.',
    hero_cta:'Solicitar Demo', hero_watch:'Ver en acción',
    stat1:'Reducción de paradas', stat2:'Disponibilidad', stat3:'Respuesta de alerta',
    sol_eyebrow:'Lo que resolvemos', sol_title:'Inteligencia industrial\npara cada telar',
    sol_desc:'Nuestra plataforma se conecta directamente a tu maquinaria existente mediante sensores IoT no invasivos.',
    f1t:'Monitoreo en Tiempo Real', f1d:'Rastrea RPM, temperatura, vibración y producción de cada máquina en vivo.',
    f2t:'Alertas Predictivas', f2d:'La IA detecta anomalías antes de que causen fallas. Alertas por SMS o email.',
    f3t:'Reportes Automáticos', f3d:'Reportes de eficiencia generados automáticamente y exportados a PDF.',
    f4t:'Programador de Mantenimiento', f4d:'Planifica el mantenimiento preventivo. Reduce paradas no planificadas hasta un 40%.',
    f5t:'Analíticas Avanzadas', f5d:'Visualiza KPIs de producción y métricas de calidad con gráficos interactivos.',
    f6t:'Integración IoT', f6d:'Instala sensores en horas en cualquier máquina, sin detener la producción.',
    how_eyebrow:'El proceso', how_title:'Operativo\nen 3 pasos',
    s1t:'Instala Sensores', s1d:'Técnicos certificados instalan sensores IoT en tus máquinas en horas. Cero tiempo de inactividad.',
    s2t:'Conéctate a la Plataforma', s2d:'Los datos fluyen en tiempo real a tu panel DyeTex. Monitorea desde cualquier dispositivo.',
    s3t:'Actúa con Inteligencia', s3d:'Recibe alertas predictivas, programa mantenimiento y genera reportes basados en datos reales.',
    video_eyebrow:'Véalo en vivo', video_title:'DyeTex en acción',
    team_eyebrow:'Las personas', team_title:'Creado por ingenieros,\npara ingenieros',
    team_desc:'Equipo multidisciplinario de ingenieros de software, especialistas IoT y veteranos textiles, con base en Lima, Perú.',
    v1:'Pensamiento centrado en la industria', v2:'Despliegues reales de sensores', v3:'Iteración continua con clientes',
    mission_title:'Misión', vision_title:'Visión',
    mission_text:'Brindar a las empresas textiles soluciones eficientes que optimicen el rendimiento de las máquinas mediante monitoreo en tiempo real.',
    vision_text:'Convertirnos en la plataforma líder para la industria textil en América Latina.',
    product_eyebrow:'La plataforma', product_title:'Cada pantalla diseñada\npara la planta',
    product_desc:'Monitoreo en tiempo real, alertas inteligentes, reportes automatizados y mantenimiento predictivo — todo en uno.',
    pricing_eyebrow:'Planes', pricing_title:'Para cada planta',
    pricing_desc:'Empieza a monitorear tus máquinas hoy. Escala según crece tu operación.',
    cta_eyebrow:'Mantente adelante', cta_title:'Transforma tu fábrica\nen una planta inteligente',
    cta_desc:'Únete a más de 200 plantas textiles que ya reducen paradas con DyeTex.',
    cta_ph:'tu@email.com', cta_btn:'Obtener Acceso Anticipado', cta_note:'Sin spam. Cancela cuando quieras.',
    cta_ok:'¡Estás en la lista! Te contactaremos pronto.',
    footer_tagline:'Monitoreo inteligente para maquinaria textil.',
    chat_status:'En línea · DyeTex IA', chat_greeting:'¡Hola! Soy Clara, la IA de DyeTex. ¿En qué te puedo ayudar hoy?',
    chat_ph:'Pregúntame algo...', chat_s1:'Beneficios', chat_s2:'Contacto',
    chat_s3:'Qué monitorea', chat_s4:'Reportes', chat_s5:'Precios', chat_s6:'Instalación',
  },
  FR: {
    nav_solutions:'Solutions', nav_how:'Comment ça marche', nav_pricing:'Forfaits', nav_login:'Connexion',
    hero_badge:'Intelligence Textile IoT',
    hero_h1a:'Des machines qui', hero_h1b:'transforment la qualité', hero_h1c:'à chaque point.',
    hero_desc:"Surveillez, anticipez et répondez avant qu'une panne ne survienne. Numérisez votre usine sans remplacer vos machines.",
    hero_cta:'Demander une Démo', hero_watch:'Voir en action',
    stat1:'Réduction des arrêts', stat2:'Disponibilité', stat3:'Réponse aux alertes',
    sol_eyebrow:'Ce que nous résolvons', sol_title:'Intelligence industrielle\npour chaque métier',
    sol_desc:"Notre plateforme se connecte directement à vos machines existantes via des capteurs IoT non invasifs.",
    f1t:'Surveillance Temps Réel', f1d:'Suivez RPM, température, vibration et production de chaque machine en direct.',
    f2t:'Alertes Prédictives', f2d:"L'IA détecte les anomalies avant qu'elles ne causent des pannes.",
    f3t:'Rapports Automatisés', f3d:'Rapports générés automatiquement et exportés en PDF.',
    f4t:'Planificateur Maintenance', f4d:'Réduisez les arrêts non planifiés jusqu\'à 40%.',
    f5t:'Analytiques Avancées', f5d:'Visualisez les KPIs et métriques qualité avec des graphiques interactifs.',
    f6t:'Intégration IoT', f6d:'Installez des capteurs en quelques heures sur n\'importe quelle machine.',
    how_eyebrow:'Le processus', how_title:'Opérationnel\nen 3 étapes',
    s1t:'Installer les Capteurs', s1d:'Des techniciens certifiés installent des capteurs IoT sur vos machines en quelques heures.',
    s2t:'Connectez la Plateforme', s2d:'Les données circulent en temps réel vers votre tableau de bord DyeTex.',
    s3t:'Agissez avec Intelligence', s3d:'Recevez des alertes prédictives, planifiez la maintenance et générez des rapports.',
    video_eyebrow:'En direct', video_title:'DyeTex en action',
    team_eyebrow:'Les personnes', team_title:'Créé par des ingénieurs,\npour des ingénieurs',
    team_desc:'Une équipe multidisciplinaire basée à Lima, Pérou.',
    v1:"Pensée centrée sur l'industrie", v2:'Déploiements réels de capteurs', v3:'Itération continue avec les clients',
    mission_title:'Mission', vision_title:'Vision',
    mission_text:'Fournir aux entreprises textiles des solutions efficaces qui optimisent les performances des machines.',
    vision_text:"Devenir la plateforme leader pour l'industrie textile en Amérique latine.",
    product_eyebrow:'La plateforme', product_title:'Chaque écran conçu\npour l\'atelier',
    product_desc:'Surveillance temps réel, alertes intelligentes, rapports automatisés et maintenance prédictive.',
    pricing_eyebrow:'Forfaits', pricing_title:'Pour chaque usine',
    pricing_desc:'Commencez à surveiller vos machines aujourd\'hui. Évoluez selon votre opération.',
    cta_eyebrow:'Restez en avance', cta_title:"Transformez votre usine\nen installation intelligente",
    cta_desc:'Rejoignez plus de 200 usines textiles qui réduisent déjà les arrêts avec DyeTex.',
    cta_ph:'votre@email.com', cta_btn:'Accès Anticipé', cta_note:'Pas de spam. Désabonnez-vous à tout moment.',
    cta_ok:'Vous êtes sur la liste — nous vous contacterons bientôt!',
    footer_tagline:'Surveillance intelligente pour machines textiles.',
    chat_status:'En ligne · DyeTex IA', chat_greeting:"Bonjour ! Je suis Clara, l'IA de DyeTex. Comment puis-je vous aider ?",
    chat_ph:'Posez votre question...', chat_s1:'Avantages', chat_s2:'Contact',
    chat_s3:'Ce que ça surveille', chat_s4:'Rapports', chat_s5:'Tarifs', chat_s6:'Installation',
  },
  PT: {
    nav_solutions:'Soluções', nav_how:'Como Funciona', nav_pricing:'Planos', nav_login:'Entrar',
    hero_badge:'Inteligência Têxtil com IoT',
    hero_h1a:'Máquinas que', hero_h1b:'transformam qualidade', hero_h1c:'em cada ponto.',
    hero_desc:'Monitore, antecipe e responda antes que uma falha ocorra. Digitalize sua planta sem substituir maquinário.',
    hero_cta:'Solicitar Demo', hero_watch:'Ver em ação',
    stat1:'Redução de paradas', stat2:'Disponibilidade', stat3:'Resposta de alerta',
    sol_eyebrow:'O que resolvemos', sol_title:'Inteligência industrial\npara cada tear',
    sol_desc:'Nossa plataforma conecta diretamente ao seu maquinário existente via sensores IoT não invasivos.',
    f1t:'Monitoramento em Tempo Real', f1d:'Rastreie RPM, temperatura, vibração e produção ao vivo.',
    f2t:'Alertas Preditivos', f2d:'A IA detecta anomalias antes que causem falhas. Alertas por SMS ou e-mail.',
    f3t:'Relatórios Automatizados', f3d:'Relatórios gerados automaticamente e exportados para PDF.',
    f4t:'Agendador de Manutenção', f4d:'Reduza paradas não planejadas em até 40%.',
    f5t:'Análises Avançadas', f5d:'Visualize KPIs de produção com gráficos interativos e mapas de calor.',
    f6t:'Integração IoT', f6d:'Instale sensores em horas em qualquer máquina, sem parar a produção.',
    how_eyebrow:'O processo', how_title:'Operacional\nem 3 etapas',
    s1t:'Instale Sensores', s1d:'Técnicos certificados instalam sensores IoT em suas máquinas em horas.',
    s2t:'Conecte a Plataforma', s2d:'Dados fluem em tempo real para seu painel DyeTex. Monitore de qualquer dispositivo.',
    s3t:'Aja com Inteligência', s3d:'Receba alertas preditivos, agende manutenção e gere relatórios com dados reais.',
    video_eyebrow:'Veja ao vivo', video_title:'DyeTex em ação',
    team_eyebrow:'As pessoas', team_title:'Criado por engenheiros,\npara engenheiros',
    team_desc:'Equipe multidisciplinar de engenheiros de software, especialistas IoT e veteranos têxteis, sediada em Lima, Peru.',
    v1:'Pensamento centrado na indústria', v2:'Implantações reais de sensores', v3:'Iteração contínua com clientes',
    mission_title:'Missão', vision_title:'Visão',
    mission_text:'Fornecer soluções eficientes que otimizem o desempenho das máquinas mediante monitoramento em tempo real.',
    vision_text:'Tornar-se a plataforma líder para a indústria têxtil na América Latina.',
    product_eyebrow:'A plataforma', product_title:'Cada tela criada\npara o chão de fábrica',
    product_desc:'Monitoramento em tempo real, alertas inteligentes, relatórios automatizados e manutenção preditiva.',
    pricing_eyebrow:'Planos', pricing_title:'Para cada planta',
    pricing_desc:'Comece a monitorar suas máquinas hoje. Escale conforme sua operação cresce.',
    cta_eyebrow:'Fique à frente', cta_title:'Transforme sua fábrica\nem uma planta inteligente',
    cta_desc:'Junte-se a mais de 200 plantas têxteis que já reduzem paradas com DyeTex.',
    cta_ph:'seu@email.com', cta_btn:'Obter Acesso Antecipado', cta_note:'Sem spam. Cancele quando quiser.',
    cta_ok:'Você está na lista — entraremos em contato em breve!',
    footer_tagline:'Monitoramento inteligente para maquinário têxtil.',
    chat_status:'Online · DyeTex IA', chat_greeting:'Olá! Sou Clara, a IA da DyeTex. Como posso ajudar você hoje?',
    chat_ph:'Pergunte-me algo...', chat_s1:'Benefícios', chat_s2:'Contato',
    chat_s3:'O que monitora', chat_s4:'Relatórios', chat_s5:'Preços', chat_s6:'Instalação',
  },
};

/* ─────────────────────────────────────────
   CHAT BOT LOGIC
───────────────────────────────────────── */
function getBotAnswer(msg: string): string {
  const m = msg.toLowerCase();
  if (m.match(/hello|hi|hola|bonjour|olá|hey/)) return "Hello! I'm Clara. I can tell you about DyeTex's features, pricing, installation, or how to get in touch with our team. What would you like to know?";
  if (m.match(/benefit|beneficio|avantage|benefício/)) return 'DyeTex reduces machine downtime by up to 40%, automates efficiency reports, delivers AI-powered failure alerts, and gives you a live dashboard for every machine in your plant — all without replacing your existing equipment.';
  if (m.match(/contact|contacto/)) return 'Reach us at supportintex@gmail.com or +51 999 999 999. We are based at Av. de la Marina 2810, San Miguel, Lima, Perú. You can also click "Request Demo" at the top of the page.';
  if (m.match(/monitor|surveill|monitorea/)) return 'DyeTex monitors RPM, temperature, vibration, pressure and output per machine — streamed live via IoT sensors installed directly on your looms, dyeing machines and knitting equipment.';
  if (m.match(/report|reporte|rapport|relatório/)) return 'The platform auto-generates daily, weekly and monthly reports covering efficiency metrics, output per hour, fault history and maintenance records. All are exportable to PDF and shareable with your team.';
  if (m.match(/pric|precio|tarif|preço|cost|plan|price/)) return 'We have 3 plans: Starter (free — up to 2 machines), Enterprise ($299/mo — unlimited machines + AI features). Scroll down to the Pricing section for the full comparison!';
  if (m.match(/install|setup|configurar|instalar/)) return 'Installation is done by our certified technicians. Non-invasive sensors go directly on your existing machines — no production stop needed. A full plant setup typically takes less than one day.';
  if (m.match(/demo/)) return 'Click the "Request Demo" button at the top of the page or visit our app directly. Our team will reach out within 24 hours to schedule a live walkthrough.';
  if (m.match(/how.?it.?work|como.?funciona|comment.?marche/)) return 'Three steps: (1) We install IoT sensors on your machines, (2) data flows live to your DyeTex dashboard, (3) you act on predictive alerts, schedule maintenance and download reports. No existing equipment needs to be replaced.';
  return "I'm Clara, DyeTex's AI assistant. I can help with questions about our product, pricing, installation, or how to get in touch. What would you like to know?";
}

/* ─────────────────────────────────────────
   TEXTILE HERO CANVAS
───────────────────────────────────────── */
function TextileHeroCanvas() {
  // Warp thread positions (percentage across width)
  const warps = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95];
  // Shuttle positions (top offset %)
  const shuttles = [22, 45, 68];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Warp threads */}
      {warps.map((left, i) => (
        <div
          key={i}
          className="warp-thread"
          style={{
            left: `${left}%`,
            opacity: i % 3 === 0 ? 0.35 : 0.15,
            animationDelay: `${(i * 0.18).toFixed(2)}s`,
            animationDuration: `${2.5 + (i % 4) * 0.4}s`,
          }}
        />
      ))}

      {/* Weft / shuttle bars */}
      {shuttles.map((top, i) => (
        <div
          key={i}
          className="shuttle-bar"
          style={{
            top: `${top}%`,
            animationDelay: `${i * 1.4}s`,
            animationDuration: `${3.8 + i * 0.6}s`,
            width: `${30 + i * 8}%`,
          }}
        />
      ))}

      {/* Spools — decorative spinning circles */}
      {[
        { size: 80,  top: '8%',  right: '6%',  dur: '8s',  op: 0.18 },
        { size: 48,  top: '70%', right: '12%', dur: '5s',  op: 0.12 },
        { size: 120, top: '40%', left: '3%',   dur: '12s', op: 0.10 },
        { size: 36,  top: '20%', left: '18%',  dur: '6s',  op: 0.15 },
      ].map((s, i) => (
        <div
          key={i}
          className="loom-spool"
          style={{
            width: s.size, height: s.size,
            top: s.top, right: (s as any).right, left: (s as any).left,
            opacity: s.op,
            animationDuration: s.dur,
          }}
        />
      ))}

      {/* SVG thread path — woven diagonal */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <path
          d="M0,300 Q100,100 200,300 Q300,500 400,300 Q500,100 600,300 Q700,500 800,300 Q900,100 1000,300"
          stroke="url(#threadGrad)" strokeWidth="2" fill="none" strokeLinecap="round"
          strokeDasharray="1200" strokeDashoffset="1200"
          style={{ animation: 'drawThread 3.5s ease-out forwards 0.5s' }}
        />
        <path
          d="M0,200 Q150,400 300,200 Q450,0 600,200 Q750,400 900,200 Q1000,100 1000,200"
          stroke="url(#threadGrad2)" strokeWidth="1.5" fill="none" strokeLinecap="round"
          strokeDasharray="1200" strokeDashoffset="1200"
          style={{ animation: 'drawThread 4s ease-out forwards 1.2s' }}
        />
        <defs>
          <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#00E5A0" stopOpacity="0" />
            <stop offset="30%"  stopColor="#00E5A0" stopOpacity="0.6" />
            <stop offset="70%"  stopColor="#336699" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#336699" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="threadGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#336699" stopOpacity="0" />
            <stop offset="50%"  stopColor="#00E5A0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#336699" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Loom frame — top & bottom rails */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
           style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.3), transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[3px]"
           style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.3), transparent)' }} />
    </div>
  );
}

/* ─────────────────────────────────────────
   FEATURE CARD
───────────────────────────────────────── */
const featureIcons = [
  <BarChart3 key="0" size={24} />, <Bell key="1" size={24} />, <Layers key="2" size={24} />,
  <Wrench key="3" size={24} />, <Zap key="4" size={24} />, <Cpu key="5" size={24} />,
];
const featureKeys = ['f1','f2','f3','f4','f5','f6'] as const;

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode; title: string; desc: string; delay: number }) {
  return (
    <div
      className="reveal group relative rounded-2xl border border-white/[0.07] bg-[#111118] p-7
                 transition-all duration-300 hover:-translate-y-1 hover:border-[#00E5A0]/30
                 hover:shadow-[0_20px_48px_rgba(0,229,160,0.07)] overflow-hidden cursor-default"
      style={{ transitionDelay: `${delay * 0.12}s` }}
    >
      {/* top shimmer on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5A0] to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="w-12 h-12 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center
                      text-[#00E5A0] mb-5 transition-all duration-300 group-hover:bg-[#00E5A0]/20">
        {icon}
      </div>
      <h3 className="font-[var(--font-display)] font-bold text-[#E8F4F1] text-lg mb-3 tracking-tight">{title}</h3>
      <p className="text-[rgba(232,244,241,0.5)] text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   STEP
───────────────────────────────────────── */
function Step({ n, title, desc, last }: { n: string; title: string; desc: string; last?: boolean }) {
  return (
    <div className="reveal flex gap-7 relative">
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl border border-[#00E5A0]/30 bg-[#00E5A0]/08 flex items-center
                        justify-center font-[var(--font-display)] font-black text-[#00E5A0] text-xl flex-shrink-0
                        shadow-[0_0_20px_rgba(0,229,160,0.12)]">
          {n}
        </div>
        {!last && <div className="flex-1 w-px bg-gradient-to-b from-[#00E5A0]/30 to-transparent mt-3 min-h-[48px]" />}
      </div>
      <div className="pb-12">
        <h3 className="font-[var(--font-display)] font-bold text-[#E8F4F1] text-xl mb-2 tracking-tight">{title}</h3>
        <p className="text-[rgba(232,244,241,0.5)] text-[15px] leading-relaxed max-w-lg">{desc}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CHAT WIDGET
───────────────────────────────────────── */
type ChatMsg = { role: 'bot' | 'user'; text: string };

function ChatWidget({ t }: { t: Record<string, string> }) {
  const [open, setOpen]     = useState(false);
  const [msgs, setMsgs]     = useState<ChatMsg[]>([{ role: 'bot', text: t.chat_greeting }]);
  const [input, setInput]   = useState('');
  const [typing, setTyping] = useState(false);
  const [hideSug, setHideSug] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const suggestions = [t.chat_s1, t.chat_s2, t.chat_s3, t.chat_s4, t.chat_s5, t.chat_s6];

  useEffect(() => {
    setMsgs([{ role: 'bot', text: t.chat_greeting }]);
  }, [t.chat_greeting]);

  const scrollBottom = () => setTimeout(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, 50);

  const send = useCallback((text: string) => {
    if (!text.trim()) return;
    setHideSug(true);
    setMsgs(m => [...m, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    scrollBottom();
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { role: 'bot', text: getBotAnswer(text) }]);
      scrollBottom();
    }, 850 + Math.random() * 500);
  }, []);

  useEffect(() => { scrollBottom(); }, [msgs, typing]);

  return (
    <>
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-24 right-5 z-50 w-[340px] max-h-[540px] flex flex-col
                       rounded-2xl border border-white/[0.09] bg-[#111118] shadow-[0_32px_80px_rgba(0,0,0,0.7)]
                       overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1A1A2E] border-b border-white/[0.07]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00E5A0]/20 border border-[#00E5A0]/40 flex items-center
                                justify-center text-[#00E5A0] font-bold text-sm font-[var(--font-display)]">C</div>
                <div>
                  <p className="text-[#E8F4F1] text-sm font-semibold leading-none mb-0.5 font-[var(--font-display)]">Clara</p>
                  <p className="text-[10px] text-[#00E5A0] leading-none">{t.chat_status}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                      className="text-[rgba(232,244,241,0.5)] hover:text-[#E8F4F1] transition-colors p-1">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div ref={bodyRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-[180px] max-h-[280px]
                                          scrollbar-thin scrollbar-thumb-white/10">
              {msgs.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {m.role === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-[#00E5A0]/15 border border-[#00E5A0]/30 flex items-center
                                    justify-center text-[#00E5A0] text-[10px] font-bold flex-shrink-0">C</div>
                  )}
                  <div className={`max-w-[80%] text-[13px] leading-relaxed px-3 py-2 rounded-2xl
                    ${m.role === 'bot'
                      ? 'bg-[#1A1A2E] text-[#E8F4F1] rounded-bl-sm'
                      : 'bg-[#00E5A0] text-[#0A0A0F] font-medium rounded-br-sm'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#00E5A0]/15 border border-[#00E5A0]/30 flex items-center
                                  justify-center text-[#00E5A0] text-[10px] font-bold flex-shrink-0">C</div>
                  <div className="bg-[#1A1A2E] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                    <div className="chat-typing-dot" /><div className="chat-typing-dot" /><div className="chat-typing-dot" />
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {!hideSug && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 border-t border-white/[0.07] pt-2">
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => send(s)}
                          className="text-[11px] text-[#00E5A0] border border-[#00E5A0]/30 bg-[#00E5A0]/08
                                     px-2.5 py-1 rounded-full hover:bg-[#00E5A0] hover:text-[#0A0A0F]
                                     transition-all duration-150 whitespace-nowrap">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 p-3 border-t border-white/[0.07]">
              <input
                className="flex-1 bg-[#1A1A2E] border border-white/[0.09] text-[#E8F4F1] text-[13px]
                           rounded-xl px-3 py-2 outline-none focus:border-[#00E5A0]/50 placeholder:text-[rgba(232,244,241,0.35)]"
                placeholder={t.chat_ph}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
              />
              <button onClick={() => send(input)}
                      className="w-8 h-8 bg-[#00E5A0] text-[#0A0A0F] rounded-lg flex items-center justify-center
                                 hover:bg-[#00fbb3] transition-colors flex-shrink-0">
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#00E5A0] text-[#0A0A0F]
                   flex items-center justify-center shadow-[0_8px_24px_rgba(0,229,160,0.45)]
                   hover:scale-110 hover:shadow-[0_12px_32px_rgba(0,229,160,0.55)] transition-all duration-200"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}} transition={{duration:0.15}}><X size={22}/></motion.span>
            : <motion.span key="c" initial={{rotate:90,opacity:0}}  animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}} transition={{duration:0.15}}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M11 2C6 2 2 6 2 11c0 2 .7 3.8 1.8 5.2L3 20l4.2-.9C8.4 19.7 9.7 20 11 20c5 0 9-4 9-9s-4-9-9-9z" fill="currentColor"/>
                  <path d="M7 11h.01M11 11h.01M15 11h.01" stroke="#0A0A0F" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.span>
          }
        </AnimatePresence>
        {/* Online dot */}
        <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-[#0A0A0F] rounded-full" />
      </button>
    </>
  );
}

/* ─────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────── */
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const dur = 1800; const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(target * ease));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function DyeTexLanding() {
  const [lang, setLang]       = useState<Lang>('EN');
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [email, setEmail]     = useState('');
  const [subOk, setSubOk]     = useState(false);
  const [vidOpen, setVidOpen] = useState(false);
  const [slide, setSlide]     = useState(0);
  const t = T[lang];

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const slides = ['Page','Page1','Page2','Page3','Page4','Page5','Page6','Page7'];
  const nextSlide = () => setSlide(s => (s + 1) % slides.length);
  const prevSlide = () => setSlide(s => (s - 1 + slides.length) % slides.length);

  // re-trigger reveals when lang changes
  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('in-view'));
    }, 100);
  }, [lang]);

  const navLinks = [
    { href: '#solutions', label: t.nav_solutions },
    { href: '#how-it-works', label: t.nav_how },
    { href: '#pricing', label: t.nav_pricing },
  ];

  const fadeUp: Variants = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const stagger: Variants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#E8F4F1] overflow-x-hidden">

      {/* ══ NAVBAR ══════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4
                       transition-all duration-300
                       ${scrolled ? 'bg-[rgba(10,10,15,0.92)] backdrop-blur-xl border-b border-white/[0.07]' : ''}`}>
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00E5A0]/15 border border-[#00E5A0]/30 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9" stroke="#00E5A0" strokeWidth="1.5"/>
              <path d="M5 10 L7 7 L10 9 L13 5 L16 10" stroke="#00E5A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="13" r="2" fill="#00E5A0"/>
            </svg>
          </div>
          <span className="font-[var(--font-display)] font-extrabold text-[1.15rem] tracking-tight text-[#E8F4F1]">DyeTex</span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href}
                 className="text-[13px] font-medium text-[rgba(232,244,241,0.6)] hover:text-[#E8F4F1]
                            px-3 py-2 rounded-lg hover:bg-white/[0.05] transition-all">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Lang */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(o => !o)}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[rgba(232,244,241,0.6)]
                         hover:text-[#E8F4F1] border border-white/[0.08] px-3 py-1.5 rounded-lg
                         hover:border-[#00E5A0]/30 transition-all">
              <Globe2 size={14}/> {lang} <ChevronDown size={12}/>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{opacity:0, y:8, scale:0.97}} animate={{opacity:1, y:0, scale:1}}
                  exit={{opacity:0, y:8, scale:0.97}} transition={{duration:0.15}}
                  className="absolute right-0 top-full mt-2 bg-[#1A1A2E] border border-white/[0.09] rounded-xl
                             overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)] min-w-[130px]"
                  onMouseLeave={() => setLangOpen(false)}>
                  {(['EN','ES','FR','PT'] as Lang[]).map(l => (
                    <button key={l} onClick={() => { setLang(l); setLangOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-[13px] transition-all
                                        hover:bg-[#00E5A0]/10 hover:text-[#00E5A0]
                                        ${lang === l ? 'text-[#00E5A0] font-semibold' : 'text-[rgba(232,244,241,0.6)]'}`}>
                      {l === 'EN' ? 'English' : l === 'ES' ? 'Español' : l === 'FR' ? 'Français' : 'Português'}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="https://dytex-fn8rqq4mw-hectors-projects-a1cfc66e.vercel.app"
             className="text-[13px] font-[var(--font-display)] font-bold text-[#00E5A0] bg-[#00E5A0]/10
                        border border-[#00E5A0]/30 px-4 py-2 rounded-full hover:bg-[#00E5A0] hover:text-[#0A0A0F]
                        transition-all duration-200">
            {t.nav_login}
          </a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden text-[#E8F4F1] p-1" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}
                      className="fixed top-[60px] left-0 right-0 z-40 bg-[rgba(10,10,15,0.98)]
                                 backdrop-blur-xl border-b border-white/[0.07] px-6 py-4 flex flex-col gap-3">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                 className="text-[15px] font-medium text-[rgba(232,244,241,0.8)] py-2 hover:text-[#00E5A0] transition-colors">
                {l.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              {(['EN','ES','FR','PT'] as Lang[]).map(l => (
                <button key={l} onClick={() => { setLang(l); setMobileOpen(false); }}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all
                                    ${lang===l ? 'border-[#00E5A0] text-[#00E5A0] bg-[#00E5A0]/10' : 'border-white/[0.1] text-[rgba(232,244,241,0.5)]'}`}>
                  {l}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ HERO ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* Textile canvas background */}
        <TextileHeroCanvas />

        {/* Radial ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(51,102,153,0.18) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse 40% 50% at 15% 40%, rgba(0,229,160,0.07) 0%, transparent 60%)' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp}
                        className="inline-flex items-center gap-2 bg-[#00E5A0]/10 border border-[#00E5A0]/25
                                   text-[#00E5A0] text-[11px] font-bold tracking-[0.16em] uppercase
                                   px-4 py-2 rounded-full mb-7"
                        style={{ animation: 'floatBadge 3s ease-in-out infinite' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]"
                    style={{ animation: 'dotPulse 2s ease-in-out infinite' }} />
              {t.hero_badge}
            </motion.div>

            <motion.h1 variants={fadeUp}
                       className="font-[var(--font-display)] font-extrabold tracking-tight leading-[1.07] mb-6"
                       style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)' }}>
              <span className="text-[rgba(232,244,241,0.75)]">{t.hero_h1a}<br/></span>
              <span className="dt-gradient-text">{t.hero_h1b}<br/></span>
              <span className="text-[#E8F4F1]">{t.hero_h1c}</span>
            </motion.h1>

            <motion.p variants={fadeUp}
                      className="text-[rgba(232,244,241,0.55)] text-[17px] leading-[1.8] max-w-md mb-10">
              {t.hero_desc}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-14">
              <a href="https://dytex-fn8rqq4mw-hectors-projects-a1cfc66e.vercel.app"
                 className="inline-flex items-center gap-2 bg-[#00E5A0] text-[#0A0A0F]
                            font-[var(--font-display)] font-bold text-[15px] px-7 py-3.5 rounded-full
                            hover:bg-[#00fbb3] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,229,160,0.35)]
                            transition-all duration-200">
                {t.hero_cta} <ArrowRight size={16}/>
              </a>
              <button onClick={() => setVidOpen(true)}
                      className="inline-flex items-center gap-2.5 text-[#E8F4F1] border border-white/[0.12]
                                 text-[15px] px-6 py-3.5 rounded-full hover:border-[#00E5A0]/40
                                 hover:text-[#00E5A0] transition-all duration-200">
                <div className="w-6 h-6 rounded-full bg-[#00E5A0]/20 border border-[#00E5A0]/30 flex items-center justify-center">
                  <Play size={10} fill="currentColor" className="text-[#00E5A0] ml-0.5"/>
                </div>
                {t.hero_watch}
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp}
                        className="inline-flex gap-0 bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
              {[
                { val: 40, suf: '%', label: t.stat1 },
                { val: 98, suf: '%', label: t.stat2 },
                { val: 60, suf: 's', label: t.stat3 },
              ].map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="w-px bg-white/[0.07]"/>}
                  <div className="flex flex-col items-center px-7 py-5">
                    <span className="font-[var(--font-display)] font-extrabold text-[#00E5A0] text-3xl leading-none">
                      <Counter target={s.val} suffix={s.suf}/>
                    </span>
                    <span className="text-[10px] text-[rgba(232,244,241,0.45)] uppercase tracking-wider mt-2 whitespace-nowrap">{s.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — 3D Textile Visualizer */}
          <motion.div initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:0.8,delay:0.3}}
                      className="relative hidden md:flex items-center justify-center">
            {/* Main loom frame */}
            <div className="relative w-full max-w-[480px] aspect-square">

              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-[#00E5A0]/10"
                   style={{ animation: 'spoolSpin 30s linear infinite' }}/>
              <div className="absolute inset-4 rounded-full border border-[#336699]/15"
                   style={{ animation: 'spoolSpin 20s linear infinite reverse' }}/>

              {/* Loom grid SVG */}
              <svg className="absolute inset-8" viewBox="0 0 400 400">
                {/* Warp (vertical) threads */}
                {Array.from({length: 12}, (_,i) => {
                  const x = 20 + i * 32;
                  return (
                    <line key={`v${i}`} x1={x} y1="10" x2={x} y2="390"
                          stroke={i % 3 === 0 ? '#00E5A0' : '#336699'}
                          strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
                          strokeOpacity={i % 3 === 0 ? 0.5 : 0.2}
                          strokeDasharray={i % 2 === 0 ? '8 6' : '12 4'}/>
                  );
                })}
                {/* Weft (horizontal) threads */}
                {Array.from({length: 12}, (_,i) => {
                  const y = 20 + i * 32;
                  return (
                    <line key={`h${i}`} x1="10" y1={y} x2="390" y2={y}
                          stroke={i % 3 === 0 ? '#00E5A0' : '#336699'}
                          strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
                          strokeOpacity={i % 3 === 0 ? 0.45 : 0.18}/>
                  );
                })}
                {/* Intersection dots — woven pattern */}
                {Array.from({length: 6}, (_,row) =>
                  Array.from({length: 6}, (_,col) => {
                    const x = 52 + col * 64, y = 52 + row * 64;
                    const accent = (row + col) % 2 === 0;
                    return (
                      <circle key={`d${row}${col}`} cx={x} cy={y} r={accent ? 4 : 2.5}
                              fill={accent ? '#00E5A0' : '#336699'}
                              fillOpacity={accent ? 0.7 : 0.35}/>
                    );
                  })
                )}
                {/* Animated shuttle path */}
                <path d="M10,200 Q100,140 200,200 Q300,260 390,200"
                      stroke="#00E5A0" strokeWidth="2" fill="none" strokeLinecap="round"
                      strokeDasharray="600" strokeDashoffset="600"
                      style={{ animation: 'drawThread 2s ease-out forwards 1s' }}/>
              </svg>

              {/* Central spool */}
              <div className="absolute inset-[35%] rounded-full bg-gradient-to-br from-[#00E5A0]/20 to-[#336699]/20
                              border border-[#00E5A0]/40 flex items-center justify-center
                              shadow-[0_0_40px_rgba(0,229,160,0.2)]"
                   style={{ animation: 'glowPulse 3s ease-in-out infinite' }}>
                <svg viewBox="0 0 60 60" className="w-10 h-10">
                  <circle cx="30" cy="30" r="25" stroke="#00E5A0" strokeWidth="2" fill="none" strokeOpacity="0.6"/>
                  <circle cx="30" cy="30" r="14" stroke="#336699" strokeWidth="1.5" fill="none" strokeOpacity="0.5"/>
                  <circle cx="30" cy="30" r="5" fill="#00E5A0" fillOpacity="0.8"/>
                  <line x1="30" y1="5" x2="30" y2="55" stroke="#00E5A0" strokeWidth="1" strokeOpacity="0.3"/>
                  <line x1="5" y1="30" x2="55" y2="30" stroke="#00E5A0" strokeWidth="1" strokeOpacity="0.3"/>
                </svg>
              </div>

              {/* Floating metric badges */}
              {[
                { text: 'RPM 1,240', sub: 'Machine A', x: '-14%', y: '10%', delay: '0s' },
                { text: '98.2°C',    sub: 'Temp OK',   x: '88%',  y: '20%', delay: '0.4s' },
                { text: '0 Faults',  sub: 'Live Status',x: '-10%', y: '76%', delay: '0.8s' },
              ].map((b, i) => (
                <div key={i} className="absolute bg-[#111118]/90 border border-white/[0.09] backdrop-blur-sm
                                        rounded-xl px-3 py-2 shadow-lg"
                     style={{ left: b.x, top: b.y, animation: `floatBadge ${2.5 + i * 0.5}s ease-in-out ${b.delay} infinite` }}>
                  <p className="font-[var(--font-display)] font-bold text-[#00E5A0] text-sm leading-none">{b.text}</p>
                  <p className="text-[10px] text-[rgba(232,244,241,0.45)] mt-0.5">{b.sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none translate-y-px">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20 block">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z" fill="#111118"/>
          </svg>
        </div>
      </section>

      {/* ══ VIDEO MODAL ═════════════════════════════════ */}
      <AnimatePresence>
        {vidOpen && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
                      onClick={() => setVidOpen(false)}>
            <motion.div initial={{scale:0.95,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.95,opacity:0}}
                        onClick={e => e.stopPropagation()}
                        className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden border border-white/[0.1]
                                   shadow-[0_32px_80px_rgba(0,0,0,0.8)] relative">
              <iframe className="w-full h-full" src="https://www.youtube.com/embed/R08nqhHqrGA?autoplay=1" allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
              <button onClick={() => setVidOpen(false)}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center
                                 text-white hover:bg-black/80 transition-colors">
                <X size={16}/>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ SOLUTIONS ═══════════════════════════════════ */}
      <section id="solutions" className="py-28 bg-[#111118]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <p className="dt-eyebrow reveal">{t.sol_eyebrow}</p>
            <h2 className="reveal font-[var(--font-display)] font-extrabold tracking-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {t.sol_title.split('\n').map((l,i) => <span key={i}>{l}{i===0 && <br/>}</span>)}
            </h2>
            <p className="reveal text-[rgba(232,244,241,0.5)] text-[17px] max-w-xl mx-auto leading-relaxed">{t.sol_desc}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureKeys.map((k, i) => (
              <FeatureCard key={k} icon={featureIcons[i]} title={t[`${k}t`]} desc={t[`${k}d`]} delay={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════ */}
      <section id="how-it-works" className="py-28 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="dt-eyebrow reveal">{t.how_eyebrow}</p>
            <h2 className="reveal font-[var(--font-display)] font-extrabold tracking-tight mb-14"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {t.how_title.split('\n').map((l,i) => <span key={i}>{l}{i===0 && <br/>}</span>)}
            </h2>
            <Step n="01" title={t.s1t} desc={t.s1d} />
            <Step n="02" title={t.s2t} desc={t.s2d} />
            <Step n="03" title={t.s3t} desc={t.s3d} last />
          </div>

          {/* Video embed in this section */}
          <div className="reveal">
            <p className="dt-eyebrow mb-4">{t.video_eyebrow}</p>
            <h3 className="font-[var(--font-display)] font-bold text-xl text-[#E8F4F1] mb-6 tracking-tight">{t.video_title}</h3>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
                 style={{ paddingBottom: '56.25%' }}>
              <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/R08nqhHqrGA"
                      allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
            </div>
            {/* Inline stats under video */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { icon: <Zap size={16}/>, label: 'Avg install time', val: '< 1 day' },
                { icon: <BarChart3 size={16}/>, label: 'Data refresh rate', val: '< 5 sec' },
              ].map((s,i) => (
                <div key={i} className="bg-[#111118] border border-white/[0.07] rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="text-[#00E5A0]">{s.icon}</div>
                  <div>
                    <p className="text-[#E8F4F1] font-[var(--font-display)] font-bold text-sm">{s.val}</p>
                    <p className="text-[10px] text-[rgba(232,244,241,0.4)] uppercase tracking-wider">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRODUCT / APP CAROUSEL ══════════════════════ */}
      <section id="product" className="py-28 bg-[#111118]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <p className="dt-eyebrow reveal">{t.product_eyebrow}</p>
            <h2 className="reveal font-[var(--font-display)] font-extrabold tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {t.product_title.split('\n').map((l,i) => <span key={i}>{l}{i===0 && <br/>}</span>)}
            </h2>
            <p className="reveal text-[rgba(232,244,241,0.5)] text-[17px] max-w-xl mx-auto leading-relaxed">{t.product_desc}</p>
          </div>

          <div className="reveal">
            {/* Carousel */}
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0A0A0F]">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${slide * 100}%)` }}>
                {slides.map((name, i) => (
                  <div key={i} className="min-w-full h-[380px] md:h-[500px] flex items-center justify-center bg-[#0d0d14] relative">
                    <img src={`/Img/appWebDesing/${name}.png`} alt={name}
                         className="h-full w-full object-contain p-4"
                         onError={(e) => {
                           const img = e.target as HTMLImageElement;
                           img.style.display = 'none';
                           const fb = img.nextElementSibling as HTMLElement;
                           if (fb) fb.style.display = 'flex';
                         }}/>
                    <div className="absolute inset-0 hidden items-center justify-center flex-col gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="3" stroke="#00E5A0" strokeWidth="1.5"/><path d="M7 18l4-4 4 4 6-8" stroke="#00E5A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span className="text-[rgba(232,244,241,0.3)] text-xs">Screen {i + 1} — {name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#111118]/90 border border-white/[0.09]
                                 rounded-full flex items-center justify-center text-[rgba(232,244,241,0.6)]
                                 hover:text-[#00E5A0] hover:border-[#00E5A0]/40 transition-all">
                <ChevronRight size={18} className="rotate-180"/>
              </button>
              <button onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#111118]/90 border border-white/[0.09]
                                 rounded-full flex items-center justify-center text-[rgba(232,244,241,0.6)]
                                 hover:text-[#00E5A0] hover:border-[#00E5A0]/40 transition-all">
                <ChevronRight size={18}/>
              </button>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {slides.map((_,i) => (
                <button key={i} onClick={() => setSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300
                                    ${slide===i ? 'w-6 bg-[#00E5A0]' : 'w-1.5 bg-white/20'}`}/>
              ))}
            </div>
          </div>

          {/* Second video */}
          <div className="reveal mt-16 max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08]" style={{ paddingBottom: '56.25%' }}>
              <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/Y1odoQIhGp8"
                      allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TEAM ════════════════════════════════════════ */}
      <section id="team" className="py-28 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="dt-eyebrow reveal">{t.team_eyebrow}</p>
            <h2 className="reveal font-[var(--font-display)] font-extrabold tracking-tight mb-5"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {t.team_title.split('\n').map((l,i) => <span key={i}>{l}{i===0 && <br/>}</span>)}
            </h2>
            <p className="reveal text-[rgba(232,244,241,0.5)] text-[16px] leading-relaxed mb-8 max-w-md">{t.team_desc}</p>
            <div className="space-y-3">
              {[t.v1, t.v2, t.v3].map((v,i) => (
                <div key={i} className="reveal flex items-center gap-3 text-[rgba(232,244,241,0.65)] text-[15px]">
                  <div className="w-5 h-5 rounded-full bg-[#00E5A0]/15 border border-[#00E5A0]/30 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-[#00E5A0]"/>
                  </div>
                  {v}
                </div>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { title: 'Mission', text: t.mission_text },
                { title: 'Vision',  text: t.vision_text },
              ].map((c,i) => (
                <div key={i} className="reveal bg-[#111118] border border-white/[0.07] rounded-2xl p-5">
                  <p className="text-[#00E5A0] text-xs font-bold uppercase tracking-widest mb-2 font-[var(--font-display)]">{c.title}</p>
                  <p className="text-[rgba(232,244,241,0.5)] text-[13px] leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.07]
                            shadow-[0_32px_80px_rgba(0,0,0,0.4)]">
              <img src="/Img/equipo.png" alt="DyeTex Team"
                   className="w-full object-cover"
                   onError={(e) => {
                     const img = e.target as HTMLImageElement;
                     img.style.display = 'none';
                     const fb = img.nextElementSibling as HTMLElement;
                     if (fb) fb.removeAttribute('hidden');
                   }}/>
              <div hidden className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-20 h-20 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/20 flex items-center justify-center">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="12" r="6" stroke="#00E5A0" strokeWidth="1.5"/><path d="M6 30c0-6.627 5.373-10 12-10s12 3.373 12 10" stroke="#00E5A0" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <span className="text-[rgba(232,244,241,0.3)] text-sm">Add /public/Img/equipo.png</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/60 to-transparent"/>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full border-2 border-[#00E5A0]/20"
                 style={{ animation: 'spoolSpin 16s linear infinite' }}/>
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full border border-[#336699]/30"
                 style={{ animation: 'spoolSpin 10s linear infinite reverse' }}/>
          </div>
        </div>
      </section>

      {/* ══ PRICING ═════════════════════════════════════ */}
      <section id="pricing" className="py-28 bg-[#111118]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <p className="dt-eyebrow reveal">{t.pricing_eyebrow}</p>
            <h2 className="reveal font-[var(--font-display)] font-extrabold tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {t.pricing_title}
            </h2>
            <p className="reveal text-[rgba(232,244,241,0.5)] text-[17px] max-w-md mx-auto">{t.pricing_desc}</p>
          </div>
          <div className="reveal flex flex-col md:flex-row gap-5 max-w-3xl mx-auto">
            <PricingCard title="Starter" price="$0 / mo" description="Test real-time monitoring in a small plant"
                         buttonVariant="outline"
                         features={['Up to 2 machines','Basic real-time monitoring','Standard fault history','Email support']}/>
            <PricingCard title="Enterprise" price="$299 / mo" description="Full-scale IoT intelligence for large plants"
                         buttonVariant="default" highlight
                         features={['Unlimited machines','AI predictive alerts','Automated PDF reports','Priority 24/7 support',
                                    'Maintenance scheduler','Mobile app access','IoT sensor hardware included']}/>
          </div>
        </div>
      </section>

      {/* ══ CTA / SUBSCRIBE ═════════════════════════════ */}
      <section className="relative py-32 overflow-hidden"
               style={{ background: 'linear-gradient(135deg, #0d1a2e 0%, #0A0A0F 50%, #0d2a1e 100%)' }}>
        {/* Animated thread lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path d="M0,200 C300,80 600,320 900,160 C1100,60 1300,280 1440,180" stroke="#00E5A0" strokeWidth="2" fill="none"/>
          <path d="M0,300 C200,150 500,350 800,200 C1000,100 1200,320 1440,220" stroke="#336699" strokeWidth="1.5" fill="none"/>
        </svg>
        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <p className="dt-eyebrow reveal">{t.cta_eyebrow}</p>
          <h2 className="reveal font-[var(--font-display)] font-extrabold tracking-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}>
            {t.cta_title.split('\n').map((l,i) => <span key={i}>{l}{i===0 && <br/>}</span>)}
          </h2>
          <p className="reveal text-[rgba(232,244,241,0.5)] text-[17px] leading-relaxed mb-10">{t.cta_desc}</p>

          {!subOk ? (
            <div className="reveal flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                     placeholder={t.cta_ph}
                     className="flex-1 bg-white/[0.05] border border-white/[0.1] text-[#E8F4F1] text-[14px]
                                px-5 py-3.5 rounded-full outline-none focus:border-[#00E5A0]/50 placeholder:text-[rgba(232,244,241,0.3)]
                                transition-colors"/>
              <button onClick={() => { if(email.includes('@')){ setSubOk(true); } }}
                      className="inline-flex items-center justify-center gap-2 bg-[#00E5A0] text-[#0A0A0F]
                                 font-[var(--font-display)] font-bold text-[14px] px-6 py-3.5 rounded-full whitespace-nowrap
                                 hover:bg-[#00fbb3] hover:shadow-[0_8px_24px_rgba(0,229,160,0.3)] transition-all">
                {t.cta_btn} <ArrowRight size={16}/>
              </button>
            </div>
          ) : (
            <div className="reveal inline-flex items-center gap-2 bg-[#00E5A0]/15 border border-[#00E5A0]/30
                            text-[#00E5A0] px-6 py-3 rounded-full font-medium">
              <Check size={16}/> {t.cta_ok}
            </div>
          )}
          <p className="reveal mt-4 text-[12px] text-[rgba(232,244,241,0.3)]">{t.cta_note}</p>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════ */}
      <footer className="bg-[#111118] border-t border-white/[0.07] py-16 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#00E5A0]/15 border border-[#00E5A0]/30 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" stroke="#00E5A0" strokeWidth="1.5"/>
                  <path d="M5 10 L7 7 L10 9 L13 5 L16 10" stroke="#00E5A0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="10" cy="13" r="2" fill="#00E5A0"/>
                </svg>
              </div>
              <span className="font-[var(--font-display)] font-extrabold text-[1.1rem] text-[#E8F4F1]">DyeTex</span>
            </div>
            <p className="text-[rgba(232,244,241,0.45)] text-[13px] leading-relaxed mb-5">{t.footer_tagline}</p>
            <div className="flex gap-2">
              {[
                <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                <svg key="ig" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
                <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M8 11v5M8 8v.5M12 16v-5M12 11a3 3 0 016 0v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
              ].map((icon, i) => (
                <a key={i} href="#"
                   className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center
                              text-[rgba(232,244,241,0.45)] hover:text-[#00E5A0] hover:border-[#00E5A0]/40 transition-all">
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {[
            { title: 'Product', links: [{ label: 'Solutions', href: '#solutions' }, { label: 'How it Works', href: '#how-it-works' }, { label: 'Platform', href: '#product' }, { label: 'Pricing', href: '#pricing' }] },
            { title: 'Company', links: [{ label: 'The Team', href: '#team' }, { label: 'Contact', href: 'mailto:supportintex@gmail.com' }, { label: 'Privacy Policy', href: '#' }, { label: 'Terms of Use', href: '#' }] },
            { title: 'Contact', links: [{ label: '+51 999 999 999', href: 'tel:+51999999999' }, { label: 'supportintex@gmail.com', href: 'mailto:supportintex@gmail.com' }, { label: 'Tintex S.A.C', href: '#' }, { label: 'Lima, Perú', href: '#' }] },
          ].map((col, i) => (
            <div key={i}>
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#E8F4F1] mb-4 font-[var(--font-display)]">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l, j) => (
                  <li key={j}><a href={l.href} className="text-[13px] text-[rgba(232,244,241,0.45)] hover:text-[#00E5A0] transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.07] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3
                        text-[12px] text-[rgba(232,244,241,0.3)]">
          <span>DyeTex © {new Date().getFullYear()} — Tintex S.A.C</span>
          <span>Made in Lima, Perú 🇵🇪</span>
        </div>
      </footer>

      {/* ══ CHAT WIDGET ═════════════════════════════════ */}
      <ChatWidget t={t} />

    </div>
  );
}