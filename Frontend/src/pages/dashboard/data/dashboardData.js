import {
  FileStack,
  Users,
  Award,
  XCircle,
  Send,
  CheckCircle2,
  FileEdit,
  Building2,
  Target,
  Sparkles,
} from "lucide-react";

export const CAREER_MOMENTUM = {
  score: 72,
  maxScore: 100,
  statusText: "You're building strong momentum.",
  aiExplanation:
    "Your momentum increased this week because you completed 3 assessments and reached 2 interview stages.",
  metrics: {
    applications: 42,
    responseRate: "21%",
    interviews: 9,
    offers: 3,
  },
  weeklyGrowth: "+14%",
};

export const NEXT_MOVES = [
  {
    id: 1,
    title: "Apply to 3 more backend roles",
    description:
      "Your backend applications have a higher response rate than frontend roles.",
    actionText: "Find roles",
    priority: "High Priority",
    priorityBg: "bg-indigo-50 text-indigo-700 border-indigo-200/60",
    icon: Target,
    iconBg: "bg-indigo-100/80 text-indigo-600",
    actionLink: "/applications",
  },
  {
    id: 2,
    title: "Update your resume",
    description:
      "Your latest projects are missing from the resume used for 4 applications.",
    actionText: "Update resume",
    priority: "Recommended",
    priorityBg: "bg-teal-50 text-teal-700 border-teal-200/60",
    icon: FileEdit,
    iconBg: "bg-teal-100/80 text-teal-600",
    actionLink: "/profile",
  },
  {
    id: 3,
    title: "Prepare for Stripe interview",
    description:
      "Your technical round is coming up. Start with arrays, graphs and system design.",
    actionText: "Prepare",
    priority: "Upcoming",
    priorityBg: "bg-amber-50 text-amber-700 border-amber-200/60",
    icon: Sparkles,
    iconBg: "bg-amber-100/80 text-amber-600",
    actionLink: "/applications",
  },
];

export const APPLICATION_JOURNEY = {
  stages: [
    { key: "Applied", label: "Applied", count: 42, color: "indigo" },
    { key: "OA", label: "Online Assessment", count: 8, color: "amber" },
    { key: "Interview", label: "Interview", count: 9, color: "purple" },
    { key: "Offer", label: "Offer", count: 3, color: "emerald" },
  ],
  recentMovement: [
    {
      id: 1,
      company: "Stripe",
      role: "SDE Intern",
      status: "Interview",
      dateAgo: "2 days ago",
      initial: "S",
      bgTint: "bg-indigo-600",
    },
    {
      id: 2,
      company: "Vercel",
      role: "Frontend Intern",
      status: "Online Assessment",
      dateAgo: "4 days ago",
      initial: "V",
      bgTint: "bg-slate-900",
    },
    {
      id: 3,
      company: "Notion",
      role: "Product Intern",
      status: "Applied",
      dateAgo: "5 days ago",
      initial: "N",
      bgTint: "bg-teal-600",
    },
  ],
};

export const STATS = [
  {
    label: "Total Applications",
    value: 42,
    description: "Across 28 companies",
    trend: { direction: "up", value: "+12%" },
    icon: FileStack,
    tint: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Interviews",
    value: 9,
    description: "3 scheduled this week",
    trend: { direction: "up", value: "+4%" },
    icon: Users,
    tint: "bg-amber-50 text-amber-600",
  },
  {
    label: "Offers",
    value: 3,
    description: "2 pending decision",
    trend: { direction: "up", value: "+2" },
    icon: Award,
    tint: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Rejections",
    value: 11,
    description: "26% of total applications",
    trend: { direction: "down", value: "-3%" },
    icon: XCircle,
    tint: "bg-rose-50 text-rose-600",
  },
];

export const STATUS_STYLES = {
  Applied: "bg-slate-100 text-slate-700 border-slate-200",
  OA: "bg-amber-50 text-amber-700 border-amber-200/80",
  "Online Assessment": "bg-amber-50 text-amber-700 border-amber-200/80",
  Interview: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
  Rejected: "bg-rose-50 text-rose-700 border-rose-200/80",
  Offer: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
};

export const APPLICATIONS = [
  {
    company: "Stripe",
    role: "SDE Intern",
    status: "Interview",
    date: "Jul 18, 2026",
  },
  {
    company: "Vercel",
    role: "Frontend Intern",
    status: "OA",
    date: "Jul 16, 2026",
  },
  {
    company: "Notion",
    role: "Product Intern",
    status: "Applied",
    date: "Jul 15, 2026",
  },
  {
    company: "Linear",
    role: "Design Engineer Intern",
    status: "Offer",
    date: "Jul 11, 2026",
  },
  {
    company: "Figma",
    role: "Frontend Intern",
    status: "Rejected",
    date: "Jul 09, 2026",
  },
  {
    company: "Razorpay",
    role: "Backend Intern",
    status: "OA",
    date: "Jul 07, 2026",
  },
];

export const UPCOMING_INTERVIEWS = [
  {
    company: "Stripe",
    role: "Technical Round 2",
    date: "Jul 28",
    time: "4:00 PM",
  },
  {
    company: "Deel",
    role: "HR Screening",
    date: "Jul 29",
    time: "11:30 AM",
  },
  {
    company: "Postman",
    role: "System Design",
    date: "Aug 01",
    time: "3:00 PM",
  },
];

export const ACTIVITY = [
  {
    id: 1,
    icon: Send,
    text: "Applied to Backend Intern role at Razorpay",
    time: "2 hours ago",
    type: "applied",
  },
  {
    id: 2,
    icon: CheckCircle2,
    text: "Cleared OA round for Vercel",
    time: "Yesterday",
    type: "assessment",
  },
  {
    id: 3,
    icon: FileEdit,
    text: "Updated resume with new project",
    time: "2 days ago",
    type: "resume",
  },
  {
    id: 4,
    icon: Building2,
    text: "Received offer from Linear",
    time: "5 days ago",
    type: "offer",
  },
];