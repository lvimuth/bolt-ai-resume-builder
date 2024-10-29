import React from 'react';
import { Palette } from 'lucide-react';
import { themes } from '../lib/themes';
import type { Theme } from '../types/resume';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (themeName: string) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5" />
        <h3 className="font-medium">Theme</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(themes).map(([name, theme]) => (
          <button
            key={name}
            onClick={() => onThemeChange(name)}
            className={`p-3 rounded-md border transition-all ${
              theme === currentTheme
                ? 'border-blue-500 shadow-sm'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${theme.primary.replace('text-', 'bg-')}`} />
              <span className="capitalize">{name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;