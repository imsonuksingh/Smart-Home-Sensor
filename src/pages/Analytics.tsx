import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

type TimeFilter = 'hour' | 'today' | 'week' | 'month';

const generateData = () => {
  const data = [];
  for (let i = 23; i >= 0; i--) {
    data.push({
      name: `${24 - i}h`,
      temperature: 20 + Math.random() * 5,
      humidity: 40 + Math.random() * 20,
      power: 2000 + Math.random() * 1000,
      aqi: 70 + Math.random() * 30,
    });
  }
  return data;
};

const Analytics = () => {
  const data = generateData();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('today');

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="glass rounded-lg sm:rounded-2xl p-3 sm:p-6">
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {['hour', 'today', 'week', 'month'].map(filter => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter as TimeFilter)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm capitalize transition-colors ${timeFilter === filter ? 'bg-blue-500 text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
            >
              {filter === 'hour' ? 'Last Hour' : filter === 'today' ? 'Today' : filter === 'week' ? 'Weekly' : 'Monthly'}
            </button>
          ))}
        </div>

        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#bfdbfe" />\n              <YAxis stroke="#bfdbfe" />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 58, 138, 0.95)', border: '1px solid rgba(255,255,255,0.2)', color: '#ffffff' }} />
              <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} name="Temperature (°C)" />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} name="Humidity (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="glass rounded-lg sm:rounded-2xl p-3 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Power Consumption</h3>
          <div className="h-40 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="powerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                    <stop offset="95%" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="power" stroke="#eab308" fill="url(#powerGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-lg sm:rounded-2xl p-3 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white">Air Quality Trends</h3>
          <div className="h-40 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="aqi" stroke="#10b981" fill="url(#aqiGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;