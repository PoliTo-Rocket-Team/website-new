<script lang="ts">
    import Chief from "./Chief.svelte";
    import Lead from "./Lead.svelte";
    import Pie from "$lib/Pie.svelte";
    import Member from "../Member.svelte";
    import advisors from "./advisors.json";
    import HTabbed from "$lib/HTabbed.svelte";
    import { browser } from "$app/environment";
    import { frameThrottle } from "$lib/timing";
    import { onMount } from "svelte";
    import { normalize } from "./mail";

    let ww = browser ? document.body.clientWidth - 2 : 0;
    onMount(() => (ww = document.body.clientWidth - 2));

    export let data;

    function getAngle(i: number) {
        return ((i / (data.subteams.length - 1)) * 2 - 1) * Math.PI * 0.3;
    }
    function getImg(id: number | null, lastname: string) {
        return !id ? null : `${data.ppBucket}${id}-${normalize(lastname)}.jpeg`;
    }

    let p = data.president;

    // Sort members by first name, then last name
    let members = data.members.sort((a, b) => {
        let comparison = a.first_name.localeCompare(b.first_name);

        if (comparison === 0) {
            comparison = a.last_name.localeCompare(b.last_name);
        }

        return comparison;
    });
    import { theme } from "$lib/theme";

    let currentTheme: string | null = null;

    const unsubscribe = theme.subscribe(value => {
        currentTheme = value;
    });

    import { onDestroy } from "svelte";
    onDestroy(() => {
        unsubscribe();
    });
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
                During the 2024-2025 Academic Year, the Team is composed of more
                than 150 between undergraduate students and graduate students.
                The Team members come from almost all courses of Politecnico di
                Torino, and from more than 30 different countries.
            </p>
        </div>
    </div>

    <section>
        <div class="polito-logo">
            <a href="https://www.polito.it/" target="_blank">
                <img
                    src={currentTheme === "dark"
                        ? "/img/sponsors/poli.svg"
                        : "/img/sponsors/poli-dark.svg"}
                    alt="Politecnico di Torino logo"
                />
            </a>
        </div>
        <div class="vert-dashed-line" />
        <div class="executive-view">
            <Chief
                firstname={p.first_name}
                lastname={p.last_name}
                linkedin={p.linkedin}
                role="Team Leader"
                img={getImg(p.id4pp, p.last_name)}
                angle={0}
                president
            />
            {#each data.subteams as s, i}
                {@const c = s.chief}
                <Chief
                    firstname={c.first_name}
                    lastname={c.last_name}
                    linkedin={c.linkedin}
                    role={c.title}
                    angle={getAngle(i)}
                    img={getImg(c.id4pp, c.last_name)}
                />
            {/each}
        </div>
    </section>
    <section>
        <HTabbed
            expand={ww + "px"}
            data={data.subteams}
            let:name
            let:chief
            let:coordinator1
            let:coordinator2
            let:leads
        >
            <div class="lead-panel">
                <h2 class="center">{name} Leads</h2>
                <ul class="lead-list">
                    <Lead
                        firstname={chief.first_name}
                        lastname={chief.last_name}
                        linkedin={chief.linkedin}
                        role={chief.title}
                        img={getImg(chief.id4pp, chief.last_name)}
                        highlight
                    />
                    {#if coordinator1}
                        <Lead
                            firstname={coordinator1.first_name}
                            lastname={coordinator1.last_name}
                            linkedin={coordinator1.linkedin}
                            role="Coordinator"
                            img={getImg(
                                coordinator1.id4pp,
                                coordinator1.last_name
                            )}
                            highlight
                        />
                    {/if}
                    {#if coordinator2}
                        <Lead
                            firstname={coordinator2.first_name}
                            lastname={coordinator2.last_name}
                            linkedin={coordinator2.linkedin}
                            role="Coordinator"
                            img={getImg(
                                coordinator2.id4pp,
                                coordinator2.last_name
                            )}
                            highlight
                        />
                    {/if}
                    {#each leads as lead}
                        {#if lead.id4pp !== coordinator1?.id4pp && lead.id4pp !== coordinator2?.id4pp}
                            <Lead
                                firstname={lead.first_name}
                                lastname={lead.last_name}
                                linkedin={lead.linkedin}
                                role={lead.division}
                                img={getImg(lead.id4pp, lead.last_name)}
                            />
                        {/if}
                    {/each}
                </ul>
            </div>
        </HTabbed>
    </section>
    <section aria-labelledby="advisors">
        <h2 class="section-title center" id="advisors">Advisors</h2>
        <ul class="lead-list">
            <Lead
                firstname="Prof. Alfonso"
                lastname="Pagani"
                role="Primary Faculty Advisor"
                mail="alfonso.pagani@polito.it"
                linkedin="alfonsopagani"
                img="/members/Pagani.jpg"
                highlight
            />
            <Lead
                firstname="Prof. Enrico"
                lastname="Zappino"
                role="Faculty Advisor"
                mail="enrico.zappino@polito.it"
                linkedin="enrico-zappino-4a762326"
                img="/members/Zappino.jpg"
                highlight
            />
            {#each advisors as advisor}
                <Lead {...advisor} />
            {/each}
        </ul>
    </section>
    <section aria-labelledby="stats">
        <h2 id="stats">Statistics</h2>
        <div class="pies">
            <Pie
                title="Members by program"
                threshold={5}
                rotate={255}
                slices={[
                    { value: 71, label: "Aerospace", color: "#316B83" },
                    { value: 21, label: "Mechanical", color: "#DE8971" },
                    { value: 8, label: "Computer", color: "#70AF85" },
                    { value: 7, label: "Electronic", color: "#CD5D7D" },
                    { value: 4, label: "Management", color: "#C6D57E" },
                    { value: 8, label: "Other", color: "#A7D0CD" },
                ]}
            />
            <Pie
                title="Members by level"
                threshold={5}
                slices={[
                    { value: 62, label: "Bachelor's", color: "#4e7bc1" },
                    { value: 64, label: "Master's", color: "#e1a463" },
                    { value: 1, label: "Ph.D.", color: "#3bdb84" },
                ]}
            />
            <Pie
                title="International students rate"
                rotate={25}
                threshold={0}
                slices={[
                    { value: 96, label: "Domestic", color: "#DE8971" },
                    { value: 34, label: "International", color: "#A7D0CD" },
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

    .polito-logo {
        width: 16rem;
        margin: 0;
        display: block;
    }

    .vert-dashed-line {
        width: 2px;
        height: 100px;
        margin: 0 auto 2rem;
        display: none;
        background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 4px,
            #999c 4px,
            #999c 8px
        );
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
        .polito-logo {
            margin: 0 auto;
            width: 20rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .polito-logo img {
            width: 35rem;
            margin: 0;
        }

        .vert-dashed-line {
            display: block;
        }
    }

    @media (min-width: 85rem) {
        section {
            max-width: 85rem;
            margin-left: auto;
            margin-right: auto;
            margin-top: 6rem;
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
