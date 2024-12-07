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
        <div>
          <p className={`text-3xl font-semibold ${tColor}`}>{count ?? 0}</p>
          <p className={`text-xl font-medium text-center ${tColor}`}>{label}</p>
        </div>
        <div>
          <p>{icon}</p>
        </div>
      </div>
      <div className={`${bColor} p-1 rounded-b-lg`}></div>
    </div>
  );
};

export default DCountInfoCard;
