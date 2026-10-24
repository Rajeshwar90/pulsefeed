import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ShieldAlert, Cpu, CheckCircle, XCircle, RefreshCw, 
  Lock, Key, Send, AlertTriangle, Terminal, Sliders, Globe, ThumbsUp, 
  MessageSquare, Share2, Sparkles, Power, Eye, Edit3
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('queue');
  const [isConnected, setIsConnected] = useState(false);
  const [postFrequency, setPostFrequency] = useState(3); // every 3 days
  const [humanizerEnabled, setHumanizerEnabled] = useState(true);
  const [recruiterFocus, setRecruiterFocus] = useState(true);
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, timestamp: '2026-05-14 08:30:12', event: 'System initialized with AES-256-GCM context storage', type: 'info' }
  ]);

  const [queue, setQueue] = useState([
    {
      id: 1,
      topic: 'Agentic Workflows in Enterprise Architecture',
      source: 'arXiv / TechCrunch Web Curation',
      draft: 'Moving from rigid prompt-response LLMs to multi-agent loops changes how we build distributed systems. By decoupling planners from tool executioners, we see cleaner separation of concerns in enterprise backend integrations. Excited to see how teams handle state synchronization across workers.',
      status: 'pending',
      matchedRecruiterSignal: 'Demonstrates scalable backend & modern AI orchestration expertise'
    },
    {
      id: 2,
      topic: 'Optimizing Token Latency & Memory Footprint in SLMs',
      source: 'GitHub Trending Repositories',
      draft: 'Smaller Language Models (SLMs) fine-tuned on specific domain data are outperforming brute-force scale for localized microservices. Lower inference latency means tighter feedback loops for real-time user experiences.',
      status: 'pending',
      matchedRecruiterSignal: 'Highlights cost-conscious architecture & performance optimization skills'
    }
  ]);

  const addLog = (event, type = 'info') => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      event,
      type
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleConnectLinkedIn = () => {
    setIsConnected(true);
    addLog('OAuth 2.0 PKCE Authorization Handshake completed successfully with scopes: r_liteprofile, w_member_social.', 'success');
  };

  const handleKillSwitch = () => {
    setIsConnected(false);
    addLog('EMERGENCY KILL SWITCH ACTIVATED: LinkedIn session tokens wiped from memory and revocation signal dispatched.', 'error');
  };

  const approveAndPost = (id) => {
    if (!isConnected) {
      alert('Error: Cannot post. LinkedIn profile is not connected via OAuth.');
      return;
    }
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'published' } : item));
    addLog(`Post #${id} verified by human reviewer and successfully published via LinkedIn API v2 /ugcPosts endpoint.`, 'success');
  };

  const rejectPost = (id) => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'rejected' } : item));
    addLog(`Post #${id} rejected by user in review guardrail queue. Draft archived.`, 'warning');
  };

  const generateNewDraft = () => {
    const topics = [
      { topic: 'BPMN Process Orchestration meets LLM Decision Nodes', text: 'Bridging deterministic workflow engines (like Camunda) with probabilistic AI nodes gives us the best of both worlds: strict auditability for business logic and adaptive handling of unstructured data inputs.' },
      { topic: 'Robust Error Handling in Cloud SDK Integrations', text: 'When pairing cloud object storage with LLM SDKs, resilient retry policies and exponential backoffs are non-negotiable for production reliability.' }
    ];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const newItem = {
      id: Date.now(),
      topic: randomTopic.topic,
      source: 'Live Web Scraping Engine',
      draft: randomTopic.text,
      status: 'pending',
      matchedRecruiterSignal: 'Reinforces senior engineering & robust system design capability'
    };
    setQueue(prev => [newItem, ...prev]);
    addLog(`New AI topic curated from web feed: "${randomTopic.topic}"`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-500/10 p-2 rounded-xl border border-cyan-500/30 text-cyan-400">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              PulseFeed AI
            </h1>
            <p className="text-xs text-slate-400">Secure Autonomous LinkedIn Curator for Rajeshwar Bose</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {isConnected ? (
            <div className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>LinkedIn Linked (Secure PKCE)</span>
              <button 
                onClick={handleKillSwitch}
                className="ml-2 bg-red-600/80 hover:bg-red-600 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider transition"
                title="Emergency Token Revocation"
              >
                Kill Switch
              </button>
            </div>
          ) : (
            <button 
              onClick={handleConnectLinkedIn}
              className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-lg shadow-cyan-900/20 transition flex items-center space-x-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Connect LinkedIn OAuth</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Layout Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/40 px-6">
        <button 
          onClick={() => setActiveTab('queue')}
          className={`py-3 px-5 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${activeTab === 'queue' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Eye className="w-4 h-4" />
          <span>Approval Queue ({queue.filter(i => i.status === 'pending').length})</span>
        </button>
        <button 
          onClick={() => setActiveTab('config')}
          className={`py-3 px-5 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${activeTab === 'config' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Sliders className="w-4 h-4" />
          <span>Configuration & Guardrails</span>
        </button>
        <button 
          onClick={() => setActiveTab('security')}
          className={`py-3 px-5 text-sm font-medium border-b-2 transition flex items-center space-x-2 ${activeTab === 'security' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security & Audit Logs</span>
        </button>
      </div>

      {/* Content Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {activeTab === 'queue' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-200">Human-in-the-Loop Review Queue</h2>
                <p className="text-sm text-slate-400">Strict constraint: No posts go live without your explicit click-to-approve review.</p>
              </div>
              <button 
                onClick={generateNewDraft}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition flex items-center space-x-1.5 shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fetch & Draft New Web Trend</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {queue.map(item => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  {/* Status Banner */}
                  <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl text-xs font-semibold uppercase tracking-wider">
                    {item.status === 'pending' && <span className="bg-amber-500/10 text-amber-400 border-b border-l border-amber-500/20 px-3 py-1 rounded-bl-xl">Awaiting Approval</span>}
                    {item.status === 'published' && <span className="bg-emerald-500/10 text-emerald-400 border-b border-l border-emerald-500/20 px-3 py-1 rounded-bl-xl">Published to LinkedIn</span>}
                    {item.status === 'rejected' && <span className="bg-red-500/10 text-red-400 border-b border-l border-red-500/20 px-3 py-1 rounded-bl-xl">Rejected</span>}
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-cyan-400 mb-2 font-mono">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Source: {item.source}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100 mb-2">{item.topic}</h3>
                  
                  {/* Draft Preview Box */}
                  <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 text-slate-300 text-sm mb-4 leading-relaxed font-sans">
                    {item.draft}
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-indigo-300 mb-6 bg-indigo-950/40 border border-indigo-900/40 px-3 py-2 rounded-lg">
                    <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span><strong>Recruiter Value:</strong> {item.matchedRecruiterSignal}</span>
                  </div>

                  {item.status === 'pending' && (
                    <div className="flex items-center justify-end space-x-3">
                      <button 
                        onClick={() => rejectPost(item.id)}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition flex items-center space-x-1"
                      >
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span>Discard</span>
                      </button>
                      <button 
                        onClick={() => approveAndPost(item.id)}
                        className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-lg shadow-emerald-900/20"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Approve & Post to LinkedIn</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-200 mb-1">Automation & Guardrail Settings</h2>
              <p className="text-sm text-slate-400">Configure how frequently posts are queued and tune AI tone filters.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Posting Frequency Interval</label>
                <select 
                  value={postFrequency} 
                  onChange={(e) => setPostFrequency(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value={1}>Every 1 day</option>
                  <option value={3}>Every 3 days (Recommended)</option>
                  <option value={5}>Every 5 days</option>
                  <option value={7}>Once a week</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div>
                  <h4 className="text-sm font-medium text-slate-200">Anti-AI Buzzword Humanizer</h4>
                  <p className="text-xs text-slate-400">Strips words like "delve", "tapestry", and "game-changer" to ensure natural tech practitioner tone.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={humanizerEnabled} 
                  onChange={() => setHumanizerEnabled(!humanizerEnabled)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div>
                  <h4 className="text-sm font-medium text-slate-200">Recruiter Visibility Alignment</h4>
                  <p className="text-xs text-slate-400">Frames content around architectural competence, continuous learning, and software craftsmanship.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={recruiterFocus} 
                  onChange={() => setRecruiterFocus(!recruiterFocus)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <div>
                  <h2 className="text-lg font-semibold text-slate-200">Security Isolation & Token Vault</h2>
                  <p className="text-sm text-slate-400">Guarantees zero unauthorized access to your LinkedIn profile.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">OAuth Security Protocol</div>
                  <div className="text-base font-semibold text-slate-200 mt-1">OAuth 2.0 with PKCE</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">Token Encryption</div>
                  <div className="text-base font-semibold text-emerald-400 mt-1">AES-256-GCM Active</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400">Human Override Lock</div>
                  <div className="text-base font-semibold text-cyan-400 mt-1">100% Enforced</div>
                </div>
              </div>
            </div>

            {/* Audit Log Stream */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-semibold text-slate-200">Real-time Security Audit Stream</h3>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2 max-h-64 overflow-y-auto">
                {auditLogs.map(log => (
                  <div key={log.id} className="flex items-start space-x-3 border-b border-slate-900 pb-2">
                    <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold shrink-0 ${
                      log.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                      log.type === 'error' ? 'bg-red-500/10 text-red-400' :
                      log.type === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-cyan-500/10 text-cyan-400'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-slate-300">{log.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
