const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card">
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
              <div className="flex gap-2">
                <div className="skeleton h-5 w-16 rounded-full" />
                <div className="skeleton h-5 w-14 rounded-full" />
              </div>
            </div>
            <div className="flex gap-2 ml-3">
              <div className="skeleton h-7 w-7 rounded" />
              <div className="skeleton h-7 w-7 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
