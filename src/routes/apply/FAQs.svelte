<script lang="ts">
    import { browser } from "$app/environment";
    import { frameThrottle } from "$lib/timing";
    import FormatLine from "$lib/FormatLine.svelte";

    import faqs from "./FAQs.json";
    import { onMount } from "svelte";

    const elements: HTMLElement[] = [];
    let lastScroll = browser ? window.scrollY : 0;
    let focused = 0;

    const focusNearestFAQ = frameThrottle(() => {
        const delta = window.scrollY - lastScroll;
        lastScroll = window.scrollY;
        const newFocused = delta > 0 ? nearestAfter(focused) : nearestBefore(focused);
        if(focused != newFocused) {
            elements[focused].classList.remove("focus");
            focused = newFocused;
            elements[focused].classList.add("focus");
        }
    })

    function nearestAfter(start: number = 0) {
        let i: number;
        let lastDistance = distanceFromCenterScreen(elements[start]);
        let currentDistance: number;
        const len = elements.length;
        for(i = start+1; i<len; i++) {
            currentDistance = distanceFromCenterScreen(elements[i]);
            if(currentDistance > lastDistance) break;
            lastDistance = currentDistance;
        }
        return i-1;
    }

    function nearestBefore(end: number = elements.length-1) {
        let i: number;
        let lastDistance = distanceFromCenterScreen(elements[end]);
        let currentDistance: number;
        for(i = end-1; i >= 0; i--) {
            currentDistance = distanceFromCenterScreen(elements[i]);
            if(currentDistance > lastDistance) break;
            lastDistance = currentDistance;
        }
        return i+1;
    }

    function distanceFromCenterScreen(el: HTMLElement) {
        return Math.abs(el.offsetTop + el.offsetHeight/2 - window.scrollY - window.innerHeight*4/9); 
    }

    function bringIntoView(this: HTMLElement) {
        const rect = this.getBoundingClientRect();
        window.scrollBy({ left: 0, top: rect.top - window.innerHeight/2 + this.clientHeight/2, behavior: "smooth" });
    }

    function observe(node: HTMLElement) {
        const obs = new IntersectionObserver(entries => entries.forEach(entry => {
            if(entry.isIntersecting) window.addEventListener("scroll", focusNearestFAQ);
            else window.removeEventListener("scroll", focusNearestFAQ);
        }));
        obs.observe(node);
        return {
            destroy() {
                obs.unobserve(node);
            }
        }
    }
    onMount(() => {
        focused = nearestAfter(0);
        elements[focused].classList.add("focus");
    });
</script>


<div class="container" use:observe>
    {#each faqs as faq, i}
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <article bind:this={elements[i]} on:click={bringIntoView} on:keyup={() => {}}>
            <h3><FormatLine text={faq.question} /></h3>
            <div class="answer">
                {#each faq.answer.split('\n') as par}
                    <p><FormatLine text={par} /></p>
                {/each}
            </div>
        </article>
    {/each}
</div>

<style>
    article {
        opacity: 0.4;
        transition: opacity .1s ease;
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
        margin-top: .7rem;
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