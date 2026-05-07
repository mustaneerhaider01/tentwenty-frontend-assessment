export interface AppUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface Project {
  id: number;
  name: string;
}

export interface Timesheet {
  id: number;
  userId: number;
  weekNumber: number;
  startDate: string;
  endDate: string;
}

export interface TimesheetEntry {
  id: number;
  timesheetId: number;
  projectId: number;
  date: string;
  task: string;
  hours: number;
}
