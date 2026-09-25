"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowLeftRight,
  Check,
  ChevronLeft,
  CircleHelp,
  Copy,
  Info,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Star,
  WandSparkles,
  Wrench,
} from "lucide-react";
import { ResultActions } from "@/components/result-actions";
import { useRecentTools } from "@/components/recent-tools-provider";
import { ToolHistory, useToolHistory } from "@/components/tool-history";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFavorites } from "@/components/favorites-provider";
import { ToolCard } from "@/components/tool-card";
import {
  CountdownTool,
  DateOffsetTool,
  EventsTool,
  HolidayTool,
  TimeZoneDifferenceTool,
  TodayDashboardTool,
  WorkingDaysTool,
  WorldClockTool,
} from "@/components/time-tools";
import { useTheme } from "@/components/theme-provider";
import { allTools, categories, type ToolWithCategory } from "@/lib/tool-data";
import { resultToText, type ResultLine, type ToolResult } from "@/lib/result-format";
import { getToolMetadata, type ToolMetadata } from "@/lib/tool-metadata";
import { toolIcons } from "@/lib/tool-icons";
import { cn } from "@/lib/utils";
import {
  convertNumberBase,
  convertUnit,
  getConversionGroupFromUrl,
  numberBaseUnits,
  unitGroups,
  type NumberBaseId,
  type UnitGroupId,
} from "@/lib/unit-conversions";
import {
  buildJalaaliMonth,
  diffDates,
  factorsOf,
  formatGregorian,
  formatIslamic,
  formatJalaali,
  formatNumber,
  gregorianDateFromInput,
  gregorianToJalaaliDate,
  jalaaliToGregorianDate,
  numberToEnglishWords,
  numberToPersianWords,
  parseNumber,
  persianMonths,
  requireNumbers,
  swapDigits,
  toEnglishDigits,
  toPersianDigits,
  todayJalaali,
} from "@/lib/tool-utils";
import nationalCodes from "@/data/national-num.json";
import religiousCities from "@/data/religious.json";

type Field =
  | {
      name: string;
      label: string;
      kind?: "number" | "text";
      placeholder?: string;
      defaultValue?: string;
    }
  | {
      name: string;
      label: string;
      kind: "textarea";
      placeholder?: string;
      defaultValue?: string;
      dir?: "rtl" | "ltr";
    }
  | {
      name: string;
      label: string;
      kind: "select";
      defaultValue: string;
      options: { label: string; value: string }[];
    };

type CalculatorDefinition = {
  fields: Field[];
  calculate: (values: Record<string, string>) => ResultLine[] | string;
};

const bankCards = [
  { bank: "ملی ایران", card: "603799" },
  { bank: "سپه", card: "589210" },
  { bank: "توسعه صادرات", card: "627648" },
  { bank: "صنعت و معدن", card: "627961" },
  { bank: "کشاورزی", card: "603770" },
  { bank: "مسکن", card: "628023" },
  { bank: "پست ایران", card: "627760" },
  { bank: "توسعه تعاون", card: "502908" },
  { bank: "اقتصاد نوین", card: "627412" },
  { bank: "پارسیان", card: "622106" },
  { bank: "پاسارگاد", card: "502229" },
  { bank: "کارآفرین", card: "627488" },
  { bank: "سامان", card: "621986" },
  { bank: "سینا", card: "639346" },
  { bank: "سرمایه", card: "639607" },
  { bank: "شهر", card: "502806" },
  { bank: "دی", card: "502938" },
  { bank: "صادرات", card: "603769" },
  { bank: "ملت", card: "610433" },
  { bank: "تجارت", card: "627353" },
  { bank: "رفاه", card: "589463" },
  { bank: "انصار", card: "627381" },
  { bank: "مهر اقتصاد", card: "639370" },
  { bank: "آینده", card: "636214" },
  { bank: "حکمت ایرانیان", card: "636949" },
  { bank: "ایران زمین", card: "505785" },
];

const historyToolUrls = new Set([
  "/time/convertor",
  "/time/mathAge",
  "/fiscal/loanInterest",
  "/numbers/percent",
  "/conversions/convert-weight",
  "/conversions/convert-length",
  "/conversions/convert-temperature",
  "/conversions/convert-speed",
  "/conversions/convert-time",
  "/conversions/convert-area",
  "/conversions/convert-volume",
  "/conversions/convert-digital-storage",
  "/conversions/convert-data-transfer",
  "/conversions/convert-energy",
  "/conversions/convert-power",
  "/conversions/convert-pressure",
  "/conversions/convert-angle",
  "/conversions/convert-frequency",
  "/conversions/convert-electric-current",
  "/conversions/convert-voltage",
  "/conversions/convert-torque",
  "/conversions/convert-number-base",
  "/text/counter-word",
  "/technology/password-random",
]);

const conversionPresets: Partial<
  Record<UnitGroupId, { label: string; amount: string; from: string; to: string }[]>
> = {
  length: [
    { label: "۱ متر به سانتی متر", amount: "1", from: "m", to: "cm" },
    { label: "۱۰ کیلومتر به مایل", amount: "10", from: "km", to: "mi" },
  ],
  weight: [
    { label: "۱ کیلوگرم به گرم", amount: "1", from: "kg", to: "g" },
    { label: "۱۰ پوند به کیلوگرم", amount: "10", from: "lb", to: "kg" },
  ],
  area: [
    { label: "۱ متر مربع به سانتی متر مربع", amount: "1", from: "sq-m", to: "sq-cm" },
    { label: "۱ هکتار به متر مربع", amount: "1", from: "hectare", to: "sq-m" },
  ],
  volume: [
    { label: "۱ لیتر به میلی لیتر", amount: "1", from: "l", to: "ml" },
    { label: "۱ گالن آمریکا به لیتر", amount: "1", from: "us-gal", to: "l" },
  ],
  digitalStorage: [
    { label: "۱ گیگابایت به مگابایت", amount: "1", from: "gb", to: "mb" },
    { label: "۱ گیبی بایت به مگابایت", amount: "1", from: "gib", to: "mb" },
  ],
  dataTransfer: [
    { label: "۱۰۰ Mbps به MB/s", amount: "100", from: "mbps", to: "MBps" },
    { label: "۱ GB/s به Gbps", amount: "1", from: "GBps", to: "gbps" },
  ],
  temperature: [
    { label: "۰ سلسیوس به فارنهایت", amount: "0", from: "c", to: "f" },
    { label: "۲۵ سلسیوس به کلوین", amount: "25", from: "c", to: "k" },
  ],
  speed: [
    { label: "۱۰۰ کیلومتر بر ساعت به متر بر ثانیه", amount: "100", from: "kph", to: "mps" },
    { label: "۶۰ مایل بر ساعت به کیلومتر بر ساعت", amount: "60", from: "mph", to: "kph" },
  ],
};

const weekdayFormatter = new Intl.DateTimeFormat("fa-IR", {
  weekday: "long",
});

function isMeaningfulResultText(text: string) {
  const trimmed = text.trim();

  return (
    trimmed.length > 0 &&
    !trimmed.includes("کامل کنید") &&
    !trimmed.includes("وارد کنید") &&
    !trimmed.includes("نامعتبر") &&
    !trimmed.includes("موردی پیدا نشد")
  );
}

function useRememberResultHistory({
  enabled,
  result,
  title,
  url,
}: {
  enabled: boolean;
  result: ToolResult;
  title: string;
  url: string;
}) {
  const { entries, addHistory, clearHistory } = useToolHistory(url);
  const resultText = resultToText(result);
  const lastSaved = useRef("");

  useEffect(() => {
    if (!enabled || !isMeaningfulResultText(resultText) || resultText === lastSaved.current) {
      return;
    }

    lastSaved.current = resultText;
    addHistory(`${title}\n${resultText}`);
  }, [addHistory, enabled, resultText, title]);

  return { entries, clearHistory, resultText };
}

const calculators: Record<string, CalculatorDefinition> = {
  "/numbers/percent": {
    fields: [
      { name: "percent", label: "درصد", placeholder: "مثال: ۲" },
      { name: "number", label: "عدد", placeholder: "مثال: ۱۰۰۰" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["percent", "number"]);
      if (!nums) return "فیلد ها را کامل کنید.";
      return `${toPersianDigits(formatNumber(nums.percent))} درصد از ${toPersianDigits(formatNumber(nums.number))}، برابر با ${toPersianDigits(formatNumber(nums.number * (nums.percent / 100)))} است.`;
    },
  },
  "/numbers/increasePercent": {
    fields: [
      { name: "percent", label: "درصد افزایش" },
      { name: "number", label: "عدد" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["percent", "number"]);
      if (!nums) return "فیلد ها را کامل کنید.";
      const amount = nums.number * (nums.percent / 100);
      return [
        { label: "عدد جدید", value: formatNumber(nums.number + amount) },
        { label: "میزان افزایش", value: formatNumber(amount) },
      ];
    },
  },
  "/numbers/decreasePercent": {
    fields: [
      { name: "percent", label: "درصد کاهش" },
      { name: "number", label: "عدد" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["percent", "number"]);
      if (!nums) return "فیلد ها را کامل کنید.";
      const amount = nums.number * (nums.percent / 100);
      return [
        { label: "عدد جدید", value: formatNumber(nums.number - amount) },
        { label: "میزان کاهش", value: formatNumber(amount) },
      ];
    },
  },
  "/numbers/changePercent": {
    fields: [
      { name: "from", label: "عدد اولیه" },
      { name: "to", label: "عدد جدید" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["from", "to"]);
      if (!nums || nums.from === 0) return "عدد اولیه نمی تواند صفر باشد.";
      return `تغییر درصد: ${formatNumber(
        ((nums.to - nums.from) / nums.from) * 100
      )}%`;
    },
  },
  "/numbers/errPercent": {
    fields: [
      { name: "right", label: "مقدار صحیح" },
      { name: "measured", label: "مقدار اندازه گیری شده" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["right", "measured"]);
      if (!nums || nums.right === 0) return "مقدار صحیح نمی تواند صفر باشد.";
      return `درصد خطا: ${formatNumber(
        ((nums.right - nums.measured) / nums.right) * 100
      )}%`;
    },
  },
  "/numbers/randomNumber": {
    fields: [
      { name: "min", label: "از عدد", defaultValue: "1" },
      { name: "max", label: "تا عدد", defaultValue: "100" },
      { name: "count", label: "تعداد", defaultValue: "5" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["min", "max", "count"]);
      if (!nums || nums.max < nums.min) return "بازه عددی درست نیست.";
      const count = Math.max(1, Math.min(100, Math.trunc(nums.count)));
      const results = Array.from({ length: count }, () =>
        Math.floor(Math.random() * (nums.max - nums.min + 1) + nums.min)
      );
      return results.map((value, index) => ({
        label: `عدد ${index + 1}`,
        value: formatNumber(value, 0),
      }));
    },
  },
  "/numbers/exchangeNumber": {
    fields: [
      {
        name: "target",
        label: "نوع تبدیل",
        kind: "select",
        defaultValue: "fa",
        options: [
          { label: "انگلیسی به فارسی", value: "fa" },
          { label: "فارسی به انگلیسی", value: "en" },
        ],
      },
      {
        name: "text",
        label: "متن یا عدد",
        kind: "textarea",
        placeholder: "123 یا ۱۲۳",
      },
    ],
    calculate(values) {
      return swapDigits(values.text ?? "", values.target as "fa" | "en");
    },
  },
  "/numbers/numberToString": {
    fields: [{ name: "number", label: "عدد" }],
    calculate(values) {
      return numberToPersianWords(values.number);
    },
  },
  "/numbers/numberToStringEN": {
    fields: [{ name: "number", label: "Number" }],
    calculate(values) {
      return numberToEnglishWords(values.number);
    },
  },
  "/math/first-linear-equation": {
    fields: [
      { name: "a", label: "ضریب X" },
      { name: "b", label: "عدد ثابت" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["a", "b"]);
      if (!nums || nums.a === 0) return "ضریب X نمی تواند صفر باشد.";
      return `X = ${formatNumber(-nums.b / nums.a)}`;
    },
  },
  "/math/average": {
    fields: [
      {
        name: "numbers",
        label: "اعداد",
        kind: "textarea",
        placeholder: "اعداد را با فاصله، ویرگول یا خط جدید جدا کنید.",
      },
    ],
    calculate(values) {
      const nums = toEnglishDigits(values.numbers ?? "")
        .split(/[\s,،]+/)
        .map(Number)
        .filter(Number.isFinite);
      if (nums.length === 0) return "حداقل یک عدد وارد کنید.";
      return `میانگین: ${formatNumber(
        nums.reduce((sum, value) => sum + value, 0) / nums.length
      )}`;
    },
  },
  "/math/factor": {
    fields: [{ name: "number", label: "عدد" }],
    calculate(values) {
      const value = parseNumber(values.number);
      if (!Number.isFinite(value) || value <= 0) return "عدد مثبت وارد کنید.";
      return `فاکتورها: ${factorsOf(value).join("، ")}`;
    },
  },
  "/math/pow": {
    fields: [
      { name: "number", label: "عدد" },
      { name: "power", label: "توان" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["number", "power"]);
      if (!nums) return "فیلد ها را کامل کنید.";
      return `${formatNumber(nums.number)} ^ ${formatNumber(
        nums.power
      )} = ${formatNumber(Math.pow(nums.number, nums.power), 6)}`;
    },
  },
  "/math/sqrt": {
    fields: [{ name: "number", label: "عدد" }],
    calculate(values) {
      const value = parseNumber(values.number);
      if (!Number.isFinite(value) || value < 0) return "عدد نامعتبر است.";
      return `جذر: ${formatNumber(Math.sqrt(value), 6)}`;
    },
  },
  "/math/legarithm": {
    fields: [
      { name: "number", label: "عدد" },
      {
        name: "base",
        label: "مبنا",
        kind: "select",
        defaultValue: "10",
        options: [
          { label: "۱۰", value: "10" },
          { label: "۲", value: "2" },
          { label: "e", value: "e" },
        ],
      },
    ],
    calculate(values) {
      const value = parseNumber(values.number);
      if (!Number.isFinite(value) || value <= 0) return "عدد باید مثبت باشد.";
      const base = values.base === "e" ? Math.E : parseNumber(values.base);
      return `log = ${formatNumber(Math.log(value) / Math.log(base), 6)}`;
    },
  },
  "/math/prime-number": {
    fields: [{ name: "number", label: "عدد" }],
    calculate(values) {
      const value = Math.trunc(parseNumber(values.number));
      if (!Number.isFinite(value) || value < 2) return "عدد بزرگتر از ۱ وارد کنید.";
      const factors = factorsOf(value);
      return [
        {
          label: "وضعیت",
          value: factors.length === 2 ? "عدد اول است" : "عدد اول نیست",
        },
        { label: "مقسوم علیه ها", value: factors.join("، ") },
      ];
    },
  },
  "/math/rectangle": {
    fields: [
      { name: "length", label: "طول" },
      { name: "width", label: "عرض" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["length", "width"]);
      if (!nums) return "فیلد ها را کامل کنید.";
      return [
        { label: "مساحت", value: formatNumber(nums.length * nums.width) },
        { label: "محیط", value: formatNumber(2 * (nums.length + nums.width)) },
        {
          label: "قطر",
          value: formatNumber(Math.hypot(nums.length, nums.width), 6),
        },
      ];
    },
  },
  "/math/square": {
    fields: [{ name: "length", label: "طول ضلع" }],
    calculate(values) {
      const value = parseNumber(values.length);
      if (!Number.isFinite(value)) return "طول ضلع را وارد کنید.";
      return [
        { label: "مساحت", value: formatNumber(value * value) },
        { label: "محیط", value: formatNumber(value * 4) },
        { label: "قطر", value: formatNumber(Math.SQRT2 * value, 6) },
      ];
    },
  },
  "/health/BMI": {
    fields: [
      { name: "weight", label: "وزن (کیلوگرم)" },
      { name: "height", label: "قد (سانتی متر)" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["weight", "height"]);
      if (!nums || nums.height <= 0) return "قد و وزن را کامل کنید.";
      const bmi = nums.weight / Math.pow(nums.height / 100, 2);
      const heightMeters = nums.height / 100;
      const healthyLow = 18.5 * Math.pow(heightMeters, 2);
      const healthyHigh = 24.9 * Math.pow(heightMeters, 2);
      const status =
        bmi < 16.5
          ? "کمبود وزن شدید"
          : bmi < 18.5
            ? "کمبود وزن"
            : bmi < 25
              ? "وزن نرمال"
              : bmi < 30
                ? "اضافه وزن"
                : bmi < 35
                  ? "چاقی کلاس ۱"
                  : bmi < 40
                    ? "چاقی کلاس ۲"
                    : "چاقی کلاس ۳";
      return [
        { label: "BMI", value: formatNumber(bmi) },
        { label: "رده", value: status },
        {
          label: "بازه وزن سالم برای این قد",
          value: `${formatNumber(healthyLow, 1)} تا ${formatNumber(healthyHigh, 1)} کیلوگرم`,
        },
      ];
    },
  },
  "/health/BMR": {
    fields: [
      { name: "weight", label: "وزن (کیلوگرم)" },
      { name: "height", label: "قد (سانتی متر)" },
      { name: "age", label: "سن" },
      {
        name: "activity",
        label: "سطح فعالیت",
        kind: "select",
        defaultValue: "1.2",
        options: [
          { label: "کم تحرک", value: "1.2" },
          { label: "فعالیت سبک", value: "1.375" },
          { label: "فعالیت متوسط", value: "1.55" },
          { label: "فعالیت زیاد", value: "1.725" },
          { label: "خیلی فعال", value: "1.9" },
        ],
      },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["weight", "height", "age"]);
      if (!nums) return "فیلد ها را کامل کنید.";
      const activity = parseNumber(values.activity) || 1.2;
      const maleBmr =
        66.47 + 13.75 * nums.weight + 5.003 * nums.height - 6.755 * nums.age;
      const femaleBmr =
        655.1 + 9.563 * nums.weight + 1.85 * nums.height - 4.676 * nums.age;
      const maleMaintenance = maleBmr * activity;
      const femaleMaintenance = femaleBmr * activity;
      return [
        {
          label: "BMR مرد",
          value: `${formatNumber(maleBmr, 0)} کالری`,
        },
        {
          label: "BMR زن",
          value: `${formatNumber(femaleBmr, 0)} کالری`,
        },
        {
          label: "نگهداری وزن مرد",
          value: `${formatNumber(maleMaintenance, 0)} کالری`,
        },
        {
          label: "نگهداری وزن زن",
          value: `${formatNumber(femaleMaintenance, 0)} کالری`,
        },
        {
          label: "کاهش وزن ملایم",
          value: `${formatNumber(maleMaintenance - 250, 0)} / ${formatNumber(
            femaleMaintenance - 250,
            0
          )} کالری`,
        },
        {
          label: "افزایش وزن ملایم",
          value: `${formatNumber(maleMaintenance + 250, 0)} / ${formatNumber(
            femaleMaintenance + 250,
            0
          )} کالری`,
        },
      ];
    },
  },
  "/other/fuel": {
    fields: [
      { name: "distance", label: "مسافت طی شده (کیلومتر)" },
      { name: "fuel", label: "بنزین مصرف شده (لیتر)" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["distance", "fuel"]);
      if (!nums || nums.distance <= 0) return "مسافت باید بزرگتر از صفر باشد.";
      return `مصرف: ${formatNumber((nums.fuel * 100) / nums.distance)} لیتر در هر ۱۰۰ کیلومتر`;
    },
  },
  "/other/smoking": {
    fields: [
      { name: "daily", label: "تعداد نخ در روز" },
      { name: "price", label: "قیمت هر پاکت" },
      { name: "perPack", label: "تعداد نخ در هر پاکت", defaultValue: "20" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["daily", "price", "perPack"]);
      if (!nums || nums.perPack <= 0) return "فیلد ها را کامل کنید.";
      const dailyCost = (nums.daily / nums.perPack) * nums.price;
      return [
        { label: "هزینه روزانه", value: formatNumber(dailyCost, 0) },
        { label: "هزینه ماهانه", value: formatNumber(dailyCost * 30, 0) },
        { label: "هزینه سالانه", value: formatNumber(dailyCost * 365, 0) },
      ];
    },
  },
  "/other/ielts-score": {
    fields: [
      { name: "listening", label: "Listening" },
      { name: "reading", label: "Reading" },
      { name: "writing", label: "Writing" },
      { name: "speaking", label: "Speaking" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, [
        "listening",
        "reading",
        "writing",
        "speaking",
      ]);
      if (!nums) return "هر چهار مهارت را وارد کنید.";
      const score =
        (nums.listening + nums.reading + nums.writing + nums.speaking) / 4;
      return `Overall = ${Math.round(score * 2) / 2}`;
    },
  },
  "/fiscal/exchangeRial": {
    fields: [
      {
        name: "type",
        label: "تبدیل",
        kind: "select",
        defaultValue: "toman-to-rial",
        options: [
          { label: "تومان به ریال", value: "toman-to-rial" },
          { label: "ریال به تومان", value: "rial-to-toman" },
        ],
      },
      { name: "amount", label: "مبلغ" },
    ],
    calculate(values) {
      const amount = parseNumber(values.amount);
      if (!Number.isFinite(amount)) return "مبلغ را وارد کنید.";
      const result =
        values.type === "toman-to-rial" ? amount * 10 : Math.floor(amount / 10);
      return `${formatNumber(result, 0)} ${
        values.type === "toman-to-rial" ? "ریال" : "تومان"
      }`;
    },
  },
  "/fiscal/Interest": {
    fields: [
      { name: "profit", label: "درصد نرخ سود" },
      { name: "amount", label: "مبلغ سپرده" },
      { name: "days", label: "تعداد روز" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["profit", "amount", "days"]);
      if (!nums || nums.days <= 0) return "فیلد ها را کامل کنید.";
      const dailyTotal = (nums.amount * (nums.profit / 100) * nums.days) / 365;
      const daily = dailyTotal / nums.days;
      return [
        { label: "سود این بازه", value: formatNumber(dailyTotal, 0) },
        { label: "سود روزانه", value: formatNumber(daily, 0) },
        { label: "سود ماهانه", value: formatNumber((nums.amount * (nums.profit / 100) * 30) / 365, 0) },
        { label: "سود سالانه", value: formatNumber(nums.amount * (nums.profit / 100), 0) },
      ];
    },
  },
  "/fiscal/loanInterest": {
    fields: [
      { name: "amount", label: "مبلغ وام" },
      { name: "profit", label: "نرخ سود سالانه" },
      { name: "period", label: "مدت بازپرداخت" },
      {
        name: "periodType",
        label: "واحد مدت",
        kind: "select",
        defaultValue: "year",
        options: [
          { label: "سال", value: "year" },
          { label: "ماه", value: "month" },
        ],
      },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["amount", "profit", "period"]);
      if (!nums) return "فیلد ها را کامل کنید.";
      const months = values.periodType === "month" ? nums.period : nums.period * 12;
      const oldProfit = (nums.amount * nums.profit * (months + 1)) / 2400;
      const oldPayment = (nums.amount + oldProfit) / months;
      const power = Math.pow((1200 + nums.profit) / 1200, months);
      const newPayment =
        (nums.amount * (nums.profit / 1200) * power) / (power - 1);
      const newProfit = months * newPayment - nums.amount;
      return [
        { label: "قسط ماهانه روش جدید", value: formatNumber(newPayment, 0) },
        { label: "کل سود روش جدید", value: formatNumber(newProfit, 0) },
        { label: "قسط ماهانه روش قدیم", value: formatNumber(oldPayment, 0) },
        { label: "کل سود روش قدیم", value: formatNumber(oldProfit, 0) },
      ];
    },
  },
  "/fiscal/marketProfit": {
    fields: [
      {
        name: "date",
        label: "روش سود",
        kind: "select",
        defaultValue: "month",
        options: [
          { label: "ماهانه", value: "month" },
          { label: "سالانه", value: "year" },
        ],
      },
      { name: "price", label: "باقیمانده برای قسط بندی" },
      { name: "profit", label: "درصد سود" },
      { name: "installment", label: "تعداد قسط" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["price", "profit", "installment"]);
      if (!nums || nums.installment <= 0) return "فیلد ها را کامل کنید.";
      const profit =
        values.date === "year"
          ? (nums.profit / 100) * nums.price
          : ((nums.profit * nums.installment) / 100) * nums.price;
      const total = nums.price + profit;
      return [
        { label: "سود", value: formatNumber(profit, 0) },
        { label: "جمع کل", value: formatNumber(total, 0) },
        { label: "هر قسط", value: formatNumber(total / nums.installment, 0) },
      ];
    },
  },
};

export function ToolRunner({ tool }: { tool: ToolWithCategory }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecentTool } = useRecentTools();
  const favorite = isFavorite(tool.url);
  const metadata = getToolMetadata(tool.url);
  const Icon = toolIcons[tool.url] ?? Wrench;
  const isCalculator = tool.url in calculators || tool.url === "/fiscal/loanInterest";
  const isDashboard = ["/time/date", "/time/world-clock"].includes(tool.url);
  const related =
    categories
      .find((category) => category.url === tool.categoryUrl)
      ?.item.filter((item) => item.url !== tool.url)
      .slice(0, 3) ?? [];

  useEffect(() => {
    addRecentTool(tool);
  }, [addRecentTool, tool]);

  return (
    <div className="container_m tool-page">
      <nav className="breadcrumbs" aria-label="مسیر صفحه">
        <Link href="/">خانه</Link>
        <ChevronLeft size={13} aria-hidden="true" />
        <Link href={tool.categoryUrl}>{tool.categoryTitle}</Link>
        <ChevronLeft size={13} aria-hidden="true" />
        <span aria-current="page">{tool.title}</span>
      </nav>

      <header className="workspace-header">
        <div className="workspace-heading">
          <div className="workspace-tool-icon"><Icon aria-hidden="true" /></div>
          <div>
            <Link className="eyebrow" href={tool.categoryUrl}>{tool.categoryTitle}</Link>
            <h1>{tool.title}</h1>
            <p>{tool.sub}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite(tool)}
          className={cn("outline-button workspace-save", favorite && "is-saved")}
          aria-pressed={favorite}
        >
          <Star size={17} fill={favorite ? "currentColor" : "none"} aria-hidden="true" />
          {favorite ? "در ابزارهای من" : "ذخیره ابزار"}
        </button>
      </header>

      <div className="c_tools">
          <section className="tool" aria-label={tool.title}>
            <div className="workspace-panel-heading">
              <div className="workspace-step">
                <span className="workspace-step-number">۰۱</span>
                <div>
                  <h2>{isDashboard ? "در یک نگاه" : "اطلاعات ابزار"}</h2>
                  <p>{isDashboard ? "تاریخ و ساعت، همیشه به‌روز" : isCalculator ? "مقادیر را وارد کنید و محاسبه را بزنید." : "ورودی‌ها را مشخص کنید و از ابزار استفاده کنید."}</p>
                </div>
              </div>
              <SlidersHorizontal size={18} aria-hidden="true" />
            </div>
            <div className="tool_content" key={tool.url}>{renderTool(tool)}</div>
          </section>

          <aside className="workspace-sidebar" aria-label="راهنمای ابزار">
            <section className="workspace-guide">
              <div className="workspace-sidebar-title"><CircleHelp size={18} aria-hidden="true" /><h2>ساده، از شروع تا نتیجه</h2></div>
              <ol>
                <li><span>۱</span><div><strong>{isDashboard ? "اطلاعات را ببینید" : "ورودی را مشخص کنید"}</strong><p>{isDashboard ? "ساعت‌ها به‌صورت خودکار به‌روز می‌شوند." : tool.categorySlug === "text" ? "متن دلخواه را وارد و گزینه‌های ابزار را انتخاب کنید." : "اعداد فارسی و انگلیسی پذیرفته می‌شوند."}</p></div></li>
                <li><span>۲</span><div><strong>نتیجه را بررسی کنید</strong><p>{isCalculator ? "پس از ورود اطلاعات، روی محاسبه بزنید." : "اطلاعات و خروجی ابزار در همین صفحه نمایش داده می‌شود."}</p></div></li>
                <li><span>۳</span><div><strong>ابزار را نگه دارید</strong><p>برای دسترسی سریع، آن را به ابزارهای من اضافه کنید.</p></div></li>
              </ol>
              <Link href={tool.categoryUrl} className="workspace-category-link">
                همه ابزارهای این دسته <ArrowLeft size={16} aria-hidden="true" />
              </Link>
            </section>
            <ToolTrustMetadata metadata={metadata} />
            <div className="workspace-save-note">
              <Star size={19} aria-hidden="true" />
              <div>
                <strong>همیشه دم دست</strong>
                <p>ابزارهای ذخیره‌شده را از بخش «ابزارهای من» پیدا کنید.</p>
              </div>
            </div>
          </aside>

          <ToolExplainer tool={tool} metadata={metadata} />

          {related.length > 0 && (
            <section className="tool-related">
              <div className="workspace-related-heading">
                <div><span className="eyebrow">ادامه کار، بدون وقفه</span><h2>شاید این‌ها هم به کارتان بیاید</h2></div>
                <Link className="text-link" href={tool.categoryUrl}>مشاهده دسته <ArrowLeft size={16} aria-hidden="true" /></Link>
              </div>
              <div className="tools-grid workspace-related-grid">
                {related.map((item) => (
                  <ToolCard key={item.url} tool={item} />
                ))}
              </div>
            </section>
          )}
      </div>
    </div>
  );
}

