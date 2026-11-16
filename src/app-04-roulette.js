const WHEEL_ORDER = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23,
  10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];
const RED_NUMBERS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

const roulette = { bets: {}, stack: [], spinning: false };
const wheelFace = document.createElement('canvas');
wheelFace.width = 720;
wheelFace.height = 720;
let wheelFaceReady = false;
let wheelAngle = 0;
let ballAngle = -Math.PI / 2;

function isRed(n) {
  return RED_NUMBERS.has(n);
}

function colorOf(n) {
  if (n === 0) return 'green';
  return isRed(n) ? 'red' : 'black';
}

function colorRu(color) {
  return color === 'red' ? 'красное' : color === 'black' ? 'чёрное' : 'зеро';
}

function buildRoulette() {
  els.rtNums.innerHTML = '';
  for (let n = 1; n <= 36; n += 1) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `rt-cell ${isRed(n) ? 'red' : 'black'}`;
    btn.dataset.bet = `n${n}`;
    btn.style.gridColumn = String(Math.floor((n - 1) / 3) + 1);
    btn.style.gridRow = String(3 - ((n - 1) % 3));
    btn.innerHTML = `<span>${n}</span><span class="bet-chip" hidden></span>`;
    els.rtNums.appendChild(btn);
  }

  const dozens = [
    ['d1', '1-я 12'], ['d2', '2-я 12'], ['d3', '3-я 12'],
  ];
  els.rtDozens.innerHTML = dozens.map(([key, label]) => (
    `<button class="rt-out" type="button" data-bet="${key}">${label}<span class="bet-chip" hidden></span></button>`
  )).join('');

  const outside = [
    ['low', '1–18', ''], ['even', 'Чёт', ''], ['red', 'Красное', 'red'],
    ['black', 'Чёрное', 'black'], ['odd', 'Нечёт', ''], ['high', '19–36', ''],
  ];
  els.rtOutside.innerHTML = outside.map(([key, label, tone]) => {
    const extra = tone === 'red' ? ' red red-dot' : tone === 'black' ? ' black black-dot' : '';
    return `<button class="rt-out${extra}" type="button" data-bet="${key}">${label}<span class="bet-chip" hidden></span></button>`;
  }).join('');
}

function totalBets() {
  return Object.values(roulette.bets).reduce((sum, v) => sum + v, 0);
}

function updateBetsUI() {
  $$('#rouletteTable [data-bet]').forEach((el) => {
    const amount = roulette.bets[el.dataset.bet] || 0;
    const chip = el.querySelector('.bet-chip');
    if (!chip) return;
    chip.hidden = amount <= 0;
    chip.textContent = amount > 0 ? fmt(amount) : '';
  });
  els.tableTotal.textContent = fmt(totalBets());
  els.rouletteSpin.disabled = roulette.spinning;
  if (!roulette.spinning) {
    els.undoBtn.disabled = roulette.stack.length === 0;
    els.clearBtn.disabled = totalBets() === 0;
  }
}

function placeBet(key) {
  if (roulette.spinning) return;
  const amount = state.chip;
  if (state.balance < amount) {
    notEnough();
    return;
  }
  updateBalance(-amount);
  roulette.bets[key] = (roulette.bets[key] || 0) + amount;
  roulette.stack.push({ key, amount });
  Sound.chip();
  updateBetsUI();
  save();
}

function undoBet() {
  if (roulette.spinning) return;
  const last = roulette.stack.pop();
  if (!last) return;
  roulette.bets[last.key] = (roulette.bets[last.key] || 0) - last.amount;
  if (roulette.bets[last.key] <= 0) delete roulette.bets[last.key];
  updateBalance(last.amount);
  Sound.click();
  updateBetsUI();
  save();
}

function clearBets(refund = true) {
  if (roulette.spinning) return;
  const total = totalBets();
  if (refund && total > 0) updateBalance(total);
  roulette.bets = {};
  roulette.stack = [];
  updateBetsUI();
  save();
}

function setChip(value) {
  state.chip = value;
  $$('#chips .chip-btn').forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.chip) === value);
  });
  Sound.click();
  save();
}

function renderChips() {
  $$('#chips .chip-btn').forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.chip) === state.chip);
  });
}

