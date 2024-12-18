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
    <section class="hero-section">
        <video
            autoplay
            loop
            muted
            playsinline
            disablepictureinpicture
            class="background-video"
        >
            <source
                src="/img/university/BackgroundVideo.mp4"
                type="video/mp4"
            />
        </video>
    </section>
    <div class="content">
        <h1>Politecnico di Torino</h1>
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
    </div>
</main>

<style>
    .hero-section {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .background-video {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: blur(2px) brightness(50%);
        z-index: 0;
        object-fit: cover;
        pointer-events: none;
    }

    .content {
        display: block;
        position: relative;
        z-index: 1;
        color: white;
        padding: 2rem;
    }

    .text-cols {
        column-width: 35ch;
        column-gap: 4rem;
        text-align: left;
    }

    p {
        margin-bottom: 1rem;
        break-inside: avoid;
    }

    a {
        color: #ffa500;
        text-decoration: underline;
    }

    .accent-text {
        color: var(--accent-fig, #ffa500);
        font-weight: 500;
    }
    @media (max-width: 50rem) {

        h1 {
            font-size: 3.2rem;
        }
        .hero-section {
            display: none;
        }
    }
</style>
