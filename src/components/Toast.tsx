import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

/**
 * Toast notification component for displaying temporary messages
 */
export function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-600/90 border-green-500',
    error: 'bg-red-600/90 border-red-500',
    warning: 'bg-halloween-orange/90 border-halloween-orange-bright',
    info: 'bg-halloween-purple/90 border-halloween-purple-dark',
  };

  const typeIcons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  return (
    <div className="fixed top-4 right-4 z-50 fade-in-animation slide-up-animation">
      <div className={`${typeStyles[type]} border-2 rounded-lg shadow-2xl p-4 max-w-md min-w-[300px]`}>
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0">{typeIcons[type]}</div>
          <div className="flex-1">
            <p className="text-white font-medium text-sm">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl leading-none flex-shrink-0 transition-colors"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
