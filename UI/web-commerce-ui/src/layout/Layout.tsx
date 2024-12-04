import { Footer, Navbar } from '@/components/custom';

export const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
