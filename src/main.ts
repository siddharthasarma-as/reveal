import './styles.css';

const landing = document.querySelector<HTMLElement>('#landing')!;
const countdownScreen = document.querySelector<HTMLElement>('#countdown-screen')!;
const openScreen = document.querySelector<HTMLElement>('#open-screen')!;
const launchButton = document.querySelector<HTMLButtonElement>('#launch-button')!;
const countdownNumber = document.querySelector<HTMLDivElement>('#countdown-number')!;
const countdownCaption = document.querySelector<HTMLParagraphElement>('#countdown-caption')!;
const applyButton = document.querySelector<HTMLAnchorElement>('#apply-button')!;

const APPLICATION_URL = 'https://startup.assam.gov.in/nesfic26/';
const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

let running = false;
let redirectTimer = 0;
let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;

function getAudioContext() {
  if (audioContext) return audioContext;

  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) return null;

  audioContext = new AudioContextClass();
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.28;
  masterGain.connect(audioContext.destination);

  return audioContext;
}

async function unlockAudio() {
  const context = getAudioContext();
  if (!context || !masterGain) return false;

  if (context.state !== 'running') {
    await context.resume();
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(660, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.08, now + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(now);
  oscillator.stop(now + 0.08);

  return true;
}

function tone(
  frequency: number,
  duration: number,
  startDelay = 0,
  volume = 0.24,
  type: OscillatorType = 'square',
) {
  const context = getAudioContext();
  if (!context || !masterGain || context.state !== 'running') return;

  const start = context.currentTime + startDelay;
  const end = start + duration;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
  gain.gain.setValueAtTime(volume, Math.max(start + 0.008, end - 0.025));
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(start);
  oscillator.stop(end + 0.02);
}

function playCountdownTone() {
  // Strong PA/event-style double beep for each countdown number.
  tone(880, 0.16, 0, 0.28, 'square');
  tone(1320, 0.09, 0.18, 0.18, 'square');
}

function show(screen: HTMLElement) {
  [landing, countdownScreen, openScreen].forEach((item) => item.classList.add('hidden'));
  screen.classList.remove('hidden');
}

function pulseCountdown(value: string, caption: string) {
  countdownNumber.textContent = value;
  countdownCaption.textContent = caption;
  countdownNumber.classList.remove('pulse');
  void countdownNumber.offsetWidth;
  countdownNumber.classList.add('pulse');
  playCountdownTone();
}

async function launch() {
  if (running) return;
  running = true;
  window.clearTimeout(redirectTimer);

  await unlockAudio();

  launchButton.disabled = true;
  show(countdownScreen);

  const steps: Array<[string, string]> = [
    ['5', 'GET\nREADY FOR'],
    ['4', 'THE\nLAUNCH OF'],
    ['3', 'NORTH\nEAST SEWA FIRST'],
    ['2', 'INNOVATION\nCHALLENGE'],
    ['1', '2026'],
  ];

  for (const [value, caption] of steps) {
    pulseCountdown(value, caption);
    await sleep(900);
  }

  // 1 is the final countdown number. There is deliberately no 0.
  // Move straight to the opening reveal after the 1 beat.
  await sleep(350);
  show(openScreen);
  document.title = 'Applications Now Open — NESFIC 2026';

  redirectTimer = window.setTimeout(() => {
    window.location.assign(APPLICATION_URL);
  }, 4200);

  running = false;
}

launchButton.addEventListener('click', () => void launch());

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && document.activeElement === launchButton && !running) {
    void launch();
  }
});

applyButton.href = APPLICATION_URL;
