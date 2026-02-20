export function PopularServicesSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      {/* Trending Line Skeleton */}
      <div className="flex justify-center gap-4">
        <div className="h-3 w-16 bg-slate-800 rounded" />
        <div className="h-3 w-24 bg-slate-800 rounded" />
        <div className="h-3 w-24 bg-slate-800 rounded" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-[84px] w-full rounded-2xl bg-slate-900/40 border border-slate-800"
          />
        ))}
      </div>
    </div>
  );
}
