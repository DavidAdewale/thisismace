# Mace / thisismace

Local pre-release foundation built with Next.js App Router, TypeScript and plain CSS. No domain, deployment, analytics, signup service or paid dependencies configured.

## Development

```sh
npm install
npm run dev
```

Open the Local URL printed by Next.js. `npm run build` checks the production build. `npm run lint` runs ESLint.

## Editing

- `src/app/globals.css`: design tokens in `:root` (late-night palette, phase accents, motion easing) plus all styling and animations. Reduced-motion users get a still version.
- `src/app/layout.tsx`: fonts (Instrument Serif for headlines, Manrope for body) and the site shell.
- `src/content/site.ts`: shared artist, release content, and `phasePhotos` (the portraits that rotate in the hero for each phase) and `quietPhotos` (Circle and 404).
- `src/components/hero-portrait.tsx`: arched rotating portrait with pointer parallax, and the released-phase sleeve with vinyl.
- `src/components/ambient.tsx`: drifting background light and the word-by-word headline reveal.
- `src/app/page.tsx`: homepage.
- `src/app/music/wbdg/page.tsx`: pre-release story.
- `src/app/circle/page.tsx`: Circle invitation, explicitly inactive until signup is configured.

## Confirmed project context

- WBDG is unreleased. Release date is not yet specified.
- Slash Beauty partnership is confirmed for later in February 2027. This is not a confirmed song release date; keep partnership detail out of public copy until approved.
- Photography is being shot on 8 November 2026. Current artwork is a neutral placeholder.
- Welcome gift is undecided. Do not promise or distribute the acoustic version.
- Mace can send two thoughtful notes per month and personally review replies.
- Domain, MailerLite and other integrations will be set up later.

## Next steps

Add photography, revise copy and visual direction, agree the pre-release invitation, then connect MailerLite. Store future secrets in `.env.local`, never client code or Git. No email data is currently collected. Remove the layout’s noindex metadata only when approved for public launch. Keep future eras as separate content records with stable URLs and the shared site shell.

## Release phases

The homepage now resolves one of three states from `src/content/site.ts`:

- `early`: a minimal signal and email invitation. This is the public state from 1 December 2026.
- `presave`: WBDG title, 12 February 2027 date, Ditto pre-save action and email alternative.
- `released`: listening-service links and a continuing email invitation.

The site is set to `early`. To switch or preview a phase, change the return value of `resolveReleasePhase()` in `src/content/site.ts`. Deploy that code change when the next phase is ready. The song title, `/music/wbdg` and its page title stay hidden in Early.

Copy `.env.example` to `.env.local` and add `MAILERLITE_API_TOKEN` plus `MAILERLITE_GROUP_ID` before opening email signup. The token stays server-side. Add `NEXT_PUBLIC_DITTO_PRESAVE_URL` after Ditto creates the WBDG SmartLink. Add verified DSP URLs to `currentRelease.listenLinks` before release day.

## Pre-release restraint

Homepage is a compact teaser: name, title, one lyric and profile area. No biography, interview content, repeated invitations or acoustic offer. Circle remains off the main navigation until ready. Profile URLs are null until supplied and verified; labels are visibly inactive, not fake links. Edit `profiles` in `src/content/site.ts` to connect them. Shared `ReleaseTeaser` powers home and the stable WBDG route. Theme variables remain in `globals.css`.
