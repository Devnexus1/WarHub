// WARHUB backend — pure Node.js (no dependencies). Run: node server.js

// ╔══════════════════════════════════════════════════════════╗
// ║  شماره موبایل خودت (مالک) رو بین کوتیشن‌ها بنویس؛ مثلاً:  ║
// ║  const MY_PHONE = '09123456789';                           ║
// ╚══════════════════════════════════════════════════════════╝
const MY_PHONE = '09XXXXXXXXX';
// متنی که بعد از ثبت درخواست «افزایش موجودی» به بازیکن نشان داده می‌شود (مثلاً شماره کارت برای کارت‌به‌کارت).
// وقتی درگاه پرداخت (زرین‌پال و ...) وصل کردی، به‌جای این، در POST /api/wallet/deposit کاربر را به درگاه بفرست.
const PAY_CARD_TEXT = process.env.PAY_CARD_TEXT || '';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');
const DATA = path.join(__dirname, 'data');
const MSG_FILE = path.join(DATA, 'messages.json');

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.webp': 'image/webp', '.woff2': 'font/woff2' };
const DEPTS = ['مدیریت', 'حقوقی', 'امور دولتی'];

// ================= ROOMS (web version of the app's match rooms) =================
const BG_DIR = path.join(PUBLIC, 'uploads', 'room-bgs');
fs.mkdirSync(BG_DIR, { recursive: true });
const RES_DIR = path.join(PUBLIC, 'uploads', 'room-results');
fs.mkdirSync(RES_DIR, { recursive: true });
const MODE_LABELS = { br: 'Battle Royale', mp: 'Multiplayer', duel: 'دوئل', cr: 'Clash Royale', rt: 'رنکینگ و تورنومنت' };
console.log('[WARHUB] team registration build: exact-size rule for team-only categories ACTIVE');
const TEAM_ONLY = { rt: true }; // categories where only a whole team can register (the others allow solo or team)
const TEAM_SIZES = [1, 2, 4, 5]; // slots per row (team): solo / duo / squad / 5-stack

// ---------- helpers ----------
const readJSON = f => JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8'));
function send(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}
function readBody(req, limit = 10 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > limit) { reject({ code: 413, msg: 'حجم درخواست زیاد است' }); req.destroy(); }
      else chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString() || '{}')); }
      catch { reject({ code: 400, msg: 'JSON نامعتبر' }); }
    });
  });
}
function saveMessage(m) {
  let list = [];
  try { list = JSON.parse(fs.readFileSync(MSG_FILE, 'utf8')); } catch {}
  list.push(m);
  fs.writeFileSync(MSG_FILE, JSON.stringify(list, null, 2));
}
// in-memory rate limit: 5 messages / 10 min / IP
const hits = new Map();
function limited(ip, k = 'c', max = 5) {
  ip += k; const now = Date.now(), arr = (hits.get(ip) || []).filter(t => now - t < 600000);
  arr.push(now); hits.set(ip, arr);
  return arr.length > max;
}
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of hits) if (!v.some(t => now - t < 600000)) hits.delete(k);
}, 600000).unref();

const clean = (s, max) => String(s || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

// ================= ADMIN API (sessions, roles, audit log) =================
const D = DATA;
const rd = (f, d) => { try { return JSON.parse(fs.readFileSync(path.join(D, f), 'utf8')); } catch { return d; } };
const wr = (f, v) => fs.writeFileSync(path.join(D, f), JSON.stringify(v, null, 2));
const ALL_PERMS = ['messages', 'content', 'rooms', 'notify', 'wallet', 'ranks', 'achievements', 'users', 'audit'];
const PERMS = { owner: ALL_PERMS.slice(), editor: ['messages', 'content', 'rooms', 'notify'], support: ['messages', 'notify'] };
// effective permissions of an admin: owners always have everything; others get the per-admin list the main owner ticked (perms), or their role's defaults
const permsOf = a => a.r === 'owner' ? PERMS.owner : (Array.isArray(a.perms) ? ALL_PERMS.filter(k => a.perms.includes(k)) : PERMS[a.r]);
const SPEC = {
  reviews: { name: 's', role: 's?', text: 's', stars: 'n' } };
const stars = v => Math.min(5, Math.max(1, Math.round(+v) || 5));
const hash = p => { const s = crypto.randomBytes(16).toString('hex'); return s + ':' + crypto.scryptSync(p, s, 64).toString('hex'); };
const check = (p, h) => { const [s, k] = h.split(':'), a = crypto.scryptSync(p, s, 64), b = Buffer.from(k, 'hex'); return a.length === b.length && crypto.timingSafeEqual(a, b); };
let SECRET = process.env.SESSION_SECRET || rd('.secret.json', {}).s;
if (!SECRET) { SECRET = crypto.randomBytes(32).toString('hex'); wr('.secret.json', { s: SECRET }); }
const mac = b => crypto.createHmac('sha256', SECRET).update(b).digest('base64url');
const sign = v => { const b = Buffer.from(JSON.stringify(v)).toString('base64url'); return b + '.' + mac(b); };
const unsign = t => { const [b, s] = String(t || '').split('.'); if (!b || !s) return null; const e = mac(b);
  if (s.length !== e.length || !crypto.timingSafeEqual(Buffer.from(s), Buffer.from(e))) return null;
  try { const v = JSON.parse(Buffer.from(b, 'base64url')); return v.exp > Date.now() ? v : null; } catch { return null; } };
const log = (u, a) => { const l = rd('audit.json', []); l.push({ u, a, at: new Date().toISOString() }); wr('audit.json', l.slice(-500)); };
const setSession = (req, res, u) => res.setHeader('Set-Cookie', `wh_s=${sign({ u, exp: Date.now() + 8 * 36e5 })}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800` + (req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : ''));
const fails = new Map();

// ---- player notifications (inbox per phone). The sender is NEVER exposed to players: staff notices show as "پشتیبانی WARHUB";
// which admin sent it is only recorded in notices-sent.json + the audit log (staff-only).
const NOTIF_MAX = 100; // kept per player
const cleanML = (s, max) => String(s || '').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').trim().slice(0, max); // like clean(), but keeps line breaks
function notify(ph, title, body, kind = 'system', extra = null) {
  if (!ph) return;
  const N = rd('notifications.json', {}), arr = N[ph] || [];
  const o = { id: crypto.randomBytes(6).toString('hex'), title: clean(title, 80), body: cleanML(body, 500), kind, at: new Date().toISOString(), read: false };
  if (extra) Object.assign(o, extra); // e.g. { roomId, roomCode, roomPassword } for kind:'roomStart' — this inbox entry is private to `ph` already, so it's fine to carry them
  arr.push(o);
  N[ph] = arr.slice(-NOTIF_MAX); wr('notifications.json', N);
}

// marks a room's code/password as revealed and notifies everyone currently registered.
// shared by the manual admin "reveal" action and the auto-reveal timer below; caller still has to wr('rooms.json', L).
// ---- auto-delete schedule (starts the moment the room code/password is given to players) ----
//  • normal rooms (br / mp / duel / cr): deleted 12 hours after the code is given.
//  • ranking & tournament rooms ('rt'): the same room runs Saturday → Thursday, so it is NOT deleted when the code is given
//    on the other days; a new code is given every day Sat→Thu; only the code given on THURSDAY (Tehran time, the last one) schedules deletion 72 hours later.
const ROOM_TTL_MS = 12 * 3600 * 1000, RT_TTL_MS = 72 * 3600 * 1000;
const isThursdayTehran = (t = Date.now()) => new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tehran', weekday: 'long' }).format(new Date(t)) === 'Thursday';
function scheduleDelete(room) {
  const now = Date.now();
  room.revealedAt = new Date(now).toISOString();
  if (room.mode === 'rt') { if (isThursdayTehran(now)) room.deleteAt = new Date(now + RT_TTL_MS).toISOString(); } // Sat–Wed codes never schedule a delete (and never cancel one already set)
  else room.deleteAt = new Date(now + ROOM_TTL_MS).toISOString();
}
function revealRoom(room) {
  room.revealed = true;
  scheduleDelete(room);
  // kind:'roomStart' + the code/password riding along lets the client pop up a full-screen "room started" card
  // immediately (wherever the player is on the site), instead of making them open the room to see it.
  [...new Set(Object.values(room.slots || {}))].forEach(ph => notify(ph, 'روم شروع شد 🎮', 'روم «' + room.title + '» شروع شد؛ کد و رمز روم آماده است.', 'roomStart', { roomId: room.id, roomTitle: room.title, roomCode: room.roomCode || '', roomPassword: room.roomPassword || '' }));
}

// ---- auto-reveal timer: every 20s, reveal any room whose scheduled startAt has arrived (if it has a code/password set and isn't revealed yet) ----
setInterval(() => {
  const L = rd('rooms.json', []); const now = Date.now();
  let changed = false;
  L.forEach(room => {
    if (!room.revealed && !room.finished && room.startAt && (room.roomCode || room.roomPassword) && new Date(room.startAt).getTime() <= now) {
      revealRoom(room); changed = true;
    }
  });
  if (changed) wr('rooms.json', L);
}, 20000);

// ---- auto-delete timer: every minute, remove rooms whose deleteAt has passed (same cleanup as the admin "delete room" button) ----
setInterval(() => {
  try {
    const L = rd('rooms.json', []), now = Date.now();
    const gone = L.filter(r => r.deleteAt && new Date(r.deleteAt).getTime() <= now);
    if (!gone.length) return;
    const W = rd(WALLET_FILE, {});
    gone.forEach(room => {
      if (!room.finished && room.paid && Object.keys(room.paid).length) { // entry fees go back if the room never finished
        Object.keys(room.paid).forEach(ph => { if (refundEntry(W, room, ph, 'بازگشت ورودی روم حذف‌شده')) notify(ph, 'روم حذف شد', 'روم «' + room.title + '» حذف شد و ورودی‌ات به کیف پول برگشت.'); });
      }
      removeBgImage(room.bg); removeResultImage(room.resultImage);
      log('system', 'auto-delete room ' + room.title);
    });
    wr(WALLET_FILE, W);
    wr('rooms.json', L.filter(r => !gone.includes(r)));
  } catch (e) { console.error('auto-delete rooms failed:', e.message); }
}, 60000).unref();

// ================= WALLET (کیف پول) =================
// هر حرکت پولی خودکار در لیست تراکنش‌های خود بازیکن ثبت می‌شود (واریز، برداشت، ورودی روم، بازگشت وجه، جایزه، تعدیل ادمین).
// موجودی دو بخش دارد: dep = پولی که خود بازیکن واریز کرده (قابل خرج کردن در روم) و won = جایزه‌ها (قابل خرج و قابل برداشت).
const WALLET_FILE = 'wallets.json', WALLET_MIN_DEPOSIT = 10000, WALLET_MIN_WITHDRAW = 10000, WALLET_MAX = 100000000;
const walletOf = (W, ph) => W[ph] || (W[ph] = { dep: 0, won: 0, txs: [] });
function newTxId(W) {
  const used = new Set(); Object.values(W).forEach(w => (w.txs || []).forEach(t => used.add(t.id)));
  for (let i = 0; i < 50; i++) { const id = String(crypto.randomInt(100000, 1000000)); if (!used.has(id)) return id; }
  return String(Date.now()).slice(-9);
}
function addTx(W, ph, o) {
  const w = walletOf(W, ph), t = Object.assign({ id: newTxId(W), status: 'done', at: new Date().toISOString() }, o);
  w.txs.push(t);
  while (w.txs.length > 400) { const i = w.txs.findIndex(x => x.status !== 'pending'); if (i < 0) break; w.txs.splice(i, 1); }
  return t;
}
function spendFrom(w, amt) { const d = Math.min(w.dep, amt); w.dep -= d; w.won -= amt - d; return { dep: d, won: amt - d }; } // deposits are spent first
function refundEntry(W, room, ph, label) { // gives back what this player paid to enter `room` (to the same buckets it came from)
  const pd = room.paid && room.paid[ph]; if (!pd) return false;
  const w = walletOf(W, ph); w.dep += pd.dep; w.won += pd.won; delete room.paid[ph];
  addTx(W, ph, { type: 'refund', dir: 'in', amount: pd.amt, label: label + ' «' + room.title + '»', roomId: room.id });
  return true;
}
function walletView(ph) {
  const W = rd(WALLET_FILE, {}), w = W[ph] || { dep: 0, won: 0, txs: [] }, pl = getPlayer(ph, false) || {};
  return { ok: true, balance: w.dep + w.won, withdrawable: w.won, card: pl.card || '', minDeposit: WALLET_MIN_DEPOSIT, minWithdraw: WALLET_MIN_WITHDRAW,
    txs: w.txs.slice().reverse().slice(0, 100).map(({ id, type, dir, amount, status, label, at }) => ({ id, type, dir, amount, status, label, at })) };
}
const money = n => (+n).toLocaleString('fa-IR');

// ---- player (phone) session — web stand-in for the app's SMS login; no code is actually sent (same as the app's test mode) ----
const PLAYER_MAX_AGE = 180 * 86400; // 180 days
const normPhone = v => { let d = String(v || '').replace(/[۰-۹]/g, c => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c))).replace(/\D/g, '');
  if (d.startsWith('98') && d.length === 12) d = '0' + d.slice(2); else if (d.length === 10 && d.startsWith('9')) d = '0' + d; return d; };
