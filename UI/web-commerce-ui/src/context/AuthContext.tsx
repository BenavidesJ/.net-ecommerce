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
  isAdmin: boolean;
  authenticate: (user: LoginResponse) => void;
  currentUser: SingleUserResponse | undefined;
  signOffUser: () => void;
  setCurrentUser: (
    value: React.SetStateAction<SingleUserResponse | undefined>
  ) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const loggedUser = () => !!sessionStorage.getItem('user');

  const signOffUser = () => {
    sessionStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentUser(undefined); // Limpia la información del usuario.
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(loggedUser());
  const [currentUser, setCurrentUser] = useState<
    SingleUserResponse | undefined
  >();
  const adminRegex = /\b(admin|propat)\b/i;
  const isAdmin = !!(currentUser && adminRegex.test(currentUser.correo));

  const loggedUserInfo = async () => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      setCurrentUser(undefined); // Limpia si no hay usuario.
      return;
    }
    const userID = JSON.parse(user).id;
    const loggedUserInfo = await getUserByID(userID);
    setCurrentUser(loggedUserInfo);
  };

  const authenticate = async (user: LoginResponse) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
    await loggedUserInfo(); // Llama a loggedUserInfo después de loguearte.
  };

  useEffect(() => {
    if (loggedUser()) {
      setIsAuthenticated(true);
      loggedUserInfo();
    }
  }, []);

  const values = {
    isAuthenticated,
    authenticate,
    currentUser,
    signOffUser,
    setCurrentUser,
    isAdmin,
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
