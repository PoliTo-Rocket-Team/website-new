# Official PRT website source files

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

We are using [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension to format our code for better readability across developers. Follow these steps to set it up:

1. Download the [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension.
 
2. Go to vscode formatting settings:
    
   - Enable Format on Paste (optional)
   - Enable Format on Save (obligatory)
   - Enable Format on Type (optional)

3. Go to default formatter settings and choose **Prettier - Code formatter** extension as your default code formatter.

    Now you should be able to format your code when you save it (CTRL + S  or  CMD + S)

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview` afterwards.

## Supabase integration

Division leads, subteam chiefs, and the president &ndash; each with their permissions &ndash; can edit their own appearance, manage their divisions, write/open/close positions.

The [public](./src/routes/(public)/) routes are prerendered (see [here](#public-prerendering)) in order to be served very quickly and to save netlify computation time. On the other hand the [dashboard](./src/routes/(shared-session)/dashboard/) makes full use of SvelteKit load functions. On top of that, a minimal [server hook](https://kit.svelte.dev/docs/hooks#server-hooks) is used to create a supabase server client for:
- [`/auth`](./src/routes/(shared-session)/auth/) routes;
- `/dashboard` routes, for which it also checks for the existance of a user session, redirecting in case of unauthenticated users;
- public routes in the case of building or developing, logging in a special user (with only partial read permissions) which allows the load functions to retrieve data from the database.


### Permissions

| Action | Division Lead | Subteam Chief | President |
| ------ | :-----------: | :-----------: | :-------: |
| Update personal picture & linkedin | &#10004; | &#10004; | &#10004; |
| Read positions | Their division | Their subteam | All |
| Edit positions | Upon Chief permission | Their subteam | &#10006; |
| Edit subteam divisions | &#10006; | Their subteam | All |
| Edit subteams | &#10006; | &#10006; | &#10004; |
| Invite people | &#10006; | ? | &#10004; |
| Appoint new division lead | &#10006; | &#10004; | &#10004; |
| Appoint new subteam chief | &#10006; | &#10006; | &#10004; |
| Add notable student (N.S.) | &#10006; | &#10004; | &#10006; |
| Update & remove N.S. | &#10006; | &#10006; | &#10004; |
| Edit apply faqs | if logistics lead? | &#10006; | &#10004; |
| Issue Netlify build | if IT lead | &#10006; | &#10004; |


### Public prerendering

In the [public `layout.ts`](./src/routes/(public)/+layout.ts), `export const prerender = true;` tells sveltekit to prerender any public route. `+page.server.ts` [load](https://kit.svelte.dev/docs/load) functions are thus executed only during build time, and their result is stored in json files. The returned data is available in the prop `page` of `+page.svelte` components. 

```ts
// +page.server.ts

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const res = await locals.supabase.from("<table>").select("<fields>");
    return res.data; // or do some processing
};
```

```html
<!-- +page.svelte -->
<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
    // PageData is inferred from return type of load function
</script>
<!-- use data in the document -->
```

In order for some databse change to take effect on the public pages, Netlify has to receive a POST request to `https://api.netlify.com/build_hooks/<id>?trigger_title=<name>` where the `id` is given when creating a new Netlify build hook, an `name` is an optional name for tracking purposes. Such request can be only done by the president or by the IT lead, though an _ad-hoc_ page.
