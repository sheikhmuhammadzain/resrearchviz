import React from 'react';
import { Button } from '../components/Button';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="bg-black min-h-screen overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 md:pt-48 pb-32 px-6 max-w-7xl mx-auto">
        
        {/* Hero Layout: Left Text, Right Desc, Bottom Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-24 relative z-10">
          
          {/* Left: Main Title */}
          <div>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.95] tracking-tighter">
              Engineer better <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cohere-sand">research,</span> <br />
              faster.
            </h1>
          </div>

          {/* Right: Subtitle & Description */}
          <div className="md:pl-12 pb-2">
            <div className="w-12 h-[1px] bg-cohere-accent mb-8"></div>
            <p className="text-lg md:text-xl text-cohere-sand leading-relaxed mb-8 max-w-md font-light tracking-tight">
              Leverage AI to generate protein candidates, research slides, and posters. 
              More breakthroughs in fewer experiments — guided by your own experimental data.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => onNavigate('signup')} className="px-8 h-12 text-base">Start Building</Button>
                <Button variant="outline" onClick={() => onNavigate('company')} className="px-8 h-12 text-base">Learn more</Button>
            </div>
          </div>

        </div>

        {/* Bottom: Dashboard Mockup */}
        {/* Overlapping the bottom, fading into next section */}
        <div className="relative z-10 mt-12">
           {/* Glow behind the card */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cohere-accent/20 blur-[120px] rounded-full pointer-events-none"></div>

           {/* Card Container */}
           <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
              
              {/* Mockup Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#141414]">
                  <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                      </div>
                      <div className="h-4 w-[1px] bg-white/10"></div>
                      <div className="flex items-center gap-2 text-xs text-cohere-sand font-mono">
                          <span className="text-cohere-accent">research-vis</span>
                          <span>/</span>
                          <span>projects</span>
                          <span>/</span>
                          <span className="text-white">alpha-fold-analysis</span>
                      </div>
                  </div>
                  <div className="flex gap-4 text-cohere-sand">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  </div>
              </div>

              {/* Mockup Body */}
              <div className="grid grid-cols-12 min-h-[400px]">
                  
                  {/* Sidebar */}
                  <div className="col-span-3 border-r border-white/5 p-6 hidden md:block bg-[#111111]">
                      <div className="mb-8">
                          <div className="text-xs font-bold text-cohere-sand uppercase tracking-wider mb-4">Active Rounds</div>
                          <div className="space-y-2">
                              <div className="flex items-center justify-between p-2 bg-cohere-accent/10 border border-cohere-accent/20 rounded-lg text-sm text-white cursor-pointer">
                                  <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-cohere-accent rounded-full animate-pulse"></div>
                                      Round 3
                                  </div>
                                  <span className="text-xs opacity-50">Now</span>
                              </div>
                              <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg text-sm text-cohere-sand cursor-pointer transition-colors">
                                  <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                      Round 2
                                  </div>
                                  <span className="text-xs opacity-30">2h ago</span>
                              </div>
                          </div>
                      </div>
                      
                      <div>
                          <div className="text-xs font-bold text-cohere-sand uppercase tracking-wider mb-4">Generated Assets</div>
                          <div className="space-y-3">
                              {[1, 2, 3].map(i => (
                                  <div key={i} className="flex items-center gap-3 text-sm text-cohere-sand hover:text-white cursor-pointer group">
                                      <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-white/20">
                                          <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                      </div>
                                      <span>Protein_Seq_{i}.pdf</span>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="col-span-12 md:col-span-9 p-8 bg-[#0F0F0F]">
                      <div className="flex justify-between items-center mb-8">
                          <div>
                              <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Analysis in Progress</h2>
                              <p className="text-sm text-cohere-sand">Gemini 3.0 Pro is synthesizing results from 142 papers.</p>
                          </div>
                          <div className="flex gap-3">
                              <span className="px-3 py-1 rounded-full bg-cohere-accent/10 text-cohere-accent border border-cohere-accent/20 text-xs font-medium flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cohere-accent animate-pulse"></span> Processing
                              </span>
                              <span className="px-3 py-1 rounded-full bg-white/5 text-cohere-sand border border-white/5 text-xs font-medium">Microplate</span>
                          </div>
                      </div>

                      {/* Visual Grid */}
                      <div className="grid grid-cols-3 gap-6">
                          {/* Large Chart */}
                          <div className="col-span-2 bg-[#141414] border border-white/5 rounded-xl p-6 h-64 relative overflow-hidden">
                              <div className="absolute inset-0 flex items-end justify-between px-6 pb-6 pt-12 gap-2 opacity-80">
                                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((h, i) => (
                                      <div key={i} className="w-full bg-gradient-to-t from-cohere-accent/50 to-blue-400/50 rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }}></div>
                                  ))}
                              </div>
                              <div className="absolute top-4 left-6 text-xs font-bold text-cohere-sand uppercase">Binding Affinity (Kd)</div>
                          </div>

                          {/* Side Stats */}
                          <div className="col-span-1 space-y-6">
                              <div className="bg-[#141414] border border-white/5 rounded-xl p-5">
                                  <div className="text-xs text-cohere-sand mb-2">Success Rate</div>
                                  <div className="text-3xl font-mono font-bold text-white">94.2%</div>
                                  <div className="text-xs text-green-500 mt-1">+4.5% vs last round</div>
                              </div>
                              <div className="bg-[#141414] border border-white/5 rounded-xl p-5">
                                  <div className="text-xs text-cohere-sand mb-2">Tokens Used</div>
                                  <div className="text-3xl font-mono font-bold text-white">1.2M</div>
                                  <div className="text-xs text-cohere-sand mt-1">Budget: 2.0M</div>
                              </div>
                          </div>
                      </div>
                  </div>

              </div>
           </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-10">
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full opacity-50"></div>
            <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full opacity-30"></div>
        </div>

      </section>

      {/* LOGO STRIP */}
      <section className="py-12 border-y border-white/5 bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6 text-center">
              <p className="text-sm text-cohere-sand mb-8 font-medium">Trusted by industry leaders and developers worldwide</p>
              <div className="flex flex-wrap justify-center gap-16 md:gap-24 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                  {['Pfizer', 'Novartis', 'Genentech', 'Merck', 'Amgen'].map(brand => (
                      <div key={brand} className="text-xl font-bold font-sans tracking-tight text-white flex items-center gap-2">
                          <div className="w-6 h-6 bg-current rounded-sm"></div> {brand}
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* FEATURES */}
      <section className="py-32 px-6 bg-black relative">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">Safe. Flexible. Built for science.</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <Feature 
                    title="Security"
                    desc="Ensure privacy and compliance with multi-layered protection, access controls, and industry-certified security standards."
                    icon={
                        <svg className="w-12 h-12 text-white mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    }
                  />
                  <Feature 
                    title="Deployment"
                    desc="Secure your data by deploying within a dedicated virtual private cloud (VPC) environment or on-premises, air-gapped behind your firewall."
                    icon={
                        <svg className="w-12 h-12 text-white mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                    }
                  />
                  <Feature 
                    title="Customization"
                    desc="Train our models on your proprietary data and partner with us to create unique AI solutions that fit your use cases."
                    icon={
                        <svg className="w-12 h-12 text-white mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    }
                  />
              </div>
          </div>
      </section>

    </div>
  );
};

const Feature = ({ title, desc, icon }: { title: string, desc: string, icon: React.ReactNode }) => (
    <div className="group">
        <div className="mb-4 group-hover:scale-110 transition-transform duration-500 origin-left">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-cohere-sand leading-relaxed text-lg font-light mb-6">{desc}</p>
        <div className="flex items-center text-white font-semibold group-hover:text-cohere-accent transition-colors cursor-pointer tracking-tight">
            Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </div>
    </div>
);