'use server';

import { endOfMonth, startOfMonth } from 'date-fns';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/globals/prisma';

// 出勤（クロックイン）処理を行う関数
// 目的: ユーザーの出勤を記録し、新しい作業エントリーを作成する
export async function clockIn(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let workDay = await prisma.workDay.findFirst({
    where: {
      userId,
      date: today,
    },
  });

  if (!workDay) {
    workDay = await prisma.workDay.create({
      data: {
        userId,
        date: today,
      },
    });
  }

  const newEntry = await prisma.workEntry.create({
    data: {
      workDayId: workDay.id,
      startTime: new Date(),
    },
  });

  return newEntry;
}

// ワークエントリー（勤退記録）を取得する関数
// 目的: 特定ユーザーの指定期間内のタイムカードエントリーを取得する
export async function getTimeCardEntries(
  userId: string,
  startDate: Date,
  endDate: Date
) {
  const entries = await prisma.workEntry.findMany({
    where: {
      workDay: {
        userId: userId,
      },
      startTime: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      startTime: 'desc',
    },
  });

  return entries;
}

// 退勤（クロックアウト）処理を行う関数
// 目的: 指定されたエントリーに退勤時間を記録する
export async function clockOut(entryId: string) {
  const updatedEntry = await prisma.workEntry.update({
    where: { id: entryId },
    data: { endTime: new Date() },
  });
  revalidatePath('/user/timecard-view');
  return updatedEntry;
}
// 最新の作業エントリーを取得する関数
// 目的: 特定ユーザーの最新の作業エントリーを取得する
export async function getLatestWorkEntry(userId: string) {
  const latestWorkDay = await prisma.workDay.findFirst({
    where: { userId },
    orderBy: { date: 'desc' },
    include: { entries: { orderBy: { startTime: 'desc' } } },
  });

  return latestWorkDay?.entries[0] || null;
}

//エディット側の関数
// 全従業員を取得する関数
// 目的: システム内の全ユーザーを名前順で取得する
export async function getAllUsers() {
  return await prisma.user.findMany({
    orderBy: { name: 'asc' },
  });
}
// ユーザーの作業日を取得する関数
// 目的: 特定ユーザーの全作業日とそのエントリーを取得する
export async function getUserWorkDays(userId: string) {
  return await prisma.workDay.findMany({
    where: { userId },
    include: { entries: true },
    orderBy: { date: 'desc' },
  });
}

// 作業エントリーを更新する関数
// 目的: 指定された作業エントリーの詳細を更新する
export async function updateWorkEntry(
  entryId: string,
  data: {
    startTime?: Date;
    endTime?: Date | null;
    breakDuration?: number | null;
  }
) {
  const updatedEntry = await prisma.workEntry.update({
    where: { id: entryId },
    data,
  });

  revalidatePath('/admin/timecard-edit');
  return updatedEntry;
}
// 特定月のユーザー作業日を取得する関数
// 目的: 指定されたユーザー、年、月の作業日とエントリーを取得する
//使用している
export async function getUserWorkDaysForMonth(
  userId: string,
  year: number,
  month: number
) {
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(new Date(year, month - 1));

  return await prisma.workDay.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: { entries: true },
    orderBy: { date: 'asc' },
  });
}

// 作業エントリーを削除する関数
// 目的: 指定された作業エントリーを削除する
//使用している
export async function deleteWorkEntry(entryId: string) {
  await prisma.workEntry.delete({
    where: { id: entryId },
  });
  revalidatePath('/admin/timecard-edit');
}
// 特定月の全作業エントリーを削除する関数
// 目的: 指定されたユーザー、年、月の全作業エントリーと作業日を削除する
//使用している
export async function deleteAllWorkEntriesForMonth(
  userId: string,
  year: number,
  month: number
) {
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(new Date(year, month - 1));

  const workDays = await prisma.workDay.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: { entries: true },
  });

  for (const workDay of workDays) {
    await prisma.workEntry.deleteMany({
      where: { workDayId: workDay.id },
    });
    await prisma.workDay.delete({
      where: { id: workDay.id },
    });
  }

  revalidatePath('/admin/timecard-edit');
}
