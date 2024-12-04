import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Nuestra Mision',
    content:
      'Ser un proveedor de confianza para los clientes, brindando productos de calidad.',
    img: 'https://res.cloudinary.com/dh7qptl2n/image/upload/v1732936786/factory_rnifyx.png',
  },
  {
    title: 'Nuestra Vision',
    content: 'Ser la empresa distribuidora de patitos de hule.',
    img: 'https://res.cloudinary.com/dh7qptl2n/image/upload/v1732937554/vision_rgthrx.png',
  },
];

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden h-96">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative w-full h-full">
            {slide.img && (
              <img
                src={slide.img}
                alt={slide.title}
                className="object-cover w-full h-full absolute inset-0"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="flex flex-col items-center justify-center h-full text-center relative z-10 px-4">
              <h2 className="text-3xl font-bold text-white mb-4">
                {slide.title}
              </h2>
              <p className="text-xl text-white max-w-2xl">{slide.content}</p>
            </div>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Anterior</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Siguiente</span>
      </Button>
    </div>
  );
}
