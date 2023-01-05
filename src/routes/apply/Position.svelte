<script lang="ts">
    import Base from "./Base.svelte";
    export let role: string;
    export let code: string;
    export let subteam: string;
    export let division: string;
    export let group: string|undefined = undefined;
</script>

<Base {role} {code}>
    <svelte:fragment slot="header">
        <div><span class="on-sm">Subteam: </span>{subteam}</div>
        <div><span class="on-sm">Division: </span>{division}</div>
        {#if group}
        <div><span class="on-sm">Group: </span>{group}</div>
        {:else}
        <div class="na on-lg" aria-hidden="true">N/A</div>
        {/if}
    </svelte:fragment>
    <slot slot="content" />
</Base>

<style>
    .na {
        opacity: 0.5;
    }
</style>