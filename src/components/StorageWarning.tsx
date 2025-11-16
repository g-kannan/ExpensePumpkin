/**
 * Warning component displayed when localStorage is unavailable
 */
export function StorageWarning() {
  return (
    <div className="bg-halloween-orange/20 border border-halloween-orange rounded-lg p-4 mb-6 fade-in-animation">
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">⚠️</div>
        <div>
          <h3 className="text-halloween-orange font-bold mb-1">
            Storage Unavailable
          </h3>
          <p className="text-halloween-text-light/80 text-sm">
            Your browser's local storage is not available. Your expenses will only be saved during this session 
            and will be lost when you close the page. This may happen in private/incognito mode.
          </p>
        </div>
      </div>
    </div>
  );
}
