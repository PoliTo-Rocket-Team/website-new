<script lang="ts">
    import { transitional } from "./timing";
    export let selection: boolean;
    export let ms: number = 50;

    const t = transitional(ms,selection);
    $: t.set(selection);
    $: t.dur(ms);
</script>

<div class="container" style="--dur: {ms}ms">
    <div class="view" class:faded={$t > 0} class:hidden={$t === +2}>
        <slot name="false" />
    </div>
    <div class="view" class:faded={$t < 0} class:hidden={$t === -2}>
        <slot name="true" />
    </div>
</div>

<style>
    .container { display: grid; }
    .view {
        grid-row: 1;
        grid-column: 1;
        transition: opacity var(--dur) ease;
    }
    .view.faded { opacity: 0; }
    .view.hidden { transform: scale(0); }
</style>