const isValidPhone = p => /^09\d{9}$/.test(p);
function getCookie(req, name) { const c = (req.headers.cookie || '').split(/;\s*/).find(x => x.startsWith(name + '=')); return c && c.slice(name.length + 1); }
function getPlayerPhone(req) { const v = unsign(getCookie(req, 'wh_u')); return v && v.ph ? v.ph : null; }
const setPlayerSession = (req, res, ph) => res.setHeader('Set-Cookie', `wh_u=${sign({ ph, exp: Date.now() + PLAYER_MAX_AGE * 1000 })}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${PLAYER_MAX_AGE}` + (req.headers['x-forwarded-proto'] === 'https' ? '; Secure' : ''));
const clearPlayerSession = () => `wh_u=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`;
const OWNER_PHONE = normPhone(process.env.OWNER_PHONE || MY_PHONE);
// First-run protection: creating the owner account needs a one-time setup code (so nobody else can claim it first)
const CODE_FILE = path.join(D, 'setup-code.txt');
function setupCode() {
  if (process.env.SETUP_KEY) return String(process.env.SETUP_KEY);
  try { const c = fs.readFileSync(CODE_FILE, 'utf8').trim(); if (c) return c; } catch {}
  const c = crypto.randomBytes(5).toString('hex'); fs.writeFileSync(CODE_FILE, c); return c;
}
if (isValidPhone(OWNER_PHONE) && !rd('admins.json', []).some(x => x.ph === OWNER_PHONE)) console.log('\n[WARHUB] Owner phone ' + OWNER_PHONE + ' not activated yet. Activation code: ' + setupCode() + '\n');
if (!rd('admins.json', []).length) console.log('\n[WARHUB] No admin yet. Setup code: ' + setupCode() + '  (also saved in data/setup-code.txt)\n');
const num = v => Math.max(0, Math.min(1e9, Math.round(+v) || 0));

// ---- rooms helpers ----
const highestFilledSlot = r => Math.max(-1, ...Object.keys(r.slots || {}).map(Number)) + 1;
function saveBgImage(id, dataUri) {
  const m = /^data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUri || ''));
  if (!m) return null;
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 1.5 * 1024 * 1024) return null; // 1.5MB cap
  const file = `room_${id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
  fs.writeFileSync(path.join(BG_DIR, file), buf);
  return '/uploads/room-bgs/' + file;
}
function saveResultImage(id, dataUri) { // screenshot of the match result, attached when the admin closes a room
  const m = /^data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUri || ''));
  if (!m) return null;
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 2 * 1024 * 1024) return null;
  const file = `res_${id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
  fs.writeFileSync(path.join(RES_DIR, file), buf);
  return '/uploads/room-results/' + file;
}
function removeResultImage(url) {
  if (!url || !String(url).startsWith('/uploads/room-results/')) return;
  try { fs.unlinkSync(path.join(PUBLIC, url)); } catch {}
}
function removeBgImage(url) {
  if (!url || !String(url).startsWith('/uploads/room-bgs/')) return;
  try { fs.unlinkSync(path.join(PUBLIC, url)); } catch {}
}
// validates/cleans room input coming from the admin editor; `existing` (when editing) enforces max >= filled slots
function sanitizeRoomInput(b, existing) {
  const title = clean(b.title, 60);
  if (!title) return { error: 'عنوان روم را وارد کنید.' };
  const mode = MODE_LABELS[b.mode] ? b.mode : 'br';
  const max = Math.max(0, Math.min(500, Math.round(+b.max) || 0));
  if (max < 2) return { error: 'تعداد اسلات باید حداقل ۲ باشد.' };
  if (existing) { const used = highestFilledSlot(existing); if (max < used) return { error: `جایگاه شماره ${used} پر شده؛ اسلات نمی‌تواند کمتر از ${used} باشد.` }; }
  const prizeType = b.prizeType === 'perKill' ? 'perKill' : 'fixed';
  if (prizeType === 'perKill' && !num(b.perKill)) return { error: 'مبلغ هر کیل را وارد کنید.' };
  const teamSize = TEAM_SIZES.includes(+b.teamSize) ? +b.teamSize : 4;
  if (max % teamSize) return { error: `ظرفیت باید مضرب تعداد اسلات هر ردیف (${teamSize}) باشد.` };
  if (TEAM_ONLY[mode] && (teamSize < 2 || teamSize > TEAM_MAX)) return { error: 'در دسته‌ی «' + MODE_LABELS[mode] + '» ثبت‌نام فقط تیمی است و اندازه‌ی تیم باید بین ۲ تا ' + TEAM_MAX + ' نفر باشد؛ اسلات هر ردیف را در همین بازه بگذار.' };
  let startAt = null; // precise schedule used by the auto-reveal timer below; the free-text `time` field above stays just for display
  if (b.startAt) { const d = new Date(b.startAt); if (!isNaN(d.getTime())) startAt = d.toISOString(); }
  return {
    title, mode, modeLabel: MODE_LABELS[mode],
    color: /^#[0-9a-fA-F]{6}$/.test(b.color || '') ? b.color : '#E10E0E',
    fee: num(b.fee), prizeType, prize: prizeType === 'fixed' ? num(b.prize) : 0, perKill: prizeType === 'perKill' ? num(b.perKill) : 0,
    max, time: clean(b.time, 40) || 'به‌زودی', open: !!b.open, teamSize, desc: clean(b.desc, 600),
    roomCode: clean(b.roomCode, 40), roomPassword: clean(b.roomPassword, 40), // set by admin; only shown to registered players after reveal (see /reveal)
    startAt,
  };
}
// shape sent to everyone: never expose other players' phone numbers, only whether a slot is filled and whether it's "me"
function publicRoom(r, myPhone) {
  const slots = {}, PL = rd('players.json', {});
  Object.keys(r.slots || {}).forEach(i => { const p = r.slots[i]; slots[i] = { mine: p === myPhone, last4: String(p).replace(/\D/g, '').slice(-4), name: (PL[p] && PL[p].name) || '' }; });
  const { id, title, mode, modeLabel, color, fee, max, time, open, prizeType, prize, perKill, teamSize, desc, bg, finished } = r;
  const teams = {}; // team registrations: row index -> { name, mine, leader } (a whole row is reserved for the team)
  Object.keys(r.teams || {}).forEach(row => { const t = r.teams[row]; teams[row] = { name: 'تیم ' + ((PL[t.leader] && PL[t.leader].name) || ''), mine: t.members.includes(myPhone), leader: t.leader === myPhone }; });
  const out = { id, title, mode, modeLabel, color, fee, max, time, open, prizeType, prize, perKill, teamSize, desc, bg, finished, teams, teamOnly: !!TEAM_ONLY[mode], slots, count: Object.keys(r.slots || {}).length, resultImage: finished ? (r.resultImage || null) : null };
  // room code/password: only ever sent to a phone that actually holds a slot in THIS room, and only once the admin has revealed it.
  // `codeRevealed` goes out regardless, so the client can show a "will be announced" state before the player is even registered.
  out.codeRevealed = !!r.revealed;
  out.startAt = r.startAt || null; // used by the client to show a countdown; not sensitive
  const registered = !!myPhone && Object.values(r.slots || {}).includes(myPhone);
  if (r.revealed && registered) { out.roomCode = r.roomCode || ''; out.roomPassword = r.roomPassword || ''; }
  if (finished && myPhone) {
    out.won = r.results ? (r.prizeType === 'perKill' ? ((r.results.kills || {})[myPhone] || 0) * (r.perKill || 0) : (r.results.winner === myPhone ? (r.prize || 0) : 0)) : 0;
  }
  return out;
}

