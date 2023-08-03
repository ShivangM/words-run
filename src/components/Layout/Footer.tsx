import React from 'react';

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-primary text-gray-50 text-sm sm:text-base">
      <div className="container flex flex-col items-center justify-center p-4 mx-auto md:p-6 lg:flex-row divide-gray-400">
        <p className="text-center px-6">
          <span className="text-gray-100">Developed with ❤️ By </span>
          <span className="font-semibold text-white">Team Coding Idiots </span>
          <span className="text-gray-100">© {new Date().getFullYear()} </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
