import { LoginResponse, SingleUserResponse } from '@/services/types';
import { getUserByID } from '@/services/user';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  authenticate: (user: LoginResponse) => void;
  currentUser: SingleUserResponse | undefined;
  signOffUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const loggedUser = () => !!sessionStorage.getItem('user');
  const signOffUser = () => {
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(loggedUser());
  const [currentUser, setCurrentUser] = useState<
    SingleUserResponse | undefined
  >();

  const authenticate = (user: LoginResponse) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const loggedUserInfo = async () => {
    const user = sessionStorage.getItem('user');
    const userID = user && JSON.parse(user).id;
    const loggedUserInfo = await getUserByID(userID);
    setCurrentUser(loggedUserInfo);
  };

  useEffect(() => {
    if (loggedUser()) {
      setIsAuthenticated(true);
      loggedUserInfo();
    }
  }, []);

  // useEffect(() => {
  //   loggedUserInfo();
  // }, []);

  const values = {
    isAuthenticated,
    authenticate,
    currentUser,
    signOffUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useShared debe ser usado dentro de un provider');
  }
  return context;
};
