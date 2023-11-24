<script lang="ts">
    export let text: string;
</script>

{#each text.split("*") as str, i}{#if i & 1}<em>{str}</em
        >{:else}{str}{/if}{/each}

<style>
    em {
        font-weight: var(--em-fw, inherit);
        font-style: normal;
        color: var(--accent-text);
    }
</style>
