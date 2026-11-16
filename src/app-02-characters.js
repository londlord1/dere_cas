const CHARS = [
  {
    id: 'mika',
    name: 'Мика',
    arch: 'цундере',
    color: '#ff5fa8',
    img: '{{MIKA}}',
    tagline: '«Н-не думай, что я рада»',
    lines: {
      greet: [
        `Ч-чего уставился? Я здесь не для того, чтобы на меня смотрели... хотя ладно, смотри.`,
        `Не думай, что я рада тебя видеть. Просто смена началась, вот и всё.`,
      ],
      idle: [
        `Ну и чего ты ждёшь? Фишки сами себя не потратят.`,
        `Я не скучаю. Я просто... наблюдаю. За столом.`,
        `Если будешь долго думать, я начну думать, что ты боишься. И буду права.`,
      ],
      spin: [
        `Давай уже, крути. Я не нервничаю!`,
        `Смотри не проиграй всё. Я... не хочу потом тебя утешать.`,
      ],
      win: [
        `Хм! Неплохо. Но не думай, что я впечатлена. ...Совсем чуть-чуть.`,
        `{win} фишек? Это... нормально. Для новичка.`,
        `Не смотри на меня так! Это просто удача, а не потому что я болела.`,
      ],
      bigwin: [
        `{win}?! Т-ты серьёзно? Я же... я же говорила, что у тебя получится! Забудь, что я это сказала.`,
        `Ладно, ладно! Ты молодец. Но только сегодня!`,
      ],
      jackpot: [
        `ДЖЕКПОТ?! С ума сойти... Я... я горжусь тобой, бака. Только не рассказывай никому, что я так сказала.`,
      ],
      lose: [
        `Ну и ладно. Это всего лишь фишки. ...Не расстраивайся, слышишь?`,
        `Проиграл? Бывает. Не смотри на меня так, я не расстроена. Правда.`,
      ],
      biglose: [
        `Эй! Ты чего так много поставил?! Я же... я же волновалась!`,
        `Это была плохая идея, глупый. ...Но я всё равно здесь.`,
      ],
      broke: [
        `Всё проиграл? Глупый... Держи, я подкину. Но это в последний раз! ...Наверное.`,
      ],
      rescue: [
        `Вот, возьми. Не думай, что это из жалости. Просто мне скучно без тебя.`,
      ],
      near: [
        `Так близко! ...Не переживай. В следующий раз точно. Я в тебя верю. Немного.`,
      ],
      allin: [
        `Ты поставил всё?! Ты ненормальный! ...Ладно. Я с тобой.`,
      ],
      needbet: [
        `Сначала поставь фишки, гений.`,
      ],
      dice7: [
        `Семь! Ха! Я же говорила, что семёрка — счастливая. ...Не спрашивай откуда.`,
      ],
    },
  },
  {
    id: 'yuri',
    name: 'Юри',
    arch: 'яндере',
    color: '#ff4d6a',
    img: '{{YURI}}',
    tagline: '«Ты ведь только мой, да?»',
    lines: {
      greet: [
        `Я так ждала тебя. Ты ведь не заставлял себя ждать? ...Правда?`,
        `Я уже проверила всех крупье. Они не соперницы.`,
      ],
      idle: [
        `Я запомнила, на какую клетку ты смотришь. Просто на всякий случай.`,
        `Другие девушки за столами? Я их не вижу. И ты не должен.`,
        `Если тебе станет скучно, я могу... придумать развлечение.`,
      ],
      spin: [
        `Крути. Я буду смотреть только на тебя.`,
        `Не отвлекайся. Я считаю каждое твоё движение.`,
      ],
      win: [
        `Ты такой красивый, когда выигрываешь. Я сохраню это воспоминание. Навсегда.`,
        `{win}? Прекрасно. Теперь мы можем позволить себе больше. Вместе.`,
      ],
      bigwin: [
        `Все эти фишки... теперь наши. Только наши, слышишь? Никому больше.`,
      ],
      jackpot: [
        `Джекпот... Значит, теперь ты никуда не уйдёшь. У тебя ведь так много, чтобы остаться.`,
      ],
      lose: [
        `Ничего. Я не позволю тебе проиграть совсем. Ты мой.`,
        `Ты расстроен? Скажи, кто тебя расстроил. Я... поговорю с ним.`,
      ],
      biglose: [
        `Кто-то должен ответить за это. ...Шучу. Почти.`,
      ],
      broke: [
        `Теперь у тебя ничего нет. Кроме меня. Это... идеально.`,
      ],
      rescue: [
        `Я всегда ношу с собой фишки для тебя. Вот. Теперь ты должен мне... кое-что.`,
      ],
      near: [
        `Почти. Так близко, что у меня зачесались руки. ...От волнения.`,
      ],
      allin: [
        `Всё? Насмерть? Как романтично.`,
      ],
      needbet: [
        `Ты забыл поставить. Я подожду. Я умею ждать.`,
      ],
      dice7: [
        `Семёрка. Моё любимое число. Совпадение? Я так не думаю.`,
      ],
    },
  },
  {
    id: 'hana',
    name: 'Хана',
    arch: 'дередере',
    color: '#ffb347',
    img: '{{HANA}}',
    tagline: '«Ты справишься! Я верю!»',
    lines: {
      greet: [
        `Ты пришёл! Ура! Я уже думала, что ты меня забыл!`,
        `Какой красивый стол! Давай скорее играть!`,
      ],
      idle: [
        `У тебя получится! Я в тебя верю больше, чем в кого бы то ни было!`,
        `Если проиграешь, я всё равно буду рядом! Правда-правда!`,
        `Ты уже придумал, на что потратишь выигрыш? Я — да!`,
      ],
      spin: [
        `Крути-крути-крути! Я загадала желание!`,
        `Я держу кулачки! И ножки! И хвостик!`,
      ],
      win: [
        `Я знала! Я же говорила! Ты самый-самый лучший!`,
        `{win} фишек! Ух ты! Обнимашки!`,
      ],
      bigwin: [
        `Ура-а-а! Я же говорила! Смотрите все, какой он молодец!`,
        `{win}! Это же целая гора! Я сейчас запрыгаю!`,
      ],
      jackpot: [
        `ДЖЕКПОТ! Я сейчас заплачу от счастья! Дай я тебя обниму!`,
      ],
      lose: [
        `Не расстраивайся, солнышко! В следующий раз точно получится. Я буду верить ещё сильнее!`,
        `Ой... Ну ничего. Фишки — это просто фишки. А ты у нас один!`,
      ],
      biglose: [
        `Ой-ой... Ничего! Я соберу тебе фишек, у меня есть заначка!`,
      ],
      broke: [
        `Ой... не грусти! Вот, возьми мои фишки! Я их не тратила, честно!`,
      ],
      rescue: [
        `Вот! Все мои фишки — твои! Только не уходи, ладно?`,
      ],
      near: [
        `Так близко! Ну ничего-о-о. Ещё один разок, для меня?`,
      ],
      allin: [
        `Всё-всё? Ух! Я с тобой, я буду держать за руку!`,
      ],
      needbet: [
        `Сначала фишечку на стол! Вот сюда!`,
      ],
      dice7: [
        `Семь! Мне нравится эта цифра! Она как счастливая улыбка!`,
      ],
    },
  },
  {
    id: 'rei',
    name: 'Рэй',
    arch: 'куудере',
    color: '#6fd6ff',
    img: '{{REI}}',
    tagline: '«…Неплохо. Продолжай»',
    lines: {
      greet: [
        `…Пришёл. Хорошо.`,
        `Я уже здесь. Можешь начинать.`,
      ],
      idle: [
        `…Продолжай. Я наблюдаю.`,
        `Математика говорит, что ты скоро сделаешь ставку. Я проверяла.`,
        `…Здесь уютно. Если не считать людей.`,
      ],
      spin: [
        `Крути. Я посчитала вероятности.`,
        `…Оптимальная ставка — не всегда самая большая. Но решай сам.`,
      ],
      win: [
        `…Неплохо. Расчёт оказался верным.`,
        `{win}. Это выгоднее, чем я ожидала.`,
      ],
      bigwin: [
        `…Впечатляет. Я записала это в дневник.`,
      ],
      jackpot: [
        `…Джекпот. Теперь мне придётся поверить в удачу.`,
      ],
      lose: [
        `Минус. Это было ожидаемо. Математика не на твоей стороне.`,
        `…Не расстраивайся. Дисперсия — это нормально.`,
      ],
      biglose: [
        `…Ты превысил разумный риск. Я всё видела.`,
      ],
      broke: [
        `…Ты на дне. С точки зрения статистики. Держи фишки.`,
      ],
      rescue: [
        `…Возьми. Без процентов. В этот раз.`,
      ],
      near: [
        `Почти. Вероятность была невелика. Ты молодец, что попробовал.`,
      ],
      allin: [
        `…Всё. Один бросок. Мне интересно.`,
      ],
      needbet: [
        `Ставка отсутствует. Математически это бессмысленно.`,
      ],
      dice7: [
        `Семь. Наиболее вероятная сумма. Ты наконец-то играешь рационально.`,
      ],
    },
  },
  {
    id: 'yuki',
    name: 'Юки',
    arch: 'дандере',
    color: '#c79bff',
    img: '{{YUKI}}',
    tagline: '«Я… я тихонько поболею…»',
    lines: {
      greet: [
        `Э-эм... я... я пришла посмотреть... если ты не против...`,
        `А... привет. Я... я встану вот здесь, с краешка...`,
      ],
      idle: [
        `Я... я тихонько здесь посижу... хорошо?`,
        `Ты... ты не забывай дышать между ставками... ладно?`,
        `Я... я верю в тебя... очень.`,
      ],
      spin: [
        `Я... я зажмурюсь... и буду болеть!`,
        `П-пожалуйста... пусть получится...`,
      ],
      win: [
        `Ой! ...П-поздравляю. Я радовалась очень тихо.`,
        `{win}? Э-это же... здорово... я горжусь тобой.`,
      ],
      bigwin: [
        `Ах... это... это так здорово... я... я чуть не заплакала...`,
      ],
      jackpot: [
        `Дж...джекпот... я... я не знаю, что сказать... обними меня... ой, то есть...`,
      ],
      lose: [
        `Всё х-хорошо... я рядом... если хочешь...`,
        `Н-не грусти... пожалуйста... я не люблю, когда ты грустишь...`,
      ],
      biglose: [
        `Я... я принесла платок... и фишки... на всякий случай...`,
      ],
      broke: [
        `Я... я принесла тебе фишки... не смотри так... это не жалость...`,
      ],
      rescue: [
        `В-возьми... я собирала... для тебя...`,
      ],
      near: [
        `Т-так близко... я... я почти поверила...`,
      ],
      allin: [
        `В-всё?.. Я... я за тебя... но можно я отвернусь?`,
      ],
      needbet: [
        `Э-эм... сначала... поставь... пожалуйста...`,
      ],
      dice7: [
        `С-семь... это... счастливое число... я читала...`,
      ],
    },
  },
  {
    id: 'ayaka',
    name: 'Аяка',
    arch: 'химедере',
    color: '#ffd05c',
    img: '{{AYAKA}}',
    tagline: '«Не заставляй меня скучать»',
    lines: {
      greet: [
        `Хм. Ты пришёл. Для простолюдина у тебя неплохой вкус.`,
        `Я снизошла до того, чтобы ждать тебя. Не заставляй меня жалеть.`,
      ],
      idle: [
        `Не заставляй меня скучать. Я, вообще-то, могла быть на приёме.`,
        `Этот стол мог бы быть повыше. И фишки — покрасивее.`,
        `Играй уже. Я смотрю. Это почти комплимент.`,
      ],
      spin: [
        `Крути, простолюдин. Я разрешаю.`,
        `Посмотрим, на что способен человек без титула.`,
      ],
      win: [
        `О-хо-хо! Неплохо для того, кто не родился в золотой колыбели.`,
        `{win}? Хм. Я могла бы впечатлиться. Чуть-чуть.`,
      ],
      bigwin: [
        `Впечатляюще! Пожалуй, я позволю тебе поцеловать мою руку.`,
      ],
      jackpot: [
        `ДЖЕКПОТ?! Ну... это уже неприлично. Я даже немного завидую. ...Шучу!`,
      ],
      lose: [
        `Ничтожество. ...Но я всё ещё смотрю. Не заставляй меня пожалеть.`,
        `Проигрыш? Как вульгарно. Впрочем, я не удивлена.`,
      ],
      biglose: [
        `Ты проиграл больше, чем моя горничная за месяц. Это почти талант.`,
      ],
      broke: [
        `Слуги! Выдайте этому бедняге фишек. Мне скучно без него.`,
      ],
      rescue: [
        `Держи. Это не милостыня, это инвестиция в моё развлечение.`,
      ],
      near: [
        `Почти? Фу. Не заставляй меня переживать, это вредит коже.`,
      ],
      allin: [
        `Всё? Как драматично. Продолжай, я достаю веер.`,
      ],
      needbet: [
        `Без ставки? Как грубо.`,
      ],
      dice7: [
        `Семь. Удача любит смелых. И меня, разумеется.`,
      ],
    },
  },
];

