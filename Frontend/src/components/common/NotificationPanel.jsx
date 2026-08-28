import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck, Sparkles, Calendar, CheckCircle2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: "Stripe interview tomorrow",
    description: "Technical Round 2 scheduled at 4:00 PM.",
    time: "10 minutes ago",
    read: false,
    type: "interview",
    icon: Calendar,
    iconColor: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
  },
  {
    id: 2,
    title: "Vercel OA completed",
    description: "Your Online Assessment results were recorded.",
    time: "Yesterday",
    read: false,
    type: "assessment",
    icon: CheckCircle2,
    iconColor: "bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
  },
  {
    id: 3,
    title: "New application reminder",
    description: "Consider applying to 3 backend roles this week.",
    time: "2 days ago",
    read: false,
    type: "reminder",
    icon: Sparkles,
    iconColor: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
];

export default function NotificationPanel({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const panelRef = useRef(null);
  const navigate = useNavigate();

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40 transition-all animate-in fade-in duration-200"
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                {unreadCount} new
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllAsRead}
              className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
              title="Clear all"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="mt-2 max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
        {notifications.length > 0 ? (
          notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  markAsRead(item.id);
                  onClose();
                  navigate("/applications");
                }}
                className={`flex gap-3 p-3 transition-colors rounded-xl cursor-pointer ${
                  item.read
                    ? "opacity-75 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    : "bg-slate-50/60 hover:bg-slate-100/70 dark:bg-slate-800/40 dark:hover:bg-slate-800/80"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.iconColor}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {item.title}
                    </p>
                    {!item.read && (
                      <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
                  <span className="mt-1 block text-[10px] text-slate-400 dark:text-slate-500">
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-8 text-center">
            <Bell className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600" />
            <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              No notifications
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              You're all caught up!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
