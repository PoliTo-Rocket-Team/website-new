<script lang="ts">
    import { register, type Icon } from "./internal";
    export let icon: Icon;
    register.add(icon);
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
>
    <use fill="var(--icon-clr)" href="#icon-{icon}" width="48" height="48"
    ></use>
</svg>

<style>
    svg {
        width: var(--icon-size, 1em);
        height: var(--icon-size, 1em);
        display: block;
        color: var(--icon-clr);
    }
</style>
