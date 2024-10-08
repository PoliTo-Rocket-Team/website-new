<script lang="ts">
    import { browser } from "$app/environment";
    import { frameThrottle } from "$lib/timing";
    import Cavour from "/src/img/cavour/test/8.jpg";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";

    export let data: any[];

    const articles: HTMLElement[] = new Array(data.length);
    let centeredEventIndex = 0;
    let lastScroll = browser ? window.scrollY : 0;

    const storeContent =
        getContext<Writable<HTMLDivElement | null>>("page-container");
    let content: HTMLDivElement | null = null;

    $: content = $storeContent;

    const nearestArticle = frameThrottle(() => {
        if (!content) return;
        const delta = content?.scrollTop - lastScroll;
        lastScroll = content.scrollTop;
        const newFocused =
            delta > 0
                ? nearestAfter(centeredEventIndex)
                : nearestBefore(centeredEventIndex);
        if (centeredEventIndex != newFocused) {
            articles[centeredEventIndex].classList.remove("focus");
            centeredEventIndex = newFocused;
            articles[centeredEventIndex].classList.add("focus");
        }
    });

    function nearestAfter(start: number = 0) {
        let i: number;
        let lastDistance = distanceFromCenterScreen(articles[start]);
        let currentDistance: number;
        const len = articles.length;
        for (i = start + 1; i < len; i++) {
            currentDistance = distanceFromCenterScreen(articles[i]);
            if (currentDistance > lastDistance) break;
            lastDistance = currentDistance;
        }
        return i - 1;
    }

    function nearestBefore(end: number = articles.length - 1) {
        let i: number;
        let lastDistance = distanceFromCenterScreen(articles[end]);
        let currentDistance: number;
        for (i = end - 1; i >= 0; i--) {
            currentDistance = distanceFromCenterScreen(articles[i]);
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

    function observe(node: HTMLElement) {
        const obs = new IntersectionObserver(entries =>
            entries.forEach(entry => {
                if (entry.isIntersecting)
                    content?.addEventListener("scroll", nearestArticle);
                else content?.removeEventListener("scroll", nearestArticle);
            })
        );
        obs.observe(node);
        return {
            destroy() {
                obs.unobserve(node);
            },
        };
    }
</script>

<svelte:window on:scroll={nearestArticle} />

<div class="events" bind:this={content} use:observe>
    {#each data as event, i}
        <article
            bind:this={articles[i]}
            class:selected={centeredEventIndex === i}
        >
            <h3>{event.date}</h3>
            <div class="image">
                <img src={Cavour} alt={event.title} />
                <p>{@html event.description}</p>
            </div>
        </article>
    {/each}
</div>

<style>
    h3 {
        text-align: center;
        margin-bottom: 1rem;
    }

    article {
        display: flex;
        flex-direction: column;
        opacity: 0.4;
        transition: opacity 0.1s ease;
        margin-bottom: 5rem;
        cursor: pointer;
        position: relative;
        z-index: 0;
        height: 60vh;
        padding: 2rem;
        overflow-y: hidden;
        width: 100%;
        height: auto;
    }

    article:global(.selected) {
        opacity: 1;
        cursor: auto;
    }

    @media (min-width: 51rem) {
        article.selected .image {
            height: 30vh;
        }
        article.selected .image img {
            clip-path: inset(0);
            transform: scale(1);
        }

        img {
            width: 100%;
            display: block;
            margin: 0 auto;
            clip-path: inset(50% 0);
            transform: scale(0.3);
        }
        .image {
            height: 0;
            width: 18rem;
            place-self: center;
            position: relative;
            isolation: isolate;
            overflow: hidden;
        }
        .image img {
            transition: height 0.3s ease;
        }

        .image:hover img {
            opacity: 0.4;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
        }

        .image:hover p {
            opacity: 1;
            transform: translateY(0);
            transition:
                transform 0.15s ease-out,
                opacity 0.15s ease-in;
            z-index: 1;
        }

        p {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 1rem;
            opacity: 0;
            transform: translateY(-1rem);
            transition:
                transform 0.15s ease-out,
                opacity 0.15s ease-out;
        }
    }

    @media (max-width: 50rem) {
        img {
            width: 100%;
            display: block;
            margin: 0 auto;
        }
        .image {
            height: auto;
            width: 18rem;
            place-self: center;
            position: relative;
            isolation: isolate;
        }
        p {
            opacity: 1;
            margin-top: 1rem;
            position: static;
        }
    }
</style>
