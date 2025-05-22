import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useInterviewStore } from '@/store/interviewStore';
import { Button } from './ui/button';

const languages = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'python', name: 'Python' },
  { id: 'java', name: 'Java' },
  { id: 'cpp', name: 'C++' },
];

export function LanguageSelector() {
  const { language, setLanguage } = useInterviewStore();
  
  const currentLanguage = languages.find(lang => lang.id === language)?.name || 'Select Language';
  
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          {currentLanguage}
          <ChevronDown size={16} />
        </Button>
      </DropdownMenu.Trigger>
      
      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className="bg-popover text-popover-foreground rounded-md p-1 shadow-md border border-border min-w-[160px]"
          align="start"
          sideOffset={5}
        >
          {languages.map((lang) => (
            <DropdownMenu.Item
              key={lang.id}
              className={`flex items-center justify-between px-2 py-1.5 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-pointer ${language === lang.id ? 'bg-accent' : ''}`}
              onClick={() => setLanguage(lang.id)}
            >
              {lang.name}
              {language === lang.id && <Check size={16} />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}