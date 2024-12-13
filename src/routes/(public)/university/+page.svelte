<script>
    import "@fontsource/plus-jakarta-sans/400-italic.css";
</script>

<svelte:head>
    <title>Our university - PoliTo Rocket Team</title>
    <meta
        name="description"
        content="The university of the PoliTo Rocket Team"
    />
</svelte:head>

<main>
    <h1>Politecnico di Torino</h1>
    <hr class="subtle stop-growth" />
    <section aria-labelledby="events" class="sm-c">
        <div class="text-cols">
            <p>
                The <a href="https://www.polito.it/">Politecnico di Torino</a> is
                the first engineering school in Italy, founded in 1859 as the "Scuola
                di Applicazione per gli Ingegneri" (School of Application for Engineers).
                Over 160 years, it has evolved into one of Europe’s premier technical
                universities, recognized for its rigorous academic standards and
                excellence in the fields of engineering, architecture, design, and
                urban planning.
            </p>
            <p>
                The university is committed to fostering innovation and
                responding to global challenges such as climate change,
                population aging, and technological advancements. In this
                rapidly changing world, the Politecnico aims to remain a key
                driver of sustainable development and a platform for continuous
                education, open to both industries and professions. It is
                dedicated to building robust networks that connect education,
                research, and innovation, creating entrepreneurial hubs that
                attract large industries, SMEs, and startups, while also
                strengthening local ties for its graduates.
            </p>
            <p>
                Furthermore, PoliTo Rocket Team is dedicated to providing
                Politecnico di Torino students and researchers with the ability
                to design, build and launch their own experimental rockets.
                Launching sounding rockets also provides an excellent
                opportunity to carry out otherwise impossible technical,
                scientific and medical research.
            </p>
            <p>
                The Polito Rocket Team is proud to be part of this rich history
                of academic excellence and innovation. The team receives crucial
                support from the Politecnico di Torino, which contributed <span
                    class="accent-text">28%</span
                > of its budget last year, with the remaining funds coming from external
                sponsors, enabling us to pursue ambitious projects and push the boundaries
                of aerospace engineering.
            </p>
        </div>
    </section>
</main>

<style>
    .text-cols {
        column-width: 35ch;
        column-gap: 4rem;
    }
    p {
        margin-bottom: 1rem;
        break-inside: avoid;
    }
    .accent-text {
        color: var(--accent-fig);
        font-weight: 500;
    }
    /* p::first-letter {
        font-size: 3rem;
        font-weight: 600;
        float: left;
        margin-right: .2ch;
    } */
</style>
