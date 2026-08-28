export default function Card({
  title,
  action,
  children,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <h3 className="text-sm font-semibold text-slate-800">
          {title}
        </h3>

        {action}
      </div>

      <div className="p-5">
        {children}
      </div>
    </div>
  );
}