const BY_ID = Object.fromEntries(CHARS.map((c) => [c.id, c]));

function createInitialState() {
  const affection = {};
  CHARS.forEach((c) => { affection[c.id] = 40; });
  return {
    balance: START_BALANCE,
    active: 'mika',
    onboarded: false,
    sound: true,
    affection,
    achievements: [],
    spins: 0,
    bestWin: 0,
    wagered: 0,
    net: 0,
    betSlots: 50,
    betDice: 50,
    chip: 50,
    diceBet: 'under',
    game: 'slots',
  };
}

let state = createInitialState();
let pickedChar = 'mika';
let lastCommentAt = Date.now();
const lineHistory = {};

function getActive() {
  return BY_ID[state.active] || CHARS[0];
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return false;

    if (Number.isFinite(data.balance)) state.balance = clamp(Math.round(data.balance), 0, 10000000);
    if (BY_ID[data.active]) state.active = data.active;
    state.onboarded = Boolean(data.onboarded);
    state.sound = data.sound !== false;
    if (Number.isFinite(data.spins)) state.spins = Math.max(0, Math.round(data.spins));
    if (Number.isFinite(data.bestWin)) state.bestWin = Math.max(0, Math.round(data.bestWin));
    if (Number.isFinite(data.wagered)) state.wagered = Math.max(0, Math.round(data.wagered));
    if (Number.isFinite(data.net)) state.net = Math.round(data.net);
    if (Number.isFinite(data.betSlots)) state.betSlots = clamp(Math.round(data.betSlots), 10, 500);
    if (Number.isFinite(data.betDice)) state.betDice = clamp(Math.round(data.betDice), 10, 500);
    if ([10, 25, 50, 100, 500].includes(Number(data.chip))) state.chip = Number(data.chip);
    if (['under', 'seven', 'over', 'double'].includes(data.diceBet)) state.diceBet = data.diceBet;
    if (['slots', 'roulette', 'dice'].includes(data.game)) state.game = data.game;

    if (data.affection && typeof data.affection === 'object') {
      CHARS.forEach((c) => {
        const v = Number(data.affection[c.id]);
        if (Number.isFinite(v)) state.affection[c.id] = clamp(Math.round(v), 0, 100);
      });
    }
    if (Array.isArray(data.achievements)) {
      state.achievements = data.achievements.filter((id) => ACHIEVEMENTS.some((a) => a.id === id));
    }
    if (data.rouletteBets && typeof data.rouletteBets === 'object') {
      Object.entries(data.rouletteBets).forEach(([key, value]) => {
        const amount = Number(value);
        if (key.length <= 4 && Number.isFinite(amount) && amount > 0) {
          roulette.bets[key] = Math.round(amount);
        }
      });
    }
    if (Array.isArray(data.rouletteStack)) {
      data.rouletteStack.forEach((item) => {
        if (!item || typeof item.key !== 'string') return;
        const amount = Number(item.amount);
        if (Number.isFinite(amount) && amount > 0) {
          roulette.stack.push({ key: item.key, amount: Math.round(amount) });
        }
      });
    }
    return true;
  } catch (err) {
    return false;
  }
}

