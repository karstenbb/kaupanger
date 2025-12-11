# K.I.L Fotball - Frontend App

Ein moderne Next.js applikasjon for K.I.L Fotballklubb.

## 🚀 Teknologi

- **Framework:** Next.js 15+ (App Router)
- **Språk:** TypeScript
- **Styling:** TailwindCSS
- **UI Komponentar:** shadcn/ui-inspirert
- **Ikon:** Lucide Icons
- **Animasjonar:** Framer Motion
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)

## 📁 Prosjektstruktur

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Heimeside (/)
│   ├── kamper/            # Kampar-side
│   ├── tropp/             # Tropp-side
│   ├── resultater/        # Resultat-side
│   ├── butikk/            # Butikk-side
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global CSS
│   ├── loading.tsx        # Loading state
│   └── not-found.tsx      # 404 side
├── components/
│   ├── layout/            # Layout-komponentar
│   │   ├── bottom-nav.tsx
│   │   └── header.tsx
│   ├── matches/           # Kamp-komponentar
│   │   ├── next-match-card.tsx
│   │   ├── match-list-item.tsx
│   │   └── match-filter-tabs.tsx
│   ├── roster/            # Tropp-komponentar
│   │   ├── player-card.tsx
│   │   ├── player-section.tsx
│   │   └── staff-card.tsx
│   ├── results/           # Resultat-komponentar
│   │   └── result-card.tsx
│   └── ui/                # Basis UI-komponentar
│       ├── button.tsx
│       ├── card.tsx
│       ├── tabs.tsx
│       └── select.tsx
├── lib/
│   ├── api.ts             # API hooks (React Query)
│   ├── mock-data.ts       # Mock data
│   ├── providers.tsx      # React Query Provider
│   ├── store.ts           # Zustand store
│   └── utils.ts           # Utility functions
├── types/
│   └── index.ts           # TypeScript typar
└── public/
    ├── manifest.json      # PWA manifest
    └── images/            # Bilete
```

## 🛠️ Installasjon

```bash
# Installer dependencies
npm install

# Start utviklingsserver
npm run dev

# Bygg for produksjon
npm run build

# Start produksjonsserver
npm start
```

## 🎨 Design System

### Fargar

| Farge | Hex | Bruk |
|-------|-----|------|
| Primary | `#F5A623` | Hovudaksentfarge |
| Background | `#0A0E1A` | Bakgrunn |
| Card | `#131A2B` | Kort bakgrunn |
| Surface | `#1E2A3D` | Overflater |
| Text Primary | `#FFFFFF` | Hovudtekst |
| Text Secondary | `#8B95A5` | Sekundærtekst |
| Win | `#22C55E` | Seier |
| Draw | `#EAB308` | Uavgjort |
| Loss | `#EF4444` | Tap |

### Komponentar

- **Button:** Primary, Secondary, Outline, Ghost varianter
- **Card:** Default, Glass, Elevated varianter
- **Tabs:** Animert tabs med Radix UI
- **Select:** Dropdown med Radix UI

## 📱 Sider

### Heim (/)
- Neste kamp med nedtelling
- Liste over kommande kampar
- Filter: Alle/Hjemme/Borte

### Kampar (/kamper)
- Same som heimeside, dedikert side

### Tropp (/tropp)
- Tabs: Spillere | Trenere
- Spelarar gruppert etter posisjon
- Søkefunksjon

### Resultat (/resultater)
- Sesongveljar
- Historiske kampresultat
- Fargekoda resultat

### Butikk (/butikk)
- Placeholder for framtidig butikk

## 🔌 API-lag

Applikasjonen er bygd med TanStack Query for datahenting. Mock-data er brukt, men kan enkelt byttast ut med ekte API-kall.

### Tilgjengelege hooks:

```typescript
// Kampar
useUpcomingMatches(filter?: MatchFilter)
useNextMatch()

// Tropp
usePlayers()
usePlayersByPosition()
useStaff()

// Resultat
useHistoricalMatches(seasonId: string)
useSeasons()
```

### Koble til backend:

1. Opprett API-endepunkt
2. Oppdater funksjonane i `lib/api.ts`
3. Data vil automatisk cachast og oppdaterast

## 🎭 Animasjonar

Framer Motion er brukt for:
- Side-overgangar
- Kort animasjonar
- Tab switching
- Nedtelling
- Hover/tap feedback

## 📦 State Management

Zustand store for:
- Match filter state
- Roster tab state
- Selected season

## 🚀 Deployment

Applikasjonen kan deployast til:
- Vercel (anbefalt for Next.js)
- Netlify
- AWS Amplify
- Self-hosted

```bash
# Bygg og eksporter
npm run build
```

## 📄 Lisens

Proprietær - K.I.L Fotballklubb
