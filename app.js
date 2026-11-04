/* Deen Trainer — vanilla, no build. State in localStorage. */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const h = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const KEY = "deen-trainer-v1";
const S = Object.assign({ tasks: {}, prayers: {}, cards: {}, mastery: {}, answers: {}, father: {}, phrasesBest: 0, meeting: "2026-12-05", narr: "nl", games: {}, loc: { name: "Amsterdam", lat: 52.3676, lng: 4.9041 }, method: "mwl", remindAt: "20:00", alerted: {} }, JSON.parse(localStorage.getItem(KEY) || "{}"));
const save = () => localStorage.setItem(KEY, JSON.stringify(S));

const DAY = 864e5;
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const today = () => ymd(new Date());
const parse = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const dayIndex = () => Math.min(PLAN.length, Math.max(1, Math.floor((parse(today()) - parse(PLAN_START)) / DAY) + 1));

/* ---------- icons (Lucide-style, MIT) ---------- */
const I = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
  salah: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V10a7 7 0 0 1 14 0v11"/><path d="M12 3V1"/><path d="M9 21v-5a3 3 0 0 1 6 0v5"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2z"/><path d="M19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  chev: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M9 6l6 6-6 6"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg>',
  play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
  pause: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
  x: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  drop: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.7s6 6.3 6 11.3a6 6 0 0 1-12 0c0-5 6-11.3 6-11.3z"/></svg>',
  list: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
  eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  beads: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="5" r="2"/><circle cx="18" cy="9" r="2"/><circle cx="18" cy="16" r="2"/><circle cx="6" cy="9" r="2"/><circle cx="6" cy="16" r="2"/><path d="M12 18v4"/></svg>',
  star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 16.5 5.5 21l2-7.5L2 9h7z"/></svg>',
  moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  map: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  vol: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>',
  game: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="4"/><path d="M6 12h4M8 10v4M15 11h.01M18 13h.01"/></svg>',
  pen: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
};
// 8-point zellige star
const ZEL = '<svg class="zel" viewBox="0 0 100 100" fill="none" stroke="#F2C58A" stroke-width="1.2"><g transform="translate(50 50)">' +
  [0, 45].map((r) => `<rect x="-30" y="-30" width="60" height="60" transform="rotate(${r})"/>`).join("") +
  [0, 45].map((r) => `<rect x="-18" y="-18" width="36" height="36" transform="rotate(${r + 22.5})"/>`).join("") + '<circle r="8"/></g></svg>';

/* ---------- posture figures ---------- */
const FIG = {
  stand: '<svg viewBox="0 0 100 130" fill="none" stroke="#13203A" stroke-width="5" stroke-linecap="round"><circle cx="50" cy="16" r="9" fill="#13203A"/><path d="M50 27v48M50 75l-10 45M50 75l10 45M50 34l-9 34M50 34l9 34"/></svg>',
  takbir: '<svg viewBox="0 0 100 130" fill="none" stroke="#13203A" stroke-width="5" stroke-linecap="round"><circle cx="50" cy="16" r="9" fill="#13203A"/><path d="M50 27v48M50 75l-10 45M50 75l10 45M50 36l-16 8 -2-22M50 36l16 8 2-22"/></svg>',
  ruku: '<svg viewBox="0 0 130 130" fill="none" stroke="#13203A" stroke-width="5" stroke-linecap="round"><circle cx="28" cy="52" r="9" fill="#13203A"/><path d="M38 56h46M84 56l-4 64M84 56l6 64M44 56l30 26M44 58l36 24"/></svg>',
  sujud: '<svg viewBox="0 0 140 130" fill="none" stroke="#13203A" stroke-width="5" stroke-linecap="round"><circle cx="24" cy="110" r="9" fill="#13203A"/><path d="M33 104l50-34M83 70l24 46M107 116h22M40 100l-6 18M40 100l10 16M14 120h120" /></svg>',
  sit: '<svg viewBox="0 0 120 130" fill="none" stroke="#13203A" stroke-width="5" stroke-linecap="round"><circle cx="54" cy="22" r="9" fill="#13203A"/><path d="M54 33v52M54 85h40M94 85l-50 30M54 40l14 34M54 40l20 32M10 120h100"/></svg>',
  salam: '<svg viewBox="0 0 120 130" fill="none" stroke="#13203A" stroke-width="5" stroke-linecap="round"><circle cx="62" cy="22" r="9" fill="#13203A"/><path d="M78 22h10M54 33v52M54 85h40M94 85l-50 30M54 40l14 34M54 40l20 32M10 120h100"/></svg>',
};

