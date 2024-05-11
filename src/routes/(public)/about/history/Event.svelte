<script lang="ts">
    import { frameThrottle } from "$lib/timing";
    import Cavour from "/src/img/cavour/test/8.jpg";

    export let data: any[];

    const articles: HTMLElement[] = new Array(data.length);
    let centeredEventIndex = 0;

    const nearestImg = frameThrottle(() => {
        if (!data?.length) return;
        const viewportCenterY = window.innerHeight / 2;

        centeredEventIndex = -1; // Reset centered event index

        data.forEach((event, i) => {
            const eventElement = articles[i];
            if (eventElement) {
                const titleElement = eventElement.querySelector("h3");
                if (titleElement) {
                    const titleRect = titleElement.getBoundingClientRect();
                    const titleCenterY = titleRect.top + titleRect.height / 2;

                    if (
                        Math.abs(titleCenterY - viewportCenterY) <
                        window.innerHeight / 4
                    ) {
                        centeredEventIndex = i;
                    }
                }
            }
        });
    });
</script>

<svelte:window on:scroll={nearestImg} />

<div class="events">
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
