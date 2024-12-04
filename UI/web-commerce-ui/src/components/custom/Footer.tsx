import { Link, useNavigate } from 'react-router-dom';
import { MailIcon } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export function Footer() {
  const nav = useNavigate();
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <a
            onClick={() => nav('/')}
            className="flex flex-col items-center space-y-2"
          >
            <img
              src="https://res.cloudinary.com/dh7qptl2n/image/upload/v1732929822/site-icon3_rd5gpd.jpg"
              alt="Logo"
              className="h-14 w-15"
            />
            <span>&copy; 2024 ProPat.S.A</span>
          </a>

          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-semibold">Contáctenos</h3>
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" size="sm" asChild className="w-full">
                <a
                  href="mailto:propatventas@propat.com"
                  className="flex items-center justify-start space-x-2"
                >
                  <MailIcon className="h-4 w-4" />
                  <span>propatventas@propat.com</span>
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full">
                <a
                  href="https://wa.me/123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-start space-x-2"
                >
                  <FaWhatsapp className="mr-2 h-4 w-4" />
                  <span>+506 456 789</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
            <Link to="/privacy-policy" className="text-sm hover:underline">
              Política de Privacidad
            </Link>
            <Link to="/terms-of-service" className="text-sm hover:underline">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
