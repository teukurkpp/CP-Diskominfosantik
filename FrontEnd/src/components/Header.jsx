import React from 'react';

export default function Header({ title }) {
  return (
    <div className="relative w-full h-[400px] flex items-center bg-fixed">
      <img
        src="/src/assets/Header_Image.png"
        alt="Hero Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 container mx-auto px-8">
        <h1 className="text-white font-black text-5xl md:text-6xl tracking-wide text-left drop-shadow-lg">
          {title}
        </h1>
      </div>
    </div>
  );
}
