# NESFIC 2026 — Launch Experience

**Version: 1.0.0**

Interactive launch/reveal experience for the **North-East SEVA FIRST Innovation Challenge 2026 (NESFIC 2026)**.

## Launch sequence

1. Landing screen displays the NESFIC 2026 branding and **LAUNCH** button.
2. Clicking **LAUNCH** starts the launch audio and the ceremonial countdown.
3. Countdown runs from **5 → 4 → 3 → 2 → 1** — with no **0**.
4. The countdown captions are:
   - **5 — GET READY FOR**
   - **4 — THE LAUNCH OF**
   - **3 — NORTH EAST**
   - **2 — SEWA FIRST**
   - **1 — INNOVATION CHALLENGE 2026**
5. The experience reveals **APPLICATIONS NOW OPEN** after the final **1**.
6. The **APPLICATIONS NOW OPEN** screen remains visible while the launch audio continues.
7. During the final **1.8 seconds** of the audio, the audio fades out and the redirect begins.
8. After the fade completes, the browser redirects to the official NESFIC application portal.
9. Users can also select **START APPLYING** to open the official application portal immediately.

## Audio

The launch audio is stored as `audio.mp3` in the repository root and is explicitly copied into the GitHub Pages `dist` artifact during deployment.

Playback is triggered by the user's **LAUNCH** click so that it works within normal browser autoplay policies.

## Official application portal

https://startup.assam.gov.in/nesfic26/

## Public site

https://nesfic.assamstartup.org/

## Deployment

The site is deployed to GitHub Pages with the custom domain **nesfic.assamstartup.org**.

Vite uses the root production base path (`/`) so assets resolve correctly on the custom domain.

Deployment is handled by GitHub Actions using:

`.github/workflows/deploy.yml`

The workflow:

1. Installs dependencies.
2. Builds the Vite application.
3. Copies `audio.mp3` into `dist/audio.mp3`.
4. Publishes `dist` to GitHub Pages.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

## Project structure

- `index.html` — launch, countdown, and applications-open screens
- `src/main.ts` — launch sequence, audio playback, fade, and redirect logic
- `src/styles.css` — responsive visual design and animations
- `resources/logo.png` — NESFIC branding
- `audio.mp3` — launch audio
- `.github/workflows/deploy.yml` — GitHub Pages deployment
- `CNAME` — custom domain configuration

## Version

**1.0.0** — Initial production release of the NESFIC 2026 launch experience, including the countdown, launch audio, applications-open reveal, audio fade-out, automatic redirect, responsive viewport behavior, and custom-domain deployment.
