"use client";

import React from "react";

export interface ToastState {
  show: boolean;
  title: string;
  desc: string;
  isSuccess: boolean;
  refId?: string;
}

export const Toast: React.FC<{ toast: ToastState }> = ({ toast }) => {
  if (!toast.show) return null;

  return (
    <div
      id="toastNotification"
      className="fixed bottom-6 right-6 z-50 metrology-panel border border-slate-700 p-4 shadow-xl flex items-start gap-3 max-w-sm bg-slate-900 animate-fade-in"
      role="alert"
    >
      <i
        id="toastIcon"
        className={`text-xl shrink-0 mt-0.5 ${
          toast.isSuccess
            ? "fa-solid fa-circle-check text-emerald-400"
            : "fa-solid fa-triangle-exclamation text-amber-400"
        }`}
      ></i>
      <div className="font-mono text-xs">
        <div id="toastTitle" className="font-bold text-white text-sm mb-0.5">
          {toast.title}
        </div>
        <div id="toastDesc" className="text-slate-300 leading-relaxed">
          {toast.desc}
        </div>
        {toast.refId && (
          <div className="mt-1 text-[10px] text-blue-400" id="toastRefId">
            {toast.refId}
          </div>
        )}
      </div>
    </div>
  );
};