function buildWheelFace() {
  const ctx = wheelFace.getContext('2d');
  const cx = 360;
  const cy = 360;
  const radius = 344;
  const seg = TAU / 37;

  ctx.clearRect(0, 0, 720, 720);

  ctx.beginPath();
  ctx.arc(cx, cy, radius + 8, 0, TAU);
  const rim = ctx.createLinearGradient(0, 0, 720, 720);
  rim.addColorStop(0, '#4b2a18');
  rim.addColorStop(0.5, '#c79a52');
  rim.addColorStop(1, '#3a2213');
  ctx.fillStyle = rim;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, TAU);
  ctx.fillStyle = '#0d0617';
  ctx.fill();

  for (let i = 0; i < 37; i += 1) {
    const num = WHEEL_ORDER[i];
    const a0 = i * seg;
    const a1 = (i + 1) * seg;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, a0, a1);
    ctx.closePath();
    ctx.fillStyle = num === 0 ? '#157a58' : isRed(num) ? '#a51c36' : '#1b1129';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,205,120,.22)';
    ctx.lineWidth = 1.1;
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate((a0 + a1) / 2);
    ctx.translate(radius * 0.79, 0);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = '#fff4df';
    ctx.font = '700 20px "Cascadia Mono", Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(num), 0, 0);
    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.64, 0, TAU);
  ctx.strokeStyle = 'rgba(255,205,120,.24)';
  ctx.lineWidth = 2;
  ctx.stroke();

  const inner = ctx.createRadialGradient(cx - 30, cy - 40, 20, cx, cy, radius * 0.62);
  inner.addColorStop(0, 'rgba(96,44,128,.45)');
  inner.addColorStop(1, 'rgba(10,4,18,.94)');
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.62, 0, TAU);
  ctx.fillStyle = inner;
  ctx.fill();

  wheelFaceReady = true;
}

function drawWheel() {
  if (!wheelFaceReady) buildWheelFace();
  const ctx = els.wheel.getContext('2d');
  const cx = 360;
  const cy = 360;

  ctx.clearRect(0, 0, 720, 720);

  const ambient = ctx.createRadialGradient(cx, cy, 60, cx, cy, 360);
  ambient.addColorStop(0, 'rgba(255,79,163,.07)');
  ambient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = ambient;
  ctx.fillRect(0, 0, 720, 720);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(wheelAngle);
  ctx.drawImage(wheelFace, -cx, -cy);
  ctx.restore();

  const bx = cx + Math.cos(ballAngle) * 344 * 0.82;
  const by = cy + Math.sin(ballAngle) * 344 * 0.82;
  ctx.beginPath();
  ctx.arc(bx + 2, by + 4, 11, 0, TAU);
  ctx.fillStyle = 'rgba(0,0,0,.55)';
  ctx.fill();
  const ball = ctx.createRadialGradient(bx - 3, by - 4, 1, bx, by, 12);
  ball.addColorStop(0, '#ffffff');
  ball.addColorStop(0.65, '#e9e3d9');
  ball.addColorStop(1, '#9a928a');
  ctx.beginPath();
  ctx.arc(bx, by, 10.5, 0, TAU);
  ctx.fillStyle = ball;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.7)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 88, 0, TAU);
  const hub = ctx.createRadialGradient(cx - 24, cy - 30, 8, cx, cy, 92);
  hub.addColorStop(0, '#4a2768');
  hub.addColorStop(0.7, '#1a0b2c');
  hub.addColorStop(1, '#0b0415');
  ctx.fillStyle = hub;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,208,92,.65)';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#ffd05c';
  ctx.font = '700 30px "Cascadia Mono", Consolas, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('◆', cx, cy - 8);
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  ctx.font = '600 11px "Segoe UI", sans-serif';
  ctx.fillText('OASIS', cx, cy + 20);
}

function spinWheel(result) {
  return new Promise((resolve) => {
    const seg = TAU / 37;
    const index = WHEEL_ORDER.indexOf(result);
    const targetMod = -Math.PI / 2 - (index + 0.5) * seg;
    const currentMod = mod2pi(wheelAngle);
    const delta = mod2pi(targetMod - currentMod);
    const turns = 4 + Math.floor(Math.random() * 2);
    const startWheel = wheelAngle;
    const targetWheel = startWheel + turns * TAU + delta;
    const startBall = -Math.PI / 2;
    const targetBall = startBall - TAU * (turns + 3);
    const duration = 4300;
    const started = performance.now();
    let lastTick = 0;

    ballAngle = startBall;

    function frame(now) {
      const progress = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      wheelAngle = startWheel + (targetWheel - startWheel) * eased;
      ballAngle = startBall + (targetBall - startBall) * eased;
      drawWheel();
      if (now - lastTick > 95) {
        lastTick = now;
        Sound.tick();
      }
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        wheelAngle = mod2pi(targetWheel);
        ballAngle = -Math.PI / 2;
        drawWheel();
        resolve();
      }
    }

    requestAnimationFrame(frame);
  });
}

