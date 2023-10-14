<script lang="ts">
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

    let ww = browser ? document.body.clientWidth - 2 : 0;
    onMount(() => (ww = document.body.clientWidth - 2));
</script>

<svelte:window
    on:resize={frameThrottle(() => (ww = document.body.clientWidth - 2))}
/>

<svelte:head>
    <title>Team - PoliTo Rocket Team</title>
    <meta
        name="description"
        content="Discover the team! Look at the statistics about team composition, and meet the members, Executive, Chief Engineers, and Division Leads"
    />
</svelte:head>

<main>
    <div>
        <h1>The Team</h1>
        <div class="stop-growth">
            <hr class="subtle" />
            <p>
                During the 2023-2024 Academic Year, the Team is composed of more
                than 120 between undergraduate students and graduate students.
                Most of the Team members come from the aerospace, mechanical,
                electronic and computer engineering courses of Politecnico di
                Torino.
            </p>
        </div>
    </div>

    <section>
        <div class="executive-view">
            <Chief {...leads.President} angle={0} president />
            <Chief {...leads.Operations[0]} angle={-Math.PI * 0.2} />
            <Chief {...leads.VES[0]} angle={0} role="VES Chief Engineer" />
            <Chief
                {...leads.Efesto[0]}
                angle={Math.PI * 0.2}
                role="Efesto Chief Engineer"
            />
        </div>
    </section>

    <section aria-labelledby="faculty-advisors">
        <h2 class="section-title center" id="faculty-advisors">
            Faculty Advisors
        </h2>
        <ul class="lead-list">
            <Lead
                firstname="Prof. Alfonso"
                lastname="Pagani"
                role="Primary Faculty Advisor"
                mail="alfonso.pagani@polito.it"
                linkedin="alfonsopagani"
                img="advisors/Pagani.jpg"
                reversable
            />
            <Lead
                firstname="Prof. Enrico"
                lastname="Zappino"
                role="Faculty Advisor"
                mail="enrico.zappino@polito.it"
                linkedin="enrico-zappino-4a762326"
                img="advisors/Zappino.jpg"
            />
        </ul>
    </section>
    <section>
        <HTabbed
            expand={ww + "px"}
            data={[
                { title: "Project VES Leads", leads: leads.VES },
                { title: "Project Efesto Leads", leads: leads.Efesto },
                { title: "Operations Leads", leads: leads.Operations },
                { title: "Advisor Board", leads: leads.ADVISOR },
            ]}
            let:title
            let:leads
        >
            <div class="lead-panel">
                <h2 class="center">{title}</h2>
                <ul class="lead-list">
                    {#each leads as lead, i}
                        <Lead reversable={!(i & 1)} {...lead} />
                    {/each}
                </ul>
            </div>
        </HTabbed>
    </section>
    <section aria-labelledby="stats">
        <h2 id="stats">Statistics</h2>
        <div class="pies">
            <Pie
                title="Members by program"
                threshold={5}
                rotate={255}
                slices={[
                    { value: 66, label: "Aerospace", color: "#316B83" },
                    { value: 25, label: "Mechanical", color: "#DE8971" },
                    { value: 8, label: "Electronic", color: "#CD5D7D" },
                    { value: 8, label: "Computer", color: "#70AF85" },
                    { value: 4, label: "Management", color: "#C6D57E" },
                    { value: 22, label: "Other", color: "#A7D0CD" },
                ]}
            />
            <Pie
                title="Members by level"
                threshold={5}
                slices={[
                    { value: 64, label: "Bachelor's", color: "#4e7bc1" },
                    { value: 61, label: "Master's", color: "#e1a463" },
                    { value: 1, label: "Ph.D.", color: "#3bdb84" },
                ]}
            />
            <Pie
                title="International students rate"
                rotate={25}
                threshold={0}
                slices={[
                    { value: 88, label: "Domestic", color: "#DE8971" },
                    { value: 38, label: "International", color: "#A7D0CD" },
                ]}
            />
        </div>
    </section>
    <section aria-labelledby="members">
        <h2 id="members">Core members</h2>
        <img
            loading="lazy"
            src="/img/team/22-06.jpg"
            alt="Members after the first general meeting of the team"
        />
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
        .center {
            text-align: center;
        }
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
        .pies > :global(:nth-child(2n + 1)) {
            --reverse: ;
        }
    }
</style>
