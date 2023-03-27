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

    let container: HTMLElement;
    let open = false;
    $: active = $page.url.pathname.startsWith('/'+base);

    function close() {open = false;}
    function onBodyClick(e: Event) {
        if(container === e.target || container.contains(e.target as Node)) return;
        closeLast = null;
        open = false;
    }
    $: if(open) {
        if(closeLast) closeLast();
        closeLast = close;
        if(browser) document.body.addEventListener("click", onBodyClick);
    } else {
        if(browser) document.body.removeEventListener("click", onBodyClick);
    }
    function onMouseEnter() {
        if(closeLast) {
            closeLast();
            closeLast = null;
        }
    }
</script>

<svelte:window on:scroll={close} />

<li class="wrapper" bind:this={container} on:mouseenter={onMouseEnter}>
    <button class="nav-entry" class:active on:click={() => open = !open}>{base}</button>
    <ul class:open>
        {#each routes as route}
            <li><a href="/{base}/{route.url}" on:click={close}>{route.name}</a></li>
        {/each}
    </ul>
</li>

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
        .wrapper {
            margin-top: 1.25rem;
            margin-bottom: 1.25rem;
        }
        button {
            text-align: right;
            display: block;
            width: fit-content;
            margin-left: auto;
            margin-bottom: .3rem;
            font-size: var(--fs-60);
        }
        ul {
            list-style: none;
            align-items: flex-end;
            padding-right: .6em;
            border-right: 4px solid #8888;
        }
        ul li + li {
            margin-top: .3rem;
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
            left: -.5ch;
            align-items: start;

            
            padding-left: .5ch;
            padding-right: .2ch;
            padding-top: 1.6rem;
            padding-bottom: .15rem;

            opacity: 0;
            clip-path: inset(0 -2rem 100% -2rem);
            transition: clip-path .25s ease, opacity .25s ease;
            pointer-events: none;
        }
        ul::before {
            content: '';
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
            content: '';
            position: absolute;
            bottom: -0.8rem;
            left: -0.8rem;
            width: calc(100% + 1.6rem);
            height: 100%;
            border-radius: 0.8rem;
            background-color: rgba(var(--bg-0-rgb), 0.7);
            backdrop-filter: blur(2px);
            filter: blur(.2rem);
        }
        ul li {
            margin-top: .1rem;
            opacity: 0.9;
        }
        .wrapper:hover > ul,
        ul.open {
            /* transform: translateY(100%); */
            clip-path: inset(0 -2rem -2rem -2rem);
            opacity: 1;
            pointer-events: auto;
        }
    }
</style>