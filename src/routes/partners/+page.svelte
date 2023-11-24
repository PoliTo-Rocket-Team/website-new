<script>
    // @ts-nocheck
    // no check to make partners img type compatible
    import Sponsor from "./Sponsor.svelte";
    import partners from "./partners.json";
    import Masonry from "$lib/Masonry.svelte";
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
        <Masonry data={partners} let:name let:link let:img let:texts>
            <Sponsor {name} {link} {img}>
                {#each texts as text}
                    <p>{text}</p>
                {/each}
            </Sponsor>
        </Masonry>
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
</style>
