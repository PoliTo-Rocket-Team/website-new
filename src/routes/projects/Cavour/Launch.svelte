<script context="module">
    const formatter = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric" });
</script>

<script lang="ts">
    import type { MiddleScreenPool } from "$lib/visibility";
    export let name: string;
    export let date: string;
    export let pool: MiddleScreenPool;

    function addPadding(node: HTMLElement) {
        const c = node.children.item(0)!;
        node.style.paddingTop = c.clientHeight*0.5 + "px"
    }
    function track(node: HTMLElement) {pool.add(node);}
</script>

<article use:track>
    <div use:addPadding>
        <div class="sticky-center">
            <h3>{name}</h3>
            <span>{formatter.format(new Date(date))}</span>
        </div>
    </div>
    <div class="right">
        <slot />
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
        margin-bottom: 8rem;
    }
    @media (min-width: 50rem) {
        article {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3ch;
        }
        .sticky-center {
            position: sticky;
            top: 50vh;
            transform: translateY(-50%);
        }
        article:global(:not(.focus)) {
            opacity: 0.6;
        }
    }
</style>
