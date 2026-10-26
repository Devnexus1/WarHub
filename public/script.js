const $ = id => document.getElementById(id);
const card = (i, t, p, tag) => `<div class="card">${tag ? `<span class="tag">${tag}</span>` : ''}<div class="ico">${i}</div><h3>${t}</h3><p>${p}</p></div>`;
const blk = (i, t, l) => `<div class="blk"><i>${i}</i><h3>${t}</h3><ul>${l.map(x => `<li>${x}</li>`).join('')}</ul></div>`;
$('g-features').innerHTML = [
    ['⚔️', 'تورنمنت‌های رسمی', 'هر روز ده‌ها مسابقهٔ پرهیجان با جوایز نقدی بزرگ؛ از کاستوم‌های رایگان تا لیگ‌های سنگین.'],
    ['🎁', 'ورود رایگان', 'برای شروع پولی لازم نیست. وارد روم‌های رایگان شو، خودتو ثابت کن و جایزهٔ واقعی ببر.'],
    ['🏆', 'جایزهٔ نقدی', 'بعد از پیروزی، جایزه خیلی سریع و بدون معطلی به کیف پولت میرسه و قابل برداشته.'],
    ['🛡️', 'مقابله با تقلب', 'سامانهٔ هوشمند تشخیص چیتر و بررسی گزارش‌ها، رقابتی عادلانه و تمیز رو برات حفظ می‌کنه.'],
    ['📱', 'همه دستگاه‌ها', 'با هر دستگاهی که داری، موبایل، تبلت یا کامپیوتر، از مرورگر وارد شو و بازی کن. نیازی به نصب نیست.'],
    ['📶', 'رقابت بی‌وقفه', 'صبح یا نصفه‌شب، فرقی نمیکنه؛ همیشه یه روم باز و رقیب آماده پیدا میشه.']
].map(a => card(...a)).join('');
$('g-services').innerHTML = [
    ['🪙', 'فروشگاه CP', 'سی‌پی کالاف دیوتی موبایل رو با قیمتی مناسب و تحویل آنی تهیه کن؛ سریع و قابل اعتماد.', 'محبوب'],
    ['📦', 'محصولات فیزیکی', 'کنترلر، هدست و سایر لوازم جانبی اورجینال، همراه با گارانتی.', 'تازه'],
    ['🔁', 'خرید و فروش اکانت', 'اکانت‌های قوی رو با اطمینان بخر یا بفروش. وار هاب به‌عنوان واسطه، امنیت معامله‌ت رو تضمین میکنه.', 'مطمئن'],
    ['✅', 'امنیت و قانونی بودن', 'همهٔ تراکنش‌ها با نظارت تیم حقوقی ثبت و پیگیری میشن؛ خیالت از بابت معامله راحت باشه.', 'تضمین‌شده'],
    ['🛒', 'فروشگاه آیتم درون‌بازی', 'اسکین، باندل و آیتم‌های خاص رو بی‌واسطه از فروشگاه خود وار هاب بگیر.', 'گسترده'],
    ['⚖️', 'مسابقات عادلانه', 'مقررات روشن، داوری بی‌طرفانه و رتبه‌بندی دقیق؛ اینجا فقط توانایی تو تعیین‌کننده‌ست.', 'بی‌طرف']
].map(a => card(...a)).join('');
$('g-values').innerHTML = [
    ['🛡️', 'امنیت و اعتماد', 'تراکنش‌ها و معاملات با نظارت تیم حقوقی و امنیتی انجام می‌شوند و محافظت از دارایی و داده‌های کاربران همیشه در صدر کارهای ماست.'],
    ['⚖️', 'عدالت و انصاف', 'تشخیص هوشمند تقلب، داوری بی‌طرفانه و مقررات روشن باعث می‌شوند نتیجه فقط به توانایی بازیکن بستگی داشته باشد.'],
    ['👁️', 'شفافیت کامل', 'قوانین، کارمزدها و مراحل کار برای همهٔ کاربران روشن و در دسترس است و هزینهٔ پنهانی وجود ندارد.'],
    ['❤️', 'جامعه‌محوری', 'وار هاب برای جامعهٔ گیمرهای ایران ساخته شده و تصمیم‌هایمان را بر اساس نیازها و نظرات کاربران می‌گیریم.'],
    ['⚡', 'نوآوری مداوم', 'تیم فنی بی‌وقفه روی بهتر کردن پلتفرم کار می‌کند و قابلیت‌های تازه متناسب با نیاز کاربران اضافه می‌شوند.'],
    ['🎯', 'تعهد به کیفیت', 'از زیرساخت سرورها تا پشتیبانی شبانه‌روزی، روی همهٔ جزئیات دقت می‌کنیم تا تجربه‌ای بی‌نقص داشته باشید.']
].map(a => card(...a)).join('');
$('rules-list').innerHTML = [
    ['💳', 'قوانین واریز و برداشت', [
            'برای واریزهای بیش از یک میلیون تومان، واریزهای مشکوک یا در صورت افزایش تعداد تراکنش‌ها، احراز هویت الزامی است. بدین منظور، پس از پرداخت، باید تصویر کارت بانکی (فقط شامل شماره کارت و نام صاحب حساب) و تصویر کارت ملی یا شناسنامه صاحب حساب ارسال شود.',
            'در صورت عدم احراز هویت، برای بازگشت وجه، شماره کارت استفاده‌شده برای پرداخت باید ارائه شود. در این حالت، ۴ درصد از مبلغ به‌عنوان مالیات و کارمزد کسر خواهد شد. این فرآیند به‌منظور افزایش امنیت و پیشگیری از کلاهبرداری، طبق دستور پلیس فتا انجام می‌شود.',
            'لطفاً از واریز و برداشت بی‌دلیل به کیف پول وار هاب خودداری کنید. واریز تنها در صورتی انجام شود که قصد شرکت در روم‌ها یا خرید از فروشگاه را دارید. در صورت واریز و سپس برداشت، ۴ درصد از مبلغ به‌عنوان مالیات و کارمزد کسر می‌شود.',
            'تبصره: جوایز حاصل از برنده شدن در روم‌ها بدون کسر مالیات و کارمزد به حساب بانکی شما واریز خواهد شد.'
        ]],
    ['🧑‍💼', 'قوانین رفتار در بازی', [
            'تمامی اطلاعات ثبت‌نام باید دقیق و صحیح باشد. ارائه اطلاعات جعلی ممنوع است و بازیکنانی که اطلاعات نادرست (مانند نام کاربری یا UID) ارائه دهند، از مسابقه حذف شده و ممکن است از شرکت در رویدادهای آینده محروم شوند.',
            'بی‌احترامی، استفاده از کلمات ناپسند یا توهین‌آمیز در سرور مسابقات یا داخل بازی منجر به جریمه بازیکن متخلف خواهد شد.',
            'مطالعه توضیحات و قوانین هر روم پیش از شروع بازی الزامی است و رعایت این قوانین جزو مقررات وار هاب محسوب می‌شود.',
            'هر شخص تنها مجاز به استفاده از یک حساب کاربری در سایت است و باید اطلاعات شماره حساب و نام کاربری خود را با دقت وارد کند. مسئولیت هرگونه اشتباه در وارد کردن اطلاعات بر عهده فرد است.',
            'تمامی بازیکنان موظف‌اند این صفحه قوانین و مقررات را به‌دقت مطالعه کنند.',
            'استفاده از آیتم‌های غیرمجاز (باف) در بازی منجر به حذف از مسابقات خواهد شد.',
            'آیتم‌هایی که امکان حذف آن‌ها در تنظیمات بازی وجود دارد، توسط میزبان حذف می‌شوند. در مواردی که امکان حذف وجود ندارد، بازیکنان نباید از آن‌ها استفاده کنند. در صورت استفاده از آیتم‌های غیرمجاز، تیم متخلف بر اساس تصمیم ادمین و میزان تخلف جریمه خواهد شد.',
            'در صورت بروز باگ در بازی که منجر به عدم حذف آیتم‌های غیرمجاز شود، تیم‌ها نباید از این آیتم‌ها استفاده کنند.',
            'رعایت ادب در چت داخل بازی الزامی است. برای هرگونه درخواست از میزبان لابی، از پشتیبانی سایت استفاده کنید.',
            'استفاده از ویس در حالت «Voice All» ممنوع است و ویس تنها باید برای ارتباط تیمی استفاده شود.',
            'اسپکت (مشاهده بازی توسط دیگران) ممنوع است و بازیکنان باید گزینه مشاهده بازی را در تنظیمات غیرفعال کنند.',
            'تمامی بازیکنان باید شرایط هندیکپ (Handicap) را در تمام مراحل رعایت کنند. لطفاً پیش از هر بازی، توضیحات روم را بررسی کنید.',
            'تیم‌ها باید رأس ساعت تعیین‌شده در روم حاضر شوند. مسابقه حداکثر ۵ دقیقه پس از زمان اعلام‌شده آغاز می‌شود، مگر اینکه تأخیر توسط برگزارکننده اعلام شود.',
            'بازیکنان باید استانداردهای رفتاری بالایی را رعایت کنند. تقلب، استفاده از زبان توهین‌آمیز و هرگونه سوءرفتار منجر به جریمه خواهد شد.'
        ]],
    ['🎥', 'قوانین ضبط بازی (ریکورد)', [
            'تمامی بازیکنان در هر ردهای موظف‌اند تمام بازی‌های خود را به‌صورت کامل ضبط کنند.',
            'همیشه ضبط آخرین بازی خود را نگه دارید، اما می‌توانید ضبط بازی‌های قبلی را پس از ۲۴ ساعت حذف کنید.',
            'اگر از شما درخواست ریکورد شود و بازی شما مشکوک باشد، ادمین می‌تواند از شما هندکم از بازی‌های بعدی بگیرد. در صورت عدم ارائه هندکم، حساب شما بن خواهد شد.'
        ]],
    ['⚖️', 'قوانین شرکت در مسابقات', [
            'استفاده از کامپیوتر (PC) برای بازی‌های موبایلی ممنوع است و منجر به مسدود شدن حساب و جریمه خواهد شد.',
            'امکان انصراف از روم وجود ندارد؛ بنابراین هنگام ثبت‌نام به تاریخ و ساعت بازی دقت کنید.',
            'در صورت بروز مشکل برای روم (مانند مشکلات فنی سایت)، ورودی شما بازگردانده یا روم به زمان دیگری منتقل می‌شود. اما اگر مشکل از جانب شما باشد (مانند قطعی اینترنت یا عدم به‌روزرسانی بازی)، ورودی بازگردانده نخواهد شد.',
            'جوایز مسابقه به‌صورت انفرادی واریز می‌شود. در صورت عدم حضور هم‌تیمی یا محرومیت او، جایزه شما تغییر نمی‌کند. همچنین، در صورت عدم حضور خودتان، جایزه به هم‌تیمی‌ها تعلق نمی‌گیرد.',
            'بازیکنان حق دخالت در ورودی‌ها و جوایز وار هاب را ندارند.',
            'اکانت‌هایی با سطح (Level) کمتر از ۵۰ اجازه شرکت در روم‌ها را ندارند.',
            'تمامی کاربران وار هاب فقط باید در رومی که ثبت‌نام کرده‌اند شرکت کنند. در غیر این صورت، بار اول جریمه ۱۰۰ هزار تومانی به همراه تعداد کیلی که گرفته‌اند و بار دوم بن دائم خواهد بود.'
        ]],
    ['⚔️', 'قوانین داخل بازی', [
            'مشاهده بازی توسط دیگران (Spectating) ممنوع است. گزینه مشاهده بازی باید در تنظیمات غیرفعال شود.',
            'استفاده از «Voice All» ممنوع است و ویس باید در حالت تیمی با دوستان باشد.',
            'استفاده از کلمات زشت و ناپسند در سرور و لابی مسابقات ممنوع است.',
            'تیم‌آپ (همکاری با تیم‌های دیگر) ممنوع است و در روم‌های دابل و سولو تیم‌آپ کردن منجر به بن دائمی می‌شود.',
            'کیل دادن عمدی در بازی‌های کیلی ممنوع است.',
            'استفاده از هک، چیت، گلیچ (باگ بازی)، VPN یا DNS ممنوع است (در صورت نیاز، با ادمین هماهنگی کنید).',
            'استفاده از استریم مود در لابی یا مسابقات ممنوع است.',
            'استفاده از آیتم self_revive ممنوع است و هرگونه قانون‌شکنی با جریمه ۵۰ هزار تومانی و کسر جایزه دریافت‌شده همراه خواهد بود.',
            'استفاده از گان‌های بالاستیک (پوریفایر، وار ماشین، تمپست، انیهیلاتور) و شاتگان‌های رگباری از جمله Echo، R9-0، Jak-12، HS2126، Striker 9 در روم‌های بتل ممنوع است.',
            'هر بازیکن باید طبق جایگاه و شماره تیمی ثبت‌شده در سایت، در همان تیم در بازی شرکت کند. در غیر این صورت، توسط ادمین از روم حذف خواهد شد.',
            'پس از ناک‌کردن انمی، ۳۰ ثانیه فرصت دارید تا آن را فینیش کنید. در غیر این صورت، علاوه بر عدم تعلق جایزه روم، مبلغ ۵۰ هزار تومان جریمه لحاظ خواهد شد.'
        ]],
    ['🔨', 'جریمه‌ها', [
            'جریمه‌ها بسته به شدت تخلف شامل اخطار، محرومیت، کسر از حساب یا عدم دریافت جایزه خواهد بود.',
            'هرگونه اختلاف یا گزارش تخلف باید ظرف ۳۰ دقیقه پس از وقوع، به‌صورت کتبی و با مدارک معتبر از طریق پشتیبانی سایت ارسال شود. گزارش‌های پس از این زمان قابل پیگیری نیستند.',
            'بازیکنان حق ارسال گزارش‌های خود به سایر بازیکنان را ندارند.',
            'برگزارکننده حق پخش هر مسابقه را دارد. بازیکنان بدون هماهنگی با برگزارکننده حق استریم یا پخش مسابقات را ندارند.',
            'با شرکت در مسابقه، بازیکنان با جمع‌آوری و استفاده از اطلاعات شخصی خود طبق سیاست‌های حریم خصوصی موافقت می‌کنند.',
            'مسابقات و هرگونه اختلاف تحت قوانین حوزه قضایی برگزارکننده اداره می‌شود.',
            'هرگونه بی‌ادبی در ارتباط با پشتیبانی یا عوامل وار هاب منجر به مسدود شدن دائمی حساب کاربری یا جریمه نقدی خواهد شد.'
        ]]
].map(a => blk(...a)).join('');
$('privacy-list').innerHTML = [
    ['📱', 'اطلاعاتی که جمع‌آوری می‌کنیم', [
            'برای ثبت‌نام و استفاده از سایت، تنها شماره تماس شما دریافت می‌شود.',
            'برای ثبت سفارش، اطلاعات اکانت بازی شما (مانند نام کاربری و شناسه بازی) دریافت می‌شود.',
            'به جز موارد فوق، هیچ اطلاعات دیگری از شما جمع‌آوری نمی‌شود.'
        ]],
    ['💳', 'احراز هویت واریزهای بالای یک میلیون تومان', [
            'برای واریزهای بالای یک میلیون تومان، تصویر یک رضایت‌نامه کتبی، تصویر کارت شناسایی (کارت ملی یا شناسنامه) و تصویر کارت بانکی درخواست می‌شود.',
            'از تصویر کارت بانکی کافی است فقط شماره کارت و نام صاحب کارت مشخص باشد. کاربر می‌تواند سایر اطلاعات حساس کارت را بپوشاند.',
            'این فرآیند به دستور و هماهنگی پلیس فتا انجام می‌شود و صرفاً به‌منظور افزایش امنیت تراکنش‌ها و پیشگیری از کلاهبرداری است.'
        ]],
    ['👁️', 'نحوه استفاده از اطلاعات', [
            'اطلاعات جمع‌آوری‌شده تنها برای ارائه خدمات وار هاب، ثبت و پیگیری سفارشات و انجام فرآیندهای امنیتی مربوط به واریز استفاده می‌شود.',
            'اطلاعات شما برای هیچ هدف دیگری به‌کار گرفته نمی‌شود.'
        ]],
    ['🔒', 'نگهداری و امنیت اطلاعات', [
            'تمامی اطلاعات کاربران به‌صورت کاملاً امن و رمزگذاری‌شده نگهداری می‌شود.',
            'اطلاعات شما در اختیار هیچ شخص یا سازمانی قرار داده نمی‌شود.'
        ]]
].map(a => blk(...a)).join('');
const GATED = ['#/rooms', '#/panel', '#/wallet'];
const gated = () => GATED.includes(location.hash);
// ==================== Slider-puzzle captcha (the answer lives only on the server) ====================
const Captcha = (function () {
    const g = id => document.getElementById(id);
    let ch = null, ticket = null, solved = false, busy = false, frac = 0, cur = 0, t0 = 0, trail = [], drag = null;

    function setFrac(f) {
        if (!ch) return;
        frac = Math.max(0, Math.min(1, f)); cur = frac * (ch.w - ch.pw);
        const room = g('cpTrack').clientWidth - g('cpHandle').offsetWidth;
        g('cpHandle').style.left = (frac * room) + 'px';
        g('cpFill').style.width = (frac * room + g('cpHandle').offsetWidth / 2) + 'px';
        g('cpPiece').style.left = (cur / ch.w * 100) + '%';
    }
    function state(c) { g('cpBox').className = 'cp-box' + (c ? ' ' + c : ''); }
    function load() {
        solved = false; ticket = null; busy = true; state('loading'); setFrac(0); g('cpLoad').textContent = '…';
        g('cpHint').textContent = 'قطعه را به حفره‌ی هم‌شکلش ببر';
        WH.get('captcha').done(d => {
            ch = d; busy = false;
            g('cpBg').onerror = g('cpPiece').onerror = () => { state('err'); g('cpLoad').textContent = 'تصویر پازل نمایش داده نشد؛ ↻ را بزن.'; };
            g('cpBg').src = d.bg; g('cpPiece').src = d.piece;
            g('cpPiece').style.width = (d.pw / d.w * 100) + '%';
            g('cpPiece').style.top = (d.ty / d.h * 100) + '%';
            setFrac(0); state('');
        }).fail(x => { busy = false; state('err'); g('cpLoad').textContent = 'پازل بارگذاری نشد (' + (x.status || 'بدون اتصال') + '). مطمئن شو server.js جدید جایگزین شده و سرور ری‌استارت شده، بعد ↻ را بزن.'; g('cpHint').textContent = 'بارگذاری نشد'; });
    }
    function verify() {
        busy = true;
        WH.post('captcha/verify', { id: ch.id, x: Math.round(cur), t: Math.round(performance.now() - t0), trail }).done(d => {
            busy = false;
            if (d.ok) { solved = true; ticket = d.ticket; state('ok'); g('cpHint').textContent = 'تأیید شد ✓'; }
            else { state('bad'); g('cpHint').textContent = d.error || 'درست نبود'; setTimeout(load, 700); }
        }).fail(() => { busy = false; load(); });
    }
    const h = g('cpHandle');
    h.addEventListener('pointerdown', e => {
        if (busy || solved || !ch) return;
        e.preventDefault(); h.setPointerCapture(e.pointerId);
        drag = { x: e.clientX, f: frac }; t0 = performance.now(); trail = []; state('drag');
    });
    h.addEventListener('pointermove', e => {
        if (!drag) return;
        const room = g('cpTrack').clientWidth - h.offsetWidth;
        setFrac(drag.f + (e.clientX - drag.x) / room);
        if (trail.length < 600) trail.push([Math.round(performance.now() - t0), Math.round(cur)]);
    });
    const end = () => { if (!drag) return; drag = null; if (frac < 0.03) { state(''); return; } verify(); };
    h.addEventListener('pointerup', end);
    h.addEventListener('pointercancel', end);
    g('cpRefresh').onclick = () => { if (!busy) load(); };
    return { load, reset: load, get ticket() { return solved ? ticket : null; } };
})();
// ==================== Auth (shared login/signup — navbar + the gate on #/rooms) ====================
const Auth = (function () {
    const FA = '۰۱۲۳۴۵۶۷۸۹';
    let phone = null, name = '', known = false;
    const listeners = [];
    const fire = () => listeners.forEach(fn => fn(phone));

    function paintNav() {
        const el = $('navAuth');
        if (!el) return;
        el.innerHTML = phone
            ? `<a class="nb web acc" href="#/panel"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 4-6 8-6s8 2 8 6"></path></svg><span>${String(name || 'حساب من').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))}</span></a><button class="nb dl" id="navLogout" type="button"><span>خروج</span></button>`
            : `<button class="nb dl" id="navSignup" type="button"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M19 8v6M22 11h-6"></path></svg><span>ثبت‌نام</span></button><button class="nb web" id="navLogin" type="button"><svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewbox="0 0 24 24"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><path d="M10 17l5-5-5-5"></path><path d="M15 12H3"></path></svg><span>ورود</span></button>`;
    }

    function openModal(msg) {
        $('rmLoginMsg').textContent = msg || 'برای ادامه، شماره موبایلت رو وارد کن؛ اگه قبلاً ثبت‌نام نکرده باشی، خودکار برات حساب ساخته میشه.';
        $('rmLoginErr').hidden = true;
        $('rmLogin').hidden = false;
        Captcha.load();
        $('rmPhone').focus();
    }
    function closeModal() { $('rmLogin').hidden = true; $('rmLoginErr').hidden = true; }

    function submit() {
        if (!Captcha.ticket) { $('rmLoginErr').textContent = 'اول پازل امنیتی را حل کن.'; $('rmLoginErr').hidden = false; return; }
        WH.post('login', { phone: $('rmPhone').value.trim(), invite: ($('rmInvite') ? $('rmInvite').value.trim() : ''), captcha: Captcha.ticket }).done(d => {
            phone = d.phone; name = d.name || ''; known = true;
            closeModal(); $('rmPhone').value = ''; if ($('rmInvite')) $('rmInvite').value = '';
            paintNav(); fire();
            if (gated()) route();
        }).fail(x => {
            $('rmLoginErr').textContent = (x.responseJSON && x.responseJSON.error) || 'خطا در ورود';
            $('rmLoginErr').hidden = false;
            Captcha.reset(); // every ticket is single-use
        });
    }
    function logout() {
        WH.post('logout-player', {}).always(() => {
            phone = null; name = ''; known = true;
            paintNav(); fire();
            if (gated()) { history.replaceState(null, '', '#hero'); route(); }
        });
    }
    function whoami(cb) {
        WH.get('whoami').done(d => { phone = d.phone || null; name = d.name || ''; known = true; paintNav(); if (phone) fire(); cb && cb(); })
            .fail(() => { phone = null; name = ''; known = true; paintNav(); cb && cb(); });
    }

    document.addEventListener('click', e => {
        if (e.target.closest('#navSignup') || e.target.closest('#navLogin') || e.target.closest('#heroSignup') || e.target.closest('#heroLogin')) openModal();
        if (e.target.closest('#navLogout')) logout();
    });
    $('rmLoginClose').onclick = closeModal;
    $('rmLogin').addEventListener('click', e => { if (e.target.id === 'rmLogin') closeModal(); });
    $('rmLoginBtn').onclick = submit;
    $('rmPhone').addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });

    return {
        get phone() { return phone; },
        get known() { return known; },
        setName: n => { name = n || ''; paintNav(); },
        openModal, closeModal, logout, whoami, onChange: fn => listeners.push(fn),
    };
})();

