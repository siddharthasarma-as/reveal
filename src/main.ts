import './styles.css';

const landing = document.querySelector<HTMLElement>('#landing')!;
const countdownScreen = document.querySelector<HTMLElement>('#countdown-screen')!;
const openScreen = document.querySelector<HTMLElement>('#open-screen')!;
const launchButton = document.querySelector<HTMLButtonElement>('#launch-button')!;
const countdownNumber = document.querySelector<HTMLDivElement>('#countdown-number')!;
const countdownCaption = document.querySelector<HTMLParagraphElement>('#countdown-caption')!;
const applyButton = document.querySelector<HTMLAnchorElement>('#apply-button')!;

const APPLICATION_URL = 'https://startup.assam.gov.in/nesfic26/';
const launchAudio = new Audio('/audio.mp3');
launchAudio.preload = 'auto';
const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

let running = false;
let redirectTimer = 0;

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

async function launch() {
  if (running) return;
  running = true;
  window.clearTimeout(redirectTimer);

  launchAudio.currentTime = 0;
  void launchAudio.play().catch(() => {});

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
