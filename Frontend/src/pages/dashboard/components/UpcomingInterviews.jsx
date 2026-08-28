import { Calendar, Clock } from "lucide-react";
import Card from "./Card";
import { UPCOMING_INTERVIEWS } from "../data/dashboardData";

export default function UpcomingInterviews() {
  return (
    <Card title="Upcoming Interviews">
      <div className="flex flex-col gap-4">
        {UPCOMING_INTERVIEWS.map((interview) => (
          <div
            key={`${interview.company}-${interview.date}`}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Calendar className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-800">
                {interview.company}
              </p>

              <p className="truncate text-xs text-slate-400">
                {interview.role}
              </p>
            </div>

            <div className="flex flex-col items-end text-xs text-slate-500">
              <span className="font-medium">
                {interview.date}
              </span>

              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="h-3 w-3" />
                {interview.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}