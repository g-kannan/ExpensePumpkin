import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch React errors and display a Halloween-themed error message
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    // Reload the page to reset the app state
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-halloween-charcoal to-halloween-purple-dark flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-halloween-gray-dark rounded-lg shadow-xl border border-halloween-purple/30 p-6 sm:p-8 text-center">
            <div className="text-6xl sm:text-8xl mb-4 animate-pulse">
              💀
            </div>
            <h2 className="text-2xl sm:text-3xl font-creepy text-halloween-orange mb-4">
              Something Spooky Happened!
            </h2>
            <p className="text-halloween-text-light/80 mb-6">
              The app encountered a frightening error. Don't worry, your data is safe in the shadows.
            </p>
            {this.state.error && (
              <div className="bg-halloween-charcoal/50 rounded p-3 mb-6 text-left">
                <p className="text-xs text-halloween-text-light/60 font-mono break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="bg-halloween-orange hover:bg-halloween-orange-bright text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,107,53,0.6)] w-full"
            >
              🎃 Return from the Dead
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
