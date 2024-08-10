'use server';
import { Shift } from '@prisma/client';
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { revalidatePath } from 'next/cache';

import { prisma } from '@/globals/prisma';

import { ShiftTableUser } from '../types';

export async function createShift(
  userId: string,
  data: {
    date: Date;
    startTime: Date;
    endTime: Date;
    status: 'SCHEDULED' | 'CONFIRMED' | 'CANCELED';
  }
) {
  const shift = await prisma.shift.create({
    data: {
      userId,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      status: data.status,
    },
  });

  revalidatePath('/admin/shift-edit');
  return shift;
}

export async function getNextShiftWithCoworkers(
  userId: string
): Promise<{ nextShift: Shift | null; coworkerCount: number }> {
  const nextShift = await prisma.shift.findFirst({
    where: {
      userId: userId,
      startTime: {
        gte: new Date(), // 現在時刻以降のシフト
      },
    },
    orderBy: {
      startTime: 'asc',
    },
  });

  if (!nextShift) {
    return { nextShift: null, coworkerCount: 0 };
  }

  const coworkerCount = await prisma.shift.count({
    where: {
      userId: { not: userId },
      startTime: { lt: nextShift.endTime },
      endTime: { gt: nextShift.startTime },
    },
  });

  return { nextShift, coworkerCount };
}

//次回のシフトを取得するために使用する関数

export async function getUpcomingShifts(
  userId: string,
  limit: number = 5
): Promise<Shift[]> {
  const shifts = await prisma.shift.findMany({
    where: {
      userId: userId,
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: 'asc',
    },
    take: limit + 1, // 最新のシフトを含めて取得
  });

  // 最初のシフト（最新のシフト）を除外
  return shifts.slice(1);
}

