<script lang="ts">
    import { browser } from "$app/environment";
    import { frameThrottle } from "$lib/timing";
    import FormatLine from "$lib/FormatLine.svelte";
    import { onMount } from "svelte";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    export let data: { question: string; answer: string }[];

    const elements: HTMLElement[] = [];
    let focused = 0;
    let lastScroll = 0;
    const storeContent =
        getContext<Writable<HTMLDivElement | null>>("page-container");
    let content: HTMLDivElement | null = null;

    $: content = $storeContent;

    const focusNearestFAQ = frameThrottle(() => {
        if (!content) return;
        const delta = content.scrollTop - lastScroll;
        lastScroll = content.scrollTop;
        const newFocused =
            delta > 0 ? nearestAfter(focused) : nearestBefore(focused);
        if (focused != newFocused) {
            elements[focused]?.classList.remove("focus");
            focused = newFocused;
            elements[focused]?.classList.add("focus");
        }
    });

    function nearestAfter(start: number = 0) {
        let i: number;
        let lastDistance = distanceFromCenterScreen(elements[start]);
        let currentDistance: number;
        const len = elements.length;
        for (i = start + 1; i < len; i++) {
            currentDistance = distanceFromCenterScreen(elements[i]);
            if (currentDistance > lastDistance) break;
            lastDistance = currentDistance;
        }
        return i - 1;
    }

    function nearestBefore(end: number = elements.length - 1) {
        let i: number;
        let lastDistance = distanceFromCenterScreen(elements[end]);
        let currentDistance: number;
        for (i = end - 1; i >= 0; i--) {
            currentDistance = distanceFromCenterScreen(elements[i]);
            if (currentDistance > lastDistance) break;
            lastDistance = currentDistance;
        }
        return i + 1;
    }

    function distanceFromCenterScreen(el: HTMLElement) {
        if (!el || !content) return 0;
        return Math.abs(
            el.offsetTop +
                el.offsetHeight / 2 -
                content.scrollTop -
                (content.clientHeight * 4) / 9
        );
    }

    function bringIntoView(this: HTMLElement) {
        if (!content) return;
        const rect = this.getBoundingClientRect();
        content.scrollBy({
            left: 0,
            top: rect.top - content.clientHeight / 2 + this.clientHeight / 2,
            behavior: "smooth",
        });
    }

    function observe(node: HTMLElement) {
        const obs = new IntersectionObserver(entries =>
            entries.forEach(entry => {
                if (entry.isIntersecting)
                    content?.addEventListener("scroll", focusNearestFAQ);
                else content?.removeEventListener("scroll", focusNearestFAQ);
            })
        );
        obs.observe(node);
        return {
            destroy() {
                obs.unobserve(node);
            },
        };
    }

    onMount(() => {
        focused = nearestAfter(0);
        elements[focused]?.classList.add("focus");
    });
</script>

<div class="container" bind:this={content} use:observe>
    {#each data as faq, i}
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <article
            bind:this={elements[i]}
            on:click={bringIntoView}
            on:keyup={() => {}}
        >
            <h3><FormatLine text={faq.question} /></h3>
            <div class="answer">
                {#each faq.answer.split("\n") as par}
                    <p><FormatLine text={par} /></p>
                {/each}
            </div>
        </article>
    {/each}
</div>

<style>
    article {
        opacity: 0.4;
        transition: opacity 0.1s ease;
        margin: clamp(3.5rem, 12vh, 12rem) 0;
        cursor: pointer;
    }
    article:global(.focus) {
        opacity: 1;
        cursor: auto;
    }
    p {
        --em-fw: 500;
    }
    p + p {
        margin-top: 0.7rem;
    }

    h3 {
        margin-bottom: 1rem;
    }
    @media (min-width: 50rem) {
        article {
            display: flex;
            align-items: center;
        }
        h3 {
            width: 35%;
            text-align: right;
            margin-bottom: 0;
        }
        .answer {
            margin-left: 10%;
            width: 55%;
        }
    }
</style>
