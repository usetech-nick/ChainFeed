const LoadingScreen = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div className="text-center text-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4" />
      <p className="text-sm">Loading content...</p>
    </div>
  </div>
);

export default LoadingScreen;
