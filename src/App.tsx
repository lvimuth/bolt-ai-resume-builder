import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { ResumeForm } from './components/ResumeForm';
import { ResumePreview } from './components/ResumePreview';
import { ThemeSelector } from './components/ThemeSelector';
import { generateResume } from './lib/gemini';
import { themes } from './lib/themes';
import type { ResumeData } from './types/resume';

const initialFormData: ResumeData = {
  personalDetails: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [{
    company: '',
    position: '',
    duration: '',
    description: ''
  }],
  education: [{
    institution: '',
    degree: '',
    year: '',
    gpa: ''
  }],
  skills: {
    technical: '',
    soft: '',
    languages: ''
  },
  theme: themes.classic
};

export function App() {
  const [formData, setFormData] = useState<ResumeData>(initialFormData);
  const [aiContent, setAiContent] = useState('');

  const handleUpdateData = async (data: ResumeData) => {
    setFormData(data);
    if (data.personalDetails?.name && data.experience?.[0]?.company) {
      const content = await generateResume(data);
      setAiContent(content);
    }
  };

  const handleThemeChange = (themeName: string) => {
    setFormData(prev => ({
      ...prev,
      theme: themes[themeName]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">AI Resume Builder</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ResumeForm onUpdateData={handleUpdateData} initialData={formData} />
            <ThemeSelector currentTheme={formData.theme} onThemeChange={handleThemeChange} />
          </div>
          <div className="space-y-6">
            <ResumePreview data={formData} aiContent={aiContent} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;