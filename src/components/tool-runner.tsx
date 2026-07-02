"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Copy,
  Pause,
  Play,
  RotateCcw,
  Star,
} from "lucide-react";
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
import { useTheme } from "@/components/theme-provider";
import { categories, type ToolWithCategory } from "@/lib/tool-data";
import { cn } from "@/lib/utils";
import { unitGroups, type UnitGroupId, convertUnit } from "@/lib/unit-conversions";
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

type ResultLine = {
  label: string;
  value: string;
};

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

const calculators: Record<string, CalculatorDefinition> = {
  "/numbers/percent": {
    fields: [
      { name: "percent", label: "درصد", placeholder: "مثال: ۲" },
      { name: "number", label: "عدد", placeholder: "مثال: ۱۰۰۰" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["percent", "number"]);
      if (!nums) return "فیلد ها را کامل کنید.";
      return `${formatNumber(nums.percent)}% عدد ${formatNumber(
        nums.number
      )} = ${formatNumber(nums.number * (nums.percent / 100))}`;
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
        { label: "وضعیت", value: status },
      ];
    },
  },
  "/health/BMR": {
    fields: [
      { name: "weight", label: "وزن (کیلوگرم)" },
      { name: "height", label: "قد (سانتی متر)" },
      { name: "age", label: "سن" },
    ],
    calculate(values) {
      const nums = requireNumbers(values, ["weight", "height", "age"]);
      if (!nums) return "فیلد ها را کامل کنید.";
      return [
        {
          label: "مرد",
          value: `${formatNumber(
            66.47 + 13.75 * nums.weight + 5.003 * nums.height - 6.755 * nums.age,
            0
          )} کالری`,
        },
        {
          label: "زن",
          value: `${formatNumber(
            655.1 +
              9.563 * nums.weight +
              1.85 * nums.height -
              4.676 * nums.age,
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
  const { isDark } = useTheme();
  const favorite = isFavorite(tool.url);
  const related =
    categories
      .find((category) => category.url === tool.categoryUrl)
      ?.item.filter((item) => item.url !== tool.url)
      .slice(0, 3) ?? [];

  return (
    <>
      <div className="container_m">
        <div className="titleBox">
          <div className="title">{tool.title}</div>
          <div className="location">
            <div className="fontIcon">&#xe904;</div>
            <Link href="/">خانه</Link>
            <div className="slash">/</div>
            <Link href={tool.categoryUrl}>{tool.categoryTitle}</Link>
            <div className="slash">/</div>
            <Link href={tool.url}>{tool.title}</Link>
          </div>
        </div>
      </div>

      <div className="container_m">
        <div className="c_tools">
          <section className={cn("tool", isDark && "tool_D")}>
            <div className="title_tool">{tool.title}</div>
            <div className="tool_content">{renderTool(tool)}</div>
          </section>

          <aside className="side">
            <div className={cn("info", isDark && "info_D")}>
              <div>
                <span className="fontIcon IH">&#xe914;</span>
                در صورتی که این ابزار برای شما کاربردی بوده است میتوانید از طریق
                دکمه زیر آن را به ابزار های کاربردی اضافه کنید.
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(tool)}
                className={cn("btnAdd", favorite && "btnAdd_A")}
              >
                <Star size={14} fill={favorite ? "currentColor" : "none"} />
                {favorite ? "حذف کردن" : "اضافه کردن"}
              </button>
            </div>
          </aside>

          {related.length > 0 && (
            <section className="tool-related">
              <div className={cn("headingTU", isDark && "headingTU_D")}>
                ابزار های مرتبط
              </div>
              <div className="containerTU">
                {related.map((item) => (
                  <ToolCard key={item.url} tool={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

function renderTool(tool: ToolWithCategory) {
  if (tool.url in calculators) {
    return <CalculatorTool definition={calculators[tool.url]} />;
  }

  if (tool.url.startsWith("/conversions/")) {
    return <ConversionTool url={tool.url} />;
  }

  switch (tool.url) {
    case "/time/date":
      return <TodayTool />;
    case "/time/cleander":
      return <CalendarTool />;
    case "/time/convertor":
      return <DateConvertTool />;
    case "/time/mathAge":
      return <AgeTool />;
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
      return <TextCounterTool />;
    case "/text/Lorem":
      return <LoremTool />;
    case "/technology/password-random":
      return <PasswordTool />;
    case "/technology/MyIP":
      return <MyIpTool />;
    case "/technology/TimeStamp":
      return <TimestampTool />;
    case "/technology/binary":
      return <BinaryTool />;
    default:
      return (
        <ResultBox
          result="این ابزار هنوز در نسخه React پیاده سازی نشده است."
          tone="muted"
        />
      );
  }
}

function CalculatorTool({ definition }: { definition: CalculatorDefinition }) {
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

  return (
    <ToolCardShell>
      <form
        onSubmit={(event) => {
          event.preventDefault();
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
          <span className="fontIcon">&#xe906;</span>
          محاسبه
        </Button>
      </form>
      <ResultBox result={result} />
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
  return (
    <div className={cn("toolbo-field", field.kind === "textarea" && "md:col-span-2")}>
      <Label className="mb-2 block">{field.label}</Label>
      {field.kind === "select" ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="tool-input h-10 w-full">
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
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          dir={field.dir}
          className="tool-input min-h-36"
        />
      ) : (
        <Input
          value={value}
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
}: {
  result: ResultLine[] | string | null;
  tone?: "default" | "muted";
}) {
  const { isDark } = useTheme();

  if (!result) return null;

  return (
    <div className={cn("Result", isDark && "Result_D")}>
      <div className="title_tool">نتیجه</div>
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
  return <div>{children}</div>;
}

function ConversionTool({ url }: { url: string }) {
  const group = url.endsWith("convert-weight")
    ? "weight"
    : url.endsWith("convert-length")
      ? "length"
      : url.endsWith("convert-speed")
        ? "speed"
        : url.endsWith("convert-temperature")
          ? "temperature"
          : "time";
  const units = unitGroups[group as UnitGroupId];
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState(units[0].id);
  const [to, setTo] = useState(units[1]?.id ?? units[0].id);
  const value = parseNumber(amount);
  const converted = Number.isFinite(value)
    ? convertUnit(group as UnitGroupId, value, from, to)
    : null;

  return (
    <ToolCardShell>
      <div className="tool-field-grid">
        <div className="toolbo-field">
          <Label className="mb-2 block">مقدار</Label>
          <Input
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="tool-input"
          />
        </div>
        <UnitSelect label="از" units={units} value={from} onChange={setFrom} />
        <UnitSelect label="به" units={units} value={to} onChange={setTo} />
      </div>
      <ResultBox
        result={
          converted === null
            ? null
            : `${amount} ${units.find((unit) => unit.id === from)?.label} معادل ${formatNumber(
                converted,
                6
              )} ${units.find((unit) => unit.id === to)?.label}`
        }
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
  return (
    <div className="toolbo-field">
      <Label className="mb-2 block">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="tool-input h-10 w-full">
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

function TodayTool() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const jalaali = gregorianToJalaaliDate(now);

  return (
    <ToolCardShell>
      <div className="grid gap-4 md:grid-cols-3">
        <InfoTile label="ساعت" value={now.toLocaleTimeString("fa-IR")} />
        <InfoTile label="شمسی" value={`${jalaali.jd} ${persianMonths[jalaali.jm - 1]} ${jalaali.jy}`} />
        <InfoTile label="میلادی" value={now.toLocaleDateString("en-CA")} />
        <InfoTile label="قمری" value={formatIslamic(now)} />
        <InfoTile label="تایم استمپ" value={Math.floor(now.getTime() / 1000).toString()} />
      </div>
    </ToolCardShell>
  );
}

function CalendarTool() {
  const current = todayJalaali();
  const [year, setYear] = useState(String(current.jy));
  const [month, setMonth] = useState(String(current.jm));
  const y = Math.max(1, Math.trunc(parseNumber(year)) || current.jy);
  const m = Math.min(12, Math.max(1, Math.trunc(parseNumber(month)) || current.jm));
  const calendar = buildJalaaliMonth(y, m);

  return (
    <ToolCardShell>
      <div className="tool-field-grid">
        <div className="toolbo-field">
          <Label className="mb-2 block">سال</Label>
          <Input
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="tool-input"
          />
        </div>
        <div className="toolbo-field">
          <Label className="mb-2 block">ماه</Label>
          <Select value={String(m)} onValueChange={setMonth}>
            <SelectTrigger className="tool-input h-10 w-full">
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
      <div className="mt-5 grid grid-cols-7 gap-2 text-center text-sm">
        {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
          <div key={day} className="rounded-md bg-muted p-2 font-semibold">
            {day}
          </div>
        ))}
        {calendar.cells.map((day, index) => (
          <div
            key={`${day ?? "empty"}-${index}`}
            className="min-h-10 rounded-md border bg-background p-2"
          >
            {day ? toPersianDigits(day) : ""}
          </div>
        ))}
      </div>
    </ToolCardShell>
  );
}

function DateConvertTool() {
  const today = new Date();
  const jToday = gregorianToJalaaliDate(today);
  const [mode, setMode] = useState("gregorian");
  const [date, setDate] = useState(formatGregorian(today));
  const [jy, setJy] = useState(String(jToday.jy));
  const [jm, setJm] = useState(String(jToday.jm));
  const [jd, setJd] = useState(String(jToday.jd));

  const converted = useMemo(() => {
    const target =
      mode === "gregorian"
        ? gregorianDateFromInput(date)
        : jalaaliToGregorianDate(parseNumber(jy), parseNumber(jm), parseNumber(jd));
    if (!target) return null;
    return [
      { label: "شمسی", value: formatJalaali(target) },
      { label: "میلادی", value: formatGregorian(target) },
      { label: "قمری", value: formatIslamic(target) },
      { label: "تایم استمپ", value: Math.floor(target.getTime() / 1000).toString() },
    ];
  }, [date, jd, jm, jy, mode]);

  return (
    <ToolCardShell>
      <Select value={mode} onValueChange={setMode}>
        <SelectTrigger className="tool-input h-10 w-full sm:w-60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gregorian">ورودی میلادی</SelectItem>
          <SelectItem value="jalaali">ورودی شمسی</SelectItem>
        </SelectContent>
      </Select>
      {mode === "gregorian" ? (
        <div className="mt-4 max-w-sm">
          <Label className="mb-2 block">تاریخ میلادی</Label>
          <Input
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
      <ResultBox result={converted} />
    </ToolCardShell>
  );
}

function AgeTool() {
  const [birth, setBirth] = useState("2000-01-01");
  const date = gregorianDateFromInput(birth);
  const diff = date ? diffDates(date, new Date()) : null;

  return (
    <ToolCardShell>
      <div className="max-w-sm">
        <Label className="mb-2 block">تاریخ تولد میلادی</Label>
        <Input
          type="date"
          value={birth}
          onChange={(event) => setBirth(event.target.value)}
          className="tool-input"
        />
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
            : "تاریخ معتبر وارد کنید."
        }
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
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="tool-input h-10 w-full sm:w-72">
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
        <Label className="mb-2 block">ثانیه</Label>
        <Input
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
          {running ? <Pause /> : <Play />}
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
          <RotateCcw />
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
        <Label className="mb-2 block">زمان هشدار</Label>
        <Input
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
          {running ? <Pause /> : <Play />}
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
          <RotateCcw />
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
        <Select value={mode} onValueChange={setMode}>
          <SelectTrigger className="tool-input h-10 w-full sm:w-60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upper">حروف بزرگ</SelectItem>
            <SelectItem value="lower">حروف کوچک</SelectItem>
            <SelectItem value="capitalize">کپیتال</SelectItem>
            <SelectItem value="toggle">برعکس کردن حالت</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
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

function TextCounterTool() {
  const [text, setText] = useState("");
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <ToolCardShell>
      <Textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        className="tool-input min-h-44"
      />
      <ResultBox
        result={[
          { label: "کلمه", value: formatNumber(words, 0) },
          { label: "کاراکتر", value: formatNumber(text.length, 0) },
          { label: "جمله", value: formatNumber((text.match(/[.!؟?]+/g) ?? []).length, 0) },
        ]}
      />
    </ToolCardShell>
  );
}

function LoremTool() {
  const [language, setLanguage] = useState("fa");
  const [count, setCount] = useState("2");
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
          <Label className="mb-2 block">زبان</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="tool-input h-10 w-full">
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
      <Textarea
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

function PasswordTool() {
  const [length, setLength] = useState("16");
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
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
      </div>
      <ResultBox result={password} />
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
      <Label className="mb-2 block">متن</Label>
      <Textarea
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

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="result-item">
      <div className="result-label">{label}</div>
      <div className="result-value">{value}</div>
    </div>
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
  return (
    <div className="toolbo-field">
      <Label className="mb-2 block">{label}</Label>
      <Input
        type={type}
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
      <Copy />
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
