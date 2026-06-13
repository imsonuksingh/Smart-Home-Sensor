import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

interface SensorData {
  temperature: number;
  humidity: number;
  aqi: number;
  co2: number;
  gas: number;
  smoke: number;
  flame: boolean;
  motion: boolean;
  door: boolean;
  window: boolean;
  vibration: number;
  waterLevel: number;
  waterLeakage: boolean;
  powerConsumption: number;
  voltage: number;
  current: number;
  energy: number;
}

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'on' | 'off';
  value?: number;
}

interface SecurityAlert {
  id: string;
  type: 'motion' | 'door' | 'fire' | 'gas' | 'water';
  message: string;
  level: 'safe' | 'warning' | 'danger';
  timestamp: string;
  location: string;
}

interface MockDataContextType {
  sensorData: SensorData;
  devices: Device[];
  alerts: SecurityAlert[];
  lastUpdated: Date;
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) throw new Error('useMockData must be used within MockDataProvider');
  return context;
};

export const MockDataProvider = ({ children }: { children: ReactNode }) => {
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 22.5,
    humidity: 45,
    aqi: 75,
    co2: 420,
    gas: 12,
    smoke: 0,
    flame: false,
    motion: false,
    door: false,
    window: false,
    vibration: 0,
    waterLevel: 65,
    waterLeakage: false,
    powerConsumption: 2450,
    voltage: 220,
    current: 4.2,
    energy: 1250,
  });

  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Living Room Light', type: 'light', status: 'on', value: 80 },
    { id: '2', name: 'Bedroom Light', type: 'light', status: 'off', value: 0 },
    { id: '3', name: 'Kitchen Light', type: 'light', status: 'on', value: 60 },
    { id: '4', name: 'Garden Light', type: 'light', status: 'off', value: 0 },
    { id: '5', name: 'RGB Smart Light', type: 'rgb', status: 'on', value: 100 },
    { id: '6', name: 'Fan', type: 'fan', status: 'off', value: 0 },
    { id: '7', name: 'AC', type: 'ac', status: 'on', value: 24 },
    { id: '8', name: 'TV', type: 'tv', status: 'off', value: 0 },
    { id: '9', name: 'Smart Plug', type: 'plug', status: 'on', value: 0 },
    { id: '10', name: 'Water Pump', type: 'pump', status: 'off', value: 0 },
    { id: '11', name: 'Heater', type: 'heater', status: 'off', value: 0 },
  ]);

  const [alerts] = useState<SecurityAlert[]>([
    { id: '1', type: 'motion', message: 'Motion detected in Living Room', level: 'warning', timestamp: new Date().toISOString(), location: 'Living Room' },
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        temperature: +(prev.temperature + (Math.random() - 0.5) * 0.5).toFixed(1),
        humidity: Math.min(100, Math.max(0, prev.humidity + (Math.random() - 0.5) * 2)),
        aqi: Math.min(300, Math.max(0, prev.aqi + (Math.random() - 0.5) * 5)),
        co2: Math.min(1000, Math.max(300, prev.co2 + (Math.random() - 0.5) * 10)),
        gas: Math.min(100, Math.max(0, prev.gas + (Math.random() - 0.5) * 3)),
        smoke: Math.max(0, prev.smoke + (Math.random() - 0.5) * 0.5),
        flame: prev.flame || Math.random() < 0.01,
        motion: Math.random() < 0.15,
        door: Math.random() < 0.05,
        window: Math.random() < 0.03,
        vibration: +(Math.random() * 10).toFixed(1),
        waterLevel: Math.min(100, Math.max(0, prev.waterLevel + (Math.random() - 0.5) * 0.3)),
        waterLeakage: prev.waterLeakage || Math.random() < 0.02,
        powerConsumption: Math.min(10000, Math.max(0, prev.powerConsumption + (Math.random() - 0.5) * 50)),
        voltage: +(220 + (Math.random() - 0.5) * 5).toFixed(1),
        current: +(Math.random() * 10).toFixed(1),
        energy: +(prev.energy + Math.random() * 0.5).toFixed(1),
      }));

      setDevices(prev => prev.map(d => ({
        ...d,
        value: d.type === 'light' || d.type === 'rgb' 
          ? Math.min(100, Math.max(0, (d.value || 0) + (Math.random() - 0.5) * 5))
          : d.value,
      })));

      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MockDataContext.Provider value={{ sensorData, devices, alerts, lastUpdated }}>
      {children}
    </MockDataContext.Provider>
  );
};