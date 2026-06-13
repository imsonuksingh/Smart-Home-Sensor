import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMockData } from './context/MockDataContext';
import SensorCard from './components/SensorCard';
import DeviceCard from './components/DeviceCard';
import { Menu, X, Home, Thermometer, Droplet, Wind, Shield, Activity, Zap, Bell, Clock, User, LogOut } from 'lucide-react';
import Analytics from './pages/Analytics';
import SecurityCenter from './pages/SecurityCenter';
import Automation from './pages/Automation';
import ESP32Hardware from './pages/ESP32Hardware';
import BlynkCloud from './pages/BlynkCloud';
import Reports from './pages/Reports';
import FloorPlan from './pages/FloorPlan';
import AIAssistant from './pages/AIAssistant';
import Login from './pages/Login';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (_email: string, _password: string) => {
    setUserEmail(_email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard userEmail={userEmail} onLogout={handleLogout} />;
};

const Dashboard: React.FC<{ userEmail: string; onLogout: () => void }> = ({ userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'sensors', label: 'Sensors', icon: Thermometer },
    { id: 'devices', label: 'Devices', icon: Zap },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'automation', label: 'Automation', icon: Activity },
    { id: 'floorplan', label: 'Floor Plan', icon: Activity },
    { id: 'esp32', label: 'ESP32 Hardware', icon: Activity },
    { id: 'blynk', label: 'Blynk Cloud', icon: Activity },
    { id: 'reports', label: 'Reports', icon: Activity },
    { id: 'ai', label: 'AI Assistant', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Activity },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <OverviewDashboard />;
      case 'sensors': return <SensorMonitoring />;
      case 'devices': return <DeviceControl />;
      case 'analytics': return <Analytics />;
      case 'security': return <SecurityCenter />;
      case 'automation': return <Automation />;
      case 'floorplan': return <FloorPlan />;
      case 'esp32': return <ESP32Hardware />;
      case 'blynk': return <BlynkCloud />;
      case 'reports': return <Reports />;
      case 'ai': return <AIAssistant />;
      default: return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen text-white" style={{background: 'linear-gradient(135deg, #0c1e3e 0%, #1a3a70 25%, #0d47a1 50%, #1565c0 75%, #0c3fb3 100%)'}}>
      <div className="flex">
        <nav className={`fixed inset-y-0 left-0 z-50 w-64 glass-dark transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex flex-col h-full p-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">SmartHome AI</h1>
              </div>
              <button className="lg:hidden" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <ul className="space-y-2 flex-1">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5'}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-auto glass rounded-xl p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white truncate text-sm">{userEmail}</p>
                  <p className="text-xs text-blue-100">Smart Home Admin</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-red-100 rounded-lg transition-all text-sm font-medium border border-red-500/30 hover:border-red-500/50"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-1 lg:ml-64 p-3 sm:p-4 md:p-6 pb-24 lg:pb-6">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-6">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-white">
                {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="hidden sm:flex items-center space-x-2 glass px-3 sm:px-4 py-2 rounded-lg">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-xs sm:text-sm text-white">{new Date().toLocaleTimeString()}</span>
              </div>
              <div className="relative p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer">
                <Bell className="w-5 sm:w-6 h-5 sm:h-6 text-blue-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </div>
            </div>
          </header>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const OverviewDashboard: React.FC = () => {
  const { sensorData, devices } = useMockData();

  const stats = [
    { title: 'Total Devices', value: devices.length, icon: Zap, color: 'from-blue-500 to-cyan-500', status: 'Connected' },
    { title: 'Active Devices', value: devices.filter(d => d.status === 'on').length, icon: Activity, color: 'from-green-500 to-emerald-500', status: 'Online' },
    { title: 'Power Consumption', value: `${sensorData.powerConsumption}W`, icon: Zap, color: 'from-yellow-500 to-orange-500', status: 'Normal' },
    { title: 'Security Status', value: 'Secure', icon: Shield, color: 'from-blue-500 to-cyan-500', status: 'All Clear' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-lg sm:rounded-2xl p-3 sm:p-6 hover:scale-105 transition-transform cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className={`w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-shadow`}>
                <stat.icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <span className="text-xs text-blue-100 bg-blue-500/10 px-2 py-1 rounded-lg">{stat.status}</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white truncate">{stat.value}</h3>
            <p className="text-xs sm:text-sm text-blue-200 truncate">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass rounded-lg sm:rounded-2xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-white">Environmental Sensors</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <SensorCard title="Temperature" value={`${sensorData.temperature}°C`} icon={Thermometer} color="from-red-500 to-orange-500" />
            <SensorCard title="Humidity" value={`${sensorData.humidity}%`} icon={Droplet} color="from-blue-500 to-cyan-500" />
            <SensorCard title="Air Quality" value={sensorData.aqi.toString()} icon={Wind} color="from-green-500 to-emerald-500" />
            <SensorCard title="CO2 Level" value={`${sensorData.co2}ppm`} icon={Activity} color="from-purple-500 to-pink-500" />
          </div>
        </div>

        <div className="glass rounded-lg sm:rounded-2xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-white">Security & Utility</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <SensorCard title="Gas Level" value={sensorData.gas > 20 ? 'Warning' : `${sensorData.gas}%`} icon={Activity} color={sensorData.gas > 20 ? 'from-red-500 to-orange-500' : 'from-yellow-500 to-amber-500'} />
            <SensorCard title="Water Level" value={`${sensorData.waterLevel}%`} icon={Droplet} color="from-blue-500 to-cyan-500" />
            <SensorCard title="Motion" value={sensorData.motion ? 'Detected' : 'Clear'} icon={Activity} color={sensorData.motion ? 'from-red-500 to-pink-500' : 'from-green-500 to-emerald-500'} />
            <SensorCard title="Door" value={sensorData.door ? 'Open' : 'Closed'} icon={Activity} color={sensorData.door ? 'from-yellow-500 to-orange-500' : 'from-gray-500 to-gray-600'} />
          </div>
        </div>
      </div>

      <div className="glass rounded-lg sm:rounded-2xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-white">Quick Device Control</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
          {devices.slice(0, 6).map(device => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SensorMonitoring: React.FC = () => {
  const { sensorData } = useMockData();
  const [search, setSearch] = useState('');

  const allSensors = [
    { title: 'Temperature', value: `${sensorData.temperature}°C`, icon: Thermometer, type: 'environment', range: '15-30°C' },
    { title: 'Humidity', value: `${sensorData.humidity}%`, icon: Droplet, type: 'environment', range: '30-70%' },
    { title: 'Air Quality', value: `${sensorData.aqi} AQI`, icon: Wind, type: 'environment', range: '<100 Good' },
    { title: 'CO2 Level', value: `${sensorData.co2} ppm`, icon: Activity, type: 'environment', range: '<500 Normal' },
    { title: 'Gas Leakage', value: `${sensorData.gas} %`, icon: Activity, type: 'security', range: '<20 Safe' },
    { title: 'Smoke', value: `${sensorData.smoke.toFixed(1)} mg/m³`, icon: Activity, type: 'security', range: '<1 Safe' },
    { title: 'Fire Detection', value: sensorData.flame ? 'FIRE!' : 'Normal', icon: Activity, type: 'security', range: 'No Flame' },
    { title: 'Motion', value: sensorData.motion ? 'Detected' : 'Clear', icon: Activity, type: 'security', range: 'PIR Sensor' },
    { title: 'Door', value: sensorData.door ? 'Open' : 'Closed', icon: Activity, type: 'security', range: 'Sensor' },
    { title: 'Window', value: sensorData.window ? 'Open' : 'Closed', icon: Activity, type: 'security', range: 'Sensor' },
    { title: 'Vibration', value: `${sensorData.vibration} Hz`, icon: Activity, type: 'security', range: '<5 Normal' },
    { title: 'Water Level', value: `${sensorData.waterLevel}%`, icon: Droplet, type: 'utility', range: '60-80%' },
    { title: 'Water Leakage', value: sensorData.waterLeakage ? 'Leak!' : 'Normal', icon: Droplet, type: 'utility', range: 'No Leak' },
    { title: 'Power', value: `${sensorData.powerConsumption}W`, icon: Zap, type: 'utility', range: '<3000W' },
    { title: 'Voltage', value: `${sensorData.voltage}V`, icon: Zap, type: 'utility', range: '220V ±5' },
    { title: 'Current', value: `${sensorData.current}A`, icon: Zap, type: 'utility', range: '<10A' },
  ];

  const filtered = allSensors.filter(s => s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="glass rounded-lg sm:rounded-2xl p-3 sm:p-6">
        <input
          type="text"
          placeholder="Search sensors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-blue-200 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {filtered.map((sensor, index) => (
          <motion.div key={sensor.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}>
            <SensorCard {...sensor} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const DeviceControl: React.FC = () => {
  const { devices } = useMockData();

  return (
    <div className="glass rounded-lg sm:rounded-2xl p-4 sm:p-6">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-white">All Devices</h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {devices.map((device, index) => (
          <motion.div key={device.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
            <DeviceCard device={device} fullControl />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default App;