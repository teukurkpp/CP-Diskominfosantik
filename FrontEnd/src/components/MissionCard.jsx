import React from 'react';

export default function MissionCard({ icon, title, description, doubleContent }) {
  const ContentBlock = ({ icon, title, description }) => (
    <div className="flex items-start gap-4">
      <div className="bg-blue-100 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md">
      {doubleContent ? (
        <div className="space-y-6">
          {doubleContent.map((content, index) => (
            <ContentBlock key={index} {...content} />
          ))}
        </div>
      ) : (
        <ContentBlock icon={icon} title={title} description={description} />
      )}
    </div>
  );
}
