<script>
    import Chief from "./Chief.svelte";
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

    const angle = 45/180*Math.PI
    const cos = Math.sin(angle);
    const sin = Math.cos(angle);
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


    <section>
        <div class="executive-view">
            <Chief 
                president
                firstname="Elena" lastname="Dilorenzo"
                role="President" 
                linkedin="elena-dilorenzo-294b5a20b" 
                img="Dilorenzo.jpg"
                angle={0}
            />
            <Chief
                angle={-Math.PI*0.2}
                firstname="Andrea"
                lastname="Pantano"
                role="Chief Operating Officer"
                linkedin="andrea-pantano-84b805258"
                img="Pantano.JPG"
            />
            <Chief
                angle={-0}
                firstname="Edoardo" lastname="Viglietti"
                role="Cavour Chief Engineer"
                linkedin="edoardoviglietti8"
                img="Viglietti.jpg"
            />
            <Chief
                angle={Math.PI*0.2}
                firstname="Matteo" lastname="Crachi"
                role="Efesto Chief Engineer"
                linkedin="matteo-crachi-37a060161"
                img="Crachi.jpg"
            />
        </div>

    </section>

    <section aria-labelledby="faculty-advisors">
        <h2 class="section-title center" id="faculty-advisors">Faculty Advisors</h2>
        <ul class="lead-list">
            <Lead 
                name="Prof. Alfonso Pagani" 
                role="Primary Faculty Advisor" 
                mail="alfonso.pagani@polito.it"
                linkedin="alfonsopagani"
                img="advisors/Pagani.jpg"
                reversable />
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
                    {#each leads as lead, i}
                        <Lead reversable={!(i&1)} {...lead} />
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
                { value: 10, label: "Computer Engineering", color: "#70AF85" },
                { value: 6, label: "Electronic Engineering", color: "#CD5D7D" },
                { value: 3, label: "Physics Engineering", color: "#6096B4" },
                { value: 2, label: "Other Engineering", color: "#C6D57E" },
                { value: 2, label: "Non-PoliTo", color: "#D3DEDC" },
            ]} />
            <Pie title="Members by level" threshold={5} slices={[
                { value: 47, label: "Bachelor's", color: "#4e7bc1" },
                { value: 35, label: "Master's", color: "#e1a463" },
                { value: 3, label: "Ph.D.", color: "#3bdb84" }
            ]} />
            <Pie title="International students rate" rotate={25} threshold={0} slices={[
                { value: 61, label: "Domestic", color: "#DE8971" },
                { value: 24, label: "International", color: "#A7D0CD" },
            ]} />
        </div>
    </section>
    <section aria-labelledby="members">
        <h2 id="members">Core members</h2>
        <img loading="lazy" src="/img/team/22-06.jpg" alt="Members after the first general meeting of the team">
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


    .executive-view {
        position: relative;
        --radius: 26rem;
        /* border: 2px solid red; */
    }

    @media (min-width: 50rem) {
        .executive-view {
            min-height: 43rem;
        }
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