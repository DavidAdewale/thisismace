# Mace / realmaceworld

Local pre-release foundation built with Next.js App Router, TypeScript and plain CSS. No domain, deployment, analytics, signup service or paid dependencies configured.

## Development

```sh
npm install
npm run dev
```

Open the Local URL printed by Next.js. `npm run build` checks the production build. `npm run lint` runs ESLint.

## Editing

- `src/app/globals.css`: semantic colour, typography, spacing and layout tokens in `:root`.
- `src/content/site.ts`: shared artist, Circle and current release content.
- `src/components/artwork.tsx`: reusable photo area. Set `currentRelease.artwork` to `{ src: "/images/filename.jpg", alt: "Meaningful description" }` after putting a photo in `public/images/`.
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
