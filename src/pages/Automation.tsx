import React from 'react';
import { motion } from 'framer-motion';
import { Sun, DoorOpen, Flame, Droplet, Zap } from 'lucide-react';

const Automation: React.FC = () => {
  const automations = [
    { id: 1, name: 'Turn ON Lights at Sunset', description: 'Automatically turn on living room lights at sunset', icon: Sun, active: true, trigger: 'Sunset' },
    { id: 2, name: 'Turn OFF AC when Window Opens', description: 'Save energy when windows are open', icon: DoorOpen, active: true, trigger: 'Window Open' },
    { id: 3, name: 'Fire Emergency Response', description: 'Turn on all lights and unlock doors during fire', icon: Flame, active: true, trigger: 'Fire Detected' },
    { id: 4, name: 'Water Leakage Protection', description: 'Turn off water pump on leak detection', icon: Droplet, active: true, trigger: 'Leak Detected' },
    { id: 5, name: 'Motion-Based Lighting', description: 'Turn on lights when motion detected at night', icon: Zap, active: false, trigger: 'Motion + Night' },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Automation Rules</h3>
      <div className="space-y-4">
        {automations.map((automation, index) => (
          <motion.div
            key={automation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-4 flex items-center justify-between hover:scale-102 transition-transform"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <automation.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium">{automation.name}</h4>
                <p className="text-sm text-blue-200">{automation.description}</p>
                <p className="text-xs text-blue-400 mt-1">Trigger: {automation.trigger}</p>
              </div>
            </div>
            <label className="relative inline-flex h-6 w-11 items-center rounded-full bg-white/10 cursor-pointer">
              <input type="checkbox" checked={automation.active} readOnly className="sr-only" />
              <span className={`inline-block h-5 w-5 rounded-full bg-white transition-transform ${automation.active ? 'translate-x-6' : 'translate-x-1'}`} />
            </label>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Automation;