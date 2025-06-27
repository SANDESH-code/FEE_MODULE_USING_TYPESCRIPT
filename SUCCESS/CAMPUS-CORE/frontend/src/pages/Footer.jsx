import React from 'react';
import { FaWrench, FaRegCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#ffff] border-t  pt-6 pb-6 border-gray-300 py-2 px-4 flex justify-between items-center text-sm w-full">
      <div className="flex items-center gap-2">
        <FaWrench className="text-black" />
        <span>
          Designed and developed by <strong>ZoroTeam</strong>
        </span>
      </div>
      <div className="flex items-center gap-1">
        <FaRegCopyright className="text-black" />
        <span>2025 Zoro Innovations</span>
      </div>
    </footer>
  );
};

export default Footer;