//直近のシフトを取得するために使用する関数
export async function getNextShift(userId: string) {
  const nextShift = await prisma.shift.findFirst({
    where: {
      userId: userId,
      date: {
        gte: new Date(), // 現在日時以降のシフト
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  return nextShift;
}

export async function getMonthlyShifts(
  year: number,
  month: number
): Promise<ShiftTableUser[]> {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      shifts: {
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        orderBy: {
          date: 'asc',
        },
        select: {
          id: true,
          date: true,
          startTime: true,
          endTime: true,
          status: true,
        },
      },
    },
  });

  return users as ShiftTableUser[];
}

export async function addShift(
  userId: string,
  startDateTime: Date,
  endDateTime: Date
) {
  const timeZone = 'Asia/Tokyo';

  console.log(
    'Server: Received start date time:',
    formatInTimeZone(startDateTime, timeZone, 'yyyy-MM-dd HH:mm:ssXXX')
  );
  console.log(
    'Server: Received end date time:',
    formatInTimeZone(endDateTime, timeZone, 'yyyy-MM-dd HH:mm:ssXXX')
  );

  // startTimeから日付部分を抽出
  const shiftDate = startOfDay(startDateTime);

  const existingShift = await prisma.shift.findFirst({
    where: {
      userId: userId,
      startTime: {
        gte: startOfDay(startDateTime),
        lt: endOfDay(startDateTime),
      },
    },
  });

  let shift;
  if (existingShift) {
    shift = await prisma.shift.update({
      where: { id: existingShift.id },
      data: {
        date: shiftDate, // startTimeから抽出した日付を使用
        startTime: startDateTime,
        endTime: endDateTime,
        status: 'SCHEDULED',
      },
    });
  } else {
    shift = await prisma.shift.create({
      data: {
        userId: userId,
        date: shiftDate, // startTimeから抽出した日付を使用
        startTime: startDateTime,
        endTime: endDateTime,
        status: 'SCHEDULED',
      },
    });
  }

  console.log('Server: Saved shift:', {
    ...shift,
    date: formatInTimeZone(shift.date, timeZone, 'yyyy-MM-dd'),
    startTime: formatInTimeZone(
      shift.startTime,
      timeZone,
      'yyyy-MM-dd HH:mm:ssXXX'
    ),
    endTime: formatInTimeZone(
      shift.endTime,
      timeZone,
      'yyyy-MM-dd HH:mm:ssXXX'
    ),
  });

  revalidatePath('/my-page/shift-edit');
  return { success: true, shift };
}

export async function updateShift(
  shiftId: string,
  data: {
    date: Date;
    startTime: Date;
    endTime: Date;
    status: 'SCHEDULED' | 'CONFIRMED' | 'CANCELED';
  }
) {
  const updatedShift = await prisma.shift.update({
    where: { id: shiftId },
    data: data,
  });
  revalidatePath('/admin/shift-edit');
  return updatedShift;
}

export async function deleteShift(shiftId: string) {
  await prisma.shift.delete({
    where: { id: shiftId },
  });
  revalidatePath('/admin/shift-edit');
}
// "use server";
// import { prisma } from "@/globals/prisma";
// import { ShiftTableUser } from "../types";
// import { revalidatePath } from "next/cache";
// import { startOfDay, setHours, setMinutes, parseISO } from "date-fns";

// const timeZone = "Asia/Tokyo";

// export async function getMonthlyShifts(
//   year: number,
//   month: number
// ): Promise<ShiftTableUser[]> {
//   const startDate = new Date(Date.UTC(year, month - 1, 1));
//   const endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));

//   const users = await prisma.user.findMany({
//     select: {
//       id: true,
//       name: true,
//       shifts: {
//         where: {
//           date: {
//             gte: startDate,
//             lte: endDate,
//           },
//         },
//         orderBy: {
//           date: "asc",
//         },
//         select: {
//           id: true,
//           date: true,
//           startTime: true,
//           endTime: true,
//           status: true,
//         },
//       },
//     },
//   });

//   return users as ShiftTableUser[];
// }

// export async function addShift(
//   userId: string,
//   year: number,
//   month: number,
//   day: string,
//   startTime: string,
//   endTime: string
// ) {
//   // 日付を正確に設定
//   const shiftDate = new Date(Date.UTC(year, month - 1, parseInt(day)));

//   const [startHours, startMinutes] = startTime.split(":").map(Number);
//   const [endHours, endMinutes] = endTime.split(":").map(Number);

//   const startDateTime = new Date(
//     Date.UTC(year, month - 1, parseInt(day), startHours, startMinutes)
//   );
//   const endDateTime = new Date(
//     Date.UTC(year, month - 1, parseInt(day), endHours, endMinutes)
//   );

//   // 同じ日付のシフトを検索（時間は考慮しない）
//   const existingShift = await prisma.shift.findFirst({
//     where: {
//       userId: userId,
//       date: {
//         gte: shiftDate,
//         lt: new Date(Date.UTC(year, month - 1, parseInt(day) + 1)), // 次の日の0時
//       },
//     },
//   });

//   let shift;
//   if (existingShift) {
//     // 既存のシフトを更新
//     shift = await prisma.shift.update({
//       where: { id: existingShift.id },
//       data: {
//         date: shiftDate,
//         startTime: startDateTime,
//         endTime: endDateTime,
//         status: "SCHEDULED", // 必要に応じてステータスを変更
//       },
//     });
//   } else {
//     // 新しいシフトを作成
//     shift = await prisma.shift.create({
//       data: {
//         userId: userId,
//         date: shiftDate,
//         startTime: startDateTime,
//         endTime: endDateTime,
//         status: "SCHEDULED",
//       },
//     });
//   }

//   revalidatePath("/my-page/shift-edit");
//   return { success: true, shift };
// }

// // deleteShift 関数は変更なし

// export async function updateShift(
//   shiftId: string,
//   data: {
//     date: Date;
//     startTime: Date;
//     endTime: Date;
//     status: "SCHEDULED" | "CONFIRMED" | "CANCELED";
//   }
// ) {
//   const updatedData = {
//     ...data,
//     date: new Date(
//       Date.UTC(
//         data.date.getFullYear(),
//         data.date.getMonth(),
//         data.date.getDate()
//       )
//     ),
//     startTime: new Date(
//       Date.UTC(
//         data.startTime.getFullYear(),
//         data.startTime.getMonth(),
//         data.startTime.getDate(),
//         data.startTime.getHours(),
//         data.startTime.getMinutes()
//       )
//     ),
//     endTime: new Date(
//       Date.UTC(
//         data.endTime.getFullYear(),
//         data.endTime.getMonth(),
//         data.endTime.getDate(),
//         data.endTime.getHours(),
//         data.endTime.getMinutes()
//       )
//     ),
//   };

//   const updatedShift = await prisma.shift.update({
//     where: { id: shiftId },
//     data: updatedData,
//   });
//   revalidatePath("/my-page/shift-edit");
//   return updatedShift;
// }

// export async function deleteShift(shiftId: string) {
//   await prisma.shift.delete({
//     where: { id: shiftId },
//   });
//   revalidatePath("/my-page/shift-edit");
// }

// "use server";
// import { prisma } from "@/globals/prisma";
// import { ShiftTableUser } from "../types";
// import { revalidatePath } from "next/cache";
// import { startOfDay, setHours, setMinutes } from "date-fns";
// export async function getMonthlyShifts(
//   year: number,
//   month: number
// ): Promise<ShiftTableUser[]> {
//   const startDate = new Date(year, month - 1, 1);
//   const endDate = new Date(year, month, 0);

//   const users = await prisma.user.findMany({
//     select: {
//       id: true,
//       name: true,
//       shifts: {
//         where: {
//           date: {
//             gte: startDate,
//             lte: endDate,
//           },
//         },
//         orderBy: {
//           date: "asc",
//         },
//         select: {
//           id: true,
//           date: true,
//           startTime: true,
//           endTime: true,
//           status: true,
//         },
//       },
//     },
//   });

//   return users as ShiftTableUser[];
// }

// export async function addShift(
//   userId: string,
//   year: number,
//   month: number,
//   day: string,
//   startTime: string,
//   endTime: string
// ) {
//   // 日付を正確に設定
//   const shiftDate = startOfDay(new Date(year, month - 1, parseInt(day)));

//   const [startHours, startMinutes] = startTime.split(":").map(Number);
//   const [endHours, endMinutes] = endTime.split(":").map(Number);

//   const startDateTime = setMinutes(
//     setHours(shiftDate, startHours),
//     startMinutes
//   );
//   const endDateTime = setMinutes(setHours(shiftDate, endHours), endMinutes);

//   // 同じ日付のシフトを検索（時間は考慮しない）
//   const existingShift = await prisma.shift.findFirst({
//     where: {
//       userId: userId,
//       date: {
//         gte: shiftDate,
//         lt: new Date(shiftDate.getTime() + 24 * 60 * 60 * 1000), // 次の日の0時
//       },
//     },
//   });

//   let shift;
//   if (existingShift) {
//     // 既存のシフトを更新
//     shift = await prisma.shift.update({
//       where: { id: existingShift.id },
//       data: {
//         date: shiftDate,
//         startTime: startDateTime,
//         endTime: endDateTime,
//         status: "SCHEDULED", // 必要に応じてステータスを変更
//       },
//     });
//   } else {
//     // 新しいシフトを作成
//     shift = await prisma.shift.create({
//       data: {
//         userId: userId,
//         date: shiftDate,
//         startTime: startDateTime,
//         endTime: endDateTime,
//         status: "SCHEDULED",
//       },
//     });
//   }

//   revalidatePath("/my-page/shift-edit");
//   return { success: true, shift };
// }
// export async function deleteShift(shiftId: string) {
//   await prisma.shift.delete({
//     where: { id: shiftId },
//   });
//   revalidatePath("/my-page/shift-edit");
// }

// export async function updateShift(
//   shiftId: string,
//   data: {
//     date: Date;
//     startTime: Date;
//     endTime: Date;
//     status: "SCHEDULED" | "CONFIRMED" | "CANCELED";
//   }
// ) {
//   const updatedShift = await prisma.shift.update({
//     where: { id: shiftId },
//     data: data,
//   });
//   revalidatePath("/my-page/shift-edit");
//   return updatedShift;
// }