function save() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      balance: state.balance,
      active: state.active,
      onboarded: state.onboarded,
      sound: state.sound,
      affection: state.affection,
      achievements: state.achievements,
      spins: state.spins,
      bestWin: state.bestWin,
      wagered: state.wagered,
      net: state.net,
      betSlots: state.betSlots,
      betDice: state.betDice,
      chip: state.chip,
      diceBet: state.diceBet,
      game: state.game,
      rouletteBets: roulette.bets,
      rouletteStack: roulette.stack.slice(-60),
    }));
  } catch (err) {
    /* localStorage may be unavailable in sandboxed previews */
  }
}

function renderBalance() {
  els.balanceValue.textContent = fmt(state.balance);
  els.balancePill.classList.toggle('low', state.balance < 50);
  const canRescue = state.balance < 50;
  els.rescueBtn.disabled = !canRescue;
  els.rescueBtn.title = canRescue
    ? 'Взять 200 фишек у активной тян'
    : 'Доступно, когда на балансе меньше 50 фишек';
}

function updateBalance(delta, options = {}) {
  state.balance = Math.max(0, Math.round(state.balance + delta));
  renderBalance();
  if (!options.silent) save();
  return state.balance;
}

function heartsHtml(value) {
  const filled = clamp(Math.round(value / 20), 0, 5);
  let out = '';
  for (let i = 0; i < 5; i += 1) {
    out += `<span class="${i < filled ? '' : 'empty'}">♥</span>`;
  }
  return out;
}

