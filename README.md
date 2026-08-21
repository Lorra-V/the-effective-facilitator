# The Effective Facilitator

A developmental learning app for the **nine personal disciplines** of facilitation — judgment, self-awareness, and human agency when working with (not under) AI.

Built as a Hult Cohort / Ludwitt learning app: register → launch JWT → events → metrics.

**Tagline:** *AI makes creation abundant; human judgment sets the limit.*

## What you can do

- Discover a facilitator profile (`/get-started`)
- Explore the nine disciplines (`/explore`)
- Work through full modules (Detachment, Intentionality, Sense of Wonder) plus preview modules
- Scenario quizzes that report learning events to the Ludwitt/Hult metrics pipeline

## Run locally

```bash
git clone https://github.com/Lorra-V/the-effective-facilitator.git
cd the-effective-facilitator
npm install
cp .env.local.example .env.local   # fill Ludwitt + Supabase values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Curriculum source of truth: `docs/curriculum/`. Agent notes: `AGENTS.md`.

## Contributing

Fork, branch from `main`, and open a pull request. Keep curriculum text from `docs/curriculum/` verbatim where the spec already has finished copy.
