<script>
    import Sponsor from "./Sponsor.svelte";
</script>

<svelte:head>
    <title>Sponsors - PoliTo Rocket Team</title>
    <meta name="description" content="Meet our partners and sponsors which allow us to keep working on our projects" />
</svelte:head>

<main>
    <h1>Sponsors</h1>
    <div class="stop-growth">
        <hr class="subtle">
        <p>Building rockets does not come easy. If you wish to become our partner with financial, technical, or material support, or with any other service provision, contact us at <a href="mailto:info@politorocketteam.it">info@politorocketteam.it</a></p>
    </div>
    <section aria-labelledby="main-partners">
        <h2 id="main-partners">Main partners</h2>
        <div class="cards">
            <Sponsor name="Politecnico di Torino" link="https://www.polito.it/" img={{url: "poli.svg", padding: 12, background: "dark"}}>
                <p>Politecnico di Torino (Polytechnic University of Turin) is the oldest public technical university of Italy, located in Turin. Consistently ranked as one of the best universities in Italy and in Europe, as of 2022 PoliTo is ranked by QS World University Rankings 33rd among the engineering and technology universities in the world.</p>
                <p>Politecnico's Department of Mechanical and Aerospace Engineering (DIMEAS) is the main financial partner of the Team.</p>
            </Sponsor>
            <Sponsor name="Mul2 Research Group" img="mul2_ter.png" link="http://www.mul2.polito.it/">
                <p>Mul2 Research Group is a research project within Politecnico di Torino's Dept. of Mechanical and Aerospace Engineering, devoted to the development of advanced structural models for MULSs with particular attention given to the multifield analysis and the fluid-structure interactions.</p>
                <p>Mul2 provides material support, with 3D printers and 3D printing materials, along with technical support for the additive manufacturing processes.</p>
            </Sponsor>
            <Sponsor name="BETA CAE Systems" link="https://www.beta-cae.com/" img={{url: "BETA_CAE_Systems.svg", padding: 0, background: "light"}}>
                <p>BETA CAE Systems transformed CAE by introducing revolutionary automation software tools and practices into Simulation and Analysis processes almost 30 years ago. Today, BETA CAE Systems is a world leader of Engineering Simulation, thanks to their softwares deployed in the Aerospace, Defense, Automotive, Biomechanics, Electronics, Energy and other Industries.</p>
                <p>BETA CAE Systems provides material support with the ANSA and META software suites, as well as technical support to the Team.</p>
            </Sponsor>
            <Sponsor name="ASSOCAM Scuola Camerana" link="https://www.scuolacamerana.it/" img={{url: "Camerana.png", padding: 10, background: "light"}}>
                <p>ASSOCAM Scuola Camerana, is a Turin-based organisation rooted in the city's industrial fabric that has been providing post-diploma training since 1959. It brings together experienced technicians and teachers, as well as a large number of laboratories and machinery for students. In particular, it is a training agency of Unione Industriali and Camera di Commercio of Turin (the Turin Chamber of Commerce) with a focus on technological training applied to industrial processes.</p>
                <p>Assocam Scuola Camerana provides the team with the necessary mechanical machining and components for its activities.</p>
            </Sponsor>
        </div>
    </section>
</main>

<style>
    p {
        margin-top: 0.8em;
        text-align: justify;
    }

    .cards {
        display: grid;
    }

    @media (max-width: 50rem) {
        .cards {
            grid-auto-flow: row;
            gap: 3.5rem;
        }
    }
    @media (min-width: 50rem) {
        .cards {
            grid-template-columns: repeat(auto-fill, minmax(30ch, 1fr));
            gap: 2rem;
        }
    }
</style>