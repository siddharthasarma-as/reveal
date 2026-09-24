import './styles.css';

const landing = document.querySelector<HTMLElement>('#landing')!;
const countdownScreen = document.querySelector<HTMLElement>('#countdown-screen')!;
const openScreen = document.querySelector<HTMLElement>('#open-screen')!;
const launchButton = document.querySelector<HTMLButtonElement>('#launch-button')!;
const countdownNumber = document.querySelector<HTMLDivElement>('#countdown-number')!;
const countdownCaption = document.querySelector<HTMLParagraphElement>('#countdown-caption')!;
const applyButton = document.querySelector<HTMLAnchorElement>('#apply-button')!;

const APPLICATION_URL = 'https://startup.assam.gov.in/';
const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

let running = false;
let redirectTimer = 0;
let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;
let ambienceGain: GainNode | null = null;

function getAudioContext() {
  if (audioContext) return audioContext;

  const AudioContextClass =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) return null;

  audioContext = new AudioContextClass();

  masterGain = audioContext.createGain();
  masterGain.gain.value = 0.42;
  masterGain.connect(audioContext.destination);

  // A gentle bus keeps the ceremonial tones warm instead of sounding like
  // an electronic alarm.
  ambienceGain = audioContext.createGain();
  ambienceGain.gain.value = 0.16;
  ambienceGain.connect(masterGain);

  return audioContext;
}

async function unlockAudio() {
  const context = getAudioContext();
  if (!context || !masterGain) return false;

  if (context.state !== 'running') {
    await context.resume();
  }

  // Very short confirmation pulse to establish the audio session after the
  // user's click without adding an audible "beep" to the event sequence.
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const now = context.currentTime;

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(392, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(now);
  oscillator.stop(now + 0.1);

  return true;
}

function playTone(
  frequency: number,
  duration: number,
  startDelay = 0,
  volume = 0.16,
  type: OscillatorType = 'sine',
  destination: GainNode | null = masterGain,
) {
  const context = getAudioContext();
  if (!context || !destination || context.state !== 'running') return;

  const start = context.currentTime + startDelay;
  const end = start + duration;
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.035);
  gain.gain.setValueAtTime(volume, Math.max(start + 0.035, end - 0.12));
  gain.gain.exponentialRampToValueAtTime(0.0001, end);

  oscillator.connect(gain);
  gain.connect(destination);
  oscillator.start(start);
  oscillator.stop(end + 0.03);
}

function playCountdownTone(step: number) {
  const context = getAudioContext();
  if (!context || !masterGain || !ambienceGain || context.state !== 'running') return;

  // Warm ceremonial "signal" rather than a harsh electronic double-beep:
  // low pulse + bell-like fifth + soft upper harmonic.
  const roots = [220, 233.08, 246.94, 261.63, 293.66];
  const root = roots[Math.min(step, roots.length - 1)];

  playTone(root, 0.42, 0, 0.13, 'sine');
  playTone(root * 1.5, 0.58, 0.025, 0.11, 'triangle');
  playTone(root * 2, 0.72, 0.055, 0.055, 'sine', ambienceGain);

  // A restrained low-frequency ceremonial pulse gives each number physical
  // presence without becoming a drum-machine sound.
  playTone(root / 2, 0.18, 0, 0.12, 'sine');
}

function playOpeningFanfare() {
  const context = getAudioContext();
  if (!context || !masterGain || !ambienceGain || context.state !== 'running') return;

  // Short major-key ceremonial fanfare for the "NOW OPEN" reveal.
  const notes = [
    [261.63, 0.00, 0.32, 0.16],
    [329.63, 0.13, 0.38, 0.14],
    [392.0, 0.26, 0.52, 0.15],
    [523.25, 0.42, 0.95, 0.18],
  ] as const;

  for (const [frequency, delay, duration, volume] of notes) {
    playTone(frequency, duration, delay, volume, 'triangle');
    playTone(frequency * 2, duration * 0.9, delay + 0.015, volume * 0.22, 'sine', ambienceGain);
  }

  playTone(130.81, 0.7, 0.42, 0.12, 'sine');
}

function show(screen: HTMLElement) {
  [landing, countdownScreen, openScreen].forEach((item) => item.classList.add('hidden'));
  screen.classList.remove('hidden');
}

function pulseCountdown(value: string, caption: string, step: number) {
  countdownNumber.textContent = value;
  countdownCaption.textContent = caption;
  countdownNumber.classList.remove('pulse');
  void countdownNumber.offsetWidth;
  countdownNumber.classList.add('pulse');
  playCountdownTone(step);
}

async function launch() {
  if (running) return;
  running = true;
  window.clearTimeout(redirectTimer);

  await unlockAudio();

  launchButton.disabled = true;
  show(countdownScreen);

  const steps: Array<[string, string]> = [
    ['5', 'GET READY FOR'],
    ['4', 'THE LAUNCH OF'],
    ['3', 'NORTH EAST'],
    ['2', 'SEWA FIRST'],
    ['1', 'INNOVATION CHALLENGE 2026'],
  ];

  for (let index = 0; index < steps.length; index += 1) {
    const [value, caption] = steps[index];
    pulseCountdown(value, caption, index);
    await sleep(900);
  }

  // 1 is the final countdown number. There is deliberately no 0.
  await sleep(350);
  playOpeningFanfare();
  show(openScreen);
  document.title = 'Applications Now Open — NESFIC 2026';

  // Let the "APPLICATIONS NOW OPEN" reveal breathe for a few seconds before
  // taking the visitor to the official Government of Assam startup portal.
  redirectTimer = window.setTimeout(() => {
    window.location.assign(APPLICATION_URL);
  }, 3000);

  running = false;
}

launchButton.addEventListener('click', () => void launch());

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && document.activeElement === launchButton && !running) {
    void launch();
  }
});

applyButton.href = APPLICATION_URL;
