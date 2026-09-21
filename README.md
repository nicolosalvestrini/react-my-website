# Portfolio — frontend (React + Vite)

Sito pubblico del portfolio di Nicolò Salvestrini. Legge i contenuti (progetti, servizi,
competenze, curriculum, testimonianze, impostazioni) dall'API del backend Laravel
(`laravel-my-website`) e invia a quest'ultimo il modulo contatti e le testimonianze.

## Sviluppo

```bash
npm install
cp .env.example .env    # imposta VITE_API_URL con l'indirizzo del backend
npm run dev
```

## Build di produzione

```bash
VITE_API_URL=https://api.tuodominio.it npm run build
```

`VITE_API_URL` viene incorporata nella build: va impostata al momento del build, non a runtime.
La cartella `dist/` va pubblicata come sito statico. Il sito usa il routing lato client,
quindi l'hosting deve rimandare ogni percorso a `index.html` (sono già inclusi
`public/.htaccess` per Apache e `public/_redirects` per Netlify/Cloudflare Pages).

## Script

- `npm run dev` — server di sviluppo
- `npm run build` — build di produzione
- `npm run lint` — controllo con Oxlint
