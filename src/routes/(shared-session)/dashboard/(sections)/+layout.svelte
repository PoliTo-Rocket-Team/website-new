<script lang="ts">
    import type { LayoutData } from "./$types";
    import { page } from "$app/stores";

    export let data: LayoutData;

    function current(node: HTMLAnchorElement) {
        const destroy = page.subscribe(v => node.classList.toggle("current", node.href.endsWith(v.url.pathname)));
        return { destroy };
    }
</script>

<main class="split">
    <aside>
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
        padding: 10vh 2ch;
        border-right: 2px solid #8885;
        position: sticky;
        top: 10vh;
        /* transform: translateY(-50%); */
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: end;
    }
    li {
        margin-bottom: .4rem;
    }
    a {
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
    a:hover {
        background-color: #8882;
        color: var(--fg-0);
    }
    a:global(.current) {
        color: var(--accent-fig);
    }
</style>
