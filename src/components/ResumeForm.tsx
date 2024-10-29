import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Save } from 'lucide-react';
import type { ResumeData } from '../types/resume';

const steps = ['Personal Details', 'Experience', 'Education', 'Skills'];

interface ResumeFormProps {
  onUpdateData: (data: ResumeData) => void;
  initialData: ResumeData;
}

export function ResumeForm({ onUpdateData, initialData }: ResumeFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ResumeData>(initialData);

  const handleInputChange = (section: keyof ResumeData, field: string, value: string, index?: number) => {
    const newData = { ...formData };
    if (index !== undefined && Array.isArray(newData[section])) {
      newData[section][index][field] = value;
    } else if (typeof newData[section] === 'object') {
      newData[section][field] = value;
    }
    setFormData(newData);
    onUpdateData(newData);
  };

  const renderPersonalDetails = () => (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-2 border rounded"
        value={formData.personalDetails.name}
        onChange={(e) => handleInputChange('personalDetails', 'name', e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={formData.personalDetails.email}
        onChange={(e) => handleInputChange('personalDetails', 'email', e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone"
        className="w-full p-2 border rounded"
        value={formData.personalDetails.phone}
        onChange={(e) => handleInputChange('personalDetails', 'phone', e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="w-full p-2 border rounded"
        value={formData.personalDetails.location}
        onChange={(e) => handleInputChange('personalDetails', 'location', e.target.value)}
      />
      <textarea
        placeholder="Professional Summary"
        className="w-full p-2 border rounded h-32"
        value={formData.personalDetails.summary}
        onChange={(e) => handleInputChange('personalDetails', 'summary', e.target.value)}
      />
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-4">
      {formData.experience.map((exp, index) => (
        <div key={index} className="p-4 border rounded space-y-4">
          <input
            type="text"
            placeholder="Company"
            className="w-full p-2 border rounded"
            value={exp.company}
            onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
          />
          <input
            type="text"
            placeholder="Position"
            className="w-full p-2 border rounded"
            value={exp.position}
            onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
          />
          <input
            type="text"
            placeholder="Duration"
            className="w-full p-2 border rounded"
            value={exp.duration}
            onChange={(e) => handleInputChange('experience', 'duration', e.target.value, index)}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 border rounded h-32"
            value={exp.description}
            onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
          />
        </div>
      ))}
      <button
        onClick={() => setFormData({
          ...formData,
          experience: [...formData.experience, { company: '', position: '', duration: '', description: '' }]
        })}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Experience
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      {formData.education.map((edu, index) => (
        <div key={index} className="p-4 border rounded space-y-4">
          <input
            type="text"
            placeholder="Institution"
            className="w-full p-2 border rounded"
            value={edu.institution}
            onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
          />
          <input
            type="text"
            placeholder="Degree"
            className="w-full p-2 border rounded"
            value={edu.degree}
            onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
          />
          <input
            type="text"
            placeholder="Year"
            className="w-full p-2 border rounded"
            value={edu.year}
            onChange={(e) => handleInputChange('education', 'year', e.target.value, index)}
          />
          <input
            type="text"
            placeholder="GPA"
            className="w-full p-2 border rounded"
            value={edu.gpa}
            onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
          />
        </div>
      ))}
      <button
        onClick={() => setFormData({
          ...formData,
          education: [...formData.education, { institution: '', degree: '', year: '', gpa: '' }]
        })}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Education
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-4">
      <textarea
        placeholder="Technical Skills (comma separated)"
        className="w-full p-2 border rounded h-32"
        value={formData.skills.technical}
        onChange={(e) => handleInputChange('skills', 'technical', e.target.value)}
      />
      <textarea
        placeholder="Soft Skills (comma separated)"
        className="w-full p-2 border rounded h-32"
        value={formData.skills.soft}
        onChange={(e) => handleInputChange('skills', 'soft', e.target.value)}
      />
      <textarea
        placeholder="Languages (comma separated)"
        className="w-full p-2 border rounded h-32"
        value={formData.skills.languages}
        onChange={(e) => handleInputChange('skills', 'languages', e.target.value)}
      />
    </div>
  );

  const getCurrentStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalDetails();
      case 1:
        return renderExperience();
      case 2:
        return renderEducation();
      case 3:
        return renderSkills();
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index <= currentStep
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300'
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm hidden sm:inline">{step}</span>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-12 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form className="space-y-6">
        {getCurrentStepContent()}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 ${
              currentStep === 0 ? 'invisible' : ''
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          <button
            type="button"
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Save className="w-4 h-4 mr-1" />
                Generate Resume
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResumeForm;