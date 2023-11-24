<script context="module" lang="ts">
    const opts = { stiffness: 0.15, damping: 0.8, precision: 0.001 };
    const transform = (x: number, y: number) =>
        `translate(${-x * 2.5}%,${-y * 2.5}%) rotate3d(${-y},${x},0,${
            -3 * Math.hypot(x, y)
        }deg)`;
</script>

<script lang="ts">
    import Follow3D from "$lib/Follow3D.svelte";

    interface SponsorImage {
        url: string;
        padding: number;
        background: null | "dark" | "light";
    }

    export let name: string;
    export let link: string;
    export let img: string | SponsorImage;
    let si: SponsorImage;
    $: si =
        typeof img === "object"
            ? img
            : { url: img, padding: 0, background: null };
</script>

<Follow3D options={opts} {transform}>
    <article>
        <img
            src="img/sponsors/{si.url}"
            alt="{name} logo"
            data-bg={si.background}
            style="padding: {si.padding}px;"
        />
        <div class="body">
            <h3><a href={link} target="_blank" rel="noreferrer">{name}</a></h3>
            <slot />
        </div>
    </article>
</Follow3D>

<style lang="scss">
    $card-padding: 1.2rem;
    $arrow-w: 1.8ch;

    img {
        display: block;
        max-height: 7rem;
        width: auto;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: $card-padding;
    }
    img[data-bg="light"] {
        background-color: var(--light-bg-1);
        border-radius: 0.6em;
    }
    img[data-bg="dark"] {
        background-color: var(--dark-bg-1);
        border-radius: 0.6em;
    }
    h3 {
        font-size: var(--fs-60);
        margin-bottom: 0.2rem;
    }
    a {
        text-decoration: none;
        display: inline-block;
        padding-right: $arrow-w;
        // color: var(--accent-30);

        &::after {
            content: "\00A0\279C";
            opacity: 0.5;
            display: inline-block;
            position: relative;
            width: $arrow-w;
            padding-left: $arrow-w;
            margin-left: -1 * $arrow-w;
            transition:
                transform 150ms ease-out,
                opacity 150ms ease-out;
        }
        &:hover::after {
            transform: translateX(0.4ch);
            opacity: 1;
        }
    }

    @media (min-width: 50rem) {
        article {
            display: block;
            transform-origin: center center;
            transform-style: preserve-3d;
            background-color: var(--bg-1);
            border-radius: $card-padding * 0.75;
            padding: $card-padding;
            margin-top: 0;
        }
    }
</style>
