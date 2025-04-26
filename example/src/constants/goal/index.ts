type Goal = {
  id: string;
  title: string;
  description: string;
  minValue: number;
  maxValue: number;
  currentValue?: number;
  unit?: string;
  color: string; // HEX or Tailwind-style color
};

export const goals: Goal[] = [
  {
    id: "study-hours",
    title: "Study Hours",
    description:
      "Track how many hours you’ve studied this week to stay consistent and focused.",
    minValue: 0,
    maxValue: 40,
    currentValue: 15,
    unit: "hrs",
    color: "#4F46E5", // Indigo
  },
  {
    id: "books-read",
    title: "Books Read",
    description:
      "Measure your reading progress and aim to complete your monthly reading goal.",
    minValue: 0,
    maxValue: 5,
    currentValue: 2,
    unit: "books",
    color: "#22C55E", // Green
  },
  {
    id: "practice-sessions",
    title: "Practice Sessions",
    description:
      "Count your practice sessions for skill-building, coding, or creative work.",
    minValue: 0,
    maxValue: 20,
    currentValue: 10,
    unit: "sessions",
    color: "#EC4899", // Pink
  },
  {
    id: "projects-completed",
    title: "Projects Completed",
    description:
      "Keep track of completed personal or academic projects throughout the semester.",
    minValue: 0,
    maxValue: 10,
    currentValue: 3,
    unit: "projects",
    color: "#F97316", // Orange
  },
  {
    id: "daily-checkins",
    title: "Daily Check-ins",
    description:
      "Maintain a habit of reflecting or journaling every day to boost mindfulness.",
    minValue: 0,
    maxValue: 30,
    currentValue: 18,
    unit: "days",
    color: "#0EA5E9", // Sky Blue
  },
  {
    id: "exercise-goal",
    title: "Exercise Goal",
    description:
      "Stay healthy and energized by tracking your weekly workout sessions.",
    minValue: 0,
    maxValue: 7,
    currentValue: 5,
    unit: "sessions",
    color: "#10B981", // Emerald
  },
  {
    id: "screen-time-limit",
    title: "Screen Time Limit",
    description:
      "Monitor your average daily screen time to ensure digital balance.",
    minValue: 0,
    maxValue: 5,
    currentValue: 3,
    unit: "hrs/day",
    color: "#F43F5E", // Rose
  },
];
