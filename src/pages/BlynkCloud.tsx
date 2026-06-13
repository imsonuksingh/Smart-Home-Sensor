import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Wifi, RefreshCw, Database, Server } from 'lucide-react';

const BlynkCloud: React.FC = () => {
  const virtualPins = [
    { pin: 'V1', name: 'Temperature', value: '22.5°C' },
    { pin: 'V2', name: 'Humidity', value: '45%' },
    { pin: 'V3', name: 'Relay Control', value: 'ON' },
    { pin: 'V4', name: 'Motion Sensor', value: 'Clear' },
    { pin: 'V5', name: 'Gas Sensor', value: '12%' },
  ];

  const apiInfo = {
    server: 'blynk.cloud',
    port: '443',
    protocol: 'HTTPS',
    lastSync: 'Just now',
    dataSent: '1.2 MB',
    dataReceived: '856 KB',
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mx-auto mb-4">
          <Cloud className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-white">Blynk Cloud Connected</h2>
        <p className="text-blue-200">Device ID: ESP32-Home-001 • {apiInfo.lastSync}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
            <Database className="w-5 h-5 mr-2 text-blue-400" />
            Virtual Pins
          </h3>
          <div className="space-y-3">
            {virtualPins.map((pin, index) => (
              <motion.div
                key={pin.pin}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-lg p-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{pin.name}</p>
                  <p className="text-xs text-blue-200">Pin {pin.pin}</p>
                </div>
                <span className="text-blue-400 font-mono">{pin.value}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
            <Server className="w-5 h-5 mr-2 text-blue-400" />
            API Information
          </h3>
          <div className="space-y-4">
            <div className="glass-dark rounded-lg p-4">
              <p className="text-sm text-blue-200 mb-2">Server: {apiInfo.server}:{apiInfo.port}</p>
              <p className="text-sm text-blue-200 mb-2">Protocol: {apiInfo.protocol}</p>
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-green-400 animate-pulse" />
                <span className="text-green-400">Connected</span>
              </div>
            </div>
            <div className="glass-dark rounded-lg p-4">
              <p className="text-sm text-blue-200">Data Sent: {apiInfo.dataSent}</p>
              <p className="text-sm text-blue-200">Data Received: {apiInfo.dataReceived}</p>
              <div className="flex items-center space-x-2 mt-2">
                <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                <span className="text-xs">Syncing...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlynkCloud;