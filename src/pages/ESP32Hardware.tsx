import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, CircuitBoard, Wifi } from 'lucide-react';

const ESP32Hardware: React.FC = () => {
  const microcontrollers = [
    { id: 1, name: 'ESP32 Dev Board', status: 'connected', lastSync: '2 min ago', firmware: 'v2.3.1' },
    { id: 2, name: 'Arduino Uno', status: 'connected', lastSync: '5 min ago', firmware: 'v1.8.2' },
  ];

  const sensors = [
    { id: 1, name: 'DHT11/DHT22', type: 'Temperature/Humidity', status: 'active' },
    { id: 2, name: 'MQ2 Gas Sensor', type: 'Gas Detection', status: 'active' },
    { id: 3, name: 'Flame Sensor', type: 'Fire Detection', status: 'active' },
    { id: 4, name: 'PIR Motion Sensor', type: 'Motion Detection', status: 'active' },
    { id: 5, name: 'LDR Sensor', type: 'Light Detection', status: 'inactive' },
    { id: 6, name: 'Ultrasonic Sensor', type: 'Distance', status: 'active' },
    { id: 7, name: 'Water Sensor', type: 'Water Level', status: 'active' },
    { id: 8, name: 'Smoke Sensor', type: 'Smoke Detection', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
          <Cpu className="w-5 h-5 mr-2 text-blue-400" />
          Microcontrollers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {microcontrollers.map((mc, index) => (
            <motion.div
              key={mc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-dark rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <CircuitBoard className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium">{mc.name}</h4>
                </div>
                <span className={`w-3 h-3 rounded-full ${mc.status === 'connected' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-blue-200">Last Sync: {mc.lastSync}</p>
                <p className="text-blue-200">Firmware: {mc.firmware}</p>
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-blue-400" />
                  <span>WiFi: Connected</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
          <Cpu className="w-5 h-5 mr-2 text-blue-400" />
          Sensors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sensors.map((sensor, index) => (
            <motion.div
              key={sensor.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-dark rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{sensor.name}</h4>
                <span className={`w-2 h-2 rounded-full ${sensor.status === 'active' ? 'bg-green-400' : 'bg-blue-400'}`} />
              </div>
              <p className="text-xs text-blue-200">{sensor.type}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ESP32Hardware;