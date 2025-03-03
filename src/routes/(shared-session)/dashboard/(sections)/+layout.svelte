<script lang="ts">
    import "./common.css";
    import type { LayoutData } from "./$types";
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";
    import { createPictureStore, fiximg } from "$lib/dashboard-utils";
    import { setContext } from "svelte";

    export let data: LayoutData;

    function current(node: HTMLAnchorElement) {
        const destroy = page.subscribe(v =>
            node.classList.toggle("current", node.href.endsWith(v.url.pathname))
        );
        return { destroy };
    }

    const picture = createPictureStore(data.pic);
    setContext("picture", picture);
</script>

<main class="split">
    <div>
        <aside>
            <div class="account">
                <img src={$picture} alt="Hopefully your face" />
                <span class="name"
                    >{data.person
                        ? data.person.first_name + " " + data.person.last_name
                        : "Not yet linked"}</span
                >
                {#if data.person.chief_of}
                    <span class="title">{data.person.chief_of.title}</span>
                {/if}
                {#each data.person.lead_of || [] as d}
                    <span class="title"
                        >{d.name} Lead {d.acting ? "(acting)" : ""}</span
                    >
                {/each}
            </div>
            <hr />
            <ul>
                {#if data.person.chief_of}
                    {@const s = data.person.chief_of}
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
                {/if}
                {#each data.person.lead_of as d}
                    <li>
                        <a href="/dashboard/positions/{d.id}" use:current
                            >{d.code} positions</a
                        >
                    </li>
                {/each}
                <li>
                    <a href="/dashboard/orders" use:current>Orders</a>
                </li>
                <li>
                    <a href="/dashboard/bureaucracy" use:current>Bureaucracy</a>
                </li>
                <li>
                    <a href="/dashboard/account" use:current>Account</a>
                </li>
            </ul>
            <hr />
            <form
                action="/auth/logout"
                method="post"
                use:enhance={async ({ cancel }) => {
                    cancel();
                    await data.supabase.auth.signOut();
                    goto("/auth/login");
                }}
            >
                <button type="submit">Log out</button>
            </form>
        </aside>
    </div>
    <div class="body">
        <slot />
    </div>
</main>

<style>
    .split {
        display: grid;
        grid-template-columns: minmax(20ch, auto) 1fr;
    }
    aside {
        padding: 1.5rem;
        padding-bottom: 10vh;
        border-right: 2px solid #8884;
        position: sticky;
        top: var(--pad);
        text-align: right;
        /* transform: translateY(-50%); */
    }
    hr {
        height: 0;
        border: none;
        border-top: 2px solid #8884;
        margin: 1.5rem 0;
        transform: translateX(1.5rem);
    }
    .account,
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: end;
    }
    li + li {
        margin-top: 0.4rem;
    }
    button,
    a {
        display: inline-block;
        text-decoration: none;
        color: inherit;
        padding: 0.4rem 0.8rem;
        background-color: #8881;
        color: var(--fg-1);
        border-radius: 0.4rem;
        font-weight: 600;
        font-size: 1.1rem;
    }
    button:hover,
    a:hover {
        background-color: #8882;
        color: var(--fg-0);
    }
    a:global(.current)::before {
        content: "\00BB";
        color: var(--accent-fig);
        position: relative;
        bottom: 0.1rem;
        padding-right: 0.4ch;
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
        margin-bottom: 0.5rem;
    }
    .name {
        font-size: 1.5rem;
        font-weight: 600;
    }
    .title {
        color: var(--accent-text);
        font-weight: 500;
    }
    .body {
        padding: 2.5rem 4rem;
    }
</style>
