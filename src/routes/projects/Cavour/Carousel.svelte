<!-- Typescript errors here are due to the poor typing of slidy -->

<script context="module" lang="ts">
    import { sine } from "@slidy/easing";
    import { stairs } from "@slidy/animation";
    import type { Options, SlidyInstance } from "@slidy/core";

    const opt: Options = {
        index: 0,
        clamp: 0,
        indent: 1,
        sensity: 15,
        gravity: 1.2,
        duration: 450,
        animation: stairs,
        easing: sine,
        axis: "x",
        snap: "center",
        loop: true,
    }
</script>

<script lang="ts">
    export let images: string[];

    import Expand from "$lib/Expand.svelte";
    import { slidy } from "@slidy/core";

    let s: SlidyInstance;
    let node: HTMLElement;
    $: node && (s = slidy(node, opt))

    let index = 0;
    function onMove(e: CustomEvent) {
        index = e.detail.index
    }

</script>

<Expand>
    <div>
        <ul role="listbox" bind:this={node} on:move={onMove}>
            {#each images as src}
            <li>
                <img src={src} alt="" loading="lazy">
            </li>
            {/each}
        </ul>
    </div>
</Expand>

<style>
    div {
        overflow-x: hidden; 
        overflow-y: visible;
        padding: var(--carousel-padding, 1rem) 0;
        width: 100%;
    }
    ul {
        list-style: none;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
        padding-bottom: 0.5rem;
        width: 100%;
    }
    li {
        flex: 0 0;
        padding: 0 clamp(1rem, 5vw, 3rem);
    }
    img {
        max-width: 80vw;
        max-height: 30rem; /* var(--carousel-height) */
        width: auto;
        height: auto;
        border-radius: .5rem;
        display: block;
    }
</style>