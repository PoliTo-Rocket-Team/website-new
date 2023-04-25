<script lang="ts">
    import { paths, type LinkedIcon } from "./internal";
    import IconCmp from "./Icon.svelte";
    export let icon: LinkedIcon;
    export let id: string;
</script>

<a href="{paths[icon]}{id}" target="_blank" rel="noreferrer" title={icon} aria-label={icon}><IconCmp {icon} /></a>

<style>
    @keyframes shake {
        0% { transform: rotate(0); }
        25% { transform: rotate(-10deg); }
        50% { transform: rotate(0); }
        75% { transform: rotate(10deg); }
        100% { transform: rotate(0); }
    }
    a:hover {
        --icon-clr: var(--icon-hover);
        animation: shake .25s ease;
    }
</style>