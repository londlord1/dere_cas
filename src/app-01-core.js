'use strict';

const START_BALANCE = 1000;
const SAVE_KEY = 'neon-oasis-v1';
const TAU = Math.PI * 2;

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const fmt = (n) => Math.round(n).toLocaleString('ru-RU');
const randInt = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const mod2pi = (a) => ((a % TAU) + TAU) % TAU;

const ACHIEVEMENTS = [
  { id: 'firstWin', icon: '🏆', name: 'Первый приз', desc: 'Выиграть хоть что-нибудь' },
  { id: 'bigWin', icon: '🐟', name: 'Крупная рыба', desc: 'Выиграть 500+ за один раз' },
  { id: 'jackpot', icon: '💰', name: 'Джекпот', desc: 'Сорвать 1 000+ за один раз' },
  { id: 'color', icon: '🔴', name: 'Красное или чёрное', desc: 'Выиграть на цвет в рулетке' },
  { id: 'seven', icon: '🎲', name: 'Семь — счастливое', desc: 'Выиграть на «ровно 7» в костях' },
  { id: 'allin', icon: '🔥', name: 'Ва-банк', desc: 'Победить, поставив полбаланса' },
  { id: 'broke', icon: '🕳️', name: 'На дне', desc: 'Опуститься ниже 10 фишек' },
  { id: 'sympathy', icon: '💖', name: 'Симпатия', desc: 'Довести симпатию тян до 80' },
];

const Sound = {
  ac: null,
  ensure() {
    if (this.ac) {
      if (this.ac.state === 'suspended') this.ac.resume();
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      this.ac = new AC();
    } catch (err) {
      this.ac = null;
    }
  },
  tone(freq = 440, dur = 0.08, type = 'sine', vol = 0.04, delay = 0) {
    if (!state.sound) return;
    this.ensure();
    const ac = this.ac;
    if (!ac) return;
    const t0 = ac.currentTime + delay;
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  },
  click() { this.tone(620, 0.05, 'triangle', 0.022); },
  chip() { this.tone(1180, 0.04, 'square', 0.016); this.tone(1560, 0.05, 'triangle', 0.012, 0.02); },
  tick() { this.tone(330, 0.028, 'square', 0.009); },
  reel() { this.tone(220, 0.06, 'sawtooth', 0.018); },
  win() { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this.tone(f, 0.16, 'triangle', 0.035, i * 0.075)); },
  bigwin() {
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => this.tone(f, 0.2, 'triangle', 0.045, i * 0.07));
    [261.6, 392].forEach((f, i) => this.tone(f, 0.32, 'sine', 0.028, i * 0.05));
  },
  jackpot() {
    [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => this.tone(f, 0.24, 'square', 0.03, i * 0.08));
    [261, 329, 392, 523].forEach((f, i) => this.tone(f, 0.5, 'triangle', 0.026, i * 0.1));
  },
  lose() { this.tone(196, 0.18, 'sawtooth', 0.02); this.tone(147, 0.26, 'sine', 0.026, 0.09); },
  broke() { this.tone(160, 0.3, 'sine', 0.028); this.tone(110, 0.4, 'sine', 0.028, 0.12); },
  achievement() { [880, 1174.7, 1568].forEach((f, i) => this.tone(f, 0.18, 'triangle', 0.03, i * 0.09)); },
};

const els = {
  balancePill: $('#balancePill'),
  balanceValue: $('#balanceValue'),
  soundBtn: $('#soundBtn'),
  resetBtn: $('#resetBtn'),
  rosterList: $('#rosterList'),
  changeCharBtn: $('#changeCharBtn'),
  speech: $('#speech'),
  speechAvatar: $('#speechAvatar'),
  speechName: $('#speechName'),
  speechArch: $('#speechArch'),
  speechMood: $('#speechMood'),
  speechText: $('#speechText'),
  feed: $('#feed'),
  rankBadge: $('#rankBadge'),
  statSpins: $('#statSpins'),
  statBest: $('#statBest'),
  statWagered: $('#statWagered'),
  statNet: $('#statNet'),
  achList: $('#achList'),
  rescueBtn: $('#rescueBtn'),
  tabs: $$('.tab'),
  views: $$('.game-view'),
  reels: $('#reels'),
  paytable: $('#paytable'),
  slotBet: $('#slotBet'),
  slotQuick: $('#slotQuick'),
  spinBtn: $('#spinBtn'),
  slotResult: $('#slotResult'),
  slotTicker: $('#slotTicker'),
  wheel: $('#wheel'),
  wheelNumber: $('#wheelNumber'),
  wheelStatus: $('#wheelStatus'),
  rtNums: $('#rtNums'),
  rtDozens: $('#rtDozens'),
  rtOutside: $('#rtOutside'),
  rouletteTable: $('#rouletteTable'),
  chips: $('#chips'),
  tableTotal: $('#tableTotal'),
  undoBtn: $('#undoBtn'),
  clearBtn: $('#clearBtn'),
  rouletteSpin: $('#rouletteSpin'),
  rouletteResult: $('#rouletteResult'),
  die1: $('#die1'),
  die2: $('#die2'),
  diceSum: $('#diceSum'),
  diceBets: $('#diceBets'),
  diceBet: $('#diceBet'),
  diceQuick: $('#diceQuick'),
  rollBtn: $('#rollBtn'),
  diceResult: $('#diceResult'),
  introModal: $('#introModal'),
  introClose: $('#introClose'),
  pickGrid: $('#pickGrid'),
  startBtn: $('#startBtn'),
  toasts: $('#toasts'),
  outcome: $('#outcome'),
};
