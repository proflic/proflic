import React from "react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  cornerMarkers?: boolean;
  code?: string;
  badge?: string;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = "",
  interactive = false,
  cornerMarkers = true,
  code,
  badge,
}) => {
  return (
    <div
      className={`bento-card p-6 sm:p-7 relative overflow-hidden ${
        interactive ? "bento-card-interactive" : ""
      } ${className}`}
    >
      {/* Corner crosshairs for technical CAD/Blueprint feel */}
      {cornerMarkers && (
        <>
          <div className="corner-crosshair corner-tl" />
          <div className="corner-crosshair corner-tr" />
          <div className="corner-crosshair corner-bl" />
          <div className="corner-crosshair corner-br" />
        </>
      )}

      {/* Optional Top Technical Metadata Strip */}
      {(code || badge) && (
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-3 border-b border-slate-800/80 pb-2">
          {code && <span className="tracking-wider uppercase font-semibold">{code}</span>}
          {badge && (
            <span className="text-blue-500 dark:text-blue-400 font-bold uppercase tracking-wider">
              {badge}
            </span>
          )}
        </div>
      )}

      {children}
    </div>
  );
};
