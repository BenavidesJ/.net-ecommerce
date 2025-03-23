import { PresentationForm } from '@/components/custom/PresentationForm';
import { PrivateLayout } from '@/layout';
import { addProductPresentation } from '@/services/products';
import { Presentation } from '@/services/types';
import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router';

interface PresentationFormData {
  color: string;
  tamano: string;
  sku: string;
  imagen: File | null;
}

export function AgregarPresentacion() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const location = useLocation();
  const productoID = location.state;

  const handleSubmit = async (formData: PresentationFormData) => {
    const imgFile = formData.imagen!;
    const cloudData = new FormData();
    cloudData.append('file', imgFile);
    cloudData.append('upload_preset', 'ecomerce_uia');
    let imagen;

    try {
      const cloudResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dh7qptl2n/image/upload',
        cloudData
      );
      const { data } = cloudResponse;
      imagen = data.url;
      const presentation = { ...formData, imagen: data.url };
      await addProductPresentation(presentation, productoID);
    } catch (error) {
      console.log(error);
    }

    const newPresentation: any = {
      ...formData,
      imagen,
      productoID: presentations.length + 1,
    };
    setPresentations([...presentations, newPresentation]);
  };

  return (
    <PrivateLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add Product Presentation</h1>
        <PresentationForm onSubmit={handleSubmit} />
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Current Presentations</h2>
          {presentations.length === 0 ? (
            <p>No presentations added yet.</p>
          ) : (
            <ul className="space-y-2">
              {presentations.map((presentation, index) => (
                <li key={index} className="border p-2 rounded">
                  <p>
                    <strong>Color:</strong> {presentation.color}
                  </p>
                  <p>
                    <strong>Size:</strong> {presentation.tamano}
                  </p>
                  <p>
                    <strong>SKU:</strong> {presentation.sku}
                  </p>
                  <img
                    src={presentation.imagen}
                    alt={`${presentation.color} ${presentation.tamano}`}
                    className="mt-2 w-20 h-20 object-cover"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PrivateLayout>
  );
}
