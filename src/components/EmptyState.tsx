interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No spooky expenses yet!" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 fade-in-animation">
      <div className="text-6xl sm:text-8xl mb-4 float-slow-animation">
        👻
      </div>
      <h3 className="text-xl sm:text-2xl font-creepy text-halloween-orange mb-2 text-center">
        {message}
      </h3>
      <p className="text-sm sm:text-base text-halloween-text-light/70 text-center max-w-md">
        Start tracking your expenses by adding your first entry above. 
        Watch as the calendar fills with spooky spending data! 🎃
      </p>
    </div>
  );
}
