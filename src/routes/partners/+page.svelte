<script>
    // @ts-nocheck
    // no check to make partners img type compatible

    import Partner from "./Partner.svelte";
    import partners from "./partners.json";

    let mainPartners = partners.filter(p => p.texts !== null);
    let mediaPartners = partners.filter(p => p.texts === null);
</script>

<svelte:head>
    <title>Partners - PoliTo Rocket Team</title>
    <meta
        name="description"
        content="Meet the partners which allow us to keep working on our projects"
    />
</svelte:head>

<main>
    <h1>Partners</h1>
    <div class="stop-growth">
        <hr class="subtle" />
        <p>
            Building rockets does not come easy. If you wish to become our
            partner with financial, technical, or material support, or with any
            other service provision, contact us at <a
                href="mailto:info@politorocketteam.it"
                >info@politorocketteam.it</a
            >
        </p>
    </div>
    <section aria-labelledby="main-partners">
        <h2 id="main-partners">Main partners</h2>
        <div class="grid">
            {#each mainPartners as p}
                <Partner {...p} />
            {/each}
        </div>
    </section>
    <section aria-labelledby="media-partners">
        <h2 id="media-partners">Media partners</h2>
        <div class="grid">
            {#each mediaPartners as p}
                <Partner {...p} />
            {/each}
        </div>
    </section>
</main>

<style>
    p {
        margin-top: 0.8em;
        text-align: justify;
    }
    section {
        --masonry-cols: repeat(auto-fill, minmax(30ch, 1fr));
        --masonry-gap: 2rem;
    }
    .grid {
        display: grid;
        gap: 2rem;
        grid-template-columns: 1fr;
        --partner-height: 28rem;
    }
    @media (min-width: 50rem) {
        .grid {
            grid-template-columns: repeat(auto-fill, 30ch);
        }
    }
</style>
