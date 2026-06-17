"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// Refined Minimalist UI Icons
const XIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const InstagramIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const GlobeIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
const MailIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;

const SUNDUS_ALL_BLOGS = [
  {
    _id: "1",
    title: "The Future of Digital Magazine Architecture",
    slug: "future-digital-magazine-architecture",
    excerpt: "How clean grids, minimalist typography, and seamless content structures are transforming reader retention in 2026.",
    category: "EDITORIAL",
    date: "Jun 08, 2026",
    img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "2",
    title: "Branding Frameworks for Luxury Grooming Spaces",
    slug: "branding-frameworks-luxury-grooming",
    excerpt: "A comprehensive executive deep dive into managing high-end barber shop networks and building premium community ecosystems.",
    category: "BUSINESS",
    date: "May 24, 2026",
    img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "3",
    title: "Aesthetic Control: The Minimalist Strategy",
    slug: "aesthetic-control-minimalist-strategy",
    excerpt: "Why cutting out visual noise is the single most powerful decision you can make for your modern digital publication platform.",
    category: "DESIGN",
    date: "Apr 12, 2026",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "4",
    title: "Curation as a Tool for Scale",
    slug: "curation-tool-scale",
    excerpt: "How modern editorial specialists organize large content repositories without sacrificing clean visual identity rules.",
    category: "STRATEGY",
    date: "Mar 29, 2026",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "5",
    title: "The Shift in Regional Barbering Cultures",
    slug: "shift-regional-barbering-cultures",
    excerpt: "A historical analysis documenting how local grooming shops transformed into luxury lifestyle lounges.",
    category: "CULTURE",
    date: "Feb 14, 2026",
    img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=600&q=80"
  }
];

