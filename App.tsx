
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Search, Globe, ChevronRight, ChevronLeft, MapPin, 
  Calendar, Plane, Train, Bus, Car, Hotel, Users, Instagram, Facebook, Twitter, Youtube, Play, Pause, Volume2, VolumeX 
} from 'lucide-react';
import { DESTINATIONS, EXPERIENCES, CRAFTS } from './constants';
import { generateItinerary } from './services/gemini';
import { ItineraryResponse } from './types';

// Components
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">A</div>
          <span className={`text-2xl font-serif font-bold ${isScrolled ? 'text-adriatic' : 'text-white'}`}>Incredible Albania</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          {['Destinations', 'Experiences', 'Plan Your Trip', 'Events'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className={`font-medium hover:text-red-500 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
              {item}
            </a>
          ))}
          <div className="flex items-center gap-4">
            <Search className={`w-5 h-5 cursor-pointer ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
            <Globe className={`w-5 h-5 cursor-pointer ${isScrolled ? 'text-gray-600' : 'text-white'}`} />
            <div className={`w-px h-6 bg-gray-300 mx-2`}></div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm hover:bg-red-700 transition-all shadow-lg">Login</button>
          </div>
        </div>

        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-black' : 'text-white'} /> : <Menu className={isScrolled ? 'text-black' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-in-down">
          {['Destinations', 'Experiences', 'Plan Your Trip', 'Events'].map(item => (
            <a key={item} href="#" className="text-xl font-medium text-gray-800 border-b pb-2">{item}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Photo */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 brightness-[0.6]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2500')" }}
      ></div>
      
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-6xl md:text-9xl font-serif font-bold mb-4 drop-shadow-2xl tracking-tight">Incredible Albania</h1>
        <p className="text-xl md:text-3xl font-light mb-8 max-w-2xl mx-auto italic drop-shadow-lg">"A Land of Timeless Discovery"</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-full px-8 py-4 border border-white/20 flex items-center gap-4 group hover:bg-white/20 transition-all cursor-pointer">
            <span className="text-lg font-medium">Explore National Parks</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="bg-red-600 rounded-full px-8 py-4 flex items-center gap-4 group hover:bg-red-700 transition-all cursor-pointer shadow-xl">
            <span className="text-lg font-bold">Plan Your Escape</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-10 left-10 hidden lg:flex gap-12 z-20">
        <div className="text-white">
          <p className="text-3xl font-serif font-bold">15</p>
          <p className="text-xs uppercase tracking-widest opacity-80">National Parks</p>
        </div>
        <div className="text-white">
          <p className="text-3xl font-serif font-bold">3</p>
          <p className="text-xs uppercase tracking-widest opacity-80">UNESCO Sites</p>
        </div>
        <div className="text-white">
          <p className="text-3xl font-serif font-bold">300+</p>
          <p className="text-xs uppercase tracking-widest opacity-80">Sunny Days</p>
        </div>
      </div>
    </section>
  );
};

const SectionHeader: React.FC<{ title: string, subtitle: string, color?: string }> = ({ title, subtitle, color = 'text-adriatic' }) => (
  <div className="text-center mb-16">
    <h2 className={`text-5xl md:text-7xl font-serif font-bold uppercase ${color} tracking-tight`}>{title}</h2>
    <div className="flex items-center justify-center gap-4 mt-2">
      <div className="w-12 h-px bg-gray-300"></div>
      <p className="text-gray-500 italic text-lg">{subtitle}</p>
      <div className="w-12 h-px bg-gray-300"></div>
    </div>
  </div>
);

const Destinations: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="destinations" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <SectionHeader title="Destinations" subtitle="for every bucket list" />
        
        <div className="relative group">
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div ref={scrollRef} className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar">
            {DESTINATIONS.map((dest) => (
              <div key={dest.id} className="min-w-[300px] md:min-w-[450px] snap-center relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg aspect-[4/5]">
                <img src={dest.image} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-xs text-red-500 font-bold uppercase tracking-widest mb-2 block">{dest.region} Albania</span>
                  <h3 className="text-white text-4xl font-serif font-bold mb-2">{dest.name}</h3>
                  <p className="text-white/80 line-clamp-2 text-sm mb-4">{dest.description}</p>
                  <button className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    Discover More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

const ExperienceGrid: React.FC = () => {
  return (
    <section id="experiences" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader title="Attractions" subtitle="worth a thousand stories" color="text-sky-500" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERIENCES.map(exp => (
            <div key={exp.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden group shadow-md">
              <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full text-center">
                <h4 className="text-white text-2xl font-serif font-bold mb-1 drop-shadow-lg">{exp.title}</h4>
                <p className="text-white/70 text-xs italic">{exp.tagline}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
           <button className="bg-red-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-red-700 transition-all uppercase tracking-widest text-sm">Discover More</button>
        </div>
      </div>
    </section>
  );
};

const ItineraryPlanner: React.FC = () => {
  const [region, setRegion] = useState('South');
  const [interest, setInterest] = useState('Heritage');
  const [duration, setDuration] = useState(7);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateItinerary({ region, interest, duration });
      setItinerary(result);
    } catch (e) {
      alert("Failed to connect to the AI guide. Please check your settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="plan-your-trip" className="py-24 bg-[#FFA500]/10 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]">
      <div className="container mx-auto px-6">
        <SectionHeader title="Travel Diaries" subtitle="for every passion" color="text-white" />
        
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8 md:p-12">
            <h3 className="text-3xl font-serif font-bold text-adriatic mb-6 text-center">Plan Your Albanian Adventure</h3>
            <p className="text-gray-600 mb-8 text-center">Select your preferences and our AI-powered travel expert will craft the perfect route for you.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400">Region</label>
                <select value={region} onChange={e => setRegion(e.target.value)} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-600 outline-none text-adriatic font-medium">
                  <option>North</option>
                  <option>Central</option>
                  <option>South</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400">Interests</label>
                <select value={interest} onChange={e => setInterest(e.target.value)} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-600 outline-none text-adriatic font-medium">
                  <option>Heritage</option>
                  <option>Nature</option>
                  <option>Adventure</option>
                  <option>Food</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-400">Duration (Days)</label>
                <input type="number" min="1" max="14" value={duration} onChange={e => setDuration(parseInt(e.target.value))} className="w-full border-b-2 border-gray-200 py-2 focus:border-red-600 outline-none text-adriatic font-medium" />
              </div>
            </div>

            <button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full bg-red-600 text-white py-5 rounded-xl font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400"
            >
              {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div> : 'Generate Custom Itinerary'}
            </button>
          </div>

          {itinerary && (
            <div className="bg-gray-50 p-8 md:p-12 border-t border-gray-200 animate-fade-in">
              <h4 className="text-2xl font-serif font-bold text-adriatic mb-6">{itinerary.title}</h4>
              <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-red-200">
                {itinerary.days.map((day, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                      {day.day}
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">{day.location}</p>
                      <p className="text-gray-800 leading-relaxed">{day.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 bg-adriatic text-white p-6 rounded-2xl">
                <h5 className="font-bold mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-red-400" />
                  Local Pro-Tips
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {itinerary.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm opacity-90 flex items-start gap-2">
                      <span className="text-red-400">•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const CraftSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader title="Exquisite Crafts" subtitle="of timeless tradition" color="text-red-700" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CRAFTS.map((craft, idx) => (
            <div key={idx} className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group">
              <div className="aspect-square overflow-hidden">
                <img src={craft.image} alt={craft.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-red-600 uppercase mb-1">{craft.region}</p>
                <h4 className="text-xl font-serif font-bold text-gray-900">{craft.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GetStartedWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Flights');
  
  const tabs = [
    { name: 'Flights', icon: Plane },
    { name: 'Trains', icon: Train },
    { name: 'Buses', icon: Bus },
    { name: 'Cabs', icon: Car },
    { name: 'Hotels', icon: Hotel },
    { name: 'Guides', icon: Users }
  ];

  return (
    <section className="py-24 bg-adriatic relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=2000')] bg-cover bg-center"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-white text-xl font-serif italic mb-2">Inspired?</p>
          <h2 className="text-6xl font-serif font-bold text-white uppercase tracking-tighter">Get Started</h2>
        </div>

        <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-4 shadow-2xl border border-white/20">
          <div className="flex flex-wrap items-center justify-between border-b border-white/20 mb-8">
            {tabs.map(tab => (
              <button 
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex-1 flex items-center justify-center gap-2 py-6 px-4 font-bold transition-all ${activeTab === tab.name ? 'text-red-500 border-b-2 border-red-500 bg-white/5' : 'text-white hover:bg-white/5'}`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="p-4 space-y-8">
             <div className="flex gap-4 text-white text-sm mb-4">
               <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="trip" defaultChecked className="accent-red-500" /> One Way</label>
               <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="trip" className="accent-red-500" /> Round Trip</label>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <div className="bg-white rounded-xl p-3 flex flex-col">
                 <label className="text-[10px] font-bold uppercase text-gray-400">From</label>
                 <input type="text" placeholder="Origin" className="outline-none py-1 text-adriatic font-medium" />
               </div>
               <div className="bg-white rounded-xl p-3 flex flex-col">
                 <label className="text-[10px] font-bold uppercase text-gray-400">To</label>
                 <input type="text" placeholder="Destination" className="outline-none py-1 text-adriatic font-medium" />
               </div>
               <div className="bg-white rounded-xl p-3 flex flex-col">
                 <label className="text-[10px] font-bold uppercase text-gray-400">Depart</label>
                 <input type="date" className="outline-none py-1 text-adriatic font-medium" />
               </div>
               <div className="bg-white rounded-xl p-3 flex flex-col">
                 <label className="text-[10px] font-bold uppercase text-gray-400">Travelers</label>
                 <select className="outline-none py-1 text-adriatic font-medium">
                   <option>1 Traveler</option>
                   <option>2 Travelers</option>
                   <option>Family</option>
                 </select>
               </div>
             </div>

             <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 text-xl">
               <Search className="w-6 h-6" /> Search {activeTab}
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Incredible Albania</h2>
            <p className="text-gray-400 leading-relaxed mb-8">Incredible Albania: A Land of Timeless Discovery. Explore the rugged north, the urban center, and the turquoise south.</p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors"><Facebook className="w-5 h-5" /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors"><Twitter className="w-5 h-5" /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors"><Instagram className="w-5 h-5" /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-red-600 transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-red-600 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Attractions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Experiences</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Festivals and Events</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medical Tourism</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-red-600 pb-2 inline-block">Plan Your Trip</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Visa Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transport & Logistics</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety & Weather</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Digital Nomad Guide</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-red-600 pb-2 inline-block">Scan to chat</h3>
            <div className="bg-white p-4 rounded-xl inline-block">
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://incredible.al" alt="QR Code" className="w-32 h-32" />
            </div>
            <p className="text-xs text-gray-500 mt-4">Download the mobile app for a better experience.</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Contact Us</a>
            <a href="#" className="hover:text-white">Help</a>
          </div>
          <p>© {new Date().getFullYear()} Ministry of Tourism, Government of Albania.</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <main>
        <Destinations />
        <ExperienceGrid />
        <ItineraryPlanner />
        <CraftSection />
        <GetStartedWidget />
      </main>
      <Footer />
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 right-10 z-50 bg-red-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-red-700 transition-all border-4 border-white"
      >
        <ChevronRight className="-rotate-90 w-6 h-6" />
      </button>

      {/* Sticky Book Your Travel side label */}
      <div className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <div className="bg-red-600 text-white px-4 py-2 font-bold uppercase tracking-widest text-xs [writing-mode:vertical-lr] rotate-180 rounded-l-md shadow-xl cursor-pointer hover:bg-red-700">
          Book Your Travel
        </div>
      </div>
    </div>
  );
};

export default App;
