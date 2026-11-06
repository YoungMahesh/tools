"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 3500);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast toast-bottom toast-end z-50 p-4">
        {toasts.map((toast) => {
          let alertClass = "alert-info";
          let Icon = InformationCircleIcon;
          if (toast.type === "success") {
            alertClass = "alert-success";
            Icon = CheckCircleIcon;
          } else if (toast.type === "error") {
            alertClass = "alert-error";
            Icon = ExclamationCircleIcon;
          }

          return (
            <div
              key={toast.id}
              className={`alert ${alertClass} shadow-lg flex items-center justify-between text-sm py-2 px-3 rounded-xl border border-base-content/10 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2`}
              role="alert"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 shrink-0" />
                <span className="font-medium">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="btn btn-ghost btn-xs btn-circle ml-2"
                aria-label="Close"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      showToast: (message: string) => {
        if (typeof window !== "undefined") {
          console.log("Toast:", message);
        }
      },
    };
  }
  return context;
}