/* ---------- spring ---------- */
function spring(from, to, onUpdate, { stiffness = 380, damping = 34, velocity = 0, done } = {}) {
  let x = from, v = velocity, last = performance.now(), raf;
  const step = (t) => {
    const dt = Math.min(0.032, (t - last) / 1000); last = t;
    const a = -stiffness * (x - to) - damping * v;
    v += a * dt; x += v * dt; onUpdate(x);
    if (Math.abs(v) < 0.5 && Math.abs(x - to) < 0.5) { onUpdate(to); done && done(); return; }
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/* ---------- sheet with velocity drag + rubber-band ---------- */
const sheet = $("#sheet"), scrim = $("#scrim");
let sheetH = 0, sheetY = 0, stopSpring = null, onSheetClose = null;
const setY = (y) => { sheetY = y; sheet.style.transform = `translateY(${y}px)`; scrim.style.opacity = String(Math.max(0, 1 - y / sheetH)); };
function openSheet(title, html, after) {
  stopAudio();
  $("#sh-title").textContent = title; $("#sh-body").innerHTML = html; $("#sh-body").scrollTop = 0;
  sheetH = sheet.getBoundingClientRect().height; scrim.classList.add("on"); scrim.style.opacity = "0";
  stopSpring && stopSpring(); stopSpring = spring(sheetH, 0, setY, { stiffness: 300, damping: 30 });
  after && after($("#sh-body"));
}
function closeSheet(v = 0) {
  stopAudio();
  stopSpring && stopSpring();
  stopSpring = spring(sheetY, sheetH * 1.05, setY, { stiffness: 260, damping: 30, velocity: v, done: () => { scrim.classList.remove("on"); onSheetClose && onSheetClose(); onSheetClose = null; render(); } });
}
(() => {
  let startY = 0, startT = 0, lastY = 0, lastT = 0, vel = 0, dragging = false;
  const down = (e) => { dragging = true; stopSpring && stopSpring(); startY = lastY = e.clientY; startT = lastT = performance.now(); vel = 0; e.target.setPointerCapture?.(e.pointerId); };
  const move = (e) => {
    if (!dragging) return;
    const now = performance.now(); vel = (e.clientY - lastY) / Math.max(1, now - lastT) * 1000; lastY = e.clientY; lastT = now;
    let dy = e.clientY - startY;
    if (dy < 0) dy = -Math.pow(-dy, 0.7); // rubber-band upward
    setY(dy);
  };
  const up = () => {
    if (!dragging) return; dragging = false;
    if (sheetY > sheetH * 0.3 || vel > 900) closeSheet(vel);
    else { stopSpring = spring(sheetY, 0, setY, { velocity: vel }); }
  };
  [$(".grab"), $(".sh-h")].forEach((el) => { el.addEventListener("pointerdown", (e) => { if (e.target.closest(".x")) return; down(e); }); });
  window.addEventListener("pointermove", move); window.addEventListener("pointerup", up); window.addEventListener("pointercancel", up);
  $("#sh-x").onclick = () => closeSheet();
  scrim.onclick = () => closeSheet();
})();

/* ---------- audio ---------- */
const audio = new Audio(); audio.preload = "auto";
let queue = [], qOn = null;
const pad = (n) => String(n).padStart(3, "0");
const ayahUrl = (k) => { const [s, a] = k.split(":").map(Number); return `https://everyayah.com/data/Alafasy_128kbps/${pad(s)}${pad(a)}.mp3`; };
/* speech (narration) — Web Speech API, the device's own voices */
const synth = window.speechSynthesis;
const LANGS = { nl: "nl", en: "en", ar: "ar" };
const voiceFor = (l) => { const vs = synth ? synth.getVoices() : []; return vs.find((v) => v.lang.toLowerCase().startsWith(l) && /premium|enhanced|natural|online/i.test(v.name)) || vs.find((v) => v.lang.toLowerCase().startsWith(l)); };
if (synth) synth.onvoiceschanged = () => {};
let gen = 0;
function speak(text, lang, rate = 0.95) {
  return new Promise((res) => {
    if (!synth || !text) return res(false);
    const v = voiceFor(LANGS[lang] || lang);
    if (!v) { toast(lang === "ar" ? "No Arabic voice on this device." : `No ${lang === "nl" ? "Dutch" : "English"} voice on this device. On iPhone: Settings → Accessibility → Spoken Content → Voices.`); return res(false); }
    const u = new SpeechSynthesisUtterance(text); u.voice = v; u.lang = v.lang; u.rate = rate;
    let done = false; const fin = () => { if (!done) { done = true; clearTimeout(t); res(true); } };
    const t = setTimeout(fin, 2500 + text.length * 110); // iOS sometimes drops onend
    u.onend = fin; u.onerror = fin; synth.speak(u);
  });
}
// Arabic: real Arabic voice if the device has one, otherwise read the transliteration with the Dutch/English voice
function speakAr(ar, tr) { return voiceFor("ar") ? speak(ar, "ar", 0.8) : tr ? speak(tr.replace(/\(.*?\)/g, ""), S.narr === "en" ? "en" : "nl", 0.85) : speak(ar, "ar"); }
function narrText(o) { return S.narr === "en" ? o.en : S.narr === "nl" ? o.nl : null; }
// queue items: {k} = recitation, {say, lang} = narration
function playKeys(keys, rate, onEach, narr) {
  stopAudio(true); const my = ++gen; qOn = onEach; curRate = rate;
  const items = [];
  keys.forEach((k) => { items.push({ k }); if (narr) { const t = narr(k); if (t) items.push({ say: t, lang: S.narr, k }); } });
  queue = items; next(my);
}
function next(my = gen) {
  if (my !== gen) return;
  const it = queue.shift(); qOn && qOn(it ? it.k : null);
  if (!it) return;
  if (it.say) { speak(it.say, it.lang).then(() => next(my)); return; }
  audio.src = ayahUrl(it.k); audio.playbackRate = curRate; audio.onended = () => next(my); audio.play().catch(() => next(my));
}
function stopAudio(keepCb) { gen++; queue = []; audio.pause(); synth && synth.cancel(); if (!keepCb) { qOn && qOn(null); qOn = null; } }
let curRate = 1;
function toast(msg) {
  let el = $("#toast"); if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "toast"; document.body.appendChild(el); }
  el.textContent = msg; el.classList.add("on"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("on"), 4200);
}
// Speak buttons anywhere: data-say="text" data-lang="ar|nl|en"
document.addEventListener("click", (e) => {
  const b = e.target.closest("[data-say]"); if (!b) return; e.stopPropagation();
  stopAudio(); b.classList.add("speaking"); (b.dataset.lang === "ar" ? speakAr(b.dataset.say, b.dataset.tr) : speak(b.dataset.say, b.dataset.lang)).then(() => b.classList.remove("speaking"));
}, true);
const sayBtns = (o) => {
  const nl = S.narr === "en" ? o.en : o.nl;
  return `<div class="says">${o.ar ? `<button class="say" data-say="${h(o.ar)}" data-tr="${h(o.tr || "")}" data-lang="ar">${I.vol} Arabic</button>` : ""}${nl && S.narr !== "off" ? `<button class="say" data-say="${h(nl)}" data-lang="${S.narr}">${I.vol} ${S.narr === "en" ? "English" : "Nederlands"}</button>` : ""}</div>`;
};

/* ---------- tabs ---------- */
const TABS = [["today", "Today", I.sun], ["salah", "Salah", I.salah], ["quran", "Quran", I.book], ["learn", "Learn", I.spark], ["father", "Father", I.chat]];
let tab = location.hash.slice(1) || "today";
if (!TABS.some((t) => t[0] === tab)) tab = "today";
function drawTabs() {
  const nav = $("#tabs");
  nav.innerHTML = '<span class="pill" id="pill"></span>' + TABS.map(([k, l, ic]) => `<button class="tab ${k === tab ? "on" : ""}" data-t="${k}">${ic}<span>${l}</span></button>`).join("");
  nav.querySelectorAll(".tab").forEach((b) => (b.onclick = () => { if (b.dataset.t === tab) return; tab = b.dataset.t; location.hash = tab; drawTabs(); render(); window.scrollTo({ top: 0 }); }));
  movePill(true);
}
let pillX = null;
function movePill(anim) {
  const on = $("#tabs .tab.on"), pill = $("#pill"); if (!on) return;
  const x = on.offsetLeft, w = on.offsetWidth; pill.style.width = w + "px";
  if (pillX === null || !anim) { pillX = x; pill.style.transform = `translateX(${x}px)`; return; }
  spring(pillX, x, (v) => { pillX = v; pill.style.transform = `translateX(${v}px)`; }, { stiffness: 420, damping: 30 });
}

/* ---------- link router ---------- */
function go(target) {
  const [a, b] = target.split(":");
  if (a === "prayers") { if (tab !== "today") { tab = "today"; location.hash = tab; drawTabs(); render(); } $("#prayers")?.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
  if (a === "quran") return openSurah(Number(b));
  if (a === "salah") return ({ wudu: openWudu, steps: openSteps, after: openAfter, tells: openTells }[b] || openSteps)();
  if (a === "learn") return ({ cards: openCards, phrases: openPhrases, hadith: openHadith, seerah: openSeerah, ramadan: openRamadan, morocco: openMorocco, darija: openDarija }[b])();
  if (a === "father") return b === "prompts" ? openPrompts() : openScenes();
  if (a === "games") return openGames();
  if (a === "times") return openTimes();
  if (a === "counter") return openCounter();
  if (a === "game") return b === "order" ? gameOrderPrayer() : openGameMenu(b);
}
document.addEventListener("click", (e) => { const el = e.target.closest("[data-go]"); if (el && !e.target.closest(".check")) go(el.dataset.go); });

/* ---------- views ---------- */
const PR = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
function streak() {
  let n = 0, d = parse(today());
  const full = (k) => (S.prayers[k] || []).filter(Boolean).length === 5;
  if (!full(ymd(d))) d = new Date(d - DAY);
  while (full(ymd(d))) { n++; d = new Date(d - DAY); }
  return n;
}
function vToday() {
  const di = dayIndex(), day = PLAN[di - 1], t = today();
  const doneT = S.tasks[t] || [], pr = S.prayers[t] || [];
  const daysLeft = Math.ceil((parse(S.meeting) - parse(t)) / DAY);
  const pct = Math.round((di / PLAN.length) * 100);
  return `
  <h1 class="lt">Today</h1>
  <p class="sub">${new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</p>
  <div class="hero">${ZEL}
    <div class="k">Until you meet him</div>
    <div class="big">${Math.max(0, daysLeft)}<small>days</small></div>
    <div class="wk">Day ${di} of ${PLAN.length} · Week ${day.week}: <b>${day.weekName}</b></div>
    <div class="bar"><i style="width:${pct}%"></i></div>
  </div>
  <div class="sec sec-row"><span>PRAYERS · ${h(S.loc.name.toUpperCase())}</span><button class="link" data-go="times">Times & reminders ›</button></div>
  <div class="nextpr" data-go="times" id="nextpr">${nextLine()}</div>
  <div class="prayers" id="prayers">${PR.map((p, i) => `<button class="pr ${pr[i] ? "on" : ""}" data-p="${i}"><div class="dot">${pr[i] ? I.check : ""}</div><div class="nm">${p}</div><div class="tm">${fmtT(todayTimes()[PK[i]])}</div></button>`).join("")}</div>
  <div class="streak"><span>${pr.filter(Boolean).length}/5 prayed</span><span>${streak()} days in a row with all 5</span></div>
  <div class="sec">TODAY'S TASKS</div>
  <div class="group">${day.tasks.map(([l, g], i) => `<div class="row ${doneT.includes(i) ? "done" : ""}" data-go="${g}"><button class="check" data-ti="${i}" aria-label="done">${doneT.includes(i) ? I.check : ""}</button><div class="tx"><b>${h(l)}</b></div><span class="chev">${I.chev}</span></div>`).join("")}</div>
  <div class="sec">NARRATION</div>
  <div class="seg" id="narr">${[["nl", "Nederlands"], ["en", "English"], ["off", "Off"]].map(([k, l]) => `<button data-n="${k}" class="${S.narr === k ? "on" : ""}">${l}</button>`).join("")}</div>
  <div class="sec">MEETING DATE</div>
  <div class="group"><label class="row"><div class="ic c">${I.star}</div><div class="tx"><b>Meeting</b><span>Tap to change</span></div><input type="date" id="meet" value="${S.meeting}" style="border:0;background:none;font:inherit;color:var(--tanja)"></label></div>`;
}
function bindToday(root) {
  root.querySelectorAll(".pr").forEach((b) => (b.onclick = () => { const t = today(); const a = S.prayers[t] || [0, 0, 0, 0, 0]; a[b.dataset.p] = a[b.dataset.p] ? 0 : 1; S.prayers[t] = a; save(); render(); }));
  root.querySelectorAll(".check").forEach((b) => (b.onclick = (e) => { e.stopPropagation(); const t = today(); const a = S.tasks[t] || []; const i = Number(b.dataset.ti); S.tasks[t] = a.includes(i) ? a.filter((x) => x !== i) : [...a, i]; save(); render(); }));
  root.querySelectorAll("#narr button").forEach((b) => (b.onclick = () => { S.narr = b.dataset.n; save(); render(); if (S.narr !== "off") speak(S.narr === "nl" ? "Assalamoe alaikoem. Ik lees de betekenis voor in het Nederlands." : "As-salamu alaykum. I will read the meanings in English.", S.narr); }));
  $("#meet").onchange = (e) => { S.meeting = e.target.value; save(); render(); };
}

function vSalah() {
  return `
  <h1 class="lt">Salah</h1><p class="sub">The Maliki way, as you'll see it with a Moroccan family.</p>
  <button class="gamecta" data-go="games"><span class="gi">${I.game}</span><span class="gt"><b>Prayer games</b><small>Fill the gaps · put it in order · match · ${gamesDone()} cleared</small></span>${I.chev}</button>
  <div class="group">
    <div class="row" data-go="salah:wudu"><div class="ic">${I.drop}</div><div class="tx"><b>Wudu</b><span>11 steps + what breaks it</span></div><span class="chev">${I.chev}</span></div>
    <div class="row" data-go="salah:steps"><div class="ic">${I.salah}</div><div class="tx"><b>Prayer trainer</b><span>Step by step, Arabic + meaning</span></div><span class="chev">${I.chev}</span></div>
    <div class="row" data-go="salah:after"><div class="ic m">${I.beads}</div><div class="tx"><b>After the prayer</b><span>Dhikr people expect from experienced Muslims</span></div><span class="chev">${I.chev}</span></div>
    <div class="row" data-go="counter"><div class="ic m">${I.list}</div><div class="tx"><b>Rak'ah counter</b><span>Tap through your prayer: never lose count</span></div><span class="chev">${I.chev}</span></div>
    <div class="row" data-go="times"><div class="ic">${I.sun}</div><div class="tx"><b>Prayer times & qibla</b><span>${h(S.loc.name)} · reminders in your calendar</span></div><span class="chev">${I.chev}</span></div>
    <div class="row" data-go="salah:tells"><div class="ic c">${I.eye}</div><div class="tx"><b>Beginner tells</b><span>What gives you away, and how to fix it</span></div><span class="chev">${I.chev}</span></div>
  </div>
  <div class="sec">THE 5 PRAYERS</div>
  <div class="group">${PRAYERS.map((p) => `<div class="row"><div class="ic" style="font-weight:700;font-size:14px">${p.rak}</div><div class="tx"><b>${p.n}</b><span>${p.when} · ${p.loud} · ${p.note}</span></div></div>`).join("")}</div>
  <div class="note" style="margin-top:14px">You don't need a prayer mat. <b>Any clean surface</b> works. Times + qibla: Muslim Pro / Athan, or your mosque's timetable.</div>`;
}
const textBlock = (o) => `${o.ar ? `<div class="ar sm">${h(o.ar)}</div>` : ""}${o.tr ? `<div class="tr">${h(o.tr)}</div>` : ""}${S.narr === "nl" && o.nl ? `<div class="en nl">${h(o.nl)}</div>` : o.en ? `<div class="en">${h(o.en)}</div>` : ""}${o.ar || o.nl ? sayBtns(o) : ""}`;
function openWudu() {
  openSheet("Wudu", WUDU.map((s, i) => (i === WUDU.length - 1 ? { ...s, nl: WUDU_NL } : s)).map((s, i) => `<div class="card"><div class="score">${i + 1}. ${h(s.t)}</div><div class="en">${h(s.d)}</div>${textBlock(s)}</div>`).join("") +
    `<div class="sec">WHAT BREAKS WUDU</div><div class="card">${WUDU_BREAKERS.map((b) => `<div class="en">• ${h(b)}</div>`).join("")}</div>`);
}
function openAfter() { openSheet("After the prayer", AFTER_PRAYER.map((s, i) => ({ ...s, nl: AFTER_NL[i] })).map((s) => `<div class="card" ${s.link ? `data-go="${s.link}"` : ""}>${textBlock(s)}</div>`).join("")); }
function openTells() { openSheet("Beginner tells", TELLS.map(([a, b]) => `<div class="card"><div class="score" style="color:var(--clay)">✕ ${h(a)}</div><div class="en">✓ ${h(b)}</div></div>`).join("")); }
function openSteps() {
  const n = PRAYER_STEPS.length;
  openSheet("Prayer trainer", `
    <div class="stepper"><div class="track" id="track">${PRAYER_STEPS.map((s, i) => ({ ...s, nl: STEP_NL[i] })).map((s, i) => `<div class="slide"><div class="fig">${FIG[s.pos]}</div><div class="score">Step ${i + 1} of ${n}</div><div class="situ">${h(s.t)}</div>${textBlock(s)}${s.d ? `<div class="note">${h(s.d)}</div>` : ""}${s.link ? `<button class="btn ghost w" style="margin-top:12px" data-go="${s.link}">Open the surah</button>` : ""}${s.game ? `<button class="btn ghost w" style="margin-top:10px" data-go="game:${s.game}">${I.game} Practise as a game</button>` : ""}</div>`).join("")}</div></div>
    <div class="sfoot"><div class="dots" id="dots">${PRAYER_STEPS.map((_, i) => `<i class="${i ? "" : "on"}"></i>`).join("")}</div>
    <div class="stepnav"><button class="btn ghost" id="prev">Back</button><button class="btn" id="nextb">Next</button></div></div>`, (root) => {
    const track = $("#track", root), W = () => root.querySelector(".stepper").offsetWidth;
    let i = 0, x = 0, stop;
    const set = (v) => { x = v; track.style.transform = `translateX(${v}px)`; };
    const to = (j, vel = 0) => { i = Math.max(0, Math.min(n - 1, j)); stop && stop(); stop = spring(x, -i * W(), set, { velocity: vel, stiffness: 340, damping: 32 }); root.querySelectorAll("#dots i").forEach((d, k) => d.classList.toggle("on", k === i)); $("#nextb", root).textContent = i === n - 1 ? "Start again" : "Next"; fitH(); root.scrollTo({ top: 0, behavior: "smooth" }); };
    const fitH = () => { const sl = track.children[i]; root.querySelector(".stepper").style.height = sl.offsetHeight + "px"; };
    requestAnimationFrame(fitH);
    $("#prev", root).onclick = () => to(i - 1);
    $("#nextb", root).onclick = () => to(i === n - 1 ? 0 : i + 1);
    let sx = 0, sy = 0, lx = 0, lt = 0, v = 0, drag = null;
    const st = root.querySelector(".stepper");
    st.addEventListener("pointerdown", (e) => { if (e.target.closest("button")) return; sx = lx = e.clientX; sy = e.clientY; lt = performance.now(); drag = 0; stop && stop(); });
    st.addEventListener("pointermove", (e) => {
      if (drag === null) return;
      const dx = e.clientX - sx; if (drag === 0 && Math.abs(dx) < 8) return;
      if (drag === 0 && Math.abs(e.clientY - sy) > Math.abs(dx)) { drag = null; return; }
      drag = 1; const now = performance.now(); v = (e.clientX - lx) / Math.max(1, now - lt) * 1000; lx = e.clientX; lt = now;
      let off = dx; if ((i === 0 && dx > 0) || (i === n - 1 && dx < 0)) off = Math.sign(dx) * Math.pow(Math.abs(dx), 0.75);
      set(-i * W() + off);
    });
    const end = (e) => { if (drag !== 1) { drag = null; return; } drag = null; const dx = e.clientX - sx; to(i + (dx < -W() * 0.22 || v < -600 ? 1 : dx > W() * 0.22 || v > 600 ? -1 : 0), v); };
    st.addEventListener("pointerup", end); st.addEventListener("pointercancel", end);
  });
}

function vQuran() {
  return `<h1 class="lt">Quran</h1><p class="sub">Recited by Mishary Alafasy, verse by verse.</p>
  <div class="sec">YOUR PATH</div>
  <div class="group">${QURAN.filter((s) => s.path).map((s) => { const m = S.mastery[s.n] || 0; return `<div class="row" data-go="quran:${s.n}"><div class="ic" style="font-family:var(--ar);font-size:15px">${s.n === 2 ? "٢٥٥" : s.n.toLocaleString("ar-EG")}</div><div class="tx"><b>${h(s.name)}</b><span>${h(s.meaning)} · ${s.ayahs.length} ${s.ayahs.length === 1 ? "verse" : "verses"}</span><div class="mastery"><i style="width:${m * 25}%"></i></div></div><span class="chev">${I.chev}</span></div>`; }).join("")}</div>
  <div class="sec">THE REST OF JUZ' 'AMMA (78–114)</div>
  <div class="group">${QURAN.filter((s) => !s.path).sort((a, b) => b.n - a.n).map((s) => { const m = S.mastery[s.n] || 0; return `<div class="row" data-go="quran:${s.n}"><div class="ic" style="font-family:var(--ar);font-size:15px">${s.n.toLocaleString("ar-EG")}</div><div class="tx"><b>${s.n}. ${h(s.name)}</b><span>${h(s.meaning)} · ${s.ayahs.length} verses</span><div class="mastery"><i style="width:${m * 25}%"></i></div></div><span class="chev">${I.chev}</span></div>`; }).join("")}</div>
  <div class="note" style="margin-top:14px"><b>Morocco recites Warsh.</b> His recitation may sound slightly different from this app (Hafs). Both are authentic readings of the same Quran.</div>`;
}
function openSurah(n) {
  const s = QURAN.find((q) => q.n === n); if (!s) return;
  let level = 0, showTr = true, showEn = true;
  const hideMask = (words, lvl, seed) => words.map((_, i) => lvl === 0 ? false : lvl === 1 ? (i + seed) % 3 === 2 : lvl === 2 ? (i + seed) % 2 === 1 : i > 0);
  const body = () => s.ayahs.map((a, ai) => {
    const words = a.ar.split(" "), mask = hideMask(words, level, ai);
    return `<div class="ayah" data-k="${a.k}"><div class="hd"><span class="num">${a.k.split(":")[1]}</span><button class="play" data-play="${a.k}">${I.play}</button></div>
      <div class="ar">${words.map((w, i) => `<span class="w ${mask[i] ? "hid" : ""}">${h(w)}</span>`).join(" ")}</div>
      ${showTr && level < 2 ? `<div class="tr">${h(a.tr)}</div>` : ""}${showEn ? `<div class="en">${h(S.narr === "nl" ? a.nl : a.en)}</div>` : ""}${S.narr !== "off" ? `<div class="says"><button class="say" data-say="${h(S.narr === "en" ? a.en : a.nl)}" data-lang="${S.narr}">${I.vol} ${S.narr === "en" ? "English" : "Nederlands"}</button></div>` : ""}</div>`;
  }).join("");
  openSheet(s.name, `
    <div class="player">
      <button class="btn" id="all" style="padding:10px 14px">${I.play} All</button>
      <div class="seg" id="rate"><button data-r="0.75">Slow</button><button data-r="1" class="on">1×</button></div>
      <button class="chip" id="loop">Repeat</button>
    </div>
    <div class="chips">${S.narr !== "off" ? `<button class="chip on" id="narrq">${I.vol} ${S.narr === "en" ? "English" : "Dutch"} after each verse</button>` : ""}<button class="chip" data-go="game:q${n}">${I.game} Game</button></div>
    <div class="seg" id="lvl" style="margin-bottom:6px"><button data-l="0" class="on">Read</button><button data-l="1">⅓ hidden</button><button data-l="2">½ hidden</button><button data-l="3">From memory</button></div>
    <div class="chips"><button class="chip on" id="tTr">Transliteration</button><button class="chip on" id="tEn">Meaning</button></div>
    <div id="ay">${body()}</div>
    <div class="sec">HOW WELL DO YOU KNOW IT?</div>
    <div class="seg" id="mast">${["New", "A bit", "Almost", "Fluent", "Perfect"].map((l, i) => `<button data-m="${i}" class="${(S.mastery[n] || 0) === i ? "on" : ""}">${l}</button>`).join("")}</div>`, (root) => {
    let loop = false, withNarr = S.narr !== "off";
    curRate = 1;
    const narrFn = (k) => { if (!withNarr) return null; const a = s.ayahs.find((x) => x.k === k); return a && (S.narr === "en" ? a.en : a.nl); };
    const nb = $("#narrq", root); if (nb) nb.onclick = (e) => { withNarr = !withNarr; e.currentTarget.classList.toggle("on", withNarr); };
    const mark = (k) => root.querySelectorAll(".ayah").forEach((el) => el.classList.toggle("playing", el.dataset.k === k));
    const refresh = () => { $("#ay", root).innerHTML = body(); bindAy(); };
    const bindAy = () => {
      root.querySelectorAll("[data-play]").forEach((b) => (b.onclick = () => playKeys(loop ? Array(5).fill(b.dataset.play) : [b.dataset.play], curRate, mark, narrFn)));
      root.querySelectorAll(".w.hid").forEach((w) => (w.onclick = () => w.classList.add("rev")));
    };
    bindAy();
    $("#all", root).onclick = () => { const keys = s.ayahs.map((a) => a.k); playKeys(loop ? [...keys, ...keys, ...keys] : keys, curRate, mark, narrFn); };
    root.querySelectorAll("#rate button").forEach((b) => (b.onclick = () => { curRate = Number(b.dataset.r); audio.playbackRate = curRate; root.querySelectorAll("#rate button").forEach((x) => x.classList.toggle("on", x === b)); }));
    $("#loop", root).onclick = (e) => { loop = !loop; e.currentTarget.classList.toggle("on", loop); };
    root.querySelectorAll("#lvl button").forEach((b) => (b.onclick = () => { level = Number(b.dataset.l); root.querySelectorAll("#lvl button").forEach((x) => x.classList.toggle("on", x === b)); refresh(); }));
    $("#tTr", root).onclick = (e) => { showTr = !showTr; e.currentTarget.classList.toggle("on", showTr); refresh(); };
    $("#tEn", root).onclick = (e) => { showEn = !showEn; e.currentTarget.classList.toggle("on", showEn); refresh(); };
    root.querySelectorAll("#mast button").forEach((b) => (b.onclick = () => { S.mastery[n] = Number(b.dataset.m); save(); root.querySelectorAll("#mast button").forEach((x) => x.classList.toggle("on", x === b)); }));
  });
}

function vLearn() {
  const due = CARDS.filter((_, i) => (S.cards[i]?.due || 0) <= Date.now()).length;
  const rows = [
    ["games", I.game, "", "Prayer games", "Fill the gaps, put in order, match"],
    ["learn:cards", I.list, "", "Flashcards", `${due} due today · spaced repetition`],
    ["learn:phrases", I.spark, "c", "What do you say when…?", `Phrase reflex game · best: ${S.phrasesBest}/${PHRASES.length}`],
    ["learn:darija", I.chat, "c", "Darija", `${DARIJA.length} phrases for his house`],
    ["learn:morocco", I.map, "c", "At a Moroccan home", "Tea, food, respect, Tangier"],
    ["learn:hadith", I.book, "m", "Hadith", `${HADITH.length} essential ones, with sources`],
    ["learn:seerah", I.star, "m", "The life of the Prophet ﷺ", "Timeline from 570 to 661"],
    ["learn:ramadan", I.moon, "m", "Ramadan & Eid", "Your first Ramadan: ~Feb 2027"],
  ];
  return `<h1 class="lt">Learn</h1><p class="sub">Short and often beats long and occasional.</p>
  <div class="group">${rows.map(([g, ic, c, t, s]) => `<div class="row" data-go="${g}"><div class="ic ${c}">${ic}</div><div class="tx"><b>${t}</b><span>${s}</span></div><span class="chev">${I.chev}</span></div>`).join("")}</div>`;
}
const BOX = [0, 1, 3, 7, 16]; // days
function openCards() {
  const pick = () => { const now = Date.now(); const dueI = CARDS.map((_, i) => i).filter((i) => (S.cards[i]?.due || 0) <= now); return dueI.length ? dueI[Math.floor(Math.random() * dueI.length)] : -1; };
  let cur = pick();
  const draw = (root) => {
    const left = CARDS.filter((_, i) => (S.cards[i]?.due || 0) <= Date.now()).length;
    if (cur < 0) { root.innerHTML = `<div class="empty"><div class="situ">All done for today 🎉</div><p>Cards you got right come back after 1, 3, 7 and 16 days.</p><button class="btn ghost" id="again">Practise everything again anyway</button></div>`; $("#again", root).onclick = () => { CARDS.forEach((_, i) => { if (S.cards[i]) S.cards[i].due = 0; }); save(); cur = pick(); draw(root); }; return; }
    const c = CARDS[cur], box = S.cards[cur]?.box || 0;
    root.innerHTML = `<div class="score">${left} left · box ${box + 1}/5</div>
      <div class="flash" id="fl"><div class="in"><div class="face f"><small>QUESTION · tap to flip</small>${h(c.q)}</div><div class="face b"><small>ANSWER</small>${h(c.a)}</div></div></div>
      <div class="rate"><button class="btn bad" id="no">Didn't know it</button><button class="btn good" id="yes">Knew it</button></div>`;
    $("#fl", root).onclick = (e) => e.currentTarget.classList.toggle("flip");
    const rate = (ok) => { const b = ok ? Math.min(4, box + 1) : 0; S.cards[cur] = { box: b, due: ok ? Date.now() + BOX[b] * DAY : 0 }; save(); let n = pick(); if (n === cur && left > 1) n = pick(); cur = n; draw(root); };
    $("#no", root).onclick = () => rate(false); $("#yes", root).onclick = () => rate(true);
  };
  openSheet("Flashcards", `<div id="fc"></div>`, (root) => draw($("#fc", root)));
}
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function openPhrases() {
  const order = shuffle(PHRASES); let i = 0, score = 0;
  const draw = (root) => {
    if (i >= order.length) { if (score > S.phrasesBest) { S.phrasesBest = score; save(); } root.innerHTML = `<div class="empty"><div class="situ">${score}/${order.length}</div><p>${score === order.length ? "Perfect. That's how it should come out: on reflex." : "Again until it's 100%. This has to come out on autopilot."}</p><button class="btn" id="re">Play again</button></div>`; $("#re", root).onclick = () => { closeSheet(); setTimeout(openPhrases, 380); }; return; }
    const p = order[i], opts = shuffle([p, ...shuffle(PHRASES.filter((x) => x.a !== p.a)).slice(0, 3)]);
    root.innerHTML = `<div class="score">${i + 1}/${order.length} · score ${score}</div><div class="situ">${h(p.s)}</div>
      ${opts.map((o) => `<button class="opt" data-a="${h(o.a)}">${h(o.a)}</button>`).join("")}<div class="fb" id="fb"></div>`;
    root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
      if (root.dataset.lock) return; root.dataset.lock = 1;
      const ok = b.dataset.a === p.a; if (ok) score++;
      root.querySelectorAll(".opt").forEach((x) => { if (x.dataset.a === p.a) x.classList.add("ok", "pop"); else if (x === b) x.classList.add("no"); });
      $("#fb", root).innerHTML = `${ok ? "✓" : "✕"} ${h(p.x)}<br><button class="btn w" style="margin-top:12px" id="nx">Next</button>`;
      $("#nx", root).onclick = () => { delete root.dataset.lock; i++; draw(root); };
    }));
  };
  openSheet("What do you say when…?", `<div id="pg"></div>`, (root) => draw($("#pg", root)));
}
function openDarija() { openSheet("Darija", `<div class="note" style="margin-top:0">Moroccan Arabic. In Tangier you'll also hear Spanish words. One or two phrases at the right moment are worth more than ten forced ones.</div>` + DARIJA.map((x) => `<div class="card"><div class="situ" style="font-size:20px;margin:0">${h(x.d)}</div><div class="en">${h(x.m)}</div></div>`).join("")); }
function openMorocco() { openSheet("At a Moroccan home", MOROCCO.map((x) => `<div class="card"><div class="score">${h(x.t)}</div><div class="en">${h(x.d)}</div></div>`).join("")); }
function openHadith() { openSheet("Hadith", HADITH.map((x) => `<div class="card"><div class="score">${h(x.t)}</div>${x.ar ? `<div class="ar sm">${h(x.ar)}</div>` : ""}<div class="en" style="color:var(--ink);font-size:16px">“${h(x.en)}”</div>${x.why ? `<div class="note">${h(x.why)}</div>` : ""}<div class="src">${h(x.src)}</div></div>`).join("") + `<div class="note">Look up any hadith on sunnah.com by its number.</div>`); }
function openSeerah() { openSheet("The life of the Prophet ﷺ", `<div class="tl">${SEERAH.map((x) => `<div class="it"><div class="y">${h(x.y)}</div><div class="t">${h(x.t)}</div><div class="d">${h(x.d)}</div></div>`).join("")}</div><div class="note">To go deeper: Yasir Qadhi's Seerah series on YouTube. Great for the commute.</div>`); }
function openRamadan() { openSheet("Ramadan & Eid", RAMADAN.map((x) => `<div class="card"><div class="score">${h(x.t)}</div><div class="en">${h(x.d)}</div></div>`).join("")); }

