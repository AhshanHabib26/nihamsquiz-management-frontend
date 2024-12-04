import React from "react";

interface CardProps {
  count: number;
  icon: React.ReactNode;
  color: string;
  label: string;
}

const DCountInfoCard: React.FC<CardProps> = ({ count, icon, color, label }) => {
  return (
    <div className={`shadow-xl ${color}-100 rounded-t-lg`}>
      <div className="flex items-center justify-between p-5">
        <p className={`text-4xl font-semibold text-${color}-500`}>
          {count ?? 0}
        </p>
        {icon}
      </div>
      <div className={`bg-${color}-500 p-1 rounded-b-lg`}>
        <p className="text-lg font-light text-center text-white">{label}</p>
      </div>
    </div>
  );
};

export default DCountInfoCard;
