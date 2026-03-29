import React from 'react';

const EmployeeCard = ({ name, position }) => {
  return (
    <div className="group perspective">
      <div className="relative w-44 h-52 transform-gpu transition-all duration-500 group-hover:rotate-y-180 preserve-3d">
        {/* Front Card */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-xl 
                      flex flex-col items-center justify-center p-4 backface-hidden">
          <div className="w-30 h-30 bg-white/10 backdrop-blur rounded-full mb-3 
                        overflow-hidden ring-2 ring-white/50 group-hover:ring-white/75 transition-all">
            <img
              src={'/src/assets/Bekasikab.png'}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-white font-semibold text-center">{name}</h3>
          <p className="text-blue-100 text-sm text-center mt-1">{position}</p>
        </div>

        {/* Back Card */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-950 rounded-xl shadow-xl 
                      flex flex-col items-center justify-center p-4 rotate-y-180 backface-hidden">
          <div className="space-y-2 text-center">
            <h4 className="text-white font-medium">Contact Info</h4>
            <p className="text-blue-200 text-sm">email@example.com</p>
            <p className="text-blue-200 text-sm">+62 123 456 789</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
