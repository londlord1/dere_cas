function renderSlotControls() {
  els.slotBet.textContent = fmt(state.betSlots);
  $$('#slotQuick [data-set-bet]').forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.setBet) === state.betSlots);
  });
}

function updateSoundButton() {
  els.soundBtn.textContent = state.sound ? '🔊' : '🔇';
  els.soundBtn.setAttribute('aria-pressed', String(state.sound));
  els.soundBtn.title = state.sound ? 'Выключить звук' : 'Включить звук';
}

function renderAll() {
  renderRoster();
  renderBalance();
  renderStats();
  renderAchievements();
  renderSlotControls();
  renderDiceControls();
  renderChips();
  updateBetsUI();
  updateSoundButton();
}

function setGame(game, options = {}) {
  if (!['slots', 'roulette', 'dice'].includes(game)) game = 'slots';
  state.game = game;
  els.tabs.forEach((btn) => {
    const on = btn.dataset.game === game;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-selected', String(on));
  });
  els.views.forEach((view) => {
    view.classList.toggle('active', view.id === `view-${game}`);
  });
  if (game === 'roulette') {
    if (!wheelFaceReady) buildWheelFace();
    drawWheel();
  }
  if (!options.silent) {
    Sound.click();
    if (Math.random() < 0.35) speak(getActive().id, 'idle');
  }
  save();
}

function renderPickGrid() {
  els.pickGrid.innerHTML = CHARS.map((c) => `
    <button class="pick ${c.id === pickedChar ? 'selected' : ''}" type="button"
      data-pick="${c.id}" style="--c:${c.color}" aria-pressed="${c.id === pickedChar}">
      <img src="${c.img}" alt="${c.name}">
      <span class="pick-info">
        <b>${c.name}</b>
        <small>${c.arch}</small>
        <em>${c.tagline}</em>
      </span>
    </button>
  `).join('');
}

function openIntro() {
  pickedChar = state.active;
  renderPickGrid();
  els.introModal.hidden = false;
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => {
    const selected = els.pickGrid.querySelector('.pick.selected') || els.pickGrid.querySelector('.pick');
    if (selected) selected.focus();
  }, 60);
}

function confirmIntro() {
  if (!state.onboarded) {
    const sound = state.sound;
    const active = pickedChar || state.active;
    state = createInitialState();
    state.sound = sound;
    state.active = active;
    state.onboarded = true;
    roulette.bets = {};
    roulette.stack = [];
    roulette.spinning = false;
    setSlotBet(50);
    setDiceBet('under', { silent: true });
    setChip(50);
  } else if (pickedChar && BY_ID[pickedChar]) {
    state.active = pickedChar;
  }

  els.introModal.hidden = true;
  document.body.style.overflow = '';
  renderAll();
  setGame(state.game, { silent: true });

  const c = getActive();
  els.speech.style.setProperty('--c', c.color);
  systemFeed(`Твой комментатор — ${c.name} (${c.arch}). Удачи.`);
  speak(c.id, 'greet');
  save();
}

function rescue() {
  if (state.balance >= 50) return;
  const c = getActive();
  updateBalance(200);
  addAffection(c.id, 10);
  speak(c.id, 'rescue', { win: 200 });
  renderStats();
  Sound.win();
  coinBurst(12);
  toast('Тян помогла', `+200 фишек от ${c.name}`, 'info');
  save();
}

function resetProgress() {
  if (slotBusy || diceBusy || roulette.spinning) {
    toast('Секунду', 'Дай текущему раунду закончиться', 'info');
    return;
  }
  if (!window.confirm('Сбросить баланс, ставки, статистику и достижения? Тян останутся с тобой.')) return;
  const sound = state.sound;
  const active = state.active;
  state = createInitialState();
  state.sound = sound;
  state.active = active;
  state.onboarded = true;

  roulette.bets = {};
  roulette.stack = [];
  roulette.spinning = false;
  wheelAngle = 0;
  ballAngle = -Math.PI / 2;
  buildWheelFace();
  drawWheel();

  els.feed.innerHTML = '';
  els.slotTicker.textContent = 'готова к спину';
  els.slotResult.textContent = 'Ставка делится на 5 линий. Три одинаковых символа — выплата.';
  els.slotResult.className = 'result-line';
  els.wheelNumber.textContent = '—';
  els.wheelNumber.className = '';
  els.wheelStatus.textContent = 'Выбери фишку и поставь на стол';
  els.rouletteResult.textContent = 'Красное/чёрное и чёт/нечет — ×2, дюжины — ×3, число — ×36.';
  els.rouletteResult.className = 'result-line';
  els.diceResult.textContent = 'Два кубика. Сумма 7 — самый рискованный и самый щедрый вариант.';
  els.diceResult.className = 'result-line';
  els.spinBtn.textContent = 'Крутить';
  els.spinBtn.disabled = false;
  els.rollBtn.textContent = 'Бросить';
  els.rollBtn.disabled = false;
  els.rouletteSpin.textContent = 'Крутить';
  els.rouletteSpin.disabled = false;
  setDie(els.die1, 3);
  setDie(els.die2, 5);
  els.diceSum.textContent = '8';

  renderAll();
  setGame('slots', { silent: true });
  systemFeed('Прогресс сброшен. Новый старт — 1 000 фишек.');
  speak(active, 'greet');
  toast('Сброс', 'Баланс и статистика обнулены', 'info');
  save();
}

