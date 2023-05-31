<script>
    import Follow3D from "$lib/Follow3D.svelte";
    import Masonry from "$lib/Masonry.svelte";
    import Post from "./Post.svelte";
    import posts from "./posts.json";
</script>

<main>
    <h1>Outreach</h1>
    <hr class="subtle stop-growth">
    <section aria-labelledby="events" class="sm-c">
        <h2 id="events">Events</h2>
        <article aria-labelledby="iress">
            <div class="with-flyer">
                <div class="body blur-behind">
                    <h3 id="iress">Italian Rocket Engineering Student Summit</h3>
                    <p>PoliTo Rocket Team is pleased to invite you to the 1st IRESS &mdash; Italian Rocket Engineering Student Summit &mdash; that will be held on the 2<sup>nd</sup> of May 2023, from 3pm to 7pm in Aula Magna &ldquo;Giovanni Agnelli&rdquo; of Politecnico di Torino.</p>
                    <p>The IRESS will gather for the first time Rocket Teams from major Italian Universities in order to present an overview of Rocket Engineering realities and challenges, from the intercollegiate point of view and more.</p>
                    <p>Along with the students speeches, relevant personalities from aerospace companies will present their work as engineers concerning Propulsion and Rocket Engineering.</p>
                </div>
                <div class="flyer">
                    <Follow3D transform={(x,y) => `translate(${x*0.2}rem,${y*0.2}rem) rotate3d(${-y},${x},0,${-3*Math.hypot(x,y)}deg)`}>
                        <img src="/img/IRESS.jpg" alt="Flyer IRESS" style="width: 15rem; max-width: 100%;">
                    </Follow3D>
                </div>
            </div>
            <div class="split">
                <ul class="center">
                    <li>
                        <span class="semi-bold">PoliTo Rocket Team</span><br>
                        <span class="low">Politecnico di Torino</span>
                    </li>
                    <li>
                        <span class="semi-bold">DARE</span><br>
                        <span class="low"> Delft University of Technology</span>
                    </li>
                    <li>
                        <span class="semi-bold">Skyward Experimental Rocketry</span><br>
                        <span class="low">Politecnico di Milano</span>
                    </li>
                    <li>
                        <span class="semi-bold">THRUST</span><br>
                        <span class="low">Università degli Studi di Padova</span>
                    </li>
                    <li>
                        <span class="semi-bold">Icarus</span><br>
                        <span class="low">Politecnico di Torino</span>
                    </li>
                    <li>
                        <span class="semi-bold">Unina Rockets</span><br>
                        <span class="low">Università Federico II di Napoli</span>
                    </li>
                </ul>
                <ul class="center">
                    <li>
                        <span class="semi-bold">Ing. Marino Fragnito</span><br>
                        <span class="low">Senior Vice President Vega Business Unit at ArianeSpace</span>
                    </li>
                    <li>
                        <span class="semi-bold">Ing. Francesca Romana Alvino</span><br>
                        <span class="low">GNC engineer for VEGA launch vehicles at Avio</span>
                    </li>
                    <li>
                        <span class="semi-bold">Davide Barbero</span><br>
                        <span class="low">RCS Propulsion Lead Engineer for Space Rider Re-entry module</span>
                    </li>
                </ul>
            </div>
        </article>
    </section>
    <section aria-labelledby="posts" style="max-width: 100ch;">
        <h2 id="posts">Posts</h2>
        <Masonry data={posts} let:date let:title let:img let:url let:body>
            <Post {title} {date} {img} {url}>
                <p>{body}</p>
            </Post>
        </Masonry>
    </section>
</main>

<style>
    h2 {
        font-size: calc(1.3 * var(--fs-70));
        margin-bottom: 1em;
    }
    h3 {
        font-size: var(--fs-65);
        margin-bottom: 1rem;
    }
    section {
        margin-left: auto;
        margin-right: auto;
        margin-top: 10rem;
        --masonry-gap: 2rem;
        --masonry-cols: repeat(auto-fill, minmax(28ch,1fr))
    }
    .sm-c {
        max-width: 50rem;
        margin-inline: auto;
    }
    .split,
    main p + p {
        margin-top: 1rem;
    }
    .with-flyer {
        display: grid;
        column-gap: 2ch;
        row-gap: 1rem;
    }
    .flyer img { 
        display: block;
        border-radius: .6rem;
    }
    ul.center {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    ul li + li {
        margin-top: 0.75rem;
    }
    .semi-bold {
        font-weight: 500;
    }
    .low {
        color: rgba(var(--fg-1-rgb), 0.85);
        font-style: italic;
    }
    @media (max-width: 50rem) {
        .split > * {
            margin-bottom: 1rem;
        }
        .flyer {
            justify-self: center;
        }
    }
    @media (min-width: 50rem) {
        h2 {
            text-align: center;
        }
        .with-flyer {
            display: grid;
            grid-template-columns: 1fr auto;
            column-gap: 2ch;
        }
        .split {
            column-count: 2;
            column-gap: 4rem;
            column-rule: 2px dashed #8888;
            margin-top: 2.5rem;
        }
        .split > * {
            break-inside: avoid;
        }
    }
</style>