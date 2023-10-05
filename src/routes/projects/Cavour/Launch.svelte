<script context="module">
    const formatter = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric" });
</script>

<script lang="ts">
    import Carousel from "./Carousel.svelte";
    
    export let name: string;
    export let date: string;
    export let images: string[];
    
    // import type { MiddleScreenPool } from "$lib/visibility";
    // export let pool: MiddleScreenPool;
    // function track(node: HTMLElement) {pool.add(node);}
</script>

<article>
    <div class="title">
        <div>
            <h3>{name}</h3>
            <span>{formatter.format(Date.parse(date))}</span>
        </div>
    </div>
    <div class="desc">
        <slot />
    </div>
    <div class="carousel">
        <Carousel {images} />
    </div>
</article>

<style>
    h3 {
        font-size: 2rem;
    }
    span {
        color: var(--accent-text);
        font-size: 1.3rem;
        font-weight: 500;
    }
    article {
        margin-top: 6rem;
        margin-bottom: 12rem;
        display: grid;
    }
    @media (max-width: 50rem) {
        article {
            grid-template-columns: 100%;
        }
        .carousel {
            grid-row: 2;
        }
        .desc {
            grid-row: 3;
        }
    }
    @media (min-width: 50rem) {
        article {
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 3ch;
        }
        .carousel {
            grid-column: 1/3;
        }
        /* article:global(:not(.focus)) {
            opacity: 0.6;
        } */
        /* .sticky-center {
            position: sticky;
            top: 50vh;
            transform: translateY(-50%);
        } */
    }
</style>
