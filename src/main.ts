import './styles.css';

const landing = document.querySelector<HTMLElement>('#landing')!;
const countdownScreen = document.querySelector<HTMLElement>('#countdown-screen')!;
const openScreen = document.querySelector<HTMLElement>('#open-screen')!;
const launchButton = document.querySelector<HTMLButtonElement>('#launch-button')!;
const countdownNumber = document.querySelector<HTMLDivElement>('#countdown-number')!;
const countdownCaption = document.querySelector<HTMLParagraphElement>('#countdown-caption')!;
const applyButton = document.querySelector<HTMLAnchorElement>('#apply-button')!;

const APPLICATION_URL = 'https://startup.assam.gov.in/nesfic26/';
const FADE_DURATION_MS = 1800;
const launchAudio = new Audio(`${window.location.origin}/audio.mp3`);
launchAudio.preload = 'auto';
launchAudio.volume = 1.0;

const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

let running = false;
let redirectTimer = 0;
let fadeTimer = 0;

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
}

function scheduleAudioFadeAndRedirect() {
  window.clearTimeout(fadeTimer);
  window.clearTimeout(redirectTimer);

  const duration = launchAudio.duration;
  if (!Number.isFinite(duration) || duration <= 0) {
    // If metadata is unavailable, let the audio finish naturally and then redirect.
    launchAudio.addEventListener('ended', handleAudioEnded, { once: true });
    return;
  }

  const fadeStartSeconds = Math.max(0, duration - FADE_DURATION_MS / 1000);
  const fadeStartDelay = Math.max(0, (fadeStartSeconds - launchAudio.currentTime) * 1000);

  fadeTimer = window.setTimeout(() => {
    const fadeStartedAt = performance.now();
    const startVolume = launchAudio.volume;

    const fade = () => {
      const progress = Math.min(1, (performance.now() - fadeStartedAt) / FADE_DURATION_MS);
      launchAudio.volume = startVolume * (1 - progress);

      if (progress < 1) {
        window.requestAnimationFrame(fade);
      } else {
        launchAudio.pause();
        launchAudio.volume = 1.0;
      }
    };

    // Begin the redirect sequence at the exact moment the audio fade begins,
    // but wait for the fade itself to finish before leaving the reveal screen.
    redirectTimer = window.setTimeout(() => {
      window.location.assign(APPLICATION_URL);
    }, FADE_DURATION_MS);

    window.requestAnimationFrame(fade);
  }, fadeStartDelay);
}

function handleAudioEnded() {
  window.clearTimeout(fadeTimer);
  window.clearTimeout(redirectTimer);
  window.location.assign(APPLICATION_URL);
}

async function launch() {
  if (running) return;
  running = true;
  window.clearTimeout(redirectTimer);
  window.clearTimeout(fadeTimer);

  launchAudio.pause();
  launchAudio.currentTime = 0;
  launchAudio.volume = 1.0;
  launchAudio.load();

  try {
    await launchAudio.play();
    scheduleAudioFadeAndRedirect();
  } catch (error) {
    console.warn('NESFIC launch audio could not play:', error);
  }

  launchButton.disabled = true;
  show(countdownScreen);

  const steps: Array<[string, string]> = [
    ['5', 'GET READY FOR'],
    ['4', 'THE LAUNCH OF'],
    ['3', 'NORTH EAST'],
    ['2', 'SEWA FIRST'],
    ['1', 'INNOVATION CHALLENGE 2026'],
  ];

  for (const [value, caption] of steps) {
    pulseCountdown(value, caption);
    await sleep(900);
  }

  // 1 is the final countdown number. There is deliberately no 0.
  await sleep(350);
  show(openScreen);
  document.title = 'Applications Now Open — NESFIC 2026';

  running = false;
}

launchButton.addEventListener('click', () => void launch());

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && document.activeElement === launchButton && !running) {
    void launch();
  }
});

applyButton.href = APPLICATION_URL;
