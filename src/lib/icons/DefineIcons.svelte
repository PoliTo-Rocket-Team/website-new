<script lang="ts">
    import { symbols } from "./internal";
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
    {#each Object.entries(symbols) as [name, s]}
        <symbol id="icon-{name}" viewBox="0 0 {s.size} {s.size}">
            {@html s.body}
        </symbol>
    {/each}
</svg>

<style>
    svg {
        transform: scale(0);
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
    }
</style>