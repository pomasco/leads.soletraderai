import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface KeywordInputProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ keywords, setKeywords }) => {
  const [input, setInput] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim() && keywords.length < 5) {
      e.preventDefault();
      setKeywords([...keywords, input.trim()]);
      setInput('');
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
          disabled={keywords.length >= 5}
          className="w-full px-4 py-2 rounded-lg border-2 border-caribbean-current/20 
                   focus:border-caribbean-current focus:outline-none transition-colors
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        {keywords.length >= 5 && (
          <span className="absolute right-3 top-2.5 text-sm text-caribbean-current">
            Max 5 keywords
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <motion.span
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="inline-flex items-center gap-1 px-3 py-1 bg-caribbean-current 
                     text-seasalt rounded-full text-sm"
          >
            {keyword}
            <button
              onClick={() => removeKeyword(index)}
              className="p-0.5 hover:bg-seasalt/20 rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default KeywordInput;