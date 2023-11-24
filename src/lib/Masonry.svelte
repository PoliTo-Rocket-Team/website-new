<script lang="ts" context="module">
    function splitGroup<T>(arr: T[], count: number) {
        let i: number;
        const res = new Array<T[]>(count);
        for (i = 0; i < count; i++) res[i] = [];
        const len = arr.length;
        for (i = 0; i < len; i++) res[i % count].push(arr[i]);
        return res;
    }
</script>

<script lang="ts">
    import { throttle } from "./timing";

    import { onMount } from "svelte";

    type T = $$Generic<Record<string, any>>;

    export let data: T[];

    let cols = 1;
    let container: HTMLElement;
    function updateRows() {
        const css = getComputedStyle(container);
        cols = css.gridTemplateColumns.split(" ").length;
    }
    onMount(updateRows);

    $: columnData = splitGroup(data, cols);
</script>

<svelte:window on:resize={throttle(500, updateRows)} />

<div class="container" bind:this={container}>
    {#each columnData as arr}
        <div class="col">
            {#each arr as data}
                <div class="block">
                    <slot {...data} />
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: var(--masonry-cols);
        column-gap: var(--masonry-gap);
    }
    .col {
        display: flex;
        flex-direction: column;
    }
    .block {
        margin-bottom: var(--masonry-gap);
    }
</style>
