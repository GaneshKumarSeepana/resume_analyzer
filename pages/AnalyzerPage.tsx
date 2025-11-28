import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, Play, AlertCircle, CheckCircle2, Briefcase } from 'lucide-react';
import { analyzeApplication, fileToBase64 } from '../services/geminiService';
import { saveToHistory } from '../services/storageService';
import { AnalysisResult } from '../types';
import { ScoreChart } from '../components/ScoreChart';

const AnalyzerPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Validate file type (PDF or Text)
      if (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('text/')) {
        setFile(selectedFile);
        setError(null);
        setResult(null); // Reset previous result
      } else {
        setError("Please upload a PDF or Text file.");
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const selectedFile = e.dataTransfer.files[0];
        if (selectedFile.type === 'application/pdf' || selectedFile.type.startsWith('text/')) {
            setFile(selectedFile);
            setError(null);
            setResult(null);
        } else {
            setError("Please upload a PDF or Text file.");
        }
    }
  };

  const handleAnalyze = async () => {
    if (!file || !jobDescription.trim()) {
      setError("Please provide both a resume and a job description.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const base64File = await fileToBase64(file);
      const data = await analyzeApplication(base64File, file.type, jobDescription);
      setResult(data);
      
      // Save to history
      saveToHistory({
        ...data,
        fileName: file.name
      });

    } catch (err) {
      setError("Failed to analyze. Please check your internet connection or API key and try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setFile(null);
    setJobDescription('');
  };

  // If we have a result, show the dashboard
  if (result) {
    return (
      <div className="animate-fade-in space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Analysis Report</h2>
            <p className="text-gray-500 text-sm">Analysis generated on {new Date(result.date).toLocaleDateString()} for <span className="font-medium text-indigo-600">{result.jobTitle || 'Unknown Role'}</span></p>
          </div>
          <button 
            onClick={resetAnalysis}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Start New Analysis
          </button>
        </div>

        {/* Scores Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <ScoreChart 
             score={result.jobMatchScore} 
             label="Job Match Probability" 
             color={result.jobMatchScore > 70 ? '#10b981' : result.jobMatchScore > 40 ? '#f59e0b' : '#ef4444'} 
           />
           <ScoreChart 
             score={result.resumeQualityScore} 
             label="Resume Quality Score" 
             color="#6366f1" 
           />
           <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex flex-col justify-center">
             <h3 className="text-indigo-900 font-semibold mb-2 flex items-center gap-2">
               <Briefcase className="w-5 h-5" />
               Executive Summary
             </h3>
             <p className="text-indigo-800 text-sm leading-relaxed">
               {result.summary}
             </p>
           </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5 text-green-500" />
               Matched Skills
             </h3>
             <div className="flex flex-wrap gap-2">
               {result.matchedSkills.length > 0 ? (
                 result.matchedSkills.map((skill, idx) => (
                   <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
                     {skill}
                   </span>
                 ))
               ) : (
                 <p className="text-gray-400 text-sm italic">No specific skills matched.</p>
               )}
             </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
               <AlertCircle className="w-5 h-5 text-red-500" />
               Missing / Recommended Skills
             </h3>
             <div className="flex flex-wrap gap-2">
               {result.missingSkills.length > 0 ? (
                 result.missingSkills.map((skill, idx) => (
                   <span key={idx} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-100">
                     {skill}
                   </span>
                 ))
               ) : (
                 <p className="text-gray-400 text-sm italic">No missing critical skills identified.</p>
               )}
             </div>
          </div>
        </div>

        {/* Suggestions & Roles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Improvement Suggestions</h3>
            <ul className="space-y-3">
              {result.suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
                   <span className="min-w-[24px] h-6 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold mt-0.5">
                     {idx + 1}
                   </span>
                   <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Alternative Roles</h3>
            <div className="space-y-2">
               {result.alternativeRoles.map((role, idx) => (
                 <div key={idx} className="p-3 bg-gray-50 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors">
                   {role}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Input Form View
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Resume Matcher & Analyzer</h1>
        <p className="text-gray-500 text-lg">Optimize your resume for any job description in seconds using AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Resume Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <div className="bg-blue-100 p-1.5 rounded-md">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            1. Upload Resume
          </h3>
          
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 h-64 ${
              file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
            }`}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf, .txt, .md"
              onChange={handleFileChange}
            />
            {file ? (
              <div className="animate-in fade-in zoom-in duration-300">
                <FileText className="w-12 h-12 text-green-500 mb-3 mx-auto" />
                <p className="font-medium text-gray-900 truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-green-600 mt-1">Ready to analyze</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="mt-4 px-3 py-1 bg-white text-red-500 text-xs rounded-full border border-red-200 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
                <p className="font-medium text-gray-700">Click to upload or drag & drop</p>
                <p className="text-xs text-gray-400 mt-1">PDF or Text files only</p>
              </>
            )}
          </div>
        </div>

        {/* Job Description Input */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <div className="bg-indigo-100 p-1.5 rounded-md">
              <Briefcase className="w-5 h-5 text-indigo-600" />
            </div>
            2. Paste Job Description
          </h3>
          <textarea
            className="w-full h-64 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-sm"
            placeholder="Paste the full job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-3">
           <AlertCircle className="w-5 h-5" />
           {error}
        </div>
      )}

      <div className="flex justify-center pt-4">
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !file || !jobDescription.trim()}
          className={`
            flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all transform hover:scale-105
            ${isAnalyzing || !file || !jobDescription.trim() 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-xl'
            }
          `}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Resume...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              Analyze Match
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AnalyzerPage;