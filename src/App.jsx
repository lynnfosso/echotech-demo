import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  ArrowRight,
  Globe
} from 'lucide-react';

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷', rtl: false },
  { code: 'en', label: 'English', flag: '🇬🇧', rtl: false },
  { code: 'es', label: 'Español', flag: '🇪🇸', rtl: false },
  { code: 'pt', label: 'Português', flag: '🇵🇹', rtl: false },
  { code: 'zh', label: '中文', flag: '🇨🇳', rtl: false },
  { code: 'ar', label: 'العربية', flag: '🇸🇦', rtl: true },
];

const LANGUAGE_NAMES = {
  fr: 'French',
  en: 'English',
  es: 'Spanish',
  pt: 'Portuguese',
  zh: 'Mandarin Chinese',
  ar: 'Arabic',
};

const UI_TEXT = {
  fr: {
    tagline: 'Support & Automatisation B2B',
    agentActive: 'Agent IA Actif',
    agentDesc: "Cet agent orchestre les demandes d'assistance, qualifie les prospects et automatise la prise de rendez-vous.",
    statusTitle: 'Statut des services',
    statusAI: 'Moteur IA connecté (Gemini)',
    statusBackend: 'Backend Vercel opérationnel',
    bookDemo: 'Réserver une démo',
    headerTitle: 'Assistant B2B EchoTech',
    online: 'En ligne • Réponse instantanée',
    demoBadge: 'Démo Interactive',
    placeholder: 'Posez votre question ou détaillez votre besoin...',
    footer: 'Propulsé par Gemini AI & EchoTech AI Framework',
    welcome: "Bonjour ! Je suis l'assistant IA d'EchoTech. Comment puis-je vous aider aujourd'hui à optimiser vos processus ou répondre à vos questions techniques ?",
    error: "Désolé, une erreur est survenue lors de la connexion au serveur. Réessayez dans un instant.",
    langSelector: 'Langue',
  },
  en: {
    tagline: 'B2B Support & Automation',
    agentActive: 'AI Agent Active',
    agentDesc: 'This agent handles support requests, qualifies leads, and automates meeting bookings.',
    statusTitle: 'Service status',
    statusAI: 'AI engine connected (Gemini)',
    statusBackend: 'Vercel backend operational',
    bookDemo: 'Book a demo',
    headerTitle: 'EchoTech B2B Assistant',
    online: 'Online • Instant reply',
    demoBadge: 'Interactive Demo',
    placeholder: 'Ask a question or describe your need...',
    footer: 'Powered by Gemini AI & EchoTech AI Framework',
    welcome: "Hi there! I'm EchoTech's AI assistant. How can I help you optimize your processes or answer your technical questions today?",
    error: 'Sorry, something went wrong connecting to the server. Please try again in a moment.',
    langSelector: 'Language',
  },
  es: {
    tagline: 'Soporte y Automatización B2B',
    agentActive: 'Agente IA Activo',
    agentDesc: 'Este agente gestiona las solicitudes de soporte, califica prospectos y automatiza la reserva de citas.',
    statusTitle: 'Estado del servicio',
    statusAI: 'Motor de IA conectado (Gemini)',
    statusBackend: 'Backend de Vercel operativo',
    bookDemo: 'Reservar una demo',
    headerTitle: 'Asistente B2B de EchoTech',
    online: 'En línea • Respuesta instantánea',
    demoBadge: 'Demo Interactiva',
    placeholder: 'Haz una pregunta o describe tu necesidad...',
    footer: 'Desarrollado con Gemini AI y EchoTech AI Framework',
    welcome: '¡Hola! Soy el asistente de IA de EchoTech. ¿Cómo puedo ayudarte hoy a optimizar tus procesos o responder tus preguntas técnicas?',
    error: 'Lo sentimos, hubo un error al conectar con el servidor. Inténtalo de nuevo en un momento.',
    langSelector: 'Idioma',
  },
  pt: {
    tagline: 'Suporte e Automação B2B',
    agentActive: 'Agente IA Ativo',
    agentDesc: 'Este agente gerencia solicitações de suporte, qualifica leads e automatiza o agendamento de reuniões.',
    statusTitle: 'Status dos serviços',
    statusAI: 'Motor de IA conectado (Gemini)',
    statusBackend: 'Backend Vercel operacional',
    bookDemo: 'Agendar uma demo',
    headerTitle: 'Assistente B2B EchoTech',
    online: 'Online • Resposta instantânea',
    demoBadge: 'Demo Interativa',
    placeholder: 'Faça uma pergunta ou descreva sua necessidade...',
    footer: 'Desenvolvido com Gemini AI e EchoTech AI Framework',
    welcome: 'Olá! Sou o assistente de IA da EchoTech. Como posso ajudá-lo hoje a otimizar seus processos ou responder suas perguntas técnicas?',
    error: 'Desculpe, ocorreu um erro ao conectar ao servidor. Tente novamente em instantes.',
    langSelector: 'Idioma',
  },
  zh: {
    tagline: 'B2B 支持与自动化',
    agentActive: 'AI 助手已激活',
    agentDesc: '该助手处理支持请求、筛选潜在客户，并自动安排预约。',
    statusTitle: '服务状态',
    statusAI: 'AI 引擎已连接（Gemini）',
    statusBackend: 'Vercel 后端运行正常',
    bookDemo: '预约演示',
    headerTitle: 'EchoTech B2B 助手',
    online: '在线 • 即时回复',
    demoBadge: '互动演示',
    placeholder: '请输入您的问题或需求...',
    footer: '由 Gemini AI 与 EchoTech AI Framework 提供支持',
    welcome: '您好！我是 EchoTech 的 AI 助手。今天我能帮您优化流程或解答技术问题吗？',
    error: '抱歉，连接服务器时出现错误，请稍后重试。',
    langSelector: '语言',
  },
  ar: {
    tagline: 'الدعم والأتمتة لقطاع الأعمال',
    agentActive: 'وكيل الذكاء الاصطناعي نشط',
    agentDesc: 'يتولى هذا الوكيل طلبات الدعم، ويؤهل العملاء المحتملين، ويؤتمت حجز المواعيد.',
    statusTitle: 'حالة الخدمات',
    statusAI: 'محرك الذكاء الاصطناعي متصل (Gemini)',
    statusBackend: 'خادم Vercel يعمل بشكل جيد',
    bookDemo: 'احجز عرضًا تجريبيًا',
    headerTitle: 'مساعد EchoTech لقطاع الأعمال',
    online: 'متصل • رد فوري',
    demoBadge: 'عرض تفاعلي',
    placeholder: 'اطرح سؤالك أو صف احتياجك...',
    footer: 'مدعوم بواسطة Gemini AI وإطار عمل EchoTech',
    welcome: 'مرحبًا! أنا المساعد الذكي لشركة EchoTech. كيف يمكنني مساعدتك اليوم في تحسين عملياتك أو الإجابة عن أسئلتك التقنية؟',
    error: 'عذرًا، حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى بعد قليل.',
    langSelector: 'اللغة',
  },
};