// ---- player profiles ----
function getPlayer(ph, create) {
  const L = rd('players.json', {});
  if (!L[ph] && create) { L[ph] = { name: '', coins: 0, at: new Date().toISOString() }; wr('players.json', L); }
  return L[ph];
}
const digitsOf = v => String(v == null ? '' : v).replace(/[۰-۹]/g, c => '۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/\D/g, '');
function loadPlayers() { // returns players.json and makes sure every player has a short public id (also used as invite code)
  const L = rd('players.json', {}); let max = Math.max(1000, ...Object.values(L).map(x => +x.inv || 0)), ch = false;
  Object.keys(L).forEach(k => { if (!L[k].inv) { L[k].inv = String(++max); ch = true; } });
  if (ch) wr('players.json', L);
  return L;
}
function ensureInvite(ph) { const L = loadPlayers(); return (L[ph] && L[ph].inv) || ''; }
// [wins needed, rank] — edit the numbers to make ranks easier/harder to reach
const RANKS = [
  [0, 'Elite I'], [2, 'Elite II'], [4, 'Elite III'], [6, 'Elite IV'], [8, 'Elite V'],
  [10, 'Pro I'], [13, 'Pro II'], [16, 'Pro III'], [19, 'Pro IV'], [22, 'Pro V'],
  [25, 'Master I'], [30, 'Master II'], [35, 'Master III'], [40, 'Master IV'], [45, 'Master V'],
  [50, 'Grand Master I'], [60, 'Grand Master II'], [70, 'Grand Master III'], [80, 'Grand Master IV'], [90, 'Grand Master V'],
  [100, 'Legendary']];
const rankIdx = (wins, pl) => { let ri = 0; RANKS.forEach((x, i) => { if (wins >= x[0]) ri = i; }); return Math.max(ri, Math.min(RANKS.length - 1, Math.max(0, (pl && pl.rankGrant) | 0))); }; // a rank given by staff (rankGrant) is a floor: the player never shows lower than it
const rankName = (wins, pl) => RANKS[rankIdx(wins, pl)][1];
const nameOf = (ph, PL) => (PL[ph] && PL[ph].name) || ('بازیکن ····' + String(ph).slice(-4));
// per-player results, computed live from rooms + payouts: a "win" is a fixed-prize room you won, or any finished room where a payout was recorded for you
function statsAll() {
  const st = {}, pays = rd('payouts.json', []), get = ph => st[ph] || (st[ph] = { joined: 0, played: 0, wins: 0, earned: 0 });
  rd('rooms.json', []).forEach(r => {
    new Set(Object.values(r.slots || {})).forEach(ph => {
      const s2 = get(ph); s2.joined++;
      if (!r.finished) return;
      s2.played++;
      const paid = pays.some(p => p.roomId === r.id && p.phone === ph);
      if (paid || (r.prizeType !== 'perKill' && r.results && r.results.winner === ph)) s2.wins++;
    });
  });
  pays.forEach(p => { get(p.phone).earned += p.amount; });
  return st;
}

// ================= REWARDS (هدیه دستاوردها و دعوت) =================
// هر دستاورد فقط یک‌بار برای هر بازیکن پرداخت می‌شود و مبلغ به کیف پولش اضافه می‌شود (ثبت در rewards.json).
const REWARDS_FILE = 'rewards.json';
const ACH = [
  { key: 'first_win', icon: '🥇', title: 'اولین برد', reward: 20000, done: s => s.wins >= 1 },
  { key: 'custom10', icon: '🎮', title: '۱۰ کاستوم', reward: 30000, done: s => s.joined >= 10 },
  { key: 'wins10', icon: '🔥', title: '۱۰ برد', reward: 50000, done: s => s.wins >= 10 },
  { key: 'winrate70', icon: '👑', title: 'بالای ۷۰٪', reward: 200000, done: s => s.played >= WINRATE_MIN_GAMES && s.wins * 100 / s.played >= 70 }
];
const WINRATE_MIN_GAMES = 10;   // حداقل روم‌های تمام‌شده برای دستاورد وین‌ریت (جلوگیری از «۱ برد از ۱ بازی = ۱۰۰٪»)
const ACH_BUCKET = 'won';       // 'won' = قابل برداشت | 'dep' = فقط قابل خرج در روم‌ها
const REF_REWARD = 2000;        // هدیه‌ی دعوت به‌ازای هر دوستی که با کد معرف ثبت‌نام کند
const REF_BUCKET = 'dep';       // چون ورود بدون پیامک است، هدیه‌ی دعوت فقط قابل خرج در روم‌هاست؛ برای قابل برداشت شدن 'won' بگذار
const REWARD_BACKFILL = false;  // false: فقط دستاوردهای از این به بعد پاداش دارند؛ true: بازیکن‌هایی که قبلاً به دستاوردی رسیده‌اند هم یک‌بار پاداش می‌گیرند (قبل از اولین اجرا تنظیم کن)
function giftTo(ph, amount, label, bucket) {
  const W = rd(WALLET_FILE, {}), w = walletOf(W, ph);
  w[bucket] += amount;
  addTx(W, ph, { type: 'gift', dir: 'in', amount, label });
  wr(WALLET_FILE, W);
}
function grantAch(ph, STall) { // pays every newly reached achievement exactly once
  if (!ph) return;
  const s = (STall || statsAll())[ph]; if (!s) return;
  const R = rd(REWARDS_FILE, {}), me = R[ph] || { ach: [] };
  const fresh = ACH.filter(a => !me.ach.includes(a.key) && a.done(s));
  if (!fresh.length) return;
  const W = rd(WALLET_FILE, {}), w = walletOf(W, ph);
  fresh.forEach(a => { me.ach.push(a.key); w[ACH_BUCKET] += a.reward; addTx(W, ph, { type: 'gift', dir: 'in', amount: a.reward, label: 'هدیه دستاورد «' + a.title + '»' }); });
  R[ph] = me; wr(WALLET_FILE, W); wr(REWARDS_FILE, R);
  fresh.forEach(a => notify(ph, 'دستاورد جدید 🎉', 'دستاورد «' + a.title + '» را گرفتی و ' + a.reward.toLocaleString('fa-IR') + ' تومان هدیه به کیف پولت اضافه شد.'));
}
if (!REWARD_BACKFILL && !fs.existsSync(path.join(DATA, REWARDS_FILE))) { // first run: mark what players already reached as "paid" without paying
  const ST0 = statsAll(), R0 = {};
  Object.keys(ST0).forEach(ph => { R0[ph] = { ach: ACH.filter(a => a.done(ST0[ph])).map(a => a.key) }; });
  wr(REWARDS_FILE, R0);
}
function leaderboard() {
  const PL = loadPlayers(), ST = statsAll();
  return Object.keys(ST).filter(ph => PL[ph] && PL[ph].name && ST[ph].played > 0)
    .map(ph => ({ id: PL[ph].inv, name: PL[ph].name, wins: ST[ph].wins, played: ST[ph].played, winRate: Math.round(ST[ph].wins / ST[ph].played * 100), earned: ST[ph].earned, rank: rankName(ST[ph].wins, PL[ph]) }))
    .sort((a, b) => b.wins - a.wins || b.winRate - a.winRate || b.played - a.played || a.name.localeCompare(b.name)).slice(0, 50);
}
const TEAM_MAX = 4;
function teamView(ph) {
  const PL = loadPlayers(), T = rd('teams.json', []), nm = p => nameOf(p, PL), pid = p => (PL[p] && PL[p].inv) || '';
  const mine = T.find(t => t.members.includes(ph)), out = { max: TEAM_MAX, team: null, invites: [] };
  if (mine) {
    out.team = { id: mine.id, name: 'تیم ' + nm(mine.leader), isLeader: mine.leader === ph,
      members: mine.members.map(p => ({ id: pid(p), name: nm(p), leader: p === mine.leader, me: p === ph })),
      pending: mine.leader === ph ? (mine.invites || []).map(p => ({ id: pid(p), name: nm(p) })) : [] };
  } else out.invites = T.filter(t => (t.invites || []).includes(ph)).map(t => ({ id: t.id, name: 'تیم ' + nm(t.leader), from: nm(t.leader), count: t.members.length }));
  return out;
}
function profileOf(ph) {
  const pl = getPlayer(ph, true) || {};
  const ST = statsAll()[ph] || { joined: 0, played: 0, wins: 0 }, played = ST.joined, wins = ST.wins;
  const ri = rankIdx(wins, pl);
  const cur = RANKS[ri], next = RANKS[ri + 1] || null;
  const a = rd('admins.json', []).find(x => x.ph === ph);
  const staff = a ? { role: a.r, pending: !!a.pending } : (ph === OWNER_PHONE ? { role: 'owner', pending: true } : null);
  const PLA = rd('players.json', {});
  return { phone: ph, name: pl.name || '', card: pl.card || '', invite: ensureInvite(ph), invited: Object.values(PLA).filter(x => x.invitedBy === ph).length, nameEditsLeft: Math.max(0, 2 - (pl.nameEdits || 0)), coins: pl.coins || 0, played, wins, winRate: ST.played ? Math.round(wins / ST.played * 100) : 0,
    achievements: (() => { const R = rd(REWARDS_FILE, {}), got = (R[ph] && R[ph].ach) || [], S = statsAll()[ph] || { joined: 0, played: 0, wins: 0 };
      return ACH.map(a => ({ icon: a.icon, title: a.title, reward: a.reward, done: got.includes(a.key) || a.done(S) })).concat([{ icon: '🤝', title: 'دعوت‌کننده', reward: REF_REWARD, each: true, done: Object.values(PLA).some(x => x.invitedBy === ph) }]); })(),
    rank: cur[1], nextRank: next ? next[1] : null, progress: next ? Math.max(0, Math.min(100, Math.round((wins - cur[0]) / (next[0] - cur[0]) * 100))) : 100, staff };
}

// admin view of a room: adds the display names players chose in their panel (phone -> name)
function withNames(r) {
  const PL = rd('players.json', {}), names = {};
  Object.values(r.slots || {}).forEach(ph => { names[ph] = (PL[ph] && PL[ph].name) || ''; });
  return Object.assign({}, r, { names });
}

async function adminApi(req, res, url) {
  const p = url.pathname.slice(11), m = req.method, ip = req.socket.remoteAddress, bad = (e, c = 400) => send(res, c, { ok: false, error: e });
  if (m !== 'GET' && req.headers['x-requested-with'] !== 'wh') return bad('forbidden', 403); // CSRF guard
  if (m === 'POST' && p === 'login') {
    const f = (fails.get(ip) || []).filter(t => Date.now() - t < 600000);
    if (f.length >= 5) return bad('تلاش بیش از حد؛ ۱۰ دقیقه بعد دوباره امتحان کنید.', 429);
    const b = await readBody(req), u = rd('admins.json', []).find(x => x.u === clean(b.u, 40));
    if (!u || u.pending || !check(String(b.p || ''), u.h)) { f.push(Date.now()); fails.set(ip, f); return bad('نام کاربری یا رمز اشتباه است.', 401); }
    fails.delete(ip); log(u.u, 'login');
    setSession(req, res, u.u);
    return send(res, 200, { ok: true });
  }
  if (p === 'setup') { // first run: create the owner account from the browser (only while no admin exists)
    const L = rd('admins.json', []);
    if (m === 'GET') return send(res, 200, { needed: !L.length });
    if (m === 'POST') {
      if (L.length) return bad('حساب مدیر قبلاً ساخته شده است.', 403);
      const f = (fails.get(ip) || []).filter(t => Date.now() - t < 600000);
      if (f.length >= 5) return bad('تلاش بیش از حد؛ ۱۰ دقیقه بعد دوباره امتحان کنید.', 429);
      const b = await readBody(req), u = clean(b.u, 30), want = Buffer.from(setupCode()), got = Buffer.from(String(b.k || '').trim());
      if (want.length !== got.length || !crypto.timingSafeEqual(want, got)) { f.push(Date.now()); fails.set(ip, f); return bad('کد راه‌اندازی اشتباه است.', 403); }
      if (!/^[\w.-]{3,30}$/.test(u) || String(b.p || '').length < 8) return bad('نام کاربری (۳ تا ۳۰ حرف انگلیسی) و رمز (حداقل ۸ کاراکتر) لازم است.');
      wr('admins.json', [{ u, h: hash(b.p), r: 'owner', at: new Date().toISOString() }]); log(u, 'owner account created');
      try { fs.unlinkSync(CODE_FILE); } catch {}
      setSession(req, res, u); return send(res, 200, { ok: true });
    }
  }
  if (m === 'POST' && p === 'logout') { res.setHeader('Set-Cookie', 'wh_s=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0'); return send(res, 200, { ok: true }); }
  // ---- staff access by phone number: you must be logged in as a player with that number AND know a second secret
  // (invite code on first entry, then your own password). The second secret is needed because phone login has no SMS yet.
  if (p === 'phone-status' && m === 'GET') {
    const ph = getPlayerPhone(req); if (!ph) return send(res, 200, { phone: null });
    const a = rd('admins.json', []).find(x => x.ph === ph);
    if (a) return send(res, 200, { phone: ph, staff: true, pending: !!a.pending, role: a.r });
    if (ph === OWNER_PHONE && !rd('admins.json', []).some(x => x.r === 'owner')) return send(res, 200, { phone: ph, staff: true, pending: true, role: 'owner', owner: true }); // only before any owner exists: otherwise the activation prompt would show on every visit
    return send(res, 200, { phone: ph, staff: false });
  }
  if (m === 'POST' && (p === 'phone-login' || p === 'phone-activate')) {
    const ph = getPlayerPhone(req); if (!ph) return bad('اول در سایت با شماره‌ات وارد شو.', 401);
    const f = (fails.get(ip) || []).filter(t => Date.now() - t < 600000);
    if (f.length >= 5) return bad('تلاش بیش از حد؛ ۱۰ دقیقه بعد دوباره امتحان کنید.', 429);
    const b = await readBody(req), L = rd('admins.json', []); let a = L.find(x => x.ph === ph);
    const fail = msg => { f.push(Date.now()); fails.set(ip, f); return bad(msg, 403); };
    if (p === 'phone-login') {
      if (!a || a.pending || !check(String(b.p || ''), a.h)) return fail('رمز اشتباه است یا دسترسی ندارید.');
    } else {
      const np = String(b.np || ''); if (np.length < 8) return bad('رمز جدید باید حداقل ۸ کاراکتر باشد.');
      if (a) { if (!a.pending || !check(String(b.code || '').trim(), a.h)) return fail('کد دعوت اشتباه است.'); a.h = hash(np); delete a.pending; }
      else if (ph === OWNER_PHONE && L.some(x => x.r === 'owner')) return bad('حساب مدیر از قبل ساخته شده؛ با نام کاربری و رمز وارد شو.', 403);
      else if (ph === OWNER_PHONE) {
        const want = Buffer.from(setupCode()), got = Buffer.from(String(b.code || '').trim());
        if (want.length !== got.length || !crypto.timingSafeEqual(want, got)) return fail('کد فعال‌سازی اشتباه است.');
        a = { u: ph, ph, h: hash(np), r: 'owner', at: new Date().toISOString() }; L.push(a);
        try { fs.unlinkSync(CODE_FILE); } catch {}
      } else return fail('شما دسترسی مدیریتی ندارید.');
      wr('admins.json', L); log(a.u, 'staff access activated (phone)');
    }
    fails.delete(ip); log(a.u, 'login (phone)'); setSession(req, res, a.u); return send(res, 200, { ok: true });
  }
  const ck = (req.headers.cookie || '').split(/;\s*/).find(c => c.startsWith('wh_s=')), s = unsign(ck && ck.slice(5));
  const me = s && rd('admins.json', []).find(x => x.u === s.u && !x.pending); // re-checked every request: deleted users lose access instantly
  if (!me) return bad('unauthorized', 401);
  const first = rd('admins.json', [])[0], isPrimary = !!(first && first.u === me.u && first.r === 'owner'); // the original owner (first account created)
  const can = k => permsOf(me).includes(k) && (k !== 'audit' || isPrimary || me.r !== 'owner'), // the activity log is for the main owner, or for an admin the main owner explicitly ticked it for
     deny = () => bad('دسترسی ندارید.', 403);

  if (m === 'GET' && p === 'me') return send(res, 200, { u: me.u, r: me.r, perms: permsOf(me).filter(can), primary: isPrimary });
  if (m === 'POST' && p === 'password') {
    const b = await readBody(req);
    if (!check(String(b.old || ''), me.h) || String(b.new || '').length < 8) return bad('رمز فعلی اشتباه است یا رمز جدید کمتر از ۸ کاراکتر است.');
    const L = rd('admins.json', []); L.find(x => x.u === me.u).h = hash(b.new); wr('admins.json', L); log(me.u, 'change password');
    return send(res, 200, { ok: true });
  }
  if (m === 'POST' && p === 'username') { // change your own admin username (current password required)
    const b = await readBody(req), nu = clean(b.u, 30), L = rd('admins.json', []);
    if (!check(String(b.p || ''), me.h)) return bad('رمز فعلی اشتباه است.');
    if (!/^[\w.-]{3,30}$/.test(nu)) return bad('نام کاربری باید ۳ تا ۳۰ حرف انگلیسی/عدد (می‌تواند شامل . _ - باشد) باشد.');
    if (nu === me.u) return bad('نام کاربری جدید با نام فعلی یکی است.');
    if (L.some(x => x.u === nu)) return bad('این نام کاربری قبلاً استفاده شده است.');
    L.find(x => x.u === me.u).u = nu; wr('admins.json', L); log(nu, 'change username (from ' + me.u + ')');
    setSession(req, res, nu); // the session cookie carries the username, so reissue it
    return send(res, 200, { ok: true, u: nu });
  }
  if (m === 'GET' && p === 'stats') {
    const L = rd('messages.json', []), by = {}; L.forEach(x => by[x.dept] = (by[x.dept] || 0) + 1);
    const rooms = can('rooms') ? rd('rooms.json', []) : [];
    return send(res, 200, { messages: can('messages') ? { total: L.length, new: L.filter(x => !x.status || x.status === 'new').length, by } : null,
      counts: { players: can('users') ? Object.keys(rd('players.json', {})).length : 0, reviews: rd('reviews.json', []).length, pending: can('content') ? rd('pending-reviews.json', []).length : 0,
        rooms: can('rooms') ? rooms.length : 0, roomsOpen: can('rooms') ? rooms.filter(r => r.open && !r.finished).length : 0,
        walletPending: can('wallet') ? Object.values(rd(WALLET_FILE, {})).reduce((n, w) => n + (w.txs || []).filter(t => t.status === 'pending').length, 0) : 0 },
      admins: rd('admins.json', []).length });
  }
  if (p.startsWith('messages')) {
    if (!can('messages')) return deny();
    const L = rd('messages.json', []), id = p.split('/')[1];
    if (m === 'GET') return send(res, 200, L.map(x => ({ status: 'new', ...x })).reverse());
    const i = L.findIndex(x => x.id === id); if (i < 0) return bad('not found', 404);
    if (m === 'PATCH') { const b = await readBody(req); if (!['new', 'read', 'archived'].includes(b.status)) return bad('bad status'); L[i].status = b.status; }
    else if (m === 'DELETE') { L.splice(i, 1); log(me.u, 'delete message ' + id); } else return bad('method', 405);
    wr('messages.json', L); return send(res, 200, { ok: true });
  }
  if (p.startsWith('reviews/pending')) { // moderation queue
    if (!can('content')) return deny();
    const [, , id, act] = p.split('/'), Q = rd('pending-reviews.json', []);
    if (m === 'GET') return send(res, 200, Q.slice().reverse());
    const i = Q.findIndex(x => x.id === id); if (i < 0) return bad('not found', 404);
    const it = Q[i];
    if (m === 'POST' && act === 'approve') {
      const R = rd('reviews.json', []); R.push({ name: it.name, role: it.role, text: it.text, stars: it.stars }); wr('reviews.json', R);
      log(me.u, 'approve review by ' + it.name);
    } else if (m === 'DELETE') log(me.u, 'reject review by ' + it.name); else return bad('method', 405);
    Q.splice(i, 1); wr('pending-reviews.json', Q); return send(res, 200, { ok: true });
  }
  if (p.startsWith('content/')) {
    if (!can('content')) return deny();
    const n = p.slice(8), sp = SPEC[n]; if (!sp) return bad('not found', 404);
    if (m === 'GET') return send(res, 200, rd(n + '.json', []));
    if (m === 'PUT') {
      const b = await readBody(req, 200 * 1024);
      if (!Array.isArray(b.items) || b.items.length > 200) return bad('داده نامعتبر است.');
      const out = b.items.map(it => { const o = {}; for (const [k, t] of Object.entries(sp)) {
        if (t === 'n') o[k] = num(it[k]); else if (t === 's?') { const v = clean(it[k], 30); if (v) o[k] = v; } else o[k] = clean(it[k], k === 'text' || k === 'a' ? 600 : 80); } return o; });
      if (out.some(o => Object.entries(sp).some(([k, t]) => t === 's' && !o[k]))) return bad('همهٔ فیلدهای اجباری باید پر باشند.');
      if (sp.stars) out.forEach(o => o.stars = stars(o.stars));
      wr(n + '.json', out); log(me.u, 'edit ' + n + ' (' + out.length + ')'); return send(res, 200, { ok: true });
    }
  }
  if (p === 'payouts' || p.startsWith('payouts/')) { // record a payout; players see it live under "آخرین واریزی‌ها"
    if (!can('rooms')) return deny();
    const P = rd('payouts.json', []), PL = rd('players.json', {});
    if (m === 'GET') return send(res, 200, P.slice(-200).reverse().map(x => Object.assign({}, x, { name: nameOf(x.phone, PL) })));
    if (m === 'POST') {
      const b = await readBody(req), room = rd('rooms.json', []).find(r => r.id === +b.roomId), phone = normPhone(b.phone), amount = num(b.amount);
      if (!room || !Object.values(room.slots || {}).includes(phone)) return bad('این بازیکن در این روم ثبت‌نام نکرده است.');
      if (amount < 1) return bad('مبلغ را به تومان وارد کنید.');
      const x = { id: 'p' + Date.now().toString(36) + crypto.randomBytes(2).toString('hex'), roomId: room.id, roomTitle: room.title, phone, amount, at: new Date().toISOString(), by: me.u };
      const toWallet = b.method === 'wallet'; // 'wallet' = add to the player's wallet (withdrawable); anything else = already paid to their bank by you
      if (toWallet) {
        const W = rd(WALLET_FILE, {}), t = addTx(W, phone, { type: 'prize', dir: 'in', amount, label: 'جایزه روم «' + room.title + '»', roomId: room.id });
        walletOf(W, phone).won += amount; wr(WALLET_FILE, W); x.method = 'wallet'; x.walletTx = t.id;
      }
      notify(phone, 'واریزی ثبت شد 💰', 'مبلغ ' + amount.toLocaleString('fa-IR') + ' تومان بابت روم «' + room.title + (toWallet ? '» به کیف پولت اضافه شد.' : '» برای تو ثبت شد.')); P.push(x); wr('payouts.json', P); grantAch(phone); log(me.u, 'payout ' + amount + ' to ' + nameOf(phone, PL) + ' (' + room.title + ')' + (toWallet ? ' [wallet]' : ''));
      return send(res, 200, { ok: true, payout: Object.assign({}, x, { name: nameOf(phone, PL) }) });
    }
    if (m === 'DELETE') {
      const id = p.split('/')[1];
      const py = P.find(y => y.id === id);
      if (!py) return bad('not found', 404);
      if (py.walletTx) return bad('این واریز به کیف پول بازیکن اضافه شده؛ برای اصلاح، از تب «کیف پول» یک تعدیل ثبت کن.');
      wr('payouts.json', P.filter(y => y.id !== id)); log(me.u, 'delete payout ' + id); return send(res, 200, { ok: true });
    }
  }
  if (p.startsWith('rooms')) {
    if (!can('rooms')) return deny();
    const parts = p.split('/'); // rooms | rooms/<id> | rooms/<id>/<action>
    const L = rd('rooms.json', []);
    if (m === 'GET' && parts.length === 1) return send(res, 200, L.slice().sort((a, b) => b.id - a.id).map(withNames));
    if (m === 'POST' && parts.length === 1) {
      const b = await readBody(req, 3 * 1024 * 1024);
      const data = sanitizeRoomInput(b);
      if (data.error) return bad(data.error);
      const id = Date.now();
      const bg = b.bgData ? saveBgImage(id, b.bgData) : null;
      const room = { id, slots: {}, finished: false, results: null, revealed: false, ...data, bg };
      L.unshift(room); wr('rooms.json', L); log(me.u, 'create room ' + room.title);
      return send(res, 201, { ok: true, room: withNames(room) });
    }
    const id = Number(parts[1]), idx = L.findIndex(x => x.id === id);
    if (idx < 0) return bad('روم یافت نشد', 404);
    const room = L[idx];
    if (m === 'PATCH' && parts.length === 2) {
      const b = await readBody(req, 3 * 1024 * 1024);
      const data = sanitizeRoomInput(b, room);
      if (data.error) return bad(data.error);
      let bg = room.bg;
      if (b.bgData === null) { removeBgImage(bg); bg = null; }
      else if (b.bgData) { removeBgImage(bg); bg = saveBgImage(room.id, b.bgData); }
      Object.assign(room, data, { bg });
      wr('rooms.json', L); log(me.u, 'edit room ' + room.title);
      return send(res, 200, { ok: true, room: withNames(room) });
    }
    if (m === 'DELETE' && parts.length === 2) {
      if (!room.finished && room.paid && Object.keys(room.paid).length) { // everybody who paid to enter gets the fee back
        const W = rd(WALLET_FILE, {});
        Object.keys(room.paid).forEach(ph => { if (refundEntry(W, room, ph, 'بازگشت ورودی روم حذف‌شده')) notify(ph, 'روم حذف شد', 'روم «' + room.title + '» حذف شد و ورودی‌ات به کیف پول برگشت.'); });
        wr(WALLET_FILE, W);
      }
      L.splice(idx, 1); wr('rooms.json', L); removeBgImage(room.bg); removeResultImage(room.resultImage); log(me.u, 'delete room ' + room.title);
      return send(res, 200, { ok: true });
    }
    if (m === 'POST' && parts[2] === 'finish') {
      const b = await readBody(req, 3 * 1024 * 1024);
      let results;
      if (room.prizeType === 'perKill') {
        const kills = {}; Object.values(room.slots || {}).forEach(ph => { kills[ph] = num((b.kills || {})[ph]); });
        results = { kills };
      } else {
        const w = b.winner || null;
        if (w && !Object.values(room.slots || {}).includes(w)) return bad('برنده نامعتبر است.');
        results = { winner: w };
      }
      if (b.imageData) { // optional result screenshot; replaces an older one
        const img = saveResultImage(room.id, b.imageData);
        if (!img) return bad('عکس نتیجه نامعتبر است یا حجمش بیشتر از ۲ مگابایت است.');
        removeResultImage(room.resultImage); room.resultImage = img;
      }
      room.finished = true; room.open = false; room.results = results;
      wr('rooms.json', L); log(me.u, 'finish room ' + room.title);
      { const STf = statsAll(); [...new Set(Object.values(room.slots || {}))].forEach(ph => grantAch(ph, STf)); }
      [...new Set(Object.values(room.slots || {}))].forEach(ph => notify(ph, 'نتیجه‌ی روم ثبت شد', 'نتیجه‌ی روم «' + room.title + '» اعلام شد؛ برای جزئیات به بخش روم‌ها سر بزن.'));
      return send(res, 200, { ok: true, room: withNames(room) });
    }
    if (m === 'POST' && parts[2] === 'reopen') {
      room.finished = false; room.results = null;
      wr('rooms.json', L); log(me.u, 'reopen room ' + room.title);
      return send(res, 200, { ok: true, room: withNames(room) });
    }
    if (m === 'POST' && parts[2] === 'reveal') { // announce the room code/password to everyone currently registered (manual override; see also the auto-reveal timer below)
      if (!room.roomCode && !room.roomPassword) return bad('اول کد و رمز روم را از صفحهٔ ویرایش روم وارد کن.');
      revealRoom(room);
      wr('rooms.json', L); log(me.u, 'reveal room code ' + room.title);
      return send(res, 200, { ok: true, room: withNames(room) });
    }
    if (m === 'POST' && parts[2] === 'hide') { // pull the code/password back (e.g. typo, or room time moved)
      room.revealed = false; room.revealedAt = null; room.deleteAt = null; // pulling the code back also cancels the auto-delete
      wr('rooms.json', L); log(me.u, 'hide room code ' + room.title);
      return send(res, 200, { ok: true, room: withNames(room) });
    }
    if (m === 'POST' && parts[2] === 'kick') {
      const b = await readBody(req), slot = String(b.slot);
      if (room.slots && room.slots[slot] != null) {
        const kph = room.slots[slot], W = rd(WALLET_FILE, {}), refunded = refundEntry(W, room, kph, 'بازگشت ورودی روم');
        if (refunded) wr(WALLET_FILE, W);
        notify(kph, 'حذف از روم', 'ثبت‌نام تو در روم «' + room.title + '» لغو شد.' + (refunded ? ' ورودی‌ات به کیف پول برگشت.' : ' برای اطلاعات بیشتر با پشتیبانی تماس بگیر.'));
        delete room.slots[slot];
        if (room.teams) { const sz = room.teamSize || 4, rw = Math.floor(+slot / sz); let any = false; for (let k = rw * sz; k < (rw + 1) * sz; k++) if (room.slots[k] != null) any = true; if (!any) delete room.teams[rw]; }
        wr('rooms.json', L); log(me.u, `kick slot ${slot} from room ${room.title}` + (refunded ? ' (entry refunded)' : ''));
      }
      return send(res, 200, { ok: true, room: withNames(room) });
    }
    return bad('method', 405);
  }
  if (p.startsWith('users')) {
    if (!can('users')) return deny();
    let L = rd('admins.json', []); const id = p.split('/')[1];
    if (m === 'GET') return send(res, 200, { primary: isPrimary, allPerms: ALL_PERMS, users: L.map(a => ({ u: a.u, r: a.r, at: a.at, ph: a.ph, pending: !!a.pending, perms: permsOf(a), custom: Array.isArray(a.perms), locked: a.r === 'owner' })) });
    if (m === 'POST') {
      const b = await readBody(req);
      if (b.phone) { // add staff by phone number: returns a one-time invite code the new admin enters on first panel entry
        const ph = normPhone(b.phone);
        if (b.r === 'owner' && !isPrimary) return bad('فقط مالک اصلی می‌تواند مدیر با نقش «مالک» بسازد.', 403);
        if (!isValidPhone(ph) || !PERMS[b.r] || L.some(x => x.ph === ph || x.u === ph)) return bad('شماره معتبر (مثل 09123456789)، نقش معتبر و غیرتکراری لازم است.');
        const invite = crypto.randomBytes(4).toString('hex');
        L.push({ u: ph, ph, h: hash(invite), r: b.r, pending: true, at: new Date().toISOString() }); wr('admins.json', L);
        log(me.u, `add staff ${ph} (${b.r})`); return send(res, 200, { ok: true, invite, phone: ph });
      }
      if (b.r === 'owner' && !isPrimary) return bad('فقط مالک اصلی می‌تواند مدیر با نقش «مالک» بسازد.', 403);
      const u = clean(b.u, 30);
      if (!/^[\w.-]{3,30}$/.test(u) || String(b.p || '').length < 8 || !PERMS[b.r] || L.some(x => x.u === u)) return bad('نام کاربری (۳ تا ۳۰ حرف انگلیسی، غیرتکراری)، رمز (حداقل ۸ کاراکتر) و نقش معتبر لازم است.');
      L.push({ u, h: hash(b.p), r: b.r, at: new Date().toISOString() }); log(me.u, `add user ${u} (${b.r})`);
    } else if (m === 'PATCH') {
      const b = await readBody(req), t = L.find(x => x.u === id);
      if (!t || id === me.u || t === L[0]) return bad('امکان تغییر این کاربر نیست.');
      if (b.perms !== undefined) { // the main owner ticks exactly which permissions this admin gets
        if (!isPrimary) return bad('فقط مالک اصلی می‌تواند دسترسی‌های مدیران را تعیین کند.', 403);
        if (t.r === 'owner') return bad('مدیر با نقش «مالک» همیشه همهٔ دسترسی‌ها را دارد؛ برای محدود کردنش نقشش را عوض کن.');
        if (b.perms === null) { delete t.perms; log(me.u, `perms ${id} -> default of role`); }
        else if (Array.isArray(b.perms)) { t.perms = ALL_PERMS.filter(k => b.perms.includes(k)); log(me.u, `perms ${id} -> [${t.perms.join(',')}]`); }
        else return bad('لیست دسترسی نامعتبر است.');
      }
      if (b.r !== undefined) {
        if (!PERMS[b.r]) return bad('نقش نامعتبر است.');
        if ((b.r === 'owner' || t.r === 'owner') && !isPrimary) return bad('فقط مالک اصلی می‌تواند نقش «مالک» بدهد یا بگیرد.', 403);
        if (b.r !== t.r) { t.r = b.r; delete t.perms; log(me.u, `role ${id} -> ${b.r}`); } // a new role starts from that role's default permissions
      }
    } else if (m === 'DELETE') {
      if (!L.some(x => x.u === id) || id === me.u || (L[0] && L[0].u === id)) return bad('امکان حذف این کاربر نیست.');
      L = L.filter(x => x.u !== id); log(me.u, 'delete user ' + id);
    } else return bad('method', 405);
    wr('admins.json', L); return send(res, 200, { ok: true });
  }
  if (p === 'wallet' || p.startsWith('wallet/')) { // money: owner only
    if (!can('wallet')) return deny();
    const W = rd(WALLET_FILE, {}), PL = loadPlayers(), parts = p.split('/');
    if (m === 'GET' && parts.length === 1) {
      const all = [];
      Object.keys(W).forEach(ph => (W[ph].txs || []).forEach(t => { if (['deposit', 'withdraw', 'gift', 'adjust'].includes(t.type)) all.push(Object.assign({}, t, { phone: ph, name: (PL[ph] && PL[ph].name) || '' })); }));
      all.sort((a, b) => String(b.at).localeCompare(String(a.at)));
      return send(res, 200, { pending: all.filter(t => t.status === 'pending').reverse(), recent: all.filter(t => t.status !== 'pending').slice(0, 60),
        totals: { balance: Object.values(W).reduce((n, w) => n + (w.dep || 0) + (w.won || 0), 0), withdrawable: Object.values(W).reduce((n, w) => n + (w.won || 0), 0) } });
    }
    if (m === 'POST' && parts[1] === 'adjust') { // manual correction, recorded in the player's list
      const b = await readBody(req), raw = clean(b.to, 40), amount = num(b.amount), dir = b.dir === 'out' ? 'out' : 'in';
      let ph = normPhone(raw); if (!PL[ph]) ph = Object.keys(PL).find(k => String(PL[k].inv) === raw.replace(/\D/g, '') || (PL[k].name || '').toLowerCase() === raw.toLowerCase());
      if (!ph || !PL[ph]) return bad('بازیکنی با این مشخصات پیدا نشد.');
      if (amount < 1) return bad('مبلغ را وارد کنید.');
      const w = walletOf(W, ph), note = clean(b.note, 60);
      if (dir === 'out') { if (w.dep + w.won < amount) return bad('موجودی بازیکن کمتر از این مبلغ است.'); spendFrom(w, amount); }
      else if (b.bucket === 'dep') w.dep += amount; else w.won += amount;
      addTx(W, ph, { type: 'adjust', dir, amount, label: note || 'تعدیل توسط پشتیبانی' }); wr(WALLET_FILE, W);
      notify(ph, dir === 'in' ? 'افزایش موجودی' : 'کاهش موجودی', 'مبلغ ' + money(amount) + ' تومان ' + (dir === 'in' ? 'به کیف پولت اضافه شد.' : 'از کیف پولت کم شد.') + (note ? ' (' + note + ')' : ''));
      log(me.u, 'wallet adjust ' + dir + ' ' + amount + ' ' + (PL[ph].name || ph) + (note ? ': ' + note : ''));
      return send(res, 200, { ok: true, name: PL[ph].name || ph });
    }
    if (m === 'POST' && (parts[2] === 'approve' || parts[2] === 'reject')) {
      let ph = null, t = null;
      for (const k of Object.keys(W)) { const f = (W[k].txs || []).find(x => x.id === parts[1]); if (f) { ph = k; t = f; break; } }
      if (!t || (t.type !== 'deposit' && t.type !== 'withdraw')) return bad('درخواست پیدا نشد.', 404);
      if (t.status !== 'pending') return bad('این درخواست قبلاً بررسی شده است.');
      const w = walletOf(W, ph), ok = parts[2] === 'approve';
      t.status = ok ? 'done' : 'rejected'; t.by = me.u; t.doneAt = new Date().toISOString();
      if (t.type === 'deposit' && ok) w.dep += t.amount;
      if (t.type === 'withdraw' && !ok) w.won += t.amount; // rejected withdrawal: the held money goes back
      wr(WALLET_FILE, W);
      notify(ph, t.type === 'deposit' ? (ok ? 'افزایش موجودی انجام شد' : 'درخواست افزایش موجودی رد شد') : (ok ? 'برداشت تسویه شد' : 'درخواست برداشت رد شد'),
        t.type === 'deposit' ? (ok ? 'مبلغ ' + money(t.amount) + ' تومان به کیف پولت اضافه شد.' : 'درخواست افزایش موجودی به مبلغ ' + money(t.amount) + ' تومان تأیید نشد.')
          : (ok ? 'مبلغ ' + money(t.amount) + ' تومان به حساب بانکی‌ات واریز شد.' : 'درخواست برداشت ' + money(t.amount) + ' تومان رد شد و مبلغ به کیف پولت برگشت. برای اطلاعات بیشتر با پشتیبانی تماس بگیر.'));
      log(me.u, 'wallet ' + t.type + ' ' + parts[2] + ' ' + t.id + ' (' + t.amount + ') ' + ((PL[ph] && PL[ph].name) || ph));
      return send(res, 200, { ok: true });
    }
    return bad('not found', 404);
  }
  if (p === 'pmanage' || p.startsWith('pmanage/')) { // staff: give a rank or an achievement to a player
    if (!can('ranks') && !can('achievements')) return deny();
    const PL = loadPlayers(), parts = p.split('/');
    const view = ph => { const x = PL[ph] || {}, ST = statsAll()[ph] || { joined: 0, played: 0, wins: 0 }, R = rd(REWARDS_FILE, {}), got = (R[ph] && R[ph].ach) || [];
      return { phone: ph, name: x.name || '', id: x.inv, wins: ST.wins, rank: rankName(ST.wins, x), rankIdx: rankIdx(ST.wins, x), granted: x.rankGrant != null && x.rankGrant > 0 ? x.rankGrant : null, ach: ACH.filter(a => got.includes(a.key) || a.done(ST)).map(a => a.key) }; };
    const meta = { ranks: RANKS.map(r => r[1]), achievements: ACH.map(a => ({ key: a.key, icon: a.icon, title: a.title, reward: a.reward })), canRank: can('ranks'), canAch: can('achievements'), canPay: can('wallet') };
    if (m === 'GET' && parts.length === 1) {
      const q = clean(url.searchParams.get('q'), 30).toLowerCase(), qd = q.replace(/\D/g, ''), out = [];
      if (q.length >= 2) for (const [ph, x] of Object.entries(PL)) {
        if ((x.name || '').toLowerCase().includes(q) || (qd.length >= 3 && (ph.includes(qd) || String(x.inv) === qd))) out.push(view(ph));
        if (out.length >= 10) break;
      }
      return send(res, 200, Object.assign({ players: out }, meta));
    }
    const ph = normPhone(parts[1] || ''), t = PL[ph];
    if (m !== 'POST' || !t || parts.length !== 3) return bad('not found', 404);
    const b = await readBody(req);
    if (parts[2] === 'rank') {
      if (!can('ranks')) return deny();
      if (b.rank === null || b.rank === '' || b.rank === undefined) { delete t.rankGrant; log(me.u, `rank reset ${ph}`); }
      else { const i = Math.round(+b.rank); if (!Number.isInteger(i) || i < 1 || i >= RANKS.length) return bad('رنک نامعتبر است.'); t.rankGrant = i; log(me.u, `rank ${ph} -> ${RANKS[i][1]}`); notify(ph, 'رنک جدید 🏅', 'رنک تو به «' + RANKS[i][1] + '» ارتقا پیدا کرد.'); }
      wr('players.json', PL); return send(res, 200, { ok: true, player: view(ph) });
    }
    if (parts[2] === 'ach') {
      if (!can('achievements')) return deny();
      const a = ACH.find(x => x.key === b.key); if (!a) return bad('دستاورد نامعتبر است.');
      const R = rd(REWARDS_FILE, {}), me2 = R[ph] || (R[ph] = { ach: [] });
      if (me2.ach.includes(a.key)) return bad('این دستاورد قبلاً برای این بازیکن ثبت شده است.');
      if (b.pay && !can('wallet')) return bad('برای پرداخت هدیه‌ی نقدی دسترسی «کیف پول» لازم است.', 403);
      me2.ach.push(a.key); wr(REWARDS_FILE, R);
      if (b.pay) { giftTo(ph, a.reward, 'هدیه دستاورد «' + a.title + '»', ACH_BUCKET); }
      log(me.u, `achievement ${ph} -> ${a.key}${b.pay ? ' (+' + a.reward + ')' : ''}`);
      notify(ph, 'دستاورد جدید 🎉', 'دستاورد «' + a.title + '» برای تو ثبت شد' + (b.pay ? ' و ' + a.reward.toLocaleString('fa-IR') + ' تومان هدیه به کیف پولت اضافه شد.' : '.'));
      return send(res, 200, { ok: true, player: view(ph) });
    }
    return bad('not found', 404);
  }
  if (p === 'players' && m === 'GET') { // staff: find a player to notify (by username, phone or public id)
    if (!can('notify')) return deny();
    const q = clean(url.searchParams.get('q'), 30).toLowerCase(), qd = q.replace(/\D/g, ''), PL = loadPlayers(), out = [];
    if (q.length < 2) return send(res, 200, []);
    for (const [ph, x] of Object.entries(PL)) {
      if ((x.name || '').toLowerCase().includes(q) || (qd.length >= 3 && (ph.includes(qd) || String(x.inv) === qd))) out.push({ phone: ph, name: x.name || '', id: x.inv });
      if (out.length >= 8) break;
    }
    return send(res, 200, out);
  }
  if (p === 'notify') { // staff -> one player. The player only sees "پشتیبانی WARHUB", never the admin's name.
    if (!can('notify')) return deny();
    let S = rd('notices-sent.json', []);
    if (m === 'GET') return send(res, 200, S.slice(-100).reverse());
    if (m !== 'POST') return bad('method', 405);
    const b = await readBody(req), PL = loadPlayers(), raw = clean(b.to, 40);
    let ph = normPhone(raw); if (!PL[ph]) ph = Object.keys(PL).find(k => String(PL[k].inv) === raw.replace(/\D/g, '') || (PL[k].name || '').toLowerCase() === raw.toLowerCase());
    const title = clean(b.title, 80), body = cleanML(b.body, 500);
    if (!ph || !PL[ph]) return bad('بازیکنی با این مشخصات پیدا نشد.');
    if (title.length < 2 || body.length < 2) return bad('عنوان و متن اعلان را وارد کنید.');
    notify(ph, title, body, 'admin');
    S.push({ to: ph, name: PL[ph].name || '', title, body, by: me.u, at: new Date().toISOString() }); wr('notices-sent.json', S.slice(-300));
    log(me.u, 'notify ' + (PL[ph].name || ph) + ': ' + title);
    return send(res, 200, { ok: true, name: PL[ph].name || ph });
  }
  if (m === 'GET' && p === 'audit') return can('audit') ? send(res, 200, rd('audit.json', []).reverse()) : deny();
  return bad('not found', 404);
}


// ================= SLIDER-PUZZLE CAPTCHA (no dependencies: the images are drawn + PNG-encoded here) =================
// The correct x position never leaves the server. The browser only gets the background (with a hole) and the loose piece.
const zlib = require('zlib');
const CRC_T = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = b => { let c = -1; for (let i = 0; i < b.length; i++) c = CRC_T[(c ^ b[i]) & 255] ^ (c >>> 8); return (~c) >>> 0; };
function pngChunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]), crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function encodePng(w, h, px, ch) { // ch = 3 (RGB) or 4 (RGBA)
  const row = w * ch + 1, raw = Buffer.alloc(row * h);
  for (let y = 0; y < h; y++) { raw[y * row] = 0; px.copy(raw, y * row + 1, y * w * ch, (y + 1) * w * ch); }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = ch === 4 ? 6 : 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), pngChunk('IHDR', ihdr), pngChunk('IDAT', zlib.deflateSync(raw, { level: 3 })), pngChunk('IEND', Buffer.alloc(0))]);
}
const CAP_W = 320, CAP_H = 160, CAP_S = 40, CAP_R = 9, CAP_PS = CAP_S + 2 * CAP_R; // piece box = 58x58
const CAP_TOL = 3; // the piece must land within +-3px of the real hole
const rnd = (a, b) => crypto.randomInt(a, b + 1);
function hsl(h, s, l) { s /= 100; l /= 100; const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l), f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return [f(0) * 255, f(8) * 255, f(4) * 255]; }

