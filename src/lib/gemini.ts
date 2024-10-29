import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ResumeData } from '../types/resume';

const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const generateResume = async (formData: ResumeData): Promise<string> => {
  const prompt = `Create a professional resume based on the following information:
    Personal Details: ${JSON.stringify(formData.personalDetails)}
    Work Experience: ${JSON.stringify(formData.experience)}
    Education: ${JSON.stringify(formData.education)}
    Skills: ${JSON.stringify(formData.skills)}
    
    Format the response in a clear, professional manner suitable for a resume.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating resume:', error);
    return 'Error generating resume. Please try again.';
  }
};