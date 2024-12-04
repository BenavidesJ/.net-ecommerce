import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const nav = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="bg-white dark:bg-black shadow dark:shadow-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a onClick={() => nav('/')}>
              <img
                src="https://res.cloudinary.com/dh7qptl2n/image/upload/v1732929822/site-icon3_rd5gpd.jpg"
                alt="Logo"
                className="h-14 w-15 cursor-pointer rounded-lg"
              />
            </a>
          </div>
          <div className="flex items-center">
            {pathname === '/' ? (
              <>
                <Button
                  variant="outline"
                  className="mr-2 dark:border-white dark:text-white"
                  onClick={() => {
                    nav('login');
                  }}
                >
                  Inicie Sesión
                </Button>
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-black"
                  onClick={() => {
                    nav('registro');
                  }}
                >
                  Regístrese
                </Button>
              </>
            ) : (
              <Button
                className="dark:bg-black dark:hover:bg-gray-800 dark:text-white"
                onClick={() => {
                  nav('/');
                }}
              >
                Volver
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
