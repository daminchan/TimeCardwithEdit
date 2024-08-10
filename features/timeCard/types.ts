import { WorkDay, WorkEntry } from '@prisma/client';
import { User } from 'next-auth';

export interface TimeCardViewTableProps {
  entries: WorkEntry[];
}

export interface FormattedTimeCardEntry {
  date: string;
  startTime: string;
  endTime: string;
  breakDuration: string;
  workTime: string;
}
///エディット
export interface TimeCardEditPanelProps {
  users: User[];
}

export interface TimeCardEditTableProps {
  user: User;
  workDays: (WorkDay & { entries: WorkEntry[] })[];
  onDelete: () => void;
}

export interface TimeCardViewProps {
  user: User; // User型をそのまま使用
  latestEntry: WorkEntry | null;
  entries: WorkEntry[];
}

export interface FormattedWorkEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string | null;
  breakDuration: number | null;
}

export type WorkDayWithEntries = WorkDay & { entries: WorkEntry[] };
