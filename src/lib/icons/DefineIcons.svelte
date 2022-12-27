<script lang="ts">
    import { register, symbols } from "./internal";
</script>

{#if register.size}
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
        {#each Array.from(register) as icon}
            {@const s = symbols[icon]}
            <symbol id="icon-{icon}" viewBox="0 0 {s.size} {s.size}">
                {@html s.body}
            </symbol>
        {/each}
    </svg>
{/if}

<style>
    svg {
        transform: scale(0);
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
    }
</style>