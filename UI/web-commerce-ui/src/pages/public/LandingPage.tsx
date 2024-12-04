import { Carousel } from '@/components/custom/Caroussel';
import { Layout } from '@/layout';

export const LandingPage = () => {
  return (
    <Layout>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center mb-8">
            Bienvenidos a ProPat S.A
          </h1>
          <Carousel />
        </div>
      </section>
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Pago online', 'Retiro en sitio', 'Envíos en Costa Rica'].map(
              (service, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">
                    {service}
                  </h3>
                  <p className="dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};
