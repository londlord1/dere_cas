const SYMBOLS = [
  { id: 'cherry', glyph: '🍒', weight: 26, pay: 8 },
  { id: 'lemon', glyph: '🍋', weight: 22, pay: 10 },
  { id: 'bell', glyph: '🔔', weight: 18, pay: 14 },
  { id: 'star', glyph: '⭐', weight: 14, pay: 20 },
  { id: 'diamond', glyph: '💎', weight: 10, pay: 30 },
  { id: 'seven', glyph: '7', weight: 6, pay: 60, seven: true },
  { id: 'cat', glyph: '🐱', weight: 4, wild: true },
];
const SYM_BY_ID = Object.fromEntries(SYMBOLS.map((s) => [s.id, s]));
const SYMBOL_WEIGHT = SYMBOLS.reduce((sum, s) => sum + s.weight, 0);
const reelEls = [];
let slotBusy = false;
let outcomeTimer = 0;

function randomSymbol() {
  let roll = Math.random() * SYMBOL_WEIGHT;
  for (const sym of SYMBOLS) {
    roll -= sym.weight;
    if (roll <= 0) return sym;
  }
  return SYMBOLS[0];
}

function symMarkup(sym) {
  return `<span class="sym${sym.seven ? ' seven' : ''}">${sym.glyph}</span>`;
}

function buildReels() {
  for (let col = 0; col < 3; col += 1) {
    const reel = document.createElement('div');
    reel.className = 'reel';
    reel.dataset.col = String(col);
    for (let row = 0; row < 3; row += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const sym = randomSymbol();
      cell.innerHTML = symMarkup(sym);
      cell.dataset.sym = sym.id;
      reel.appendChild(cell);
    }
    els.reels.appendChild(reel);
    reelEls.push(reel);
  }
}

function setReelSymbols(col, symbols) {
  const cells = reelEls[col].children;
  for (let row = 0; row < 3; row += 1) {
    cells[row].innerHTML = symMarkup(symbols[row]);
    cells[row].dataset.sym = symbols[row].id;
    cells[row].classList.remove('win');
  }
}

function setReelRandom(col) {
  for (let row = 0; row < 3; row += 1) {
    const sym = randomSymbol();
    reelEls[col].children[row].innerHTML = symMarkup(sym);
    reelEls[col].children[row].dataset.sym = sym.id;
  }
}

function buildPaytable() {
  const order = ['seven', 'diamond', 'star', 'bell', 'lemon', 'cherry'];
  const items = order.map((id) => {
    const sym = SYM_BY_ID[id];
    return `<span class="pt"><i>${sym.glyph}</i>×${sym.pay}</span>`;
  });
  items.push('<span class="pt wild"><i>🐱</i> wild · ×100</span>');
  els.paytable.innerHTML = items.join('');
}

function clearSlotWin() {
  $$('#reels .cell.win').forEach((cell) => cell.classList.remove('win'));
}

function setSlotBet(value) {
  state.betSlots = clamp(Math.round(value / 10) * 10, 10, 500);
  els.slotBet.textContent = fmt(state.betSlots);
  $$('#slotQuick [data-set-bet]').forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.setBet) === state.betSlots);
  });
  save();
}

function outcome(text, kind = 'win') {
  els.outcome.textContent = text;
  els.outcome.className = `outcome ${kind}`;
  void els.outcome.offsetWidth;
  els.outcome.classList.add('show');
  clearTimeout(outcomeTimer);
  outcomeTimer = window.setTimeout(() => els.outcome.classList.remove('show'), 1500);
}

function coinBurst(count = 24) {
  const chars = ['🪙', '✨', '💫', '⭐'];
  for (let i = 0; i < count; i += 1) {
    const coin = document.createElement('span');
    coin.className = 'coin';
    coin.textContent = pick(chars);
    coin.style.left = `${10 + Math.random() * 80}vw`;
    coin.style.animationDuration = `${1.1 + Math.random() * 1.1}s`;
    coin.style.animationDelay = `${Math.random() * 0.35}s`;
    coin.style.fontSize = `${14 + Math.random() * 18}px`;
    document.body.appendChild(coin);
    window.setTimeout(() => coin.remove(), 2700);
  }
}

function shakeScreen() {
  document.body.classList.add('shake');
  window.setTimeout(() => document.body.classList.remove('shake'), 540);
}

function resultSound(win, stake, jackpot = false) {
  if (win <= 0) {
    Sound.lose();
    return;
  }
  if (jackpot || win >= stake * 10) Sound.jackpot();
  else if (win >= stake * 3) Sound.bigwin();
  else Sound.win();
}

function maybeAllIn(before, stake) {
  if (stake >= before * 0.5 && Math.random() < 0.45) {
    window.setTimeout(() => speak(getActive().id, 'allin'), 240);
  }
}

function notEnough() {
  Sound.broke();
  react('broke', {}, { force: true });
  toast('Мало фишек', 'Попроси у тян — кнопка в блоке статистики', 'info');
  els.rescueBtn.classList.add('pulse');
  window.setTimeout(() => els.rescueBtn.classList.remove('pulse'), 2800);
}

