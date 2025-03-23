import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ProductPresentation {
  productoID: number;
  color: string;
  tamano: string;
  sku: string;
  imagen: string;
}

interface ProductProps {
  id: number;
  nombre: string;
  cantidad: number;
  costo: number;
  costoConIVA: number;
  presentaciones: ProductPresentation[];
}

export const ProductListItem: React.FC<ProductProps> = ({
  nombre,
  cantidad,
  costo,
  costoConIVA,
  presentaciones,
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Contenedor del carrusel */}
          <div className="w-full md:w-1/2 max-h-64">
            <Carousel className="relative overflow-hidden rounded-md max-w-xs mx-auto">
              <CarouselContent className="max-h-64">
                {presentaciones.map((presentacion, index) => (
                  <CarouselItem key={index} className="p-2">
                    <AspectRatio ratio={4 / 3}>
                      <img
                        src={presentacion.imagen}
                        alt={`${nombre} presentación ${index + 1}`}
                        className="rounded-md object-cover w-full h-full"
                      />
                      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-3 text-sm">
                        <p className="text-center">
                          <strong>Color:</strong> {presentacion.color},{' '}
                        </p>
                        <p className="text-center">
                          <strong>Tamaño:</strong> {presentacion.tamano},{' '}
                        </p>
                        <p className="text-center">
                          <strong>SKU:</strong> {presentacion.sku}
                        </p>
                      </div>
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* Botones ajustados */}
              <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full text-xs" />
              <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full text-xs" />
            </Carousel>
          </div>

          {/* Información del producto */}
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold">{nombre}</h2>
            <p className="text-xl">Stock: {cantidad} unidades</p>
            <div>
              <p className="text-2xl font-semibold">${costo.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                Precio con IVA: ${costoConIVA.toFixed(2)}
              </p>
            </div>
            {/* Botones de acción */}
            <div className="flex gap-4">
              <Button
                onClick={() => {}}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Modificar
              </Button>
              <Button
                onClick={() => {}}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
