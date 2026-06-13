import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  const reports = [
    { id: 1, title: 'Daily Report', date: '2024-01-15', size: '2.4 MB' },
    { id: 2, title: 'Weekly Report', date: 'Week 3', size: '8.2 MB' },
    { id: 3, title: 'Monthly Report', date: 'January 2024', size: '24.5 MB' },
  ];

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
        Generated Reports
      </h3>
      <div className="space-y-4">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-dark rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium">{report.title}</h4>
                <p className="text-xs text-blue-200 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {report.date} • {report.size}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 glass rounded-lg text-sm hover:bg-white/10">PDF</button>
              <button className="px-3 py-1 glass rounded-lg text-sm hover:bg-white/10">Excel</button>
              <button className="px-3 py-1 glass rounded-lg text-sm hover:bg-white/10">CSV</button>
            </div>
          </motion.div>
        ))}
      </div>
      <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl font-medium hover:opacity-90 transition-opacity">
        Generate New Report
      </button>
    </div>
  );
};

export default Reports;