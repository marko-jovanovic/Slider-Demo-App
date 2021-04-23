import React, { useState, Dispatch, SetStateAction } from 'react';

interface SettingsContextType {
  selectedWriterIndex: number;
  setSelectedWriterIndex: Dispatch<SetStateAction<number>>;
}

export const SettingsContext = React.createContext<SettingsContextType>({
  selectedWriterIndex: 0,
  setSelectedWriterIndex: () => {}
});

interface SettingsProviderProps {
  children: React.ReactNode;
}

const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [selectedWriterIndex, setSelectedWriterIndex] = useState(0);

  return (
    <SettingsContext.Provider value={{selectedWriterIndex, setSelectedWriterIndex}}>
      { children }
    </SettingsContext.Provider>
  )
} 

export function withSettingsContext<T>(Component: React.ComponentType<any>) {
  return (props: T) => {
    return (
      <SettingsProvider>
        <Component {...props} />
      </SettingsProvider>
    );
  };
}
