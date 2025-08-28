import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


interface CheckInHistory {
  [date: string]: boolean; // YYYY-MM-DD format
}

interface ChallengeContextType {
  challengeType: 21 | 100;
  startDate: string | null;
  checkInHistory: CheckInHistory;
  currentStreak: number;
  isCheckedInToday: boolean;
  getTotalCompletedDays: () => number;
  initializeChallenge: (type: 21 | 100) => void;
  resetChallenge: (newChallengeType?: 21 | 100) => void;
  checkIn: () => void;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export function useChallengeData() {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallengeData must be used within a ChallengeProvider');
  }
  return context;
}

interface ChallengeProviderProps {
  children: ReactNode;
}

export function ChallengeProvider({ children }: ChallengeProviderProps) {
  const [challengeType, setChallengeType] = useState<21 | 100>(21);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [checkInHistory, setCheckInHistory] = useState<CheckInHistory>({});

  // Load data from localStorage on app start
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const storedChallengeType = localStorage.getItem('challengeType');
      const storedStartDate = localStorage.getItem('startDate');
      const storedHistory = localStorage.getItem('checkInHistory');

      if (storedChallengeType) {
        setChallengeType(parseInt(storedChallengeType) as 21 | 100);
      } else {
        // Initialize with default 21-day challenge if no data exists
        initializeChallenge(21);
      }
      if (storedStartDate) {
        setStartDate(storedStartDate);
      }
      if (storedHistory) {
        setCheckInHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = (key: string, value: any) => {
    try {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const initializeChallenge = (type: 21 | 100) => {
    const today = new Date().toISOString().split('T')[0];
    
    setChallengeType(type);
    setStartDate(today);

    saveData('challengeType', type);
    saveData('startDate', today);
  };

  const resetChallenge = (newChallengeType?: 21 | 100) => {
    const type = newChallengeType || challengeType || 21;
    const today = new Date().toISOString().split('T')[0];
    
    setChallengeType(type);
    setStartDate(today);
    setCheckInHistory({});

    saveData('challengeType', type);
    saveData('startDate', today);
    saveData('checkInHistory', {});
  };

  const checkIn = () => {
    const today = new Date().toISOString().split('T')[0];
    const newHistory = { ...checkInHistory, [today]: true };
    
    setCheckInHistory(newHistory);
    saveData('checkInHistory', newHistory);
  };

  const getCurrentStreak = (): number => {
    if (!startDate) return 0;
    
    const today = new Date();
    const start = new Date(startDate);
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Check for consecutive days from start
    let streak = 0;
    for (let i = 0; i <= diffDays; i++) {
      const checkDate = new Date(start);
      checkDate.setDate(start.getDate() + i);
      const dateString = checkDate.toISOString().split('T')[0];
      
      if (checkInHistory[dateString]) {
        streak++;
      } else if (dateString !== today.toISOString().split('T')[0]) {
        // Don't break streak if today hasn't been checked in yet
        break;
      }
    }
    
    return streak;
  };

  const isCheckedInToday = (): boolean => {
    const today = new Date().toISOString().split('T')[0];
    return checkInHistory[today] || false;
  };

  const getTotalCompletedDays = (): number => {
    return Object.values(checkInHistory).filter(Boolean).length;
  };

  const value: ChallengeContextType = {
    challengeType,
    startDate,
    checkInHistory,
    currentStreak: getCurrentStreak(),
    isCheckedInToday: isCheckedInToday(),
    getTotalCompletedDays,
    initializeChallenge,
    resetChallenge,
    checkIn,
  };

  return (
    <ChallengeContext.Provider value={value}>
      {children}
    </ChallengeContext.Provider>
  );
}