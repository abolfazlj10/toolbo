"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BriefcaseBusiness, CalendarDays, Clock3, Globe2 } from "lucide-react";
import {
  fixedJalaaliCalendarEvents,
  formatTimeInZone,
  getEventsForDate,
  getJalaaliDateLabel,
  getUpcomingJalaaliEvents,
  worldTimeZones,
} from "@/lib/daily-time";
import { formatGregorian, formatIslamic, toPersianDigits } from "@/lib/tool-utils";

const quickDailyTools = [
  {
    href: "/time/iran-holidays",
    label: "تعطیل‌ها",
    icon: CalendarDays,
  },
  {
    href: "/time/working-days",
    label: "روز کاری",
    icon: BriefcaseBusiness,
  },
  {
    href: "/time/world-clock",
    label: "ساعت جهان",
    icon: Globe2,
  },
  {
    href: "/time/countdown",
    label: "شمارش معکوس",
    icon: Clock3,
  },
];

export function TodayDashboard({ surface = "home" }: { surface?: "home" | "tool" }) {
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

  const upcomingEvents = useMemo(
    () =>
      now ? getUpcomingJalaaliEvents(now, 45).filter((item) => item.offsetDays > 0) : [],
    [now]
  );
  const todayEvents = now ? getEventsForDate(now) : [];
  const tehranZone = worldTimeZones.find((zone) => zone.id === "Asia/Tehran");

  if (!now) {
    return (
      <section
        className={`today-dashboard ${surface === "tool" ? "today-dashboard-tool" : ""}`}
        aria-label="داشبورد امروز"
      >
        <div className="today-dashboard-main">
          <div className="today-dashboard-kicker">داشبورد امروز</div>
          <div className="today-dashboard-title">در حال آماده‌سازی زمان...</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`today-dashboard ${surface === "tool" ? "today-dashboard-tool" : ""}`}
      aria-label="داشبورد امروز"
    >
      <div className="today-dashboard-main">
        <div className="today-dashboard-kicker">داشبورد امروز</div>
        <div className="today-dashboard-title">{getJalaaliDateLabel(now)}</div>
        <div className="today-dashboard-time">{now.toLocaleTimeString("fa-IR")}</div>
        <div className="today-dashboard-sub">
          {formatGregorian(now)} · {formatIslamic(now)}
        </div>
      </div>

      <div className="today-dashboard-grid">
        <div className="today-dashboard-panel">
          <div className="today-dashboard-label">مناسبت امروز</div>
          {todayEvents.length > 0 ? (
            <div className="today-dashboard-events">
              {todayEvents.map((event) => (
                <span key={`${event.month}-${event.day}-${event.title}`}>
                  {event.title}
                  {event.type === "holiday" ? " · تعطیل رسمی" : ""}
                </span>
              ))}
            </div>
          ) : (
            <div className="today-dashboard-empty">مناسبت ثابتی ثبت نشده است.</div>
          )}
        </div>

        <div className="today-dashboard-panel">
          <div className="today-dashboard-label">رویداد نزدیک</div>
          {upcomingEvents[0] ? (
            <div>
              <strong>{upcomingEvents[0].title}</strong>
              <span>
                {toPersianDigits(upcomingEvents[0].offsetDays)} روز دیگر ·{" "}
                {upcomingEvents[0].jalaaliLabel}
              </span>
            </div>
          ) : (
            <div className="today-dashboard-empty">
              {toPersianDigits(fixedJalaaliCalendarEvents.length)} مناسبت ثابت آماده است.
            </div>
          )}
        </div>

        <div className="today-dashboard-panel">
          <div className="today-dashboard-label">تهران</div>
          <strong>{tehranZone ? formatTimeInZone(now, tehranZone.id) : "-"}</strong>
          <span>ساعت مرجع ابزارهای روزانه</span>
        </div>
      </div>

      <div className="today-dashboard-actions">
        {quickDailyTools.map((tool) => {
          const Icon = tool.icon;

          return (
            <Link key={tool.href} href={tool.href}>
              <Icon aria-hidden="true" />
              {tool.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
