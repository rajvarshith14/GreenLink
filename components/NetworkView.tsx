
import React, { useState, useEffect } from 'react';

interface Partner {
  id: string;
  name: string;
  type: 'TECHNICIAN' | 'RECYCLER';
  location: string;
  rating: number;
  activeJobs: number;
  status: string;
  license: string;
  specialties: string[];
  impact: string;
  distance?: number; 
  estArrival?: string; 
}

const NetworkView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'TECHNICIAN' | 'RECYCLER' | 'NEARBY'>('ALL');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [contactingPartner, setContactingPartner] = useState<Partner | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [connectionSuccess, setConnectionSuccess] = useState<string | null>(null);

  const [partners, setPartners] = useState<Partner[]>([
    { 
      id: '1', name: 'EcoFix Hub', type: 'TECHNICIAN', location: 'Hyderabad, TS', rating: 4.9, activeJobs: 124, status: 'Active',
      license: 'TS-EW-TECH-882', specialties: ['Laptop Logic Boards', 'Smartphone Recovery'], impact: '1.2 Tons'
    },
    { 
      id: '2', name: 'Zenith Recycling', type: 'RECYCLER', location: 'Warangal, TS', rating: 4.7, activeJobs: 842, status: 'Active',
      license: 'TS-EW-RECY-441', specialties: ['Lithium-Ion Neutralization', 'Gold Reclamation'], impact: '8.4 Tons'
    },
    { 
      id: '3', name: 'SmartCare Labs', type: 'TECHNICIAN', location: 'Gachibowli, TS', rating: 4.8, activeJobs: 315, status: 'High Demand',
      license: 'TS-EW-TECH-109', specialties: ['Data Sanitization', 'Tablet Micro-soldering'], impact: '0.9 Tons'
    },
    { 
      id: '4', name: 'GreenCycle India', type: 'RECYCLER', location: 'Cyberabad, TS', rating: 5.0, activeJobs: 1204, status: 'Active',
      license: 'TS-EW-RECY-001', specialties: ['Industrial E-Waste', 'Corporate Decommissioning'], impact: '42.5 Tons'
    },
    { 
      id: '5', name: 'Precision Tech', type: 'TECHNICIAN', location: 'Nizamabad, TS', rating: 4.6, activeJobs: 95, status: 'Active',
      license: 'TS-EW-TECH-652', specialties: ['Audio Equipment', 'Home Appliances'], impact: '0.4 Tons'
    },
  ]);

  const handleExploreNearby = () => {
    setIsScanning(true);
    setScanResult(null);
    
    // Simulate real geolocation and node matching
    navigator.geolocation.getCurrentPosition(
      () => finalizeScan(),
      () => finalizeScan()
    );
  };

  const finalizeScan = () => {
    setTimeout(() => {
      setIsScanning(false);
      const updatedPartners = partners.map((p, idx) => ({
        ...p,
        distance: idx < 3 ? parseFloat((Math.random() * 5 + 0.5).toFixed(1)) : undefined,
        estArrival: idx < 3 ? `${Math.floor(Math.random() * 40 + 20)} mins` : undefined
      }));
      setPartners(updatedPartners);
      setScanResult("Cluster match successful. 3 Certified Nodes are ready for immediate dispatch.");
      setActiveFilter('NEARBY'); 
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setIsSendingMessage(true);
    setTimeout(() => {
      setIsSendingMessage(false);
      setConnectionSuccess(`Secure message transmitted to ${contactingPartner?.name}.`);
      setContactingPartner(null);
      setMessageText('');
      setTimeout(() => setConnectionSuccess(null), 4000);
    }, 2000);
  };

  const filteredPartners = activeFilter === 'ALL' 
    ? partners 
    : activeFilter === 'NEARBY'
    ? partners.filter(p => p.distance !== undefined)
    : partners.filter(p => p.type === activeFilter);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <header className="text-center space-y-4 max-w-3xl mx-auto pt-8">
        <div className="inline-flex items-center gap-3 bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-100 mb-2 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse"></span>
          National Grid Authorization Active
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Ecosystem Directory</h1>
        <p className="text-slate-500 font-medium text-lg leading-relaxed">Connect with state-authorized technicians and certified industrial recyclers within the National Circular Economy Grid.</p>
      </header>

      {/* INTERACTIVE SCANNER SECTION */}
      <section className="relative h-[480px] bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[30rem] h-[30rem] border-4 border-emerald-500/20 rounded-full animate-ping"></div>
             <div className="absolute w-[20rem] h-[20rem] border-2 border-emerald-400/10 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-[3.5rem] text-center max-w-lg shadow-2xl animate-in zoom-in-95 duration-500">
             <div className="w-20 h-20 bg-emerald-500/20 rounded-[1.5rem] mx-auto mb-8 flex items-center justify-center text-3xl">
               {isScanning ? '🛰️' : '📡'}
             </div>
             <h3 className="text-white text-3xl font-black mb-4 tracking-tight uppercase italic">
               {isScanning ? 'Syncing Satellite Data' : activeFilter === 'NEARBY' ? 'Grid Nodes Located' : 'Nearby Search'}
             </h3>
             <p className="text-blue-100/60 text-base font-medium mb-10 leading-relaxed">
               {isScanning 
                 ? 'Performing multi-spectral node mapping and cryptographic handshake with regional technician clusters.' 
                 : scanResult || 'Identify state-certified hardware specialists and recycling nodes within your immediate vicinity for zero-latency logistics.'}
             </p>
             <button 
               onClick={handleExploreNearby}
               disabled={isScanning}
               className={`w-full py-5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 ${
                 isScanning ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-900 hover:bg-emerald-400'
               }`}
             >
               {isScanning && <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
               {isScanning ? 'Mapping Grid...' : activeFilter === 'NEARBY' ? 'Recalibrate Scan' : 'Identify Nearby Nodes'}
             </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-10 flex gap-6">
           <div className="flex items-center gap-3 bg-slate-800/60 backdrop-blur px-5 py-3 rounded-2xl border border-white/10 shadow-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Technician Feed</span>
           </div>
           <div className="flex items-center gap-3 bg-slate-800/60 backdrop-blur px-5 py-3 rounded-2xl border border-white/10 shadow-xl">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Recycler Feed</span>
           </div>
        </div>
      </section>

      {/* DIRECTORY LISTING */}
      <section className="space-y-10" id="directory">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 border-b border-slate-200 pb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Impact Partners</h2>
            {activeFilter === 'NEARBY' && (
              <p className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Geographic Proximity Filter
              </p>
            )}
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-[1.5rem] border border-slate-200 overflow-x-auto max-w-full">
            {['ALL', 'NEARBY', 'TECHNICIAN', 'RECYCLER'].map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f as any)}
                className={`px-8 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeFilter === f ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {f === 'ALL' ? 'Total Grid' : f === 'NEARBY' ? 'Nearby' : f === 'TECHNICIAN' ? 'Technicians' : 'Recyclers'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPartners.length === 0 ? (
            <div className="col-span-full py-32 text-center space-y-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem]">
              <div className="text-6xl">🔍</div>
              <p className="text-slate-400 font-black uppercase tracking-[0.3em]">No authenticated nodes found in current view.</p>
              <button onClick={() => setActiveFilter('ALL')} className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors">Reset Directory View</button>
            </div>
          ) : filteredPartners.map(partner => (
            <div key={partner.id} className={`bg-white border-2 p-10 rounded-[3rem] hover:shadow-2xl transition-all group flex flex-col h-full animate-in slide-in-from-bottom-6 duration-500 ${partner.distance ? 'border-emerald-500/30 shadow-2xl shadow-emerald-500/5' : 'border-slate-100'}`}>
              <div className="flex justify-between items-start mb-8">
                <div className="flex flex-col gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xl border-4 border-white transition-transform group-hover:rotate-6 ${partner.type === 'TECHNICIAN' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}`}>
                    {partner.type === 'TECHNICIAN' ? '⚡' : '🛡️'}
                  </div>
                  {partner.distance && (
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-[0.15em] border border-emerald-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      {partner.distance} KM AWAY
                    </span>
                  )}
                </div>
                <div className="text-right space-y-1">
                  <div className="text-amber-500 text-sm font-black tracking-widest flex items-center justify-end gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    {partner.rating}
                  </div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{partner.location}</p>
                </div>
              </div>
              
              <div className="flex-grow space-y-4 mb-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-emerald-600 transition-colors">{partner.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{partner.type} • AUTHENTICATED</p>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-1">
                   {partner.specialties.map((spec, i) => (
                     <span key={i} className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider border ${partner.type === 'TECHNICIAN' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                       {spec}
                     </span>
                   ))}
                </div>

                {partner.estArrival && (
                   <div className="mt-4 p-5 bg-emerald-50 rounded-[1.5rem] border border-emerald-100 flex items-center justify-between shadow-inner">
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Est. Response</span>
                      <span className="text-sm font-black text-emerald-600">{partner.estArrival}</span>
                   </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setSelectedPartner(partner)}
                  className="py-4 border-2 border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                >
                  Dossier
                </button>
                <button 
                  onClick={() => setContactingPartner(partner)}
                  className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95 ${partner.distance ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white shadow-emerald-500/20 hover:scale-105' : 'bg-slate-900 text-white shadow-slate-900/10 hover:bg-slate-800'}`}
                >
                  {partner.distance ? 'Secure Link' : 'Contact Node'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT MODAL */}
      {contactingPartner && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl animate-in fade-in">
           <div className="bg-white rounded-[3.5rem] shadow-2xl w-full max-w-xl p-0 overflow-hidden animate-in zoom-in-95 border border-white/20">
              <div className="bg-slate-900 p-12 space-y-2 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                   <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                 </div>
                 <h2 className="text-3xl font-black tracking-tight leading-none uppercase italic">Transmit Message</h2>
                 <p className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em]">Authorized Communication Channel with {contactingPartner.name}</p>
                 <button 
                  onClick={() => setContactingPartner(null)} 
                  className="absolute top-12 right-12 p-3 bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-all border border-white/10"
                 >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>
              <div className="p-12 space-y-8">
                 <div className="space-y-4">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Lifecycle Inquiry</label>
                    <textarea 
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Specify your device category and issue for the technician..."
                      className="w-full h-40 bg-slate-50 border border-slate-200 rounded-[2rem] p-8 text-base font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all resize-none shadow-inner"
                    ></textarea>
                 </div>
                 <div className="flex gap-4">
                    <button 
                       disabled={isSendingMessage || !messageText.trim()}
                       onClick={handleSendMessage}
                       className="flex-grow py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all shadow-2xl active:scale-95 disabled:opacity-50"
                    >
                       {isSendingMessage ? 'Transmitting Data...' : 'Broadcast to Node'}
                    </button>
                    <button 
                       onClick={() => setContactingPartner(null)}
                       className="px-10 py-5 border-2 border-slate-100 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-50 transition-all"
                    >
                       Abort
                    </button>
                 </div>
                 <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">Messages are monitored for circular economy compliance.</p>
              </div>
           </div>
        </div>
      )}

      {/* CONNECTION SUCCESS TOAST */}
      {connectionSuccess && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[3000] animate-in slide-in-from-bottom-10">
           <div className="bg-slate-900 border border-emerald-500/50 text-white px-10 py-5 rounded-[2.5rem] shadow-2xl shadow-emerald-600/30 flex items-center gap-5">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/20">✨</div>
              <div>
                 <p className="font-black text-base uppercase tracking-tight">Transmission Complete</p>
                 <p className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.15em]">{connectionSuccess}</p>
              </div>
           </div>
        </div>
      )}

      {/* PARTNER DOSSIER MODAL */}
      {selectedPartner && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-900/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[4rem] shadow-2xl w-full max-w-3xl p-0 overflow-hidden animate-in zoom-in-95 duration-300 relative border border-white/20">
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-14 text-white relative">
               <div className="absolute top-0 right-0 p-14 opacity-5 pointer-events-none">
                  <svg className="w-56 h-56" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2zm0-6h2v4h-2z"/></svg>
               </div>
               <div className="flex justify-between items-start relative z-10">
                 <div className="flex items-center gap-10">
                   <div className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl border-4 border-white/20 ${selectedPartner.type === 'TECHNICIAN' ? 'bg-emerald-500' : 'bg-blue-500'}`}>
                     {selectedPartner.type === 'TECHNICIAN' ? '⚡' : '🛡️'}
                   </div>
                   <div className="space-y-3">
                      <div className="flex items-center gap-4">
                         <h2 className="text-4xl font-black tracking-tighter leading-none italic uppercase">{selectedPartner.name}</h2>
                         <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-xl border-2 border-white">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                         </div>
                      </div>
                      <p className="text-[11px] font-black uppercase text-emerald-400 tracking-[0.4em]">Government Certified Node • {selectedPartner.type}</p>
                   </div>
                 </div>
                 <button onClick={() => setSelectedPartner(null)} className="p-4 bg-white/10 rounded-2xl text-white hover:bg-white/20 transition-all border border-white/10">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
               </div>
            </div>

            <div className="p-16 space-y-12">
               <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                     <div className="space-y-3">
                       <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em]">Authorized License</label>
                       <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner group">
                          <p className="font-mono text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                             {selectedPartner.license}
                             <svg className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          </p>
                       </div>
                     </div>
                     <div className="space-y-3">
                       <label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.3em]">Operational Specialties</label>
                       <div className="flex flex-wrap gap-3">
                          {selectedPartner.specialties.map((s, i) => (
                            <span key={i} className="px-5 py-2.5 bg-blue-50 text-blue-800 text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-100 shadow-sm">{s}</span>
                          ))}
                       </div>
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative group overflow-hidden">
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                        <p className="text-[10px] font-black uppercase text-emerald-400 tracking-[0.3em] mb-6">Net Recovery Statistics</p>
                        <div className="space-y-6 relative z-10">
                           <div className="flex justify-between items-end">
                              <span className="text-sm font-bold opacity-60">Materials Diverted</span>
                              <span className="text-4xl font-black tracking-tighter text-white">{selectedPartner.impact}</span>
                           </div>
                           <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full bg-emerald-500 w-[94%] shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                           </div>
                           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                              <span className="text-white/40">Efficiency Rank</span>
                              <span className="text-emerald-400">94.2% Verified</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="pt-4 flex gap-6">
                  <button 
                    onClick={() => { setSelectedPartner(null); setContactingPartner(selectedPartner); }}
                    className="flex-grow py-6 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-emerald-600 transition-all shadow-2xl active:scale-95"
                  >
                    Open Secure Link
                  </button>
                  <button className="px-12 py-6 border-2 border-slate-100 text-slate-900 rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-50 transition-all active:scale-95">
                    Download Full Audit Dossier
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* REGIONAL GRID METRICS */}
      <section className="bg-white border-2 border-slate-100 rounded-[3.5rem] p-12 grid md:grid-cols-3 gap-16 text-center shadow-sm">
         <div className="space-y-3">
            <h4 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">1,204</h4>
            <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.25em]">Authorized Technicians</p>
         </div>
         <div className="space-y-3 md:border-x-2 border-slate-100">
            <h4 className="text-5xl font-black text-emerald-600 tracking-tighter leading-none italic uppercase">582</h4>
            <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.25em]">Certified Recyclers</p>
         </div>
         <div className="space-y-3">
            <h4 className="text-5xl font-black text-blue-600 tracking-tighter leading-none italic uppercase">14.2K</h4>
            <p className="text-[11px] font-black uppercase text-slate-400 tracking-[0.25em]">Active Recovery Nodes</p>
         </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default NetworkView;
