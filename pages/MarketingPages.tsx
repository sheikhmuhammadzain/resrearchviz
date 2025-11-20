import React from 'react';
import { Button } from '../components/Button';

const PageHeader: React.FC<{ title: string; subtitle: string; label?: string }> = ({ title, subtitle, label }) => (
    <div className="pt-32 pb-20 px-6 text-center bg-cohere-darker relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cohere-teal/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
            {label && <span className="text-cohere-accent text-xs font-bold uppercase tracking-widest mb-4 block">{label}</span>}
            <h1 className="text-5xl md:text-7xl font-serif text-cohere-light mb-8 leading-tight">{title}</h1>
            <p className="text-xl text-cohere-light/60 font-light max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        </div>
    </div>
);

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <section className={`py-24 px-6 ${className}`}>
        <div className="max-w-6xl mx-auto">
            {children}
        </div>
    </section>
);

export const ProductsPage = () => (
    <div className="bg-cohere-darker min-h-screen">
        <PageHeader 
            title="The Research Intelligence Platform" 
            subtitle="A complete suite of tools designed to accelerate the lifecycle of scientific discovery, from hypothesis to publication."
            label="Products"
        />
        <Section className="bg-cohere-surface border-y border-cohere-light/5">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="w-12 h-12 bg-cohere-accent/10 rounded-xl flex items-center justify-center mb-6 text-cohere-accent">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                    </div>
                    <h2 className="text-4xl font-serif text-cohere-light mb-6">Synthesis Engine</h2>
                    <p className="text-cohere-light/70 text-lg leading-relaxed mb-8">
                        Our proprietary model, Gemini-2.5-Research, is fine-tuned on over 50 million academic papers. It understands the nuance of scientific methods, results, and discussions, allowing it to generate posters and slides that require minimal editing.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {['Context-aware summarization', 'Figure extraction & placement', 'Citation preservation'].map(item => (
                            <li key={item} className="flex items-center gap-3 text-cohere-light/80">
                                <span className="w-1.5 h-1.5 bg-cohere-accent rounded-full"></span>{item}
                            </li>
                        ))}
                    </ul>
                    <Button variant="outline">Explore Synthesis</Button>
                </div>
                <div className="bg-cohere-dark aspect-square rounded-2xl border border-cohere-light/10 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cohere-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="text-cohere-light/20 font-serif text-9xl select-none">Ag</div>
                </div>
            </div>
        </Section>
        <Section>
             <div className="text-center mb-16">
                <h2 className="text-3xl font-serif text-cohere-light mb-4">Built for every stage</h2>
                <p className="text-cohere-light/60">From initial literature review to final conference presentation.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: 'Literature Review', desc: 'Map millions of citations instantly to find gaps in research.' },
                    { title: 'Data Analysis', desc: 'Upload raw CSV/JSON and get preliminary visual correlations.' },
                    { title: 'Dissemination', desc: 'One-click generation of conference posters and slide decks.' }
                ].map((card, i) => (
                    <div key={i} className="p-8 bg-cohere-light/5 rounded-xl border border-cohere-light/5 hover:bg-cohere-light/10 transition-colors">
                        <h3 className="text-xl font-serif text-cohere-light mb-3">{card.title}</h3>
                        <p className="text-cohere-light/60 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    </div>
);

export const SolutionsPage = () => (
    <div className="bg-cohere-darker min-h-screen">
        <PageHeader 
            title="Accelerating Science Across Sectors" 
            subtitle="Whether you are a PhD student or an R&D director, ResearchVis scales to meet your needs."
            label="Solutions"
        />
        <Section className="bg-cohere-surface rounded-3xl my-12 border border-cohere-light/5">
             <div className="grid md:grid-cols-2 gap-12 p-12">
                 <div>
                     <h3 className="text-2xl font-serif text-cohere-light mb-4">For Academia</h3>
                     <p className="text-cohere-light/60 leading-relaxed mb-6">
                         Universities use ResearchVis to help students visualize complex concepts and faculty to prepare grant proposals faster. Our citation mapping tool ensures no prior art is missed.
                     </p>
                     <Button variant="secondary" className="text-sm">Learn about Academic License</Button>
                 </div>
                 <div className="bg-cohere-dark rounded-xl p-6 border border-cohere-light/5">
                     <div className="flex gap-4 items-center mb-4 opacity-50">
                         <div className="w-10 h-10 bg-white rounded-full"></div>
                         <div>
                             <div className="w-32 h-3 bg-white rounded mb-2"></div>
                             <div className="w-20 h-2 bg-white rounded"></div>
                         </div>
                     </div>
                     <div className="space-y-2 opacity-30">
                         <div className="w-full h-2 bg-white rounded"></div>
                         <div className="w-full h-2 bg-white rounded"></div>
                         <div className="w-2/3 h-2 bg-white rounded"></div>
                     </div>
                 </div>
             </div>
        </Section>
        <Section>
             <div className="grid md:grid-cols-3 gap-8">
                 {[
                     { title: 'BioTech & Pharma', desc: 'Accelerate drug discovery by visualizing molecular interaction networks from literature.' },
                     { title: 'Materials Science', desc: 'Synthesize property data from thousands of PDFs into actionable charts.' },
                     { title: 'Financial Research', desc: 'Map market correlations and generate executive summaries from analyst reports.' }
                 ].map((item, i) => (
                     <div key={i} className="border-l-2 border-cohere-teal pl-6 py-2">
                         <h3 className="text-xl text-cohere-light mb-2 font-serif">{item.title}</h3>
                         <p className="text-cohere-light/60 text-sm">{item.desc}</p>
                     </div>
                 ))}
             </div>
        </Section>
    </div>
);

export const PricingPage = () => (
    <div className="bg-cohere-darker min-h-screen">
        <PageHeader 
            title="Simple, Transparent Pricing" 
            subtitle="Choose the plan that fits your research needs. No hidden fees."
            label="Pricing"
        />
        <Section>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Free */}
                <div className="p-8 rounded-2xl border border-cohere-light/10 bg-cohere-surface flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-cohere-light">Researcher</h3>
                        <div className="text-3xl font-serif text-cohere-light mt-2">$0 <span className="text-sm font-sans text-cohere-light/50">/ mo</span></div>
                    </div>
                    <p className="text-sm text-cohere-light/60 mb-8">Perfect for individual students and early-stage researchers.</p>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="text-sm text-cohere-light/80 flex gap-2"><span className="text-cohere-teal">✓</span> 5 generations per month</li>
                        <li className="text-sm text-cohere-light/80 flex gap-2"><span className="text-cohere-teal">✓</span> Basic slide templates</li>
                        <li className="text-sm text-cohere-light/80 flex gap-2"><span className="text-cohere-teal">✓</span> PDF export</li>
                    </ul>
                    <Button variant="outline" className="w-full">Get Started</Button>
                </div>

                {/* Pro */}
                <div className="p-8 rounded-2xl border-2 border-cohere-accent bg-cohere-surface relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-cohere-accent/10">
                    <div className="absolute top-0 right-0 bg-cohere-accent text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">Popular</div>
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-cohere-light">Lab Pro</h3>
                        <div className="text-3xl font-serif text-cohere-light mt-2">$29 <span className="text-sm font-sans text-cohere-light/50">/ mo</span></div>
                    </div>
                    <p className="text-sm text-cohere-light/60 mb-8">For serious researchers and small teams publishing regularly.</p>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="text-sm text-cohere-light/80 flex gap-2"><span className="text-cohere-teal">✓</span> Unlimited generations</li>
                        <li className="text-sm text-cohere-light/80 flex gap-2"><span className="text-cohere-teal">✓</span> Citation Mapping</li>
                        <li className="text-sm text-cohere-light/80 flex gap-2"><span className="text-cohere-teal">✓</span> High-res Poster export</li>
                        <li className="text-sm text-cohere-light/80 flex gap-2"><span className="text-cohere-teal">✓</span> Priority support</li>
                    </ul>
                    <Button variant="primary" className="w-full">Start Free Trial</Button>
                </div>

                {/* Enterprise */}
                <div className="p-8 rounded-2xl border border-cohere-light/10 bg-cohere-surface flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-cohere-light">Institution</h3>
                        <div className="text-3xl font-serif text-cohere-light mt-2">Custom</div>
                    </div>
                    <p className="text-sm text-cohere-light/60 mb-8">For universities and R&D departments requiring security.</p>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="text-sm text-cohere-light/80 flex gap-2"><span className="text-cohere-teal">✓</span> Private Cloud Deployment</li>
                        <li className="text-sm text-cohere-light/80 flex gap-2"><span className="text-cohere-teal">✓</span> SSO & Audit Logs</li>
                        <li className="text-sm text-cohere-light/80 flex gap-2"><span className="text-cohere-teal">✓</span> Custom Templates</li>
                    </ul>
                    <Button variant="outline" className="w-full">Contact Sales</Button>
                </div>
            </div>
        </Section>
    </div>
);

