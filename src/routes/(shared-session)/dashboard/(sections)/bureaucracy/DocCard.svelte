<script lang="ts">
    import IconCMP from "$lib/icons/Icon.svelte";
    import Follow3D from "$lib/Follow3D.svelte";
    import type { Icon } from "$lib/icons/internal";
    import "@fontsource/plus-jakarta-sans/600.css";
    export let name: string;
    export let url: string;
    export let icon: Icon;

    const transform = (x: number, y: number) =>
        `rotate3d(${-y},${x},0,${-10 * Math.hypot(x, y)}deg)`;
</script>

<Follow3D {transform}>
    <a href="/docs/{url}.pdf" target="_blank">
        <div>
            <IconCMP {icon} />
        </div>
        <h3>{name}</h3>
    </a>
</Follow3D>

<style>
    a {
        background-color: var(--bg-1);
        width: 12rem;
        height: 12rem;
        border-radius: 1rem;
        padding: 1rem;
        padding-bottom: 0.8rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: inherit;
        text-decoration: none;
        --icon-clr: var(--accent-fig);
        --icon-size: 2.3rem;
    }
    h3 {
        font-weight: 600;
        font-size: 1.3rem;
    }
    div {
        margin-left: auto;
        /* outline: 1px solid red; */
    }
</style>
