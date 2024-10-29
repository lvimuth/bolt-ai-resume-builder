export interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
  gpa: string;
}

export interface Skills {
  technical: string;
  soft: string;
  languages: string;
}

export interface Theme {
  primary: string;
  secondary: string;
  text: string;
  background: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  theme: Theme;
}