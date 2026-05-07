export const mockUsers = [
  {
    id: 1,
    username: "John Doe",
    email: "john.doe@company.com",
    password: "hashed_password_1",
  },
  {
    id: 2,
    username: "Sarah Khan",
    email: "sarah.khan@company.com",
    password: "hashed_password_2",
  },
  {
    id: 3,
    username: "Ali Ahmed",
    email: "ali.ahmed@company.com",
    password: "hashed_password_3",
  },
];

export const mockProjects = [
  {
    id: 1,
    name: "HR Portal",
  },
  {
    id: 2,
    name: "Internal Tooling",
  },
  {
    id: 3,
    name: "Marketing Site",
  },
  {
    id: 4,
    name: "CRM System",
  },
  {
    id: 5,
    name: "E-commerce App",
  },
];

export const mockTimesheets = [
  {
    id: 101,
    userId: 1,
    weekNumber: 3,
    startDate: "2024-01-15",
    endDate: "2024-01-19",
  },
  {
    id: 102,
    userId: 1,
    weekNumber: 4,
    startDate: "2024-01-22",
    endDate: "2024-01-26",
  },
  {
    id: 103,
    userId: 2,
    weekNumber: 3,
    startDate: "2024-01-15",
    endDate: "2024-01-19",
  },
  {
    id: 104,
    userId: 2,
    weekNumber: 4,
    startDate: "2024-01-22",
    endDate: "2024-01-26",
  },
  {
    id: 105,
    userId: 3,
    weekNumber: 4,
    startDate: "2024-01-22",
    endDate: "2024-01-26",
  },
  {
    id: 106,
    userId: 1,
    weekNumber: 5,
    startDate: "2024-01-27",
    endDate: "2024-02-03",
  },
];

export const mockTimesheetEntries = [
  {
    id: 1001,
    timesheetId: 101,
    projectId: 1,
    date: "2024-01-15",
    task: "Login page UI implementation",
    hours: 8,
  },
  {
    id: 1002,
    timesheetId: 101,
    projectId: 1,
    date: "2024-01-15",
    task: "API integration for auth",
    hours: 8,
  },
  {
    id: 1003,
    timesheetId: 101,
    projectId: 1,
    date: "2024-01-16",
    task: "Dashboard layout fixes",
    hours: 8,
  },
  {
    id: 1004,
    timesheetId: 101,
    projectId: 1,
    date: "2024-01-17",
    task: "Bug fixing",
    hours: 8,
  },
  {
    id: 1005,
    timesheetId: 101,
    projectId: 1,
    date: "2024-01-18",
    task: "Code review",
    hours: 8,
  },
];
