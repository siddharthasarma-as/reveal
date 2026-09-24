# NESFIC 2026 — Launch Experience

Interactive launch/reveal experience for the **North-East SEVA FIRST Innovation Challenge 2026 (NESFIC 2026)**.

## Launch sequence

1. Landing screen displays the NESFIC 2026 branding and **LAUNCH** button.
2. Countdown runs from **5 → 4 → 3 → 2 → 1** with ceremonial PA-style tones.
3. Countdown text:
   - **5 — GET / READY FOR**
   - **4 — THE / LAUNCH OF**
   - **3 — NORTH / EAST SEWA FIRST**
   - **2 — INNOVATION / CHALLENGE**
   - **1 — 2026**
4. The experience immediately reveals **APPLICATIONS NOW OPEN** after the final **1**.
5. Users can select **START APPLYING** to open the official NESFIC application portal.
6. The launch screen automatically redirects to the official application portal after the reveal.

## Official application portal

https://startup.assam.gov.in/nesfic26/

## Deployment

The site is deployed as a GitHub Pages project site:

https://siddharthasarma-as.github.io/reveal/

The Vite configuration uses `/reveal/` as the production base path so assets resolve correctly on GitHub Pages.

## Local development

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

## GitHub Pages

Deployment is handled by GitHub Actions using:

`.github/workflows/deploy.yml`

The workflow builds the Vite application and publishes the `dist` directory to GitHub Pages.
