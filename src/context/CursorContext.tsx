import React, { createContext, useContext, useState } from 'react';

export type CursorType = 'default' | 'view' | 'play' | 'drag' | 'open' | 'close' | 'pointer' | 'hidden';

interface CursorContextType {
  cursorType: CursorType;
  cursorText: string;
  setCursor: (type: CursorType, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorType: 'default',
  cursorText: '',
  setCursor: () => {},
  resetCursor: () => {},
});

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [cursorText, setCursorText] = useState<string>('');

  const setCursor = (type: CursorType, text: string = '') => {
    setCursorType(type);
    setCursorText(text || (type === 'view' ? 'VIEW' : type === 'play' ? 'PLAY' : type === 'open' ? 'OPEN' : type === 'drag' ? 'DRAG' : ''));
  };

  const resetCursor = () => {
    setCursorType('default');
    setCursorText('');
  };

  return (
    <CursorContext.Provider value={{ cursorType, cursorText, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
