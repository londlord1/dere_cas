const PIPS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

const DICE_LABELS = {
  under: 'меньше 7',
  seven: 'ровно 7',
  over: 'больше 7',
  double: 'дубль',
};

let diceBusy = false;

function buildDice() {
  [els.die1, els.die2].forEach((die) => {
    die.innerHTML = Array.from({ length: 9 }, () => '<span class="pip"></span>').join('');
  });
  setDie(els.die1, 3);
  setDie(els.die2, 5);
  els.diceSum.textContent = '8';
}

function setDie(el, value) {
  const active = PIPS[value] || [];
  Array.from(el.children).forEach((pip, index) => {
    pip.classList.toggle('on', active.includes(index));
  });
}

function setDiceBet(type, options = {}) {
  if (!DICE_LABELS[type]) return;
  state.diceBet = type;
  renderDiceControls();
  if (!options.silent) save();
}

function renderDiceControls() {
  els.diceBet.textContent = fmt(state.betDice);
  $$('#diceQuick [data-dice-set]').forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.diceSet) === state.betDice);
  });
  $$('#diceBets [data-dice]').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.dice === state.diceBet);
  });
}

function rollDice() {
  if (diceBusy) return;
  const bet = state.betDice;
  if (state.balance < bet) {
    notEnough();
    return;
  }

  diceBusy = true;
  const before = state.balance;
  els.rollBtn.disabled = true;
  els.rollBtn.textContent = 'Бросаем…';
  els.diceResult.textContent = 'Кубики катятся…';
  els.diceResult.className = 'result-line neutral';
  els.diceSum.textContent = '…';

  updateBalance(-bet);
  state.wagered += bet;
  state.spins += 1;
  renderStats();
  maybeAllIn(before, bet);
  if (Math.random() < 0.35) speak(getActive().id, 'spin');
  Sound.click();

  els.die1.classList.add('rolling');
  els.die2.classList.add('rolling');

  const interval = window.setInterval(() => {
    setDie(els.die1, randInt(1, 6));
    setDie(els.die2, randInt(1, 6));
    Sound.tick();
  }, 70);

  window.setTimeout(() => {
    window.clearInterval(interval);
    const a = randInt(1, 6);
    const b = randInt(1, 6);
    const sum = a + b;
    setDie(els.die1, a);
    setDie(els.die2, b);
    els.die1.classList.remove('rolling');
    els.die2.classList.remove('rolling');
    els.diceSum.textContent = String(sum);
    resolveDice(a, b, sum, bet, before);
  }, 880);
}

function resolveDice(a, b, sum, bet, before) {
  const type = state.diceBet;
  let win = 0;

  if (type === 'under' && sum < 7) win = bet * 2;
  if (type === 'over' && sum > 7) win = bet * 2;
  if (type === 'seven' && sum === 7) win = bet * 5;
  if (type === 'double' && a === b) win = bet * 6;

  if (win > 0) {
    updateBalance(win);
    state.bestWin = Math.max(state.bestWin, win);
  }
  state.net += win - bet;
  renderStats();

  if (win > 0) {
    els.diceResult.textContent = `${a} + ${b} = ${sum} · ${DICE_LABELS[type]} · +${fmt(win)}`;
    els.diceResult.className = 'result-line win';
    outcome(`+${fmt(win)}`, 'win');
    if (win >= 200) coinBurst(win >= 1000 ? 42 : 20);
  } else {
    els.diceResult.textContent = `${a} + ${b} = ${sum} · ${DICE_LABELS[type]} · мимо`;
    els.diceResult.className = 'result-line lose';
    outcome('мимо', 'lose');
  }

  resultSound(win, bet, win >= bet * 5);

  if (win > 0 && type === 'seven' && sum === 7) {
    addAffection(state.active, 8);
    speak(state.active, 'dice7', { win });
  } else if (win > 0 && win >= bet * 4) {
    react('bigwin', { win }, { force: true });
  } else if (win > 0) {
    react('win', { win });
  } else {
    react(bet >= before * 0.35 ? 'biglose' : 'lose', { bet });
  }

  checkAchievements({
    win, stake: bet, before, game: 'dice', diceSum: sum, diceType: type,
  });

  diceBusy = false;
  els.rollBtn.disabled = false;
  els.rollBtn.textContent = 'Бросить';
  save();
}
