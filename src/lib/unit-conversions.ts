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
