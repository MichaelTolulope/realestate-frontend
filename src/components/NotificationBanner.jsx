import React from "react";
import { AiOutlineInfoCircle } from 'react-icons/ai';

const NotificationBanner = ({ bgColor = "bg-blue-100", textColor = "text-blue-800", text = "" }) => {
  if (!text) return null;

  return (
    <div className={`w-full py-3 px-4 mt-5 mb-10 rounded-lg flex items-center gap-2 ${bgColor}`}>
      <AiOutlineInfoCircle className={`text-2xl ${textColor}`} />
      <span className={`text-sm ${textColor}`}>{text}</span>
    </div>
  );
};

export default NotificationBanner;
