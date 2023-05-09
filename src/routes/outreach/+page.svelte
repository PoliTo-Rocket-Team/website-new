<script>
    import Follow3D from "$lib/Follow3D.svelte";
</script>

<main>
    <h1>Outreach</h1>
    <hr class="subtle">
    <article aria-labelledby="iress">
        <div class="with-flyer">
            <div class="body blur-behind">
                <h2 id="iress">Italian Rocket Engineering Student Summit</h2>
                <p>PoliTo Rocket Team is pleased to invite you to the 1st IRESS &mdash; Italian Rocket Engineering Student Summit &mdash; that will be held on the 2<sup>nd</sup> of May 2023, from 3pm to 7pm in Aula Magna &ldquo;Giovanni Agnelli&rdquo; of Politecnico di Torino.</p>
                <p>The IRESS will gather for the first time Rocket Teams from major Italian Universities in order to present an overview of Rocket Engineering realities and challenges, from the intercollegiate point of view and more.</p>
                <p>Along with the students speeches, relevant personalities from aerospace companies will present their work as engineers concerning Propulsion and Rocket Engineering.</p>
            </div>
            <div class="flyer">
                <Follow3D tranform={(x,y) => `translate(${x*0.2}rem,${y*0.2}rem) rotate3d(${-y},${x},0,${-3*Math.hypot(x,y)}deg)`}>
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
</main>

<style>
    main {
        max-width: 50rem;
        margin: 0 auto;
        padding: var(--pad);
    }
    article {
        margin-top: 8rem;
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
        main {
            padding: var(--pad) 0;
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