<div align="center">

# GitHub Profile Viewer

**Eine Full-Stack-Webanwendung um beliebige GitHub-Profile zu suchen und die Top&nbsp;10 Repositories nach Stars anzuzeigen.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Node.js](https://img.shields.io/badge/Node.js-latest-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![GitHub API](https://img.shields.io/badge/GitHub_API-v3-181717?style=flat-square&logo=github&logoColor=white)](https://docs.github.com/en/rest)

</div>

---

## Tech Stack

| Bereich | Technologie |
|:--------|:------------|
| **Frontend** | React 19, Vite, plain CSS |
| **Backend** | Node.js, Express 5 |
| **Externe API** | GitHub REST API v3 |

---

## Features

- **Profilsuche** -> beliebigen GitHub-Usernamen suchen
- **Profil-Übersicht** -> Avatar, Name, Bio sowie Follower-, Following- und Repo-Anzahl
- **Top-10-Repos** —> sortiert nach Stars, serverseitig gefiltert
- **Sprachkodierung** —> Programmiersprache mit GitHub-Farbkodierung pro Repo-Karte
- **Fehlerbehandlung** —> saubere Anzeige für nicht existierende User
- **Responsives Layout** —> Mobile + Desktop

---

## Architektur

```
GitHub-ProfileViewer/
├── package.json           # Root: startet beide Server
├── frontend/              # React + Vite (Port 5173)
│   ├── vite.config.js     # Proxy /github → localhost:3000
│   └── src/
│       ├── App.jsx
│       ├── useGitHub.js   # zentraler Datenfetch-Hook
│       └── components/
│           ├── SearchBar.jsx
│           ├── ProfileCard.jsx
│           └── RepoList.jsx
└── git-pv-api/            # Express-Backend (Port 3000)
    ├── index.js
    ├── app.js
    ├── routes/github.js
    └── controllers/github.js
```

Frontend und Backend sind vollständig getrennt. In der Entwicklung leitet der Vite-Dev-Server alle Anfragen an `/github/*` automatisch an das Backend weiter. Im Production-Build wird die API-URL über die Umgebungsvariable `VITE_API_URL` gesetzt.

---

## Installation & Start

```bash
# Repo klonen
git clone https://github.com/SimonPaulBoehm/GitHub-ProfileViewer
cd GitHub-ProfileViewer

# Dependencies installieren
npm install                        # Root (concurrently)
npm install --prefix git-pv-api   # Backend
npm install --prefix frontend      # Frontend

# Beide Services starten
npm run dev
```

> Frontend: `http://localhost:5173` &nbsp;|&nbsp; Backend: `http://localhost:3000`

---

## API Übersicht

| Methode | Endpoint | Beschreibung |
|:-------:|:---------|:-------------|
| `GET` | `/github/user/:username` | GitHub-Profil abrufen |
| `GET` | `/github/repos/:username` | Top-10-Repos des Users abrufen |

**Beispiel:**
```
GET /github/user/SimonPaulBoehm
GET /github/repos/SimonPaulBoehm
```

Das Backend ruft die GitHub API auf, filtert die Antwort auf relevante Felder und gibt sie weiter, ohne Token, da nur öffentliche Endpunkte genutzt werden.

---

## Design-Entscheidungen

<details>
<summary><strong>Backend —> Daten auf dem Server filtern</strong></summary>

Die GitHub API gibt pro User-Objekt über 30 Felder zurück. Das Backend leitet davon nur 8 weiter (`login`, `name`, `avatar_url`, `bio`, `public_repos`, `followers`, `following`, `html_url`). Das macht die Payload kleiner und das Frontend-Interface stabiler.

</details>

<details>
<summary><strong>Backend —> Top-10-Sortierung serverseitig</strong></summary>

Repos werden mit `?per_page=100` abgerufen, serverseitig nach `stargazers_count` sortiert und auf 10 gekürzt. Die Sortierlogik gehört nicht ins Frontend, weil sie unabhängig vom UI-Framework wiederverwendet werden kann und das Frontend keine 100 Objekte parsen muss.

</details>

<details>
<summary><strong>Frontend —> Custom Hook <code>useGitHub</code></strong></summary>

Der gesamte Fetch-State (`profile`, `repos`, `loading`, `error`) steckt in einem einzigen Hook. `App.jsx` bleibt damit eine reine Layout-Komponente ohne eigene Logik. Wenn die Datenquelle später wechselt (z. B. GraphQL statt REST), wird nur der Hook angepasst.

</details>

<details>
<summary><strong>Frontend —> Vite Proxy statt CORS-Workaround</strong></summary>

Statt die API-URL im Frontend hartzucodieren, leitet `vite.config.js` alle `/github/*`-Anfragen an `localhost:3000` weiter. Im Browser erscheinen die Requests als Same-Origin-Anfragen, kein CORS-Problem, keine API-URL im Frontend-Bundle. Für den Production-Build gibt es die `VITE_API_URL`-Umgebungsvariable.

</details>

<details>
<summary><strong>Frontend —> CSS Custom Properties statt CSS-Framework</strong></summary>

Kein Tailwind, kein Bootstrap. Alle Design-Tokens (Farben, Radien, Shadows) stehen als CSS-Variablen in `:root`. Das hält das CSS-Bundle klein, gibt volle Kontrolle über jeden Pixel und vermeidet unnötige Build-Komplexität für ein Projekt dieser Größe.

</details>

<details>
<summary><strong>UI —> "Terminal Luxe" Ästhetik</strong></summary>

Das Design kombiniert Terminal-Energie (`Syne Mono` als Display-Font, Teal-Akzentfarbe) mit reduzierter Eleganz (Glasmorphismus-Cards, SVG-Noise-Textur, staggered Animations). Die Zielgruppe sind Entwickler, das Design spricht deren Sprache, ohne generisch zu wirken.

</details>

---

## Learnings & Herausforderungen

| Thema | Details |
|:------|:--------|
| **CORS in der Entwicklung** | Zwei separate Dev-Server (Vite + Express) erzeugen per Default Cross-Origin-Requests. Der Vite-Proxy löst das sauber ohne zusätzliche `cors()`-Konfiguration im Frontend. |
| **GitHub API Rate Limiting** | Ohne Token sind nur 60 Requests/Stunde erlaubt. Bei intensivem Testing kann das schnell knapp werden. Lösung für die Zukunft: GitHub Personal Access Token über `.env` einbinden. |
| **Stargazers vs. Stars** | GitHub benennt das Feld in der API `stargazers_count`, nicht `stars`. Der Controller mappt das beim Filtern auf `stars` — `RepoList.jsx` liest beide zur Sicherheit. |

---

## Roadmap

- [x] Frontend/Backend-Trennung mit Vite Proxy
- [x] Top-10-Repos nach Stars sortiert
- [x] Responsives Layout
- [ ] GitHub Personal Access Token via `.env` für höheres Rate Limit
- [ ] GraphQL-Unterstützung im `useGitHub`-Hook

---

## Autor

<div align="center">

**Simon Paul Böhm**

[![GitHub](https://img.shields.io/badge/GitHub-SimonPaulBoehm-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SimonPaulBoehm)

</div>
