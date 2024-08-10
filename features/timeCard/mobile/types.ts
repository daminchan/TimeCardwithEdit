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

export interface TimeCardEditPanelProps {
  users: User[];
}

export interface TimeCardEditTableProps {
  user: User;
  workDays: (WorkDay & { entries: WorkEntry[] })[];
  onDelete: () => void;
}

export interface FormattedWorkEntry {
  id: string;
  date: string;
  startTime: string;
  endTime: string | null;
  breakDuration: number | null;
}

export type WorkDayWithEntries = WorkDay & { entries: WorkEntry[] };

// 新しく追加する型定義
export interface TimeCardViewProps {
  user: User;
  latestEntry: WorkEntry | null;
  entries: WorkEntry[];
}

export interface TimeCardAction {
  label: string;
  onClick: () => Promise<void>;
  isDisabled: boolean;
  colorScheme: string;
}
