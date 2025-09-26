<script>
    import "@fontsource/plus-jakarta-sans/400-italic.css";
    import Launch from "../Cavour/Launch.svelte";
    import Models from "./Models.svelte";
    let model_view = "showcase";

    const euroc = Object.values(
        import.meta.glob("/src/img/ves/euroc24/*.{jpg,png}", {
            as: "url",
            eager: true,
        })
    );
    const irec = Object.values(
        import.meta.glob("/src/img/ves/irec2025/*.{JPG,png}", {
            as: "url",
            eager: true,
        })
    );
</script>

<svelte:head>
    <title>Project Vittorio Emanuele II - PoliTo Rocket Team</title>
    <meta
        name="description"
        content="VES is our latest single-stage, solid propelled rocket, with a variable target altitude and mission profile. Discover all its characteristics here!"
    />
</svelte:head>

<h1>Project Vittorio Emanuele II</h1>
<section class="cols">
    <div>
        <h2 class="smudge">Name and design</h2>
        <p>
            Vittorio Emanuele II, code name VES, is the second rocketry project
            undertaken by the team.
        </p>
        <p>
            The project is named after the first King of Italy, born in Turin in
            1820. Vittorio Emanuele II, who, although already King of Sardinia
            and Piedmont, fought tirelessly for a united Italy.
        </p>
        <p>
            His unwavering determination to never settle for mere
            accomplishments and always strive for greater heights serves as an
            inspiration for the second rocket of the Founding Fathers series.
        </p>
        <p>
            The PoliTo Rocket Team is propelled by this spirit, refusing to rest
            on the laurels of the remarkable achievements of the Cavour Project.
            Instead, it developed another rocket specifically designed for
            international competitions with increasingly challenging objectives.
        </p>
    </div>

    <div>
        <h2 class="smudge">Technical characteristics</h2>
        <p>
            VES is a single-stage rocket featuring a solid Commercial
            Off-The-Shelf (COTS) motor and an internal diameter of 130mm. A key
            technical objective of the project is to enable the team to gain
            hands-on experience in developing Student Researched and Developed
            (SRAD) onboard systems. These include the ejection recovery system,
            flight computer, ground station, and, in particular, an airbrakes
            system.
        </p>
        <p>
            Two versions of the rocket with radical changes have been iterated:
            the Mark I developed during the 2023-24 academic year and launched
            at the 2024 European Rocketry Challenge with a 3000m apogee, and the
            supersonic Mark II version, developed during the 2024-25 academic
            year for the International Rocket Engineering Competition 2025 with
            a target apogee of 9000m.
        </p>
        <p>
            A configuration of the VES rocket was designed for a test campaign
            conducted at the ASK 't Harde range in the Netherlands, scheduled a
            month before the European competition. Conducted in collaboration
            with the Delft Aerospace Rocket Engineering team, the campaign
            provided invaluable guidance and facilitated the resolution of
            critical design flaws.
        </p>
    </div>
</section>
<section>
    <h2 class="center-lg">
        <div class="smudge">
            Versions
            <div class="switch" aria-hidden="true">
                <label>
                    <span>showcase</span>
                    <input
                        type="radio"
                        name="model-view"
                        value="showcase"
                        bind:group={model_view}
                    />
                    <svg
                        width="800"
                        height="800"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.25 5.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM7 6a1 1 0 0 0 0 2h12a1 1 0 1 0 0-2H7zm0 5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H7zm-1 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm-4-5a1.25 1.25 0 1 1 2.5 0A1.25 1.25 0 0 1 2 12zm1.25 3.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"
                            fill="var(--clr)"
                        /></svg
                    >
                </label>
                <label>
                    <span>table</span>
                    <input
                        type="radio"
                        name="model-view"
                        value="table"
                        bind:group={model_view}
                    />
                    <svg
                        width="800"
                        height="800"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        ><path
                            id="Vector"
                            d="M4 15V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H12M4 15V9M4 15H12M4 9V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H12M4 9H12M12 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V9M12 4V9M12 9V15M12 9H20M12 15V20M12 15H20M12 20H16.8036C17.9215 20 18.4805 20 18.9079 19.7822C19.2842 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V15M20 15V9"
                            stroke="var(--clr)"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        /></svg
                    >
                </label>
            </div>
        </div>
    </h2>
    <Models view={model_view} />
