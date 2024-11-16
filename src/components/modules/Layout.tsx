import React, { ReactNode } from 'react';
import Board from '../cores/Board';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="md:max-w-4xl lg:max-w-[75rem] mx-auto flex flex-col min-h-screen w-full px-4 sm:px-8 overflow-hidden">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl text-center mt-8 mb-8 font-bold uppercase tracking-wider">
          PokéDex
        </h1>
        {children}
      </div>
      <div className="py-4 mt-4 w-full bg-gray-300 bg-opacity-10 text-center text-sm font-bold tracking-wider">
        © {new Date().getFullYear()} Zied Mabrouk - All Rights Reserved.
      </div>
    </>
  );
};

export default Layout;