function wireEvents() {
  els.rosterList.addEventListener('click', (event) => {
    const btn = event.target.closest('[data-char]');
    if (!btn) return;
    Sound.click();
    setActive(btn.dataset.char, true);
  });

  els.tabs.forEach((btn) => {
    btn.addEventListener('click', () => setGame(btn.dataset.game));
  });

  $$('[data-bet-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      Sound.click();
      setSlotBet(state.betSlots + Number(btn.dataset.betStep));
    });
  });

  $$('#slotQuick [data-set-bet]').forEach((btn) => {
    btn.addEventListener('click', () => {
      Sound.click();
      setSlotBet(Number(btn.dataset.setBet));
    });
  });

  els.spinBtn.addEventListener('click', spinSlots);

  $$('#chips .chip-btn').forEach((btn) => {
    btn.addEventListener('click', () => setChip(Number(btn.dataset.chip)));
  });

  els.rouletteTable.addEventListener('click', (event) => {
    const cell = event.target.closest('[data-bet]');
    if (!cell) return;
    placeBet(cell.dataset.bet);
  });

  els.undoBtn.addEventListener('click', undoBet);
  els.clearBtn.addEventListener('click', () => clearBets(true));
  els.rouletteSpin.addEventListener('click', spinRoulette);

  $$('[data-dice-step]').forEach((btn) => {
    btn.addEventListener('click', () => {
      Sound.click();
      state.betDice = clamp(Math.round((state.betDice + Number(btn.dataset.diceStep)) / 10) * 10, 10, 500);
      renderDiceControls();
      save();
    });
  });

  $$('#diceQuick [data-dice-set]').forEach((btn) => {
    btn.addEventListener('click', () => {
      Sound.click();
      state.betDice = clamp(Number(btn.dataset.diceSet), 10, 500);
      renderDiceControls();
      save();
    });
  });

  $$('#diceBets [data-dice]').forEach((btn) => {
    btn.addEventListener('click', () => {
      Sound.click();
      setDiceBet(btn.dataset.dice);
    });
  });

  els.rollBtn.addEventListener('click', rollDice);

  els.soundBtn.addEventListener('click', () => {
    state.sound = !state.sound;
    updateSoundButton();
    if (state.sound) Sound.click();
    save();
  });

  els.rescueBtn.addEventListener('click', rescue);
  els.resetBtn.addEventListener('click', resetProgress);
  els.changeCharBtn.addEventListener('click', openIntro);

  els.pickGrid.addEventListener('click', (event) => {
    const pickEl = event.target.closest('[data-pick]');
    if (!pickEl) return;
    pickedChar = pickEl.dataset.pick;
    $$('#pickGrid .pick').forEach((el) => {
      const on = el === pickEl;
      el.classList.toggle('selected', on);
      el.setAttribute('aria-pressed', String(on));
    });
    Sound.click();
  });

  els.startBtn.addEventListener('click', confirmIntro);
  els.introClose.addEventListener('click', confirmIntro);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !els.introModal.hidden) confirmIntro();
  });

  document.addEventListener('pointerdown', () => Sound.ensure(), { once: true });
  document.addEventListener('keydown', () => Sound.ensure(), { once: true });
}

function init() {
  buildReels();
  buildPaytable();
  buildRoulette();
  buildDice();
  buildWheelFace();
  drawWheel();
  wireEvents();
  loadProgress();
  renderAll();
  setGame(state.game, { silent: true });

  if (state.onboarded) {
    els.introModal.hidden = true;
    document.body.style.overflow = '';
    systemFeed('Смена открыта. Фишки виртуальные — эмоции настоящие.');
    window.setTimeout(() => speak(state.active, 'greet'), 650);
  } else {
    openIntro();
  }

  window.setInterval(() => {
    if (document.hidden || !els.introModal.hidden) return;
    if (Date.now() - lastCommentAt < 24000) return;
    speak(getActive().id, 'idle');
  }, 5000);
}

init();
