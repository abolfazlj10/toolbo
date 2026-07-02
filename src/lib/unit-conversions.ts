export type Unit = {
  id: string;
  label: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};

function linear(id: string, label: string, factor: number): Unit {
  return {
    id,
    label,
    toBase: (value) => value * factor,
    fromBase: (value) => value / factor,
  };
}

export const unitGroups = {
  weight: [
    linear("g", "گرم", 0.001),
    linear("kg", "کیلوگرم", 1),
    linear("lb", "پوند", 0.45359237),
    linear("oz", "اونس", 0.0283495231),
    linear("ton", "تن", 1000),
    linear("mesghal", "مثقال", 0.004608),
    linear("carat", "قیراط", 0.0002),
  ],
  length: [
    linear("mm", "میلی متر", 0.001),
    linear("cm", "سانتی متر", 0.01),
    linear("m", "متر", 1),
    linear("km", "کیلومتر", 1000),
    linear("in", "اینچ", 0.0254),
    linear("ft", "فوت", 0.3048),
    linear("yd", "یارد", 0.9144),
    linear("mi", "مایل", 1609.344),
  ],
  speed: [
    linear("mps", "متر بر ثانیه", 1),
    linear("kph", "کیلومتر بر ساعت", 0.2777777778),
    linear("mph", "مایل بر ساعت", 0.44704),
    linear("fps", "فوت بر ثانیه", 0.3048),
    linear("knot", "گره دریایی", 0.514444),
  ],
  time: [
    linear("ms", "میلی ثانیه", 0.001),
    linear("s", "ثانیه", 1),
    linear("min", "دقیقه", 60),
    linear("h", "ساعت", 3600),
    linear("d", "روز", 86400),
    linear("w", "هفته", 604800),
    linear("mo", "ماه", 2628000),
    linear("y", "سال", 31536000),
  ],
  area: [
    linear("sq-mm", "میلی متر مربع", 0.000001),
    linear("sq-cm", "سانتی متر مربع", 0.0001),
    linear("sq-m", "متر مربع", 1),
    linear("sq-km", "کیلومتر مربع", 1000000),
    linear("hectare", "هکتار", 10000),
    linear("acre", "acre", 4046.8564224),
    linear("sq-in", "اینچ مربع", 0.00064516),
    linear("sq-ft", "فوت مربع", 0.09290304),
    linear("sq-yd", "یارد مربع", 0.83612736),
    linear("sq-mi", "مایل مربع", 2589988.110336),
  ],
  volume: [
    linear("ml", "میلی لیتر", 0.001),
    linear("l", "لیتر", 1),
    linear("cc", "سانتی متر مکعب", 0.001),
    linear("m3", "متر مکعب", 1000),
    linear("in3", "اینچ مکعب", 0.016387064),
    linear("ft3", "فوت مکعب", 28.316846592),
    linear("us-gal", "گالن آمریکا", 3.785411784),
    linear("uk-gal", "گالن انگلیس", 4.54609),
  ],
  digitalStorage: [
    linear("bit", "بیت", 0.125),
    linear("byte", "بایت", 1),
    linear("kb", "کیلوبایت", 1000),
    linear("mb", "مگابایت", 1000000),
    linear("gb", "گیگابایت", 1000000000),
    linear("tb", "ترابایت", 1000000000000),
    linear("kib", "کیبی بایت", 1024),
    linear("mib", "مبی بایت", 1048576),
    linear("gib", "گیبی بایت", 1073741824),
    linear("tib", "تبی بایت", 1099511627776),
  ],
  dataTransfer: [
    linear("bps", "bps", 1),
    linear("kbps", "Kbps", 1000),
    linear("mbps", "Mbps", 1000000),
    linear("gbps", "Gbps", 1000000000),
    linear("Bps", "B/s", 8),
    linear("KBps", "KB/s", 8000),
    linear("MBps", "MB/s", 8000000),
    linear("GBps", "GB/s", 8000000000),
  ],
  energy: [
    linear("j", "ژول", 1),
    linear("kj", "کیلوژول", 1000),
    linear("cal", "کالری", 4.184),
    linear("kcal", "کیلوکالری", 4184),
    linear("wh", "وات ساعت", 3600),
    linear("kwh", "کیلووات ساعت", 3600000),
    linear("ev", "الکترون ولت", 1.602176634e-19),
  ],
  power: [
    linear("w", "وات", 1),
    linear("kw", "کیلووات", 1000),
    linear("hp", "اسب بخار", 745.699872),
  ],
  pressure: [
    linear("pa", "پاسکال", 1),
    linear("kpa", "کیلوپاسکال", 1000),
    linear("bar", "بار", 100000),
    linear("atm", "اتمسفر", 101325),
    linear("psi", "PSI", 6894.757293168),
    linear("torr", "تور", 133.322368),
  ],
  angle: [
    linear("deg", "درجه", Math.PI / 180),
    linear("rad", "رادیان", 1),
    linear("grad", "گرادیان", Math.PI / 200),
  ],
  frequency: [
    linear("hz", "هرتز", 1),
    linear("khz", "کیلوهرتز", 1000),
    linear("mhz", "مگاهرتز", 1000000),
    linear("ghz", "گیگاهرتز", 1000000000),
  ],
  electricCurrent: [
    linear("a", "آمپر", 1),
    linear("ma", "میلی آمپر", 0.001),
    linear("ua", "میکرو آمپر", 0.000001),
  ],
  voltage: [
    linear("v", "ولت", 1),
    linear("mv", "میلی ولت", 0.001),
    linear("kv", "کیلوولت", 1000),
  ],
  torque: [
    linear("nm", "نیوتن متر", 1),
    linear("knm", "کیلونیوتن متر", 1000),
    linear("lb-ft", "پوند فوت", 1.3558179483),
    linear("lb-in", "پوند اینچ", 0.112984829),
  ],
  temperature: [
    {
      id: "c",
      label: "سلسیوس",
      toBase: (value: number) => value,
      fromBase: (value: number) => value,
    },
    {
      id: "k",
      label: "کلوین",
      toBase: (value: number) => value - 273.15,
      fromBase: (value: number) => value + 273.15,
    },
    {
      id: "f",
      label: "فارنهایت",
      toBase: (value: number) => (value - 32) * (5 / 9),
      fromBase: (value: number) => value * (9 / 5) + 32,
    },
    {
      id: "r",
      label: "رانکین",
      toBase: (value: number) => (value - 491.67) * (5 / 9),
      fromBase: (value: number) => (value + 273.15) * (9 / 5),
    },
    {
      id: "re",
      label: "رئومور",
      toBase: (value: number) => value * (5 / 4),
      fromBase: (value: number) => value * (4 / 5),
    },
  ],
} satisfies Record<string, Unit[]>;

