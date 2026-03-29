import React from "react";

export default function ServiceCard({ title, description, link, icon }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col items-center hover:shadow-lg transition-all duration-300 relative">
      {/* Icon Circle */}
      <div className="w-20 h-20 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-3xl absolute -top-10 left-1/2 -translate-x-1/2">
        {icon}
      </div>
      
      {/* Content */}
      <div className="mt-8 text-center flex-1 ">
        <h3 className="font-bold text-xl mb-3 text-gray-800">{title}</h3>
        <p className="text-left text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
      </div>
    
      {/* Link */}
      <div className="mt-auto w-full flex justify-end">
        <a 
          href={link} 
          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1"
        >
          Kunjungi
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}