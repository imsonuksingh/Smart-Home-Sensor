import { type LucideIcon } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: string;
  type?: string;
  range?: string;
  sparkline?: boolean;
}

const SensorCard = ({ title, value, icon: Icon, color = 'from-primary-500 to-primary-600', type, range }: SensorCardProps) => {
  const getStatusColor = (title: string) => {
    if (value.includes('Warning') || value.includes('Leak') || value.includes('FIRE') || value.includes('Detected')) {
      return 'text-red-400';
    }
    if (title === 'Gas Level' || title === 'Smoke' || title === 'Fire Detection') {
      return 'text-green-400';
    }
    return 'text-white';
  };

  return (
    <div className="glass rounded-lg sm:rounded-xl p-3 sm:p-4 hover:scale-105 transition-transform cursor-pointer group">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center group-hover:shadow-lg transition-shadow`}>
          <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        </div>
        <span className="text-xs text-blue-100 bg-blue-500/10 px-1.5 py-0.5 rounded">{type}</span>
      </div>
      <h4 className="font-medium text-xs sm:text-sm text-white mb-1 truncate">{title}</h4>
      <p className={`text-lg sm:text-2xl font-bold ${getStatusColor(title)} truncate`}>{value}</p>
      {range && <p className="text-xs text-blue-200 mt-1 truncate">{range}</p>}
    </div>
  );
};

export default SensorCard;