import React, { useState } from 'react';

const RadioCheckbox = ({checked, setChecked}) => {

  const toggleChecked = () => {
    setChecked(!checked);
}

  return (
    <div
      className={`w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center cursor-pointer transition-colors duration-200 ${
        checked ? 'bg-black border-black' : 'bg-white'
      }`}
      onClick={toggleChecked}
    >
      {checked && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
    </div>
  );
};

export default RadioCheckbox;