function renderRoster() {
  els.rosterList.innerHTML = CHARS.map((c) => `
    <button class="char ${c.id === state.active ? 'active' : ''}" type="button"
      style="--c:${c.color}" data-char="${c.id}"
      aria-pressed="${c.id === state.active}" aria-label="${c.name}, ${c.arch}">
      <span class="char-ava"><img src="${c.img}" alt=""></span>
      <span class="char-main">
        <b>${c.name}</b>
        <small>${c.arch}</small>
        <span class="hearts" data-hearts="${c.id}">${heartsHtml(state.affection[c.id])}</span>
      </span>
    </button>
  `).join('');
  if (els.rosterList.scrollWidth > els.rosterList.clientWidth + 4) {
    const active = els.rosterList.querySelector('.char.active');
    if (active) active.scrollIntoView({ block: 'nearest', inline: 'center' });
  }
}

function updateHearts(id) {
  const el = els.rosterList.querySelector(`[data-hearts="${id}"]`);
  if (el) el.innerHTML = heartsHtml(state.affection[id]);
}

function setActive(id, greet = true) {
  if (!BY_ID[id]) return;
  state.active = id;
  renderRoster();
  const c = BY_ID[id];
  els.speech.style.setProperty('--c', c.color);
  els.speechAvatar.src = c.img;
  els.speechAvatar.alt = c.name;
  els.speechName.textContent = c.name;
  els.speechArch.textContent = c.arch;
  if (greet) speak(id, 'greet');
  save();
}