</section>
<section>
    <h2 class="m-top center-lg">
        <span class="smudge">Launch History</span>
    </h2>
    <Launch name="European Rocketry Challenge" date="2024-10-12" images={euroc}>
        <p>
            VES Mark I was launched on October 12 at 14:19 (UTC+1) at Santa
            Margarida Military Camp, Portugal. The flight was nominal, reaching
            an apogee of approximately 3160m with a maximum speed of 259m/s and
            a maximum acceleration of 8.5G.
        </p>
        <p>
            The drogue parachute deployed, reducing the rocket’s descent
            velocity to about 30m/s. The main parachute separation was
            successful; the parachute did not have enough time to fully inflate
            due to a failure in the drogue system’s shock cord. As a result, the
            rocket split into two sections for recovery, each equipped with a
            parachute. VES returned home with some minor airframe damage but was
            ready for future launches.
        </p>
        <p>
            The project secured 6th place out of 25 European teams participating
            and finished second in its flight category.
        </p>
    </Launch>
    <section>
        <Launch
            name="International Rocket Engineering Competition"
            date="2025-07-13"
            images={irec}
        >
            <p>
                On July 13th, 2025, in Midland, Texas, VES Mark II attempted its supersonic launch targeting 9000m. Unfortunately, a CATO (Catastrophic Aborted Take-Off) occurred after ignition due to a malfunctioning COTS motor, likely stemming from a manufacturer's defect.
            </p>
            <p>
                VES used a COTS O5500X-PS motor from Aerotech. The failure was traced to the epoxy used to seal the motor’s forward closure, which didn't contain internal pressure, ejecting it together with a grain of propellant into the rocket’s interior. This damaged the upper motor retention flange and the section of the body tube it was attached to. Despite the failure, most of the rocket was recovered in excellent condition, including the avionics, recovery systems, parachutes, nose cone, upper body tube, and mechanical interfaces.
            </p>
            <p>
                The solidity of the project was still demonstrated by an exceptional 1st place in the "Design and Build Quality" category, as well as a 16th place for the project's Technical Report submitted, out of over 140 participating universities.
            </p>
        </Launch>
    </section>
</section>

<style>
    .cols > div {
        margin-bottom: 4rem;
    }

    @media (min-width: 50rem) {
        .cols {
            column-count: 2;
            column-gap: 3.5rem;
        }
        .cols > * {
            break-inside: avoid;
        }
    }

    h2.center-lg {
        font-size: var(--fs-70);
    }
    @media (min-width: 50rem) {
        .cols {
            column-count: 2;
            column-gap: 3.5rem;
        }
        .cols > * {
            break-inside: avoid;
        }
        h2.center-lg {
            display: flex;
            justify-content: center;
        }
    }

    @media (max-width: 70rem) {
        :global(.scrollable) {
            overflow-x: scroll;
            padding-left: var(--pad);
            padding-right: var(--pad);
            padding-bottom: var(--pad);
            position: relative;
            left: calc(-1 * var(--pad));
            width: calc(100% + 2 * var(--pad));

            scrollbar-width: thin;
            scrollbar-color: var(--bg-1) var(--bg-0);
        }
        :global(.scrollable)::-webkit-scrollbar {
            height: 0.5rem;
        }
        :global(.scrollable)::-webkit-scrollbar-track {
            background-color: transparent;
            margin-left: 2rem;
            margin-right: 2rem;
        }
        :global(.scrollable)::-webkit-scrollbar-thumb {
            background-color: #8883;
            border-radius: 0.25rem;
        }
    }

    .switch {
        display: inline-flex;
        background-color: var(--bg-1);
        border-radius: 0.7rem;
        padding: 0.15rem;
        vertical-align: middle;
        margin-left: 0.5ch;
    }
    .switch label {
        padding: 0.1rem;
        cursor: pointer;
    }
    .switch span,
    .switch input {
        position: absolute;
        transform: scale(0);
        opacity: 0;
    }
    .switch svg {
        display: block;
        width: 2rem;
        height: 2rem;
        --clr: var(--fg-1);
    }
    .switch input:checked + svg {
        --clr: var(--accent-fig);
        opacity: 0.8;
    }
</style>
