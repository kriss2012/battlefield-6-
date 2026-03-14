import React from 'react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Tactical Overlays */}
      <div className="scanline" />
      
      {/* Main Content */}
      <main className="flex-1 relative z-10 w-full">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
