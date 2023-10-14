<script lang="ts">
    import "./consts.scss";
    import "@fontsource/anonymous-pro/400.css";
    import Position from "./Position.svelte";
    import type { PageData } from "./$types";
    import FAQs from "./FAQs.svelte";

    import positions from "./data.json";
    export let data: PageData
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
            social media or at <a href="mailto:recruitment@politorocketteam.it"
                >recruitment@politorocketteam.it</a
            >
        </p>
    </div>
    <section aria-labelledby="positions" class="positions">
        <h2 id="positions">Open positions</h2>
        <div class="position-labels on-lg" aria-hidden="true">
            <span>Role</span>
            <span>Subteam</span>
            <span>Division</span>
            <div class="code-label"><span>Code</span></div>
        </div>
        {#each positions as pos}
            <Position
                role={pos.name}
                subteam={pos.subteam}
                division={pos.division}
                code={pos.code}
            >
                <h4>Description</h4>
                {#if Array.isArray(pos.description)}
                    {#each pos.description as paragraph}
                        {#if Array.isArray(paragraph)}
                            <ul>
                                {#each paragraph as item}
                                    <li>{item}</li>
                                {/each}
                            </ul>
                        {:else}
                            <p>{paragraph}</p>
                        {/if}
                    {/each}
                {:else}
                    <p>{pos.description}</p>
                {/if}
                {#if pos.required}
                    <h4>Required skills</h4>
                    <ul>
                        {#each pos.required as item}
                            <li>{item}</li>
                        {/each}
                    </ul>
                {/if}
                {#if pos.desirable}
                    <h4>Desirable skills</h4>
                    <ul>
                        {#each pos.desirable as item}
                            <li>{item}</li>
                        {/each}
                    </ul>
                {/if}
                <a
                    class="btn"
                    href="https://forms.gle/{pos.form}"
                    target="_blank"
                    rel="noreferrer">Apply</a
                >
            </Position>
        {/each}
    </section>
    <section aria-labelledby="faqs">
        <h2 id="faqs" class="section-title"><abbr title="Frequently Asked Questions">FAQs</abbr></h2>
        <FAQs data={data.faqs} />
    </section>
</main>

<style lang="scss">
    @use "./consts.scss" as *;

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
    .positions {
        h4:not(:first-child) {
            margin-top: 3 * $text-margin;
        }
        h4 {
            margin-bottom: $text-margin;
        }
        p + ul {
            margin-top: 0.5 * $text-margin;
        }
        ul + p,
        p + p {
            margin-top: $text-margin;
        }
        ul {
            padding-left: 2ch;
        }
    }
    .btn {
        display: block;
        padding: 0.4em 0.7em;
        border: 2px solid var(--accent-fig);
        width: fit-content;
        text-decoration: none;
        font-weight: 600;
        margin: 2rem auto;
    }
    .btn:focus {
        text-decoration: underline;
    }
    @media (min-width: 50rem) {
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