export type UnitGroupId = keyof typeof unitGroups;

export const conversionToolGroups: Record<string, UnitGroupId> = {
  "convert-weight": "weight",
  "convert-length": "length",
  "convert-speed": "speed",
  "convert-temperature": "temperature",
  "convert-time": "time",
  "convert-area": "area",
  "convert-volume": "volume",
  "convert-digital-storage": "digitalStorage",
  "convert-data-transfer": "dataTransfer",
  "convert-energy": "energy",
  "convert-power": "power",
  "convert-pressure": "pressure",
  "convert-angle": "angle",
  "convert-frequency": "frequency",
  "convert-electric-current": "electricCurrent",
  "convert-voltage": "voltage",
  "convert-torque": "torque",
};

export const numberBaseUnits = [
  { id: "binary", label: "باینری", radix: 2 },
  { id: "octal", label: "اکتال", radix: 8 },
  { id: "decimal", label: "دهدهی", radix: 10 },
  { id: "hex", label: "هگزادسیمال", radix: 16 },
] as const;

export type NumberBaseId = (typeof numberBaseUnits)[number]["id"];

export function getConversionGroupFromUrl(url: string) {
  const slug = url.split("/").filter(Boolean).at(-1) ?? "";
  return conversionToolGroups[slug] ?? null;
}

export function convertUnit(
  group: UnitGroupId,
  amount: number,
  from: string,
  to: string
) {
  const units = unitGroups[group];
  const fromUnit = units.find((unit) => unit.id === from);
  const toUnit = units.find((unit) => unit.id === to);

  if (!fromUnit || !toUnit) {
    return null;
  }

  return toUnit.fromBase(fromUnit.toBase(amount));
}

export function convertNumberBase(value: string, from: NumberBaseId, to: NumberBaseId) {
  const fromUnit = numberBaseUnits.find((unit) => unit.id === from);
  const toUnit = numberBaseUnits.find((unit) => unit.id === to);

  if (!fromUnit || !toUnit) {
    return null;
  }

  const normalized = value.trim().replace(/^0x/i, "");
  const patterns: Record<NumberBaseId, RegExp> = {
    binary: /^[01]+$/i,
    octal: /^[0-7]+$/i,
    decimal: /^[0-9]+$/i,
    hex: /^[0-9a-f]+$/i,
  };

  if (!patterns[from].test(normalized)) {
    return null;
  }

  const parsed = parseInt(normalized, fromUnit.radix);

  if (!Number.isSafeInteger(parsed)) {
    return null;
  }

  return parsed.toString(toUnit.radix).toUpperCase();
}
