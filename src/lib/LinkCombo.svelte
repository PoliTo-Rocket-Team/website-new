<script context="module" lang="ts">
    export interface ComboRoute {
        url: string;
        name: string;
    }
</script>

<script lang="ts">
    import { page } from "$app/stores";

    export let base: string;
    export let routes: ComboRoute[];

    let container: HTMLElement;
    let open = false;
    $: active = $page.url.pathname.startsWith('/'+base);

    function onBodyClick(e: Event) {
        if(container === e.target || container.contains(e.target as Node)) return;
        open = false;
    }
</script>

<svelte:window on:scroll={() => open = false} />
<svelte:body on:click={onBodyClick} />

<li class="wrapper" bind:this={container}>
    <button class="nav-entry" class:active on:click={() => open = !open}>{base}</button>
    <ul class:open>
        {#each routes as route}
            <li><a href="/{base}/{route.url}">{route.name}</a></li>
        {/each}
    </ul>
</li>

<style>
    .wrapper {
        list-style: none;
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
        }
        button {
            text-align: right;
            display: block;
            width: fit-content;
            margin-left: auto;
            margin-bottom: .3rem;
            
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
        ul {
            position: absolute;
            width: max-content;
            bottom: -.6rem;
            left: 50%;
            align-items: center;
            padding: .6rem .75rem;
            background-color: var(--bg-1);
            border-radius: .4rem;
            border: 2px solid #aaa8;
            
            opacity: 0;
            transform: translate(-50%, calc(100% + 1rem));
            transition: transform .25s ease, opacity .25s ease;
            /* clip-path: inset(-7px 0 calc(100% + 7px) 0);
            transition: clip-path .15s ease; */
        }
        ul::after {
            content: '';
            position: absolute;
            top: 0px;
            left: 50%;
            transform: translate(-50%, -100%);
            height: 6px;
            width: 12px;
            background-color: #aaa;
            clip-path: polygon(50% 0, 100% 100%, 0% 100%);
        }
        ul li + li {
            margin-top: .45rem;
        }
        ul.open {
            /* clip-path: inset(-7px 0 0 0); */
            transform: translate(-50%, 100%);
            opacity: 1;
        }
    }
</style>