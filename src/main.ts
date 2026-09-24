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

// The countdown sound is synthesized in-browser so there is no audio file to
// fail to load on GitHub Pages. The first launch click also satisfies browser
// autoplay policies by creating/resuming the AudioContext from a user gesture.
let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === 'suspended') {
    void audioContext.resume();
  }

  return audioContext;
}

function tone(
  frequency: number,
  duration: number,
  startDelay = 0,
  volume = 0.075,
  type: OscillatorType = 'sine',
) {
  const context = getAudioContext();
  if (!context) return;

  const start = context.currentTime + startDelay;
  const end = start + duration;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);

  // Clean, restrained PA-style electronic beep: fast attack and soft release.
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
  gain.gain.setValueAtTime(volume, Math.max(start + 0.012, end - 0.035));
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(end + 0.02);
}

function playCountdownTone(value: string) {
  if (value === '0') {
    // Final ceremonial "opening" chime: three ascending notes.
    tone(523.25, 0.18, 0, 0.09, 'sine');
    tone(659.25, 0.18, 0.20, 0.09, 'sine');
    tone(783.99, 0.34, 0.40, 0.11, 'sine');
    return;
  }

  // Firm, identical countdown pulse for 5 → 1.
  tone(880, 0.115, 0, 0.075, 'square');
  tone(1320, 0.055, 0.125, 0.035, 'sine');
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

  // Initialize audio immediately from the Launch button gesture.
  getAudioContext();

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
  await sleep(1050);

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