// router: main page sections vs separate pages
function baseRoute() {
    const h = location.hash, m = h.match(/^#\/(\w+)/), pg = m && $('p-' + m[1]);
    document.querySelectorAll('.page').forEach(p => p.hidden = true);
    $('home').hidden = !!pg;
    if (pg) {
        pg.hidden = false;
        scrollTo(0, 0);
        if (pg.id === 'p-panel' && window.PanelLoad) window.PanelLoad();
        if (pg.id === 'p-wallet' && window.WalletLoad) window.WalletLoad();
        return;
    }
    let t = null;
    try {
        t = h.length > 1 ? document.querySelector(h) : null;
    }
    catch (e) {
    }
    t ? t.scrollIntoView() : scrollTo(0, 0);
}
// #/rooms is gated: only signed-in players may see it; everyone else gets sent to the login/signup modal
function route() {
    if (gated()) {
        const isPanel = location.hash === '#/panel', isWallet = location.hash === '#/wallet';
        if (!Auth.known) return Auth.whoami(route);
        if (!Auth.phone) {
            history.replaceState(null, '', '#hero');
            baseRoute();
            Auth.openModal(isWallet ? 'برای دیدن کیف پول، اول وارد شو یا ثبت‌نام کن.' : isPanel ? 'برای ورود به پنل کاربری، اول وارد شو یا ثبت‌نام کن.' : 'برای دیدن و ثبت‌نام توی روم‌ها، اول باید وارد بشی یا ثبت‌نام کنی.');
            return;
        }
    }
    baseRoute();
}
addEventListener('hashchange', route);
route();
Auth.whoami();
$('burger').onclick = () => $('navlinks').classList.toggle('open');
document.querySelectorAll('.navlinks a').forEach(a => a.onclick = () => $('navlinks').classList.remove('open'));

// ---- reveal on scroll ----
const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
    }
}), { threshold: .12 });
function watch() {
    document.querySelectorAll('.rv:not(.in)').forEach(el => io.observe(el));
}

