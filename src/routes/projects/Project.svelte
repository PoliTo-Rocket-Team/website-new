<script lang="ts">
    import { spring } from "svelte/motion";
    import { trackmouse } from "$lib/trackmouse";

    export let href: string;
    export let name: string;
    export let desc: string;

    const opts = { stiffness: 0.15, damping: 0.8, precision: 0.001 };
    const x = spring(0, opts);
    const y = spring(0, opts);

    function leave() {
        x.set(0);
        y.set(0);
    }
    function move(_x: number, _y: number, rect: DOMRect) {
        x.set(2*_x/rect.width - 1);
        y.set(2*_y/rect.height - 1);
    }
    $: angle = 5*Math.hypot($x,$y);
</script>

<div class="perspective">
    <article style="transform: rotate3d({$y},{-$x},0,{angle}deg);" use:trackmouse={{move, leave}}>
        <div class="clip">
            <div class="anti" style="transform: rotate3d({$y},{-$x},0,{-angle}deg);">
                <slot />
            </div>
        </div>
        <a {href}>
            <h2>{name}</h2>
            <p>{desc}</p>
        </a>
    </article>
</div>

<style>
    .perspective {
        perspective: 500px;
    }
    article {
        position: relative;
        outline: 2px solid #8883;
        aspect-ratio: 1/1;
        border-radius: 1rem;
        transform-style: preserve-3d;
    }
    .clip, .anti {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    .clip {
        overflow: hidden;
        perspective: 400px;
    }
    .anti {
        transform-style: preserve-3d;
    }
    a {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transform-style: preserve-3d;
    }
    a h2 {
        font-size: 3rem;
    }
    p {
        color: var(--fg-0);
        opacity: 0.9;
    }
    h2, p {
        transition: transform .25s ease;
        transform: translateZ(0px);
        text-shadow: 0 0 5px var(--bg-0);
    }
    article:hover h2 {
        transform: translateZ(70px);
    }
    article:hover p {
        transform: translateZ(40px);
    }
</style>