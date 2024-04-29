<script lang="ts">
    import { browser } from "$app/environment";
    import { frameThrottle } from "$lib/timing";
    import { onMount } from "svelte";
    import Cavour from "/src/img/cavour/test/8.jpg";

    const images: HTMLElement[] = [];
    let lastScroll = browser ? window.scrollY : 0;
    let visible = 0;
    export let data: any[];

    const nearestImg = frameThrottle(() => {
        const viewportCenterY = window.innerHeight / 2;

        data.forEach((event, i) => {
            let titleRect = null;
            let titleCenterY = null;
            const eventElement = images[i];
            const titleElement = eventElement.querySelector("h3"); 
            if (titleElement) {
                titleRect = titleElement.getBoundingClientRect();
                titleCenterY = titleRect.top + titleRect.height / 2;
            }

         
            if (titleCenterY)
                if (
                    Math.abs(titleCenterY - viewportCenterY) <
                    window.innerHeight / 4
                ) {
                    
                    if (!images[i].classList.contains("visible")) {
                        images.forEach(image =>
                            image.classList.remove("visible")
                        );
                        images[i].classList.add("visible");
                    }
                }
        });
    });

    function nearestAfter(start: number = 0) {
        let i: number;
        let lastDistance = distanceFromCenterScreen(images[start]);
        let currentDistance: number;
        const len = images.length;
        for (i = start + 1; i < len; i++) {
            currentDistance = distanceFromCenterScreen(images[i]);
            if (currentDistance > lastDistance) break;
            lastDistance = currentDistance;
        }
        return i - 1;
    }

    function nearestBefore(end: number = images.length - 1) {
        let i: number;
        let lastDistance = distanceFromCenterScreen(images[end]);
        let currentDistance: number;
        for (i = end - 1; i >= 0; i--) {
            currentDistance = distanceFromCenterScreen(images[i]);
            if (currentDistance > lastDistance) break;
            lastDistance = currentDistance;
        }
        return i + 1;
    }

    function distanceFromCenterScreen(el: HTMLElement) {
        return Math.abs(
            el.offsetTop +
                el.offsetHeight / 2 -
                window.scrollY -
                (window.innerHeight * 4) / 9
        );
    }

    

    onMount(() => {
        visible = nearestAfter(0);
        images[visible].classList.add("visible");
        nearestImg();
        window.addEventListener("scroll", nearestImg);
    });
</script>

<div class="events">
    {#each data as event, i}
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <article bind:this={images[i]} on:keyup={() => {}}>
            <h3>{event.date}</h3>
            <div class="image">
                <img src={Cavour} alt={event.title} />
                <p>{@html event.description}</p>
            </div>
        </article>
    {/each}
</div>

<style>
    
    @media (min-width: 51rem) {
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
            padding: 1rem;
            overflow-y: hidden;
            width: 100%;
            align-self: center;
        }

        article:global(.visible) {
            opacity: 1;
            cursor: auto;
        }

        h3 {
            text-align: center;
            margin-bottom: 2rem;
        }

        .image {
            visibility: hidden;
            width: 18rem;
            place-self: center;
            position: relative;
            isolation: isolate;
        }

        .image:global(.visible) {
            visibility: visible;
            cursor: auto;
            z-index: 20;
        }

        img {
            width: 100%;
            display: block;
            margin: 0 auto;
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
        h3 {
            text-align: center;
            margin-bottom: 1rem;
        }

        .image {
            width: 18rem;
            place-self: center;
            position: relative;
            isolation: isolate;
        }

        img {
            width: 100%;
            display: block;
            margin: 0 auto;
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
            padding: 1rem;
            overflow-y: hidden;
            width: 100%;
            height: auto;
        }

        article:global(.visible) {
            opacity: 1;
            cursor: auto;
        }

        p {
            opacity: 1;
            margin-top: 1rem;
            position: static;
        }

        p + p {
            margin-top: 0.7rem;
        }
    }
</style>
