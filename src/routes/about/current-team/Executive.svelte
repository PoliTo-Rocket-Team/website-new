<script lang="ts">
    import { trackmouse } from "$lib/trackmouse";
    import { spring } from "svelte/motion";
    import Icon from "$lib/icons/Icon.svelte";

    export let name: string;
    export let role: string;
    export let mail: string;
    export let linkedin: string;
    export let img: string;

    const x = spring(0);
    const y = spring(0);
    function leave() {
        x.set(0);
        y.set(0);
    }
    function move(_x: number, _y: number, rect: DOMRect) {
        x.set(2*_x/rect.width - 1);
        y.set(2*_y/rect.height - 1);
    }
</script>

<li>
    <div class="container" style="--x: {$x}; --y: {$y};" use:trackmouse={{move, leave}}>
        <img src="/members/{img}" alt="{name} nicely dressed">
        <div class="body">
            <div class="text">
                <h3>{name}</h3>
                <span class="role">{role}</span>
                <slot />
            </div>
            <div class="contacts">
                <a href="https://www.linkedin.com/in/{linkedin}" target="_blank" rel="noreferrer"><Icon icon="LinkedIn" /><span>LinkedIn</span></a>
                <a href="mailto:{mail}" target="_blank" rel="noreferrer"><Icon icon="Email" /><span>Email</span></a>
            </div>
        </div>
    </div>
</li>

<style>
    .container {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        background-color: var(--bg-1);
        border-radius: .6rem;
        overflow: hidden;
    }
    img {
        max-width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
    }
    .body {
        padding: 1rem;
    }
    h3 {
        font-size: var(--fs-65);
    }
    .role {
        font-size: var(--fs-50);
        font-weight: 600;
        color: var(--accent-text);
    }
    .contacts {
        margin-top: .7rem;
        list-style: none;
        --icon-clr: var(--fg-1);
        --icon-size: 2.2rem;
    }
    .contacts span {
        margin-left: .2ch;
    }
    a {
        display: flex;
        align-items: center;
        width: fit-content;
    }
    a:hover {
        --icon-clr: var(--accent-fig)
    }
    a:hover > :global(svg) {
        animation: shake .25s ease;
    }

    @media (min-width: 30rem) {
        li {
            perspective: 35rem;
        }
        .container {
            transform-origin: center;
            transform-style: preserve-3d;
        }
    }

    @media (min-width: 30rem) and (max-width: 70rem) {
        img { width: 40%; }
        .body { width: 60%; }
        .container {
            flex-direction: row;
            transform: 
                translateX(calc(var(--x) * 0.5rem))
                translateY(calc(var(--y) * 0.5rem))
                rotateY(calc(var(--x) * -1deg))
                rotateX(calc(var(--y) * 2deg));
        }
    }
    @media (min-width: 70rem) {
        .body {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .text {
            margin-bottom: 1.5rem;
        }
        .container {
            transform: 
                translateX(calc(var(--x) * 0.5rem))
                translateY(calc(var(--y) * 0.5rem))
                rotateY(calc(var(--x) * -2deg))
                rotateX(calc(var(--y) * 1deg));
        }
    }
</style>