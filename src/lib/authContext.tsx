import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Role = 'gm' | 'player' | null;

interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
  playerUrl?: string;
  setPlayerUrl: (url: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<Role>(null);
  const [playerUrl, setPlayerUrlState] = useState<string>('');

  useEffect(() => {
    const storedRole = sessionStorage.getItem('bnr_role') as Role;
    if (storedRole) {
      setRoleState(storedRole);
      if (storedRole === 'player') {
        const url = sessionStorage.getItem('bnr_player_url');
        if (url) setPlayerUrlState(url);
      }
    }
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (newRole) {
      sessionStorage.setItem('bnr_role', newRole);
    } else {
      sessionStorage.removeItem('bnr_role');
      sessionStorage.removeItem('bnr_player_url');
    }
  };

  const setPlayerUrl = (url: string) => {
    setPlayerUrlState(url);
    sessionStorage.setItem('bnr_player_url', url);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, playerUrl, setPlayerUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