// ---- reviews ----
const REV = [
    [5, 'علی احمدی', 'لیدر کلن', 'هر هفته با کلنمون تو لیگ‌ها حضور داریم. رتبه‌بندی منظم و برخورد جدی با چیتر واقعاً به چشم میاد. خسته نباشید!'],
    [5, 'محمد کریمی', 'گیمر', 'قیمت CP اینجا از جاهای دیگه بهتره و سریع تحویل میدن. اکانتمو هم از همینجا گرفتم و معامله بی‌دغدغه انجام شد.'],
    [5, 'سارا محمدی', 'استریمر', 'روم‌های رایگانش خیلی خوبه؛ بی‌هزینه شرکت میکنی و جایزه هم میگیری. پشتیبانی هم با حوصله و حرفه‌ای جواب میده.'],
    [5, 'رضا نوری', 'پلیر حرفه‌ای', 'جایزه‌هام هر بار سریع به حسابم نشسته. مسابقه تو هر ساعتی هست و رقیب همیشه پیدا میشه.'],
    [5, 'نیما صادقی', 'کاستوم‌کار', 'تو رومایی که بودم تا الان خبری از تقلب نبوده و رقابت‌ها رو منصفانه حس کردم.'],
    [5, 'کیانا رحیمی', 'گیمر', 'برنامه‌ش روان و خوش‌ظاهره. ثبت‌نام راحت بود و چند دقیقه بعد تو اولین مسابقه بودم.']
];
let ri = 0, rt;
const fa = n => (+n).toLocaleString('fa-IR', { minimumIntegerDigits: 2 });
function renderRev(swap) {
    const r = REV[ri];
    $('rmain').innerHTML = `<div class="rsw${swap ? ' go' : ''}"><span class="bigq">❞</span><div class="stars">${'★'.repeat(r[0])}<span class="off">${'★'.repeat(5 - r[0])}</span></div><p>${r[3]}</p><div class="rwho"><div><b>${r[1]}</b><small>${r[2]}</small></div><span class="ver">✓ بازیکن تأییدشده</span></div></div><div class="rprog"><i></i></div>`;
    $('rlist').innerHTML = REV.map((x, i) => `<button class="ritem${i === ri ? ' on' : ''}" data-i="${i}"><span><b>${x[1]}</b><small>${x[2]}</small></span></button>`).join('');
    const on = $('rlist').querySelector('.on');
    if (on && innerWidth > 900)
        $('rlist').scrollTop = on.offsetTop - $('rlist').offsetTop - 8;
    $('rcount').innerHTML = `<b>${fa(ri + 1)}</b> / ${fa(REV.length)}`;
}
function goRev(d) {
    ri = (ri + d + REV.length) % REV.length;
    renderRev(1);
}
$('rprev').onclick = () => {
    goRev(-1);
    resetRev();
};
$('rnext').onclick = () => {
    goRev(1);
    resetRev();
};
$('rlist').onclick = e => {
    const b = e.target.closest('.ritem');
    if (b) {
        ri = +b.dataset.i;
        renderRev(1);
        resetRev();
    }
};
function resetRev() {
    clearInterval(rt);
    rt = setInterval(() => goRev(1), 6000);
}
renderRev();
resetRev();
// published reviews come from the server (falls back to the list above if the API is unreachable)
const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
WH.get('reviews').done(L => {
    if (Array.isArray(L) && L.length) {
        REV.length = 0;
        L.forEach(i => REV.push([Math.min(5, Math.max(1, +i.stars || 5)), esc(i.name), esc(i.role || 'بازیکن'), esc(i.text)]));
        ri = 0;
        renderRev();
        resetRev();
    }
});
// submit a review -> goes to the admin approval queue
(function () {
    const f = $('rf'), btn = $('rfb');
    if (!f)
        return;
    let rate = 5;
    const paint = n => $('rstar').querySelectorAll('button').forEach(b => b.classList.toggle('on', +b.dataset.v <= n));
    paint(rate);
    $('rstar').addEventListener('click', e => {
        const b = e.target.closest('button');
        if (b)
            paint(rate = +b.dataset.v);
    });
    $('rstar').addEventListener('mouseover', e => {
        const b = e.target.closest('button');
        if (b)
            paint(+b.dataset.v);
    });
    $('rstar').addEventListener('mouseleave', () => paint(rate));
    btn.addEventListener('click', () => {
        const bad = [], chk = (el, ok) => {
            const w = el.closest('.fl') || el;
            w.classList.remove('bad');
            if (!ok) {
                void w.offsetWidth;
                w.classList.add('bad');
                bad.push(w);
            }
        };
        chk($('rn'), $('rn').value.trim().length > 2);
        chk($('rm'), $('rm').value.trim().length >= 10);
        if (bad.length)
            return bad[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
        btn.classList.add('sending');
        jQuery.ajax({
            url: '/api/reviews', method: 'POST', contentType: 'application/json', timeout: 10000,
            data: JSON.stringify({ stars: rate, name: $('rn').value, role: $('rr').value, text: $('rm').value })
        }).done(() => {
            btn.classList.replace('sending', 'done');
            setTimeout(() => {
                btn.classList.remove('done');
                f.reset();
                paint(rate = 5);
            }, 3000);
        }).fail(x => {
            btn.classList.remove('sending');
            alert((x.responseJSON && x.responseJSON.error) || 'ارسال انجام نشد؛ دوباره تلاش کنید.');
        });
    });
})();

// ---- features spotlight / phone tilt / countdown ----
document.querySelectorAll('.feat').forEach(f => f.addEventListener('pointermove', e => {
    const r = f.getBoundingClientRect();
    f.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    f.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));
(() => {
    const p = $('phones');
    if (!p || matchMedia('(hover:none)').matches)
        return;
    p.addEventListener('pointermove', e => {
        const r = p.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        p.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 12}deg)`;
    });
    p.addEventListener('pointerleave', () => p.style.transform = '');
})();
(() => {
    let t = 14 * 60 + 58;
    const el = $('tm');
    if (!el)
        return;
    setInterval(() => {
        if (document.hidden) return;
        t = t > 0 ? t - 1 : 15 * 60;
        const m = Math.floor(t / 60), c = t % 60;
        el.textContent = '۰۰:' + fa(m) + ':' + fa(c);
    }, 1000);
})();

// ---- faq ----
const FAQ = [
    ['چجوری تو مسابقات شرکت کنم؟', 'وارد سایت وار هاب شو، با شمارهٔ موبایلت حساب بساز و از بین روم‌ها و تورنمنت‌ها یکی رو انتخاب و ثبت‌نام کن.'],
    ['جوایز چجوری واریز میشه؟', 'وقتی مسابقه تموم شد و نتایج تأیید شد، جایزه خودکار به کیف پولت اضافه میشه و میتونی همون موقع برداشتش کنی.'],
    ['روم‌های رایگان واقعاً بدون هزینه‌ان؟', 'بله، ورود به این روم‌ها کاملاً رایگانه و برنده‌ها جایزهٔ واقعی میگیرن.'],
    ['چجوری کنترل میکنید تقلب نشه؟', 'با یک سامانهٔ هوشمند تشخیص چیت و رسیدگی به گزارش‌های کاربران جلوی تقلب رو میگیریم و خاطیان از مسابقات کنار گذاشته میشن.'],
    ['خرید و فروش اکانت امنه؟', 'معامله‌ها زیر نظر وار هاب انجام میشن و پول تا لحظهٔ تأیید نهایی خریدار نزد پلتفرم امانت می‌مونه.'],
    ['از نظر قانونی و شرعی مشکلی نداره؟', 'جزئیات کامل در صفحهٔ قوانین آمده. اگه سؤال بیشتری داشتی از بخش تماس با ما پیگیری کن.'],
    ['اگه مشکلی پیش بیاد پولم برمیگرده؟', 'اگه خطا از طرف پلتفرم باشه، بعد از بررسی مبلغ به حسابت برمیگرده. برای پیگیری، از فرم صفحهٔ «تماس با ما» همین سایت پیام بده.']
];
const CATS = ['همه', 'مسابقات', 'پرداخت', 'امنیت', 'اکانت'];
const FC = [1, 1, 1, 2, 3, 3, 2];
const FCAT = [1, 2, 1, 3, 4, 3, 2];
$('fxtabs').innerHTML = CATS.map((c, i) => `<button type="button" data-c="${i}" class="${i ? '' : 'on'}">${c}</button>`).join('');
$('faqlist').innerHTML = FAQ.map((f, i) => `<div class="fq" data-c="${FCAT[i]}"><button type="button" aria-expanded="false"><span class="n">۰${i + 1}</span><span class="t">${f[0]}</span><span class="ar">⌄</span></button><div class="ans"><div><p>${f[1]}</p></div></div></div><!---->`.replace('<!---->', '')).join('') + '<div class="fx-empty" id="fxe" hidden>نتیجه‌ای پیدا نشد 🤔</div>';
let fc = 0;
const fxf = () => {
    const q = $('fxq').value.trim();
    let n = 0;
    document.querySelectorAll('.fq').forEach(el => {
        const ok = (!fc || +el.dataset.c === fc) && (!q || el.textContent.includes(q));
        el.classList.toggle('hide', !ok);
        if (ok)
            n++;
    });
    $('fxe').hidden = n > 0;
};
$('fxq').oninput = fxf;
$('fxtabs').onclick = e => {
    const b = e.target.closest('button');
    if (!b)
        return;
    fc = +b.dataset.c;
    document.querySelectorAll('#fxtabs button').forEach(x => x.classList.toggle('on', x === b));
    fxf();
};
$('faqlist').onclick = e => {
    const q = e.target.closest('.fq');
    if (!q)
        return;
    const o = q.classList.contains('open');
    document.querySelectorAll('.fq.open').forEach(x => {
        x.classList.remove('open');
        x.firstChild.setAttribute('aria-expanded', 'false');
    });
    if (!o) {
        q.classList.add('open');
        q.firstChild.setAttribute('aria-expanded', 'true');
    }
};
// hero count-up
const hio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting)
        return;
    hio.unobserve(e.target);
    const t = +e.target.dataset.n, d = +e.target.dataset.d || 0, sf = e.target.dataset.s;
    const t0 = performance.now();
    (function f(now) {
        const p = Math.min(1, (now - t0) / 1600), v = t * (1 - Math.pow(1 - p, 3));
        e.target.textContent = (d ? v.toFixed(d) : Math.round(v)) + sf;
        if (p < 1)
            requestAnimationFrame(f);
    })(t0);
}), { threshold: .5 });
document.querySelectorAll('.hc b[data-n]').forEach(b => hio.observe(b));
// reveal targets on existing content
document.querySelectorAll('#features .card,#services .card,.stat').forEach(e => e.classList.add('rv'));
watch();

// ---- blood nav indicator ----
(function () {
    const ul = $('navlinks'), links = [...ul.querySelectorAll('a')];
    const blood = document.createElement('span');
    blood.id = 'blood';
    ul.prepend(blood);
    let cur = null, lock = 0;
    const byHref = h => links.find(a => a.getAttribute('href') === h) || null;
    function place(a) {
        links.forEach(l => l.classList.toggle('act', l === a));
        if (!a || innerWidth <= 900) {
            blood.classList.remove('show');
            cur = null;
            return;
        }
        const ur = ul.getBoundingClientRect(), r = a.getBoundingClientRect();
        const first = !blood.classList.contains('show');
        if (first) {
            blood.style.transition = 'none';
        }
        blood.style.width = (r.width + 32) + 'px';
        blood.style.left = (r.left - ur.left - 16) + 'px';
        if (first) {
            blood.offsetWidth;
            blood.style.transition = '';
        }
        blood.classList.add('show');
        if (cur !== a) {
            blood.classList.remove('splash');
            blood.offsetWidth;
            blood.classList.add('splash');
        }
        cur = a;
    }
    const ORDER = ['hero', 'features', 'services', 'app', 'reviews', 'faq'];
    function spy() {
        if (Date.now() < lock)
            return;
        const m = location.hash.match(/^#\/\w+/);
        if (m)
            return place(byHref(m[0]));
        if ($('home').hidden)
            return;
        let id = null;
        for (const k of ORDER) {
            const el = $(k);
            if (el && el.getBoundingClientRect().top <= 170)
                id = k;
        }
        place(byHref('#' + (id || 'hero')));
    }
    let tick = false;
    addEventListener('scroll', () => {
        if (Date.now() < lock || tick)
            return;
        tick = true;
        requestAnimationFrame(() => {
            tick = false;
            spy();
        });
    }, { passive: true });
    addEventListener('hashchange', spy);
    addEventListener('resize', () => {
        cur = null;
        spy();
    });
    links.forEach(a => a.addEventListener('click', () => {
        lock = Date.now() + 900;
        place(a);
        setTimeout(spy, 950);
    }));
    document.fonts && document.fonts.ready.then(() => {
        cur = null;
        spy();
    });
    addEventListener('load', () => {
        cur = null;
        spy();
    });
    spy();
})();
// mouse glow
const glow = $('glow');
addEventListener('mousemove', e => {
    glow.style.opacity = 1;
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});
addEventListener('mouseleave', () => glow.style.opacity = 0);
// particles (slightly larger than before)
const canvas = $('bg'), ctx = canvas.getContext('2d');
function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
addEventListener('resize', resize);
const SHAPES = ['◇', '✦', '○', '✧'], particles = [];
// fixed seed: the same layout and the same motion on every refresh
function seeded(seed) {
    return function () {
        seed |= 0;
        seed = seed + 0x6D2B79F5 | 0;
        let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
const rnd = seeded(20240101);
const LITE = matchMedia('(max-width: 900px), (pointer: coarse)').matches; // phones: fewer particles, lower frame rate
for (let i = 0; i < (LITE ? 26 : 55); i++)
    particles.push({
        x: rnd() * canvas.width, y: rnd() * canvas.height,
        vx: 0, vy: -(.08 + rnd() * .1), // everyone drifts upward, same direction
        ox: 0, oy: 0, // push offset caused by the mouse
        r: rnd() * 2.2 + 1.5, type: (LITE || rnd() < .7) ? 'dot' : 'glyph', // glyph text is the costly part: dots only on phones
        glyph: SHAPES[Math.floor(rnd() * SHAPES.length)],
        alpha: rnd() * .5 + .25, size: rnd() * 14 + 13
    });
// mouse repel
const mouse = { x: -9999, y: -9999 }, REPEL = 150;
addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
addEventListener('mouseleave', () => {
    mouse.x = mouse.y = -9999;
});
document.addEventListener('mouseleave', () => {
    mouse.x = mouse.y = -9999;
});
let lastT = 0, scrolling = false, scrollT = 0;
addEventListener('scroll', () => { scrolling = true; clearTimeout(scrollT); scrollT = setTimeout(() => { scrolling = false; }, 140); }, { passive: true });
function draw(t) {
    requestAnimationFrame(draw);
    if (document.hidden || (LITE && (t - lastT < 50 || scrolling))) return; // ~20fps on phones; nothing while the tab is hidden or the page is scrolling
    lastT = t;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)
            p.x = canvas.width;
        if (p.x > canvas.width)
            p.x = 0;
        if (p.y < 0)
            p.y = canvas.height;
        if (p.y > canvas.height)
            p.y = 0;
        // move away from the cursor, then ease back
        const dx = p.x + p.ox - mouse.x, dy = p.y + p.oy - mouse.y, d = Math.hypot(dx, dy);
        if (d < REPEL && d > 0) {
            const f = (1 - d / REPEL) * 2.4;
            p.ox += dx / d * f;
            p.oy += dy / d * f;
        }
        p.ox *= .94;
        p.oy *= .94;
        const x = p.x + p.ox, y = p.y + p.oy;
        ctx.globalAlpha = p.alpha;
        if (p.type === 'dot') {
            ctx.fillStyle = '#ff2b3b';
            ctx.beginPath();
            ctx.arc(x, y, p.r, 0, 7);
            ctx.fill();
        }
        else {
            ctx.fillStyle = 'rgba(255,60,70,.55)';
            ctx.font = p.size + 'px sans-serif';
            ctx.fillText(p.glyph, x, y);
        }
    }
    ctx.globalAlpha = 1;
}
requestAnimationFrame(draw);

// ===== v3 =====
(function () {
    const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    }), { threshold: .15 });
    // features bento
    const F = $('g-features');
    F.className = 'bento';
    const dots = '<div class="dots">' + Array.from({ length: 24 }, (_, i) => `<i style="animation-delay:${i * .1}s"></i>`).join('') + '</div>';
    const FD = [
        ['a', '⚔️', 'تورنمنت‌های رسمی', 'هر روز ده‌ها مسابقهٔ پرهیجان با جوایز نقدی بزرگ؛ از کاستوم‌های رایگان تا لیگ‌های سنگین.', ''],
        ['b', '🎁', 'ورود رایگان', 'برای شروع پولی لازم نیست. وارد روم‌های رایگان شو، خودتو ثابت کن و جایزهٔ واقعی ببر.', '<div class="big">FREE<small>ENTRY</small></div>'],
        ['c', '🏆', 'جایزهٔ نقدی', 'بعد از پیروزی، جایزه سریع و بدون معطلی به کیف پولت میرسه و قابل برداشته.', '<div class="big">⚡<small>آنی</small></div>'],
        ['d', '🛡️', 'مقابله با تقلب', 'سامانهٔ هوشمند تشخیص چیتر و بررسی گزارش‌ها، رقابتی عادلانه و تمیز رو برات حفظ می‌کنه.', '<div class="shield">🛡️</div>'],
        ['e', '📱', 'همه دستگاه‌ها', 'با هر دستگاهی که داری، موبایل، تبلت یا کامپیوتر، از مرورگر وارد شو و بازی کن. نیازی به نصب نیست.', '<div class="devs"><span>📱</span><span>🌐</span><span>💻</span></div>'],
        ['f', '📶', 'رقابت بی‌وقفه', 'صبح یا نصفه‌شب، فرقی نمیکنه؛ همیشه یه روم باز و رقیب آماده پیدا میشه.', dots]
    ];
    F.innerHTML = FD.map((d, i) => `<div class="bt ${d[0]}" style="transition-delay:${i * .08}s"><span class="no">0${i + 1}</span><div class="ic">${d[1]}</div><h3>${d[2]}</h3><p>${d[3]}</p>${d[4] ? `<div class="vz">${d[4]}</div>` : ''}</div>`).join('');
    F.querySelectorAll('.bt').forEach(c => {
        io.observe(c);
        c.onmousemove = e => {
            const r = c.getBoundingClientRect();
            c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
            c.style.setProperty('--my', (e.clientY - r.top) + 'px');
        };
    });
    // services showcase
    const SV = [
        ['🪙', 'فروشگاه CP', 'سی‌پی کالاف دیوتی موبایل رو با قیمتی مناسب و تحویل آنی تهیه کن؛ سریع و قابل اعتماد.', 'محبوب'], ['📦', 'محصولات فیزیکی', 'کنترلر، هدست و سایر لوازم جانبی اورجینال، همراه با گارانتی.', 'تازه'], ['🔁', 'خرید و فروش اکانت', 'اکانت‌های قوی رو با اطمینان بخر یا بفروش. وار هاب به‌عنوان واسطه، امنیت معامله‌ت رو تضمین میکنه.', 'مطمئن'], ['✅', 'امنیت و قانونی بودن', 'همهٔ تراکنش‌ها با نظارت تیم حقوقی ثبت و پیگیری میشن؛ خیالت از بابت معامله راحت باشه.', 'تضمین‌شده'], ['🛒', 'فروشگاه آیتم درون‌بازی', 'اسکین، باندل و آیتم‌های خاص رو بی‌واسطه از فروشگاه خود وار هاب بگیر.', 'گسترده'], ['⚖️', 'مسابقات عادلانه', 'مقررات روشن، داوری بی‌طرفانه و رتبه‌بندی دقیق؛ اینجا فقط توانایی تو تعیین‌کننده‌ست.', 'بی‌طرف']
    ];
    const S = $('g-services');
    S.className = 'sv';
    S.innerHTML = '<div class="sv-d" id="svd"></div><div class="sv-l" id="svl">' + SV.map((v, i) => `<button type="button" class="sv-i" data-i="${i}"><span class="ic">${v[0]}</span><span>${v[1]}</span><i></i></button>`).join('') + '</div>';
    let cur = 0, tm, manual = false;
    const sel = i => {
        cur = i;
        const v = SV[i];
        $('svd').innerHTML = `<span class="big-ic">${v[0]}</span><span class="tg">${v[3]}</span><h3>${v[1]}</h3><p>${v[2]}</p>`;
        S.querySelectorAll('.sv-i').forEach((b, k) => {
            b.classList.remove('on');
            if (k === i) {
                void b.offsetWidth;
                b.classList.add('on');
            }
        });
        clearInterval(tm);
        tm = setInterval(() => {
            if (!manual)
                sel((cur + 1) % SV.length);
        }, 5000);
        const l = $('svl');
        if (l.scrollWidth > l.clientWidth + 2) {
            const b = l.children[i].getBoundingClientRect(), c = l.getBoundingClientRect();
            l.scrollBy({ left: (b.left + b.width / 2) - (c.left + c.width / 2), behavior: 'smooth' });
        }
    };
    (() => {
        const l = $('svl');
        let down = false, sx = 0, sl = 0, moved = false;
        l.addEventListener('touchstart', () => {
            manual = true;
        }, { passive: true });
        l.addEventListener('mousedown', e => {
            down = true;
            moved = false;
            sx = e.clientX;
            sl = l.scrollLeft;
            l.classList.add('drag');
        });
        window.addEventListener('mousemove', e => {
            if (!down)
                return;
            const dx = e.clientX - sx;
            if (Math.abs(dx) > 5) {
                moved = true;
                manual = true;
            }
            if (moved) {
                l.scrollLeft = sl - dx;
                e.preventDefault();
            }
        });
        window.addEventListener('mouseup', () => {
            down = false;
            l.classList.remove('drag');
        });
        l.addEventListener('click', e => {
            if (moved) {
                moved = false;
                e.stopPropagation();
                return;
            }
            const b = e.target.closest('.sv-i');
            if (b) {
                manual = false;
                sel(+b.dataset.i);
            }
        }, true);
    })();
    sel(0);
})();

// ===== contact =====
(function () {
    const f = $('cf');
    if (!f)
        return;
    const m = $('cm'), btn = $('cfb');
    const dg = v => String(v).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
    m.addEventListener('input', () => {
        $('ccnt').textContent = dg(m.value.length) + ' / ۶۰۰';
    });
    f.addEventListener('click', e => {
        if (e.target.closest('.bad'))
            e.target.closest('.bad').classList.remove('bad');
    });
    document.querySelectorAll('.cp').forEach(b => b.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        try {
            navigator.clipboard.writeText(b.dataset.c);
        }
        catch (_) {
        }
        b.classList.add('ok');
        b.lastChild.textContent = 'کپی شد ✓';
        setTimeout(() => {
            b.classList.remove('ok');
            b.lastChild.textContent = 'کپی';
        }, 1600);
    }));
    btn.addEventListener('click', () => {
        const bad = [];
        const chk = (el, ok) => {
            const w = el.closest('.fl') || el;
            w.classList.remove('bad');
            if (!ok) {
                void w.offsetWidth;
                w.classList.add('bad');
                bad.push(w);
            }
        };
        chk($('cdp'), !!f.querySelector('input[name=d]:checked'));
        chk($('cn'), $('cn').value.trim().length > 2);
        chk($('cph'), /^[\d+\s-]{7,}$/.test($('cph').value.trim()));
        chk(m, m.value.trim().length >= 10);
        if (bad.length) {
            bad[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
            return;
        }
        btn.classList.add('sending');
        WH.sendContact({
            dept: f.querySelector('input[name=d]:checked').value,
            name: $('cn').value, phone: $('cph').value, message: m.value
        }).done(() => {
            btn.classList.replace('sending', 'done');
            setTimeout(() => {
                btn.classList.remove('done');
                f.reset();
                $('ccnt').textContent = '۰ / ۶۰۰';
            }, 2500);
        }).fail(x => {
            btn.classList.remove('sending');
            alert((x.responseJSON && x.responseJSON.error) || 'ارسال انجام نشد؛ دوباره تلاش کنید.');
        });
    });
})();

// ===== timeline =====
(function () {
    const T = $('tlx');
    if (!T)
        return;
    const items = [...T.querySelectorAll('.ti')], f = $('tlf');
    let q = 0;
    function upd() {
        q = 0;
        const r = T.getBoundingClientRect();
        if (!r.height)
            return;
        const mid = innerHeight * .6;
        const p = Math.max(0, Math.min(1, (mid - r.top) / r.height));
        f.style.height = (p * 100) + '%';
        items.forEach(i => {
            const b = i.querySelector('.nd').getBoundingClientRect();
            i.classList.toggle('on', b.top < mid);
        });
    }
    const req = () => {
        if (!q) {
            q = 1;
            requestAnimationFrame(upd);
        }
    };
    addEventListener('scroll', req, { passive: true });
    addEventListener('resize', req);
    addEventListener('hashchange', () => setTimeout(req, 100));
    setTimeout(req, 300);
})();

// ==================== Rooms (web version of the app) ====================
(function () {
    if (!$('p-rooms')) return;
    const FA = '۰۱۲۳۴۵۶۷۸۹';
    const fa = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '٬').replace(/\d/g, d => FA[d]);
    const faD = n => String(n).replace(/\d/g, d => FA[d]);
    const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const MODES = [['all', 'همه'], ['br', 'Battle Royale'], ['mp', 'Multiplayer'], ['duel', 'دوئل'], ['cr', 'Clash Royale'], ['rt', 'رنکینگ و تورنومنت'], ['kill', 'هر کیل']];
    const F0 = { team: 0, prize: 'all', fee: 'all', maxFee: null, minPrize: 0, openOnly: false, sort: 'new', q: '' };
    let F = Object.assign({}, F0);

    let rooms = [], myPhone = null, filterMode = 'all', openId = null, pickedSlot = null, detTab = 'room', poll = null;
    let pickedRow = null, regType = null, teamInfo = null; // regType: null (not asked yet) | 'solo' | 'team'

    function toast(t) {
        const e = document.createElement('div');
        e.className = 'rm-to';
        e.textContent = t;
        $('rmToasts').appendChild(e);
        setTimeout(() => e.remove(), 2600);
    }

    function renderIdBar() {
        $('rmId').innerHTML = ''; // phone + logout removed from this bar (logout stays in the navbar)
    }

    // ---- icons, filter predicates and the "advanced" search chrome ----
    const rIc = (p, w) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w || 2}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
    const RMI = {
        all: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
        br: '<circle cx="12" cy="12" r="7.5"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',
        mp: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14.3c2.6.1 4.3 1.9 4.3 4.7"/>',
        duel: '<path d="M4 4l9 9M20 4l-9 9M11 13l-4 4M13 13l4 4M5 19l2-2M19 19l-2-2"/>',
        cr: '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
        kill: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
        trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4"/><path d="M12 13v4M8 20h8"/>',
        coin: '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4"/><path d="M12 7v1.5M12 15.5V17"/>',
        clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
        gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v8h14v-8"/><path d="M12 8c-1.5-3.5-5-3.5-5-1.2C7 8 9 8 12 8zM12 8c1.5-3.5 5-3.5 5-1.2C17 8 15 8 12 8z"/>',
        bolt: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>'
    };
    RMI.rt = RMI.trophy; // one chip for both ranking and tournament rooms
    const SORTS = { new: 'جدیدترین', fee: 'ورودی کمتر', prize: 'جایزه بیشتر', seats: 'جای خالی بیشتر' };
    const prizeOf = r => r.prize || r.perKill || 0;
    const textOk = r => { const q = F.q.trim().toLowerCase(); return !q || (r.title + ' ' + r.modeLabel + ' ' + (r.desc || '')).toLowerCase().includes(q); };
    const baseOk = r => (!F.team || r.teamSize === F.team) && (F.prize === 'all' || r.prizeType === F.prize) &&
        (F.fee === 'all' || (F.fee === 'free' ? !r.fee : !!r.fee)) && (F.maxFee == null || (r.fee || 0) <= F.maxFee) &&
        (!F.minPrize || prizeOf(r) >= F.minPrize) && (!F.openOnly || (r.open && !r.finished && r.count < r.max)) && textOk(r);
    const modeOk = (r, m) => m === 'all' || (m === 'kill' ? r.prizeType === 'perKill' : r.mode === m);
    // active filters as [key, label] pairs (used for the removable chips under the search bar)
    const activeList = () => {
        const a = [];
        if (F.q.trim()) a.push(['q', '«' + F.q.trim() + '»']);
        if (F.team) a.push(['team', F.team === 1 ? 'تک‌نفره' : faD(F.team) + ' اسلات']);
        if (F.prize !== 'all') a.push(['prize', F.prize === 'fixed' ? 'جایزه ثابت' : 'هر کیل']);
        if (F.fee !== 'all') a.push(['fee', F.fee === 'free' ? 'رایگان' : 'ورودی‌دار']);
        if (F.maxFee != null) a.push(['maxFee', 'ورودی تا ' + fa(F.maxFee)]);
        if (F.minPrize) a.push(['minPrize', 'جایزه از ' + fa(F.minPrize)]);
        if (F.openOnly) a.push(['openOnly', 'فقط باز']);
        if (F.sort !== 'new') a.push(['sort', SORTS[F.sort]]);
        return a;
    };
    const activeCount = () => activeList().filter(x => x[0] !== 'q').length;
    const caps = () => ({ fee: Math.max(0, ...rooms.map(r => r.fee || 0)), prize: Math.max(0, ...rooms.map(prizeOf)) });
    const stepFor = c => c <= 20000 ? 1000 : c <= 100000 ? 5000 : c <= 500000 ? 10000 : 50000;
    const ceilTo = (c, s) => Math.ceil(c / s) * s;

    // mode chips: icon + name + how many rooms match the other filters
    function renderFilters() {
        const box = $('rmFilters'), sc = box.scrollLeft, pool = rooms.filter(baseOk);
        box.innerHTML = MODES.map(([k, l]) => {
            const n = pool.filter(r => modeOk(r, k)).length;
            return `<button type="button" data-m="${k}" class="rm-mc${k === filterMode ? ' on' : ''}${rooms.length && !n ? ' zero' : ''}"><span class="mi">${rIc(RMI[k])}</span><span>${l}</span>${rooms.length ? `<em>${faD(n)}</em>` : ''}</button>`;
        }).join('');
        box.scrollLeft = sc;
    }
    // removable chips for every active filter + live result count
    function renderActive() {
        const box = $('rmActive'), L = activeList();
        box.hidden = !L.length;
        if (!L.length) { box.innerHTML = ''; return; }
        box.innerHTML = `<span class="rm-rc"><b>${faD(visible().length)}</b> روم</span>` +
            L.map(([k, t]) => `<button type="button" class="rm-ac" data-x="${k}"><span>${esc(t)}</span><i>✕</i></button>`).join('') +
            '<button type="button" class="rm-acl" data-x="all">پاک کردن همه</button>';
    }
    const syncClr = () => { $('rmQClr').hidden = !F.q; };
    function renderChrome() {
        const c = activeCount(), dot = $('rmFilterDot');
        dot.hidden = !c; dot.textContent = faD(c);
        renderFilters(); renderActive(); syncClr();
    }

    const statusOf = r => r.finished ? { t: 'پایان‌یافته', c: 'done' } : !r.open ? { t: 'ثبت‌نام بسته', c: 'closed' } : r.count >= r.max ? { t: 'تکمیل', c: 'closed' } : { t: 'باز', c: 'open' };
    const prizeText = r => r.prizeType === 'perKill' ? `هر کیل ${fa(r.perKill)}` : fa(r.prize);
    const slotText = n => n === 1 ? 'تک‌نفره (۱ اسلات)' : `${faD(n)} اسلات در هر ردیف`;
    const modeName = k => (MODES.find(m => m[0] === k) || [])[1] || k;
    const filtersActive = () => activeList().length > 0;

    function cardHtml(r) {
        const st = statusOf(r), kill = r.prizeType === 'perKill', bg = r.bg ? `url('${esc(r.bg)}')` : `linear-gradient(135deg,${esc(r.color || '#E10E0E')},#0c0507 85%)`;
        return `<div class="rm-card" data-id="${r.id}" tabindex="0">
      <div class="rm-cbg" style="background-image:${bg}"></div><div class="rm-shade"></div>
      <div class="rm-cbody">
        <div class="rm-ctop"><span class="rm-tag">${esc(r.modeLabel)}</span><span class="rm-st ${st.c}">${st.t}</span></div>
        <h3>${esc(r.title)}</h3>
        <div class="rm-badges"><span>${slotText(r.teamSize || 4)}</span>${r.teamOnly ? '<span class="tm">👥 فقط تیمی</span>' : ''}${kill ? '<span class="kill">🎯 هر کیل</span>' : ''}</div>
        <div class="rm-stats">
          <div><small>ورودی</small><b>${r.fee ? fa(r.fee) : 'رایگان'}</b></div>
          <div class="pz"><small>${kill ? 'مبلغ هر کیل' : 'جایزه'}</small><b>${fa(kill ? r.perKill : r.prize)}</b></div>
          <div><small>ظرفیت</small><b>${faD(r.count)}/${faD(r.max)}</b></div>
        </div>
        <div class="rm-foot">⏱ ${esc(r.time)}</div>
      </div>
    </div>`;
    }

    function visible() {
        const L = rooms.filter(r => modeOk(r, filterMode) && baseOk(r));
        if (F.sort === 'fee') L.sort((a, b) => a.fee - b.fee);
        else if (F.sort === 'prize') L.sort((a, b) => prizeOf(b) - prizeOf(a));
        else if (F.sort === 'seats') L.sort((a, b) => (b.max - b.count) - (a.max - a.count));
        else L.sort((a, b) => b.id - a.id);
        return L;
    }

    function renderGrid() {
        const L = visible(), grid = $('rmGrid');
        renderChrome();
        if (filterMode === 'all' && !filtersActive() && L.length) {
            // home view like the app: one horizontal row per category with a "view all" link
            grid.className = 'rm-sections';
            grid.innerHTML = MODES.filter(m => m[0] !== 'all' && m[0] !== 'kill').map(([k, l]) => {
                const rs = L.filter(r => r.mode === k); if (!rs.length) return '';
                return `<section class="rm-sec"><div class="rm-sechd"><h3>${l}</h3><button type="button" data-all="${k}">مشاهده همه ‹</button></div><div class="rm-row">${rs.map(cardHtml).join('')}</div></section>`;
            }).join('');
        } else {
            grid.className = 'rm-grid';
            grid.innerHTML = L.map(cardHtml).join('');
        }
        $('rmEmpty').textContent = rooms.length ? 'روم مطابق جستجو و فیلتر شما پیدا نشد.' : 'فعلاً روم بازی باز نیست. بعداً دوباره سر بزن 🎮';
        $('rmEmpty').hidden = !!L.length;
    }

    // ---- filter sheet ----
    const SORT_OPTS = [['new', 'جدیدترین', RMI.clock, 'تازه‌ترین‌ها اول'], ['fee', 'ورودی کمتر', RMI.coin, 'ارزان‌ترین اول'], ['prize', 'جایزه بیشتر', RMI.trophy, 'پرجایزه‌ها اول'], ['seats', 'جای خالی بیشتر', RMI.mp, 'ظرفیت بیشتر اول']];
    function rngUi(t) {
        const max = +t.max, v = +t.value;
        t.style.setProperty('--p', (max ? v / max * 100 : 0) + '%');
        if (t.id === 'rmMaxFee') $('rmMaxFeeV').textContent = v >= max ? 'بدون محدودیت' : 'تا ' + fa(v) + ' تومان';
        else $('rmMinPrizeV').textContent = v <= 0 ? 'بدون محدودیت' : 'از ' + fa(v) + ' تومان';
    }
    function syncSheet() { // live "show N rooms" button + subtitle, no re-render (so sliders keep dragging)
        const n = visible().length, c = activeCount();
        $('rmFilterDone').textContent = n ? `نمایش ${faD(n)} روم` : 'روم مطابق فیلتر پیدا نشد';
        $('rmFSub').textContent = c ? `${faD(c)} فیلتر فعال · ${faD(n)} روم` : `${faD(n)} روم موجود است`;
    }
    function renderFilterSheet() {
        const body = $('rmFilterBody'), top = body.scrollTop, cp = caps();
        const stF = stepFor(cp.fee), maxF = ceilTo(cp.fee, stF), stP = stepFor(cp.prize), maxP = ceilTo(cp.prize, stP);
        const vF = F.maxFee == null ? maxF : Math.min(F.maxFee, maxF), vP = Math.min(F.minPrize, maxP);
        const grp = (k, cls, opts, extra) => `<div class="${cls}" data-g="${k}"${extra || ''}>${opts.map(([v, l, ic, sub]) => `<button type="button" data-set data-k="${k}" data-v="${v}" class="${String(F[k]) === String(v) ? 'on' : ''}">${ic ? rIc(ic) : ''}<b>${l}</b>${sub ? `<small>${sub}</small>` : ''}</button>`).join('')}</div>`;
        const feeOpts = [['all', 'همه'], ['free', 'رایگان'], ['paid', 'ورودی‌دار']];
        const feeI = Math.max(0, feeOpts.findIndex(o => o[0] === F.fee));
        body.innerHTML = `
      <div class="rm-fsec"><h4>${rIc(RMI.mp)}تعداد اسلات در هر ردیف</h4>${grp('team', 'rm-tiles', [[0, 'همه', 0, 'هر تعداد'], [1, '۱', 0, 'اسلات'], [2, '۲', 0, 'اسلات'], [4, '۴', 0, 'اسلات'], [5, '۵', 0, 'اسلات']])}</div>
      <div class="rm-fsec"><h4>${rIc(RMI.gift)}نوع جایزه</h4>${grp('prize', 'rm-cards c3', [['all', 'همه', RMI.all, ''], ['fixed', 'جایزه ثابت', RMI.trophy, ''], ['perKill', 'هر کیل', RMI.kill, '']])}
        ${maxP > 0 ? `<div class="rm-rng"><div class="rm-rh"><span>حداقل جایزه</span><b id="rmMinPrizeV"></b></div><input type="range" id="rmMinPrize" min="0" max="${maxP}" step="${stP}" value="${vP}"></div>` : ''}</div>
      <div class="rm-fsec"><h4>${rIc(RMI.coin)}ورودی</h4>${grp('fee', 'rm-seg', feeOpts, ` style="--n:3;--i:${feeI}"`)}
        ${maxF > 0 ? `<div class="rm-rng"><div class="rm-rh"><span>حداکثر ورودی</span><b id="rmMaxFeeV"></b></div><input type="range" id="rmMaxFee" min="0" max="${maxF}" step="${stF}" value="${vF}"></div>` : ''}</div>
      <div class="rm-fsec"><h4>${rIc(RMI.bolt)}مرتب‌سازی</h4>${grp('sort', 'rm-cards c2', SORT_OPTS)}</div>
      <label class="rm-sw2"><span><b>فقط روم‌های باز</b><small>روم‌هایی که ثبت‌نامشان باز است و جای خالی دارند</small></span><input type="checkbox" id="rmOpenOnly" ${F.openOnly ? 'checked' : ''}><i></i></label>`;
        body.querySelectorAll('input[type=range]').forEach(rngUi);
        body.scrollTop = top; syncSheet();
    }


    // ---- achievements promo banner (tells players about the gifts and nudges them to join a room) ----
    let promo = null, promoLoaded = false;
    const PROMO_KEY = 'wh_promo_hide';
    const promoHidden = () => { try { return Date.now() - (+localStorage.getItem(PROMO_KEY) || 0) < 3 * 864e5; } catch (e) { return false; } };
    function paintPromo() {
        const box = $('rmPromo'); if (!box) return;
        const A = promo && Array.isArray(promo.achievements) ? promo.achievements : [];
        if (!A.length || promoHidden()) { box.hidden = true; return; }
        const next = A.find(a => !a.done && !a.each), total = A.filter(a => !a.each).reduce((n, a) => n + a.reward, 0);
        const hook = !(promo.wins > 0) && !A[0].done ? `اولین بردت ${fa(A[0].reward)} تومان هدیهٔ نقدی داره 🔥 همین الان توی یک روم ثبت‌نام کن و شروع کن!`
            : next ? `دستاورد بعدی‌ت «${esc(next.title)}» است و ${fa(next.reward)} تومان هدیه داره. یک روم دیگه بگیر و بهش نزدیک‌تر شو 💪`
            : 'همهٔ دستاوردها رو گرفتی 👑 حالا دوستانت رو دعوت کن؛ به‌ازای هر نفر ' + fa((A.find(a => a.each) || {}).reward || 0) + ' تومان هدیه می‌گیری.';
        box.innerHTML = `<button type="button" class="rm-pclose" aria-label="بستن">✕</button>
      <div class="rm-phd"><b>🎁 تا ${fa(total)} تومان هدیهٔ نقدی منتظر توئه</b><p>${hook}</p></div>
      <div class="rm-pch">${A.map(a => `<span class="${a.done ? 'on' : ''}">${a.icon} ${esc(a.title)}<em>${a.done ? '✓' : fa(a.reward) + (a.each ? ' / نفر' : '')}</em></span>`).join('')}</div>`;
        box.hidden = false;
    }
    function loadPromo() { WH.get('profile').done(d => { promo = d; paintPromo(); }); }
    if (!$('rmPromo') && $('rmLive')) $('rmLive').insertAdjacentHTML('beforebegin', '<div class="rm-promo" id="rmPromo" hidden></div>');
    document.addEventListener('click', e => { if (e.target.closest && e.target.closest('.rm-pclose')) { try { localStorage.setItem(PROMO_KEY, String(Date.now())); } catch (x) {} $('rmPromo').hidden = true; } });
    function load() {
        if (!promoLoaded) { promoLoaded = true; loadPromo(); }
        WH.get('rooms').done(d => {
            myPhone = d.phone; rooms = d.rooms || [];
            renderIdBar(); renderGrid();
            if (openId) renderDetail();
        }).fail(x => { if (x.status === 401) stopPoll(); });
    }

    // ---- detail overlay ----
    function teamLabel(i) { return 'تیم ' + faD(i + 1); }

    // ---- registration type helpers (solo / team) ----
    const myRowOf = r => Object.keys(r.teams || {}).find(k => r.teams[k].mine);
    const joinedOf = r => Object.values(r.slots).some(s => s.mine);
    const regOf = r => (r.teamOnly || myRowOf(r) !== undefined) ? 'team' : (regType || (joinedOf(r) ? 'solo' : null));
    function teamState(r) { // can my current team register in this room?
        const size = r.teamSize || 4;
        if (!teamInfo) return { ok: false, msg: 'در حال بررسی تیم شما…' };
        const t = teamInfo.team;
        if (!t) return { ok: false, need: true, msg: 'برای ثبت‌نام تیمی اول باید یک تیم بسازی و دوستانت را دعوت کنی.' };
        if (!t.isLeader) return { ok: false, msg: 'فقط لیدر تیم می‌تواند تیم را ثبت‌نام کند. از لیدر بخواه این کار را بکند.' };
        const n = t.members.length;
        if (n < 2) return { ok: false, need: true, msg: 'تیم باید حداقل ۲ عضو تأییدشده داشته باشد. دعوت‌هایت هنوز پذیرفته نشده‌اند.' };
        if (r.teamOnly ? n !== size : n > size) return { ok: false, msg: r.teamOnly ? `این روم برای تیم‌های دقیقاً ${faD(size)} نفره است؛ تیم تو ${faD(n)} نفر است و نمی‌تواند در آن ثبت‌نام کند.` : `تیم تو ${faD(n)} نفر است ولی ردیف‌های این روم ${faD(size)} نفره‌اند.` };
        return { ok: true, n, msg: `تیم تو ${faD(n)} نفر است. یک ردیف کاملاً خالی انتخاب کن؛ کل آن ردیف برای تیم تو رزرو می‌شود.` + (r.fee ? ` ورودی ${fa(r.fee)} تومان از کیف پول هر عضو تیم کسر می‌شود (موجودی همه باید کافی باشد).` : '') };
    }

    function renderDetail() {
        const r = rooms.find(x => x.id === openId);
        if (!r) return closeDetail();
        $('rmDetTitle').textContent = r.title;
        document.querySelectorAll('.rm-dtabs button').forEach(b => b.classList.toggle('on', b.dataset.t === detTab));

        const size = Math.max(1, Math.min(5, r.teamSize || 4)), can = r.open && !r.finished;
        const myRow = myRowOf(r), joined = joinedOf(r), reg = regOf(r), inTeam = myRow !== undefined;
        const isLeader = inTeam && r.teams[myRow].leader;
        const ts = reg === 'team' && !inTeam ? teamState(r) : { ok: inTeam && isLeader };
        const rowsOpen = can && reg === 'team' && ts.ok; // team rows can be picked

        if (detTab === 'info') {
            const codeBox = !joined ? '' : r.roomCode || r.roomPassword
                ? `<div class="rm-code"><h4>🔑 کد و رمز روم</h4>
                     <div class="rm-codert"><span>کد روم</span><b class="ltr">${esc(r.roomCode || '—')}</b><button type="button" class="rm-cp" data-cp="${esc(r.roomCode || '')}">کپی</button></div>
                     <div class="rm-codert"><span>رمز روم</span><b class="ltr">${esc(r.roomPassword || '—')}</b><button type="button" class="rm-cp" data-cp="${esc(r.roomPassword || '')}">کپی</button></div>
                   </div>`
                : `<div class="rm-code rm-code-pending"><h4>🔑 کد و رمز روم</h4><p class="rm-tip">${r.startAt ? 'ساعت ' + new Date(r.startAt).toLocaleString('fa-IR') + ' خودکار اعلام می‌شود' : 'نزدیک به شروع بازی اینجا اعلام می‌شود'}؛ وقتی اعلام شد بهت اطلاع می‌دیم.</p></div>`;
            $('rmDetBody').innerHTML = `<div class="rm-info">
        ${codeBox}
        <p class="rm-desc">${r.desc ? esc(r.desc) : 'توضیحاتی برای این روم ثبت نشده.'}</p>
        <div class="rm-irow"><span>نوع بازی</span><b>${esc(r.modeLabel)}</b></div>
        <div class="rm-irow"><span>نوع ثبت‌نام</span><b>${r.teamOnly ? 'فقط تیمی' : 'شخصی یا تیمی'}</b></div>
        <div class="rm-irow"><span>ورودی</span><b>${r.fee ? fa(r.fee) : 'رایگان'}</b></div>
        <div class="rm-irow"><span>جایزه</span><b class="rm-prize">${prizeText(r)}</b></div>
        <div class="rm-irow"><span>زمان شروع</span><b>${esc(r.time)}</b></div>
        <div class="rm-irow"><span>اسلات هر ردیف</span><b>${faD(r.teamSize)}</b></div>
        <div class="rm-irow"><span>ظرفیت</span><b>${fa(r.max)} نفر</b></div>
      </div>`;
        } else {
            const teamCount = Math.ceil(r.max / size);
            let html = '';
            if (can && !inTeam && !r.teamOnly) { // ask: solo or team? (also shown to a solo-registered player who wants to switch to a team)
                html += `<div class="rm-regt"><p class="rm-tip">${reg ? 'نوع ثبت‌نام:' : 'می‌خوای شخصی ثبت‌نام کنی یا تیمی؟'}</p><div class="rm-seg" style="--n:2;--i:${reg === 'team' ? 1 : 0}"><button type="button" data-reg="solo" class="${reg === 'solo' ? 'on' : ''}"><b>👤 شخصی</b></button><button type="button" data-reg="team" class="${reg === 'team' ? 'on' : ''}"><b>👥 تیمی</b></button></div></div>`;
                if (!reg) { $('rmDetBody').innerHTML = html; setAction(r, reg, ts, myRow, inTeam, isLeader, joined, can); return; }
            }
            if (can && r.teamOnly && !joined) html += `<p class="rm-tip rm-tonly">👥 ثبت‌نام در این دسته فقط به‌صورت تیمی است.</p>`;
            if (can && reg === 'team' && !inTeam) {
                html += `<p class="rm-tip ${ts.ok ? '' : 'rm-warn'}">${esc(ts.msg)}</p>`;
                if (!ts.ok && ts.need) html += `<button type="button" class="rm-gopanel" data-gopanel>ساخت / مدیریت تیم در پنل کاربری ‹</button>`;
            } else if (can && inTeam) {
                html += `<p class="rm-tip">${isLeader ? 'تیم تو در این روم ثبت‌نام شده است. برای جابه‌جایی، یک ردیف کاملاً خالی انتخاب کن.' : 'لیدر تیم، تیم شما را در این روم ثبت‌نام کرده است ✓'}</p>`;
            } else if (can && reg === 'solo') html += `<p class="rm-tip">یک جایگاه خالی رو انتخاب کن؛ می‌تونی کنار دوستت بشینی.</p>`;
            if (r.finished && r.resultImage) html += `<div class="rm-res"><b>نتیجهٔ روم</b><a href="${esc(r.resultImage)}" target="_blank" rel="noopener"><img src="${esc(r.resultImage)}" alt="نتیجه روم"></a></div>`;
            for (let ti = 0; ti < teamCount; ti++) {
                const start = ti * size, n = Math.min(size, r.max - start), tm = (r.teams || {})[ti];
                const rowEmpty = !tm && Array.from({ length: n }, (_, k) => r.slots[start + k]).every(x => !x);
                const head = tm ? tm.name : (size === 1 ? 'جایگاه ' + faD(ti + 1) : teamLabel(ti));
                html += `<div class="rm-team"><div class="rm-thead ${tm ? 'tm' : (ti % 2 ? 'red' : 'green')}">${tm ? '👥 ' : ''}${esc(head)}</div><div class="rm-trow" style="grid-template-columns:repeat(${size},1fr)">`;
                for (let k = 0; k < n; k++) {
                    const idx = start + k, s = r.slots[idx];
                    if (s) {
                        html += `<div class="rm-slot ${s.mine ? 'me' : 'filled'}"><div class="rm-av">${s.mine ? '★' : '●'}</div><span>${s.mine ? (s.name ? esc(s.name) + ' (شما)' : 'شما') : esc(s.name || ('بازیکن ····' + faD(s.last4)))}</span></div>`;
                    } else if (tm) {
                        html += `<div class="rm-slot empty off"><div class="rm-av">·</div><span>رزرو تیم</span></div>`;
                    } else if (reg === 'team') {
                        const ok = rowsOpen && rowEmpty, picked = ok && pickedRow === ti;
                        html += `<div class="rm-slot empty ${picked ? 'picked' : ''} ${ok ? '' : 'off'}" ${ok ? `data-row="${ti}"` : ''}><div class="rm-av">${picked ? '✓' : '+'}</div><span>${picked ? 'ردیف تیم تو' : 'خالی'}</span></div>`;
                    } else {
                        const picked = pickedSlot === idx;
                        html += `<div class="rm-slot empty ${picked ? 'picked' : ''} ${can ? '' : 'off'}" data-slot="${idx}"><div class="rm-av">${picked ? '✓' : '+'}</div><span>${picked ? 'انتخاب شد' : 'خالی'}</span></div>`;
                    }
                }
                html += `</div></div>`;
            }
            $('rmDetBody').innerHTML = html;
        }
        setAction(r, reg, ts, myRow, inTeam, isLeader, joined, can);
    }

    function setAction(r, reg, ts, myRow, inTeam, isLeader, joined, can) {
        let label = '', can2 = false;
        if (r.finished) label = 'این روم پایان یافته';
        else if (!r.open) label = joined ? 'ثبت‌نام شدی ✓' : 'ثبت‌نام این روم بسته است';
        else if (!joined && reg === null) label = 'اول نوع ثبت‌نام را انتخاب کن';
        else if (reg === 'team') {
            if (inTeam && !isLeader) label = 'تیم شما ثبت‌نام شده ✓';
            else if (!ts.ok) label = 'ثبت‌نام تیمی (تیم آماده نیست)';
            else if (pickedRow === null) label = inTeam ? 'برای جابه‌جایی تیم، یک ردیف خالی انتخاب کن' : (r.count >= r.max ? 'ظرفیت روم تکمیل است' : 'یک ردیف خالی برای تیمت انتخاب کن');
            else { label = inTeam ? 'جابه‌جایی تیم به ردیف انتخاب‌شده' : (r.fee ? `ثبت‌نام تیمی · ورودی هر نفر ${fa(r.fee)}` : 'ثبت‌نام تیمی رایگان'); can2 = true; }
        } else if (pickedSlot === null) label = joined ? 'برای جابه‌جایی، یک جایگاه خالی انتخاب کن' : (r.count >= r.max ? 'ظرفیت روم تکمیل است' : 'یک جایگاه خالی انتخاب کن');
        else { label = joined ? 'جابه‌جایی به جایگاه انتخاب‌شده' : (r.fee ? `ثبت‌نام · ورودی ${fa(r.fee)}` : 'ثبت‌نام رایگان'); can2 = true; }
        $('rmAction').textContent = label;
        $('rmAction').disabled = !can2;
        $('rmAction').classList.toggle('done', !can2 && joined && !r.finished);

        if (r.finished && joined) { $('rmWon').hidden = false; $('rmWon').textContent = r.won > 0 ? `جایزه شما: ${fa(r.won)}` : 'این‌بار جایزه‌ای نبردی'; }
        else $('rmWon').hidden = true;
    }

    function loadTeam() { WH.get('team').done(d => { teamInfo = d; if (openId) renderDetail(); }); }
    function openDetail(id) {
        openId = id; pickedSlot = null; pickedRow = null; regType = null; detTab = 'room';
        $('rmDetail').hidden = false;
        renderDetail();
        loadTeam();
    }
    function closeDetail() { $('rmDetail').hidden = true; openId = null; pickedSlot = null; pickedRow = null; regType = null; }
    window.WH_openRoom = id => { if (rooms.some(r => r.id === id)) openDetail(id); }; // used by the "room started" popup to jump straight into that room

    $('rmGrid').addEventListener('click', e => {
        const a = e.target.closest('[data-all]'); if (a) { filterMode = a.dataset.all; renderFilters(); renderGrid(); return; }
        const c = e.target.closest('.rm-card'); if (c) openDetail(+c.dataset.id);
    });
    $('rmQ').addEventListener('input', e => { F.q = e.target.value; renderGrid(); });
    $('rmQClr').onclick = () => { F.q = ''; $('rmQ').value = ''; renderGrid(); $('rmQ').focus(); };
    $('rmFilterBtn').onclick = () => { renderFilterSheet(); $('rmFilterSheet').hidden = false; };
    const closeSheet = () => { $('rmFilterSheet').hidden = true; };
    $('rmFilterClose').onclick = closeSheet; $('rmFilterDone').onclick = closeSheet;
    $('rmFilterSheet').addEventListener('click', e => { if (e.target.id === 'rmFilterSheet') closeSheet(); });
    $('rmFilterClear').onclick = () => { F = Object.assign({}, F0, { q: F.q }); renderFilterSheet(); renderGrid(); };
    $('rmFilterBody').addEventListener('click', e => { // option buttons update in place (so the sliding segment animates)
        const b = e.target.closest('[data-set]'); if (!b) return;
        const g = b.closest('[data-g]'), k = b.dataset.k, v = b.dataset.v;
        F[k] = (k === 'team') ? +v : v;
        [...g.children].forEach((x, i) => { x.classList.toggle('on', x === b); if (x === b && g.classList.contains('rm-seg')) g.style.setProperty('--i', i); });
        renderGrid(); syncSheet();
    });
    $('rmFilterBody').addEventListener('input', e => {
        const t = e.target; if (t.type !== 'range') return;
        if (t.id === 'rmMaxFee') F.maxFee = +t.value >= +t.max ? null : +t.value; else F.minPrize = +t.value;
        rngUi(t); renderGrid(); syncSheet();
    });
    $('rmFilterBody').addEventListener('change', e => { if (e.target.id === 'rmOpenOnly') { F.openOnly = e.target.checked; renderGrid(); syncSheet(); } });
    $('rmActive').addEventListener('click', e => {
        const b = e.target.closest('[data-x]'); if (!b) return; const k = b.dataset.x;
        if (k === 'all') { F = Object.assign({}, F0); $('rmQ').value = ''; }
        else if (k === 'q') { F.q = ''; $('rmQ').value = ''; }
        else F[k] = F0[k];
        renderGrid(); if (!$('rmFilterSheet').hidden) renderFilterSheet();
    });
    $('rmGrid').addEventListener('keydown', e => { if (e.key !== 'Enter') return; const c = e.target.closest('.rm-card'); if (c) openDetail(+c.dataset.id); });
    $('rmDetClose').onclick = closeDetail;
    $('rmDetail').addEventListener('click', e => { if (e.target.id === 'rmDetail') closeDetail(); });
    document.querySelectorAll('.rm-dtabs button').forEach(b => b.onclick = () => { detTab = b.dataset.t; renderDetail(); });
    $('rmDetBody').addEventListener('click', e => {
        const cp = e.target.closest('[data-cp]');
        if (cp) {
            const v = cp.dataset.cp; if (!v) return;
            (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(() => toast('کپی شد ✓'), () => toast('کپی نشد؛ دستی انتخاب کن'));
            return;
        }
        const g = e.target.closest('[data-gopanel]'); if (g) { closeDetail(); location.hash = '#/panel'; return; }
        const rg = e.target.closest('[data-reg]');
        if (rg) { regType = rg.dataset.reg; pickedSlot = null; pickedRow = null; if (regType === 'team') loadTeam(); renderDetail(); return; }
        const s = e.target.closest('.rm-slot.empty');
        if (!s || s.classList.contains('off')) return;
        if (s.dataset.row !== undefined) { const ti = +s.dataset.row; pickedRow = pickedRow === ti ? null : ti; }
        else { const idx = +s.dataset.slot; pickedSlot = pickedSlot === idx ? null : idx; }
        renderDetail();
    });
    $('rmAction').onclick = () => {
        if (!myPhone) return Auth.openModal();
        const cur = rooms.find(x => x.id === openId); if (!cur) return;
        const asTeam = regOf(cur) === 'team';
        if (asTeam ? pickedRow === null : pickedSlot === null) return;
        WH.post('rooms/' + openId + '/join', asTeam ? { slot: pickedRow * (cur.teamSize || 4), team: true } : { slot: pickedSlot }).done(d => {
            rooms = rooms.map(r => r.id === d.room.id ? d.room : r);
            pickedSlot = null; pickedRow = null; renderDetail(); renderGrid();
            toast(asTeam ? 'تیم ثبت‌نام شد ✓' : 'ثبت‌نام شد ✓'); loadPromo(); if (window.WalletRefresh) window.WalletRefresh();
        }).fail(x => {
            const e = x.responseJSON || {};
            if (e.needTeam) { toast(e.error || 'اول تیمت را کامل کن'); loadTeam(); return; }
            if (e.needName) {
                const n = prompt('یک نام نمایشی برای خودت انتخاب کن (۲ تا ۲۰ حرف). این نام توی روم و پنل کاربری‌ات نشون داده می‌شه:');
                if (n && n.trim().length >= 2) WH.post('profile', { name: n.trim() }).done(p => { Auth.setName(p.name); $('rmAction').click(); }).fail(y => toast((y.responseJSON && y.responseJSON.error) || 'خطا'));
                return;
            }
            if (e.needFunds) {
                toast(e.error || 'موجودی کافی نیست');
                if (confirm((e.error || 'موجودی کافی نیست') + '\n\nمیخوای کیف پولت رو شارژ کنی؟')) location.hash = '#/wallet';
                return;
            }
            toast(e.error || 'خطا در ثبت‌نام'); load();
        });
    };

    // logging out from inside the rooms page sends the player back to the (now gated) login/signup screen
    document.addEventListener('click', e => { if (e.target.id === 'rmSwitch') Auth.logout(); });
    addEventListener('keydown', e => { if (e.key === 'Escape') { closeDetail(); closeSheet(); } });
    Auth.onChange(ph => { myPhone = ph; renderIdBar(); if (!ph) { closeDetail(); stopPoll(); } else { renderFilters(); load(); startPoll(); } });

    $('rmFilters').addEventListener('click', e => {
        const b = e.target.closest('button[data-m]');
        if (!b) return;
        filterMode = b.dataset.m; renderGrid();
        const on = $('rmFilters').querySelector('.on'); if (on) on.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    });

    // refresh rooms while the page is visible so other players' joins show up without a manual reload
    function startPoll() { stopPoll(); poll = setInterval(load, 15000); }
    function stopPoll() { if (poll) clearInterval(poll); poll = null; }
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopPoll(); else { load(); startPoll(); } });

    renderFilters();
    if (Auth.phone) { load(); startPoll(); } // otherwise Auth.onChange (above) kicks things off once the player is known
})();


// ==================== User panel (every logged-in player) ====================
(function () {
    const FA = '۰۱۲۳۴۵۶۷۸۹', faD = n => String(n).replace(/\d/g, d => FA[d]);
    const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const ROLE = { owner: 'مالک', editor: 'ویرایشگر', support: 'پشتیبان' };
    const chev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>';
    const ico = p => `<span class="pn-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg></span>`;
    const badge = '<svg viewBox="0 0 100 110"><defs><linearGradient id="pnG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#b8860b"/></linearGradient></defs><path d="M50 4l42 24v54L50 106 8 82V28z" fill="url(#pnG)"/><path d="M50 16l31 18v42L50 94 19 76V34z" fill="#3a2a05"/><path d="M30 44l20 22 20-22-8 30H38z" fill="#ffc933"/></svg>';
    const mi = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
    let data = null;
    const menu = () => document.getElementById('pnMenu');
    const closeMenu = () => { const m = menu(), k = document.getElementById('pnKebab'); if (m) m.hidden = true; if (k) k.setAttribute('aria-expanded', 'false'); };


    // ---- full-screen sheets opened from the three-dot menu (username / invite / card) ----
    const IC = {
        user: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4.2"/><path d="M3.5 21c0-4.4 3.8-7 8.5-7s8.5 2.6 8.5 7z"/></svg>',
        card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4"/></svg>',
        check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
        play: '<svg viewBox="0 0 24 24" fill="none" stroke="#ff2b3b" stroke-width="2.4" stroke-linejoin="round"><path d="M4 4l16 8-16 8z"/><path d="M4 9l7 3-7 3" stroke-width="1.8"/></svg>',
        share: '<svg viewBox="0 0 120 90"><defs><radialGradient id="shG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff7a86"/><stop offset="1" stop-color="#b40d1c"/></radialGradient></defs><path d="M30 45l60-27M30 45l60 27" stroke="#c4121f" stroke-width="9" stroke-linecap="round"/><circle cx="26" cy="45" r="20" fill="url(#shG)"/><circle cx="94" cy="17" r="20" fill="url(#shG)"/><circle cx="94" cy="73" r="20" fill="url(#shG)"/></svg>'
    };
    function sheet(html, cls) {
        const el = document.createElement('div');
        el.className = 'pn-ov ' + (cls || '');
        el.innerHTML = html;
        const o = { el, onClose: null };
        const onKey = e => { if (e.key !== 'Escape') return; const all = document.querySelectorAll('.pn-ov'); if (all[all.length - 1] === el) o.close(); };
        o.close = () => { el.remove(); document.removeEventListener('keydown', onKey); if (o.onClose) o.onClose(); };
        document.addEventListener('keydown', onKey);
        el.addEventListener('click', e => { if (e.target === el && el.classList.contains('dlg')) o.close(); if (e.target.closest('[data-x]')) o.close(); });
        document.body.appendChild(el);
        return o;
    }
    function submitBtn(sh, run, errBox) { // shared "تایید" behaviour: disables while saving, shows the server's error under the field
        const b = sh.el.querySelector('.pn-ok');
        b.addEventListener('click', () => {
            errBox.textContent = ''; b.disabled = true;
            run().done(d => { data = d; Auth.setName(d.name); sh.close(); if (location.hash === '#/panel') render(); })
                .fail(x => { b.disabled = false; errBox.textContent = (x.responseJSON && x.responseJSON.error) || 'خطا در ارتباط با سرور'; });
        });
    }

    function openUsername() {
        const sh = sheet(`<div class="pn-sh">
            <div class="pn-sh-top"><button type="button" class="pn-sh-x" data-x aria-label="بستن">✕</button><h3>ویرایش نام کاربری</h3>${IC.play}</div>
            <p class="pn-sh-p">درصورتی که نام کاربری خود را اشتباه واردکرده اید لطفا مجددا مطابق عکس زیر درست وارد کنید</p>
            <img class="pn-help" src="/img/username-help.jpg" alt="">
            <div class="pn-fld">${IC.user}<input id="pnNameIn" type="text" maxlength="20" autocomplete="off" value="${esc(data && data.name || '')}"></div>
            <p class="pn-note" id="pnNameErr">نام کاربری خود را فقط دو بار میتوانید تغییر دهید</p>
            <button type="button" class="pn-ok">تایید</button>
        </div>`);
        const inp = sh.el.querySelector('#pnNameIn'), err = sh.el.querySelector('#pnNameErr'), note = err.textContent;
        inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length);
        const run = () => {
            const n = inp.value.trim();
            if (n.length < 2) return jQuery.Deferred().reject({ responseJSON: { error: 'نام باید حداقل ۲ حرف باشد.' } }).promise();
            return WH.post('profile', { name: n });
        };
        submitBtn(sh, run, err);
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') sh.el.querySelector('.pn-ok').click(); });
        void note;
    }

    function openCard() {
        const sh = sheet(`<div class="pn-sh">
            <div class="pn-sh-top c"><button type="button" class="pn-sh-x" data-x aria-label="بستن">✕</button><h3>دریافت شماره کارت</h3></div>
            <p class="pn-sh-p c">لطفا شماره کارت  یا شماره شبای خودتون رو وارد کنید تا برداشت ها به حسابتون واریز بشه</p>
            <div class="pn-fld">${IC.card}<input id="pnCardIn" type="text" inputmode="numeric" dir="ltr" maxlength="32" autocomplete="off" placeholder="شماره کارت یا شبا (بدون IR)" value="${esc(data && data.card || '')}"></div>
            <p class="pn-note" id="pnCardErr">جهت واریز بدون مشکل لطفا شماره شبا وارد کنید</p>
            <button type="button" class="pn-ok">${IC.check}<span>تایید</span></button>
        </div>`);
        const inp = sh.el.querySelector('#pnCardIn'), err = sh.el.querySelector('#pnCardErr');
        inp.focus();
        submitBtn(sh, () => WH.post('profile-card', { card: inp.value.trim() }), err);
        inp.addEventListener('keydown', e => { if (e.key === 'Enter') sh.el.querySelector('.pn-ok').click(); });
        return sh;
    }
    window.WH_openCard = openCard;

    function openInvite() {
        const n = (data && data.invited) || 0, code = (data && data.invite) || '';
        const sh = sheet(`<div class="pn-dlg">
            <div class="pn-dlg-ic">${IC.share}</div>
            <h3>دعوت از دوستان</h3>
            <p>شما میتوانید با دعوت کردن دوستان خود به وار هاب سطح خودتون رو افزایش بدید</p>
            <b class="pn-code" id="pnCode" title="برای کپی کلیک کن">کد دعوت شما ${faD(code)} میباشد</b>
            <small>${n ? 'تاحالا ' + faD(n) + ' نفر رو دعوت کردی :)' : 'تاحالا کسی رو دعوت نکردی :('}</small>
            <button type="button" class="pn-dk" data-x>فهمیدم!</button>
        </div>`, 'dlg');
        const c = sh.el.querySelector('#pnCode');
        c.addEventListener('click', () => { if (navigator.clipboard) navigator.clipboard.writeText(String(code)).then(() => { c.textContent = 'کد کپی شد ✓'; setTimeout(() => { c.textContent = 'کد دعوت شما ' + faD(code) + ' میباشد'; }, 1400); }, () => {}); });
    }

    // ---- live payouts, team and leaderboard ----
    Object.assign(IC, {
        search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
        chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
        team: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><circle cx="17.5" cy="9" r="2.8"/><path d="M17 14.2c2.9.1 4.7 2.1 4.7 5"/></svg>',
        trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4"/><path d="M12 13v4M8 20h8M9.5 17h5"/></svg>'
    });
    const HX = '<svg class="pn-hx" viewBox="0 0 40 44"><path d="M20 2l17 10v20L20 42 3 32V12z" fill="#d9a521" stroke="#ffe27a" stroke-width="2"/><path d="M12 17l8 7 8-7M12 24l8 7 8-7" fill="none" stroke="#3a2a05" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const money = n => faD(String(Math.round(+n)).replace(/\B(?=(\d{3})+(?!\d))/g, '٬'));
    const avatar = (name, cls) => { let h = 0; for (const ch of String(name)) h = (h * 31 + ch.charCodeAt(0)) % 360; return `<span class="pn-av ${cls || ''}" style="--h:${345 + (h % 50)}">${esc((String(name).trim().charAt(0) || '?').toUpperCase())}</span>`; };
    const apiErr = x => alert((x && x.responseJSON && x.responseJSON.error) || 'خطا در ارتباط با سرور');

    // "آخرین واریزی‌ها": polled while the panel is open, so a payout recorded in the admin panel shows up within seconds
    let pay = null, paySeen = new Set(), teamInv = 0, pollTimer = null;
    function paintPay(flash) {
        const box = document.getElementById('pnPay'); if (!box || pay === null) return;
        box.innerHTML = pay.length
            ? pay.map(p => `<div class="pn-pc${flash && !paySeen.has(p.id) ? ' new' : ''}">${avatar(p.name)}<div><b>${money(p.amount)} تومان برای ${esc(p.name)}</b><small>برای برنده شدن در ${esc(p.room)}</small></div></div>`).join('')
            : '<p class="pn-empty">هنوز واریزی ثبت نشده؛ به‌محض واریز، اینجا نمایش داده می‌شود.</p>';
    }
    function setBadge() { const b = document.getElementById('pnTeamBadge'); if (b) { b.textContent = faD(teamInv); b.hidden = !teamInv; } }
    function tick() {
        WH.get('payouts').done(L => { const first = pay === null; pay = L; paintPay(!first); L.forEach(p => paySeen.add(p.id)); });
        if (Auth.phone) WH.get('team').done(t => { teamInv = (t.invites || []).length; setBadge(); });
    }
    const liveVisible = () => { const h = document.getElementById('rmLive'); return !!(h && h.offsetParent !== null); };
    function startPoll() { if (pollTimer) return; pollTimer = setInterval(() => { if (liveVisible() && !document.hidden) tick(); }, 8000); }
    function ensureProfile() { if (Auth.phone && !data) WH.get('profile').done(d => { data = d; }); }
    // the three blocks (payouts / team / leaderboard) live at the top of the rooms page, above the search bar
    function mountLive() {
        const host = document.getElementById('rmLive'); if (!host || host.dataset.on) return;
        host.dataset.on = '1';
        host.innerHTML = `<h4 class="pn-payh"><i class="pn-dot"></i>آخرین واریزی‌ها</h4>
      <div class="pn-pay" id="pnPay"><p class="pn-empty">در حال بارگذاری…</p></div>
      <div class="pn-quick">
        <button type="button" id="pnTeam" class="q1"><span class="qi">${IC.team}<i class="pn-qb" id="pnTeamBadge" hidden></i></span><b>تیم شما</b></button>
        <button type="button" id="pnLb" class="q2"><span class="qi">${IC.trophy}</span><b>لیدر برد</b></button>
      </div>`;
        paintPay(false); setBadge();
    }

    // ---- team ----
    function openTeam() {
        if (!Auth.phone) { Auth.openModal(); return; }
        const sh = sheet('<div class="pn-sh" id="pnTeamBody"><p class="pn-sh-p c" style="margin-top:60px">در حال بارگذاری…</p></div>');
        const body = sh.el.querySelector('#pnTeamBody');
        let max = 4, room = 0;
        const top = `<div class="pn-sh-top"><button type="button" class="pn-sh-x" data-x aria-label="بستن">✕</button><h3>تیم شما</h3>${IC.play}</div>`;
        const draw = t => {
            max = t.max; let h = top;
            if (!t.team) {
                if ((t.invites || []).length) h += '<h4 class="pn-h" style="margin:4px 0 10px">دعوت‌های دریافتی</h4>' + t.invites.map(i => `<div class="pn-row"><div class="pn-ri"><b>${esc(i.name)}</b><small>${faD(i.count)} عضو</small></div><button type="button" class="pn-mini ok" data-acc="${esc(i.id)}">قبول</button><button type="button" class="pn-mini" data-dec="${esc(i.id)}">رد</button></div>`).join('');
                h += `<div class="pn-hero"><div class="pn-hero-ic">${IC.team}</div><div class="pn-hero-t"><p>شما عضو هیچ تیمی نیستید، میتوانید یک تیم ایجاد کنید و دوستان خود را به آن دعوت کنید یا از دوستان خود بخواهید تا شمارا دعوت کنند.</p><p>لیدر تیم میتواند تیم را عضو روم های مختلف بکند و در مسابقات تیمی شرکت بکند (به‌زودی).</p></div></div>
                      <div class="pn-actions"><button type="button" class="pn-ok" id="pnMk"><span>ایجاد گروه</span><b>+</b></button></div>`;
            } else {
                const T = t.team; room = t.max - T.members.length - T.pending.length;
                h += `<div class="pn-tcard"><b>${esc(T.name)}</b><small>${faD(T.members.length)} از ${faD(t.max)} عضو</small></div>`
                    + T.members.map(m => `<div class="pn-row">${avatar(m.name)}<div class="pn-ri"><b>${esc(m.name)}${m.me ? ' (شما)' : ''}</b><small>${m.leader ? 'لیدر تیم 👑' : 'عضو تیم'}</small></div>${T.isLeader && !m.leader ? `<button type="button" class="pn-mini" data-kick="${esc(m.id)}">حذف</button>` : ''}</div>`).join('');
                if (T.pending.length) h += '<h4 class="pn-h" style="margin:14px 0 10px">در انتظار پاسخ</h4>' + T.pending.map(m => `<div class="pn-row dim">${avatar(m.name)}<div class="pn-ri"><b>${esc(m.name)}</b><small>دعوت ارسال شد</small></div><button type="button" class="pn-mini" data-unin="${esc(m.id)}">لغو</button></div>`).join('');
                h += `<div class="pn-actions">${T.isLeader && room > 0 ? '<button type="button" class="pn-ok" id="pnAdd"><span>دعوت عضو جدید</span><b>+</b></button>' : ''}<button type="button" class="pn-ghost" id="pnLeave">${T.isLeader ? 'منحل کردن تیم' : 'خروج از تیم'}</button></div>`;
            }
            body.innerHTML = h;
        };
        const act = (path, d) => WH.post(path, d).done(draw).fail(apiErr);
        WH.get('team').done(draw).fail(() => { body.innerHTML = top + '<p class="pn-sh-p c">بارگذاری نشد؛ دوباره امتحان کن.</p>'; });
        body.addEventListener('click', e => {
            const g = s => e.target.closest(s);
            if (g('#pnMk')) openPicker({ mode: 'create', max: max - 1, onDone: draw });
            else if (g('#pnAdd')) openPicker({ mode: 'invite', max: room, onDone: draw });
            else if (g('[data-acc]')) act('team/accept', { teamId: g('[data-acc]').dataset.acc }).always(tick);
            else if (g('[data-dec]')) act('team/decline', { teamId: g('[data-dec]').dataset.dec }).always(tick);
            else if (g('[data-kick]')) { if (confirm('این عضو از تیم حذف شود؟')) act('team/kick', { id: g('[data-kick]').dataset.kick }); }
            else if (g('[data-unin]')) act('team/uninvite', { id: g('[data-unin]').dataset.unin });
            else if (g('#pnLeave')) { if (confirm(g('#pnLeave').textContent.includes('منحل') ? 'تیم منحل شود؟' : 'از تیم خارج می‌شوی؟')) act('team/leave', {}); }
        });
    }
    function openPicker(opt) { // "انتخاب تیم": search existing usernames, tick the ones to invite
        const sel = new Map();
        const sh = sheet(`<div class="pn-sh">
            <div class="pn-sh-top"><button type="button" class="pn-sh-x" data-x aria-label="بستن">✕</button><h3>انتخاب تیم</h3>${IC.play}</div>
            <p class="pn-sh-p">لطفا نام کاربری  کسانی که میخواهید به تیم خود دعوت کنید را در کادر زیر جستجو  و انتخاب نمایید.</p>
            <div class="pn-fld">${IC.search}<input id="pnQ" type="text" maxlength="20" autocomplete="off" placeholder="نام پلیر"></div>
            <div class="pn-chips" id="pnChips"></div><div class="pn-res" id="pnRes"></div>
            <p class="pn-note" id="pnPickErr"></p>
            <button type="button" class="pn-ok" id="pnNext"><span>بعدی</span>${IC.chev}</button></div>`);
        const q = sh.el.querySelector('#pnQ'), res = sh.el.querySelector('#pnRes'), chips = sh.el.querySelector('#pnChips'), err = sh.el.querySelector('#pnPickErr'), next = sh.el.querySelector('#pnNext');
        const drawChips = () => { chips.innerHTML = [...sel].map(([id, n]) => `<button type="button" class="pn-chip" data-id="${esc(id)}">${esc(n)} ✕</button>`).join(''); };
        let tm = null, seq = 0;
        q.focus();
        q.addEventListener('input', () => {
            clearTimeout(tm); const v = q.value.trim();
            if (!v) { res.innerHTML = ''; return; }
            tm = setTimeout(() => { const my = ++seq; WH.get('players/search?q=' + encodeURIComponent(v)).done(L => { if (my !== seq) return;
                res.innerHTML = L.length ? L.map(p => `<button type="button" class="pn-row pick${sel.has(p.id) ? ' on' : ''}${p.busy ? ' busy' : ''}" data-id="${esc(p.id)}" data-n="${esc(p.name)}" ${p.busy ? 'disabled' : ''}>${avatar(p.name)}<div class="pn-ri"><b>${esc(p.name)}</b><small>${p.busy ? 'عضو یک تیم است' : '<bdi>' + esc(p.rank) + '</bdi>'}</small></div><span class="pn-tick">✓</span></button>`).join('') : '<p class="pn-empty">کاربری با این نام پیدا نشد.</p>'; }); }, 250);
        });
        res.addEventListener('click', e => {
            const b = e.target.closest('.pick'); if (!b || b.disabled) return;
            err.textContent = '';
            if (sel.has(b.dataset.id)) sel.delete(b.dataset.id);
            else if (sel.size >= opt.max) { err.textContent = 'حداکثر ' + faD(opt.max) + ' نفر را می‌توانی انتخاب کنی.'; return; }
            else sel.set(b.dataset.id, b.dataset.n);
            b.classList.toggle('on', sel.has(b.dataset.id)); drawChips();
        });
        chips.addEventListener('click', e => { const c = e.target.closest('.pn-chip'); if (!c) return; sel.delete(c.dataset.id); drawChips(); res.querySelectorAll('.pick').forEach(b => b.classList.toggle('on', sel.has(b.dataset.id))); });
        next.addEventListener('click', () => {
            if (!sel.size) { err.textContent = 'حداقل یک نفر را انتخاب کن.'; return; }
            next.disabled = true; err.textContent = '';
            WH.post(opt.mode === 'create' ? 'team/create' : 'team/invite', { ids: [...sel.keys()] })
                .done(t => { sh.close(); opt.onDone(t); })
                .fail(x => { next.disabled = false; err.textContent = (x.responseJSON && x.responseJSON.error) || 'خطا در ارتباط با سرور'; });
        });
    }

    // ---- leaderboard: computed on the server from registered results, refreshed every few seconds while open ----
    function openLeaderboard() {
        const sh = sheet('<div class="pn-sh pn-lb" id="pnLbBody"><p class="pn-sh-p c" style="margin-top:60px">در حال بارگذاری…</p></div>');
        const body = sh.el.querySelector('#pnLbBody'); ensureProfile();
        const pod = (p, pos) => p
            ? `<div class="pn-pod p${pos}"><div class="pn-pa">${avatar(p.name, 'big')}${HX}</div><b>${esc(p.name)}</b><small>${faD(p.winRate)}٪</small></div>`
            : `<div class="pn-pod p${pos} empty"><div class="pn-pa"><span class="pn-av big">?</span></div><b>—</b></div>`;
        const paint = L => {
            const me = data && data.invite;
            let h = `<div class="pn-sh-top"><button type="button" class="pn-sh-x" data-x aria-label="بستن">✕</button><h3>لیدر برد</h3>${IC.play}</div>`;
            if (!L.length) h += '<p class="pn-empty" style="margin-top:50px">هنوز نتیجه‌ای ثبت نشده؛ بعد از پایان اولین روم، رتبه‌بندی اینجا ساخته می‌شود.</p>';
            else {
                h += `<div class="pn-podium">${pod(L[2], 3)}${pod(L[0], 1)}${pod(L[1], 2)}</div>
                      <div class="pn-blocks"><div class="pn-bk b3">${faD(3)}</div><div class="pn-bk b1">${faD(1)}</div><div class="pn-bk b2">${faD(2)}</div></div>`;
                h += '<div class="pn-list">' + (L.length > 3 ? L.slice(3).map((p, i) => `<div class="pn-lr${p.id === me ? ' me' : ''}"><span class="pn-rk">${faD(i + 4)}</span><span class="pn-pa">${avatar(p.name)}${HX}</span><div class="pn-ri"><b>${esc(p.name)}</b><small><bdi>${esc(p.rank)}</bdi> · ${faD(p.wins)} برد</small></div><span class="pn-pc2">${faD(p.winRate)}٪</span></div>`).join('') : '<p class="pn-empty">نفرات بعدی اینجا نمایش داده می‌شوند.</p>') + '</div>';
                h += '<p class="pn-foot">رتبه‌بندی بر اساس تعداد برد است و بعد از ثبت هر نتیجه خودکار به‌روز می‌شود.</p>';
            }
            body.innerHTML = h;
        };
        const load = () => WH.get('leaderboard').done(paint);
        load(); const t = setInterval(load, 8000); sh.onClose = () => clearInterval(t);
    }

    function render() {
        const d = data, name = d.name || ('بازیکن ····' + faD(String(d.phone).slice(-4)));
        const staff = d.staff ? `<a class="pn-item" href="/admin.html">${ico('<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/>')}<span class="pn-tx"><b>پنل مدیریت</b><small>${d.staff.pending ? 'فعال‌سازی دسترسی ' : 'ورود به پنل '}${esc(ROLE[d.staff.role] || '')}</small></span>${chev}</a>` : '';
        $('pnBody').innerHTML = `
      <div class="pn-card">
        <button type="button" class="pn-kebab" id="pnKebab" aria-label="گزینه‌ها" aria-haspopup="true" aria-expanded="false"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg></button>
        <div class="pn-menu" id="pnMenu" hidden>
          <button type="button" id="pnInvite">${mi('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>')}<span>دعوت از دوستان</span></button>
          <button type="button" id="pnEdit">${mi('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>')}<span>ویرایش نام کاربری</span></button>
          <button type="button" id="pnCard">${mi('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>')}<span>ویرایش شماره کارت</span></button>
          <button type="button" id="pnMenuOut">${mi('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>')}<span>خروج از حساب کاربری</span></button>
        </div>
        <div class="pn-badge">${badge}</div>
        <div class="pn-name"><b>${esc(name)}</b><span class="pn-rank">${esc(d.rank)}</span></div>
        <div class="pn-bar"><div style="width:${d.progress}%"></div><em>${faD(d.progress)}٪</em></div>
        <div class="pn-meta"><span>رنک بعدی: <b>${d.nextRank ? esc(d.nextRank) : 'بالاترین رنک'}</b></span><span>WinRate: <b>${faD(d.winRate)}٪</b></span></div>
        <div class="pn-stats">
          <div class="pn-ring" style="--p:${+d.winRate || 0}"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" class="bg"/><circle cx="30" cy="30" r="26" class="fg" stroke-dasharray="163.4" stroke-dashoffset="${(163.4 * (1 - Math.min(100, +d.winRate || 0) / 100)).toFixed(1)}"/></svg><b>${faD(d.winRate)}٪</b><small>WinRate</small></div>
          <div class="pn-st gold"><span class="pn-n">${faD(d.wins)}</span><span>برد</span></div>
          <div class="pn-st red"><span class="pn-n">${faD(d.played)}</span><span>کاستوم</span></div>
          <div class="pn-st"><span class="pn-n">${faD(d.invited || 0)}</span><span>دعوت</span></div>
        </div>
        <div class="pn-ph">شمارهٔ شما: <b>${faD(d.phone)}</b>${d.invite ? ' · کد دعوت: <b>' + faD(d.invite) + '</b>' : ''}</div>
      </div>
      <h4 class="pn-h">دستاوردها</h4>
      <div class="pn-ach">${(Array.isArray(d.achievements) ? d.achievements.map(a => [a.icon, a.title, a.done, a.reward, a.each]) : [
            ['🥇', 'اولین برد', d.wins >= 1], ['🎮', '۱۰ کاستوم', d.played >= 10], ['🔥', '۱۰ برد', d.wins >= 10],
            ['🤝', 'دعوت‌کننده', (d.invited || 0) >= 1], ['👑', 'بالای ۷۰٪', d.played >= 10 && d.winRate >= 70]
        ]).map(a => `<div class="pn-ac${a[2] ? ' on' : ''}"><span>${a[0]}</span><small>${a[1]}</small>${a[3] ? `<em>${faD(String(a[3]).replace(/\B(?=(\d{3})+(?!\d))/g, ','))}${a[4] ? ' / نفر' : ''}</em>` : ''}</div>`).join('')}</div>
      <h4 class="pn-h">گزینه‌ها</h4>
      ${staff}
      <a class="pn-item" href="#/contact">${ico('<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>')}<span class="pn-tx"><b>پشتیبانی</b><small>پیشنهاد، انتقاد، سوال، گزارش مشکل</small></span>${chev}</a>
      <div class="pn-item soon">${ico('<rect x="4" y="5" width="16" height="14" rx="3"/><circle cx="12" cy="12" r="3"/>')}<span class="pn-tx"><b>خرید و فروش اکانت</b><small>بزودی فعال میشه…</small></span></div>
      <a class="pn-item" href="#/rules">${ico('<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 9h6M9 13h6"/>')}<span class="pn-tx"><b>شرایط و قوانین</b><small>قوانین استفاده، حریم خصوصی و امنیت</small></span>${chev}</a>
      <a class="pn-item" href="#/about">${ico('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>')}<span class="pn-tx"><b>درباره ما</b><small>درباره وار هاب، تاریخچه، همکاری با ما</small></span>${chev}</a>
      <h4 class="pn-h">شبکه‌های اجتماعی</h4>
      <div class="pn-soc"><a href="#">Instagram</a><a href="#">Telegram</a><a href="#">Discord</a></div>
`;
        paintPay(false); setBadge();
    }
    window.PanelLoad = function () {
        if (!Auth.phone) return;
        WH.get('profile').done(d => { data = d; Auth.setName(d.name); render(); }).fail(() => { $('pnBody').innerHTML = '<p class="rm-empty">پروفایل بارگذاری نشد؛ دوباره امتحان کن.</p>'; });
    };
    document.addEventListener('click', e => {
        if (e.target.closest('#pnKebab')) { const m = menu(); if (m) { const open = m.hidden; m.hidden = !open; e.target.closest('#pnKebab').setAttribute('aria-expanded', String(open)); } return; }
        if (!e.target.closest('#pnMenu')) closeMenu();
        if (e.target.closest('#pnMenuOut') || e.target.closest('#pnOut')) { closeMenu(); Auth.logout(); }
        if (e.target.closest('#pnInvite')) { closeMenu(); openInvite(); }
        if (e.target.closest('#pnCard')) { closeMenu(); openCard(); }
        if (e.target.closest('#pnEdit')) { closeMenu(); openUsername(); }
        if (e.target.closest('#pnTeam')) openTeam();
        if (e.target.closest('#pnLb')) openLeaderboard();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    Auth.onChange(ph => {
        if (ph && location.hash === '#/panel') window.PanelLoad();
        if (ph) { tick(); ensureProfile(); } else { teamInv = 0; data = null; setBadge(); }
    });
    window.addEventListener('hashchange', () => { if (liveVisible()) tick(); });
    mountLive(); startPoll(); tick();
})();

// ==================== Notifications (bell in navbar; staff messages + system notices) ====================
(function () {
    const box = $('notif'), bell = $('nBell'), pop = $('nPop'), list = $('nList'), badge = $('nBadge');
    if (!box) return;
    let timer = null, items = [];
    const fa = n => (+n).toLocaleString('fa-IR');
    function paint(unread) {
        badge.textContent = unread > 99 ? '99+' : fa(unread); badge.hidden = !unread;
        list.textContent = '';
        if (!items.length) { const e = document.createElement('div'); e.className = 'nempty'; e.textContent = 'هنوز اعلانی نداری.'; list.appendChild(e); return; }
        items.forEach(n => {
            const d = document.createElement('div'); d.className = 'ni' + (n.read ? '' : ' un'); d.dataset.id = n.id;
            const t = document.createElement('b'); t.textContent = n.title;
            const p = document.createElement('p'); p.textContent = n.body;
            const m = document.createElement('small');
            if (n.kind === 'admin') { const s = document.createElement('span'); s.className = 'src'; s.textContent = 'پشتیبانی WARHUB'; m.appendChild(s); }
            const w = document.createElement('span'); w.textContent = new Date(n.at).toLocaleString('fa-IR'); m.appendChild(w);
            d.append(t, p, m); list.appendChild(d);
        });
    }
    // ---- full-screen "room started" popup: fires wherever the player is on the site, not only inside the room modal ----
    const SEEN_KEY = 'wh_seen_room_start';
    const seenPopups = new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || '[]'));
    function markPopupSeen(id) { seenPopups.add(id); localStorage.setItem(SEEN_KEY, JSON.stringify([...seenPopups].slice(-200))); }
    function showRoomStartPopup(n) {
        const el = document.createElement('div');
        el.className = 'pn-ov dlg rm-start-ov';
        el.innerHTML = `<div class="pn-dlg rm-start-dlg">
            <button type="button" class="pn-sh-x rm-start-x" data-x aria-label="بستن">✕</button>
            <h3>🎮 روم «${esc(n.roomTitle || '')}» شروع شد!</h3>
            <p>کد و رمز روم آماده است؛ همین الان وارد شو.</p>
            <div class="rm-code">
              <div class="rm-codert"><span>کد روم</span><b class="ltr">${esc(n.roomCode || '—')}</b><button type="button" class="rm-cp" data-cp="${esc(n.roomCode || '')}">کپی</button></div>
              <div class="rm-codert"><span>رمز روم</span><b class="ltr">${esc(n.roomPassword || '—')}</b><button type="button" class="rm-cp" data-cp="${esc(n.roomPassword || '')}">کپی</button></div>
            </div>
            <button type="button" class="pn-dk" id="rmStartGo">برو به روم</button>
        </div>`;
        el.addEventListener('click', e => {
            if (e.target.closest('[data-cp]')) { const v = e.target.closest('[data-cp]').dataset.cp; if (v && navigator.clipboard) navigator.clipboard.writeText(v).then(() => {}, () => {}); return; }
            if (e.target === el || e.target.closest('[data-x]')) return close();
            if (e.target.closest('#rmStartGo')) { close(); location.hash = '#/rooms'; if (n.roomId && window.WH_openRoom) window.WH_openRoom(n.roomId); }
        });
        const onKey = e => { if (e.key === 'Escape') close(); };
        function close() { el.remove(); document.removeEventListener('keydown', onKey); }
        document.addEventListener('keydown', onKey);
        document.body.appendChild(el);
    }
    function load() {
        if (!Auth.phone) return;
        WH.get('notifications').done(d => {
            items = d.items || []; paint(d.unread || 0);
            items.filter(n => n.kind === 'roomStart' && !seenPopups.has(n.id)).forEach(n => { markPopupSeen(n.id); showRoomStartPopup(n); });
        });
    }
    function markRead(id) {
        WH.post('notifications', id ? { id } : {}).done(d => { items.forEach(n => { if (!id || n.id === id) n.read = true; }); paint(d.unread || 0); });
    }
    function start() { stop(); box.hidden = false; load(); timer = setInterval(() => { if (!document.hidden) load(); }, 60000); }
    function stop() { clearInterval(timer); timer = null; box.hidden = true; pop.hidden = true; items = []; paint(0); }
    bell.addEventListener('click', e => { e.stopPropagation(); pop.hidden = !pop.hidden; if (!pop.hidden) load(); });
    pop.addEventListener('click', e => {
        e.stopPropagation();
        if (e.target.closest('#nAll')) return markRead();
        const it = e.target.closest('.ni.un'); if (it) markRead(it.dataset.id);
    });
    document.addEventListener('click', () => { pop.hidden = true; });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) load(); });
    Auth.onChange(ph => { ph ? start() : stop(); });
    if (Auth.phone) start();
})();

