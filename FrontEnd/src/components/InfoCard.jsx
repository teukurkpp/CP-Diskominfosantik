import React from 'react';

export default function InfoCard({ name, date, description, image, onDetailClick }) {
  return (
    <div className="bg-white rounded-3xl border-4 border-blue-200 shadow-lg overflow-hidden p-4">
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-1/3 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </div>
        
        {/* Content */}
        <div className="w-2/3 flex flex-col">
          <h3 className="font-bold text-gray-800 mb-1">{name}</h3>
          <span className="text-sm text-gray-500 mb-2">{date}</span>
          <p className="text-gray-700 text-sm mb-4">{description}</p>
          <div className="mt-auto flex justify-end">
            <button
              onClick={onDetailClick}
              className="bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
            >
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
