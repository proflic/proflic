import React from "react";

interface TechnicalBadgeProps {
  children: React.ReactNode;
  icon?: string;
  statusDot?: boolean;
  className?: string;
}

export const TechnicalBadge: React.FC<TechnicalBadgeProps> = ({
  children,
  icon,
  statusDot = false,
  className = "",
}) => {
  return (
    <span className={`tech-badge ${className}`}>
      {statusDot && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block shrink-0" />
      )}
      {icon && <i className={`${icon} text-[10px] shrink-0`}></i>}
      <span>{children}</span>
    </span>
  );
};
