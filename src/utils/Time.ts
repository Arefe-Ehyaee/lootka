import moment from "jalali-moment";

/**
 * Convert ISO / timestamp / Date to Jalali date (without time)
 * Example: ۹ مرداد ۱۴۰۴
 */
export default function toJalali(input: string | number | Date): string {
  let d: Date | null = null;

  if (input instanceof Date) {
    d = input;
  } else if (typeof input === "number") {
    const ms = input < 1e12 ? input * 1000 : input; // seconds → ms
    d = new Date(ms);
  } else if (typeof input === "string") {
    let s = input.trim();

    // Normalize microseconds (e.g. .010027 → .010)
    const m = s.match(
      /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(\.(\d+))?(Z|[+-]\d{2}:\d{2})?$/
    );
    if (m) {
      const base = m[1];
      const frac = (m[3] || "").slice(0, 3).padEnd(3, "0");
      const tz = m[4] || "";
      s = m[2] ? `${base}.${frac}${tz}` : `${base}${tz}`;
    }

    d = new Date(s);
    if (Number.isNaN(d.getTime())) {
      const tryMoment = moment(s, moment.ISO_8601, true);
      if (tryMoment.isValid()) d = tryMoment.toDate();
    }
  }

  if (!d || Number.isNaN(d.getTime())) return "";

  return moment(d).locale("fa").format("jD jMMMM jYYYY");
}
