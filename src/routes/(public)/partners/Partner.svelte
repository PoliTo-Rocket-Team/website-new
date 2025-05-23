<script context="module" lang="ts">
    const opts = { stiffness: 0.15, damping: 0.8, precision: 0.001 };
    const transform = (x: number, y: number) =>
        `translate(${x * 1.5}%,${y * 1.5}%) rotate3d(${-y},${x},0,${
            -2 * Math.hypot(x, y)
        }deg)`;
</script>

<script lang="ts">
    import Follow3D from "$lib/Follow3D.svelte";
    import { theme } from "$lib/theme";

    export let name: string;
    export let link: string;
    export let texts: string[] | null;
    export let img: string | string[];
    export let localTheme: null | "dark" | "light" = null;

    let currentTheme: string | null = null;
    let currentImg: string;

    const unsubscribe = theme.subscribe(value => {
        currentTheme = value;
        updateImage();
    });

    function updateImage() {
        if (Array.isArray(img)) {
            if (currentTheme === "light") {
                currentImg = img[0];
            } else if (currentTheme === "dark") {
                currentImg = img[1];
            }
        } else {
            currentImg = img as string;
        }
    }

    $: updateImage();

    import { onDestroy } from "svelte";
    onDestroy(() => {
        unsubscribe();
    });

    function preventNav(this: HTMLAnchorElement) {}
</script>

<Follow3D options={opts} {transform}>
    <article>
        <div class="cover">
            {#if texts}
                <div class="img-wrapper" data-theme={localTheme}>
                    <img src="img/sponsors/{currentImg}" alt="logo of {name}" />
                </div>
                <h3>{name}</h3>
                <div class="text">
                    {#each texts as t}
                        <p>{t}</p>
                    {/each}
                    {#if link}
                        <a
                            class="main--link"
                            href={link}
                            target="_blank"
                            on:click={preventNav}>Visit their website</a
                        >
                    {/if}
                </div>
            {:else}
                <div class="img-wrapper" data-theme={localTheme}>
                    <a href={link} target="_blank" on:click={preventNav}
                        ><img
                            src="img/sponsors/{currentImg}"
                            alt="logo of {name}"
                        /></a
                    >
                </div>
                <h3>
                    <a href={link} target="_blank" on:click={preventNav}
                        >{name}</a
                    >
                </h3>
            {/if}
        </div>
    </article>
</Follow3D>

<style>
    article {
        position: relative;
        z-index: 0;
        height: var(--partner-height, 24rem);
        padding: 1rem;
        border: 2px solid #777b;
        overflow-y: hidden;
        width: 100%;
    }
    .cover {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
        height: 100%;
        z-index: 1;
    }
    .img-wrapper {
        width: 12rem;
        place-self: center;
        position: relative;
        isolation: isolate;
    }
    img {
        width: 100%;
        z-index: 2;
        display: block;
    }
    [data-theme]::before {
        content: "";
        z-index: -1;
        position: absolute;
        left: -1.5rem;
        top: -1.5rem;
        width: calc(100% + 3rem);
        height: calc(100% + 3rem);
        border-radius: 8rem;
        /* filter: blur(0rem); */
    }
    :global([data-theme="light"]) [data-theme="dark"]::before {
        background-color: var(--bg-1);
        box-shadow: 0 0 1.5rem var(--bg-1);
    }
    :global([data-theme="dark"]) [data-theme="light"]::before {
        background-color: var(--bg-0);
        box-shadow: inset 0 0 1.5rem var(--bg-2);
    }

    h3 {
        font-size: var(--fs-60);
        color: var(--accent-fig);
    }
    p {
        margin-bottom: 0.5rem;
    }

    a {
        color: var(--accent-fig);
        text-decoration: none;
    }

    .main--link {
        margin-top: 0.5rem;
        display: inline-block;
        border: 2px solid var(--accent-fig);
        padding: 0.3rem 0.6rem;
        text-decoration: none;
        font-weight: 500;
    }
    .text {
        z-index: 10;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 1rem;
        opacity: 0;
        backdrop-filter: blur(3px);
        background-color: rgba(var(--bg-0-rgb), 0.85);
        transform: translateY(-1rem);
        transition:
            transform 0.15s ease-out,
            opacity 0.15s ease-out;
    }
    article:hover .text,
    article:active .text,
    article:focus-within .text {
        opacity: 1;
        transform: translateY(0);
        transition:
            transform 0.15s ease-out,
            opacity 0.15s ease-in;
    }

    @media (min-width: 50rem) {
        article {
            width: 30ch;
        }
    }

    /* Disable briefly the anchor tag on mobile devices */
    @media (max-width: 50rem) {
        .main--link {
            clip-path: inset(0 0 100% 0);
            transition: clip-path 0ms 0.15s linear;
        }
        article:hover .main--link,
        article:active .main--link,
        article:focus-within .main--link {
            clip-path: inset(0);
            transition: clip-path 0ms 0.01s linear;
        }
    }
</style>