export default function SundusMain() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 400;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-black antialiased px-3 py-6 md:px-8 md:py-12 selection:bg-black selection:text-white">
      
      {/* MAX WIDTH CONTAINER */}
      <div className="mx-auto max-w-7xl border border-neutral-200 bg-white rounded-3xl overflow-hidden shadow-xs">
        
        {/* ================= COMPACT HIGH FASHION EDITORIAL HERO ================= */}
        <div className="relative bg-[#F3F3F3] pt-10 px-4 md:px-8 overflow-hidden flex flex-col justify-between min-h-[420px] sm:min-h-[500px] md:min-h-[300px] lg:min-h-[500px] border-b border-neutral-200">
          
          {/* Top Info Metadata Row */}
          <div className="w-full flex items-center justify-between text-neutral-500 font-mono text-[10px] tracking-widest uppercase z-20">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>MIXPLATE MAGAZINE CEO</span>
            </div>
            <div>2026 BRAND IDENTITY</div>
          </div>

          {/* INTERLOCKING CONTENT CONTAINER - HEIGHT RESTRICTED & ITEMS ANCHORED TO BOTTOM */}
          <div className="w-full flex-1 flex flex-col items-center justify-end relative">
            
            {/* HUGE CONDENSED BACKGROUND TYPOGRAPHY */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none text-center z-0 overflow-hidden leading-none w-full">
              <span className="text-[12vw] font-black tracking-tighter text-white uppercase block select-none leading-none">
                FUTURE OF MEDIA
              </span>
            </div>

            {/* HIGH DENSITY PORTRAIT CONTAINER - STICKING AT THE VERY BOTTOM */}
            <div className="relative w-full max-w-[280px] sm:max-w-[380px] md:max-w-[460px] lg:max-w-[850px] aspect-[5/4] z-10 group flex items-end">
              <Image 
                src="https://res.cloudinary.com/dmzhgg4m1/image/upload/q_auto/f_auto/v1781034537/miss_sundus_mustaqeem_epbbdb.png" 
                alt="Sundus Mustaqeem Frontal Editorial Portrait"
                fill
                priority
                unoptimized={true}
                className="object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-[1.01]"
              />
              
              {/* CENTERED BOTTOM CAPTION - HIDDEN ON MOBILE (hidden) & VISIBLE FROM SMALL SCREENS UP (sm:block) */}
              <div className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-xl border border-neutral-200/50 py-2.5 px-6 sm:px-8 rounded-xl text-center shadow-xs max-w-max whitespace-nowrap z-20">
                <span className="text-[8px] font-mono tracking-[0.25em] text-neutral-500 block mb-0.5 uppercase">CREATIVE EXECUTIVE</span>
                <h2 className="text-xs sm:text-sm uppercase tracking-wider text-black">
                  <span className="font-bold">SUNDUS</span>{" "}<span className="font-normal">MUSTAQEEM</span>
                </h2>
              </div>
            </div>

          </div>

          {/* Social Icons Float Strip */}
          <div className="absolute bottom-4 right-4 md:right-8 flex flex-col sm:flex-row items-center gap-2 z-20">
            <a href="#" className="w-8 h-8 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all shadow-3xs"><XIcon /></a>
            <a href="#" className="w-8 h-8 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all shadow-3xs"><InstagramIcon /></a>
            <a href="#" className="w-8 h-8 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all shadow-3xs"><GlobeIcon /></a>
            <a href="#" className="w-8 h-8 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-all shadow-3xs"><MailIcon /></a>
          </div>

        </div>

        {/* ================= SECTION 2: BENTO STYLE BRIEF BLOCK ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-neutral-200 bg-white">
          <div className="lg:col-span-4 p-6 sm:p-8 md:p-12 bg-[#FAFAFA] border-b lg:border-b-0 lg:border-r border-neutral-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 block tracking-widest uppercase">POSITION FOCUS</span>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mt-2">Executive Overview</h3>
            </div>
            <div className="hidden lg:block mt-8 text-[11px] font-mono text-neutral-400">INDEX // SR_2026</div>
          </div>
          <div className="lg:col-span-8 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
            <p className="text-base sm:text-lg leading-relaxed text-neutral-800 mb-4 font-medium tracking-tight">
              Directing forward-thinking publication roadmaps, refined digital media blueprints, and continuous-line visual systems. Sundus Mustaqeem manages multi-tier networks with an uncompromised commitment to minimalist design structures and layout integrity.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-neutral-500">
              Operational tasks span across complex database migrations, platform architecture supervision, and digital curation systems configured to safely connect regional excellence with international frameworks.
            </p>
          </div>
        </div>

        {/* ================= SECTION 3: THE BLOGS SLIDER TRACK ================= */}
        <div className="border-b border-neutral-200 bg-[#FAFAFA]">
          <div className="p-6 sm:p-8 md:p-12 border-b border-neutral-200/60 flex items-center justify-between flex-wrap gap-4">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 block mb-1 tracking-wider">CURATED FEED // ARCHIVE INDEX</span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase">Recent Journal & Columns</h3>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => scrollSlider("left")} 
                className="w-10 h-10 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-black font-bold hover:bg-black hover:text-white hover:border-black transition-all shadow-3xs"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button 
                onClick={() => scrollSlider("right")} 
                className="w-10 h-10 rounded-xl border border-neutral-200 bg-white flex items-center justify-center text-black font-bold hover:bg-black hover:text-white hover:border-black transition-all shadow-3xs"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          </div>

          <div 
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 p-6 sm:p-8 md:p-12 scroll-smooth hidden-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SUNDUS_ALL_BLOGS.map((article) => (
              <div 
                key={article._id} 
                className="min-w-[280px] sm:min-w-[340px] md:min-w-[380px] max-w-[380px] snap-start border border-neutral-200 bg-white rounded-2xl p-5 flex flex-col justify-between hover:border-black hover:shadow-md transition-all duration-300 group shrink-0"
              >
                <div>
                  <div className="w-full h-44 bg-neutral-900 rounded-xl overflow-hidden relative mb-4 border border-neutral-200/60 flex items-center justify-center">
                    <Image 
                      src={article.img} 
                      alt={article.title}
                      fill
                      unoptimized={true}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03] grayscale opacity-95"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-black text-white font-mono text-[8px] font-bold uppercase px-2 py-0.5 rounded-sm z-10 tracking-wider">
                      {article.category}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-neutral-400 block mb-1">{article.date}</span>
                  <h4 className="text-base font-black tracking-tight text-black mb-2 line-clamp-2 uppercase group-hover:text-neutral-700">
                    {article.title}
                  </h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-normal line-clamp-3 mb-6">
                    {article.excerpt}
                  </p>
                </div>

                <Link 
                  href={`/blog/${article.slug}`} 
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider border border-neutral-200 bg-white rounded-lg px-4 py-2 w-max shadow-3xs hover:bg-black hover:text-white hover:border-black transition-all"
                >
                  Read Article <span>↗</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 4: EXTENDED BIOGRAPHY TIMELINE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-neutral-200 bg-white">
          <div className="lg:col-span-4 p-6 sm:p-8 md:p-14 border-b lg:border-b-0 lg:border-r border-neutral-200 bg-[#FAFAFA]">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-2">MILESTONES LOG</span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase">Operational Journey</h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              A chronological perspective on defining structural media methodologies and visual frameworks across the digital space.
            </p>
          </div>

          <div className="lg:col-span-8 p-6 sm:p-8 md:p-14 space-y-8">
            <div className="flex gap-4 sm:gap-6 items-start">
              <span className="font-mono text-xs sm:text-sm font-bold text-neutral-400 border border-neutral-200 px-2 py-1 rounded bg-[#FAFAFA]">2026</span>
              <div>
                <h4 className="text-base font-black uppercase tracking-tight text-neutral-900">Platform Scaling & Architecture</h4>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-relaxed">
                  Executing structural migrations, data-pipeline cleaning operations, and custom automated design matrices to establish an uncompromised continuous-line aesthetic.
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-6 items-start border-t border-neutral-100 pt-6">
              <span className="font-mono text-xs sm:text-sm font-bold text-neutral-400 border border-neutral-200 px-2 py-1 rounded bg-[#FAFAFA]">2025</span>
              <div>
                <h4 className="text-base font-black uppercase tracking-tight text-neutral-900">Ecosystem Integration Models</h4>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-relaxed">
                  Partnering with high-end premium network structures, organizing comprehensive digital marketing blueprints, and auditing media networks.
                </p>
              </div>
            </div>

            <div className="flex gap-4 sm:gap-6 items-start border-t border-neutral-100 pt-6">
              <span className="font-mono text-xs sm:text-sm font-bold text-neutral-400 border border-neutral-200 px-2 py-1 rounded bg-[#FAFAFA]">2024</span>
              <div>
                <h4 className="text-base font-black uppercase tracking-tight text-neutral-900">Foundational Visual Systems</h4>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1 leading-relaxed">
                  Establishing the baseline guidelines for minimalist digital layouts, creating publication structures, and prioritizing high-contrast typographic grids.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SECTION 5: STRATEGIC FOCUS MATRIX ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 bg-[#FAFAFA]">
          
          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-between min-h-[180px] bg-white hover:bg-[#FAFAFA] transition-colors duration-300">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 block mb-3">MATRIX_V1</span>
              <h4 className="text-base font-black tracking-tight uppercase mb-2">Creative Direction</h4>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Curating continuous visual layouts that eliminate background distractions, focusing intensely on crisp layouts and premium, high-contrast systems.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-between min-h-[180px] bg-white hover:bg-[#FAFAFA] transition-colors duration-300">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 block mb-3">MATRIX_V2</span>
              <h4 className="text-base font-black tracking-tight uppercase mb-2">Content Control</h4>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Auditing publication structures and managing high-traffic repository architectures to keep data clean, structured, and fast.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-between min-h-[180px] bg-white hover:bg-[#FAFAFA] transition-colors duration-300">
            <div>
              <span className="text-[10px] font-mono text-neutral-400 block mb-3">MATRIX_V3</span>
              <h4 className="text-base font-black tracking-tight uppercase mb-2">Brand Blueprinting</h4>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Developing operational roadmaps that translate complex corporate identities into clean typography and stunning, responsive digital architectures.
              </p>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-8 md:p-10 border-t border-neutral-200 text-center bg-[#FAFAFA]">
          <p className="text-xs sm:text-sm text-neutral-600 font-medium">
            Have a structural concept or editorial idea? <Link href="/page-contact" className="text-black border-b-2 border-black font-bold hover:text-neutral-700 transition-colors pb-0.5">Contact us</Link>
          </p>
          <div className="mt-4 text-[9px] text-neutral-400 font-mono uppercase tracking-wider">Sundus Mustaqeem</div>
        </div>
      </div>

      {/* Hidden Scrollbars Custom Injection rules */}
      <style jsx global>{`
        .hidden-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hidden-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}