function renderTool(tool: ToolWithCategory) {
  if (tool.url === "/fiscal/loanInterest") {
    return <LoanCalculatorTool tool={tool} />;
  }

  if (tool.url in calculators) {
    return <CalculatorTool definition={calculators[tool.url]} tool={tool} />;
  }

  if (tool.url.startsWith("/conversions/")) {
    return <ConversionTool tool={tool} />;
  }

  switch (tool.url) {
    case "/time/date":
      return <TodayDashboardTool />;
    case "/time/iran-holidays":
      return <HolidayTool />;
    case "/time/events":
      return <EventsTool />;
    case "/time/working-days":
      return <WorkingDaysTool />;
    case "/time/date-calculator":
      return <DateOffsetTool />;
    case "/time/world-clock":
      return <WorldClockTool />;
    case "/time/timezone-difference":
      return <TimeZoneDifferenceTool />;
    case "/time/countdown":
      return <CountdownTool />;
    case "/time/cleander":
      return <CalendarTool />;
    case "/time/convertor":
      return <DateConvertTool tool={tool} />;
    case "/time/mathAge":
      return <AgeTool tool={tool} />;
    case "/time/religious":
      return <PrayerTool />;
    case "/time/alarm":
      return <AlarmTool />;
    case "/time/timer":
      return <TimerTool />;
    case "/time/cornometr":
      return <StopwatchTool />;
    case "/time/spacingDate":
      return <DateDiffTool />;
    case "/fiscal/numberCard":
      return <BankCardTool />;
    case "/other/national-number":
      return <NationalCodeTool />;
    case "/text/convert-word":
      return <TextTransformTool />;
    case "/text/counter-word":
      return <TextCounterTool tool={tool} />;
    case "/text/Lorem":
      return <LoremTool />;
    case "/technology/password-random":
      return <PasswordTool tool={tool} />;
    case "/technology/MyIP":
      return <MyIpTool />;
    case "/technology/TimeStamp":
      return <TimestampTool />;
    case "/technology/binary":
      return <BinaryTool />;
    default:
      return (
        <ResultBox
          result="این ابزار در حال آماده‌سازی است. ابزارهای مرتبط را بررسی کنید."
          tone="muted"
        />
      );
  }
}

type LoanScheduleRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remaining: number;
};

function buildLoanSchedule(amount: number, annualProfit: number, months: number) {
  const monthlyRate = annualProfit / 1200;
  const payment =
    monthlyRate === 0
      ? amount / months
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
  const schedule: LoanScheduleRow[] = [];
  let remaining = amount;

  for (let month = 1; month <= months; month += 1) {
    const interest = remaining * monthlyRate;
    const principal =
      month === months ? remaining : Math.min(payment - interest, remaining);
    const actualPayment = principal + interest;
    remaining = Math.max(0, remaining - principal);
    schedule.push({
      month,
      payment: actualPayment,
      principal,
      interest,
      remaining,
    });
  }

  return {
    payment,
    totalProfit: schedule.reduce((sum, row) => sum + row.interest, 0),
    schedule,
  };
}

function loanScheduleToText(rows: LoanScheduleRow[]) {
  return [
    "ماه,قسط,اصل,سود,مانده",
    ...rows.map((row) =>
      [
        row.month,
        Math.round(row.payment),
        Math.round(row.principal),
        Math.round(row.interest),
        Math.round(row.remaining),
      ].join(",")
    ),
  ].join("\n");
}

