"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "error" | "success" | "info";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "error",
  onClose,
  duration = 3000
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "error"
      ? "bg-red-500"
      : type === "success"
        ? "bg-green-500"
        : "bg-blue-500";

  return (
    <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 animate-fade-in">
      <div
        className={`${bgColor} rounded-lg px-6 py-4 text-white shadow-lg transition-all`}
      >
        <p className="text-center font-medium">{message}</p>
      </div>
    </div>
  );
}