export const CompanyPage = () => (
    <div className="bg-cohere-darker min-h-screen">
        <PageHeader 
            title="We are ResearchVis" 
            subtitle="Our mission is to accelerate human progress by making the world's research accessible, understandable, and actionable."
            label="Company"
        />
        <Section className="max-w-4xl">
            <div className="prose prose-invert prose-lg mx-auto text-cohere-light/80">
                <p>
                    Founded in 2024 by a team of AI researchers and designers, ResearchVis emerged from a simple frustration: the time scientists spend formatting presentations is time not spent on science.
                </p>
                <p>
                    We believe that the interface between human thought and machine intelligence is where the next great discoveries will happen. By automating the synthesis of information, we liberate researchers to think bigger.
                </p>
            </div>
        </Section>
        <Section>
            <h2 className="text-3xl font-serif text-center mb-12 text-cohere-light">Leadership</h2>
            <div className="grid md:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="text-center group">
                        <div className="w-32 h-32 mx-auto bg-cohere-light/10 rounded-full mb-4 overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                             {/* Placeholder avatar */}
                             <div className="w-full h-full bg-gradient-to-tr from-cohere-surface to-cohere-teal/50"></div>
                        </div>
                        <h3 className="text-lg font-medium text-cohere-light">Team Member</h3>
                        <p className="text-sm text-cohere-accent">Co-Founder</p>
                    </div>
                ))}
            </div>
        </Section>
    </div>
);