// Every puzzle gets a RANDOM piece shape: each of the 4 sides is a knob (1), a notch (-1) or flat (0).
function makeMask(sd) {
  const m = new Uint8Array(CAP_PS * CAP_PS), a = CAP_R, b = CAP_R + CAP_S, c = CAP_R + CAP_S / 2;
  const mid = [[c, a], [b, c], [c, b], [a, c]]; // top, right, bottom, left
  for (let y = 0; y < CAP_PS; y++) for (let x = 0; x < CAP_PS; x++) {
    let v = x >= a && x < b && y >= a && y < b;
    for (let k = 0; k < 4; k++) if (sd[k] === 1 && Math.hypot(x - mid[k][0], y - mid[k][1]) <= CAP_R) v = true;
    for (let k = 0; k < 4; k++) if (sd[k] === -1 && Math.hypot(x - mid[k][0], y - mid[k][1]) <= CAP_R) v = false;
    m[y * CAP_PS + x] = v ? 1 : 0;
  }
  return m;
}
function maskEdge(m) { // 1 on the outline pixels of a mask
  const e = new Uint8Array(m.length);
  for (let y = 0; y < CAP_PS; y++) for (let x = 0; x < CAP_PS; x++) {
    if (!m[y * CAP_PS + x]) continue;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= CAP_PS || ny >= CAP_PS || !m[ny * CAP_PS + nx]) { e[y * CAP_PS + x] = 1; break; } }
  }
  return e;
}
const sidesDist = (p, q) => p.reduce((n, v, i) => n + (v !== q[i] ? 1 : 0), 0);
function randSides(others) { // a new shape that differs from every shape in `others` on at least 2 sides (so it is fair, but still confusing)
  for (let i = 0; i < 400; i++) {
    const s = [rnd(-1, 1), rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)], nz = s.filter(Boolean).length;
    if (nz < 2 || !s.includes(1)) continue;
    if (others.every(o => sidesDist(s, o) >= 2)) return s;
  }
  return [1, 0, -1, 1];
}
function makeBackground() {
  const W = CAP_W, H = CAP_H, px = Buffer.alloc(W * H * 3), h1 = rnd(0, 359), h2 = (h1 + rnd(60, 150)) % 360, h3 = (h1 + rnd(180, 300)) % 360;
  const c1 = hsl(h1, 70, 36), c2 = hsl(h2, 75, 52), c3 = hsl(h3, 65, 44);
  const blobs = Array.from({ length: 24 }, () => { const r = rnd(8, 36); return { x: rnd(0, W), y: rnd(0, H), r2: r * r, c: hsl(rnd(0, 359), rnd(45, 85), rnd(28, 72)), a: rnd(25, 65) / 100 }; });
  // thin light rings: they look like the outline of the hole, so edge-detection tricks get confused
  const rings = Array.from({ length: 9 }, () => ({ x: rnd(0, W), y: rnd(0, H), r: rnd(12, 34) }));
  const a1 = Math.random() * Math.PI, a2 = a1 + 0.9 + Math.random(), s1 = rnd(12, 26), s2 = rnd(9, 20);
  const co1 = Math.cos(a1), si1 = Math.sin(a1), co2 = Math.cos(a2), si2 = Math.sin(a2);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const u = x / W * 0.6 + y / H * 0.4, k = u < 0.5 ? u * 2 : (u - 0.5) * 2, p = u < 0.5 ? c1 : c2, q = u < 0.5 ? c2 : c3;
    let r = p[0] + (q[0] - p[0]) * k, g = p[1] + (q[1] - p[1]) * k, bl = p[2] + (q[2] - p[2]) * k;
    for (let i = 0; i < blobs.length; i++) { const sh = blobs[i], dx = x - sh.x, dy = y - sh.y; if (dx * dx + dy * dy < sh.r2) { const ia = 1 - sh.a; r = r * ia + sh.c[0] * sh.a; g = g * ia + sh.c[1] * sh.a; bl = bl * ia + sh.c[2] * sh.a; } }
    let add = Math.sin((x * co1 + y * si1) / s1 * 6.28) > 0.78 ? 17 : 0;
    if (Math.sin((x * co2 + y * si2) / s2 * 6.28) > 0.88) add -= 15;
    for (let i = 0; i < rings.length; i++) { const rg = rings[i], dx = x - rg.x, dy = y - rg.y; if (Math.abs(Math.sqrt(dx * dx + dy * dy) - rg.r) < 1.1) add += 34; }
    const o = (y * W + x) * 3, n = ((Math.random() * 7) | 0) - 3 + add;
    px[o] = r + n < 0 ? 0 : r + n > 255 ? 255 : r + n; px[o + 1] = g + n < 0 ? 0 : g + n > 255 ? 255 : g + n; px[o + 2] = bl + n < 0 ? 0 : bl + n > 255 ? 255 : bl + n;
  }
  return px;
}
function makeCaptcha() {
  const bg = makeBackground(), ty = rnd(4, CAP_H - CAP_PS - 4);
  // 3 holes on the same row: 1 real + 2 decoys with DIFFERENT shapes. Only the hole that matches the piece is correct.
  const xs = [];
  for (let i = 0; xs.length < 3 && i < 600; i++) { const x = rnd(CAP_PS + 12, CAP_W - CAP_PS - 4); if (xs.every(v => Math.abs(v - x) >= CAP_PS + 6)) xs.push(x); }
  while (xs.length < 3) xs.push(xs.length ? xs[xs.length - 1] : CAP_PS + 12); // (practically unreachable)
  const sides = randSides([]), d1 = randSides([sides]), d2 = randSides([sides, d1]);
  const holes = [
    { x: xs[0], y: ty, sd: sides, real: true },
    { x: xs[1], y: Math.max(2, Math.min(CAP_H - CAP_PS - 2, ty + rnd(-9, 9))), sd: d1 },
    { x: xs[2], y: Math.max(2, Math.min(CAP_H - CAP_PS - 2, ty + rnd(-9, 9))), sd: d2 },
  ];
  const piece = Buffer.alloc(CAP_PS * CAP_PS * 4), holed = Buffer.from(bg);
  for (const h of holes) {
    const m = makeMask(h.sd), ed = maskEdge(m);
    for (let y = 0; y < CAP_PS; y++) for (let x = 0; x < CAP_PS; x++) {
      const k = y * CAP_PS + x; if (!m[k]) continue;
      const bo = ((h.y + y) * CAP_W + (h.x + x)) * 3, po = k * 4;
      if (h.real) { for (let i = 0; i < 3; i++) piece[po + i] = ed[k] ? Math.min(255, bg[bo + i] + 55) : bg[bo + i]; piece[po + 3] = 255; }
      for (let i = 0; i < 3; i++) holed[bo + i] = ed[k] ? Math.min(255, Math.round(bg[bo + i] * 0.45) + 62) : Math.round(bg[bo + i] * 0.45);
    }
  }
  return { tx: xs[0], ty, bg: encodePng(CAP_W, CAP_H, holed, 3), piece: encodePng(CAP_PS, CAP_PS, piece, 4) };
}
const CAPS = new Map();      // challenge id -> { tx, exp }
const CAP_USED = new Map();  // spent ticket id -> exp (a ticket works for exactly one login)
setInterval(() => { const n = Date.now(); for (const [k, v] of CAPS) if (v.exp < n) CAPS.delete(k); for (const [k, v] of CAP_USED) if (v < n) CAP_USED.delete(k); }, 60000).unref();
function consumeCaptchaTicket(t) {
  const v = unsign(t); if (!v || !v.cap || CAP_USED.has(v.cap)) return false;
  CAP_USED.set(v.cap, v.exp); return true;
}

