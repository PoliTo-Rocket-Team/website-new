<script lang="ts">
    import "@fontsource/anonymous-pro/400.css";
    import { Display } from "$lib/components/position";
    import type { PageData } from "./$types";
    import FAQs from "./FAQs.svelte";

    export let data: PageData;
</script>

<svelte:head>
    <title>Apply - PoliTo Rocket Team</title>
    <meta
        name="description"
        content="Get Involved! PoliTo Rocket Team has numerous positions available for undergraduate and graduate students of Politecnico di Torino"
    />
</svelte:head>

<main>
    <h1>Apply</h1>
    <div class="stop-growth">
        <hr class="subtle" />
        <p>
            Get Involved! PoliTo Rocket Team has numerous positions available
            for undergraduate and graduate students of Politecnico di Torino.
            Here you can find our Open Positions and some Frequently Asked
            Questions about our recruitment process or about the Team. If you
            still have some questions, don’t hesitate to reach out to us on
            social media or at <a 
            data-umami-event="Recruitment email link on apply page"
            href="mailto:recruitment@politorocketteam.it"
                >recruitment@politorocketteam.it</a
            >
        </p>
    </div>
    {#if data.positions && data.positions.length}
        <section aria-labelledby="positions" class="positions">
            <h2 id="positions">Open positions</h2>
            <div class="position-labels on-lg" aria-hidden="true">
                <span>Role</span>
                <span>Subteam</span>
                <span>Division</span>
                <div class="code-label"><span>Code</span></div>
            </div>
            {#each data.positions as pos}
                <Display {...pos} />
            {/each}
        </section>
    {/if}
    <section aria-labelledby="faqs">
        <h2 id="faqs" class="section-title">
            <abbr title="Frequently Asked Questions">FAQs</abbr>
        </h2>
        <FAQs data={data.faqs} />
    </section>
</main>

<style lang="scss">
    @use "$lib/components/apply-page/consts.scss" as *;

    section {
        max-width: 75ch;
        margin-left: auto;
        margin-right: auto;
    }

    .code-label {
        font-family: "Anonymous Pro", monospace;
        width: 11ch;
        max-width: 11ch;
        min-width: 11ch;
    }

    $text-margin: 0.5rem;
    @media (min-width: 50rem) {
        .stop-growth {
            min-width: 90ch;
        }
        h2 {
            text-align: center;
        }
        .position-labels {
            padding: $details-pad-y $details-pad-x;
            display: grid;
            grid-template-columns: $details-columns;
            grid-auto-flow: dense;
            align-items: center;
            column-gap: $gap;
        }
    }
</style>