export const ResearchPage = () => (
    <div className="bg-cohere-darker min-h-screen">
        <PageHeader 
            title="Gemini-Powered Reasoning" 
            subtitle="How we use the latest large language models to understand scientific nuance."
            label="Our Research"
        />
        <Section className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-serif text-cohere-light mb-6">Context Window & Retrieval</h2>
                <p className="text-cohere-light/70 leading-relaxed mb-6">
                    Unlike standard LLM applications, ResearchVis utilizes a massive 1M+ token context window provided by Gemini 1.5 Pro and Flash. This allows us to ingest entire dissertations, datasets, and referenced papers simultaneously.
                </p>
                <p className="text-cohere-light/70 leading-relaxed">
                    Our retrieval augmented generation (RAG) pipeline is specialized for academic syntax, ensuring that when we summarize a method, we capture the exact parameters used.
                </p>
            </div>
            <div className="bg-cohere-surface p-8 rounded-xl border border-cohere-light/5 font-mono text-xs text-cohere-light/60">
                <div className="mb-2 text-cohere-accent">// Model Configuration</div>
                <div className="pl-4 border-l border-cohere-light/10 space-y-2">
                    <p>model: "gemini-2.5-flash"</p>
                    <p>temperature: 0.2</p>
                    <p>topK: 40</p>
                    <p>safetySettings: BLOCK_NONE</p>
                    <p>systemInstruction: "You are a PhD-level research assistant..."</p>
                </div>
            </div>
        </Section>
    </div>
);

export const ResourcesPage = ({ type }: { type: string }) => (
    <div className="bg-cohere-darker min-h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="w-20 h-20 bg-cohere-light/5 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-cohere-light/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <h1 className="text-4xl font-serif text-cohere-light mb-4 capitalize">{type}</h1>
        <p className="text-cohere-light/60 max-w-md mb-8">This resource section is currently under construction. Check back soon for detailed guides and documentation.</p>
        <Button onClick={() => window.location.reload()}>Return Home</Button>
    </div>
);

export const LegalPage = ({ type }: { type: string }) => (
     <div className="bg-cohere-darker min-h-screen">
        <div className="max-w-3xl mx-auto py-24 px-6">
            <h1 className="text-4xl font-serif text-cohere-light mb-8 capitalize">{type}</h1>
            <div className="prose prose-invert prose-sm text-cohere-light/70">
                <p>Last updated: October 24, 2025</p>
                <h3>1. Introduction</h3>
                <p>Welcome to ResearchVis. By accessing or using our website and services, you agree to be bound by these terms.</p>
                <h3>2. Data Privacy</h3>
                <p>We take your research confidentiality seriously. Data uploaded to ResearchVis is processed in volatile memory and is not used to train our public models without explicit opt-in.</p>
                <h3>3. Usage Rights</h3>
                <p>You retain full ownership of all content generated using our platform.</p>
                <p className="italic opacity-50">[... content truncated for demo ...]</p>
            </div>
        </div>
    </div>
);