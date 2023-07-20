import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-dark text-white w-full h-full min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
