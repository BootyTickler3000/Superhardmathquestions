/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, PlayCircle, Library, TrendingUp, Sparkles, Gamepad2, Sword } from 'lucide-react';
import gamesData from './data/games.json';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedGame, setSelectedGame] = useState(null);

  const games = gamesData;

  const filteredGames = useMemo(() => {
    if (activeCategory === 'All') return games;
    return games.filter(game => game.category === activeCategory);
  }, [activeCategory, games]);

  const categories = [
    { name: 'All', icon: Library },
    { name: 'Action', icon: Sword },
    { name: 'Puzzle', icon: Sparkles },
    { name: 'Sports', icon: Gamepad2 },
    { name: 'Platformer', icon: TrendingUp },
    { name: 'Sandbox', icon: Gamepad2 },
    { name: 'Strategy', icon: Sword },
  ];

  return (
    <div className="flex h-screen bg-bg overflow-hidden text-text-main">
      {/* Sidebar */}
      <aside className="w-[280px] border-r border-border p-10 flex flex-col justify-between">
        <div className="space-y-12">
          <div className="logo select-none">
            U.B.<span>G.</span>
          </div>
          
          <nav>
            <ul className="space-y-6">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center gap-4 text-xs font-semibold tracking-[2px] uppercase transition-all duration-300 group ${
                      activeCategory === cat.name ? 'text-text-main underline underline-offset-8' : 'text-text-muted hover:text-text-main'
                    }`}
                  >
                    <cat.icon size={16} className={`transition-transform duration-300 ${activeCategory === cat.name ? 'scale-110' : 'group-hover:scale-110 opacity-50'}`} />
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="text-[10px] text-text-muted leading-relaxed uppercase tracking-[1px] opacity-60">
          THE ARCHIVE / V2.4.0<br />
          LOCAL_DATABASE_LINKED<br />
          VERIFIED_CONTENT / 2024
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-15 overflow-y-auto scrollbar-hide">
        <header className="flex justify-between items-end mb-12 border-border border-b pb-8">
          <div>
            <span className="text-accent text-[10px] font-bold tracking-[2px] uppercase block mb-2">Vault Explorer</span>
            <h1 className="text-7xl font-extrabold uppercase tracking-[-3px] leading-[0.9]">
              {activeCategory === 'All' ? 'The Archive' : activeCategory}
            </h1>
          </div>
          <div className="text-right text-[11px] text-text-muted uppercase tracking-[1px] leading-relaxed">
            Total Entries: {games.length}<br />
            Filtered: {filteredGames.length}<br />
            Status: <span className="text-accent font-bold">Encrypted</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedGame(game)}
                className="bg-surface border border-border p-6 flex flex-col justify-between transition-all duration-300 hover:border-accent cursor-pointer group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] text-accent font-bold tracking-[2px] uppercase">
                      {game.category}
                    </span>
                    <span className="font-mono text-[9px] text-text-muted opacity-50 group-hover:opacity-100 transition-opacity">
                      #{game.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors leading-snug">
                    {game.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {game.description}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-between items-center pt-2 border-t border-border/20">
                  <span className="text-[9px] font-mono text-text-muted tracking-wider">REF_ID:00X{game.id.slice(1)}</span>
                  <button className="text-[10px] font-bold uppercase tracking-[1px] border border-text-main px-4 py-2 group-hover:bg-text-main group-hover:text-bg transition-all">
                    Initialize
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Game Overlay */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-md flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-border bg-surface/50">
              <div className="flex items-center gap-4">
                <PlayCircle className="text-accent" size={24} />
                <div>
                  <h2 className="text-lg font-bold uppercase tracking-tight">{selectedGame.title}</h2>
                  <p className="text-[10px] text-text-muted uppercase tracking-widest">{selectedGame.category} / SYSTEM_ACTIVE</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedGame(null)}
                className="p-3 hover:bg-white/10 rounded-full transition-colors text-text-muted hover:text-text-main"
              >
                <X size={24}/>
              </button>
            </div>
            
            <div className="flex-1 bg-black relative">
              <iframe 
                src={selectedGame.url}
                className="w-full h-full border-none"
                title={selectedGame.title}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
