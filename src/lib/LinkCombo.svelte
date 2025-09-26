<script context="module" lang="ts">
    export interface ComboRoute {
        url: string;
        name: string;
    }
    let closeLast: (() => void) | null = null;
</script>

<script lang="ts">
    import { browser } from "$app/environment";

    import { page } from "$app/stores";

    export let base: string;
    export let routes: ComboRoute[];
    export let replace: boolean;

    let container: HTMLElement;
    let open = false;
    $: active = $page.url.pathname.startsWith("/" + base);

    function close() {
        open = false;
    }
    function onBodyClick(e: Event) {
        if (container === e.target || container.contains(e.target as Node))
            return;
        open = false;
    }
    $: if (open) {
        if (closeLast) closeLast();
        closeLast = close;
        if (browser) document.body.addEventListener("click", onBodyClick);
    } else {
        if (closeLast === close) closeLast = null;
        if (browser) document.body.removeEventListener("click", onBodyClick);
    }
</script>

<svelte:window on:scroll={close} />

<div class="wrapper" bind:this={container}>
    <button class="nav-entry" class:active on:click={() => (open = !open)}
        >{base}</button
    >
    <ul class:open>
        {#each routes as route}
            <li>
                <a
                    data-sveltekit-replacestate={replace || null}
                    data-umami-event={`${route.name} Button`}
                    href="/{base}/{route.url}"
                    on:click={close}>{route.name}</a
                >
            </li>
        {/each}
    </ul>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
    }
    a {
        text-transform: none;
        text-decoration: none;
        color: var(--fg-0);
        font-weight: 500;
    }

    @media (max-width: 50rem) {
        button {
            text-align: right;
            display: block;
            width: fit-content;
            margin-left: auto;
            margin-bottom: 0.3rem;
            font-size: var(--fs-60);
        }
        ul {
            list-style: none;
            align-items: flex-end;
            padding-right: 0.6em;
            border-right: 4px solid #8888;
        }
        ul li + li {
            margin-top: 0.3rem;
        }
        ul a {
            font-size: var(--fs-50);
        }
    }

    @media (min-width: 50rem) {
        .wrapper {
            position: relative;
        }
        button {
            z-index: 4;
        }
        ul {
            z-index: 3;
            position: absolute;
            width: max-content;
            top: 0;
            left: -0.5ch;
            align-items: start;

            padding-left: 0.5ch;
            padding-right: 0.2ch;
            padding-top: 1.6rem;
            padding-bottom: 0.15rem;

            opacity: 0;
            clip-path: inset(0 -2rem 100% -2rem);
            transition:
                clip-path 0.25s ease,
                opacity 0.25s ease;
            pointer-events: none;
        }
        ul::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 2px;
            border-radius: 1px;
            background-color: var(--accent-fig);
        }
        ul::after {
            z-index: -1;
            content: "";
            position: absolute;
            bottom: -0.8rem;
            left: -0.8rem;
            width: calc(100% + 1.6rem);
            height: 100%;
            border-radius: 0.8rem;
            background-color: rgba(var(--bg-0-rgb), 0.7);
            backdrop-filter: blur(2px);
            filter: blur(0.2rem);
        }
        ul li {
            margin-top: 0.1rem;
            opacity: 0.9;
        }
        /* .wrapper:hover > ul, */

        @media (hover: none) {
            ul.open {
                clip-path: inset(0 -2rem -2rem -2rem);
                opacity: 1;
                pointer-events: auto;
            }
        }
        @media (hover: hover) {
            button {
                cursor: auto;
                -moz-user-focus: ignore;
            }
            .wrapper:hover > ul {
                clip-path: inset(0 -2rem -2rem -2rem);
                opacity: 1;
                pointer-events: auto;
            }
        }
        ul:focus-within {
            clip-path: inset(0 -2rem -2rem -2rem);
            opacity: 1;
            pointer-events: auto;
        }
    }
</style>
