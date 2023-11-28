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

## Code formatter

We are using a code formatter [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension to format our code for better readability across developers. 

Steps to set up the Prettier;

1. Download the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension.
 
2. Go to vscode formatting settings; 
    
    Enable Format on Paste(optional)
    
    Enable Format on Save(obligatory)
    
    Enable Format on Type(optional)

3. Go to default formatter settings and choose **Prettier - Code formatter** extension as your default code formatter.

    Now you should be able to format your code when you save it (CTRL + S  or  CMD + S)

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview` afterwards.

## External text server

> This is a future feature. Here it's explained how it would work

The idea is to allow leads as admins with custom permissions to edit some texts of the website. In order to achieve this while keeping a fully static generation, we could leverage SvelteKit's [`+page.sever.ts`](https://kit.svelte.dev/docs/routing#page) and [Netlify build hooks](https://docs.netlify.com/configure-builds/build-hooks/). For each page that requires this sort of synamic text, the following steps can be followed:

-   create `+page.sever.ts` that export a `load` function that queries a server api endpoint and returns its result. This query is done only once during the build process: the text goes directly in the html, and the eventual hydration won't query the API (thus faster navigation)

```ts
// +page.server.ts

import type { PageServerLoad } from "./$types";

interface Texts {
    /* definition */
}

export const load = (async ({ fetch }) => {
    const res = await fetch("<api endpoint>");
    const data: Texts = await res.json();
    return data; // or do some processing
}) satisfies PageServerLoad;
```

-   inside `+page.svelte` export a prop with type `PageData` imported from `./$types` (hidden ts declaration file silently created by SvelteKit to have) and use its value around the page

```html
<!-- +page.svelte -->
<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    // PageData is inferred from return type of load function
</script>
<!-- use data in the document -->
```

-   After some texts are modified, the server can request Netlify to rebuild the website trough a POST request to `https://api.netlify.com/build_hooks/<id>?trigger_title=<name>` where the `id` is given when creating a new Netlify build hook, an `name` is an optional name for tracking purposes.
