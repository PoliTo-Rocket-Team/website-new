<script>
    import "@fontsource/plus-jakarta-sans/400-italic.css";
    import Launch from "../Cavour/Launch.svelte"
    import Models from "./Models.svelte";
    let model_view = "showcase";

    const euroc = Object.values(
        import.meta.glob("/src/img/ves/euroc24/*.{jpg,png}", {
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
            1820. Vittorio Emanuele II, although already King of Sardinia and
            Piedmont, fought tirelessly for a united Italy.
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
            VES is a single-stage rocket featuring a solid Commercial Off-The-Shelf (COTS) motor and an internal diameter of 130 mm (5.11 in). A key technical objective of the project is to enable the team to gain hands-on experience in developing Student Researched and Developed (SRAD) onboard systems. These include the ejection recovery system, flight computer, ground station, and, in particular, an airbrakes system.
        </p>
        <p>
            The ultimate goal will be a launch targeting an apogee of 9km, sustaining supersonic speeds. 
        </p>

        <!-- <ul class="list">
            <li>Target apogee of 10000 m</li>
            <li>Able to sustain Supersonic regime</li>
            <li>Integrated and innovative Airbrakes system</li>
            <li>
                CO2-based <abbr title="Student Researched and Developed"
                    >SRAD</abbr
                > recovery system
            </li>
            <li>Advanced Avionics and Cubesat-type Payload subsystem</li>
        </ul>
        <p>
            The ultimate goal will be the participation to EuRoC 2024 in the 9
            km COTS Category.
        </p>

        <p>
            The development of the VES will pave the way for any project of the
            team, and in particular for the future integration of the Efesto
            engine within a launch vehicle.
        </p>
        <p>
            With these prospects, the Vittorio Emanuele II Project stands out as
            one of the most stimulating student-led projects in the field of
            rocketry.
        </p> -->
    </div>
</section>
<section>
<Launch name="European Rocketry Challenge" date="2024-10-12" images={euroc}>
    <p>
        VES was launched on October 12 at 14:19 (UTC+1) at Santa Margarida Military Camp, Portugal. The flight was nominal, reaching an apogee of approximately 3160m with a maximum speed of 259m/s and a maximum acceleration of 8.5G.
    </p>
    <p>
        The drogue parachute deployed, reducing the rocket’s descent velocity to about 30m/s. The main parachute separation was successful; the parachute did not have enough time to fully inflate due to a failure in the drogue system’s shock cord. As a result, the rocket split into two sections for recovery, each equipped with a parachute. VES returned home with some minor airframe damage but was ready for future launches.
    </p>
    <p>
        Due to the shortage of commercial solid motors, VES was only able to participate in the competition in the solid-3km COTS category. The rocket secured 6th place out of 25 European teams participating and finished second in its flight category. 
    </p>
    <p>
        A month before the competition, the VES project underwent a test campaign at the ASK 't Harde range in the Netherlands. Conducted in collaboration with the Delft Aerospace Rocket Engineering team, the campaign provided invaluable guidance and facilitated the resolution of critical design flaws.
    </p>
</Launch>
<section>
    <h2 class="center-lg">
        <div class="smudge">
            Models
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
