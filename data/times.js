// Prayer times — standard astronomical method (sun position, as used by MWL/ISNA timetables).
// Returns Date objects (absolute instants); display uses the device's local time zone.
(() => {
  const rad = (d) => (d * Math.PI) / 180, deg = (r) => (r * 180) / Math.PI;
  const sin = (d) => Math.sin(rad(d)), cos = (d) => Math.cos(rad(d)), tan = (d) => Math.tan(rad(d));
  const asin = (x) => deg(Math.asin(x)), acos = (x) => deg(Math.acos(x)), atan2 = (y, x) => deg(Math.atan2(y, x)), acot = (x) => deg(Math.atan(1 / x));
  const fix = (a, b) => { a = a - b * Math.floor(a / b); return a < 0 ? a + b : a; };
  const julian = (y, m, d) => { if (m <= 2) { y -= 1; m += 12; } const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4); return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5; };
  function sunPos(jd) {
    const D = jd - 2451545.0, g = fix(357.529 + 0.98560028 * D, 360), q = fix(280.459 + 0.98564736 * D, 360);
    const L = fix(q + 1.915 * sin(g) + 0.02 * sin(2 * g), 360), e = 23.439 - 0.00000036 * D;
    const RA = fix(atan2(cos(e) * sin(L), cos(L)) / 15, 24);
    return { decl: asin(sin(e) * sin(L)), eqt: q / 15 - RA };
  }
  window.METHODS = {
    mwl: { name: "Muslim World League (18° / 17°)", fajr: 18, isha: 17 },
    isna: { name: "ISNA (15° / 15°)", fajr: 15, isha: 15 },
    egypt: { name: "Egyptian (19.5° / 17.5°)", fajr: 19.5, isha: 17.5 },
  };
  window.prayerTimes = function (date, lat, lng, methodKey = "mwl") {
    const M = METHODS[methodKey] || METHODS.mwl;
    const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
    const jd = julian(y, m, d) - lng / (15 * 24);
    const midDay = (t) => fix(12 - sunPos(jd + t).eqt, 24);
    const angleTime = (angle, t, ccw) => { const decl = sunPos(jd + t).decl, noon = midDay(t); const T = acos((-sin(angle) - sin(decl) * sin(lat)) / (cos(decl) * cos(lat))) / 15; return noon + (ccw ? -T : T); };
    const asrTime = (factor, t) => { const decl = sunPos(jd + t).decl; return angleTime(-acot(factor + tan(Math.abs(lat - decl))), t); };
    // two passes for accuracy
    let t = { fajr: 5, sunrise: 6, dhuhr: 12, asr: 13, sunset: 18, isha: 18 };
    for (let i = 0; i < 2; i++) {
      t = {
        fajr: angleTime(M.fajr, t.fajr / 24, true), sunrise: angleTime(0.833, t.sunrise / 24, true), dhuhr: midDay(t.dhuhr / 24),
        asr: asrTime(1, t.asr / 24), // shadow = 1× (Maliki, Shafi'i, Hanbali — the standard in Morocco)
        sunset: angleTime(0.833, t.sunset / 24), isha: angleTime(M.isha, t.isha / 24),
      };
    }
    // high latitudes (NL summer): angle-based night portion when the sun never reaches the angle
    const night = fix(t.sunrise - t.sunset, 24);
    const fajrMax = t.sunrise - (M.fajr / 60) * night, ishaMax = t.sunset + (M.isha / 60) * night;
    if (isNaN(t.fajr) || fix(t.sunrise - t.fajr, 24) > (M.fajr / 60) * night) t.fajr = fajrMax;
    if (isNaN(t.isha) || fix(t.isha - t.sunset, 24) > (M.isha / 60) * night) t.isha = ishaMax;
    const out = { fajr: t.fajr, sunrise: t.sunrise, dhuhr: t.dhuhr + 1 / 60, asr: t.asr, maghrib: t.sunset + 1 / 60, isha: t.isha };
    const base = Date.UTC(y, m - 1, d);
    const res = {};
    for (const [k, h] of Object.entries(out)) res[k] = new Date(base + Math.round((h - lng / 15) * 60) * 60000);
    return res;
  };
  // Qibla bearing (degrees from north)
  window.qibla = (lat, lng) => { const kLat = 21.4225, kLng = 39.8262; return fix(atan2(sin(kLng - lng), cos(lat) * tan(kLat) - sin(lat) * cos(kLng - lng)), 360); };
  window.CITIES = [
    ["Amsterdam", 52.3676, 4.9041], ["Rotterdam", 51.9244, 4.4777], ["Den Haag", 52.0705, 4.3007], ["Utrecht", 52.0907, 5.1214],
    ["Almere", 52.3508, 5.2647], ["Eindhoven", 51.4416, 5.4697], ["Tilburg", 51.5555, 5.0913], ["Groningen", 53.2194, 6.5665],
    ["Arnhem", 51.9851, 5.8987], ["Breda", 51.5719, 4.7683], ["Tanger (Tangier)", 35.7595, -5.834],
  ];
})();
