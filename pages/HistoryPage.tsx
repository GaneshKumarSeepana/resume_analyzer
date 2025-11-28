import React, { useEffect, useState } from 'react';
import { getHistory, clearHistory } from '../services/storageService';
import { HistoryItem } from '../types';
import { Trash2, Calendar, Briefcase, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
        <Briefcase className="w-16 h-16 mb-4 opacity-20" />
        <h3 className="text-xl font-medium text-gray-600">No history found</h3>
        <p className="text-sm mt-2">Analyze a resume to see it here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Analysis History</h2>
        <button 
          onClick={handleClear}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors text-sm"
        >
          <Trash2 className="w-4 h-4" />
          Clear History
        </button>
      </div>

      <div className="space-y-4">
        {history.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Summary Header (Clickable) */}
            <div 
              onClick={() => toggleExpand(item.id)}
              className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors gap-4"
            >
               <div className="flex items-center gap-4">
                 <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 ${
                   item.jobMatchScore >= 70 ? 'bg-green-500' : item.jobMatchScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                 }`}>
                   {item.jobMatchScore}%
                 </div>
                 <div>
                   <h3 className="font-semibold text-gray-900 text-lg">{item.jobTitle || 'Unknown Role'}</h3>
                   <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                     <span className="flex items-center gap-1">
                       <FileText className="w-3 h-3" />
                       {item.fileName}
                     </span>
                     <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                     <span className="flex items-center gap-1">
                       <Calendar className="w-3 h-3" />
                       {new Date(item.date).toLocaleDateString()}
                     </span>
                   </div>
                 </div>
               </div>
               
               <div className="flex items-center gap-4 self-end md:self-auto">
                  <div className="text-right hidden md:block">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Quality</span>
                    <p className="font-medium text-indigo-600">{item.resumeQualityScore}/100</p>
                  </div>
                  {expandedId === item.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
               </div>
            </div>

            {/* Expanded Detail View */}
            {expandedId === item.id && (
              <div className="px-5 pb-6 pt-2 border-t border-gray-100 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Matched Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.matchedSkills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded border border-green-200">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Missing Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.missingSkills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded border border-red-200">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">AI Summary</h4>
                  <p className="text-sm text-gray-600">{item.summary}</p>
                </div>

                <div className="mt-4">
                   <h4 className="text-sm font-semibold text-gray-700 mb-2">Top Improvement Suggestions</h4>
                   <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                     {item.suggestions.slice(0, 3).map((s, i) => (
                       <li key={i}>{s}</li>
                     ))}
                   </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;