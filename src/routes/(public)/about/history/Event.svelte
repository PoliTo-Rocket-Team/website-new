<script lang="ts">
    import { browser } from "$app/environment";
    import { frameThrottle } from "$lib/timing";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import {
        Timeline,
        TimelineItem,
        TimelineSeparator,
        TimelineDot,
        TimelineConnector,
        TimelineContent,
        TimelineOppositeContent,
    } from "svelte-vertical-timeline";

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
                content.clientHeight * 0.5
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

<div class="timeline-container" bind:this={content} use:observe>
    <Timeline position="alternate">
        {#each data as event, i}
            <article
                bind:this={articles[i]}
                class:selected={centeredEventIndex === i}
            >
                <TimelineItem>
                    <TimelineContent>
                        <div class="sideContent">
                            <h2>{event.title}</h2>
                            <time>{event.date}</time>
                            <div class="description"></div>
                            {#each event.previousLeads as lead}
                                <h6 class="lead">{lead}</h6>
                            {/each}
                        </div>
                    </TimelineContent>

                    <TimelineSeparator style="height: 30rem;">
                        <TimelineDot
                            style="background-color: hsl(19, 85%, 55%); height: 1rem; width: 1rem; border: solid 2px hsl(19, 85%, 55%);"
                        />
                        <TimelineConnector />
                    </TimelineSeparator>

                    <TimelineContent>
                        <div class="image">
                            <img
                                src={`/img/history_page/${event.imageSrc}`}
                                alt={event.title}
                            />
                            <p>{@html event.description}</p>
                        </div>
                    </TimelineContent>
                </TimelineItem>
            </article>

            <div class="mobile">
                <h2>{event.title}</h2>
                <time>{event.date}</time>
                <div class="description"></div>

                <img
                    src={`/img/history_page/${event.imageSrc}`}
                    alt={event.title}
                />
                <p>{@html event.description}</p>
            </div>
        {/each}
    </Timeline>
</div>

<style>
    .sideContent {
        width: 30ch;
        text-align: right;
    }
    h2 {
        color: var(--primary-color);
        margin-bottom: 0;
    }
    .lead {
        font-style: italic;
        padding: 0.2rem;
        color: gray;
    }
    time {
        color: var(--accent-text);
        font-style: italic;
        margin-bottom: 1rem;
        display: block;
        font-weight: bold;
    }
    .timeline-container {
        display: flex;
        padding: 2rem;
        text-align: left;
        align-items: flex-start;
    }

    /* Large screens */
    @media (min-width: 768px) {
        .mobile {
            display: none;
        }
        article.selected .image {
            opacity: 1;
            height: 70vh;
        }
        article.selected .image img {
            clip-path: inset(0);
            transform: scale(
                1
            ); /*can't change because it's the size of the image*/
        }

        img {
            width: 100%;
            height: 70vh;
            display: block;
            margin: 0 auto;
            clip-path: inset(50% 0);
            object-fit: contain;
            position: absolute;
            pointer-events: none;
        }
        .image {
            height: 0;
            width: 40rem;
            place-self: center;
            position: relative;
            isolation: isolate;
            overflow: hidden;
            opacity: 0;
            transition: opacity 0.5s ease-out;
        }
        .image img {
            height: 70vh;
            transition:
                clip-path 0.5s ease,
                transform 0.5s ease,
                opacity 0.5s ease;
        }

        .image:hover img {
            opacity: 0.2;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
            filter: blur(3px);
            transition:
                opacity 1s ease-out,
                filter 1s ease-out,
                transform 1s ease-out;
        }

        .image:hover p {
            opacity: 1;
            transform: translateY(0);
            transition:
                transform 0.5s ease-out,
                opacity 0.5s ease-in;
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
        .timeline-container {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: flex-start;
        }

        .image img {
            width: 100%;
            object-fit: cover;
            clip-path: inset(50% 0);
            transition:
                transform 0.3s ease,
                opacity 0.3s ease;
        }
    }

    /* Small screens */
    @media (max-width: 767px) {
        .mobile {
            margin-bottom: 6rem;
        }
        article {
            padding-bottom: 5rem;
            display: none;
        }
        .lead {
            display: none;
        }

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
