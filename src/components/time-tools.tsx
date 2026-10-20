"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { CalendarPlus, Check, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { ResultActions } from "@/components/result-actions";
import { TodayDashboard } from "@/components/today-dashboard";
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
import { useTheme } from "@/components/theme-provider";
import {
  addCalendarDays,
  countWorkingDays,
  describeDate,
  formatDateInZone,
  formatDurationParts,
  formatMinuteDifference,
  formatTimeInZone,
  getCountdownPresets,
  getDefaultCountdownDate,
  getEventsForDate,
  getEventsForJalaaliDate,
  getFixedHolidayRows,
  getJalaaliDateLabel,
  getTimeZoneDifferenceMinutes,
  getUpcomingJalaaliEvents,
  worldTimeZones,
} from "@/lib/daily-time";
import { resultToText, type ResultLine, type ToolResult } from "@/lib/result-format";
import { cn } from "@/lib/utils";
import {
  formatGregorian,
  formatIslamic,
  formatJalaali,
  formatNumber,
  gregorianDateFromInput,
  gregorianToJalaaliDate,
  jalaaliToGregorianDate,
  parseNumber,
  persianMonths,
  toPersianDigits,
} from "@/lib/tool-utils";

type DailyTableRow = Array<string | number>;

function useLiveNow() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let disposed = false;
    const updateClock = () => {
      if (!disposed) {
        setNow(new Date());
      }
    };
    const initialTimer = window.setTimeout(updateClock, 0);
    const timer = window.setInterval(updateClock, 1000);

    return () => {
      disposed = true;
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, []);

  return now;
}

function formatDateTimeLocalInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hour}:${minute}`;
}

function DailyResultBox({
  result,
  title,
  filenameSlug,
}: {
  result: ToolResult;
  title: string;
  filenameSlug: string;
}) {
  const { isDark } = useTheme();
  const text = resultToText(result);

  if (!result) return null;

  return (
    <div
      className={cn("Result", isDark && "Result_D")}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="title_tool result-title-row">
        <span className="result-heading-label"><Check size={18} aria-hidden="true" />نتیجه آماده است</span>
        <ResultActions title={title} text={text} filenameSlug={filenameSlug} />
      </div>
      {typeof result === "string" ? (
        <p className="textResult">{result}</p>
      ) : (
        <div className="result-grid">
          {result.map((line) => (
            <div key={`${line.label}-${line.value}`} className="result-item">
              <div className="result-label">{line.label}</div>
              <div className="result-value">{line.value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DailyTable({
  title,
  filenameSlug,
  headers,
  rows,
}: {
  title: string;
  filenameSlug: string;
  headers: string[];
  rows: DailyTableRow[];
}) {
  const text = [
    title,
    headers.join("\t"),
    ...rows.map((row) => row.map(String).join("\t")),
  ].join("\n");

  if (rows.length === 0) {
    return null;
  }

  return (
    <section className="daily-table-section">
      <div className="loan-schedule-header">
        <div className="tool-subheading">{title}</div>
        <ResultActions title={title} text={text} filenameSlug={filenameSlug} canPrint={false} />
      </div>
      <div className="daily-table-wrapper">
        <table className="daily-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.join("-") || rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function LabeledDateInput({
  label,
  value,
  onChange,
  type = "date",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "date" | "datetime-local";
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

function TimeZoneSelect({
  label,
  value,
  onChange,
}: {
  label: string;
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
          {worldTimeZones.map((zone) => (
            <SelectItem key={zone.id} value={zone.id}>
              {zone.label} · {zone.city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function TodayDashboardTool() {
  const now = useLiveNow();
  if (!now) {
    return <TodayDashboard surface="tool" />;
  }

  const todayEvents = getEventsForDate(now);
  const result: ResultLine[] = [
    { label: "شمسی", value: getJalaaliDateLabel(now) },
    { label: "میلادی", value: formatGregorian(now) },
    { label: "قمری", value: formatIslamic(now) },
    { label: "ساعت", value: now.toLocaleTimeString("fa-IR") },
    {
      label: "مناسبت امروز",
      value: todayEvents.length
        ? todayEvents.map((event) => event.title).join("، ")
        : "مناسبت ثابتی ثبت نشده است.",
    },
  ];

  return (
    <div className="daily-tool-stack">
      <TodayDashboard surface="tool" />
      <DailyResultBox
        result={result}
        title="داشبورد امروز تولبو"
        filenameSlug="today-dashboard"
      />
    </div>
  );
}

export function HolidayTool() {
  const currentYear = gregorianToJalaaliDate(new Date()).jy;
  const [year, setYear] = useState(String(currentYear));
  const yearId = useId();
  const parsedYear = Math.max(1, Math.trunc(parseNumber(year)) || currentYear);
  const rows = getFixedHolidayRows(parsedYear);
  const result: ResultLine[] = [
    { label: "سال شمسی", value: toPersianDigits(parsedYear) },
    { label: "تعطیل ثابت", value: toPersianDigits(rows.length) },
    {
      label: "دامنه",
      value: "تعطیل‌های رسمی ثابت در تقویم شمسی",
    },
  ];

  return (
    <div className="daily-tool-stack">
      <div className="tool-field-grid">
        <div className="toolbo-field">
          <Label htmlFor={yearId} className="mb-2 block">سال شمسی</Label>
          <Input
            id={yearId}
            name="jalaali-year"
            type="text"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="tool-input"
            inputMode="numeric"
            autoComplete="off"
          />
        </div>
      </div>
      <DailyResultBox result={result} title="تعطیل‌های رسمی ایران" filenameSlug="iran-holidays" />
      <DailyTable
        title="تعطیل‌های ثابت این سال"
        filenameSlug={`iran-holidays-${parsedYear}`}
        headers={["مناسبت", "تاریخ شمسی", "روز هفته", "تاریخ میلادی"]}
        rows={rows.map((row) => [
          row.title,
          row.jalaaliLabel,
          row.weekday,
          row.gregorianLabel,
        ])}
      />
      <p className="daily-note">
        مناسبت‌های قمری و تغییرات اعلامی سالانه باید قبل از استفاده رسمی بازبینی شوند.
      </p>
    </div>
  );
}

export function EventsTool() {
  const now = useLiveNow();
  if (!now) {
    return <DailyResultBox result="در حال آماده‌سازی تقویم..." title="مناسبت‌های امروز" filenameSlug="events-today" />;
  }

  const todayEvents = getEventsForDate(now);
  const upcoming = getUpcomingJalaaliEvents(now, 60).filter(
    (event) => event.offsetDays > 0
  );
  const result: ResultLine[] = [
    { label: "امروز", value: getJalaaliDateLabel(now) },
    {
      label: "مناسبت امروز",
      value: todayEvents.length
        ? todayEvents.map((event) => event.title).join("، ")
        : "مناسبت ثابتی ثبت نشده است.",
    },
    {
      label: "نزدیک‌ترین مناسبت",
      value: upcoming[0]
        ? `${upcoming[0].title}، ${toPersianDigits(upcoming[0].offsetDays)} روز دیگر`
        : "در بازه ۶۰ روزه موردی پیدا نشد.",
    },
  ];

  return (
    <div className="daily-tool-stack">
      <DailyResultBox result={result} title="مناسبت‌های امروز" filenameSlug="events-today" />
      <DailyTable
        title="مناسبت‌های نزدیک"
        filenameSlug="upcoming-events"
        headers={["مناسبت", "نوع", "تاریخ شمسی", "روز هفته", "فاصله"]}
        rows={upcoming.slice(0, 12).map((event) => [
          event.title,
          event.type === "holiday" ? "تعطیل رسمی" : "مناسبت",
          event.jalaaliLabel,
          event.weekday,
          `${toPersianDigits(event.offsetDays)} روز`,
        ])}
      />
      <p className="daily-note">
        این فهرست برای استفاده سریع روزانه است و مناسبت‌های قمری را به صورت پویا محاسبه نمی‌کند.
      </p>
    </div>
  );
}

export function WorkingDaysTool() {
  const today = new Date();
  const [start, setStart] = useState(formatGregorian(today));
  const [end, setEnd] = useState(formatGregorian(addCalendarDays(today, 30)));
  const [excludeThursdays, setExcludeThursdays] = useState(false);
  const [includeFixedOfficialHolidays, setIncludeFixedOfficialHolidays] =
    useState(true);
  const startDate = gregorianDateFromInput(start);
  const endDate = gregorianDateFromInput(end);
  const summary =
    startDate && endDate
      ? countWorkingDays(startDate, endDate, {
          excludeThursdays,
          includeFixedOfficialHolidays,
        })
      : null;
  const result: ToolResult = summary
    ? [
        { label: "کل روزهای بازه", value: formatNumber(summary.totalDays, 0) },
        { label: "روز کاری", value: formatNumber(summary.workingDays, 0) },
        { label: "روز غیرکاری", value: formatNumber(summary.nonWorkingDays, 0) },
        { label: "جمعه‌ها", value: formatNumber(summary.fridayCount, 0) },
        {
          label: "پنجشنبه‌ها",
          value: excludeThursdays ? formatNumber(summary.thursdayCount, 0) : "محاسبه نشده",
        },
        {
          label: "تعطیل ثابت",
          value: includeFixedOfficialHolidays
            ? formatNumber(summary.fixedHolidayCount, 0)
            : "محاسبه نشده",
        },
      ]
    : "تاریخ شروع و پایان را کامل کنید.";

  return (
    <div className="daily-tool-stack">
      <div className="tool-field-grid">
        <LabeledDateInput label="تاریخ شروع" value={start} onChange={setStart} />
        <LabeledDateInput label="تاریخ پایان" value={end} onChange={setEnd} />
      </div>
      <div className="daily-options">
        <label>
          <Checkbox
            checked={includeFixedOfficialHolidays}
            onCheckedChange={(checked) => setIncludeFixedOfficialHolidays(checked === true)}
          />
          حذف تعطیل‌های رسمی ثابت
        </label>
        <label>
          <Checkbox
            checked={excludeThursdays}
            onCheckedChange={(checked) => setExcludeThursdays(checked === true)}
          />
          حذف پنجشنبه‌ها
        </label>
      </div>
      <DailyResultBox
        result={result}
        title="محاسبه روز کاری"
        filenameSlug="working-days"
      />
    </div>
  );
}

export function DateOffsetTool() {
  const [date, setDate] = useState(formatGregorian(new Date()));
  const [days, setDays] = useState("7");
  const [mode, setMode] = useState("add");
  const daysId = useId();
  const modeId = useId();
  const baseDate = gregorianDateFromInput(date);
  const parsedDays = Math.max(0, Math.trunc(parseNumber(days)) || 0);
  const targetDate = baseDate
    ? addCalendarDays(baseDate, mode === "subtract" ? -parsedDays : parsedDays)
    : null;
  const described = targetDate ? describeDate(targetDate) : null;
  const result: ToolResult = described
    ? [
        { label: "تاریخ شمسی", value: described.jalaali },
        { label: "تاریخ میلادی", value: described.gregorian },
        { label: "روز هفته", value: described.weekday },
        {
          label: "عملیات",
          value: `${mode === "add" ? "افزودن" : "کم کردن"} ${toPersianDigits(parsedDays)} روز`,
        },
      ]
    : "تاریخ معتبر وارد کنید.";

  return (
    <div className="daily-tool-stack">
      <div className="tool-field-grid">
        <LabeledDateInput label="تاریخ مبنا" value={date} onChange={setDate} />
        <div className="toolbo-field">
          <Label htmlFor={daysId} className="mb-2 block">تعداد روز</Label>
          <Input
            id={daysId}
            name="date-offset-days"
            type="text"
            value={days}
            onChange={(event) => setDays(event.target.value)}
            inputMode="numeric"
            autoComplete="off"
            className="tool-input"
          />
        </div>
        <div className="toolbo-field">
          <Label htmlFor={modeId} className="mb-2 block">عملیات</Label>
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger id={modeId} className="tool-input h-10 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">افزودن روز</SelectItem>
              <SelectItem value="subtract">کم کردن روز</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DailyResultBox
        result={result}
        title="جمع و تفریق روز از تاریخ"
        filenameSlug="date-offset"
      />
    </div>
  );
}

export function WorldClockTool() {
  const now = useLiveNow();
  if (!now) {
    return <DailyResultBox result="در حال آماده‌سازی ساعت جهان..." title="ساعت جهان" filenameSlug="world-clock" />;
  }

  const rows = worldTimeZones.map((zone) => [
    zone.label,
    formatTimeInZone(now, zone.id),
    formatDateInZone(now, zone.id),
    zone.city,
  ]);

  return (
    <div className="daily-tool-stack">
      <div className="world-clock-grid">
        {worldTimeZones.map((zone) => (
          <div key={zone.id} className="world-clock-tile">
            <div className="result-label">{zone.label}</div>
            <div className="world-clock-time">{formatTimeInZone(now, zone.id)}</div>
            <div className="world-clock-date">{formatDateInZone(now, zone.id)}</div>
          </div>
        ))}
      </div>
      <DailyTable
        title="جدول ساعت جهان"
        filenameSlug="world-clock"
        headers={["شهر", "ساعت", "تاریخ", "ناحیه"]}
        rows={rows}
      />
    </div>
  );
}

export function TimeZoneDifferenceTool() {
  const [reference, setReference] = useState(formatDateTimeLocalInput(new Date()));
  const [fromZone, setFromZone] = useState("Asia/Tehran");
  const [toZone, setToZone] = useState("America/New_York");
  const date = new Date(reference);
  const valid = Number.isFinite(date.getTime());
  const from = worldTimeZones.find((zone) => zone.id === fromZone);
  const to = worldTimeZones.find((zone) => zone.id === toZone);
  const diff = valid
    ? getTimeZoneDifferenceMinutes(date, fromZone, toZone)
    : 0;
  const result: ToolResult =
    valid && from && to
      ? [
          { label: "اختلاف", value: formatMinuteDifference(diff) },
          {
            label: "تفسیر",
            value:
              diff === 0
                ? "دو منطقه در این لحظه هم‌زمان هستند."
                : diff > 0
                  ? `${to.label} جلوتر از ${from.label} است.`
                  : `${to.label} عقب‌تر از ${from.label} است.`,
          },
          {
            label: `زمان ${from.label}`,
            value: `${formatTimeInZone(date, fromZone)} · ${formatDateInZone(date, fromZone)}`,
          },
          {
            label: `زمان ${to.label}`,
            value: `${formatTimeInZone(date, toZone)} · ${formatDateInZone(date, toZone)}`,
          },
        ]
      : "زمان مبنا معتبر نیست.";

  return (
    <div className="daily-tool-stack">
      <div className="tool-field-grid">
        <LabeledDateInput
          label="زمان مبنا"
          value={reference}
          onChange={setReference}
          type="datetime-local"
        />
        <TimeZoneSelect label="از منطقه" value={fromZone} onChange={setFromZone} />
        <TimeZoneSelect label="به منطقه" value={toZone} onChange={setToZone} />
      </div>
      <div className="daily-actions-row">
        <Button
          type="button"
          variant="outline"
          className="bn632-hover"
          onClick={() => setReference(formatDateTimeLocalInput(new Date()))}
        >
          <RotateCcw aria-hidden="true" />
          زمان فعلی
        </Button>
      </div>
      <DailyResultBox
        result={result}
        title="اختلاف منطقه زمانی"
        filenameSlug="timezone-difference"
      />
    </div>
  );
}

export function CountdownTool() {
  const now = useLiveNow();
  const fallbackNow = useMemo(() => new Date(), []);
  const effectiveNow = now ?? fallbackNow;
  const [target, setTarget] = useState(formatGregorian(getDefaultCountdownDate(fallbackNow)));
  const [label, setLabel] = useState("رویداد مهم");
  const labelId = useId();
  const targetDate = gregorianDateFromInput(target);
  const presets = useMemo(() => getCountdownPresets(effectiveNow), [effectiveNow]);
  const duration =
    now && targetDate && targetDate.getTime() > now.getTime()
      ? formatDurationParts(targetDate.getTime() - now.getTime())
      : null;
  const result: ToolResult =
    targetDate && duration
      ? [
          { label: "عنوان", value: label || "رویداد" },
          { label: "روز مانده", value: formatNumber(duration.days, 0) },
          { label: "ساعت", value: toPersianDigits(duration.hours) },
          { label: "دقیقه", value: toPersianDigits(duration.minutes) },
          { label: "ثانیه", value: toPersianDigits(duration.seconds) },
          { label: "تاریخ شمسی", value: formatJalaali(targetDate) },
          { label: "تاریخ میلادی", value: formatGregorian(targetDate) },
        ]
      : "تاریخ هدف باید بعد از زمان فعلی باشد.";

  return (
    <div className="daily-tool-stack">
      <div className="tool-field-grid">
        <div className="toolbo-field">
          <Label htmlFor={labelId} className="mb-2 block">عنوان</Label>
          <Input
            id={labelId}
            name="countdown-title"
            autoComplete="off"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            className="tool-input"
          />
        </div>
        <LabeledDateInput label="تاریخ هدف" value={target} onChange={setTarget} />
      </div>
      <div className="daily-preset-row">
        {presets.map((preset) => (
          <Button
            key={`${preset.year}-${preset.month}-${preset.day}-${preset.title}`}
            type="button"
            variant="outline"
            className="bn632-hover"
            onClick={() => {
              setTarget(formatGregorian(preset.date));
              setLabel(preset.title);
            }}
          >
            <CalendarPlus aria-hidden="true" />
            {preset.title}
          </Button>
        ))}
      </div>
      <DailyResultBox result={result} title="شمارش معکوس" filenameSlug="countdown" />
    </div>
  );
}

const calendarWeekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const gregorianMonthFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-gregory", { month: "long", year: "numeric" });
const fullDateFormatter = new Intl.DateTimeFormat("fa-IR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

type CalendarCursor = { jy: number; jm: number };

function shiftMonth({ jy, jm }: CalendarCursor, delta: number): CalendarCursor {
  const index = jy * 12 + (jm - 1) + delta;
  return { jy: Math.floor(index / 12), jm: (index % 12) + 1 };
}

function describeOffset(days: number) {
  if (days === 0) return "امروز";
  if (days === 1) return "فردا";
  if (days === -1) return "دیروز";
  return days > 0 ? `${toPersianDigits(days)} روز دیگر` : `${toPersianDigits(-days)} روز پیش`;
}

export function CalendarTool() {
  const now = useLiveNow();
  const today = now ? addCalendarDays(now, 0) : null;
  const todayJ = today ? gregorianToJalaaliDate(today) : null;
  const [cursor, setCursor] = useState<CalendarCursor | null>(null);
  const [selected, setSelected] = useState<Date | null>(null);

  if (!today || !todayJ) {
    return <div className="jcal jcal-loading" aria-busy="true" />;
  }

  const view = cursor ?? { jy: todayJ.jy, jm: todayJ.jm };
  const first = jalaaliToGregorianDate(view.jy, view.jm, 1) ?? today;
  const offset = (first.getDay() + 1) % 7;
  const days: Date[] = [];
  for (let day = 0; ; day += 1) {
    const date = addCalendarDays(first, day);
    if (gregorianToJalaaliDate(date).jm !== view.jm) break;
    days.push(date);
  }
  const last = days[days.length - 1];
  const gregorianSpan = [gregorianMonthFormatter.format(first), gregorianMonthFormatter.format(last)]
    .filter((label, index, all) => all.indexOf(label) === index)
    .join(" – ");
  const active = selected ?? (view.jy === todayJ.jy && view.jm === todayJ.jm ? today : first);
  const activeKey = active.getTime();
  const activeJ = gregorianToJalaaliDate(active);
  const activeEvents = getEventsForDate(active);
  const offsetFromToday = Math.round((activeKey - today.getTime()) / 86400000);
  const monthEvents = days.flatMap((date, index) =>
    getEventsForJalaaliDate(view.jm, index + 1).map((event) => ({ ...event, date }))
  );
  const isCurrentMonth = view.jy === todayJ.jy && view.jm === todayJ.jm;

  const goTo = (next: CalendarCursor) => { setCursor(next); setSelected(null); };

  return (
    <div className="jcal">
      <div className="jcal-board">
        <header className="jcal-head">
          <div>
            <h2>{persianMonths[view.jm - 1]} <span>{toPersianDigits(view.jy)}</span></h2>
            <p>{gregorianSpan}</p>
          </div>
          <div className="jcal-nav">
            {!isCurrentMonth && (
              <button type="button" className="jcal-today" onClick={() => goTo({ jy: todayJ.jy, jm: todayJ.jm })}>امروز</button>
            )}
            <button type="button" className="icon-button" aria-label="ماه قبل" onClick={() => goTo(shiftMonth(view, -1))}>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <button type="button" className="icon-button" aria-label="ماه بعد" onClick={() => goTo(shiftMonth(view, 1))}>
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="jcal-grid" role="grid" aria-label={`${persianMonths[view.jm - 1]} ${toPersianDigits(view.jy)}`}>
          {calendarWeekdays.map((day) => (
            <div key={day} className="jcal-weekday" role="columnheader">{day}</div>
          ))}
          {Array.from({ length: offset }, (_, index) => <div key={`pad-${index}`} aria-hidden="true" />)}
          {days.map((date, index) => {
            const events = getEventsForJalaaliDate(view.jm, index + 1);
            const holiday = date.getDay() === 5 || events.some((event) => event.type === "holiday");
            const isToday = date.getTime() === today.getTime();
            return (
              <button
                key={date.getTime()}
                type="button"
                role="gridcell"
                className={cn("jcal-day", holiday && "is-holiday", isToday && "is-today", date.getTime() === activeKey && "is-selected")}
                aria-selected={date.getTime() === activeKey}
                aria-current={isToday ? "date" : undefined}
                aria-label={`${fullDateFormatter.format(date)}${events.length ? `، ${events.map((event) => event.title).join("، ")}` : ""}`}
                onClick={() => setSelected(date)}
              >
                <span className="jcal-day-num">{toPersianDigits(index + 1)}</span>
                <span className="jcal-day-greg">{date.getDate()}</span>
                {events.length > 0 && <span className={cn("jcal-dot", events.some((event) => event.type === "holiday") && "is-holiday")} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      <aside className="jcal-side" aria-live="polite">
        <div className="jcal-detail">
          <span className="jcal-detail-offset">{describeOffset(offsetFromToday)}</span>
          <strong>{toPersianDigits(activeJ.jd)} {persianMonths[activeJ.jm - 1]} {toPersianDigits(activeJ.jy)}</strong>
          <dl>
            <div><dt>روز هفته</dt><dd>{describeDate(active).weekday}</dd></div>
            <div><dt>میلادی</dt><dd dir="ltr">{active.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</dd></div>
            <div><dt>قمری</dt><dd>{formatIslamic(active)}</dd></div>
          </dl>
          {activeEvents.length > 0 && (
            <ul className="jcal-detail-events">
              {activeEvents.map((event) => (
                <li key={event.title} className={cn(event.type === "holiday" && "is-holiday")}>
                  {event.title}{event.type === "holiday" && <small>تعطیل</small>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="jcal-month-events">
          <h3>مناسبت‌های {persianMonths[view.jm - 1]}</h3>
          {monthEvents.length > 0 ? (
            <ul>
              {monthEvents.map((event) => (
                <li key={`${event.day}-${event.title}`}>
                  <button type="button" onClick={() => setSelected(event.date)} className={cn(event.type === "holiday" && "is-holiday")}>
                    <span>{toPersianDigits(event.day)}</span>{event.title}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>مناسبت ثابتی در این ماه ثبت نشده است.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
