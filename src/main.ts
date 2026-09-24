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

// Explicitly unlock audio while still inside the Launch button's user gesture.
// Waiting for resume() is important on browsers that initially suspend Web Audio.
async function unlockAudio() {
  const context = getAudioContext();
  if (!context || !masterGain) return false;

  if (context.state !== 'running') {
    await context.resume();
  }

  // Audible confirmation pulse, deliberately short and low-volume.
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

function playCountdownTone(value: string) {
  if (value === '0') {
    // Ceremonial three-note fanfare for the opening moment.
    tone(523.25, 0.20, 0, 0.30, 'sine');
    tone(659.25, 0.20, 0.21, 0.30, 'sine');
    tone(783.99, 0.48, 0.42, 0.34, 'sine');
    return;
  }

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
  playCountdownTone(value);
}

async function launch() {
  if (running) return;
  running = true;
  window.clearTimeout(redirectTimer);

  // Unlock and fully resume audio before the first countdown beep.
  await unlockAudio();

  launchButton.disabled = true;
  show(countdownScreen);

  const steps: Array<[string, string]> = [
    ['5', 'GET READY'],
    ['4', 'THE MOMENT BEGINS'],
    ['3', 'NORTH-EAST'],
    ['2', 'SEVA FIRST'],
    ['1', 'INNOVATION'],
  ];

  for (const [value, caption] of steps) {
    pulseCountdown(value, caption);
    await sleep(900);
  }

  pulseCountdown('0', 'OPENING NOW');
  await sleep(1200);

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