// ==================== Wallet (navbar chip + #/wallet page; every action is recorded in the transaction list by the server) ====================
(function () {
    const page = $('p-wallet'), chip = $('wChip');
    if (!page || !chip) return;
    const FA = '۰۱۲۳۴۵۶۷۸۹';
    const faD = n => String(n).replace(/\d/g, d => FA[d]);
    const money = n => faD(String(Math.round(+n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '٬'));
    const toEn = v => String(v).replace(/[۰-۹]/g, c => FA.indexOf(c)).replace(/[٠-٩]/g, c => '٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/[٬,\s]/g, '');
    const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const mi = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
    const TYPE = {
        deposit: ['واریز', '<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>'],
        withdraw: ['برداشت', '<path d="M12 20V8M7 13l5-5 5 5M5 4h14"/>'],
        entry: ['ورودی روم', '<path d="M4 4l16 8-16 8z"/>'],
        refund: ['بازگشت وجه', '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/>'],
        prize: ['جایزه', '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 20h8"/>'],
        gift: ['هدیه', '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v8h14v-8"/><path d="M12 8c-1.5-3.5-5-3.5-5-1.2C7 8 9 8 12 8zM12 8c1.5-3.5 5-3.5 5-1.2C17 8 15 8 12 8z"/>'],
        adjust: ['تنظیم توسط پشتیبانی', '<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>']
    };
    const STATUS = { pending: 'در انتظار تایید', rejected: 'رد شد' };
    let W = null, timer = null;

    const coin = '<svg class="wcoin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f5b81c" stroke="#ffe27a" stroke-width="1.5"/><path d="M8 9l4 3.5L16 9M8 13l4 3.5 4-3.5" fill="none" stroke="#5a3f00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    function paintChip() {
        if (!W) return;
        $('wChipN').textContent = money(W.balance);
    }
    function when(at) {
        const d = new Date(at); if (isNaN(d)) return '';
        return d.toLocaleDateString('fa-IR') + ' · ' + d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    }
    function txRow(t) {
        const ty = TYPE[t.type] || ['تراکنش', ''];
        const sign = t.dir === 'in' ? '+' : '−';
        const st = STATUS[t.status];
        return `<div class="wt ${t.dir === 'in' ? 'in' : 'out'} ${t.status}">
          <span class="wt-ic">${mi(ty[1])}</span>
          <div class="wt-i"><b>${esc(t.label || ty[0])}</b><small>${when(t.at)}${st ? ` <em class="wt-st ${t.status}">${st}</em>` : ''}</small></div>
          <span class="wt-a">${t.status === 'rejected' ? '' : sign}${money(t.amount)}<small>تومان</small>${t.type === 'deposit' && t.status === 'pending' ? `<button type="button" class="wt-c" data-cancel="${esc(t.id)}">لغو</button>` : ''}</span>
        </div>`;
    }
    function render() {
        if (!W) return;
        const cardTxt = W.card ? faD(String(W.card).replace(/(.{4})(?=.)/g, '$1 ')) : '';
        $('wBody').innerHTML = `
          <div class="wl-card">
            <small>موجودی کیف پول</small>
            <div class="wl-bal"><b>${money(W.balance)}</b><span>تومان</span>${coin}</div>
            <div class="wl-sub">قابل برداشت: <b>${money(W.withdrawable)}</b> تومان</div>
          </div>
          <div class="wl-bank" id="wCardBox" role="button" tabindex="0">
            <span class="wl-bi">${mi('<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4"/>')}</span>
            <div><small>${W.card ? 'شماره کارت / شبای ثبت‌شده' : 'برای برداشت باید شماره کارت یا شبا ثبت کنی'}</small><b dir="ltr">${W.card ? esc(cardTxt) : 'ثبت شماره کارت'}</b></div>
            <span class="wl-bc">${W.card ? 'تغییر' : 'ثبت'}</span>
          </div>
          <div class="wl-act">
            <button type="button" class="wl-b out" id="wWd">${mi('<path d="M12 20V8M7 13l5-5 5 5M5 4h14"/>')}<span>برداشت</span></button>
            <button type="button" class="wl-b in" id="wDp">${mi('<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>')}<span>واریز</span></button>
          </div>
          <h4 class="pn-h">تراکنش ها</h4>
          <div class="wl-list" id="wList">${W.txs.length ? W.txs.map(txRow).join('') : '<p class="wl-empty">هنوز تراکنشی نداری. هر واریز، ورود به روم، جایزه و برداشت اینجا ثبت میشه.</p>'}</div>`;
    }
    function load(cb) {
        if (!Auth.phone) return;
        WH.get('wallet').done(d => { W = d; paintChip(); if (!page.hidden) render(); if (cb) cb(); });
    }
    const popup = () => document.querySelector('.pn-ov.wl-ov');
    function modal(title, body, okTxt, onOk) {
        const el = document.createElement('div');
        el.className = 'pn-ov dlg wl-ov';
        el.innerHTML = `<div class="pn-dlg wl-dlg"><button type="button" class="pn-sh-x wl-x" data-x aria-label="بستن">✕</button><h3>${title}</h3>${body}<p class="pn-note" id="wlErr"></p><button type="button" class="pn-dk" id="wlOk">${okTxt}</button></div>`;
        const close = () => { el.remove(); document.removeEventListener('keydown', onKey); };
        const onKey = e => { if (e.key === 'Escape') close(); };
        document.addEventListener('keydown', onKey);
        el.addEventListener('click', e => { if (e.target === el || e.target.closest('[data-x]')) close(); });
        document.body.appendChild(el);
        const ok = el.querySelector('#wlOk'), err = el.querySelector('#wlErr');
        ok.onclick = () => {
            err.textContent = ''; ok.disabled = true;
            onOk(el, err).fail(x => { ok.disabled = false; err.textContent = (x && x.responseJSON && x.responseJSON.error) || (x && x.error) || 'خطا در ارتباط با سرور'; });
        };
        return { el, close };
    }
    const amountField = (ph) => `<div class="pn-fld wl-fld"><input id="wlAmt" type="text" inputmode="numeric" autocomplete="off" placeholder="${ph}"><span>تومان</span></div>`;
    function bindAmount(el) {
        const i = el.querySelector('#wlAmt');
        i.addEventListener('input', () => { const n = toEn(i.value).replace(/\D/g, ''); i.value = n ? money(n) : ''; });
        i.focus();
        return () => +toEn(i.value).replace(/\D/g, '') || 0;
    }

    function openWithdraw() {
        if (!W) return;
        const m = modal('تسویه حساب',
            `<p class="wl-av">قابل برداشت: <b>${money(W.withdrawable)}</b> تومان</p>${amountField('مبلغ برداشت (حداقل ' + money(W.minWithdraw) + ')')}
             <button type="button" class="wl-all" id="wlAll">برداشت کل موجودی قابل برداشت</button>
             <p class="wl-hint">فقط جایزه‌هایی که بردی قابل برداشته. مبلغ واریزی‌ات برای ورود به روم‌ها خرج میشه. درخواست بعد از بررسی به شماره کارتت واریز میشه.</p>`,
            'ثبت و درخواست', (el, err) => {
                const amount = get();
                const d = jQuery.Deferred();
                WH.post('wallet/withdraw', { amount }).done(r => { W = r; paintChip(); render(); m.close(); toast('درخواست برداشت ثبت شد ✓'); d.resolve(); })
                    .fail(x => {
                        const e = x.responseJSON || {};
                        if (e.needCard) { m.close(); toast('اول شماره کارتت رو ثبت کن'); openCardSheet(); return; }
                        d.reject(x);
                    });
                return d.promise();
            });
        const get = bindAmount(m.el);
        m.el.querySelector('#wlAll').onclick = () => { const i = m.el.querySelector('#wlAmt'); i.value = W.withdrawable ? money(W.withdrawable) : ''; };
    }
    function openDeposit() {
        if (!W) return;
        const quick = [50000, 100000, 200000, 500000];
        const m = modal('افزایش موجودی',
            `${amountField('مبلغ واریز (حداقل ' + money(W.minDeposit) + ')')}
             <div class="wl-q">${quick.map(q => `<button type="button" data-q="${q}">${money(q)}</button>`).join('')}</div>
             <p class="wl-hint">درخواست واریز ثبت میشه و بعد از تایید پرداختت توسط پشتیبانی، موجودی به کیف پولت اضافه میشه.</p>`,
            'تایید و پرداخت', () => {
                const amount = get();
                return WH.post('wallet/deposit', { amount }).then(r => { W = r; paintChip(); render(); m.close(); showPayInfo(amount, r.payInfo); }, x => jQuery.Deferred().reject(x));
            });
        const get = bindAmount(m.el);
        m.el.addEventListener('click', e => { const b = e.target.closest('[data-q]'); if (b) m.el.querySelector('#wlAmt').value = money(b.dataset.q); });
    }
    function showPayInfo(amount, info) {
        const el = document.createElement('div');
        el.className = 'pn-ov dlg wl-ov';
        el.innerHTML = `<div class="pn-dlg wl-dlg"><h3>درخواست واریز ثبت شد ✓</h3>
          <p>مبلغ <b>${money(amount)}</b> تومان</p>
          ${info ? `<div class="wl-pay">${esc(info)}</div>` : ''}
          <p class="wl-hint">${info ? 'بعد از پرداخت، ' : ''}درخواستت در لیست تراکنش‌ها با وضعیت «در انتظار تایید» دیده میشه و بعد از تایید پشتیبانی، موجودی اضافه میشه.</p>
          <button type="button" class="pn-dk" data-x>فهمیدم!</button></div>`;
        el.addEventListener('click', e => { if (e.target === el || e.target.closest('[data-x]')) el.remove(); });
        document.body.appendChild(el);
    }
    function openCardSheet() {
        if (!window.WH_openCard) return;
        const sh = window.WH_openCard();
        if (sh) sh.onClose = () => load();
    }
    function toast(t) {
        const box = $('rmToasts'); if (!box) return alert(t);
        const e = document.createElement('div'); e.className = 'rm-to'; e.textContent = t; box.appendChild(e); setTimeout(() => e.remove(), 2600);
    }

    // a deposit can be cancelled while still pending
    page.addEventListener('click', e => {
        if (e.target.closest('#wWd')) return openWithdraw();
        if (e.target.closest('#wDp')) return openDeposit();
        if (e.target.closest('#wCardBox')) return openCardSheet();
        const c = e.target.closest('[data-cancel]');
        if (c && confirm('این درخواست واریز لغو شود؟')) WH.post('wallet/cancel', { id: c.dataset.cancel }).done(r => { W = r; paintChip(); render(); });
    });
    page.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.id === 'wCardBox') openCardSheet(); });

    window.WalletLoad = function () { if (W) render(); load(); };
    window.WalletRefresh = load;
    function start() { stop(); chip.hidden = false; load(); timer = setInterval(() => { if (!document.hidden) load(); }, 30000); }
    function stop() { clearInterval(timer); timer = null; chip.hidden = true; W = null; }
    document.addEventListener('visibilitychange', () => { if (!document.hidden && Auth.phone) load(); });
    Auth.onChange(ph => { ph ? start() : stop(); });
    if (Auth.phone) start();
})();

