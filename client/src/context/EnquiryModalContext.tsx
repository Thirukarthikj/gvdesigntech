import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EnquiryModalContextType {
  isOpen: boolean;
  selectedCourse: string;
  selectedMode: string;
  openEnquiryModal: (course?: string, mode?: string) => void;
  closeEnquiryModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(undefined);

export const EnquiryModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedMode, setSelectedMode] = useState<string>('');

  const openEnquiryModal = (course = '', mode = '') => {
    setSelectedCourse(course);
    setSelectedMode(mode);
    setIsOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsOpen(false);
  };

  return (
    <EnquiryModalContext.Provider
      value={{
        isOpen,
        selectedCourse,
        selectedMode,
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}
    </EnquiryModalContext.Provider>
  );
};

export const useEnquiryModal = () => {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  }
  return context;
};

