<script>
    import "@fontsource/plus-jakarta-sans/400-italic.css";
    import IconLink from "$lib/icons/IconLink.svelte";
    import Icon from "$lib/icons/IconLink.svelte";
    import team from './22-23.json';

    // console.log(team.Cavour[0].name);
</script>

<svelte:head>
    <title>Past Teams - PoliTo Rocket Team</title>
    <meta name="description" content="List of all the members of the team, grouped by year" />
</svelte:head>

<main>
    <h1>Past Teams</h1>
    <section aria-labelledby="team-22-23">
        <h2 id="team-22-23">2022/2023</h2>
        <div class="cols">
            {#each Object.entries(team) as [division, members]}
                <h3 class="division-name">{division}</h3>
                <ul class="no-list">
                    {#each members as member}
                    <li class="member">
                        {#if member.linkedin}
                        <div class="socials">
                            <IconLink icon="LinkedIn" id={member.linkedin} />
                        </div>
                        {/if}
                        <span class="name">{member.name}</span>
                        {#if "title" in member}
                        <span class="title">{member.title}</span>
                        {/if}
                        <span class="desc">{member.role}</span>
                    </li>
                    {/each}
                </ul>  
            {/each}
        </div>
    </section>
    <section aria-labelledby="team-21-22">
        <h2 id="team-21-22">2021/2022</h2>
        <div class="cols">
            <h3 class="division-name">Operations</h3>
            <ul class="no-list">
                <li class="member">
                    <div class="socials">
                        <IconLink icon="LinkedIn" id="fabioski01" />
                    </div>
                    <span class="name">Fabio Meloni</span>
                    <span class="title">Founder</span>
                    <span class="desc">President<br>Chief Engineer - Project Cavour</span>
                </li>                     
                <li class="member">
                    <div class="socials">
                        <IconLink icon="LinkedIn" id="luca-santoro-b16699151" />
                    </div>
                    <span class="name">Luca Santoro</span>
                    <span class="desc">Chief Technologist & Head of Strategy</span>
                </li>
                <li class="member">
                    <div class="socials">
                        <IconLink icon="LinkedIn" id="elena-dilorenzo-294b5a20b" />
                    </div>
                    <span class="name">Elena Dilorenzo</span>
                    <span class="desc">Outreach & Recognition Coordinator</span>
                </li>
                <li class="member">
                    <div class="socials">
                        <Icon icon="LinkedIn" id="gregorio-torchia-6514b8210" />
                    </div>
                    <span class="name">Gregorio Torchia</span>
                    <span class="desc">Legal Advisor</span>
                </li>
            </ul>
            <h3 class="division-name">Avionics</h3>
            <ul class="no-list">
                <li class="member">
                    <span class="name">Salvatore Lagrasta</span>
                    <span class="title">Co-Founder</span>
                    <span class="desc">Avionics Lead Engineer</span>
                </li>
                <li class="member">
                    <div class="socials">
                        <IconLink icon="LinkedIn" id="giacomo-luccisano" />
                    </div>
                    <span class="name">Giacomo Luccisano</span>
                    <span class="desc">Avionics Engineer</span>
                </li>
                <li class="member">
                    <div class="socials">
                        <IconLink icon="GitHub" id="Fedesky25" />
                        <IconLink icon="LinkedIn" id="fedesky25" />
                    </div>
                    <span class="name">Federico Guglielmi</span>
                    <span class="desc">Avionics Engineer & IT Manager</span>
                </li>
            </ul>
            <h3 class="division-name">Liquid Propulsion</h3>
            <ul class="no-list">
                <li class="member">
                    <div class="socials">
                        <IconLink icon="LinkedIn" id="cristian-manfredi-478b82194" />
                    </div>
                    <span class="name">Cristian Manfredi</span>
                    <span class="title">Co-Founder</span>
                    <span class="desc">Propulsion Coordinator</span>
                </li>
                <li class="member">
                    <div class="socials">
                        <IconLink icon="LinkedIn" id="pier-luigi-mercadante-b43125234" />
                    </div>
                    <span class="name">Pier Luigi Mercadante</span>
                    <span class="desc">Propulsion Coordinator</span>
                </li>
            </ul>
            <h3 class="division-name">Recovery & Mission Analysis</h3>
            <ul class="no-list">
                <li class="member">
                    <span class="name">Mattia Saba</span>
                    <span class="title">Co-Founder</span>
                    <span class="desc">Lead Mission Analyst</span>
                </li>
                <li class="member">
                    <span class="name">Andrea Ruscica</span>
                    <span class="title">Co-Founder</span>
                    <span class="desc">Recovery Lead Engineer</span>
                </li>
                <li class="member">
                    <span class="name">Andrea Troglia</span>
                    <span class="title">Co-Founder</span>
                    <span class="desc">Recovery Lead Engineer</span>
                </li>
            </ul>
            <h3 class="division-name">Aerostructures</h3>
            <ul class="no-list">
                <li class="member">
                    <div class="socials">
                        <IconLink icon="LinkedIn" id="francesca-bracaglia-a1000b214" />
                    </div>
                    <span class="name">Francesca Bracaglia</span>
                    <span class="desc">Aerostructures Lead Engineer</span>
                </li>
                <li class="member">
                    <div class="socials">
                        <IconLink icon="LinkedIn" id="luca-loiodice-01l10" />
                    </div>
                    <span class="name">Luca Loiodice</span>
                    <span class="desc">CAD & Additive Manufacturing Lead Engineer</span>
                </li>
                <li class="member">
                    <div class="socials">
                        <IconLink icon="LinkedIn" id="fpunzi" />
                    </div>
                    <span class="name">Flora Punzi</span>
                    <span class="desc">Senior FEA Analyst & Counselor</span>
                </li>
                <li class="member">
                    <span class="name">Marco Prodan</span>
                    <span class="desc">Manufacturing Specialist</span>
                </li>
                <li class="member">
                    <div class="socials">
                        <IconLink icon="LinkedIn" id="edoardoviglietti" />
                    </div>
                    <span class="name">Edoardo Viglietti</span>
                    <span class="desc">Structural Engineer & FEM Analyst</span>
                </li>
                <li class="member">
                    <span class="name">Pierantonio Bertuccio</span>
                    <span class="desc">FEM Analyst</span>
                </li>
                <li class="member">
                    <div class="socials">
                        <!-- <a href="https://mohammad-yousefi.jimdosite.com/" target="_blank" rel="noreferrer" aria-label="Personal website" title="Personal website">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48">
                                <use href="#extern-icon"></use>
                            </svg>
                        </a> -->
                        <IconLink icon="LinkedIn" id="mohammad-yousefi-1804ba189" />
                    </div>
                    <span class="name">Mohammad Yousefi</span>
                    <span class="desc">Structural Engineer</span>
                <li class="member">
                    <span class="name">Ulvi Aydin</span>
                    <span class="desc">Manufacturing Engineer</span>
                </li>
                <li class="member">
                    <span class="name">Gianmatteo Migliore</span>
                    <span class="desc">FEM Analyst</span>
                </li>
            </ul>
        </div>
    </section>
</main>

<style lang="scss">
    .cols {
        column-width: 25ch;
        column-gap: 4rem;
        column-rule: dashed 2px var(--fg-1);
    }
    .division-name {
        font-size: var(--fs-60);
        margin-bottom: 1rem;
        * + & {
            margin-top: 2.5rem;
        }
    }
    .member {
        break-inside: avoid;
        background-color: var(--bg-1);
        padding: .4rem .7rem;
        border-radius: .45rem;
        margin-bottom: 1rem;

        .name {
            font-size: 1.1rem;
            font-weight: 500;
            display: block;
            margin-right: -.3rem;
        }
        .desc {
            color: var(--fg-1);
            font-style: italic;
        }
        .title {
            color: var(--accent-text);
            &::after {
                content: " | ";
                color: var(--fg-1);
            }
    }
    }
    .socials {
        float: right;
        position: relative;
        right: -.3rem;
        display: flex;
        margin-left: -.22rem;
        margin-right: -.22rem;

        --icon-clr: #b3b3b3b3;
        --icon-size: 1.8rem;
        --icon-hover: var(--fg-1);
    }
</style>