function evalLine(line) {
  const wilds = line.filter((s) => s.wild).length;
  if (wilds === 3) return { mult: 100, jackpot: true };
  if (wilds === 2) {
    const sym = line.find((s) => !s.wild);
    return sym ? { mult: sym.pay } : null;
  }
  if (wilds === 1) {
    const rest = line.filter((s) => !s.wild);
    return rest[0].id === rest[1].id ? { mult: rest[0].pay } : null;
  }
  if (line[0].id === line[1].id && line[1].id === line[2].id) {
    return { mult: line[0].pay };
  }
  return null;
}

function lineKeys(index) {
  if (index < 3) return [0, 1, 2].map((col) => `${col}-${index}`);
  if (index === 3) return ['0-0', '1-1', '2-2'];
  return ['0-2', '1-1', '2-0'];
}

function detectNear(lines) {
  return lines.some((line) => {
    if (line.some((s) => s.wild)) return false;
    const counts = {};
    line.forEach((s) => { counts[s.id] = (counts[s.id] || 0) + 1; });
    const values = Object.values(counts).sort((a, b) => a - b);
    return values.length === 2 && values[1] === 2;
  });
}

function spinSlots() {
  if (slotBusy) return;
  const bet = state.betSlots;
  if (state.balance < bet) {
    notEnough();
    return;
  }

  slotBusy = true;
  const before = state.balance;
  clearSlotWin();
  els.spinBtn.disabled = true;
  els.spinBtn.textContent = 'Крутим…';
  els.slotResult.textContent = 'Барабаны решают…';
  els.slotResult.className = 'result-line neutral';
  els.slotTicker.textContent = 'в игре';

  updateBalance(-bet);
  state.wagered += bet;
  state.spins += 1;
  renderStats();
  maybeAllIn(before, bet);
  if (Math.random() < 0.35) speak(getActive().id, 'spin');
  Sound.click();

  const finals = [0, 1, 2].map(() => [0, 1, 2].map(() => randomSymbol()));

  for (let col = 0; col < 3; col += 1) {
    const reel = reelEls[col];
    reel.classList.add('spinning');
    const interval = window.setInterval(() => {
      setReelRandom(col);
      Sound.tick();
    }, 65);
    window.setTimeout(() => {
      window.clearInterval(interval);
      setReelSymbols(col, finals[col]);
      reel.classList.remove('spinning');
      Sound.reel();
    }, 430 + col * 250);
  }

  window.setTimeout(() => resolveSlots(finals, bet, before), 430 + 2 * 250 + 280);
}

function resolveSlots(grid, bet, before) {
  const lineBet = Math.max(1, Math.floor(bet / 5));
  const lines = [
    [grid[0][0], grid[1][0], grid[2][0]],
    [grid[0][1], grid[1][1], grid[2][1]],
    [grid[0][2], grid[1][2], grid[2][2]],
    [grid[0][0], grid[1][1], grid[2][2]],
    [grid[0][2], grid[1][1], grid[2][0]],
  ];

  let win = 0;
  let jackpot = false;
  const winningCells = new Set();

  lines.forEach((line, index) => {
    const result = evalLine(line);
    if (!result) return;
    win += result.mult * lineBet;
    if (result.jackpot) jackpot = true;
    lineKeys(index).forEach((key) => winningCells.add(key));
  });

  winningCells.forEach((key) => {
    const [col, row] = key.split('-').map(Number);
    const cell = reelEls[col] && reelEls[col].children[row];
    if (cell) cell.classList.add('win');
  });
  window.setTimeout(clearSlotWin, 1650);

  if (win > 0) {
    updateBalance(win);
    state.bestWin = Math.max(state.bestWin, win);
  }
  state.net += win - bet;
  renderStats();

  if (win > 0) {
    const ratio = (win / bet).toFixed(1).replace('.', ',');
    els.slotResult.textContent = `Выигрыш +${fmt(win)} · ${ratio}× ставки`;
    els.slotResult.className = 'result-line win';
    els.slotTicker.textContent = `+${fmt(win)}`;
    outcome(`+${fmt(win)}`, 'win');
    if (win >= 200) coinBurst(win >= 1000 ? 48 : 24);
  } else {
    els.slotResult.textContent = 'Пусто. Следующий спин может всё изменить.';
    els.slotResult.className = 'result-line lose';
    els.slotTicker.textContent = 'пусто';
    outcome('мимо', 'lose');
  }

  resultSound(win, bet, jackpot);

  if (win === 0 && detectNear(lines) && Math.random() < 0.6) {
    react('near', {}, { force: true });
  } else if (win === 0) {
    react(bet >= before * 0.35 ? 'biglose' : 'lose', { bet });
  } else if (jackpot || win >= bet * 12) {
    react('jackpot', { win }, { force: true });
    shakeScreen();
  } else if (win >= bet * 3) {
    react('bigwin', { win }, { force: true });
  } else {
    react('win', { win });
  }

  checkAchievements({ win, stake: bet, before, game: 'slots' });

  slotBusy = false;
  els.spinBtn.disabled = false;
  els.spinBtn.textContent = 'Крутить';
  save();
}