function addAffection(id, delta) {
  state.affection[id] = clamp((state.affection[id] ?? 40) + delta, 0, 100);
  updateHearts(id);
  if (state.affection[id] >= 80) unlock('sympathy');
  save();
}

function fillTokens(text, data = {}) {
  return text
    .replace(/\{win\}/g, fmt(data.win ?? 0))
    .replace(/\{bet\}/g, fmt(data.bet ?? 0))
    .replace(/\{balance\}/g, fmt(state.balance));
}

function pickLine(key, bank) {
  let options = bank;
  const prev = lineHistory[key];
  if (bank.length > 1 && prev) {
    const filtered = bank.filter((line) => line !== prev);
    if (filtered.length) options = filtered;
  }
  const text = pick(options);
  lineHistory[key] = text;
  return text;
}

const MOODS = {
  greet: 'смотрит на тебя',
  idle: 'наблюдает',
  spin: 'болеет',
  win: 'довольна',
  bigwin: 'в восторге',
  jackpot: 'в шоке',
  lose: 'хмурится',
  biglose: 'переживает',
  broke: 'жалеет',
  rescue: 'смягчилась',
  near: 'закусила губу',
  allin: 'нервничает',
  needbet: 'ждёт ставку',
  dice7: 'улыбается',
};

function speak(charId, event, data = {}) {
  const c = BY_ID[charId];
  if (!c) return;
  const bank = (c.lines[event] && c.lines[event].length) ? c.lines[event] : c.lines.idle;
  const text = fillTokens(pickLine(`${c.id}:${event}`, bank), data);

  els.speech.style.setProperty('--c', c.color);
  els.speechAvatar.src = c.img;
  els.speechAvatar.alt = c.name;
  els.speechName.textContent = c.name;
  els.speechArch.textContent = c.arch;
  els.speechMood.textContent = MOODS[event] || 'наблюдает';
  els.speechText.textContent = text;

  els.speech.classList.remove('pop');
  void els.speech.offsetWidth;
  els.speech.classList.add('pop');

  pushFeed(c, text);
  lastCommentAt = Date.now();
}