/* ---- drag-to-scroll with the mouse for every horizontally scrollable row (sliders, chips, cards), like finger swipe on mobile ---- */
(function () {
    const seen = new WeakSet();
    let el = null, startX = 0, startLeft = 0, moved = 0, saved = '';
    const scrollableX = n => {
        for (; n && n !== document.body && n.nodeType === 1; n = n.parentElement) {
            const ox = getComputedStyle(n).overflowX;
            if ((ox === 'auto' || ox === 'scroll') && n.scrollWidth > n.clientWidth + 1) return n;
        }
        return null;
    };
    document.addEventListener('mouseover', e => { // show a "grab" cursor on rows that can be dragged
        const n = scrollableX(e.target);
        if (n && !seen.has(n)) { seen.add(n); n.classList.add('xdrag'); }
    });
    document.addEventListener('mousedown', e => {
        if (e.button !== 0 || e.target.closest('input,textarea,select,[contenteditable="true"]')) return;
        const n = scrollableX(e.target); if (!n) return;
        el = n; startX = e.clientX; startLeft = n.scrollLeft; moved = 0;
        saved = n.style.scrollSnapType; n.style.scrollSnapType = 'none'; // snapping would fight the drag
    });
    document.addEventListener('mousemove', e => {
        if (!el) return;
        const dx = e.clientX - startX;
        if (!moved && Math.abs(dx) < 5) return;
        moved = 1; document.body.classList.add('xdragging');
        el.scrollLeft = startLeft - dx; // same formula works for RTL (negative scrollLeft) and LTR
        e.preventDefault();
    });
    const end = () => {
        if (!el) return;
        if (moved) { // a drag must not count as a click on the card/chip under the cursor
            const eat = ev => { ev.stopPropagation(); ev.preventDefault(); };
            document.addEventListener('click', eat, { capture: true, once: true });
            setTimeout(() => document.removeEventListener('click', eat, true), 0);
        }
        el.style.scrollSnapType = saved; el = null; moved = 0;
        document.body.classList.remove('xdragging');
    };
    document.addEventListener('mouseup', end);
    document.addEventListener('dragstart', e => { if (el) e.preventDefault(); }); // no ghost-image dragging of links/images
    window.addEventListener('blur', end);
})();
