// import React from 'react';

// const StatCard = ({ title, value, subtitle, icon }) => {
//   return (
//     <div className="bg-white shadow rounded p-4 flex flex-col">
//       <div className="flex justify-between items-center mb-2">
//         <p className="text-gray-600 font-bold font-xl">{title}</p>
//         <img src={icon} alt="icon" className='w-16' />
//       </div>
//       <h3 className="text-3xl font-bold text-black">{value}</h3>
//       <p className="text-sm text-gray-400">{subtitle}</p>
//     </div>
//   );
// };

// export default StatCard;
import React from 'react';

const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex justify-between items-center w-full max-w-sm px-6">
      <div className="text-left">
        <p className="text-gray-600 font-semibold">{title}</p>
        <h3 className="text-2xl font-bold text-black">{value}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>

      <img src={icon} alt="icon" className="w-12 h-12 object-contain" />
    </div>
  );
};

export default StatCard;
