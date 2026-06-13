import React from 'react';
import { motion } from 'framer-motion';
import { useMockData } from '../context/MockDataContext';
import { Home, Bed, ChefHat, Bath, Car, Flower as FlowerIcon } from 'lucide-react';

const FloorPlan: React.FC = () => {
  const { devices } = useMockData();

  const rooms = [
    { id: 1, name: 'Living Room', icon: Home, devices: devices.filter(d => ['Living Room Light', 'TV'].includes(d.name)), sensors: ['motion', 'temperature'], x: 10, y: 10 },
    { id: 2, name: 'Bedroom', icon: Bed, devices: devices.filter(d => d.name === 'Bedroom Light'), sensors: ['motion', 'humidity'], x: 70, y: 10 },
    { id: 3, name: 'Kitchen', icon: ChefHat, devices: devices.filter(d => d.name === 'Kitchen Light'), sensors: ['gas', 'smoke'], x: 10, y: 50 },
    { id: 4, name: 'Bathroom', icon: Bath, devices: [], sensors: ['water', 'leakage'], x: 70, y: 50 },
    { id: 5, name: 'Garage', icon: Car, devices: [], sensors: ['door', 'vibration'], x: 40, y: 75 },
    { id: 6, name: 'Garden', icon: FlowerIcon, devices: devices.filter(d => d.name === 'Garden Light'), sensors: [], x: 90, y: 75 },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Home Floor Plan</h3>
      <div className="relative h-96 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full max-w-lg relative">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute glass-dark rounded-lg p-3 cursor-pointer hover:scale-110 transition-transform"
                style={{ left: `${room.x}%`, top: `${room.y}%` }}
              >
                <div className="flex items-center space-x-2">
                  <room.icon className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-sm">{room.name}</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  {room.devices.map(d => (
                    <span key={d.id} className={`w-2 h-2 rounded-full ${d.status === 'on' ? 'bg-green-400 animate-pulse' : 'bg-blue-400'}`} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;