function spinRoulette() {
  if (roulette.spinning) return;
  const stake = totalBets();
  if (stake <= 0) {
    Sound.lose();
    speak(getActive().id, 'needbet');
    toast('Ставок нет', 'Кликни по клетке стола, чтобы поставить фишку', 'info');
    return;
  }

  roulette.spinning = true;
  const before = state.balance + stake;
  els.wheelStatus.textContent = 'Шарик пошёл…';
  els.rouletteResult.textContent = 'Колесо крутится…';
  els.rouletteResult.className = 'result-line neutral';
  els.rouletteSpin.disabled = true;
  els.rouletteSpin.textContent = 'Крутим…';
  els.undoBtn.disabled = true;
  els.clearBtn.disabled = true;

  state.wagered += stake;
  state.spins += 1;
  renderStats();
  if (Math.random() < 0.35) speak(getActive().id, 'spin');
  Sound.click();
  updateBetsUI();
  save();

  const result = randInt(0, 36);
  spinWheel(result).then(() => settleRoulette(result, stake, before));
}

function settleRoulette(result, stake, before) {
  const color = colorOf(result);
  const bets = { ...roulette.bets };
  let win = 0;
  let colorHit = false;

  Object.entries(bets).forEach(([key, amount]) => {
    if (key === `n${result}`) {
      win += amount * 36;
    } else if (key === 'red' && color === 'red') {
      win += amount * 2;
      colorHit = true;
    } else if (key === 'black' && color === 'black') {
      win += amount * 2;
      colorHit = true;
    } else if (key === 'even' && result !== 0 && result % 2 === 0) {
      win += amount * 2;
    } else if (key === 'odd' && result % 2 === 1) {
      win += amount * 2;
    } else if (key === 'low' && result >= 1 && result <= 18) {
      win += amount * 2;
    } else if (key === 'high' && result >= 19) {
      win += amount * 2;
    } else if (key === 'd1' && result >= 1 && result <= 12) {
      win += amount * 3;
    } else if (key === 'd2' && result >= 13 && result <= 24) {
      win += amount * 3;
    } else if (key === 'd3' && result >= 25) {
      win += amount * 3;
    }
  });

  if (win > 0) {
    updateBalance(win);
    state.bestWin = Math.max(state.bestWin, win);
  }
  state.net += win - stake;
  renderStats();

  els.wheelNumber.textContent = String(result);
  els.wheelNumber.className = color;
  els.wheelStatus.textContent = `Выпало ${result} · ${colorRu(color)}${win > 0 ? ` · +${fmt(win)}` : ''}`;
  if (win > 0) {
    els.rouletteResult.textContent = `Выигрыш +${fmt(win)} · ставка ${fmt(stake)}`;
    els.rouletteResult.className = 'result-line win';
    outcome(`+${fmt(win)}`, 'win');
    if (win >= 200) coinBurst(win >= 1000 ? 48 : 24);
  } else {
    els.rouletteResult.textContent = `Ставка ${fmt(stake)} не сыграла. Бывает.`;
    els.rouletteResult.className = 'result-line lose';
    outcome('мимо', 'lose');
  }

  resultSound(win, stake, win >= 1000);

  if (win === 0) {
    react(stake >= before * 0.35 ? 'biglose' : 'lose', { bet: stake });
  } else if (win >= stake * 20) {
    react('jackpot', { win }, { force: true });
    shakeScreen();
  } else if (win >= stake * 3) {
    react('bigwin', { win }, { force: true });
  } else {
    react('win', { win });
  }

  checkAchievements({
    win, stake, before, game: 'roulette', colorHit,
  });

  roulette.spinning = false;
  roulette.bets = {};
  roulette.stack = [];
  updateBetsUI();
  els.rouletteSpin.disabled = false;
  els.rouletteSpin.textContent = 'Крутить';
  els.undoBtn.disabled = true;
  els.clearBtn.disabled = true;
  save();
}