// ---------- API ----------
async function api(req, res, url) {
  const { pathname } = url;
  if (pathname.startsWith('/api/admin/')) return adminApi(req, res, url);
  if (req.method === 'GET' && pathname === '/api/reviews') return send(res, 200, readJSON('reviews.json'));
  if (req.method === 'GET' && pathname === '/api/faq') return send(res, 200, readJSON('faq.json'));

  // ---- slider-puzzle captcha ----
  if (req.method === 'GET' && pathname === '/api/captcha') {
    if (limited(req.socket.remoteAddress, 'cap', 60) || CAPS.size > 5000) return send(res, 429, { ok: false, error: 'تعداد درخواست‌ها زیاد است؛ کمی بعد دوباره تلاش کنید.' });
    const c = makeCaptcha(), id = crypto.randomBytes(12).toString('hex');
    CAPS.set(id, { tx: c.tx, tries: 0, exp: Date.now() + 120000 });
    return send(res, 200, { id, w: CAP_W, h: CAP_H, pw: CAP_PS, ty: c.ty,
      bg: 'data:image/png;base64,' + c.bg.toString('base64'), piece: 'data:image/png;base64,' + c.piece.toString('base64') });
  }
  if (req.method === 'POST' && pathname === '/api/captcha/verify') {
    if (limited(req.socket.remoteAddress, 'capv', 60)) return send(res, 429, { ok: false, error: 'تعداد تلاش‌ها زیاد است؛ کمی بعد دوباره امتحان کن.' });
    const b = await readBody(req), c = CAPS.get(String(b.id || ''));
    if (!c || c.exp < Date.now()) return send(res, 200, { ok: false, error: 'پازل منقضی شد؛ دوباره امتحان کن.' });
    CAPS.delete(String(b.id)); // one attempt per puzzle: a miss always gets a fresh puzzle
    // behaviour check: the drag must look like a real finger/mouse (variable speed, many samples, believable duration)
    const trail = Array.isArray(b.trail) ? b.trail.slice(0, 600) : [], dur = +b.t;
    const clean2 = trail.every(p => Array.isArray(p) && Number.isFinite(+p[0]) && Number.isFinite(+p[1]));
    const tt = trail.map(p => +p[0]), xx = trail.map(p => +p[1]);
    const sp = []; for (let i = 1; i < tt.length; i++) { const dt = tt[i] - tt[i - 1]; if (dt > 0) sp.push(Math.abs(xx[i] - xx[i - 1]) / dt); }
    const mean = sp.reduce((a, v) => a + v, 0) / (sp.length || 1), sd = Math.sqrt(sp.reduce((a, v) => a + (v - mean) * (v - mean), 0) / (sp.length || 1));
    const human = clean2 && trail.length >= 12 && sp.length >= 8 && dur >= 700 && dur <= 25000
      && tt.every((v, i) => i === 0 || v >= tt[i - 1]) && tt[tt.length - 1] <= dur + 400
      && new Set(xx.map(Math.round)).size >= 10 && mean > 0 && sd / mean >= 0.2   // robots move at a constant speed
      && Math.abs(xx[xx.length - 1] - (+b.x)) <= 2;                              // the reported spot must match the real drag
    if (!human || !(Math.abs(+b.x - c.tx) <= CAP_TOL)) return send(res, 200, { ok: false, error: 'درست نبود؛ دوباره امتحان کن.' });
    return send(res, 200, { ok: true, ticket: sign({ cap: crypto.randomBytes(10).toString('hex'), exp: Date.now() + 180000 }) });
  }

  // ---- player (phone) login — captcha first; the SMS code step gets added after it (see TODO below) ----
  if (req.method === 'POST' && pathname === '/api/login') {
    if (limited(req.socket.remoteAddress, 'pl', 10)) return send(res, 429, { ok: false, error: 'تعداد تلاش‌ها زیاد است؛ کمی بعد دوباره امتحان کنید.' });
    const b = await readBody(req), ph = normPhone(b.phone);
    if (!isValidPhone(ph)) return send(res, 400, { ok: false, error: 'شماره تلفن را درست وارد کنید (مثال: 09123456789).' });
    if (!consumeCaptchaTicket(b.captcha)) return send(res, 400, { ok: false, captcha: true, error: 'اول پازل امنیتی را حل کن.' });
    // TODO(SMS): here generate a 5-6 digit code, store it (hashed, 2 min expiry, 3 tries) and send it to `ph`;
    // then return { ok: true, step: 'code' } and only call setPlayerSession from a new POST /api/login/verify.
    const isNew = !rd('players.json', {})[ph], pl = getPlayer(ph, true) || {};
    if (isNew) { // welcome message: tell every new player about the achievement gifts
      notify(ph, 'خوش اومدی به WARHUB 🎁', 'با هر دستاورد، هدیه‌ی نقدی مستقیم می‌ره توی کیف پولت: ' + ACH.map(a => a.title + ' ← ' + a.reward.toLocaleString('fa-IR')).join(' · ') + ' تومان. فقط کافیه شروع کنی؛ همین الان توی اولین رومت ثبت‌نام کن!');
    }
    if (isNew) { // optional invite code from a friend, counted only on the very first signup
      const code = digitsOf(b.invite);
      if (code) { const PL = loadPlayers(), inviter = Object.keys(PL).find(k => PL[k].inv === code && k !== ph); if (inviter) { PL[ph].invitedBy = inviter; wr('players.json', PL); giftTo(inviter, REF_REWARD, 'هدیه دعوت دوست', REF_BUCKET); notify(inviter, 'هدیه دعوت 🎁', 'یک دوست با کد معرف تو ثبت‌نام کرد و ' + REF_REWARD.toLocaleString('fa-IR') + ' تومان هدیه به کیف پولت اضافه شد.'); } }
    }
    setPlayerSession(req, res, ph);
    return send(res, 200, { ok: true, phone: ph, name: pl.name || '' });
  }
  if (req.method === 'POST' && pathname === '/api/logout-player') { res.setHeader('Set-Cookie', clearPlayerSession()); return send(res, 200, { ok: true }); }
  if (req.method === 'GET' && pathname === '/api/profile') {
    const ph = getPlayerPhone(req); if (!ph) return send(res, 401, { ok: false, error: 'ابتدا وارد شوید.' });
    grantAch(ph);
    return send(res, 200, profileOf(ph));
  }
  if (req.method === 'POST' && pathname === '/api/profile') {
    const ph = getPlayerPhone(req); if (!ph) return send(res, 401, { ok: false, error: 'ابتدا وارد شوید.' });
    const b = await readBody(req), name = clean(b.name, 20);
    if (name.length < 2) return send(res, 400, { ok: false, error: 'نام باید حداقل ۲ حرف باشد.' });
    const L = rd('players.json', {}), old = L[ph] && L[ph].name || '', edits = (L[ph] && L[ph].nameEdits) || 0;
    if (Object.keys(L).some(k => k !== ph && String(L[k].name || '').toLowerCase() === name.toLowerCase())) return send(res, 400, { ok: false, error: 'این نام کاربری قبلاً انتخاب شده؛ نام دیگری امتحان کن.' });
    if (old && old !== name) { // choosing the first name is free; changing an existing one is limited to two times
      if (edits >= 2) return send(res, 400, { ok: false, error: 'نام کاربری خود را فقط دو بار می‌توانید تغییر دهید.' });
      L[ph] = Object.assign({ coins: 0, at: new Date().toISOString() }, L[ph], { name, nameEdits: edits + 1 });
    } else L[ph] = Object.assign({ coins: 0, at: new Date().toISOString() }, L[ph], { name });
    wr('players.json', L);
    return send(res, 200, profileOf(ph));
  }
  if (req.method === 'POST' && pathname === '/api/profile-card') { // bank card number (16 digits, Luhn-checked) used for payouts
    const ph = getPlayerPhone(req); if (!ph) return send(res, 401, { ok: false, error: 'ابتدا وارد شوید.' });
    const b = await readBody(req); let card = digitsOf(String(b.card || '').replace(/^\s*ir/i, '')).slice(0, 24); // card (16 digits) or sheba (24 digits, without IR)
    const luhn = c => { let sum = 0; for (let i = 0; i < c.length; i++) { let d = +c[c.length - 1 - i]; if (i % 2) { d *= 2; if (d > 9) d -= 9; } sum += d; } return sum % 10 === 0; };
    const shebaOk = c => { const t = c.slice(2) + '1827' + c.slice(0, 2); let r = 0; for (const ch of t) r = (r * 10 + +ch) % 97; return r === 1; }; // IBAN mod-97 with IR = 1827
    const ok = !card || (card.length === 16 && luhn(card)) || (card.length === 24 && shebaOk(card));
    if (!ok) return send(res, 400, { ok: false, error: 'شماره کارت (۱۶ رقم) یا شبا (۲۴ رقم بدون IR) معتبر وارد کنید.' });
    const L = rd('players.json', {}); L[ph] = Object.assign({ coins: 0, at: new Date().toISOString() }, L[ph], { card }); wr('players.json', L);
    return send(res, 200, profileOf(ph));
  }
  if (req.method === 'GET' && pathname === '/api/whoami') { const ph = getPlayerPhone(req); const pl = ph ? (getPlayer(ph, false) || {}) : {}; return send(res, 200, { phone: ph, name: pl.name || '' }); }

  // ---- latest payouts + live leaderboard (public; no phone numbers are ever sent) ----
  if (req.method === 'GET' && pathname === '/api/payouts') {
    const PL = rd('players.json', {});
    return send(res, 200, rd('payouts.json', []).slice(-20).reverse().map(x => ({ id: x.id, name: nameOf(x.phone, PL), amount: x.amount, room: x.roomTitle, at: x.at })));
  }
  if (req.method === 'GET' && pathname === '/api/leaderboard') return send(res, 200, leaderboard());

  // ---- player search (existing usernames only) + teams ----
  if (req.method === 'GET' && pathname === '/api/players/search') {
    const ph = getPlayerPhone(req); if (!ph) return send(res, 401, { ok: false, error: 'ابتدا وارد شوید.' });
    const q = clean(url.searchParams.get('q'), 20).toLowerCase(); if (!q) return send(res, 200, []);
    const PL = loadPlayers(), ST = statsAll(), T = rd('teams.json', []), starts = k => (PL[k].name.toLowerCase().startsWith(q) ? 0 : 1);
    return send(res, 200, Object.keys(PL).filter(k => k !== ph && PL[k].name && PL[k].name.toLowerCase().includes(q))
      .sort((a, b) => starts(a) - starts(b) || PL[a].name.localeCompare(PL[b].name)).slice(0, 8)
      .map(k => ({ id: PL[k].inv, name: PL[k].name, rank: rankName((ST[k] || {}).wins || 0, PL[k]), busy: T.some(t => t.members.includes(k)) })));
  }
  if (pathname === '/api/team' || pathname.startsWith('/api/team/')) {
    const ph = getPlayerPhone(req); if (!ph) return send(res, 401, { ok: false, error: 'ابتدا وارد شوید.' });
    const sub = pathname.slice(10), bad = (e, c = 400) => send(res, c, { ok: false, error: e });
    if (req.method === 'GET' && !sub) return send(res, 200, teamView(ph));
    if (req.method !== 'POST') return bad('not found', 404);
    const b = await readBody(req), PL = loadPlayers(); let T = rd('teams.json', []);
    const mine = T.find(t => t.members.includes(ph)), done = () => { wr('teams.json', T); return send(res, 200, Object.assign({ ok: true }, teamView(ph))); };
    const phoneOfId = id => Object.keys(PL).find(k => PL[k].inv === digitsOf(id));
    const pick = ids => { // every invitee must be an existing player with a username, not yourself, not already in a team
      const out = [];
      for (const id of (Array.isArray(ids) ? ids : [ids]).slice(0, TEAM_MAX)) {
        const p = phoneOfId(id);
        if (!p || !PL[p].name) return { error: 'این نام کاربری وجود ندارد.' };
        if (p === ph) return { error: 'نمی‌توانی خودت را دعوت کنی.' };
        if (T.some(t => t.members.includes(p))) return { error: PL[p].name + ' عضو یک تیم دیگر است.' };
        if (!out.includes(p)) out.push(p);
      }
      return { phones: out };
    };
    if (sub === 'create') {
      if (mine) return bad('تو الان عضو یک تیم هستی.');
      if (!PL[ph] || !PL[ph].name) return bad('اول یک نام کاربری برای خودت انتخاب کن.');
      const r = pick(b.ids); if (r.error) return bad(r.error);
      if (!r.phones.length) return bad('حداقل یک نفر را برای دعوت انتخاب کن.');
      if (r.phones.length > TEAM_MAX - 1) return bad('هر تیم حداکثر ' + TEAM_MAX + ' نفر است.');
      T.push({ id: 't' + Date.now().toString(36) + crypto.randomBytes(2).toString('hex'), leader: ph, members: [ph], invites: r.phones, at: new Date().toISOString() });
      r.phones.forEach(p => notify(p, 'دعوت به تیم', (PL[ph].name || 'یک بازیکن') + ' تو را به تیمش دعوت کرد. از پنل کاربری می‌توانی بپذیری.'));
      return done();
    }
    if (sub === 'invite') {
      if (!mine || mine.leader !== ph) return bad('فقط لیدر تیم می‌تواند دعوت کند.', 403);
      const r = pick(b.ids); if (r.error) return bad(r.error);
      const fresh = r.phones.filter(p => !(mine.invites || []).includes(p));
      if (mine.members.length + (mine.invites || []).length + fresh.length > TEAM_MAX) return bad('ظرفیت تیم تکمیل است.');
      mine.invites = (mine.invites || []).concat(fresh);
      fresh.forEach(p => notify(p, 'دعوت به تیم', (PL[ph].name || 'یک بازیکن') + ' تو را به تیمش دعوت کرد. از پنل کاربری می‌توانی بپذیری.'));
      return done();
    }
    if (sub === 'uninvite' || sub === 'kick') {
      if (!mine || mine.leader !== ph) return bad('فقط لیدر تیم می‌تواند این کار را بکند.', 403);
      const p = phoneOfId(b.id); if (!p) return bad('این کاربر پیدا نشد.');
      if (sub === 'kick') { if (p === ph || !mine.members.includes(p)) return bad('امکان حذف این عضو نیست.'); mine.members = mine.members.filter(x => x !== p); }
      else mine.invites = (mine.invites || []).filter(x => x !== p);
      return done();
    }
    if (sub === 'leave') {
      if (!mine) return bad('عضو هیچ تیمی نیستی.');
      if (mine.leader === ph) T = T.filter(t => t !== mine); else mine.members = mine.members.filter(x => x !== ph); // the leader leaving disbands the team
      return done();
    }
    if (sub === 'accept' || sub === 'decline') {
      const t = T.find(x => x.id === String(b.teamId) && (x.invites || []).includes(ph));
      if (!t) return bad('این دعوت دیگر معتبر نیست.');
      if (sub === 'decline') { t.invites = t.invites.filter(x => x !== ph); return done(); }
      if (mine) return bad('تو الان عضو یک تیم هستی.');
      if (!PL[ph] || !PL[ph].name) return bad('اول یک نام کاربری برای خودت انتخاب کن.');
      if (t.members.length >= TEAM_MAX) return bad('ظرفیت این تیم تکمیل شده است.');
      t.members.push(ph); T.forEach(x => { x.invites = (x.invites || []).filter(p => p !== ph); }); // joining cancels every other pending invite
      return done();
    }
    return bad('not found', 404);
  }

  // ---- wallet (player) ----
  if (pathname === '/api/wallet' || pathname.startsWith('/api/wallet/')) {
    const ph = getPlayerPhone(req); if (!ph) return send(res, 401, { ok: false, error: 'ابتدا وارد شوید.' });
    const sub = pathname.slice(12), bad = (e, c = 400, x = {}) => send(res, c, Object.assign({ ok: false, error: e }, x));
    if (req.method === 'GET' && !sub) return send(res, 200, walletView(ph));
    if (req.method !== 'POST') return bad('not found', 404);
    if (limited(req.socket.remoteAddress, 'wl', 30)) return bad('تعداد درخواست‌ها زیاد است؛ کمی بعد دوباره تلاش کنید.', 429);
    const b = await readBody(req), amount = Math.round(+b.amount), W = rd(WALLET_FILE, {}), w = walletOf(W, ph), pend = type => w.txs.filter(t => t.type === type && t.status === 'pending').length;
    if (sub === 'deposit') {
      if (!Number.isFinite(amount) || amount < WALLET_MIN_DEPOSIT) return bad('حداقل مبلغ افزایش موجودی ' + money(WALLET_MIN_DEPOSIT) + ' تومان است.');
      if (amount > WALLET_MAX) return bad('مبلغ بیش از حد مجاز است.');
      if (pend('deposit') >= 3) return bad('چند درخواست افزایش موجودی در انتظار داری؛ اول آن‌ها را لغو کن یا منتظر بررسی بمان.');
      // TODO(gateway): اینجا درخواست پرداخت به درگاه (زرین‌پال و ...) ساخته شود و آدرس درگاه برگردد؛ موجودی فقط بعد از تأیید برگشت از درگاه اضافه شود.
      const t = addTx(W, ph, { type: 'deposit', dir: 'in', amount, status: 'pending', label: 'افزایش موجودی' }); wr(WALLET_FILE, W);
      return send(res, 200, Object.assign(walletView(ph), { tx: { id: t.id, amount }, payInfo: PAY_CARD_TEXT }));
    }
    if (sub === 'withdraw') {
      const pl = getPlayer(ph, false) || {};
      if (!pl.card) return bad('اول شماره کارت یا شبا را در پنل کاربری ثبت کن.', 400, { needCard: true });
      if (!Number.isFinite(amount) || amount < WALLET_MIN_WITHDRAW) return bad('حداقل مبلغ برداشت ' + money(WALLET_MIN_WITHDRAW) + ' تومان است.');
      if (amount > w.won) return bad('مبلغ از موجودی قابل برداشت (' + money(w.won) + ' تومان) بیشتر است.');
      if (pend('withdraw') >= 3) return bad('چند درخواست برداشت در انتظار داری؛ منتظر بررسی بمان.');
      w.won -= amount; // held until the request is settled or rejected
      const t = addTx(W, ph, { type: 'withdraw', dir: 'out', amount, status: 'pending', label: 'درخواست برداشت', card: pl.card }); wr(WALLET_FILE, W);
      return send(res, 200, Object.assign(walletView(ph), { tx: { id: t.id, amount } }));
    }
    if (sub === 'cancel') { // the player can cancel a deposit that is still waiting
      const t = w.txs.find(x => x.id === String(b.id) && x.type === 'deposit' && x.status === 'pending');
      if (!t) return bad('این درخواست قابل لغو نیست.');
      t.status = 'rejected'; t.label = 'لغو توسط کاربر'; wr(WALLET_FILE, W); return send(res, 200, walletView(ph));
    }
    return bad('not found', 404);
  }

  // ---- rooms (public) ----
  if (req.method === 'GET' && pathname === '/api/rooms') {
    const phone = getPlayerPhone(req);
    if (!phone) return send(res, 401, { ok: false, error: 'برای دیدن روم‌ها اول باید وارد بشی یا ثبت‌نام کنی.' });
    return send(res, 200, { phone, rooms: rd('rooms.json', []).slice().sort((a, b) => b.id - a.id).map(r => publicRoom(r, phone)) });
  }
  const roomAction = pathname.match(/^\/api\/rooms\/(\d+)\/(join|leave)$/);
  if (req.method === 'POST' && roomAction) {
    const phone = getPlayerPhone(req);
    if (!phone) return send(res, 401, { ok: false, error: 'ابتدا با شماره موبایل وارد شوید.' });
    if (limited(req.socket.remoteAddress, 'jn')) return send(res, 429, { ok: false, error: 'تعداد درخواست‌ها زیاد است؛ کمی بعد دوباره تلاش کنید.' });
    const b = roomAction[2] === 'join' ? await readBody(req) : {}; // body first, then read the files (no stale data across the await)
    const id = Number(roomAction[1]), L = rd('rooms.json', []), i = L.findIndex(r => r.id === id);
    if (i < 0) return send(res, 404, { ok: false, error: 'روم یافت نشد.' });
    const r = L[i];
    if (r.finished) return send(res, 400, { ok: false, error: 'این روم پایان یافته است.' });
    r.slots = r.slots || {};
    if (roomAction[2] === 'leave') {
      const trow = Object.keys(r.teams || {}).find(k => r.teams[k].members.includes(phone));
      if (trow != null && r.teams[trow].leader !== phone) return send(res, 403, { ok: false, error: 'فقط لیدر تیم می‌تواند ثبت‌نام تیم را لغو کند.' });
      if (r.paid && r.paid[phone]) return send(res, 400, { ok: false, error: 'امکان انصراف از روم وجود ندارد.' });
      if (trow != null) { const sz = r.teamSize || 4; for (let k = trow * sz; k < (+trow + 1) * sz; k++) delete r.slots[k]; delete r.teams[trow]; wr('rooms.json', L); return send(res, 200, { ok: true, room: publicRoom(r, phone) }); }
      Object.keys(r.slots).forEach(k => { if (r.slots[k] === phone) delete r.slots[k]; });
      wr('rooms.json', L);
      return send(res, 200, { ok: true, room: publicRoom(r, phone) });
    }
    if (!r.open) return send(res, 400, { ok: false, error: 'ثبت‌نام این روم بسته است.' });
    const pl = getPlayer(phone, true); // players must pick a display name (it is shown in the room and to the admins)
    if (!pl || !pl.name) return send(res, 400, { ok: false, needName: true, error: 'اول یک نام نمایشی برای خودت انتخاب کن.' });
    const slot = Math.round(+b.slot);
    if (!Number.isInteger(slot) || slot < 0 || slot >= r.max) return send(res, 400, { ok: false, error: 'جایگاه نامعتبر است.' });
    const size = r.teamSize || 4, row = Math.floor(slot / size), rowStart = row * size, rowEnd = Math.min(rowStart + size, r.max);
    r.teams = r.teams || {};
    const myTeamRow = Object.keys(r.teams).find(k => r.teams[k].members.includes(phone));
    if (TEAM_ONLY[r.mode] && !b.team) return send(res, 400, { ok: false, error: 'ثبت‌نام این دسته فقط به‌صورت تیمی ممکن است.' });
    if (b.team) { // ---- team registration: the leader books a whole (empty) row for the team ----
      const T = rd('teams.json', []), mine = T.find(t => t.members.includes(phone)), PLm = rd('players.json', {});
      if (!mine) return send(res, 400, { ok: false, needTeam: true, error: 'برای ثبت‌نام تیمی اول باید یک تیم بسازی.' });
      if (mine.leader !== phone) return send(res, 403, { ok: false, error: 'فقط لیدر تیم می‌تواند تیم را ثبت‌نام کند.' });
      const members = mine.members.slice(), n = members.length;
      if (n < 2) return send(res, 400, { ok: false, needTeam: true, error: 'تیم باید حداقل ۲ عضو (تأییدشده) داشته باشد.' });
      if (TEAM_ONLY[r.mode] ? n !== size : n > size) return send(res, 400, { ok: false, error: TEAM_ONLY[r.mode] ? `این روم برای تیم‌های دقیقاً ${size} نفره است؛ تیم تو ${n} نفر است و نمی‌تواند ثبت‌نام کند.` : `تیم تو ${n} نفر است ولی ردیف‌های این روم ${size} نفره‌اند.` });
      if (myTeamRow != null && +myTeamRow === row) return send(res, 200, { ok: true, room: publicRoom(r, phone) });
      if (r.teams[row]) return send(res, 409, { ok: false, error: 'این ردیف همین الان توسط تیم دیگری رزرو شد.' });
      for (let k = rowStart; k < rowEnd; k++) if (r.slots[k] != null) return send(res, 409, { ok: false, error: 'این ردیف کاملاً خالی نیست؛ ردیف دیگری انتخاب کن.' });
      const taken = Object.keys(r.slots).filter(k => members.includes(r.slots[k]) && r.slots[k] !== phone && !(myTeamRow != null && Math.floor(k / size) === +myTeamRow));
      if (taken.length) { const nm = (PLm[r.slots[taken[0]]] || {}).name || 'یکی از اعضا'; return send(res, 409, { ok: false, error: nm + ' قبلاً به‌صورت شخصی در این روم ثبت‌نام کرده است.' }); }
      if (r.fee > 0) { // every member pays their own entry fee from their own wallet (all must be able to pay, otherwise nobody is charged)
        const W = rd(WALLET_FILE, {}), need = members.filter(p => !(r.paid && r.paid[p]));
        const poor = need.filter(p => { const w = walletOf(W, p); return w.dep + w.won < r.fee; });
        if (poor.length) { const names = poor.map(p => (PLm[p] && PLm[p].name) || 'یک عضو').join('، '); return send(res, 402, { ok: false, needFunds: poor.includes(phone), error: 'موجودی کیف پول ' + names + ' برای ورودی (' + money(r.fee) + ' تومان برای هر نفر) کافی نیست.' }); }
        r.paid = r.paid || {};
        need.forEach(p => {
          const w = walletOf(W, p), src = spendFrom(w, r.fee); r.paid[p] = { amt: r.fee, dep: src.dep, won: src.won };
          addTx(W, p, { type: 'entry', dir: 'out', amount: r.fee, label: 'ورودی تیمی روم «' + r.title + '»', roomId: r.id });
          if (p !== phone) notify(p, 'کسر ورودی روم', 'ورودی روم «' + r.title + '» (' + money(r.fee) + ' تومان) از کیف پولت کسر شد.');
        });
        wr(WALLET_FILE, W);
      }
      if (myTeamRow != null) { for (let k = myTeamRow * size; k < (+myTeamRow + 1) * size; k++) delete r.slots[k]; delete r.teams[myTeamRow]; } // moving the team to another row
      Object.keys(r.slots).forEach(k => { if (r.slots[k] === phone) delete r.slots[k]; }); // the leader's own solo seat (if any) becomes part of the team row
      members.forEach((p, i) => { r.slots[rowStart + i] = p; });
      r.teams[row] = { leader: phone, members };
      members.filter(p => p !== phone).forEach(p => notify(p, 'ثبت‌نام تیمی', 'لیدر تیم، تیم شما را در روم «' + r.title + '» ثبت‌نام کرد.'));
      wr('rooms.json', L);
      { const STj = statsAll(); members.forEach(p => grantAch(p, STj)); }
      return send(res, 200, { ok: true, room: publicRoom(r, phone) });
    }
    // ---- solo registration ----
    if (myTeamRow != null) return send(res, 400, { ok: false, error: 'تیم تو در این روم ثبت‌نام شده؛ برای تغییر، لیدر باید ثبت‌نام تیمی را لغو یا جابه‌جا کند.' });
    if (r.teams[row]) return send(res, 409, { ok: false, error: 'این ردیف برای یک تیم رزرو شده است.' });
    if (r.slots[slot] != null && r.slots[slot] !== phone) return send(res, 409, { ok: false, error: 'این جایگاه همین الان توسط شخص دیگری پر شد.' });
    if (r.fee > 0 && !(r.paid && r.paid[phone])) { // entry fee comes out of the wallet (and is recorded there); moving to another slot never charges twice
      const W = rd(WALLET_FILE, {}), w = walletOf(W, phone);
      if (w.dep + w.won < r.fee) return send(res, 402, { ok: false, needFunds: true, error: 'موجودی کیف پولت برای ورودی این روم (' + money(r.fee) + ' تومان) کافی نیست.' });
      const src = spendFrom(w, r.fee); r.paid = r.paid || {}; r.paid[phone] = { amt: r.fee, dep: src.dep, won: src.won };
      addTx(W, phone, { type: 'entry', dir: 'out', amount: r.fee, label: 'ورودی روم «' + r.title + '»', roomId: r.id }); wr(WALLET_FILE, W);
    }
    Object.keys(r.slots).forEach(k => { if (r.slots[k] === phone && +k !== slot) delete r.slots[k]; });
    r.slots[slot] = phone;
    wr('rooms.json', L);
    grantAch(phone);
    return send(res, 200, { ok: true, room: publicRoom(r, phone) });
  }

  if (pathname === '/api/notifications') { // the signed-in player's own inbox (sender is never included)
    const ph = getPlayerPhone(req); if (!ph) return send(res, 200, { items: [], unread: 0 });
    const N = rd('notifications.json', {}), arr = N[ph] || [];
    if (req.method === 'GET') {
      const rev = arr.slice().reverse();
      return send(res, 200, { unread: arr.filter(x => !x.read).length, items: rev.slice(0, 50).map(n => ({ id: n.id, title: n.title, body: n.body, kind: n.kind, at: n.at, read: n.read, ...(n.kind === 'roomStart' ? { roomId: n.roomId, roomTitle: n.roomTitle, roomCode: n.roomCode, roomPassword: n.roomPassword } : {}) })) });
    }
    if (req.method === 'POST') { // { id } marks one as read, {} marks all
      const b = await readBody(req); arr.forEach(x => { if (!b.id || x.id === String(b.id)) x.read = true; });
      N[ph] = arr; wr('notifications.json', N); return send(res, 200, { ok: true, unread: arr.filter(x => !x.read).length });
    }
    return send(res, 405, { ok: false, error: 'method' });
  }
  if (req.method === 'POST' && pathname === '/api/reviews') { // public: goes to the moderation queue, not the site
    if (limited(req.socket.remoteAddress, 'r')) return send(res, 429, { ok: false, error: 'تعداد درخواست‌ها زیاد است؛ کمی بعد دوباره تلاش کنید.' });
    const b = await readBody(req), it = { id: crypto.randomUUID(), stars: stars(b.stars), name: clean(b.name, 40),
      role: clean(b.role, 30), text: clean(b.text, 400), at: new Date().toISOString() };
    if (it.name.length < 3) return send(res, 400, { ok: false, error: 'نام را کامل وارد کنید.' });
    if (it.text.length < 10) return send(res, 400, { ok: false, error: 'نظر خیلی کوتاه است.' });
    const Q = rd('pending-reviews.json', []); if (Q.length >= 200) return send(res, 503, { ok: false, error: 'صف بررسی پر است؛ بعداً تلاش کنید.' });
    Q.push(it); wr('pending-reviews.json', Q); return send(res, 201, { ok: true });
  }
  if (req.method === 'POST' && pathname === '/api/contact') {
    if (limited(req.socket.remoteAddress)) return send(res, 429, { ok: false, error: 'تعداد درخواست‌ها زیاد است؛ کمی بعد دوباره تلاش کنید.' });
    const b = await readBody(req);
    const msg = { id: crypto.randomUUID(), dept: clean(b.dept, 20), name: clean(b.name, 80), phone: clean(b.phone, 20),
      message: clean(b.message, 600), status: 'new', at: new Date().toISOString() };
    // same rules as the front-end form, enforced again on the server
    if (!DEPTS.includes(msg.dept)) return send(res, 400, { ok: false, error: 'واحد نامعتبر است.' });
    if (msg.name.length < 3) return send(res, 400, { ok: false, error: 'نام را کامل وارد کنید.' });
    if (!/^[\d+\s-]{7,}$/.test(msg.phone)) return send(res, 400, { ok: false, error: 'شماره تماس نامعتبر است.' });
    if (msg.message.length < 10) return send(res, 400, { ok: false, error: 'پیام خیلی کوتاه است.' });
    saveMessage(msg);
    return send(res, 201, { ok: true, id: msg.id });
  }

  return send(res, 404, { ok: false, error: 'not found' });
}

// ---------- static files ----------
function serveStatic(req, res, pathname) {
  let rel = decodeURIComponent(pathname); if (rel.endsWith('/')) rel += 'index.html';
  const file = path.normalize(path.join(PUBLIC, rel));
  if (!file.startsWith(PUBLIC + path.sep)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('404'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(buf);
  });
}

http.createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'same-origin');
  try {
    const url = new URL(req.url, 'http://x');
    if (url.pathname.startsWith('/api/')) return await api(req, res, url);
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405); return res.end(); }
    serveStatic(req, res, url.pathname);
  } catch (e) {
    if (e && e.code && e.msg) return send(res, e.code, { ok: false, error: e.msg });
    console.error(e); send(res, 500, { ok: false, error: 'خطای سرور' });
  }
}).listen(PORT, () => console.log(`WARHUB running → http://localhost:${PORT}`));