function vFather() {
  const best = S.father.best || 0, max = FATHER.scenes.length * 2;
  const written = FATHER.prompts.filter((_, i) => (S.answers[i] || "").trim().length > 20).length;
  return `<h1 class="lt">Father</h1><p class="sub">Rehearse until nothing catches you off guard.</p>
  <div class="hero">${ZEL}<div class="k">Best score in the scenes</div><div class="big">${best}<small>/ ${max}</small></div><div class="bar"><i style="width:${(best / max) * 100}%"></i></div>
  <div class="wk">Your answers written: <b>${written}/${FATHER.prompts.length}</b></div></div>
  <div class="sec">PRACTISE</div>
  <div class="group">
    <div class="row" data-go="father:scenes"><div class="ic">${I.chat}</div><div class="tx"><b>The visit: ${FATHER.scenes.length} scenes</b><span>He says something, you choose, you get feedback</span></div><span class="chev">${I.chev}</span></div>
    <div class="row" data-go="father:prompts"><div class="ic c">${I.pen}</div><div class="tx"><b>Your own answers</b><span>The big questions, in your own words. Saved on your phone.</span></div><span class="chev">${I.chev}</span></div>
  </div>
  <div class="note" style="margin-top:14px"><b>Golden rule:</b> everything you say must be true. Calm honesty plus visible seriousness beats any polished story.</div>`;
}
function openScenes() {
  let i = 0, score = 0;
  const draw = (root) => {
    if (i >= FATHER.scenes.length) { root.innerHTML = `<div class="empty"><div class="situ">${score} / ${FATHER.scenes.length * 2}</div><p>${score >= FATHER.scenes.length * 2 - 2 ? "Strong. Now say the answers out loud too." : "Go through it again. Read the feedback carefully."}</p><button class="btn" id="re">Again</button></div>`; $("#re", root).onclick = () => { i = 0; score = 0; draw(root); }; return; }
    const sc = FATHER.scenes[i], opts = shuffle(sc.o);
    root.innerHTML = `<div class="score">Scene ${i + 1}/${FATHER.scenes.length}</div><div class="father-who">HER FATHER</div><div class="father-q">${h(sc.q)}</div>
      ${opts.map((o, k) => `<button class="opt" data-k="${k}">${h(o[0])}</button>`).join("")}<div class="fb" id="fb"></div>`;
    root.querySelectorAll(".opt").forEach((b) => (b.onclick = () => {
      if (root.dataset.lock) return; root.dataset.lock = 1;
      const o = opts[b.dataset.k]; score += o[1];
      root.querySelectorAll(".opt").forEach((x) => { const oo = opts[x.dataset.k]; if (oo[1] === 2) x.classList.add("ok"); else if (x === b) x.classList.add(oo[1] === 1 ? "mid" : "no"); });
      b.classList.add("pop");
      $("#fb", root).innerHTML = `${o[1] === 2 ? "✓ " : o[1] === 1 ? "~ " : "✕ "}${h(o[2])}<br><button class="btn w" style="margin-top:12px" id="nx">${i === FATHER.scenes.length - 1 ? "Finish" : "Next"}</button>`;
      $("#nx", root).onclick = () => { delete root.dataset.lock; i++; if (i >= FATHER.scenes.length) { S.father.best = Math.max(S.father.best || 0, score); save(); } draw(root); };
    }));
  };
  openSheet("The visit", `<div id="sc"></div>`, (root) => draw($("#sc", root)));
}
function openPrompts() {
  openSheet("Your own answers", `<div class="note" style="margin-top:0">Write it as you'd say it to him. Then read it out loud until it sounds natural. Don't memorise it word for word.</div>` +
    FATHER.prompts.map((p, i) => `<div class="father-who">HER FATHER</div><div class="father-q">${h(p.q)}</div><div class="en" style="font-size:13.5px;margin:8px 4px 0">${h(p.tip)}</div><textarea data-i="${i}" placeholder="Your answer…">${h(S.answers[i] || "")}</textarea>`).join(""),
    (root) => root.querySelectorAll("textarea").forEach((t) => (t.oninput = () => { S.answers[t.dataset.i] = t.value; save(); })));
}

