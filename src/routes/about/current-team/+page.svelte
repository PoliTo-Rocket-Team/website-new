<script>
    import Executive from "./Executive.svelte";
    import Lead from "./Lead.svelte";
    import Pie from "$lib/Pie.svelte";
    import Member from "../Member.svelte";
    import members from "./members.json";
</script>

<svelte:head>
    <title>Team - PoliTo Rocket Team</title>
    <meta name="description" content="Discover the team! Look at the statistics about team composition, and meet the members, Executive, Chief Engineers, and Division Leads" />
</svelte:head>

<main>
    <div>
        <h1>The Team</h1>
        <div class="stop-growth">
            <hr class="subtle">
            <p>At the beginning of the 2022-2023 Academic Year, the Team is composed of more than 70 between undergraduate students, graduate students, and PhD candidates. Most of the Team members come from the aerospace, mechanical, electronic and computer engineering courses of Politecnico di Torino.</p>
        </div>
    </div>
    <section aria-labelledby="executive">
        <h2 id="executive">Executive</h2>
        <ul class="executive-list no-list">
            <Executive name="Fabio Meloni" role="President" mail="president@politorocketteam.it" img="Meloni.jpg" linkedin="fabioski01">
                <p>Fabio has been the Team's President since its foundation in 2022, during his second year of undergraduate studies, and he is now a third-year Bachelor's student in Aerospace Engineering at Politecnico di Torino.</p>
                <p>During his presidency, Fabio expanded the Team from 6 to 75+ members, involving undergraduate, graduate, and doctoral students. Besides directing the Team, he manages the relations with academia, private partners, and other institutions.</p>
                <p>Fabio is also the Chief Engineering of the Cavour Project, where he leads a subteam of 50+ students to research and develop Cavour, a reusable experimental suborbital rocket with multiple apogee and payload configurations.</p>
            </Executive>
            <Executive name="Elena Dilorenzo" role="Chief Operating Officer" mail="elena.dilorenzo@studenti.polito.it" linkedin="elena-dilorenzo-294b5a20b" img="Dilorenzo.jpg">
                <p>Elena is responsible for the Operations Subteam, which is in charge of logistics, outreach, and mantaining relations with the Team's partners. In addition, her work focuses on achieving the operational excellence in the Team's technical and non-technical projects.</p>
                <p>She is now at her last year of the Master's in Aerospace Engineering at Politecnico di Torino, specializing in the Aeromechanical and Systems field.</p>
                <p>Elena was previously the president of AESA Torino - the Aerospace Engineering Students’ Association of Politecnico - a non-profit student group composed of 500+ members.</p>
            </Executive>
            <Executive name="Luca Santoro" role="Chief Technologist and Head of Strategy" mail="luca.santoro@polito.it" linkedin="luca-santoro-b16699151" img="Santoro.jpg">
                <p>Luca graduated in Mechanical Engineering at Politecnico di Torino, where he is now a PhD student at the Department of Mechanical and Aerospace Engineering. Immediately after the foundation of the Team, he provided the human resources, a strong strategy, and technical support to the project.</p>
                <p>As Chief Technologist, he is in charge of making decision for the technological infrastructure, in order to align it with the organization's goals.</p>
                <p>As Head of Strategy, he is in charge of all decisions concerning short and long term strategy, management, partnerships, cost-reduction, strategic initiatives and developing the Team's strategy and vision. The Head of Strategy is also the chairman of the Team's Advisor's board.</p>
            </Executive>
        </ul>
    </section>
    <section aria-labelledby="chiefs">
        <h2 class="section-title center" id="chiefs">Chief Engineers</h2>
        <ul class="lead-list">
            <Lead 
                name="Fabio Meloni" 
                role="Chief Engineer" 
                scope="Project Cavour"
                mail="fabio.meloni@studenti.polito.it" 
                linkedin="fabioski01"
                img="Meloni.jpg" />
            <Lead 
                name="Matteo Crachi" 
                role="Chief Engineer" 
                scope="Project Efesto"
                mail="matteo.crachi@polito.it" 
                linkedin="matteo-crachi-37a060161"
                img="Crachi.jpg" />
        </ul>
    </section>
    <section aria-labelledby="leads">
        <h2 class="center" id="leads">Division and Group Leads</h2>
        <ul class="lead-list">
            <Lead 
                name="Francesca Bracaglia" 
                role="Aerostructures Lead Engineer" 
                scope="Project Cavour"
                mail="francesca.bracaglia@studenti.polito.it" 
                linkedin="francesca-bracaglia-a1000b214" 
                img="Bracaglia.jpg" />
            <Lead 
                name="Federico Guglielmi" 
                role="IT Manager" 
                scope="Operations"
                mail="federico.guglielmi@studenti.polito.it"
                linkedin="Fedesky25"
                img="Guglielmi.jpg" />
            <Lead 
                cofounder
                name="Salvatore Lagrasta" 
                role="Avionics Lead Engineer" 
                scope="Project Cavour"
                mail="salvatore.lagrasta@studenti.polito.it" 
                linkedin="salvatore-lagrasta"
                img="Lagrasta.jfif" />
            <Lead 
                name="Luca Loiodice" 
                role="CAD & Additive Manufacturing Lead Engineer"
                scope="Project Cavour" 
                mail="luca.loiodice@studenti.polito.it" 
                linkedin="luca-loiodice-01l10"
                img="Loiodice.jpg" />
            <Lead 
                cofounder
                name="Cristian Manfredi" 
                role="Liquid Propulsion Coordinator"
                scope="Project Efesto" 
                mail="cristian.manfredi@studenti.polito.it" 
                linkedin="cristian-manfredi-478b82194" 
                img="Manfredi.jpeg" />
            <Lead 
                name="Pier Luigi Mercadante" 
                role="Liquid Propulsion Coordinator"
                scope="Project Efesto" 
                mail="pierluigi.mercadante@studenti.polito.it" 
                linkedin="pier-luigi-mercadante-b43125234" 
                img="Mercadante.png" />
            <Lead 
                name="Marco Prodan" 
                role="Recovery & Manufacturing Lead Engineer"
                scope="Project Cavour" 
                linkedin="marcoprodan"
                mail="marco.prodan@studenti.polito.it" 
                img="Prodan.jpg" />
            <Lead 
                cofounder
                name="Mattia Saba" 
                role="Mission Analysis Lead Engineer" 
                scope="Project Cavour"
                mail="mattia.saba@studenti.polito.it"          
                linkedin="mattia-saba-5b6638258" 
                img="Saba.jpg" />
            <Lead 
                name="Edoardo Viglietti" 
                role="FEA Group Lead Engineer" 
                scope="Project Cavour"
                mail="edo.viglietti@studenti.polito.it" 
                linkedin="edoardoviglietti" 
                img="Viglietti.jpg" />
            <Lead 
                name="Alessandro Di Nuzzo" 
                role="Media Manager" 
                scope="Operations"
                mail="alessandro.dinuzzo@studenti.polito.it"
                linkedin="alessandro-di-nuzzo-999886254"
                img="DiNuzzo.jpg" />
        </ul>
    </section>
    <section aria-labelledby="stats">
        <h2 id="stats">Statistics</h2>
        <div class="pies">
            <Pie title="Members by program" threshold={4} rotate={255} slices={[
                { value: 49, label: "Aerospace Engineering", color: "#316B83" },
                { value: 11, label: "Mechanical Engineering", color: "#DE8971" },
                { value: 5, label: "Computer Engineering", color: "#70AF85" },
                { value: 3, label: "Electronic Engineering", color: "#CD5D7D" },
                { value: 2, label: "Physics Engineering", color: "#6096B4" },
                { value: 3, label: "Other Engineering", color: "#C6D57E" },
                { value: 3, label: "Non-PoliTo", color: "#D3DEDC" },
            ]} />
            <Pie title="Members by level" threshold={5} slices={[
                { value: 37, label: "Bachelor's", color: "#4e7bc1" },
                { value: 32, label: "Master's", color: "#e1a463" },
                { value: 4, label: "Ph.D.", color: "#3bdb84" }
            ]} />
            <Pie title="International students rate" rotate={30} threshold={0} slices={[
                { value: 58, label: "Domestic", color: "#DE8971" },
                { value: 15, label: "International", color: "#A7D0CD" },
            ]} />
        </div>
    </section>
    <section aria-labelledby="members">
        <h2 id="members">Core members</h2>
        <img loading="lazy" src="/img/team.jpg" alt="Members after the first general meeting of the team">
        <ul class="cols no-list">
            {#each members as member}
                <Member name={member[0]} role={member[1]} />
            {/each}
        </ul>
    </section>
</main>

<style>
    p {
        margin-top: 0.7rem;
    }
    img {
        max-width: 100%;
        margin-bottom: 2rem;
        border-radius: 0.7rem;
    }
    .cols {
        column-width: 25ch;
        column-gap: 4rem;
        column-rule: dashed 2px var(--fg-1);
    }
    .pies {
        --pie-size: 16rem;
        --reverse: initial;
    }
    @media (min-width: 50rem) {
        .lead-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3ch;
        }
        h2.center {text-align: center;}
        .pies {
            display: grid;
            grid-template-columns: repeat(auto-fit, 36rem);
            gap: 3.5rem;
        }
    }
    @media (min-width: 70rem) {
        .executive-list {
            display: grid;
            grid-template-columns: repeat(3,1fr);
            gap: 2rem;
        }
    }
    @media (min-width: 85rem) {
        section {
            max-width: 85rem;
            margin-left: auto;
            margin-right: auto;
        }
        h2 {
            text-align: center;
        }
        .pies {
            grid-template-columns: 1fr 1fr;
        }
        .pies > :global(:nth-child(2n+1)) {
            --reverse: ;
        }
    }
</style>