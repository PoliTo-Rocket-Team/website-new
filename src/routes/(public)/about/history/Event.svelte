<script lang="ts">
    import { browser } from "$app/environment";
    import { frameThrottle } from "$lib/timing";
    import { onMount } from "svelte";
    const images: HTMLElement[] = [];
    let lastScroll = browser ? window.scrollY : 0;
    let visible = 0;
    export let data: any[];

    const nearestImg = frameThrottle(() => {
        const delta = window.scrollY - lastScroll;
        lastScroll = window.scrollY;
        const newvisible =
            delta > 0 ? nearestAfter(visible) : nearestBefore(visible);
        if (visible != newvisible) {
            images[visible].classList.remove("visible");
            visible = newvisible;
            images[visible].classList.add("visible");
        }
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

    function observe(node: HTMLElement) {
        const obs = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting)
                        window.addEventListener("scroll", nearestImg);
                    else window.removeEventListener("scroll", nearestImg);
                });
            },
            {
                rootMargin: "20% 0% 20% 0%",
            }
        );
        obs.observe(node);
        return {
            destroy() {
                obs.unobserve(node);
            },
        };
    }

    onMount(() => {
        visible = nearestAfter(0);
        images[visible].classList.add("visible");
    });
</script>

<div use:observe>
    {#each data as image, i}
        <h3>{image.date}</h3>
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <article bind:this={images[i]} on:keyup={() => {}}>
            <div class="cover">
                <div class="img-wrapper">
                    <img src={image.imageSrc} alt={image.title} />
                    <div class="text">
                        <p>{@html image.description}</p>
                    </div>
                </div>
            </div>
        </article>
    {/each}
</div>

<style>
    article {
        display: none;
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
    }

    article:global(.visible) {
        display: block;
        opacity: 1;
        cursor: auto;
    }

    h3 {
        text-align: center;
        margin-bottom: 1rem;
    }

    .cover {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
        z-index: 1;
    }

    .img-wrapper {
        width: 18rem;
        place-self: center;
        position: relative;
        isolation: isolate;
    }

    img {
        width: 100%;
        z-index: 2;
    }

    .text {
        z-index: 10;
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

    .img-wrapper:hover img {
        opacity: 0.4;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    .img-wrapper:hover .text,
    .img-wrapper:active .text,
    .img-wrapper:focus-within .text {
        opacity: 1;
        transform: translateY(0);
        transition:
            transform 0.15s ease-out,
            opacity 0.15s ease-in;
    }

    p {
        margin-bottom: 0.5rem;
    }

    p + p {
        margin-top: 0.7rem;
    }

    @media (max-width: 50rem) {
        article {
            display: block;
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
        }

        .img-wrapper:hover img {
            opacity: 1;
            position: static;
            object-fit: cover;
            z-index: 1;
        }
    }

    .img-wrapper:hover .text,
    .img-wrapper:active .text,
    .img-wrapper:focus-within .text {
        opacity: 1;
        transform: translateY(0);
        transition:
            transform 0.15s ease-out,
            opacity 0.15s ease-in;
    }

    p {
        margin-bottom: 0.5rem;
    }

    p + p {
        margin-top: 0.7rem;
    }
</style>
