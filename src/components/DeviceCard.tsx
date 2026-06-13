import React from 'react';
import { motion } from 'framer-motion';

interface DeviceCardProps {
  device: {
    id: string;
    name: string;
    type: string;
    status: 'on' | 'off';
    value?: number;
  };
  fullControl?: boolean;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, fullControl }) => {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'light': return '💡';
      case 'fan': return '🌀';
      case 'ac': return '❄️';
      case 'tv': return '📺';
      case 'plug': return '🔌';
      case 'pump': return '💧';
      case 'heater': return '🔥';
      case 'rgb': return '🌈';
      default: return '📱';
    }
  };

  return (
    <div className="glass rounded-lg sm:rounded-xl p-2 sm:p-4 hover:scale-105 transition-transform cursor-pointer group">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-xl sm:text-2xl">{getDeviceIcon(device.type)}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${device.status === 'on' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-200'}`}>
          {device.status.toUpperCase()}
        </span>
      </div>
      <h4 className="font-medium text-xs sm:text-sm mb-2 text-white truncate group-hover:text-blue-300 transition-colors">{device.name}</h4>
      {fullControl && device.type === 'light' && (
        <div className="space-y-2 mt-3">
          <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
<motion.div
               className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
               initial={{ width: 0 }}
               animate={{ width: `${device.value}%` }}
               transition={{ duration: 0.5 }}
             />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-blue-200">Brightness: {Math.round(device.value || 0)}%</span>
          </div>
        </div>
      )}
      {fullControl && device.type === 'ac' && (
        <p className="text-sm text-white mt-2">Temp: {device.value}°C</p>
      )}
    </div>
  );
};

export default DeviceCard;