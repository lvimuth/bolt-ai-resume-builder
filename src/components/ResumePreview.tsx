import React from 'react';
import { Printer } from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
  aiContent: string;
}

export function ResumePreview({ data, aiContent }: ResumePreviewProps) {
  const { theme } = data;

  return (
    <div className={`${theme.background} p-8 rounded-lg shadow-lg resume-preview`}>
      <div className="mb-4 flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${theme.primary}`}>Resume Preview</h2>
        <button
          onClick={() => window.print()}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print
        </button>
      </div>

      <div className="space-y-6 print:space-y-4">
        {aiContent ? (
          <div className={theme.text} dangerouslySetInnerHTML={{ __html: aiContent.replace(/\n/g, '<br/>') }} />
        ) : (
          <>
            <div className="text-center border-b pb-4">
              <h1 className={`text-3xl font-bold ${theme.primary}`}>
                {data.personalDetails.name || 'Your Name'}
              </h1>
              <div className={`mt-2 ${theme.secondary}`}>
                {data.personalDetails.email && `${data.personalDetails.email} • `}
                {data.personalDetails.phone}
                {data.personalDetails.location && (
                  <br />
                )}
                {data.personalDetails.location}
              </div>
            </div>

            {data.personalDetails.summary && (
              <div>
                <h2 className={`text-xl font-bold mb-2 ${theme.primary}`}>Professional Summary</h2>
                <p className={theme.text}>{data.personalDetails.summary}</p>
              </div>
            )}

            {data.experience.some(exp => exp.company || exp.position) && (
              <div>
                <h2 className={`text-xl font-bold mb-2 ${theme.primary}`}>Experience</h2>
                {data.experience.map((exp, index) => (
                  exp.company || exp.position ? (
                    <div key={index} className="mb-4">
                      <h3 className={`font-bold ${theme.primary}`}>{exp.position}</h3>
                      <div className={theme.secondary}>
                        {exp.company} {exp.duration && `• ${exp.duration}`}
                      </div>
                      <p className={`mt-1 ${theme.text}`}>{exp.description}</p>
                    </div>
                  ) : null
                ))}
              </div>
            )}

            {data.education.some(edu => edu.institution || edu.degree) && (
              <div>
                <h2 className={`text-xl font-bold mb-2 ${theme.primary}`}>Education</h2>
                {data.education.map((edu, index) => (
                  edu.institution || edu.degree ? (
                    <div key={index} className="mb-4">
                      <h3 className={`font-bold ${theme.primary}`}>{edu.degree}</h3>
                      <div className={theme.secondary}>
                        {edu.institution} {edu.year && `• ${edu.year}`}
                      </div>
                      {edu.gpa && <div className={theme.text}>GPA: {edu.gpa}</div>}
                    </div>
                  ) : null
                ))}
              </div>
            )}

            {(data.skills.technical || data.skills.soft || data.skills.languages) && (
              <div>
                <h2 className={`text-xl font-bold mb-2 ${theme.primary}`}>Skills</h2>
                {data.skills.technical && (
                  <div className="mb-2">
                    <h3 className={`font-bold ${theme.primary}`}>Technical Skills</h3>
                    <p className={theme.text}>{data.skills.technical}</p>
                  </div>
                )}
                {data.skills.soft && (
                  <div className="mb-2">
                    <h3 className={`font-bold ${theme.primary}`}>Soft Skills</h3>
                    <p className={theme.text}>{data.skills.soft}</p>
                  </div>
                )}
                {data.skills.languages && (
                  <div>
                    <h3 className={`font-bold ${theme.primary}`}>Languages</h3>
                    <p className={theme.text}>{data.skills.languages}</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ResumePreview;