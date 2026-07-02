import {
  isValidJalaaliDate,
  jalaaliMonthLength,
  toGregorian,
  toJalaali,
} from "jalaali-js";

export const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const gregorianMonths = [
  "ژانویه",
  "فوریه",
  "مارس",
  "آوریل",
  "مه",
  "ژوئن",
  "ژوئیه",
  "اوت",
  "سپتامبر",
  "اکتبر",
  "نوامبر",
  "دسامبر",
];

const faDigits = "۰۱۲۳۴۵۶۷۸۹";

export function toEnglishDigits(value: string) {
  return value
    .replace(/[۰-۹]/g, (digit) => String(faDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

export function toPersianDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => faDigits[Number(digit)]);
}

export function swapDigits(value: string, target: "fa" | "en") {
  if (target === "en") {
    return toEnglishDigits(value);
  }

  return value.replace(/\d/g, (digit) => faDigits[Number(digit)]);
}

export function parseNumber(value: string | number | undefined) {
  const normalized = toEnglishDigits(String(value ?? "")).replace(/,/g, "");
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : NaN;
}

export function formatNumber(value: number, digits = 2) {
  if (!Number.isFinite(value)) {
    return "نامعتبر";
  }

  const fixed =
    Math.abs(value) >= 1000 || Number.isInteger(value)
      ? value
      : Number(value.toFixed(digits));

  return fixed.toLocaleString("en-US", {
    maximumFractionDigits: digits,
  });
}

export function requireNumbers(
  values: Record<string, string>,
  keys: string[]
) {
  const parsed = Object.fromEntries(
    keys.map((key) => [key, parseNumber(values[key])])
  ) as Record<string, number>;
  const valid = keys.every((key) => Number.isFinite(parsed[key]));

  return valid ? parsed : null;
}

export function todayJalaali(date = new Date()) {
  return toJalaali(date);
}

export function gregorianDateFromInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

export function gregorianToJalaaliDate(date: Date) {
  return toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export function jalaaliToGregorianDate(
  year: number,
  month: number,
  day: number
) {
  if (!isValidJalaaliDate(year, month, day)) {
    return null;
  }

  const gregorian = toGregorian(year, month, day);
  return new Date(gregorian.gy, gregorian.gm - 1, gregorian.gd);
}

export function formatGregorian(date: Date) {
  return date.toLocaleDateString("en-CA");
}

export function formatJalaali(date: Date) {
  const value = gregorianToJalaaliDate(date);
  return `${value.jy}/${String(value.jm).padStart(2, "0")}/${String(
    value.jd
  ).padStart(2, "0")}`;
}

export function formatIslamic(date: Date) {
  return new Intl.DateTimeFormat("fa-IR-u-ca-islamic", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function diffDates(start: Date, end: Date) {
  if (start > end) {
    return null;
  }

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays };
}

export function buildJalaaliMonth(year: number, month: number) {
  const days = jalaaliMonthLength(year, month);
  const firstGregorian = toGregorian(year, month, 1);
  const firstDate = new Date(
    firstGregorian.gy,
    firstGregorian.gm - 1,
    firstGregorian.gd
  );
  const offset = (firstDate.getDay() + 1) % 7;

  return {
    days,
    offset,
    cells: Array.from({ length: offset + days }, (_, index) =>
      index < offset ? null : index - offset + 1
    ),
  };
}

const persianOnes = [
  "",
  "یک",
  "دو",
  "سه",
  "چهار",
  "پنج",
  "شش",
  "هفت",
  "هشت",
  "نه",
];
const persianTeens = [
  "ده",
  "یازده",
  "دوازده",
  "سیزده",
  "چهارده",
  "پانزده",
  "شانزده",
  "هفده",
  "هجده",
  "نوزده",
];
const persianTens = [
  "",
  "",
  "بیست",
  "سی",
  "چهل",
  "پنجاه",
  "شصت",
  "هفتاد",
  "هشتاد",
  "نود",
];
const persianHundreds = [
  "",
  "یکصد",
  "دویست",
  "سیصد",
  "چهارصد",
  "پانصد",
  "ششصد",
  "هفتصد",
  "هشتصد",
  "نهصد",
];
const persianScales = ["", "هزار", "میلیون", "میلیارد", "تریلیون"];

function chunkToPersian(num: number) {
  const parts: string[] = [];
  const hundred = Math.floor(num / 100);
  const rest = num % 100;

  if (hundred) {
    parts.push(persianHundreds[hundred]);
  }

  if (rest >= 10 && rest < 20) {
    parts.push(persianTeens[rest - 10]);
  } else {
    const ten = Math.floor(rest / 10);
    const one = rest % 10;
    if (ten) {
      parts.push(persianTens[ten]);
    }
    if (one) {
      parts.push(persianOnes[one]);
    }
  }

  return parts.join(" و ");
}

export function numberToPersianWords(input: string | number) {
  const value = Math.trunc(Math.abs(parseNumber(input)));
  if (!Number.isFinite(value)) {
    return "نامعتبر";
  }
  if (value === 0) {
    return "صفر";
  }

  const chunks: string[] = [];
  let remaining = value;
  let scale = 0;

  while (remaining > 0) {
    const chunk = remaining % 1000;
    if (chunk) {
      const label = persianScales[scale];
      chunks.unshift(`${chunkToPersian(chunk)}${label ? ` ${label}` : ""}`);
    }
    remaining = Math.floor(remaining / 1000);
    scale += 1;
  }

  return `${parseNumber(input) < 0 ? "منفی " : ""}${chunks.join(" و ")}`;
}

const englishSmall = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const englishTens = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];
const englishScales = ["", "thousand", "million", "billion", "trillion"];

function chunkToEnglish(num: number) {
  const parts: string[] = [];
  const hundred = Math.floor(num / 100);
  const rest = num % 100;

  if (hundred) {
    parts.push(`${englishSmall[hundred]} hundred`);
  }

  if (rest) {
    if (rest < 20) {
      parts.push(englishSmall[rest]);
    } else {
      const ten = Math.floor(rest / 10);
      const one = rest % 10;
      parts.push(`${englishTens[ten]}${one ? `-${englishSmall[one]}` : ""}`);
    }
  }

  return parts.join(" ");
}

export function numberToEnglishWords(input: string | number) {
  const value = Math.trunc(Math.abs(parseNumber(input)));
  if (!Number.isFinite(value)) {
    return "invalid";
  }
  if (value === 0) {
    return "zero";
  }

  const chunks: string[] = [];
  let remaining = value;
  let scale = 0;

  while (remaining > 0) {
    const chunk = remaining % 1000;
    if (chunk) {
      const label = englishScales[scale];
      chunks.unshift(`${chunkToEnglish(chunk)}${label ? ` ${label}` : ""}`);
    }
    remaining = Math.floor(remaining / 1000);
    scale += 1;
  }

  return `${parseNumber(input) < 0 ? "minus " : ""}${chunks.join(" ")}`;
}

export function factorsOf(value: number) {
  const limit = Math.abs(Math.trunc(value));
  const result: number[] = [];

  for (let index = 1; index <= limit; index += 1) {
    if (limit % index === 0) {
      result.push(index);
    }
  }

  return result;
}
