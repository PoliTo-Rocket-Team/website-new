<script lang="ts">
    import Base from "./Base.svelte";
    export let role: string;
    export let code: string;
    export let subteam: string;
    export let division: string;
</script>

<Base {role} {code}>
    <svelte:fragment slot="header">
        <div><span class="on-sm">Subteam: </span>{subteam}</div>
        <div><span class="on-sm">Division: </span>{division}</div>
    </svelte:fragment>
    <slot slot="content" />
</Base>