import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface SettingsContextType {
  notifications: boolean;
  soundEnabled: boolean;
  volume: number;
  autoArchive: boolean;
  toggleNotifications: () => void;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  toggleAutoArchive: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<boolean>(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : false;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved ? JSON.parse(saved) : true;
  });

  const [volume, setVolume] = useState<number>(() => {
    const saved = localStorage.getItem('volume');
    return saved ? JSON.parse(saved) : 0.5; // Default volume 50%
  });

  const [autoArchive, setAutoArchive] = useState<boolean>(() => {
    const saved = localStorage.getItem('autoArchive');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('volume', JSON.stringify(volume));
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('autoArchive', JSON.stringify(autoArchive));
  }, [autoArchive]);

  const toggleNotifications = () => {
    setNotifications((prev: boolean) => !prev);
  };

  const toggleSound = () => {
    setSoundEnabled((prev: boolean) => !prev);
  };

  const handleSetVolume = (newVolume: number) => {
    setVolume(newVolume);
  };

  const toggleAutoArchive = () => {
    setAutoArchive((prev: boolean) => !prev);
  };

  return (
    <SettingsContext.Provider
      value={{
        notifications,
        soundEnabled,
        volume,
        autoArchive,
        toggleNotifications,
        toggleSound,
        setVolume: handleSetVolume,
        toggleAutoArchive,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
} 