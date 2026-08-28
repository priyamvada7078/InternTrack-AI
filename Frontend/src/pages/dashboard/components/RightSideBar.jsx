import UpcomingInterviews from "./UpcomingInterviews";
import AIInsight from "./AIInsight";

export default function RightSidebar() {
  return (
    <div className="flex flex-col gap-6">
      <UpcomingInterviews />
      <AIInsight />
    </div>
  );
}