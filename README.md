# New PRT website

Website of PoliTo Rocket Team using the [SvelteKit](https://kit.svelte.dev/) framework with [adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static).

## Contributing

```bash
# clone repo
git clone "https://github.com/PoliTo-Rocket-Team/website-new.git" <folder name>

# installing dependencies
pnpm install

# developing by starting the server
pnpm dev

# or additionally open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview` afterwards.

## External text server

> This is a future feature. Here it's explained how it would work

The idea is to allow leads as admins with custom permissions to edit some texts of the website. In order to achieve this while keeping a fully static generation, we could leverage SvelteKit's `+page.sever.ts` and Netlify build hooks. For each page that requires this sort of synamic text, the following steps can be followed:

 * create `+page.sever.ts` that export a `load` function that queries a server api endpoint and returns its result. This query is done only once during the build process: the text goes directly in the html, and the eventual hydration won't query the API (thus faster navigation)

```ts
// +page.server.ts

import type { PageServerLoad } from './$types';

interface Texts { /* definition */ }

export const load = (async ({ fetch }) => {
    const res = await fetch("<api endpoint>");
    const data: Texts = await res.json();
    return data; // or do some processing
}) satisfies PageServerLoad;
```

 * inside `+page.svelte` export a prop with type `PageData` imported from `./$types` (hidden ts declaration file silently created by SvelteKit to have)

```html
<!-- +page.svelte -->
<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    // PageData is inferred from return type of load function
</script>
<!-- use data in the document -->
``` 
