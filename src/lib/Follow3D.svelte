<script lang="ts">
    import { spring } from "svelte/motion";

    let x: number;
    let y: number;
    let req: number|null = null;
    let element: HTMLElement;

    interface SpringOpt {
        damping?: number;
        precision?: number;
        stiffness?: number;
    }
    export let options: SpringOpt | undefined = undefined;
    export let tranform: (x: number, y: number) => string;
    export let perspective: string|null = null;

    const xs = spring(0, options);
    const ys = spring(0, options);

    function enter(this: HTMLElement) {
        req = null;
        this.addEventListener("mousemove", mousemove);
        this.addEventListener("mouseleave", leave, { once: true });
    }
    function signal() {
        const rect = element.getBoundingClientRect();
        const _x = x - rect.left - window.scrollX;
        const _y = y - rect.top - window.scrollY;
        xs.set(2*_x/rect.width -1);
        ys.set(2*_y/rect.height -1);
        req = null;
    }
    function mousemove(ev: MouseEvent) {
        x = ev.pageX;
        y = ev.pageY;
        if(req == null) req = requestAnimationFrame(signal);
    }
    function leave(this: HTMLElement) {
        this.removeEventListener("mousemove", mousemove);
        if(req != null) cancelAnimationFrame(req);
        xs.set(0);
        ys.set(0);
    }
</script>

<div class="outer" on:mouseenter={enter} bind:this={element} style:--perspective={perspective}>
    <div class="inner" style="transform: {tranform($xs,$ys)};">
        <slot />
    </div>
</div>

<style>
    .outer {
        perspective: var(--perspective, 30rem);
    }
    .inner {
        transform-origin: center;
        transform-style: preserve-3d;
    }
</style>