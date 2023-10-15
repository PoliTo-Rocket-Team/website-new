<script lang="ts">
    import type { LayoutData } from "./$types";
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";

    export let data: LayoutData;

    function current(node: HTMLAnchorElement) {
        const destroy = page.subscribe(v => node.classList.toggle("current", node.href.endsWith(v.url.pathname)));
        return { destroy };
    }

    function fiximg(this: HTMLImageElement) {
        this.src = "https://api.dicebear.com/7.x/micah/svg?backgroundColor=transparent&seed="+data.person?.first_name;
    }
</script>

<main class="split">
    <aside>
        <div class="account">
            <img src={data.pic} alt="Hopefully your face" on:error={fiximg}>

            <span class="name">{data.person ? data.person.first_name + ' ' + data.person.last_name : "Not yet linked"}</span>
            {#each data.subteams||[] as s}
                <span class="title">{s.title} Lead</span>
            {/each}
            {#each data.divisions||[] as d}
                <span class="title">{d.name} Lead</span>
            {/each}
        </div>
        <hr>
        <ul>
            <li>
                <a href="/dashboard/account" use:current>Account</a>
            </li>
            {#each data.divisions||[] as d}
                <li><a href="/dashboard/positions/{d.id}" use:current>{d.code} positions</a></li>
            {/each}
            {#each data.subteams||[] as s}
                <li>
                    <a href="/dashboard/subteam/{s.id}" use:current>
                        Project
                        {#if s.name.length > 15}
                            <abbr title={s.name}>{s.code}</abbr>
                        {:else}
                            {s.name}
                        {/if}
                    </a>
                </li>
            {/each}
        </ul>
        <hr>
        <form action="/auth/logout" method="post" use:enhance={async ({cancel}) => {
            cancel();
            await data.supabase.auth.signOut();
            goto("/auth/login");
        }}>
            <button type="submit">Log out</button>
        </form>
    </aside>
    <div>
        <slot />
    </div>
</main>

<style>
    .split {
        display: grid;
        grid-template-columns: auto 1fr;
    }
    aside {
        padding: 1.5rem;
        border-right: 2px solid #8884;
        position: sticky;
        top: 10vh;
        /* transform: translateY(-50%); */
    }
    hr {
        height: 0;
        border: none;
        border-top: 2px solid #8884;
        margin: 1.5rem 0;
        transform: translateX(1.5rem);
    }
    .account, ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: end;
    }
    li + li {
        margin-top: .4rem;
    }
    button, a {
        display: inline-block;
        text-decoration: none;
        color: inherit;
        padding: .4rem .8rem;
        background-color: #8881;
        color: var(--fg-1);
        border-radius: .4rem;
        font-weight: 600;
        font-size: 1.1rem;
    }
    button:hover, a:hover {
        background-color: #8882;
        color: var(--fg-0);
    }
    a:global(.current)::before {
        content: '\00BB';
        color: var(--accent-fig);
        position: relative;
        bottom: .1rem;
        padding-right: .4ch;
    }
    form {
        text-align: right;
    }
    img {
        display: block;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: .5rem;
    }
    .name {
        font-size: 1.5rem;
        font-weight: 600;
    }
    .title {
        color: var(--accent-text);
        font-weight: 500;
    }
</style>