function buildSystemPrompt(langCode) {
  const langName = LANGUAGE_NAMES[langCode];
  return `You are the AI assistant for EchoTech, a company specialized in B2B technical support and automation (integrations, workflows, IT consulting).

ROLE:
- You welcome prospects and clients, answer general technical questions about EchoTech's services, and qualify their needs (project type, urgency, rough budget).
- If the request is specific and shows real intent (quote, meeting, concrete project), clearly direct them to book a demo via the "Book a demo" button.
- If the question is outside your scope (ongoing support case, complaint, contractual matter), offer to connect them with a human from the team.

TONE:
- Professional, concise, solution-oriented. No filler, no generic answers.

LANGUAGE:
- ALWAYS reply in ${langName}, regardless of the language the user writes in. The user has explicitly selected ${langName} as their preferred language in the interface.`;
}

export default function B2BSupportAgentDemo() {
  const [lang, setLang] = useState('en');
  const t = UI_TEXT[lang];
  const currentLangMeta = LANGUAGES.find((l) => l.code === lang);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: UI_TEXT.en.welcome,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // When the user switches language, reset the conversation with a fresh welcome
  // message in the new language, so the demo never mixes languages awkwardly.
  function handleLangChange(newLang) {
    setLang(newLang);
    setMessages([
      {
        id: Date.now(),
        sender: 'agent',
        text: UI_TEXT[newLang].welcome,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system: buildSystemPrompt(lang),
          messages: updatedMessages.map((m) => ({
            role: m.sender === 'agent' ? 'assistant' : 'user',
            content: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      const agentText = data?.content?.[0]?.text || t.error;

      const agentResponse = {
        id: Date.now() + 1,
        sender: 'agent',
        text: agentText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, agentResponse]);
    } catch (error) {
      console.error('Error communicating with the backend:', error);
      const errorResponse = {
        id: Date.now() + 1,
        sender: 'agent',
        text: t.error,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      dir={currentLangMeta.rtl ? 'rtl' : 'ltr'}
      className="flex h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden"
    >
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-80 bg-slate-950 border-r border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-white">EchoTech</h1>
            <p className="text-xs text-slate-400">{t.tagline}</p>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              {t.agentActive}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{t.agentDesc}</p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.statusTitle}</p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.statusAI}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.statusBackend}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full p-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-blue-600/20 group"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t.bookDemo}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full bg-slate-900">
        <header className="h-16 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between bg-slate-950/50 backdrop-blur-md gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-950"></span>
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-white truncate">{t.headerTitle}</h2>
              <p className="text-xs text-slate-400 truncate">{t.online}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden lg:inline-flex text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
              {t.demoBadge}
            </span>

            {/* Language selector */}
            <div className="relative flex items-center">
              <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                aria-label={t.langSelector}
                value={lang}
                onChange={(e) => handleLangChange(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-700 text-slate-100 text-xs rounded-lg pl-8 pr-6 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 cursor-pointer"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 max-w-2xl ${
                msg.sender === 'user' ? 'ms-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 border border-slate-700 text-blue-400'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-md'
                      : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <div
                  className={`flex items-center gap-1 text-[10px] text-slate-500 ${
                    msg.sender === 'user' ? 'justify-end' : ''
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>{msg.time}</span>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3 max-w-md">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 text-blue-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-tl-none bg-slate-800/90 border border-slate-700/60 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t.placeholder}
              className="w-full bg-slate-800/80 text-slate-100 placeholder-slate-400 text-sm rounded-xl px-4 py-3.5 border border-slate-700/80 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              style={{ paddingInlineEnd: '3rem' }}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="absolute end-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-center text-[11px] text-slate-500 mt-2">{t.footer}</p>
        </div>
      </div>
    </div>
  );
}
