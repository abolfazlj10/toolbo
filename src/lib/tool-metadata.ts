export type ToolStatus = "stable" | "beta" | "needs-review";

export type ResultAction = "copy" | "share" | "print" | "download";

export type ToolExample = {
  label: string;
  input: Record<string, string>;
  expectedOutputSummary: string;
};

export type ToolMetadata = {
  url: string;
  title: string;
  aliases?: string[];
  keywords?: string[];
  priority?: number;
  status?: ToolStatus;
  sourceLabel?: string;
  sourceUrl?: string;
  lastUpdated?: string;
  formula?: string;
  method?: string;
  examples?: ToolExample[];
  limitations?: string[];
  relatedTools?: string[];
  resultActions?: ResultAction[];
};

const conversionAliases = ["تبدیل واحد", "unit conversion", "convert"];

export const toolMetadata: Record<string, ToolMetadata> = {
  "/time/date": {
    url: "/time/date",
    title: "تاریخ امروز",
    aliases: ["امروز", "تاریخ امروز", "داشبورد امروز", "today", "daily dashboard"],
    keywords: ["ساعت ایران", "تقویم امروز", "مناسبت امروز", "تاریخ شمسی"],
    priority: 95,
    status: "stable",
    lastUpdated: "2026-07-03",
    method: "تاریخ و ساعت جاری مرورگر نمایش داده می‌شود و مناسبت‌های ثابت شمسی از داده داخلی خوانده می‌شوند.",
    limitations: ["مناسبت‌های قمری و تغییرات رسمی سالانه در داشبورد روزانه محاسبه پویا ندارند."],
    relatedTools: ["/time/iran-holidays", "/time/events", "/time/world-clock"],
  },
  "/time/mathAge": {
    url: "/time/mathAge",
    title: "محاسبه سن",
    aliases: ["سن", "تولد", "محاسبه تولد", "age", "birth age"],
    keywords: ["تاریخ تولد", "اختلاف تاریخ", "سال", "ماه", "روز"],
    priority: 90,
    status: "stable",
    lastUpdated: "2026-07-02",
    method: "اختلاف تاریخ تولد تا تاریخ امروز با نمایش سال، ماه، روز و تعداد کل روزها محاسبه می‌شود.",
    examples: [
      {
        label: "تولد میلادی",
        input: { birth: "2000-01-01" },
        expectedOutputSummary: "سن تا امروز همراه با تعداد کل روزها نمایش داده می‌شود.",
      },
    ],
    limitations: ["ورودی فعلی بر اساس تاریخ میلادی است."],
    relatedTools: ["/time/convertor", "/time/spacingDate"],
  },
  "/time/convertor": {
    url: "/time/convertor",
    title: "تبدیل تاریخ",
    aliases: ["تبدیل تاریخ", "شمسی به میلادی", "میلادی به شمسی", "jalali", "gregorian"],
    keywords: ["تاریخ شمسی", "تاریخ میلادی", "تاریخ قمری", "weekday"],
    priority: 100,
    status: "stable",
    lastUpdated: "2026-07-02",
    method: "تاریخ ورودی به تاریخ میلادی داخلی تبدیل می‌شود و سپس خروجی‌های شمسی، میلادی و قمری ساخته می‌شوند.",
    examples: [
      {
        label: "تبدیل میلادی",
        input: { date: "2026-07-02" },
        expectedOutputSummary: "خروجی شمسی، میلادی، قمری و روز هفته نمایش داده می‌شود.",
      },
    ],
    relatedTools: ["/time/mathAge", "/time/spacingDate"],
  },
  "/time/religious": {
    url: "/time/religious",
    title: "اوقات شرعی",
    aliases: ["اذان", "نماز", "اوقات شرعی", "prayer", "azan"],
    keywords: ["اذان صبح", "اذان ظهر", "اذان مغرب", "طلوع"],
    priority: 80,
    status: "beta",
    limitations: ["نتیجه از سرویس بیرونی دریافت می‌شود و ممکن است برای بعضی شهرها در دسترس نباشد."],
  },
  "/time/iran-holidays": {
    url: "/time/iran-holidays",
    title: "تعطیل‌های رسمی ایران",
    aliases: ["تعطیل", "تعطیلات", "تعطیل رسمی", "holiday", "iran holidays"],
    keywords: ["تقویم رسمی", "نوروز", "روز طبیعت", "تعطیلی ایران"],
    priority: 90,
    status: "needs-review",
    lastUpdated: "2026-07-03",
    method: "تعطیل‌های ثابت شمسی از جدول داخلی خوانده و برای سال انتخابی به تاریخ میلادی تبدیل می‌شوند.",
    limitations: ["تعطیل‌های قمری و تغییرات اعلامی دولت باید برای هر سال به‌روزرسانی شوند."],
    relatedTools: ["/time/date", "/time/events", "/time/working-days"],
  },
  "/time/events": {
    url: "/time/events",
    title: "مناسبت‌های امروز",
    aliases: ["مناسبت", "مناسبت امروز", "رویداد امروز", "events", "occasion"],
    keywords: ["تقویم", "رویداد نزدیک", "امروز", "مناسبت‌های ایران"],
    priority: 85,
    status: "needs-review",
    lastUpdated: "2026-07-03",
    method: "مناسبت‌های ثابت شمسی امروز و ۶۰ روز آینده از داده داخلی نمایش داده می‌شوند.",
    limitations: ["مناسبت‌های قمری و مناسبت‌های دارای تاریخ متغیر در این نسخه پویا نیستند."],
    relatedTools: ["/time/date", "/time/iran-holidays", "/time/countdown"],
  },
  "/time/working-days": {
    url: "/time/working-days",
    title: "محاسبه روز کاری",
    aliases: ["روز کاری", "روزهای کاری", "تعطیلی", "working day", "business day"],
    keywords: ["محاسبه بازه", "جمعه", "پنجشنبه", "تعطیل رسمی", "تقویم کاری"],
    priority: 90,
    status: "beta",
    lastUpdated: "2026-07-03",
    method: "روزهای بازه به صورت شامل ابتدا و انتها شمرده می‌شوند و جمعه‌ها، تعطیل‌های ثابت و در صورت انتخاب پنجشنبه‌ها حذف می‌شوند.",
    limitations: ["تعطیل‌های قمری و تعطیلی‌های موردی سالانه در شمارش خودکار لحاظ نمی‌شوند."],
    relatedTools: ["/time/spacingDate", "/time/date-calculator", "/time/iran-holidays"],
  },
  "/time/date-calculator": {
    url: "/time/date-calculator",
    title: "جمع و تفریق روز از تاریخ",
    aliases: ["افزودن روز", "کم کردن روز", "محاسبه تاریخ", "date add", "date subtract"],
    keywords: ["تاریخ آینده", "تاریخ گذشته", "روز هفته", "date calculator"],
    priority: 82,
    status: "stable",
    lastUpdated: "2026-07-03",
    method: "تعداد روز انتخابی به تاریخ مبنا اضافه یا از آن کم می‌شود و نتیجه شمسی، میلادی و روز هفته نمایش داده می‌شود.",
    relatedTools: ["/time/convertor", "/time/spacingDate", "/time/working-days"],
  },
  "/time/world-clock": {
    url: "/time/world-clock",
    title: "ساعت جهان",
    aliases: ["ساعت جهان", "ساعت کشورها", "world clock", "time zones"],
    keywords: ["تهران", "لندن", "نیویورک", "توکیو", "UTC"],
    priority: 80,
    status: "stable",
    lastUpdated: "2026-07-03",
    method: "زمان شهرها با Intl مرورگر و شناسه‌های استاندارد منطقه زمانی نمایش داده می‌شود.",
    relatedTools: ["/time/timezone-difference", "/time/date"],
  },
  "/time/timezone-difference": {
    url: "/time/timezone-difference",
    title: "اختلاف منطقه زمانی",
    aliases: ["اختلاف ساعت", "منطقه زمانی", "timezone", "time difference", "اختلاف زمانی"],
    keywords: ["تهران", "نیویورک", "UTC", "اختلاف شهرها"],
    priority: 82,
    status: "stable",
    lastUpdated: "2026-07-03",
    method: "اختلاف offset دو منطقه زمانی برای زمان مبنا با Intl مرورگر محاسبه می‌شود.",
    limitations: ["زمان مبنا یک لحظه مشخص است؛ تبدیل ساعت دیواری از یک منطقه به منطقه دیگر در نسخه بعدی دقیق‌تر می‌شود."],
    relatedTools: ["/time/world-clock", "/time/date"],
  },
  "/time/countdown": {
    url: "/time/countdown",
    title: "شمارش معکوس تا تاریخ",
    aliases: ["شمارش معکوس", "تا نوروز", "countdown", "days until"],
    keywords: ["روز مانده", "رویداد", "تاریخ هدف", "نوروز"],
    priority: 78,
    status: "stable",
    lastUpdated: "2026-07-03",
    method: "اختلاف زمان فعلی مرورگر تا ابتدای تاریخ هدف محاسبه و به روز، ساعت، دقیقه و ثانیه شکسته می‌شود.",
    relatedTools: ["/time/events", "/time/date-calculator"],
  },
  "/fiscal/loanInterest": {
    url: "/fiscal/loanInterest",
    title: "محاسبه سود و اقساط وام",
    aliases: ["وام", "قسط", "سود وام", "loan", "installment"],
    keywords: ["اقساط", "بازپرداخت", "جدول وام", "سود بانکی"],
    priority: 100,
    status: "stable",
    lastUpdated: "2026-07-02",
    formula: "قسط روش جدید = اصل وام × نرخ ماهانه × توان مرکب / (توان مرکب - ۱)",
    examples: [
      {
        label: "وام نمونه",
        input: { amount: "100000000", profit: "18", period: "3", periodType: "year" },
        expectedOutputSummary: "قسط ماهانه، کل سود و جدول بازپرداخت نمایش داده می‌شود.",
      },
    ],
    limitations: ["کارمزدها، جریمه‌ها و شرایط خاص بانک‌ها در محاسبه لحاظ نمی‌شود."],
    relatedTools: ["/fiscal/Interest", "/fiscal/marketProfit"],
  },
  "/fiscal/Interest": {
    url: "/fiscal/Interest",
    title: "محاسبه سود سپرده",
    aliases: ["سپرده", "سود بانکی", "deposit", "interest"],
    keywords: ["سود روزشمار", "سود ماهانه", "سود سالانه"],
    priority: 70,
    status: "stable",
  },
  "/fiscal/marketProfit": {
    url: "/fiscal/marketProfit",
    title: "محاسبه سود و قسط در بازار",
    aliases: ["قسط", "خرید قسطی", "سود بازار", "installment"],
    keywords: ["اقساط", "بازار", "موبایل قسطی"],
    priority: 75,
    status: "stable",
  },
  "/numbers/percent": {
    url: "/numbers/percent",
    title: "محاسبه درصد",
    aliases: ["درصد", "percentage", "percent"],
    keywords: ["چند درصد", "محاسبه درصد عدد"],
    priority: 95,
    status: "stable",
    lastUpdated: "2026-07-02",
    formula: "(درصد / ۱۰۰) × عدد",
    examples: [
      {
        label: "۲۰ درصد از ۱۵۰",
        input: { percent: "20", number: "150" },
        expectedOutputSummary: "نتیجه برابر ۳۰ است.",
      },
    ],
    relatedTools: ["/numbers/increasePercent", "/numbers/decreasePercent"],
  },
  "/technology/password-random": {
    url: "/technology/password-random",
    title: "تولید پسورد تصادفی",
    aliases: ["پسورد", "رمز", "password", "random password"],
    keywords: ["رمز قوی", "تولید رمز", "کاراکتر خاص"],
    priority: 85,
    status: "stable",
    lastUpdated: "2026-07-02",
    method: "پسورد با استفاده از crypto.getRandomValues در مرورگر تولید می‌شود.",
    limitations: ["پسوردها به صورت خودکار در تاریخچه ذخیره نمی‌شوند."],
  },
  "/technology/MyIP": {
    url: "/technology/MyIP",
    title: "IP آی پی من چیست ؟",
    aliases: ["آی پی", "ip", "my ip", "what is my ip"],
    keywords: ["نشانی آی پی", "آدرس ip"],
    priority: 80,
    status: "beta",
    limitations: ["نتیجه از سرویس بیرونی دریافت می‌شود."],
  },
  "/text/counter-word": {
    url: "/text/counter-word",
    title: "شمارش تعداد کلمه",
    aliases: ["تعداد کلمات", "شمارنده کلمات", "word count", "character count"],
    keywords: ["کاراکتر", "جمله", "پاراگراف", "زمان مطالعه"],
    priority: 90,
    status: "stable",
    lastUpdated: "2026-07-02",
    method: "تعداد کلمات از روی فاصله‌ها و تعداد جمله‌ها از نشانه‌های پایان جمله محاسبه می‌شود.",
    examples: [
      {
        label: "متن کوتاه",
        input: { text: "سلام دنیا." },
        expectedOutputSummary: "۲ کلمه، ۱ جمله و زمان مطالعه کوتاه نمایش داده می‌شود.",
      },
    ],
  },
  "/health/BMI": {
    url: "/health/BMI",
    title: "محاسبه BMI",
    aliases: ["bmi", "شاخص توده بدن", "وزن نرمال"],
    keywords: ["سلامت", "قد", "وزن", "چاقی", "لاغری"],
    priority: 85,
    status: "stable",
    lastUpdated: "2026-07-02",
    formula: "BMI = وزن کیلوگرم / (قد متر × قد متر)",
    limitations: ["BMI یک شاخص غربالگری عمومی است و تشخیص پزشکی محسوب نمی‌شود."],
    relatedTools: ["/health/BMR"],
  },
  "/health/BMR": {
    url: "/health/BMR",
    title: "محاسبه BMR",
    aliases: ["bmr", "کالری", "متابولیسم پایه"],
    keywords: ["کالری روزانه", "کاهش وزن", "افزایش وزن", "فعالیت"],
    priority: 80,
    status: "stable",
    lastUpdated: "2026-07-02",
    method: "BMR با فرمول کلاسیک مرد/زن محاسبه و سپس با سطح فعالیت تنظیم می‌شود.",
    limitations: ["این عدد تخمین عمومی است و جایگزین برنامه تغذیه تخصصی نیست."],
    relatedTools: ["/health/BMI"],
  },
};

