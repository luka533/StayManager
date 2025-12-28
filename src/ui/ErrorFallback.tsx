function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="pt-15 text-center">
      <h1 className="text-3xl pb-10">Something went wrong</h1>
      <p className="text-xl pb-8">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="text-xl min-w-28 px-4 py-2 rounded-lg font-medium transition cursor-pointer bg-emerald-500 text-white hover:bg-emerald-600"
      >
        Try again
      </button>
    </div>
  );
}

export default ErrorFallback;
