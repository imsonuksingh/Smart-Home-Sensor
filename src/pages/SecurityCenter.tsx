import React from 'react';
import { motion } from 'framer-motion';
import { useMockData } from '../context/MockDataContext';
import { Shield, AlertTriangle, Flame, Droplet, DoorOpen, Bell } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

const SecuritySensor: React.FC<{ title: string; icon: LucideIcon; status: boolean; value: string }> = ({ title, icon: Icon, status, value }) => (
  <div className={`glass rounded-lg sm:rounded-xl p-3 sm:p-4 ${status ? 'border-red-500/30' : ''} hover:scale-105 transition-transform`}>
    <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
      <Icon className={`w-4 sm:w-5 h-4 sm:h-5 ${status ? 'text-red-400' : 'text-green-400'}`} />
      <h4 className="font-medium text-xs sm:text-sm text-white truncate">{title}</h4>
    </div>
    <p className={`text-base sm:text-lg font-bold ${status ? 'text-red-400' : 'text-green-400'}`}>{value}</p>
  </div>
);

const SecurityCenter: React.FC = () => {
  const { sensorData, alerts } = useMockData();

  const securityStatus = sensorData.flame ? 'danger' : sensorData.motion || sensorData.door ? 'warning' : 'safe';

  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="glass rounded-lg sm:rounded-2xl p-4 sm:p-8 text-center"
      >
        <div className={`inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-full mb-3 sm:mb-4 ${
          securityStatus === 'safe' ? 'bg-green-500/20' : securityStatus === 'warning' ? 'bg-yellow-500/20' : 'bg-red-500/20'
        }`}>
          <Shield className={`w-8 sm:w-10 h-8 sm:h-10 ${securityStatus === 'safe' ? 'text-green-400' : securityStatus === 'warning' ? 'text-yellow-400' : 'text-red-400'}`} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Security Status: {securityStatus.toUpperCase()}</h2>
        <p className="text-sm sm:text-base text-blue-200">All sensors monitored • Last check: just now</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
        <SecuritySensor title="Motion Detection" icon={AlertTriangle} status={sensorData.motion} value={sensorData.motion ? 'Detected' : 'Clear'} />
        <SecuritySensor title="Door Sensor" icon={DoorOpen} status={sensorData.door} value={sensorData.door ? 'Open' : 'Closed'} />
        <SecuritySensor title="Fire Detection" icon={Flame} status={sensorData.flame} value={sensorData.flame ? 'ALERT!' : 'Normal'} />
        <SecuritySensor title="Gas Sensor" icon={Bell} status={sensorData.gas > 20} value={`${sensorData.gas}%`} />
        <SecuritySensor title="Water Leak" icon={Droplet} status={sensorData.waterLeakage} value={sensorData.waterLeakage ? 'Leak Detected' : 'Normal'} />
      </div>

      <div className="glass rounded-lg sm:rounded-2xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-white">Recent Alerts</h3>
        <div className="space-y-2 sm:space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className="flex items-center space-x-2 sm:space-x-4 p-2 sm:p-4 glass rounded-lg sm:rounded-xl">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${alert.level === 'danger' ? 'bg-red-400 animate-pulse' : alert.level === 'warning' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs sm:text-sm text-white truncate">{alert.message}</p>
                <p className="text-xs text-blue-200 truncate">{alert.location}</p>
              </div>
              <span className="text-xs text-blue-100 flex-shrink-0">{new Date().toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;