const conversionMetadata: Record<string, Omit<ToolMetadata, "url" | "title">> = {
  "/conversions/convert-weight": {
    aliases: [...conversionAliases, "تبدیل وزن", "weight"],
    keywords: ["کیلوگرم", "گرم", "پوند", "اونس"],
    priority: 80,
  },
  "/conversions/convert-length": {
    aliases: [...conversionAliases, "تبدیل طول", "length"],
    keywords: ["متر", "سانتی متر", "اینچ", "فوت"],
    priority: 80,
  },
  "/conversions/convert-temperature": {
    aliases: [...conversionAliases, "تبدیل دما", "temperature"],
    keywords: ["سلسیوس", "فارنهایت", "کلوین"],
    priority: 75,
  },
  "/conversions/convert-speed": {
    aliases: [...conversionAliases, "تبدیل سرعت", "speed"],
    keywords: ["کیلومتر بر ساعت", "مایل", "متر بر ثانیه"],
    priority: 75,
  },
  "/conversions/convert-time": {
    aliases: [...conversionAliases, "تبدیل زمان", "time"],
    keywords: ["ثانیه", "دقیقه", "ساعت", "روز"],
    priority: 75,
  },
  "/conversions/convert-area": {
    aliases: [...conversionAliases, "تبدیل مساحت", "area"],
    keywords: ["متر مربع", "هکتار", "acre"],
    priority: 75,
  },
  "/conversions/convert-volume": {
    aliases: [...conversionAliases, "تبدیل حجم", "volume"],
    keywords: ["لیتر", "میلی لیتر", "گالن"],
    priority: 75,
  },
  "/conversions/convert-digital-storage": {
    aliases: [...conversionAliases, "تبدیل حجم داده", "storage", "byte"],
    keywords: ["بایت", "کیلوبایت", "گیگابایت", "ترابایت"],
    priority: 75,
  },
  "/conversions/convert-data-transfer": {
    aliases: [...conversionAliases, "سرعت انتقال داده", "data rate"],
    keywords: ["bps", "Mbps", "MB/s", "پهنای باند"],
    priority: 70,
  },
  "/conversions/convert-energy": {
    aliases: [...conversionAliases, "تبدیل انرژی", "energy"],
    keywords: ["ژول", "کیلووات ساعت", "کالری"],
    priority: 70,
  },
  "/conversions/convert-power": {
    aliases: [...conversionAliases, "تبدیل توان", "power"],
    keywords: ["وات", "کیلووات", "اسب بخار"],
    priority: 70,
  },
  "/conversions/convert-pressure": {
    aliases: [...conversionAliases, "تبدیل فشار", "pressure"],
    keywords: ["پاسکال", "بار", "اتمسفر", "psi"],
    priority: 70,
  },
  "/conversions/convert-angle": {
    aliases: [...conversionAliases, "تبدیل زاویه", "angle"],
    keywords: ["درجه", "رادیان", "گرادیان"],
    priority: 70,
  },
  "/conversions/convert-frequency": {
    aliases: [...conversionAliases, "تبدیل فرکانس", "frequency"],
    keywords: ["هرتز", "کیلوهرتز", "مگاهرتز"],
    priority: 70,
  },
  "/conversions/convert-electric-current": {
    aliases: [...conversionAliases, "تبدیل جریان", "current"],
    keywords: ["آمپر", "میلی آمپر", "میکرو آمپر"],
    priority: 70,
  },
  "/conversions/convert-voltage": {
    aliases: [...conversionAliases, "تبدیل ولتاژ", "voltage"],
    keywords: ["ولت", "میلی ولت", "کیلوولت"],
    priority: 70,
  },
  "/conversions/convert-torque": {
    aliases: [...conversionAliases, "تبدیل گشتاور", "torque"],
    keywords: ["نیوتن متر", "پوند فوت", "پوند اینچ"],
    priority: 70,
  },
  "/conversions/convert-number-base": {
    aliases: ["تبدیل مبنا", "مبنای عدد", "binary", "hex", "decimal", "octal"],
    keywords: ["باینری", "هگزادسیمال", "دسیمال", "هشت هشتی"],
    priority: 75,
    method: "عدد ورودی با مبنای انتخاب‌شده خوانده و در مبنای مقصد نمایش داده می‌شود.",
    examples: [
      {
        label: "دهدهی به شانزده",
        input: { value: "255", from: "decimal", to: "hex" },
        expectedOutputSummary: "خروجی FF است.",
      },
    ],
    limitations: ["ورودی باید با رقم‌های معتبر همان مبنا نوشته شود."],
  },
};

for (const [url, metadata] of Object.entries(conversionMetadata)) {
  toolMetadata[url] = {
    url,
    title: "",
    status: "stable",
    lastUpdated: "2026-07-02",
    resultActions: ["copy", "share", "download"],
    ...metadata,
  };
}

export function getToolMetadata(url: string) {
  return toolMetadata[url];
}