function LoanCalculatorTool({ tool }: { tool: ToolWithCategory }) {
  const fields: Field[] = [
    { name: "amount", label: "مبلغ وام" },
    { name: "profit", label: "نرخ سود سالانه" },
    { name: "period", label: "مدت بازپرداخت" },
    {
      name: "periodType",
      label: "واحد مدت",
      kind: "select",
      defaultValue: "year",
      options: [
        { label: "سال", value: "year" },
        { label: "ماه", value: "month" },
      ],
    },
  ];
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      fields.map((field) => [
        field.name,
        "defaultValue" in field ? (field.defaultValue ?? "") : "",
      ])
    )
  );
  const [summary, setSummary] = useState<ResultLine[] | string | null>(null);
  const [schedule, setSchedule] = useState<LoanScheduleRow[]>([]);
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const { entries, addHistory, clearHistory } = useToolHistory(tool.url);
  const visibleSchedule = showFullSchedule ? schedule : schedule.slice(0, 12);
  const scheduleText = schedule.length > 0 ? loanScheduleToText(schedule) : "";

  function calculateLoan() {
    const nums = requireNumbers(values, ["amount", "profit", "period"]);

    if (["amount", "profit", "period"].some((name) => !values[name]?.trim()) || !nums || nums.amount <= 0 || nums.period <= 0 || nums.profit < 0) {
      setSummary("فیلد ها را کامل کنید.");
      setSchedule([]);
      return;
    }

    const months = Math.max(
      1,
      Math.min(
        600,
        Math.trunc(values.periodType === "month" ? nums.period : nums.period * 12)
      )
    );
    const oldProfit = (nums.amount * nums.profit * (months + 1)) / 2400;
    const oldPayment = (nums.amount + oldProfit) / months;
    const calculation = buildLoanSchedule(nums.amount, nums.profit, months);
    const nextSummary = [
      { label: "قسط ماهانه روش جدید", value: formatNumber(calculation.payment, 0) },
      { label: "کل سود روش جدید", value: formatNumber(calculation.totalProfit, 0) },
      { label: "قسط ماهانه روش قدیم", value: formatNumber(oldPayment, 0) },
      { label: "کل سود روش قدیم", value: formatNumber(oldProfit, 0) },
      { label: "تعداد اقساط", value: formatNumber(months, 0) },
    ];

    setSummary(nextSummary);
    setSchedule(calculation.schedule);
    setShowFullSchedule(false);
    addHistory(`${tool.title}\n${resultToText(nextSummary)}`);
  }

  return (
    <ToolCardShell>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          calculateLoan();
        }}
      >
        <div className="tool-field-grid">
          {fields.map((field) => (
            <FieldControl
              key={field.name}
              field={field}
              value={values[field.name] ?? ""}
              onChange={(value) => {
                setValues((current) => ({ ...current, [field.name]: value }));
                setSummary(null);
                setSchedule([]);
              }}
            />
          ))}
        </div>
        <Button type="submit" className="bn632-hover">
          محاسبه نتیجه
          <ArrowLeft size={17} aria-hidden="true" />
        </Button>
      </form>
      <ResultBox result={summary} title={tool.title} filenameSlug={tool.slug} />
      {schedule.length > 0 && (
        <section className="loan-schedule" aria-label="جدول بازپرداخت وام">
          <div className="loan-schedule-header">
            <div>
              <div className="tool-subheading">جدول بازپرداخت</div>
              <div className="tool-history-subtitle">
                {showFullSchedule ? "همه اقساط" : "۱۲ قسط اول"}
              </div>
            </div>
            <ResultActions
              title={`${tool.title} - جدول بازپرداخت`}
              text={scheduleText}
              filenameSlug={`${tool.slug}-schedule`}
              canPrint={false}
            />
          </div>
          <div className="loan-table-wrapper">
            <table className="loan-table">
              <thead>
                <tr>
                  <th>ماه</th>
                  <th>قسط</th>
                  <th>اصل</th>
                  <th>سود</th>
                  <th>مانده</th>
                </tr>
              </thead>
              <tbody>
                {visibleSchedule.map((row) => (
                  <tr key={row.month}>
                    <td>{toPersianDigits(row.month)}</td>
                    <td>{formatNumber(row.payment, 0)}</td>
                    <td>{formatNumber(row.principal, 0)}</td>
                    <td>{formatNumber(row.interest, 0)}</td>
                    <td>{formatNumber(row.remaining, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {schedule.length > 12 && (
            <Button
              type="button"
              variant="outline"
              className="bn632-hover"
              onClick={() => setShowFullSchedule((current) => !current)}
            >
              {showFullSchedule ? "نمایش ۱۲ قسط اول" : "نمایش همه اقساط"}
            </Button>
          )}
        </section>
      )}
      <ToolHistory
        title={tool.title}
        url={tool.url}
        entries={entries}
        onClear={clearHistory}
      />
    </ToolCardShell>
  );
}

function CalculatorTool({
  definition,
  tool,
}: {
  definition: CalculatorDefinition;
  tool: ToolWithCategory;
}) {
  const initialValues = useMemo(
    () =>
      Object.fromEntries(
        definition.fields.map((field) => [
          field.name,
          "defaultValue" in field ? (field.defaultValue ?? "") : "",
        ])
      ),
    [definition]
  );
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [result, setResult] = useState<ResultLine[] | string | null>(null);
  const { entries, clearHistory } = useRememberResultHistory({
    enabled: historyToolUrls.has(tool.url),
    result,
    title: tool.title,
    url: tool.url,
  });

  return (
    <ToolCardShell>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (definition.fields.some((field) => field.kind !== "select" && !values[field.name]?.trim())) {
            setResult("برای محاسبه، همه فیلدها را کامل کنید.");
            return;
          }
          setResult(definition.calculate(values));
        }}
      >
        <div className="tool-field-grid">
          {definition.fields.map((field) => (
            <FieldControl
              key={field.name}
              field={field}
              value={values[field.name] ?? ""}
              onChange={(value) => {
                setValues((current) => ({ ...current, [field.name]: value }));
                setResult(null);
              }}
            />
          ))}
        </div>
        <Button type="submit" className="bn632-hover">
          محاسبه نتیجه
          <ArrowLeft size={17} aria-hidden="true" />
        </Button>
      </form>
      <ResultBox result={result} title={tool.title} filenameSlug={tool.slug} />
      <ToolHistory
        title={tool.title}
        url={tool.url}
        entries={entries}
        onClear={clearHistory}
      />
    </ToolCardShell>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();

  return (
    <div className={cn("toolbo-field", field.kind === "textarea" && "md:col-span-2")}>
      <Label htmlFor={id} className="mb-2 block">{field.label}</Label>
      {field.kind === "select" ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id={id} className="tool-input h-10 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : field.kind === "textarea" ? (
        <Textarea
          id={id}
          name={field.name}
          autoComplete="off"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          dir={field.dir}
          className="tool-input min-h-36"
        />
      ) : (
        <Input
          id={id}
          name={field.name}
          value={value}
          type="text"
          autoComplete="off"
          inputMode={field.kind === "text" ? "text" : "decimal"}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          className="tool-input"
        />
      )}
    </div>
  );
}

function ResultBox({
  result,
  tone = "default",
  title = "نتیجه تولبو",
  filenameSlug = "toolbo-result",
  actions = true,
}: {
  result: ResultLine[] | string | null;
  tone?: "default" | "muted";
  title?: string;
  filenameSlug?: string;
  actions?: boolean;
}) {
  const { isDark } = useTheme();
  const resultText = resultToText(result);
  const isInputHint = typeof result === "string" && !isMeaningfulResultText(result);

  if (!result) {
    return (
      <div className="result-empty" role="status">
        <span className="result-empty-icon"><WandSparkles size={22} aria-hidden="true" /></span>
        <strong>نتیجه اینجا نمایش داده می‌شود</strong>
        <p>اطلاعات را کامل کنید تا نتیجه آماده شود.</p>
      </div>
    );
  }

  return (
    <div
      className={cn("Result", isDark && "Result_D", isInputHint && "result-input-hint")}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="title_tool result-title-row">
        <span className="result-heading-label">{isInputHint ? <Info size={18} aria-hidden="true" /> : <Check size={18} aria-hidden="true" />}{isInputHint ? "ورودی را بررسی کنید" : "نتیجه آماده است"}</span>
        {actions && !isInputHint && (
          <ResultActions title={title} text={resultText} filenameSlug={filenameSlug} />
        )}
      </div>
      {typeof result === "string" ? (
        <p className={cn("textResult", tone === "muted" && "opacity-75")}>
          {result}
        </p>
      ) : (
        <div className="result-grid">
          {result.map((line) => (
            <div key={line.label} className="result-item">
              <div className="result-label">{line.label}</div>
              <div className="result-value">{line.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ToolCardShell({ children }: { children: React.ReactNode }) {
  return <div className="tool-body">{children}</div>;
}

function ConversionTool({ tool }: { tool: ToolWithCategory }) {
  if (tool.url.endsWith("convert-number-base")) {
    return <NumberBaseConversionTool tool={tool} />;
  }

  const group = getConversionGroupFromUrl(tool.url);

  if (!group) {
    return <ResultBox result="این تبدیل هنوز آماده نیست." tone="muted" />;
  }

  return <LinearConversionTool tool={tool} group={group} />;
}

function LinearConversionTool({
  tool,
  group,
}: {
  tool: ToolWithCategory;
  group: UnitGroupId;
}) {
  const units = unitGroups[group];
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState(units[0].id);
  const [to, setTo] = useState(units[1]?.id ?? units[0].id);
  const [hasInteracted, setHasInteracted] = useState(false);
  const amountId = useId();
  const value = amount.trim() ? parseNumber(amount) : Number.NaN;
  const converted = Number.isFinite(value)
    ? convertUnit(group, value, from, to)
    : null;
  const fromLabel = units.find((unit) => unit.id === from)?.label ?? "";
  const toLabel = units.find((unit) => unit.id === to)?.label ?? "";
  const result =
    converted === null
      ? null
      : `${amount} ${fromLabel} معادل ${formatNumber(converted, 6)} ${toLabel}`;
  const allUnits =
    Number.isFinite(value)
      ? units
          .map((unit) => ({
            label: unit.label,
            value: convertUnit(group, value, from, unit.id),
          }))
          .filter((item): item is { label: string; value: number } => item.value !== null)
      : [];
  const { entries, clearHistory } = useRememberResultHistory({
    enabled: hasInteracted && historyToolUrls.has(tool.url),
    result,
    title: tool.title,
    url: tool.url,
  });

  function updateAmount(next: string) {
    setHasInteracted(true);
    setAmount(next);
  }

  function updateFrom(next: string) {
    setHasInteracted(true);
    setFrom(next);
  }

  function updateTo(next: string) {
    setHasInteracted(true);
    setTo(next);
  }

  return (
    <ToolCardShell>
      <div className="tool-field-grid">
        <div className="toolbo-field">
          <Label htmlFor={amountId} className="mb-2 block">مقدار</Label>
          <Input
            id={amountId}
            name="amount"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={amount}
            onChange={(event) => updateAmount(event.target.value)}
            className="tool-input"
          />
        </div>
        <UnitSelect label="از" units={units} value={from} onChange={updateFrom} />
        <UnitSelect label="به" units={units} value={to} onChange={updateTo} />
      </div>
      <div className="conversion-toolbar">
        <Button
          type="button"
          variant="outline"
          className="bn632-hover"
          title="جابه‌جایی واحدها"
          aria-label="جابه‌جایی واحدها"
          onClick={() => {
            setHasInteracted(true);
            setFrom(to);
            setTo(from);
          }}
        >
          <ArrowLeftRight aria-hidden="true" />
          جابه‌جایی
        </Button>
        <div className="conversion-presets">
          {(conversionPresets[group] ?? []).map((preset) => (
            <button
              key={`${preset.amount}-${preset.from}-${preset.to}`}
              type="button"
              onClick={() => {
                setHasInteracted(true);
                setAmount(preset.amount);
                setFrom(preset.from);
                setTo(preset.to);
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
      <ResultBox result={result} title={tool.title} filenameSlug={tool.slug} />
      {allUnits.length > 0 && (
        <section className="all-units-table" aria-label="همه واحدها">
          <div className="tool-subheading">همه واحدها برای مقدار وارد شده</div>
          <div className="result-grid">
            {allUnits.map((item) => (
              <div key={item.label} className="result-item">
                <div className="result-label">{item.label}</div>
                <div className="result-value">{formatNumber(item.value, 8)}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      <ToolHistory
        title={tool.title}
        url={tool.url}
        entries={entries}
        onClear={clearHistory}
      />
    </ToolCardShell>
  );
}

function NumberBaseConversionTool({ tool }: { tool: ToolWithCategory }) {
  const [value, setValue] = useState("255");
  const [from, setFrom] = useState<NumberBaseId>("decimal");
  const [to, setTo] = useState<NumberBaseId>("hex");
  const [hasInteracted, setHasInteracted] = useState(false);
  const valueId = useId();
  const converted = convertNumberBase(toEnglishDigits(value), from, to);
  const fromLabel = numberBaseUnits.find((unit) => unit.id === from)?.label;
  const toLabel = numberBaseUnits.find((unit) => unit.id === to)?.label;
  const result =
    converted === null
      ? "عدد وارد شده با مبنای انتخاب شده سازگار نیست."
      : `${value} در مبنای ${fromLabel} برابر ${converted} در مبنای ${toLabel} است.`;
  const allBases = numberBaseUnits.flatMap((unit) => {
    const convertedValue = convertNumberBase(toEnglishDigits(value), from, unit.id);

    return convertedValue === null
      ? []
      : [{ label: unit.label, value: convertedValue }];
  });
  const { entries, clearHistory } = useRememberResultHistory({
    enabled: hasInteracted && converted !== null,
    result,
    title: tool.title,
    url: tool.url,
  });

  return (
    <ToolCardShell>
      <div className="tool-field-grid">
        <div className="toolbo-field">
          <Label htmlFor={valueId} className="mb-2 block">عدد</Label>
          <Input
            id={valueId}
            name="number-base-value"
            type="text"
            autoComplete="off"
            value={value}
            onChange={(event) => {
              setHasInteracted(true);
              setValue(event.target.value);
            }}
            dir="ltr"
            className="tool-input"
          />
        </div>
        <NumberBaseSelect
          label="از مبنا"
          value={from}
          onChange={(next) => {
            setHasInteracted(true);
            setFrom(next);
          }}
        />
        <NumberBaseSelect
          label="به مبنا"
          value={to}
          onChange={(next) => {
            setHasInteracted(true);
            setTo(next);
          }}
        />
      </div>
      <div className="conversion-toolbar">
        <Button
          type="button"
          variant="outline"
          className="bn632-hover"
          title="جابه‌جایی مبناها"
          aria-label="جابه‌جایی مبناها"
          onClick={() => {
            setHasInteracted(true);
            setFrom(to);
            setTo(from);
          }}
        >
          <ArrowLeftRight aria-hidden="true" />
          جابه‌جایی
        </Button>
      </div>
      <ResultBox
        result={result}
        title={tool.title}
        filenameSlug={tool.slug}
        actions={converted !== null}
      />
      {allBases.length > 0 && (
        <section className="all-units-table" aria-label="همه مبناها">
          <div className="tool-subheading">نمایش در همه مبناها</div>
          <div className="result-grid">
            {allBases.map((item) => (
              <div key={item.label} className="result-item">
                <div className="result-label">{item.label}</div>
                <div className="result-value" dir="ltr">{item.value}</div>
              </div>
            ))}
          </div>
        </section>
      )}
      <ToolHistory
        title={tool.title}
        url={tool.url}
        entries={entries}
        onClear={clearHistory}
      />
    </ToolCardShell>
  );
}

function UnitSelect({
  label,
  units,
  value,
  onChange,
}: {
  label: string;
  units: { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();

  return (
    <div className="toolbo-field">
      <Label htmlFor={id} className="mb-2 block">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="tool-input h-10 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit) => (
            <SelectItem key={unit.id} value={unit.id}>
              {unit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function NumberBaseSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: NumberBaseId;
  onChange: (value: NumberBaseId) => void;
}) {
  const id = useId();

  return (
    <div className="toolbo-field">
      <Label htmlFor={id} className="mb-2 block">{label}</Label>
      <Select value={value} onValueChange={(next) => onChange(next as NumberBaseId)}>
        <SelectTrigger id={id} className="tool-input h-10 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {numberBaseUnits.map((unit) => (
            <SelectItem key={unit.id} value={unit.id}>
              {unit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function CalendarTool() {
  const current = todayJalaali();
  const [year, setYear] = useState(String(current.jy));
  const [month, setMonth] = useState(String(current.jm));
  const yearId = useId();
  const monthId = useId();
  const y = Math.max(1, Math.trunc(parseNumber(year)) || current.jy);
  const m = Math.min(12, Math.max(1, Math.trunc(parseNumber(month)) || current.jm));
  const calendar = buildJalaaliMonth(y, m);

  return (
    <ToolCardShell>
      <div className="tool-field-grid">
        <div className="toolbo-field">
          <Label htmlFor={yearId} className="mb-2 block">سال</Label>
          <Input
            id={yearId}
            name="calendar-year"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="tool-input"
          />
        </div>
        <div className="toolbo-field">
          <Label htmlFor={monthId} className="mb-2 block">ماه</Label>
          <Select value={String(m)} onValueChange={setMonth}>
            <SelectTrigger id={monthId} className="tool-input h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {persianMonths.map((name, index) => (
                <SelectItem key={name} value={String(index + 1)}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="tool-calendar" aria-label={`تقویم ${persianMonths[m - 1]} ${toPersianDigits(y)}`}>
        {["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"].map((day) => (
          <div key={day} className="tool-calendar-weekday">
            {day}
          </div>
        ))}
        {calendar.cells.map((day, index) => (
          <div
            key={`${day ?? "empty"}-${index}`}
            className={cn("tool-calendar-day", !day && "is-empty", index % 7 === 6 && "is-friday", day === current.jd && m === current.jm && y === current.jy && "is-today")}
            aria-current={day === current.jd && m === current.jm && y === current.jy ? "date" : undefined}
          >
            {day ? toPersianDigits(day) : ""}
          </div>
        ))}
      </div>
    </ToolCardShell>
  );
}

function DateConvertTool({ tool }: { tool: ToolWithCategory }) {
  const today = new Date();
  const jToday = gregorianToJalaaliDate(today);
  const [mode, setMode] = useState("gregorian");
  const [date, setDate] = useState(formatGregorian(today));
  const [jy, setJy] = useState(String(jToday.jy));
  const [jm, setJm] = useState(String(jToday.jm));
  const [jd, setJd] = useState(String(jToday.jd));
  const modeId = useId();
  const dateId = useId();

  const converted = useMemo(() => {
    const target =
      mode === "gregorian"
        ? gregorianDateFromInput(date)
        : jalaaliToGregorianDate(parseNumber(jy), parseNumber(jm), parseNumber(jd));
    if (!target) return null;
    return [
      { label: "تاریخ شمسی", value: formatJalaali(target) },
      { label: "تاریخ میلادی", value: formatGregorian(target) },
      { label: "تاریخ قمری", value: formatIslamic(target) },
      { label: "روز هفته", value: weekdayFormatter.format(target) },
      { label: "تایم استمپ", value: Math.floor(target.getTime() / 1000).toString() },
    ];
  }, [date, jd, jm, jy, mode]);
  const { entries, clearHistory } = useRememberResultHistory({
    enabled: true,
    result: converted,
    title: tool.title,
    url: tool.url,
  });

  return (
    <ToolCardShell>
      <Label htmlFor={modeId} className="mb-2 block">نوع ورودی تاریخ</Label>
      <Select value={mode} onValueChange={setMode}>
        <SelectTrigger id={modeId} className="tool-input h-10 w-full sm:w-60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gregorian">ورودی میلادی</SelectItem>
          <SelectItem value="jalaali">ورودی شمسی</SelectItem>
        </SelectContent>
      </Select>
      {mode === "gregorian" ? (
        <div className="mt-4 max-w-sm">
          <Label htmlFor={dateId} className="mb-2 block">تاریخ میلادی</Label>
          <Input
            id={dateId}
            name="gregorian-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="tool-input"
          />
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <LabeledInput label="سال" value={jy} onChange={setJy} />
          <LabeledInput label="ماه" value={jm} onChange={setJm} />
          <LabeledInput label="روز" value={jd} onChange={setJd} />
        </div>
      )}
      <ResultBox result={converted} title={tool.title} filenameSlug={tool.slug} />
      <ToolHistory
        title={tool.title}
        url={tool.url}
        entries={entries}
        onClear={clearHistory}
      />
    </ToolCardShell>
  );
}

function AgeTool({ tool }: { tool: ToolWithCategory }) {
  const [birth, setBirth] = useState("2000-01-01");
  const birthId = useId();
  const date = gregorianDateFromInput(birth);
  const diff = date ? diffDates(date, new Date()) : null;
  const result = diff
    ? [
        { label: "سال", value: toPersianDigits(diff.years) },
        { label: "ماه", value: toPersianDigits(diff.months) },
        { label: "روز", value: toPersianDigits(diff.days) },
        { label: "کل روزها", value: formatNumber(diff.totalDays, 0) },
      ]
    : "تاریخ معتبر وارد کنید.";
  const { entries, clearHistory } = useRememberResultHistory({
    enabled: true,
    result,
    title: tool.title,
    url: tool.url,
  });

  return (
    <ToolCardShell>
      <div className="max-w-sm">
        <Label htmlFor={birthId} className="mb-2 block">تاریخ تولد میلادی</Label>
        <Input
          id={birthId}
          name="birth-date"
          type="date"
          value={birth}
          onChange={(event) => setBirth(event.target.value)}
          className="tool-input"
        />
      </div>
      <ResultBox result={result} title={tool.title} filenameSlug={tool.slug} />
      <ToolHistory
        title={tool.title}
        url={tool.url}
        entries={entries}
        onClear={clearHistory}
      />
    </ToolCardShell>
  );
}

function DateDiffTool() {
  const [start, setStart] = useState("2020-01-01");
  const [end, setEnd] = useState(formatGregorian(new Date()));
  const startDate = gregorianDateFromInput(start);
  const endDate = gregorianDateFromInput(end);
  const diff = startDate && endDate ? diffDates(startDate, endDate) : null;

  return (
    <ToolCardShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <LabeledInput label="تاریخ شروع" type="date" value={start} onChange={setStart} />
        <LabeledInput label="تاریخ پایان" type="date" value={end} onChange={setEnd} />
      </div>
      <ResultBox
        result={
          diff
            ? [
                { label: "سال", value: toPersianDigits(diff.years) },
                { label: "ماه", value: toPersianDigits(diff.months) },
                { label: "روز", value: toPersianDigits(diff.days) },
                { label: "کل روزها", value: formatNumber(diff.totalDays, 0) },
              ]
            : "تاریخ پایان باید بعد از تاریخ شروع باشد."
        }
      />
    </ToolCardShell>
  );
}

type PrayerResponse = {
  data?: { timings?: Record<string, string> };
};

function PrayerTool() {
  const cities = (religiousCities as { city: { Name: string; LName: string }[] }).city;
  const [city, setCity] = useState("Tehran");
  const [result, setResult] = useState<ResultLine[] | string | null>(null);
  const cityId = useId();

  async function loadPrayerTimes() {
    setResult("در حال دریافت...");
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
          city
        )}&country=Iran&method=7`
      );
      const data = (await response.json()) as PrayerResponse;
      const timings = data.data?.timings;
      if (!timings) throw new Error("No timings");
      setResult([
        { label: "اذان صبح", value: timings.Fajr },
        { label: "طلوع", value: timings.Sunrise },
        { label: "اذان ظهر", value: timings.Dhuhr },
        { label: "اذان مغرب", value: timings.Maghrib },
        { label: "نیمه شب شرعی", value: timings.Midnight },
      ]);
    } catch {
      setResult("دریافت اوقات شرعی ممکن نشد.");
    }
  }

  return (
    <ToolCardShell>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="toolbo-field">
          <Label htmlFor={cityId} className="mb-2 block">شهر</Label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger id={cityId} className="tool-input h-10 w-full sm:w-72">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cities.slice(0, 80).map((item) => (
                <SelectItem key={`${item.LName}-${item.Name}`} value={item.LName.trim()}>
                  {item.Name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="button" onClick={loadPrayerTimes} className="bn632-hover">
          دریافت اوقات شرعی
        </Button>
      </div>
      <ResultBox result={result} />
    </ToolCardShell>
  );
}

function TimerTool() {
  const [seconds, setSeconds] = useState("60");
  const [remaining, setRemaining] = useState(60);
  const [running, setRunning] = useState(false);
  const secondsId = useId();
  const done = remaining === 0 && !running;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setRunning(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <ToolCardShell>
      <div className="max-w-sm">
        <Label htmlFor={secondsId} className="mb-2 block">ثانیه</Label>
        <Input
          id={secondsId}
          name="timer-seconds"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={seconds}
          onChange={(event) => setSeconds(event.target.value)}
          className="tool-input"
        />
      </div>
      <div className="my-5 text-center text-5xl font-bold tabular-nums">
        {formatDuration(remaining)}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          className="bn632-hover"
          onClick={() => {
            if (!running) {
              const parsed = Math.max(0, Math.trunc(parseNumber(seconds)));
              setRemaining((current) => (current === 0 ? parsed : current));
            }
            setRunning((current) => !current);
          }}
        >
          {running ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          {running ? "توقف" : "شروع"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bn632-hover"
          onClick={() => {
            setRunning(false);
            setRemaining(Math.max(0, Math.trunc(parseNumber(seconds))));
          }}
        >
          <RotateCcw aria-hidden="true" />
          تنظیم
        </Button>
      </div>
      {done && <ResultBox result="زمان تمام شد." />}
    </ToolCardShell>
  );
}

function AlarmTool() {
  const [time, setTime] = useState("07:00");
  const [message, setMessage] = useState("زنگ هشدار تنظیم نشده است.");
  const timeId = useId();

  useEffect(() => {
    const timer = window.setInterval(() => {
      const now = new Date();
      const current = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;
      if (current === time) {
        setMessage("زمان زنگ هشدار رسید.");
      }
    }, 1000);
    return () => window.clearInterval(timer);
  }, [time]);

  return (
    <ToolCardShell>
      <div className="max-w-sm">
        <Label htmlFor={timeId} className="mb-2 block">زمان هشدار</Label>
        <Input
          id={timeId}
          name="alarm-time"
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className="tool-input"
        />
      </div>
      <ResultBox result={message} />
    </ToolCardShell>
  );
}

function StopwatchTool() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <ToolCardShell>
      <div className="my-4 text-center text-5xl font-bold tabular-nums">
        {formatDuration(elapsed)}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          className="bn632-hover"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
          {running ? "توقف" : "شروع"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bn632-hover"
          onClick={() => setLaps((items) => [elapsed, ...items])}
        >
          ثبت رکورد
        </Button>
        <Button
          type="button"
          variant="outline"
          className="bn632-hover"
          onClick={() => {
            setRunning(false);
            setElapsed(0);
            setLaps([]);
          }}
        >
          <RotateCcw aria-hidden="true" />
          صفر
        </Button>
      </div>
      <ResultBox
        result={laps.map((lap, index) => ({
          label: `رکورد ${index + 1}`,
          value: formatDuration(lap),
        }))}
      />
    </ToolCardShell>
  );
}

function BankCardTool() {
  const [query, setQuery] = useState("");
  const normalized = toEnglishDigits(query).slice(0, 6);
  const exact = bankCards.find((bank) => bank.card === normalized);
  const byName = bankCards.filter((bank) => bank.bank.includes(query.trim()));

  return (
    <ToolCardShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <LabeledInput label="شش رقم اول کارت" value={query} onChange={setQuery} />
        <LabeledInput label="نام بانک" value={query} onChange={setQuery} />
      </div>
      <ResultBox
        result={
          exact
            ? [{ label: "بانک", value: exact.bank }, { label: "پیش شماره", value: exact.card }]
            : byName.length
              ? byName.map((bank) => ({ label: bank.bank, value: bank.card }))
              : query.trim()
                ? "موردی پیدا نشد."
                : null
        }
      />
    </ToolCardShell>
  );
}

function NationalCodeTool() {
  const entries = (nationalCodes as {
    "national-number": { city: string; num: Array<string | number> }[];
  })["national-number"];
  const [query, setQuery] = useState("");
  const normalized = toEnglishDigits(query).padStart(3, "0");
  const results = entries.filter(
    (item) =>
      item.city.includes(query.trim()) ||
      item.num.some((num) => String(num).padStart(3, "0") === normalized)
  );

  return (
    <ToolCardShell>
      <LabeledInput label="کد سه رقمی یا نام شهر" value={query} onChange={setQuery} />
      <ResultBox
        result={
          query.trim()
            ? results.length
              ? results.slice(0, 20).map((item) => ({
                  label: item.city,
                  value: item.num.map((num) => String(num).padStart(3, "0")).join("، "),
                }))
              : "موردی پیدا نشد."
            : null
        }
      />
    </ToolCardShell>
  );
}

function TextTransformTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("upper");
  const modeId = useId();
  const textId = useId();
  const result =
    mode === "upper"
      ? text.toUpperCase()
      : mode === "lower"
        ? text.toLowerCase()
        : mode === "capitalize"
          ? text.replace(/\b\w/g, (char) => char.toUpperCase())
          : text
              .split("")
              .map((char) =>
                char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
              )
              .join("");

  return (
    <ToolCardShell>
      <div className="space-y-4">
        <Label htmlFor={modeId} className="mb-2 block">نوع تبدیل متن</Label>
        <Select value={mode} onValueChange={setMode}>
          <SelectTrigger id={modeId} className="tool-input h-10 w-full sm:w-60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upper">حروف بزرگ</SelectItem>
            <SelectItem value="lower">حروف کوچک</SelectItem>
            <SelectItem value="capitalize">کپیتال</SelectItem>
            <SelectItem value="toggle">برعکس کردن حالت</SelectItem>
          </SelectContent>
        </Select>
        <Label htmlFor={textId} className="mb-2 block">متن</Label>
        <Textarea
          id={textId}
          name="text-transform-input"
          autoComplete="off"
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="tool-input min-h-40"
          dir="ltr"
        />
        <CopyButton text={result} />
        <ResultBox result={result} />
      </div>
    </ToolCardShell>
  );
}

function TextCounterTool({ tool }: { tool: ToolWithCategory }) {
  const [text, setText] = useState("");
  const textId = useId();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const result = [
    { label: "کاراکتر با فاصله", value: formatNumber(text.length, 0) },
    {
      label: "کاراکتر بدون فاصله",
      value: formatNumber(text.replace(/\s/g, "").length, 0),
    },
    { label: "کلمه", value: formatNumber(words, 0) },
    { label: "جمله", value: formatNumber((text.match(/[.!؟?]+/g) ?? []).length, 0) },
    {
      label: "پاراگراف",
      value: formatNumber(text.trim() ? text.trim().split(/\n\s*\n/).length : 0, 0),
    },
    {
      label: "زمان مطالعه",
      value: words === 0 ? "۰ دقیقه" : `${toPersianDigits(Math.max(1, Math.ceil(words / 200)))} دقیقه`,
    },
  ];
  const { entries, addHistory, clearHistory } = useToolHistory(tool.url);
  const summary = `${tool.title}\n${resultToText(result)}`;

  return (
    <ToolCardShell>
      <Label htmlFor={textId} className="mb-2 block">متن</Label>
      <Textarea
        id={textId}
        name="text-counter-input"
        autoComplete="off"
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="tool-input min-h-44"
      />
      <div className="mt-3">
        <Button
          type="button"
          variant="outline"
          className="bn632-hover"
          disabled={!text.trim()}
          onClick={() => addHistory(summary)}
        >
          ذخیره خلاصه
        </Button>
      </div>
      <ResultBox result={result} title={tool.title} filenameSlug={tool.slug} />
      <ToolHistory
        title={tool.title}
        url={tool.url}
        entries={entries}
        onClear={clearHistory}
      />
    </ToolCardShell>
  );
}

function LoremTool() {
  const [language, setLanguage] = useState("fa");
  const [count, setCount] = useState("2");
  const languageId = useId();
  const outputId = useId();
  const fa =
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.";
  const en =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const text = Array.from(
    { length: Math.max(1, Math.min(20, Math.trunc(parseNumber(count)) || 1)) },
    () => (language === "fa" ? fa : en)
  ).join("\n\n");

  return (
    <ToolCardShell>
      <div className="tool-field-grid">
        <div className="toolbo-field">
          <Label htmlFor={languageId} className="mb-2 block">زبان</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id={languageId} className="tool-input h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fa">فارسی</SelectItem>
              <SelectItem value="en">انگلیسی</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <LabeledInput label="تعداد پاراگراف" value={count} onChange={setCount} />
      </div>
      <Label htmlFor={outputId} className="mb-2 mt-4 block">متن ساخته شده</Label>
      <Textarea
        id={outputId}
        name="lorem-output"
        value={text}
        readOnly
        className="tool-input mt-4 min-h-56"
        dir={language === "fa" ? "rtl" : "ltr"}
      />
      <div className="mt-3">
        <CopyButton text={text} />
      </div>
    </ToolCardShell>
  );
}

function PasswordTool({ tool }: { tool: ToolWithCategory }) {
  const [length, setLength] = useState("16");
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const { entries, addHistory, clearHistory } = useToolHistory(tool.url);
  const options = [
    { label: "حروف بزرگ", value: upper, set: setUpper, chars: "ABCDEFGHJKLMNPQRSTUVWXYZ" },
    { label: "حروف کوچک", value: lower, set: setLower, chars: "abcdefghijkmnopqrstuvwxyz" },
    { label: "عدد", value: numbers, set: setNumbers, chars: "23456789" },
    { label: "کاراکتر خاص", value: symbols, set: setSymbols, chars: "!@#$%^&*()-_=+" },
  ];

  function generate() {
    const pool = options.filter((item) => item.value).map((item) => item.chars).join("");
    const size = Math.max(4, Math.min(128, Math.trunc(parseNumber(length)) || 16));
    if (!pool) {
      setPassword("حداقل یک گزینه را انتخاب کنید.");
      return;
    }
    const bytes = new Uint32Array(size);
    crypto.getRandomValues(bytes);
    setPassword(Array.from(bytes, (byte) => pool[byte % pool.length]).join(""));
  }

  return (
    <ToolCardShell>
      <div className="grid gap-4 sm:grid-cols-2">
        <LabeledInput label="طول پسورد" value={length} onChange={setLength} />
        <div className="grid gap-3 rounded-md border p-3">
          {options.map((item) => (
            <label key={item.label} className="flex items-center gap-2 text-sm">
              <Checkbox checked={item.value} onCheckedChange={(checked) => item.set(checked === true)} />
              {item.label}
            </label>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" onClick={generate} className="bn632-hover">
          تولید پسورد
        </Button>
        <CopyButton text={password} />
        <Button
          type="button"
          variant="outline"
          className="bn632-hover"
          disabled={!password || password.includes("حداقل")}
          onClick={() => addHistory(`${tool.title}\n${password}`)}
        >
          ذخیره در تاریخچه
        </Button>
      </div>
      <ResultBox result={password} title={tool.title} filenameSlug={tool.slug} />
      <ToolHistory
        title={tool.title}
        url={tool.url}
        entries={entries}
        onClear={clearHistory}
      />
    </ToolCardShell>
  );
}

function MyIpTool() {
  const [result, setResult] = useState<ResultLine[] | string | null>(null);

  async function loadIp() {
    setResult("در حال دریافت...");
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = (await response.json()) as { ip: string };
      setResult([{ label: "IP", value: data.ip }]);
    } catch {
      setResult("دریافت IP ممکن نشد.");
    }
  }

  return (
    <ToolCardShell>
      <Button type="button" onClick={loadIp} className="bn632-hover">
        نمایش IP
      </Button>
      <ResultBox result={result} />
    </ToolCardShell>
  );
}

function TimestampTool() {
  const [timestamp, setTimestamp] = useState("");
  const value = parseNumber(timestamp);
  const date = Number.isFinite(value) ? new Date(value * 1000) : null;

  return (
    <ToolCardShell>
      <LabeledInput label="Unix timestamp" value={timestamp} onChange={setTimestamp} />
      <div className="mt-3">
        <Button
          type="button"
          variant="outline"
          className="bn632-hover"
          onClick={() => setTimestamp(String(Math.floor(Date.now() / 1000)))}
        >
          اکنون
        </Button>
      </div>
      <ResultBox
        result={
          date
            ? [
                { label: "میلادی", value: formatGregorian(date) },
                { label: "شمسی", value: formatJalaali(date) },
                { label: "ساعت", value: date.toLocaleTimeString("fa-IR") },
              ]
            : "تایم استمپ معتبر نیست."
        }
      />
    </ToolCardShell>
  );
}

function BinaryTool() {
  const [text, setText] = useState("ToolBo");
  const textId = useId();
  const binary = text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
  const decoded = binary
    .split(/\s+/)
    .map((part) => String.fromCharCode(parseInt(part, 2)))
    .join("");

  return (
    <ToolCardShell>
      <Label htmlFor={textId} className="mb-2 block">متن</Label>
      <Textarea
        id={textId}
        name="binary-text"
        autoComplete="off"
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="tool-input min-h-32"
      />
      <ResultBox
        result={[
          { label: "باینری", value: binary },
          { label: "متن بازخوانی شده", value: decoded },
        ]}
      />
    </ToolCardShell>
  );
}

function ToolTrustMetadata({ metadata }: { metadata?: ToolMetadata }) {
  if (
    !metadata ||
    (!metadata.status &&
      !metadata.lastUpdated &&
      !metadata.sourceLabel &&
      !metadata.limitations?.length)
  ) {
    return null;
  }

  const statusLabel =
    metadata.status === "stable"
      ? "پایدار"
      : metadata.status === "beta"
        ? "آزمایشی"
        : "نیازمند بازبینی";

  return (
    <section className="tool-trust">
      <div className="workspace-sidebar-title"><Info size={17} aria-hidden="true" /><h2>درباره نتیجه</h2></div>
      {metadata.status && (
        <div>
          <span>وضعیت: </span>
          <strong>{statusLabel}</strong>
        </div>
      )}
      {metadata.lastUpdated && (
        <div>
          <span>بروزرسانی: </span>
          <strong><bdi>{toPersianDigits(metadata.lastUpdated)}</bdi></strong>
        </div>
      )}
      {metadata.sourceLabel && metadata.sourceUrl && (
        <a href={metadata.sourceUrl} target="_blank" rel="noreferrer">
          {metadata.sourceLabel}
        </a>
      )}
      {metadata.limitations?.slice(0, 1).map((item) => (
        <div key={item} className="tool-trust-note">
          {item}
        </div>
      ))}
    </section>
  );
}

function ToolExplainer({
  tool,
  metadata,
}: {
  tool: ToolWithCategory;
  metadata?: ToolMetadata;
}) {
  if (
    !metadata ||
    (!metadata.method &&
      !metadata.formula &&
      !metadata.examples?.length &&
      !metadata.limitations?.length &&
      !metadata.relatedTools?.length)
  ) {
    return null;
  }

  const related = metadata.relatedTools
    ?.map((url) => allTools.find((item) => item.url === url))
    .filter((item): item is ToolWithCategory => Boolean(item));

  return (
    <section className="tool-explainer" aria-label={`توضیح ${tool.title}`}>
      <div className="tool-subheading">درباره این ابزار</div>
      <div className="tool-explainer-grid">
        {metadata.method && (
          <div>
            <strong>روش</strong>
            <p>{metadata.method}</p>
          </div>
        )}
        {metadata.formula && (
          <div>
            <strong>فرمول</strong>
            <p dir="ltr">{metadata.formula}</p>
          </div>
        )}
        {metadata.examples?.slice(0, 1).map((example) => (
          <div key={example.label}>
            <strong>مثال: {example.label}</strong>
            <p>{example.expectedOutputSummary}</p>
          </div>
        ))}
        {metadata.limitations?.length ? (
          <div>
            <strong>محدودیت</strong>
            <p>{metadata.limitations[0]}</p>
          </div>
        ) : null}
      </div>
      {related && related.length > 0 && (
        <div className="tool-explainer-related">
          {related.map((item) => (
            <Link key={item.url} href={item.url}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  const id = useId();

  return (
    <div className="toolbo-field">
      <Label htmlFor={id} className="mb-2 block">{label}</Label>
      <Input
        id={id}
        name={label.toLowerCase().replace(/\s+/g, "-")}
        type={type}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="tool-input"
      />
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="bn632-hover"
      disabled={!text}
      onClick={() => navigator.clipboard.writeText(text)}
    >
      <Copy aria-hidden="true" />
      کپی
    </Button>
  );
}

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}
