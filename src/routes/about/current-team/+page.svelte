<script>
    import Executive from "./Executive.svelte";
    import Lead from "./Lead.svelte";
    import Pie from "$lib/Pie.svelte";
    import Member from "../Member.svelte";
    import members from "./members.json";
    import leads from "./leads.json";
    import HTabbed from "$lib/HTabbed.svelte";
    import { browser } from "$app/environment";
    import { frameThrottle } from "$lib/timing";
    import { onMount } from "svelte";

    let ww = browser ? document.body.clientWidth-2 : 0;
    onMount(() => ww = document.body.clientWidth-2);
</script>

<svelte:window on:resize={frameThrottle(() => ww = document.body.clientWidth-2)} />

<svelte:head>
    <title>Team - PoliTo Rocket Team</title>
    <meta name="description" content="Discover the team! Look at the statistics about team composition, and meet the members, Executive, Chief Engineers, and Division Leads" />
</svelte:head>

<main>
    <div>
        <h1>The Team</h1>
        <div class="stop-growth">
            <hr class="subtle">
            <p>During the 2022-2023 Academic Year, the Team is composed of more than 85 between undergraduate students, graduate students, and PhD candidates. Most of the Team members come from the aerospace, mechanical, electronic and computer engineering courses of Politecnico di Torino.</p>
        </div>
    </div>
    <section aria-labelledby="executive">
        <h2 id="executive">Executive</h2>
        <ul class="executive-list no-list">
            <Executive name="Fabio Meloni" role="President" mail="president@politorocketteam.it" img="Meloni.jpg" linkedin="fabioski01">
                <p>Fabio has been the Team's President since its foundation in 2022, during his second year of undergraduate studies, and he is now a third-year Bachelor's student in Aerospace Engineering at Politecnico di Torino.</p>
                <p>During his presidency, Fabio expanded the Team from 6 to 85+ members, involving undergraduate, graduate, and doctoral students. Besides directing the Team, he manages the relations with academia, private partners, and other institutions.</p>
                <p>Fabio is also the Chief Engineering of the Cavour Project, where he leads a subteam of 30+ students to research and develop Cavour, a reusable experimental suborbital rocket with multiple apogee and payload configurations.</p>
            </Executive>
            <Executive name="Elena Dilorenzo" role="Chief Operating Officer" mail="elena.dilorenzo@studenti.polito.it" linkedin="elena-dilorenzo-294b5a20b" img="Dilorenzo.jpg">
                <p>Elena is responsible for the Operations Subteam, which is in charge of logistics, outreach, and maintaining relations with the Team's partners. In addition, her work focuses on achieving operational excellence in the Team's technical and non-technical projects.</p>
                <p>She is now in her last year of the Master's in Aerospace Engineering at Politecnico di Torino, specializing in the Aeromechanical and Systems field.</p>
                <p>Elena was previously the president of AESA Torino - the Aerospace Engineering Students’ Association of Politecnico - a non-profit student group composed of 500+ members.</p>
            </Executive>
            <Executive name="Luca Santoro" role="Chief Technologist and Head of Strategy" mail="luca.santoro@polito.it" linkedin="luca-santoro-b16699151" img="Santoro.jpg">
                <p>Luca graduated in Mechanical Engineering at Politecnico di Torino, where he is now a PhD student at the Department of Mechanical and Aerospace Engineering. After the foundation of the Team, he provided the human resources, a strong strategy, and technical support to the project.</p>
                <p>As Chief Technologist, he is in charge of making decisions    for the technological infrastructure, in order to align it with the organization's goals.</p>
                <p>As Head of Strategy, he is in charge of all decisions concerning short and long term strategy, management, partnerships, cost-reduction, strategic initiatives and developing the Team's strategy and vision. The Head of Strategy is also the chairman of the Team's Advisor's board.</p>
            </Executive>
        </ul>
    </section>
    <section aria-labelledby="faculty-advisors">
        <h2 class="section-title center" id="faculty-advisors">Faculty Advisors</h2>
        <ul class="lead-list">
            <Lead 
                name="Prof. Alfonso Pagani" 
                role="Primary Faculty Advisor" 
                mail="alfonso.pagani@polito.it"
                linkedin="alfonsopagani"
                img="advisors/Pagani.jpg" />
            <Lead 
                name="Prof. Enrico Zappino" 
                role="Faculty Advisor" 
                mail="enrico.zappino@polito.it"
                linkedin="enrico-zappino-4a762326"
                img="advisors/Zappino.jpg" />
        </ul>
    </section>
    <section>
        <HTabbed expand={ww + "px"} data={[
            { title: "Project Cavour Leads", leads: leads.Cavour },
            { title: "Project Efesto Leads", leads: leads.Efesto },
            { title: "Operations Leads", leads: leads.Operations },
            { title: "Advisor Board", leads: leads.advisors },
        ]} let:title let:leads>
            <div class="lead-panel">
                <h2 class="center">{title}</h2>
                <ul class="lead-list">
                    {#each leads as lead}
                        <Lead {...lead} />
                    {/each}
                </ul>
            </div>
        </HTabbed>
    </section>
    <section aria-labelledby="stats">
        <h2 id="stats">Statistics</h2>
        <div class="pies">
            <Pie title="Members by program" threshold={5} rotate={255} slices={[
                { value: 49, label: "Aerospace Engineering", color: "#316B83" },
                { value: 13, label: "Mechanical Engineering", color: "#DE8971" },
                { value: 8, label: "Computer Engineering", color: "#70AF85" },
                { value: 8, label: "Electronic Engineering", color: "#CD5D7D" },
                { value: 3, label: "Physics Engineering", color: "#6096B4" },
                { value: 4, label: "Other Engineering", color: "#C6D57E" },
                { value: 2, label: "Non-PoliTo", color: "#D3DEDC" },
            ]} />
            <Pie title="Members by level" threshold={5} slices={[
                { value: 45, label: "Bachelor's", color: "#4e7bc1" },
                { value: 36, label: "Master's", color: "#e1a463" },
                { value: 4, label: "Ph.D.", color: "#3bdb84" }
            ]} />
            <Pie title="International students rate" rotate={25} threshold={0} slices={[
                { value: 61, label: "Domestic", color: "#DE8971" },
                { value: 24, label: "International", color: "#A7D0CD" },
            ]} />
        </div>
    </section>
    <section aria-labelledby="members">
        <h2 id="members">Core members</h2>
        <img loading="lazy" src="/img/team.jpg" alt="Members after the first general meeting of the team">
        <ul class="cols no-list">
            {#each members as member}
                <Member {...member} />
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
    .lead-list {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--pad);
    }
    @media (min-width: 50rem) {
        .lead-list {
            grid-template-columns: 1fr 1fr;
            gap: 3ch;
        }
        .center {text-align: center;}
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