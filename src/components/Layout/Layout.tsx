import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Navbar from './Navbar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="bg-dark text-white w-full h-full min-h-screen">
      <Navbar />
      <ToastContainer position="bottom-left" />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
