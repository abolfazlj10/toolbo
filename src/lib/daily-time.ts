import {
  formatGregorian,
  formatJalaali,
  gregorianToJalaaliDate,
  jalaaliToGregorianDate,
  persianMonths,
  toPersianDigits,
} from "@/lib/tool-utils";

export type CalendarEventType = "holiday" | "event";

export type JalaaliCalendarEvent = {
  month: number;
  day: number;
  title: string;
  type: CalendarEventType;
  note?: string;
};

export type UpcomingCalendarEvent = JalaaliCalendarEvent & {
  date: Date;
  offsetDays: number;
  jalaaliLabel: string;
  gregorianLabel: string;
  weekday: string;
};

export type WorkingDayOptions = {
  excludeThursdays: boolean;
  includeFixedOfficialHolidays: boolean;
};

export type WorkingDaySummary = {
  totalDays: number;
  workingDays: number;
  nonWorkingDays: number;
  fridayCount: number;
  thursdayCount: number;
  fixedHolidayCount: number;
};

export type TimeZoneItem = {
  id: string;
  label: string;
  city: string;
};

export const fixedJalaaliCalendarEvents: JalaaliCalendarEvent[] = [
  { month: 1, day: 1, title: "عید نوروز", type: "holiday" },
  { month: 1, day: 2, title: "عید نوروز", type: "holiday" },
  { month: 1, day: 3, title: "عید نوروز", type: "holiday" },
  { month: 1, day: 4, title: "عید نوروز", type: "holiday" },
  { month: 1, day: 12, title: "روز جمهوری اسلامی ایران", type: "holiday" },
  { month: 1, day: 13, title: "روز طبیعت", type: "holiday" },
  { month: 2, day: 1, title: "روز بزرگداشت سعدی", type: "event" },
  { month: 2, day: 10, title: "روز ملی خلیج فارس", type: "event" },
  { month: 2, day: 15, title: "روز شیراز", type: "event" },
  { month: 2, day: 25, title: "روز بزرگداشت فردوسی", type: "event" },
  { month: 3, day: 3, title: "سالروز آزادسازی خرمشهر", type: "event" },
  { month: 3, day: 14, title: "رحلت امام خمینی", type: "holiday" },
  { month: 3, day: 15, title: "قیام ۱۵ خرداد", type: "holiday" },
  { month: 4, day: 14, title: "روز قلم", type: "event" },
  { month: 5, day: 17, title: "روز خبرنگار", type: "event" },
  { month: 6, day: 1, title: "روز پزشک", type: "event" },
  { month: 6, day: 4, title: "روز کارمند", type: "event" },
  { month: 6, day: 13, title: "روز تعاون", type: "event" },
  { month: 6, day: 27, title: "روز شعر و ادب فارسی", type: "event" },
  { month: 7, day: 8, title: "روز بزرگداشت مولوی", type: "event" },
  { month: 8, day: 13, title: "روز دانش‌آموز", type: "event" },
  { month: 8, day: 24, title: "روز کتاب و کتابخوانی", type: "event" },
  { month: 9, day: 16, title: "روز دانشجو", type: "event" },
  { month: 10, day: 5, title: "روز ایمنی در برابر زلزله", type: "event" },
  { month: 11, day: 22, title: "پیروزی انقلاب اسلامی", type: "holiday" },
  { month: 12, day: 29, title: "روز ملی شدن صنعت نفت ایران", type: "holiday" },
];

export const worldTimeZones: TimeZoneItem[] = [
  { id: "Asia/Tehran", label: "تهران", city: "ایران" },
  { id: "UTC", label: "UTC", city: "زمان هماهنگ جهانی" },
  { id: "Europe/London", label: "لندن", city: "بریتانیا" },
  { id: "Europe/Istanbul", label: "استانبول", city: "ترکیه" },
  { id: "Asia/Dubai", label: "دبی", city: "امارات" },
  { id: "Europe/Berlin", label: "برلین", city: "آلمان" },
  { id: "America/New_York", label: "نیویورک", city: "آمریکا" },
  { id: "America/Los_Angeles", label: "لس‌آنجلس", city: "آمریکا" },
  { id: "America/Toronto", label: "تورنتو", city: "کانادا" },
  { id: "Asia/Kolkata", label: "دهلی", city: "هند" },
  { id: "Asia/Shanghai", label: "شانگهای", city: "چین" },
  { id: "Asia/Tokyo", label: "توکیو", city: "ژاپن" },
  { id: "Australia/Sydney", label: "سیدنی", city: "استرالیا" },
];

const weekdayFormatter = new Intl.DateTimeFormat("fa-IR", {
  weekday: "long",
});

const timeFormatterOptions: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
};

const dateFormatterOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export function startOfLocalDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addCalendarDays(date: Date, days: number) {
  const next = startOfLocalDay(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function getJalaaliDateLabel(date: Date) {
  const jalaali = gregorianToJalaaliDate(date);
  return `${toPersianDigits(jalaali.jd)} ${
    persianMonths[jalaali.jm - 1]
  } ${toPersianDigits(jalaali.jy)}`;
}

export function getEventsForJalaaliDate(month: number, day: number) {
  return fixedJalaaliCalendarEvents.filter(
    (event) => event.month === month && event.day === day
  );
}

export function getEventsForDate(date: Date) {
  const jalaali = gregorianToJalaaliDate(date);
  return getEventsForJalaaliDate(jalaali.jm, jalaali.jd);
}

export function isFriday(date: Date) {
  return date.getDay() === 5;
}

export function isThursday(date: Date) {
  return date.getDay() === 4;
}

export function hasFixedOfficialHoliday(date: Date) {
  return getEventsForDate(date).some((event) => event.type === "holiday");
}

export function isNonWorkingDay(date: Date, options: WorkingDayOptions) {
  return (
    isFriday(date) ||
    (options.excludeThursdays && isThursday(date)) ||
    (options.includeFixedOfficialHolidays && hasFixedOfficialHoliday(date))
  );
}

export function countWorkingDays(
  start: Date,
  end: Date,
  options: WorkingDayOptions
): WorkingDaySummary {
  const first = startOfLocalDay(start <= end ? start : end);
  const last = startOfLocalDay(start <= end ? end : start);
  const summary: WorkingDaySummary = {
    totalDays: 0,
    workingDays: 0,
    nonWorkingDays: 0,
    fridayCount: 0,
    thursdayCount: 0,
    fixedHolidayCount: 0,
  };

  for (
    let cursor = first;
    cursor <= last;
    cursor = addCalendarDays(cursor, 1)
  ) {
    const friday = isFriday(cursor);
    const thursday = isThursday(cursor);
    const fixedHoliday = hasFixedOfficialHoliday(cursor);
    const nonWorking =
      friday ||
      (options.excludeThursdays && thursday) ||
      (options.includeFixedOfficialHolidays && fixedHoliday);

    summary.totalDays += 1;
    summary.fridayCount += friday ? 1 : 0;
    summary.thursdayCount += thursday ? 1 : 0;
    summary.fixedHolidayCount += fixedHoliday ? 1 : 0;
    summary.workingDays += nonWorking ? 0 : 1;
    summary.nonWorkingDays += nonWorking ? 1 : 0;
  }

  return summary;
}

export function getUpcomingJalaaliEvents(date: Date, daysAhead = 45) {
  const start = startOfLocalDay(date);
  const upcoming: UpcomingCalendarEvent[] = [];

  for (let offset = 0; offset <= daysAhead; offset += 1) {
    const target = addCalendarDays(start, offset);
    const events = getEventsForDate(target);

    for (const event of events) {
      upcoming.push({
        ...event,
        date: target,
        offsetDays: offset,
        jalaaliLabel: getJalaaliDateLabel(target),
        gregorianLabel: formatGregorian(target),
        weekday: weekdayFormatter.format(target),
      });
    }
  }

  return upcoming;
}

export function getFixedHolidayRows(year: number) {
  return fixedJalaaliCalendarEvents
    .filter((event) => event.type === "holiday")
    .flatMap((event) => {
      const date = jalaaliToGregorianDate(year, event.month, event.day);

      if (!date) return [];

      return [
        {
          ...event,
          date,
          jalaaliLabel: `${toPersianDigits(event.day)} ${
            persianMonths[event.month - 1]
          } ${toPersianDigits(year)}`,
          gregorianLabel: formatGregorian(date),
          weekday: weekdayFormatter.format(date),
        },
      ];
    });
}

export function getDefaultCountdownDate(from = new Date()) {
  const jalaali = gregorianToJalaaliDate(from);
  const nextNowruzYear =
    jalaali.jm === 1 && jalaali.jd === 1
      ? jalaali.jy + 1
      : jalaali.jm > 1 || (jalaali.jm === 1 && jalaali.jd > 1)
        ? jalaali.jy + 1
        : jalaali.jy;

  return jalaaliToGregorianDate(nextNowruzYear, 1, 1) ?? addCalendarDays(from, 30);
}

export function getCountdownPresets(from = new Date()) {
  const jalaali = gregorianToJalaaliDate(from);
  const candidateYears = [jalaali.jy, jalaali.jy + 1];

  return fixedJalaaliCalendarEvents
    .filter((event) => event.type === "holiday")
    .flatMap((event) =>
      candidateYears.flatMap((year) => {
        const date = jalaaliToGregorianDate(year, event.month, event.day);
        return date && date > from ? [{ ...event, date, year }] : [];
      })
    )
    .sort((first, second) => first.date.getTime() - second.date.getTime())
    .slice(0, 5);
}

export function formatDurationParts(totalMilliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(totalMilliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export function formatTimeInZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    ...timeFormatterOptions,
    timeZone,
  }).format(date);
}

export function formatDateInZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    ...dateFormatterOptions,
    timeZone,
  }).format(date);
}

export function getTimeZoneOffsetMinutes(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)])
  );
  const zoneTime = Date.UTC(
    values.year,
    values.month - 1,
    values.day,
    values.hour,
    values.minute,
    values.second
  );

  return Math.round((zoneTime - date.getTime()) / 60000);
}

export function getTimeZoneDifferenceMinutes(
  date: Date,
  fromTimeZone: string,
  toTimeZone: string
) {
  return (
    getTimeZoneOffsetMinutes(date, toTimeZone) -
    getTimeZoneOffsetMinutes(date, fromTimeZone)
  );
}

export function formatMinuteDifference(minutes: number) {
  const sign = minutes > 0 ? "+" : minutes < 0 ? "-" : "";
  const absolute = Math.abs(minutes);
  const hours = Math.floor(absolute / 60);
  const remainingMinutes = absolute % 60;

  if (absolute === 0) {
    return "بدون اختلاف";
  }

  return `${sign}${toPersianDigits(hours)} ساعت و ${toPersianDigits(
    remainingMinutes
  )} دقیقه`;
}

export function describeDate(date: Date) {
  return {
    jalaali: formatJalaali(date),
    gregorian: formatGregorian(date),
    weekday: weekdayFormatter.format(date),
  };
}
