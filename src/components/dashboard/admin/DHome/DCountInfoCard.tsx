import React from "react";

interface CardProps {
  count: number;
  icon: React.ReactNode;
  bColor: string;
  tColor: string;
  label: string;
}

const DCountInfoCard: React.FC<CardProps> = ({
  count,
  icon,
  bColor,
  tColor,
  label,
}) => {
  return (
    <div className={`shadow-xl border border-b rounded-t-lg`}>
      <div className="flex items-center justify-between p-5">
        <p className={`text-3xl font-semibold ${tColor}`}>{count ?? 0}</p>
        {icon}
      </div>
      <div className={`${bColor} p-1 rounded-b-lg`}>
        <p className="text-lg font-light text-center text-white">{label}</p>
      </div>
    </div>
  );
};

export default DCountInfoCard;
