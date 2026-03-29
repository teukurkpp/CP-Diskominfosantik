import React from 'react';
import InfoCard from './InfoCard';

export default function ContentSection({ title, items, onItemClick }) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-blue-900 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <InfoCard 
            key={index} 
            {...item} 
            onDetailClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </section>
  );
}