/* ---------- games ---------- */
const MODES = [["gap", "Fill the gaps", "Pick the missing word, line by line"], ["order", "Put it in order", "Tap the lines in the right order"], ["match", "Match", "Transliteration ↔ meaning"]];
const gkey = (id, m) => `${id}:${m}`;
const stars = (n) => "★".repeat(n) + "☆".repeat(3 - n);
const starsFor = (mistakes) => (mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1);
function gamesDone() { return Object.values(S.games).filter((v) => v >= 2).length; }
function textProgress(t) { return MODES.filter(([m]) => (S.games[gkey(t.id, m)] || 0) >= 2).length; }
function saveStars(id, m, n) { S.games[gkey(id, m)] = Math.max(S.games[gkey(id, m)] || 0, n); save(); }
const meaning = (c) => (S.narr === "en" ? c.en || c.nl : c.nl);
function chunkAudio(c) { if (c.k) playKeys([c.k], 1, null, null); else { synth && synth.cancel(); speakAr(c.ar, c.tr); } }
function wrongFx(el) { el.classList.remove("shake"); void el.offsetWidth; el.classList.add("shake"); navigator.vibrate && navigator.vibrate(40); }

function openGames() {
  const pray = TEXTS.filter((t) => !t.quran), qur = TEXTS.filter((t) => t.quran && t.path), rest = TEXTS.filter((t) => t.quran && !t.path).sort((a, b) => Number(b.id.slice(1)) - Number(a.id.slice(1)));
  const row = (t) => { const p = textProgress(t); return `<div class="row" data-go="game:${t.id}"><div class="ic ${p === 3 ? "m" : ""}">${p === 3 ? I.check : I.game}</div><div class="tx"><b>${h(t.name)}</b><span>${h(t.sub)} · ${p}/3 games</span></div><span class="chev">${I.chev}</span></div>`; };
  const ob = S.games["prayer:order"] || 0;
  openSheet("Prayer games", `
    <div class="group"><div class="row" data-go="game:order"><div class="ic c">${I.list}</div><div class="tx"><b>Order the prayer</b><span>All 12 steps of a prayer, in the right order · ${ob ? stars(ob) : "not played"}</span></div><span class="chev">${I.chev}</span></div></div>
    <div class="sec">PRAYER TEXTS</div><div class="group">${pray.map(row).join("")}</div>
    <div class="sec">YOUR SURAHS</div><div class="group">${qur.map(row).join("")}</div>
    <div class="sec">REST OF JUZ' 'AMMA</div><div class="group">${rest.map(row).join("")}</div>
    <div class="note">Cleared = at least ★★ (max 2 mistakes). Aim for ★★★ on everything before you meet him.</div>`);
}
function openGameMenu(id) {
  const t = TEXTS.find((x) => x.id === id); if (!t) return;
  openSheet(t.name, `<div id="gm"></div>`, (root) => gameMenu($("#gm", root), t));
}
function gameMenu(el, t) {
  stopAudio();
  el.innerHTML = `<p class="en" style="margin-top:0">${h(t.sub)} · ${t.chunks.length} parts</p>
    ${MODES.map(([m, l, d]) => { const st = S.games[gkey(t.id, m)] || 0; return `<button class="opt modebtn" data-m="${m}"><b>${l}</b><span class="stars ${st ? "got" : ""}">${stars(st)}</span><small>${d}</small></button>`; }).join("")}
    <div class="sec">LISTEN & READ ALONG</div>
    <button class="btn ghost w" id="listen">${I.vol} Play it all${S.narr !== "off" ? ` with ${S.narr === "en" ? "English" : "Dutch"}` : ""}</button>
    <div id="lst">${t.chunks.map((c, i) => `<div class="ayah" data-i="${i}"><div class="ar sm">${h(c.ar)}</div><div class="tr">${h(c.tr)}</div><div class="en">${h(meaning(c))}</div></div>`).join("")}</div>`;
  el.querySelectorAll(".modebtn").forEach((b) => (b.onclick = () => ({ gap: gameGap, order: gameOrder, match: gameMatch }[b.dataset.m])(el, t)));
  $("#listen", el).onclick = async () => {
    stopAudio(); const my = gen;
    const mark = (i) => el.querySelectorAll("#lst .ayah").forEach((x) => x.classList.toggle("playing", Number(x.dataset.i) === i));
    for (let i = 0; i < t.chunks.length; i++) {
      if (my !== gen) return; mark(i); const c = t.chunks[i];
      if (c.k) await new Promise((r) => { audio.src = ayahUrl(c.k); audio.playbackRate = 1; audio.onended = r; audio.onerror = r; audio.play().catch(r); });
      else await speakAr(c.ar, c.tr);
      if (my !== gen) return;
      const m = S.narr === "en" ? c.en : S.narr === "nl" ? c.nl : null; if (m) await speak(m, S.narr);
    }
    mark(-1);
  };
}
const backBar = (el, t, label) => `<div class="gbar"><button class="chip" id="gback">‹ ${h(t.name)}</button><span class="score">${label}</span></div>`;
function finish(el, t, mode, mistakes) {
  const n = starsFor(mistakes); saveStars(t.id, mode, n);
  el.innerHTML = `<div class="empty"><div class="bigstars pop">${stars(n)}</div><div class="situ">${n === 3 ? "Flawless" : n === 2 ? "Cleared" : "Almost"}</div><p>${mistakes} ${mistakes === 1 ? "mistake" : "mistakes"}. ${n === 3 ? "That's how it should sit: on autopilot." : "Again. You want ★★★."}</p>
    <div class="stepnav"><button class="btn ghost" id="gb">Other game</button><button class="btn" id="ga">Again</button></div></div>`;
  $("#gb", el).onclick = () => (t.id === "prayer" ? openGames() : gameMenu(el, t));
  $("#ga", el).onclick = () => (t.id === "prayer" ? gameOrderPrayer() : ({ gap: gameGap, order: gameOrder, match: gameMatch }[mode])(el, t));
}
// 1) Fill the gaps — sequential, blanks in the transliteration
function gameGap(el, t) {
  stopAudio();
  const words = (s) => s.split(/\s+/).filter(Boolean);
  const pool = [...new Set(t.chunks.flatMap((c) => words(c.tr)).map((w) => w.replace(/[.,;:!?"()]/g, "")).filter((w) => w.length > 2))];
  let ci = 0, mistakes = 0, blanks = [], bi = 0;
  const setup = () => { const w = words(t.chunks[ci].tr); const cand = w.map((x, i) => [x.replace(/[.,;:!?"()]/g, ""), i]).filter(([x]) => x.length > 2).map(([, i]) => i); const n = w.length > 5 ? 2 : 1; blanks = shuffle(cand).slice(0, Math.max(1, Math.min(n, cand.length))).sort((a, b) => a - b); if (!blanks.length) blanks = [0]; bi = 0; };
  const draw = () => {
    const c = t.chunks[ci], w = words(c.tr), cur = blanks[bi], answer = (w[cur] || "").replace(/[.,;:!?"()]/g, "");
    const opts = shuffle([answer, ...shuffle(pool.filter((x) => x.toLowerCase() !== answer.toLowerCase())).slice(0, 3)]);
    el.innerHTML = backBar(el, t, `Line ${ci + 1}/${t.chunks.length} · ${mistakes} ✕`) +
      `<div class="done-lines">${t.chunks.slice(Math.max(0, ci - 2), ci).map((d) => `<div class="tr dim">${h(d.tr)}</div>`).join("")}</div>
      <div class="card gapcard"><div class="ar sm">${h(c.ar)}</div>
      <div class="gapline">${w.map((x, i) => (blanks.includes(i) && blanks.indexOf(i) >= bi ? `<span class="blank ${i === cur ? "cur" : ""}">${i === cur ? "?" : "…"}</span>` : `<span>${h(x)}</span>`)).join(" ")}</div>
      <div class="en">${h(meaning(c))}</div></div>
      <div class="optgrid">${opts.map((o) => `<button class="opt tile" data-w="${h(o)}">${h(o)}</button>`).join("")}</div>`;
    $("#gback", el).onclick = () => gameMenu(el, t);
    let busy = false;
    el.querySelectorAll(".tile").forEach((b) => (b.onclick = () => {
      if (busy || b.classList.contains("no")) return;
      if (b.dataset.w !== answer) { mistakes++; b.classList.add("no"); wrongFx(b); return; }
      busy = true; b.classList.add("ok", "pop"); bi++;
      setTimeout(() => { if (bi < blanks.length) return draw(); chunkAudio(c); ci++; if (ci >= t.chunks.length) return setTimeout(() => finish(el, t, "gap", mistakes), 600); setup(); draw(); }, 350);
    }));
  };
  setup(); draw();
}
// 2) Put it in order — shuffled lines, tap the next one
function gameOrder(el, t) {
  stopAudio();
  let next = 0, mistakes = 0; const tiles = shuffle(t.chunks.map((c, i) => ({ c, i })));
  const draw = () => {
    el.innerHTML = backBar(el, t, `${next}/${t.chunks.length} · ${mistakes} ✕`) +
      `<div class="built">${next > 2 ? `<div class="en dim" style="margin:0 0 4px">✓ ${next - 2} earlier lines</div>` : ""}${t.chunks.slice(Math.max(0, next - 2), next).map((c) => `<div class="bline"><span class="ar xs">${h(c.ar)}</span><span class="tr">${h(c.tr)}</span></div>`).join("") || `<div class="en dim">Tap the first line…</div>`}</div>
      <div class="sec">WHAT COMES NEXT?</div>
      ${tiles.filter((x) => !x.used).map((x) => `<button class="opt otile" data-i="${x.i}"><span class="tr" style="margin:0">${h(x.c.tr)}</span><small>${h(meaning(x.c))}</small></button>`).join("")}`;
    $("#gback", el).onclick = () => gameMenu(el, t);
    el.querySelectorAll(".otile").forEach((b) => (b.onclick = () => {
      const x = tiles.find((y) => y.i === Number(b.dataset.i));
      if (x.c.tr !== t.chunks[next].tr) { mistakes++; b.classList.add("no"); wrongFx(b); setTimeout(() => b.classList.remove("no"), 500); return; }
      const same = tiles.find((y) => !y.used && y.c.tr === t.chunks[next].tr); same.used = true; // duplicates (salawat) are interchangeable
      chunkAudio(t.chunks[next]); next++;
      if (next >= t.chunks.length) { el.querySelectorAll(".otile").forEach((x) => (x.disabled = true)); return setTimeout(() => finish(el, t, "order", mistakes), 700); }
      draw();
    }));
  };
  draw();
}
// 3) Match transliteration ↔ meaning (rounds of 4)
function gameMatch(el, t) {
  stopAudio();
  const uniq = []; t.chunks.forEach((c) => { if (!uniq.some((u) => u.tr === c.tr)) uniq.push(c); });
  const rounds = []; const sh = shuffle(uniq); for (let i = 0; i < sh.length; i += 4) rounds.push(sh.slice(i, i + 4));
  if (rounds.length > 1 && rounds[rounds.length - 1].length < 2) rounds[rounds.length - 2].push(...rounds.pop());
  let r = 0, mistakes = 0, sel = null;
  const draw = () => {
    const set = rounds[r], L = shuffle(set), R = shuffle(set); let left = set.length; sel = null;
    el.innerHTML = backBar(el, t, `Round ${r + 1}/${rounds.length} · ${mistakes} ✕`) +
      `<div class="match"><div>${L.map((c) => `<button class="opt mt" data-s="L" data-tr="${h(c.tr)}">${h(c.tr)}</button>`).join("")}</div>
      <div>${R.map((c) => `<button class="opt mt mr" data-s="R" data-tr="${h(c.tr)}">${h(meaning(c))}</button>`).join("")}</div></div>`;
    $("#gback", el).onclick = () => gameMenu(el, t);
    el.querySelectorAll(".mt").forEach((b) => (b.onclick = () => {
      if (b.classList.contains("ok")) return;
      if (!sel || sel.dataset.s === b.dataset.s) { el.querySelectorAll(`.mt[data-s="${b.dataset.s}"]`).forEach((x) => x.classList.remove("sel")); sel = b; b.classList.add("sel"); if (b.dataset.s === "L") { const c = set.find((x) => x.tr === b.dataset.tr); c && chunkAudio(c); } return; }
      if (sel.dataset.tr === b.dataset.tr) { [sel, b].forEach((x) => { x.classList.remove("sel"); x.classList.add("ok", "pop"); }); sel = null; if (--left === 0) setTimeout(() => { r++; r >= rounds.length ? finish(el, t, "match", mistakes) : draw(); }, 500); }
      else { mistakes++; wrongFx(b); wrongFx(sel); sel.classList.remove("sel"); sel = null; }
    }));
  };
  draw();
}
// Order the whole prayer
function gameOrderPrayer() {
  const t = { id: "prayer", name: "Prayer games", chunks: PRAYER_ORDER };
  openSheet("Order the prayer", `<div id="gp"></div>`, (root) => {
    const el = $("#gp", root);
    let next = 0, mistakes = 0; const tiles = shuffle(PRAYER_ORDER.map((c, i) => ({ c, i })));
    const draw = () => {
      el.innerHTML = `<div class="gbar"><span class="en" style="margin:0">One rak'ah plus the ending</span><span class="score">${next}/${PRAYER_ORDER.length} · ${mistakes} ✕</span></div>
        <div class="built">${next > 3 ? `<div class="en dim" style="margin:0 0 4px">✓ ${next - 3} earlier steps</div>` : ""}${PRAYER_ORDER.slice(Math.max(0, next - 3), next).map((c, i) => `<div class="bline"><b>${Math.max(0, next - 3) + i + 1}. ${h(c.t)}</b> <span class="en dim" style="margin:0">${h(c.d)}</span></div>`).join("") || `<div class="en dim">What do you do first?</div>`}</div>
        <div class="sec">NEXT</div>${tiles.filter((x) => !x.used).map((x) => `<button class="opt otile" data-i="${x.i}"><b>${h(x.c.t)}</b><small>${h(x.c.d)}</small></button>`).join("")}`;
      el.querySelectorAll(".otile").forEach((b) => (b.onclick = () => {
        const i = Number(b.dataset.i);
        if (i !== next) { mistakes++; b.classList.add("no"); wrongFx(b); setTimeout(() => b.classList.remove("no"), 500); return; }
        tiles.find((y) => y.i === i).used = true; next++;
        if (next >= PRAYER_ORDER.length) return setTimeout(() => finish(el, t, "order", mistakes), 400);
        draw();
      }));
    };
    draw();
  });
}

/* ---------- prayer times, reminders, qibla ---------- */
const PK = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
const fmtT = (d) => (d ? d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }) : "–");
const timesFor = (date) => prayerTimes(date, S.loc.lat, S.loc.lng, S.method);
let _tt = null, _ttDay = "";
function todayTimes() { const k = today() + S.loc.lat + S.loc.lng + S.method; if (_ttDay !== k) { _tt = timesFor(new Date()); _ttDay = k; } return _tt; }
function nextPrayer() {
  const now = Date.now(), t = todayTimes();
  for (let i = 0; i < 5; i++) if (t[PK[i]] > now) return { i, at: t[PK[i]] };
  const tm = timesFor(new Date(Date.now() + DAY)); return { i: 0, at: tm.fajr, tomorrow: true };
}
function nextLine() {
  const n = nextPrayer(), mins = Math.max(0, Math.round((n.at - Date.now()) / 60000));
  const left = mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins} min`;
  return `<span class="np-dot"></span><span>Next: <b>${PR[n.i]}</b> at ${fmtT(n.at)}${n.tomorrow ? " (tomorrow)" : ""}</span><span class="np-left">in ${left}</span>`;
}
// chime (no external adhan file): two soft bell tones
function chime() {
  try {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    [[659.25, 0], [880, 0.35], [659.25, 0.9]].forEach(([f, t0]) => {
      const o = ac.createOscillator(), g = ac.createGain(); o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0, ac.currentTime + t0); g.gain.linearRampToValueAtTime(0.25, ac.currentTime + t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + t0 + 1.6);
      o.connect(g).connect(ac.destination); o.start(ac.currentTime + t0); o.stop(ac.currentTime + t0 + 1.7);
    });
  } catch (e) {}
}
async function notify(title, body) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  try { const reg = await navigator.serviceWorker?.getRegistration(); if (reg) return reg.showNotification(title, { body, tag: title }); new Notification(title, { body }); } catch (e) {}
}
// while the app is open: alert at each prayer time
setInterval(() => {
  const t = todayTimes(), now = Date.now(), d = today();
  PK.forEach((k, i) => {
    const at = t[k].getTime(), key = d + k;
    if (now >= at && now - at < 5 * 60000 && !S.alerted[key]) {
      S.alerted = { [key]: 1, ...Object.fromEntries(Object.entries(S.alerted).filter(([x]) => x.startsWith(d))) }; save();
      chime(); toast(`It's time for ${PR[i]} (${fmtT(t[k])}). Allāhu akbar.`); notify(`${PR[i]}: ${fmtT(t[k])}`, "Time to pray.");
    }
  });
  const np = $("#nextpr"); if (np) np.innerHTML = nextLine();
}, 20000);

// .ics: prayer alarms for the next 30 days + daily study reminder until the meeting
function buildICS({ prayers, study }) {
  const pad2 = (n) => String(n).padStart(2, "0");
  const utc = (d) => `${d.getUTCFullYear()}${pad2(d.getUTCMonth() + 1)}${pad2(d.getUTCDate())}T${pad2(d.getUTCHours())}${pad2(d.getUTCMinutes())}00Z`;
  const stamp = utc(new Date()), L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Deen Trainer//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:Deen Trainer"];
  const ev = (uid, start, mins, summary, desc, extra = []) => L.push("BEGIN:VEVENT", `UID:${uid}@deen-trainer`, `DTSTAMP:${stamp}`, ...start, `DURATION:PT${mins}M`, `SUMMARY:${summary}`, `DESCRIPTION:${desc}`, ...extra, "BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${summary}`, "TRIGGER:PT0M", "END:VALARM", "END:VEVENT");
  if (prayers) for (let k = 0; k < 30; k++) {
    const day = new Date(Date.now() + k * DAY), t = timesFor(day);
    PK.forEach((p, i) => ev(`${ymd(day)}-${p}-${S.loc.lat.toFixed(2)}`, [`DTSTART:${utc(t[p])}`], 15, `${PR[i]}`, `Prayer time (${S.loc.name}\\, ${METHODS[S.method].name}). Open Deen Trainer to log it.`));
  }
  if (study) {
    const [hh, mm] = S.remindAt.split(":"), start = parse(today()), until = parse(S.meeting);
    ev(`study-${today()}`, [`DTSTART:${ymd(start).replace(/-/g, "")}T${hh}${mm}00`], 20, "Deen Trainer: today's tasks", "Your daily lesson + games. 15 minutes.", [`RRULE:FREQ=DAILY;UNTIL=${ymd(until).replace(/-/g, "")}T235959`]);
  }
  L.push("END:VCALENDAR");
  // RFC 5545: fold lines longer than 75 octets
  const enc = new TextEncoder(), fold = (line) => { const out = []; let cur = "", n = 0; for (const ch of line) { const b = enc.encode(ch).length; if (n + b > (out.length ? 74 : 75)) { out.push(cur); cur = ""; n = 0; } cur += ch; n += b; } out.push(cur); return out.join("\r\n "); };
  return L.map(fold).join("\r\n") + "\r\n";
}
function downloadICS(opts, name) {
  const blob = new Blob([buildICS(opts)], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
}
function openTimes() {
  const draw = (root) => {
    const t = todayTimes(), q = qibla(S.loc.lat, S.loc.lng), n = nextPrayer();
    const perm = "Notification" in window ? Notification.permission : "unsupported";
    root.innerHTML = `
      <div class="hero" style="margin-bottom:6px">${ZEL}<div class="k">Next prayer · ${h(S.loc.name)}</div><div class="big">${PR[n.i]}<small>${fmtT(n.at)}</small></div><div class="wk" id="tleft">${nextLine()}</div></div>
      <div class="group" style="margin-top:12px">
        ${[["Fajr", t.fajr], ["Sunrise", t.sunrise], ["Dhuhr", t.dhuhr], ["Asr", t.asr], ["Maghrib", t.maghrib], ["Isha", t.isha]].map(([k, v]) => `<div class="row ${k === PR[n.i] && !n.tomorrow ? "cur" : ""}"><div class="tx"><b>${k}</b>${k === "Sunrise" ? `<span>End of Fajr time, not a prayer</span>` : ""}</div><span class="time">${fmtT(v)}</span></div>`).join("")}
      </div>
      <div class="sec">QIBLA</div>
      <div class="card qib"><div class="compass"><div class="needle" style="transform:rotate(${q}deg)"><i></i></div><span class="n">N</span></div>
        <div><div class="situ" style="margin:0">${q.toFixed(0)}°</div><div class="en">From north, clockwise (${q > 112 && q < 158 ? "southeast" : q > 67 && q <= 112 ? "east" : "direction"}). Point your phone's compass app at ${q.toFixed(0)}°, or use the qibla finder in Muslim Pro.</div></div></div>
      <div class="sec">LOCATION</div>
      <button class="btn ghost w" id="geo">${I.map} Use my location</button>
      <div class="chips" style="margin-top:10px">${CITIES.map(([c]) => `<button class="chip ${c === S.loc.name ? "on" : ""}" data-city="${h(c)}">${h(c)}</button>`).join("")}</div>
      <div class="sec">CALCULATION</div>
      <div class="seg" id="meth">${Object.entries(METHODS).map(([k, m]) => `<button data-m="${k}" class="${S.method === k ? "on" : ""}">${m.name.split(" (")[0].replace("Muslim World League", "MWL")}</button>`).join("")}</div>
      <div class="note">Asr uses a shadow length of 1× (the Maliki way, as in Morocco). Your mosque's timetable always wins: if it differs by a few minutes, follow the mosque.</div>
      <div class="sec">REMINDERS</div>
      <div class="card">
        <div class="score">In your iPhone calendar (works even when the app is closed)</div>
        <div class="en">Adds an alarm at each of the 5 prayer times for the next 30 days, plus a daily reminder for your tasks until the meeting.</div>
        <label class="row" style="padding:12px 0 4px"><div class="tx"><b>Daily study reminder</b></div><input type="time" id="rat" value="${S.remindAt}" class="tinput"></label>
        <div class="stepnav" style="margin-top:10px"><button class="btn" id="icsAll">Add all to calendar</button></div>
        <div class="chips" style="margin-top:10px"><button class="chip" id="icsP">Prayer times only</button><button class="chip" id="icsS">Study reminder only</button></div>
      </div>
      <div class="card">
        <div class="score">While the app is open</div>
        <div class="en">A chime + message at each prayer time. ${perm === "granted" ? "Notifications: <b>on</b>." : perm === "denied" ? "Notifications are blocked in your settings." : perm === "unsupported" ? "On iPhone: add the app to your home screen first (Share → Add to Home Screen), then turn notifications on here." : ""}</div>
        <div class="stepnav" style="margin-top:10px">${perm === "default" ? `<button class="btn ghost" id="perm">Turn on notifications</button>` : ""}<button class="btn ghost" id="test">${I.vol} Test chime</button></div>
      </div>`;
    $("#geo", root).onclick = () => {
      if (!navigator.geolocation) return toast("Location isn't available on this device.");
      navigator.geolocation.getCurrentPosition((p) => { S.loc = { name: "My location", lat: +p.coords.latitude.toFixed(4), lng: +p.coords.longitude.toFixed(4) }; save(); draw(root); toast("Location set."); }, () => toast("Couldn't get your location. Pick a city instead."), { timeout: 10000 });
    };
    root.querySelectorAll("[data-city]").forEach((b) => (b.onclick = () => { const c = CITIES.find((x) => x[0] === b.dataset.city); S.loc = { name: c[0], lat: c[1], lng: c[2] }; save(); draw(root); }));
    root.querySelectorAll("#meth button").forEach((b) => (b.onclick = () => { S.method = b.dataset.m; save(); draw(root); }));
    $("#rat", root).onchange = (e) => { S.remindAt = e.target.value || "20:00"; save(); };
    $("#icsAll", root).onclick = () => downloadICS({ prayers: true, study: true }, "deen-trainer-reminders.ics");
    $("#icsP", root).onclick = () => downloadICS({ prayers: true }, "deen-prayer-times.ics");
    $("#icsS", root).onclick = () => downloadICS({ study: true }, "deen-study-reminder.ics");
    $("#test", root).onclick = () => { chime(); notify("Deen Trainer", "This is what a prayer reminder looks like."); };
    const pb = $("#perm", root); if (pb) pb.onclick = async () => { await Notification.requestPermission(); draw(root); };
  };
  openSheet("Prayer times", `<div id="pt"></div>`, (root) => draw($("#pt", root)));
}

/* ---------- rak'ah counter ---------- */
function prayerFlow(n, name) {
  const st = [], P = PRAYER_STEPS;
  const ph = (pos, t, line, sub) => st.push({ pos, t, line, sub });
  for (let r = 1; r <= n; r++) {
    const R = `Rak'ah ${r} of ${n}`;
    if (r === 1) ph("takbir", "Allāhu akbar", "Opening takbir, hands up", R);
    ph("stand", r <= 2 ? "Al-Fatiha + short surah" : "Al-Fatiha only", r <= 2 && name !== "Dhuhr" && name !== "Asr" ? "Aloud" : "Silently", R);
    ph("ruku", "Ruku", "Subḥāna rabbiyal-ʿaẓīm ×3", R);
    ph("stand", "Rise", "Samiʿallāhu liman ḥamidah · Rabbanā wa lakal-ḥamd", R);
    ph("sujud", "Sujud", "Subḥāna rabbiyal-aʿlā ×3", R);
    ph("sit", "Sit briefly", "Rabbighfir lī", R);
    ph("sujud", "Second sujud", "Subḥāna rabbiyal-aʿlā ×3", R);
    if (r === 2 && n > 2) ph("sit", "First tashahhud", "At-taḥiyyātu lillāh… then stand up: Allāhu akbar", R);
    if (r === n) { ph("sit", "Final tashahhud", "At-taḥiyyātu lillāh… + Salawat Ibrahimiyya", R); ph("salam", "Salam", "As-salāmu ʿalaykum", "Done"); }
  }
  return st;
}
function openCounter() {
  const opts = [["Fajr", 2, 0], ["Dhuhr", 4, 1], ["Asr", 4, 2], ["Maghrib", 3, 3], ["Isha", 4, 4], ["Witr", 1, -1], ["Sunnah (2)", 2, -1]];
  let wake = null;
  const release = () => { try { wake && wake.release(); } catch (e) {} wake = null; };
  onSheetClose = release;
  const pick = (root) => {
    release();
    const np = nextPrayer();
    root.innerHTML = `<p class="en" style="margin-top:0">Pick the prayer. Lay the phone on the floor in front of you, where your eyes fall naturally, and tap the screen at each new position. The screen stays on.</p>
      ${opts.map(([nm, n, i]) => `<button class="opt modebtn" data-n="${n}" data-nm="${nm}" data-i="${i}"><b>${nm}</b><span class="stars got" style="letter-spacing:0">${n} rak'ah${i === np.i ? " · next" : ""}</span><small>${i >= 0 ? `${fmtT(todayTimes()[PK[i]])} today` : nm === "Witr" ? "After Isha" : "Extra prayer"}</small></button>`).join("")}`;
    root.querySelectorAll(".modebtn").forEach((b) => (b.onclick = () => run(root, Number(b.dataset.n), b.dataset.nm, Number(b.dataset.i))));
  };
  const run = async (root, n, nm, idx) => {
    try { wake = await navigator.wakeLock?.request("screen"); } catch (e) {}
    const flow = prayerFlow(n, nm); let k = 0;
    const draw = () => {
      const s = flow[k], done = k === flow.length - 1;
      root.innerHTML = `<div class="ctr" id="ctr">
        <div class="ctr-top"><span>${h(nm)}</span><span>${h(s.sub)}</span></div>
        <div class="ctr-rak">${Array.from({ length: n }, (_, r) => `<i class="${s.sub === "Done" || r < Number((s.sub.match(/\d+/) || [0])[0]) - 1 ? "done" : r === Number((s.sub.match(/\d+/) || [0])[0]) - 1 ? "on" : ""}"></i>`).join("")}</div>
        <div class="fig ctr-fig">${FIG[s.pos]}</div>
        <div class="ctr-t">${h(s.t)}</div><div class="ctr-l">${h(s.line)}</div>
        <div class="ctr-hint">${done ? "Tap to finish" : "Tap anywhere for the next position"}</div>
      </div>
      <div class="stepnav" style="margin-top:12px"><button class="btn ghost" id="cb">Back a step</button><button class="btn ghost" id="cq">Stop</button></div>`;
      $("#ctr", root).onclick = () => {
        if (!done) { k++; draw(); navigator.vibrate && navigator.vibrate(15); return; }
        release();
        if (idx >= 0) { const t = today(); const a = S.prayers[t] || [0, 0, 0, 0, 0]; a[idx] = 1; S.prayers[t] = a; save(); }
        root.innerHTML = `<div class="empty"><div class="situ">Taqabbal Allāh 🤲</div><p>${idx >= 0 ? `${h(nm)} marked as prayed for today.` : "May Allah accept it."}</p><p class="en">Then the dhikr: Astaghfirullāh ×3, SubḥānAllāh ×33, Al-ḥamdu lillāh ×33, Allāhu akbar ×33.</p><button class="btn" id="again">Another prayer</button></div>`;
        $("#again", root).onclick = () => pick(root);
      };
      $("#cb", root).onclick = () => { if (k > 0) { k--; draw(); } };
      $("#cq", root).onclick = () => pick(root);
    };
    draw();
  };
  openSheet("Rak'ah counter", `<div id="rc"></div>`, (root) => pick($("#rc", root)));
}

/* ---------- render ---------- */
const VIEWS = { today: [vToday, bindToday], salah: [vSalah], quran: [vQuran], learn: [vLearn], father: [vFather] };
function render() {
  const [v, bind] = VIEWS[tab];
  const html = v();
  const root = $("#view"); root.innerHTML = `<div class="view">${html}</div>`; bind && bind(root);
}
drawTabs(); render();
window.addEventListener("resize", () => movePill(false));
if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("sw.js").catch(() => {});
})();