function pushFeed(c, text) {
  const el = document.createElement('div');
  el.className = 'msg';
  el.style.setProperty('--c', c.color);
  const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  el.innerHTML = `<img src="${c.img}" alt=""><div class="msg-body"><div class="msg-head"><b></b><span></span><time></time></div><p></p></div>`;
  el.querySelector('b').textContent = c.name;
  el.querySelector('span').textContent = c.arch;
  el.querySelector('time').textContent = time;
  el.querySelector('p').textContent = text;
  els.feed.appendChild(el);
  while (els.feed.children.length > 40) els.feed.removeChild(els.feed.firstElementChild);
  els.feed.scrollTop = els.feed.scrollHeight;
}

function systemFeed(text) {
  const el = document.createElement('div');
  el.className = 'msg system';
  el.style.setProperty('--c', '#4fe3ff');
  const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  el.innerHTML = `<div class="msg-body"><div class="msg-head"><b>OASIS</b><span>система</span><time></time></div><p></p></div>`;
  el.querySelector('time').textContent = time;
  el.querySelector('p').textContent = text;
  els.feed.appendChild(el);
  els.feed.scrollTop = els.feed.scrollHeight;
}

function react(event, data = {}, options = {}) {
  const active = getActive();
  let speaker = active;
  if (!options.force && Math.random() < 0.18) {
    const others = CHARS.filter((c) => c.id !== active.id);
    if (others.length) speaker = pick(others);
  }
  if (event === 'win') addAffection(active.id, 4);
  if (event === 'bigwin') addAffection(active.id, 8);
  if (event === 'jackpot') addAffection(active.id, 14);
  if (event === 'lose') addAffection(active.id, -2);
  if (event === 'biglose') addAffection(active.id, -4);
  speak(speaker.id, event, data);
}

function toast(kicker, text, kind = '') {
  const el = document.createElement('div');
  el.className = `toast ${kind}`.trim();
  el.innerHTML = '<b></b><span></span>';
  el.querySelector('b').textContent = kicker;
  el.querySelector('span').textContent = text;
  els.toasts.appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 320);
  }, 3600);
}

function unlock(id) {
  if (state.achievements.includes(id)) return;
  const achievement = ACHIEVEMENTS.find((a) => a.id === id);
  if (!achievement) return;
  state.achievements.push(id);
  renderAchievements();
  toast('Достижение', `${achievement.icon} ${achievement.name}`, 'info');
  Sound.achievement();
  save();
}

function renderAchievements() {
  els.achList.innerHTML = ACHIEVEMENTS.map((a) => `
    <div class="ach-item ${state.achievements.includes(a.id) ? 'unlocked' : ''}" title="${a.desc}">
      <span class="ico">${a.icon}</span><span>${a.name}</span>
    </div>
  `).join('');
}

function rankFor(wagered) {
  if (wagered >= 20000) return 'Легенда Oasis';
  if (wagered >= 8000) return 'Хайроллер';
  if (wagered >= 2500) return 'Завсегдатай';
  if (wagered >= 500) return 'Игрок';
  return 'Новичок';
}

function renderStats() {
  els.statSpins.textContent = fmt(state.spins);
  els.statBest.textContent = fmt(state.bestWin);
  els.statWagered.textContent = fmt(state.wagered);
  els.statNet.textContent = `${state.net > 0 ? '+' : ''}${fmt(state.net)}`;
  els.statNet.className = state.net > 0 ? 'pos' : state.net < 0 ? 'neg' : '';
  els.rankBadge.textContent = rankFor(state.wagered);
}

function checkAchievements(options = {}) {
  const {
    win = 0, stake = 0, before = 0, game = '', diceSum = 0, diceType = '', colorHit = false,
  } = options;
  if (win > 0) unlock('firstWin');
  if (win >= 500) unlock('bigWin');
  if (win >= 1000) unlock('jackpot');
  if (win > 0 && stake > 0 && stake >= before * 0.5) unlock('allin');
  if (game === 'roulette' && win > 0 && colorHit) unlock('color');
  if (game === 'dice' && win > 0 && diceType === 'seven' && diceSum === 7) unlock('seven');
  if (state.balance < 10) unlock('broke');
  if (Math.max(...Object.values(state.affection)) >= 80) unlock('sympathy');
}
