import type { Theme } from '../types/resume';

export const themes: Record<string, Theme> = {
  classic: {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    text: 'text-gray-700',
    background: 'bg-white'
  },
  modern: {
    primary: 'text-purple-600',
    secondary: 'text-purple-400',
    text: 'text-gray-800',
    background: 'bg-gray-50'
  },
  professional: {
    primary: 'text-emerald-700',
    secondary: 'text-emerald-500',
    text: 'text-gray-700',
    background: 'bg-white'
  },
  elegant: {
    primary: 'text-slate-800',
    secondary: 'text-slate-600',
    text: 'text-slate-700',
    background: 'bg-slate-50'
  },
  bold: {
    primary: 'text-red-600',
    secondary: 'text-red-400',
    text: 'text-gray-800',
    background: 'bg-white'
  }
};