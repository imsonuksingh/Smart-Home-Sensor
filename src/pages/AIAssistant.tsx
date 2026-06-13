import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingDown, AlertCircle, Send } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your SmartHome AI assistant. How can I help you today?', isBot: true },
  ]);

  const suggestions = [
    { id: 1, text: 'Energy saving tips', icon: TrendingDown },
    { id: 2, text: 'Device health analysis', icon: AlertCircle },
    { id: 3, text: 'Predictive alerts', icon: Lightbulb },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setMessages([...messages, { id: Date.now(), text: query, isBot: false }]);
    setQuery('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: 'Based on your usage patterns, I recommend turning off the living room light during daytime to save energy.', 
        isBot: true 
      }]);
    }, 1000);
  };

  return (
    <div className="glass rounded-lg sm:rounded-2xl p-3 sm:p-6 flex flex-col h-[400px] sm:h-[500px]">
      <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 mb-3 sm:mb-4">
        {messages.map(msg => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.isBot ? '' : 'justify-end'}`}
          >
            <div className={`max-w-xs text-xs sm:text-sm p-2 sm:p-4 rounded-lg sm:rounded-xl ${msg.isBot ? 'glass-dark' : 'bg-blue-500/20'}`}>
              <p className="text-white">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
          {suggestions.map(s => (
            <button key={s.id} className="flex-1 glass rounded-lg p-2 text-xs flex items-center justify-center space-x-1 hover:bg-white/10 transition-colors">
              <s.icon className="w-3 h-3 flex-shrink-0" />
              <span className="truncate hidden sm:inline">{s.text}</span>
              <span className="truncate sm:hidden">{s.text.split(' ')[0]}</span>
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-1 sm:space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-base text-white placeholder-blue-200 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button type="submit" className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-500 rounded-lg sm:rounded-xl hover:bg-cyan-600 transition-colors flex-shrink-0">
            <Send className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;