interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export function LoadingSpinner({ size = 'medium', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'text-3xl',
    medium: 'text-5xl',
    large: 'text-7xl'
  };

  return (
    <div className="loading-container">
      <div className={`pumpkin-spinner ${sizeClasses[size]}`}>
        🎃
      </div>
      {message && (
        <p className="text-halloween-text-light text-center font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
