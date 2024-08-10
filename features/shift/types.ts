import { Shift as PrismaShift, ShiftStatus } from '@prisma/client';

export type User = {
  id: string;
  name: string;
  email?: string;
  shifts: Shift[];
};

export type Shift = PrismaShift;

export type ShiftTableUser = {
  id: string;
  name: string;
  shifts: Shift[];
};

export type ShiftTableProps = {
  users: ShiftTableUser[];
  year: number;
  month: number;
};

export type ShiftUpdateData = {
  date: Date;
  startTime: Date;
  endTime: Date;
  status: 'SCHEDULED' | 'CONFIRMED' | 'CANCELED';
};

export interface EditedShift {
  date: string;
  startTime: string;
  endTime: string;
  status: ShiftStatus;
}
