<script lang="ts">
    // import "@fontsource/anonymous-pro/700.css";
    import Models from "./Models.svelte";
    let model_view = "showcase";
    import Launch from "./Launch.svelte";
    
    // https://gist.github.com/Pigamo/6ad9d769a23bbdc07a9ef6f7226cbb55
    const test = Object.values(import.meta.glob("/src/img/cavour/test/*.{jpg,png}", {as: "url", eager: true})); 
    const spac = Object.values(import.meta.glob("/src/img/cavour/spac23/*.{jpg,png}", {as: "url", eager: true})); 
    
    // import { MiddleScreenPool, whenVisible } from "$lib/visibility";
    // import { onDestroy } from "svelte";
    // const pool = new MiddleScreenPool((el, focus) => el.classList.toggle("focus",focus), 4/9);
    // onDestroy(() => pool.clear());
    // function trackNearest(node: HTMLElement) {
    //     return whenVisible("0px 0px 0px 0px", node, visible => pool.run(visible));
    // }
</script>

<svelte:head>
    <title>Project Cavour - PoliTo Rocket Team</title>
    <meta name="description" content="Cavour is a single-stage, 2.25m long, solid propelled rocket, with a variable target altitude and mission profile. Discover all its characteristics here!" />
</svelte:head>

<h1>Project Cavour</h1>
<section class="cols">
    <div>
        <h2 class="smudge">Name and design</h2>
        <p>Camillo Benso, Count of Cavour, was one of the leading figures of the Italian Unification and the main promoter of Italy’s industrial and scientific development. He was born in Turin in 1810, and died in Turin in 1861, being the first prime minister of Italy. PoliTo Rocket Team's first project is named after him.</p>
        <p>In accord with the Team's <a href="/about/mission-vision">Mission & Vision</a>, Cavour's design is simple and pragmatic, thought to draw the way for future projects. It is also the first rocket of the <em>Founding Fathers</em> series.</p>
    </div>
    <div>
        <h2 class="m-top smudge">Current and Future plans</h2>
        <p>Cavour has been completely designed, constructed, ground-tested, and launched. Two twin prototypes have been built and the functionality of their integrated systems has been validated.</p>
        <p>In October 2023 Cavour will fly again in Portugal, representing for the first time ever the Politecnico di Torino at the European Rocketry Challenge, during its 2023 edition.</p>
        <p>Project Cavour will evolve towards a future reusable rocket with a larger payload capacity, capable of conducting scientific experiments inexpensively and reliably at an even higher precise apogee.</p>
    </div>
    <div>
        <h2 class="m-top smudge">Technical characteristics</h2>
        <p>Cavour is a single stage rocket with a solid COTS motor and an internal diameter of 100mm (3.94in), with a variable target altitude.</p>
        <p>It is composed of two body tubes and a coupler, and of four compartments plus the nose cone. The structure is made of lightweight composite materials, and all its internal components are high-performance 3D-printed carbon-reinforced polymers. Starting from the bottom, the rocket’s compartments are:</p>
        <ul class="list">
            <li>Motor bay, holding the COTS solid motor;</li>
            <li>Avionics bay with the electronics and the telemetry system;</li>
            <li>Payload bay, containing with the mission’s scientific payload;</li>
            <li>Recovery bay, which contains the parachutes and the other recovery components;</li>
            <li>Nose cone.</li>
        </ul>
    </div>
</section>
<section>
    <ul class="cards scrollable">
        <li class="card">
            <h2 class="smudge">Cost-effective <br>and durable</h2> 
            <p>Cavour is the first rocket of the Team, and it must be proven that with the least possible budget the group is capable of designing and manufacturing a durable rocket which can sustain a high-powered flight while fulfilling the mission objectives.</p>
        </li>
        <li class="card">
            <h2 class="smudge">Reconfigurable</h2>
            <p>The Cavour Rocket structure design is modular, able to mount different motors, of different classes, lengths and diameters. Multiple versions of the rocket can be launched with different mission objectives, such as different apogee targets, payload launch and deployment, or system testing.</p>
        </li>
        <li class="card">
            <h2 class="smudge">Reusable</h2>
            <p>Using a drogue chute and a main parachute, the rocket is designed to land without inflicting any damage to its airframe or to the environment. This allows the rocket to perform multiple launches without inflicting any damage to its airframe or to the environment, so that the rocket is capable of being flown again without any major repair after just some refueling.</p>
        </li>
    </ul>
</section>
<section>
    <h2 class="center-lg">
        <div class="smudge">
            Models
            <div class="switch" aria-hidden="true">
                <label>
                    <span>showcase</span>
                    <input type="radio" name="model-view" value="showcase" bind:group={model_view}>
                    <svg width="800" height="800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.25 5.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zM7 6a1 1 0 0 0 0 2h12a1 1 0 1 0 0-2H7zm0 5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2H7zm-1 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm-4-5a1.25 1.25 0 1 1 2.5 0A1.25 1.25 0 0 1 2 12zm1.25 3.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" fill="var(--clr)"/></svg>
                </label>
                <label>
                    <span>table</span>
                    <input type="radio" name="model-view" value="table" bind:group={model_view}>
                    <svg width="800" height="800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="Vector" d="M4 15V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H12M4 15V9M4 15H12M4 9V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H12M4 9H12M12 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V9M12 4V9M12 9V15M12 9H20M12 15V20M12 15H20M12 20H16.8036C17.9215 20 18.4805 20 18.9079 19.7822C19.2842 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V15M20 15V9" stroke="var(--clr)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
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
    <Launch name="Test Launch" date="2023-4-29" images={test}>
        <p>On Saturday, April 29th, our Cavour rocket was successfully launched for the first time from a launch site in Bavaria, Germany.</p>
        <p>Due to the launch site apogee limitation, Cavour had to be launched with a small and less powerful K-class COTS CTI solid motor, that provided a maximum thrust of 1120.8N. The rocket reached an apogee of 1331.2m, staying under the launch site vertical limit. Cavour flew with a maximum velocity of 162.7 m/s, around Mach 0.5, with a maximum boost acceleration of 9.79G.</p>
        <p>The drogue pilot parachute was deployed at apogee, while the main parachute was deployed at high altitudes earlier than anticipated probably due to the malfunctioning of a COTS TD-2 tether, which will be investigated. The rocket descended to the ground with a velocity of 6.9 m/s and landed softly on the German green grass. Cavour landed at around 1.2km from the launch site and was found in perfect condition with all airframe components intact: it is now ready to be reused.</p>
    </Launch>
    <Launch name="2023 Spaceport America Cup" date="2023-6-22" images={spac}>
        <p>On Thursday, June 22nd, with moderate wind conditions, the Cavour rocket was launched from launchpad B2 of the Vertical Launch Area of Spaceport America, the world's first commercial spaceport located in the Jornada del Muerto desert, approximately 90km from Las Cruces.</p>
        <p>The launch was a success, and the rocket reached an apogee of 3142.8m AGL, with a maximum velocity of around 295.4 m/s and a maximum boost acceleration of 17.3G. The apogee was very close to the target apogee (3048m) and to the simulated one. The flight proceeded under nominal conditions, except for an early deployment of the main parachute. This minor malfunction in the recovery subsystem simply drifted the rocket away and did not compromise the integrity of the rocket in any way, as  it can be reused for a new launch.</p>
        <p>Despite having only one year of experience and being at the first participation in a competition, the Team ranked 20th overall out of the 119 participating universities and 13th in the 10k ft apogee AGL with COTS propulsion category</p>
        <p>Project Cavour won the Dr. Gil Moore Award for Innovation, which recognises a team whose project includes one or more genuinely “novel” or “inventive” features. Project Cavour won this award thanks to the presented extended abstract "3D-printed multilayered fins for flutter suppression", which the judging panel stated stands to revolutionise the industry of rocketry.</p>
    </Launch>
</section>

<style>
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
    .cards {
        list-style: none;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2.5rem;
    }
    .card {
        min-width: 25ch;
    }
    @media (max-width: 70rem) {
        :global(.scrollable) {
            overflow-x: scroll;
            padding-left: var(--pad);
            padding-right: var(--pad);
            padding-bottom: var(--pad);
            position: relative;
            left: calc(-1 * var(--pad));
            width: calc(100% + 2*var(--pad));

            scrollbar-width: thin;
            scrollbar-color: var(--bg-1) var(--bg-0);
        }
        :global(.scrollable)::-webkit-scrollbar {
            height: .5rem;
        }
        :global(.scrollable)::-webkit-scrollbar-track {
            background-color: transparent;
            margin-left: 2rem;
            margin-right: 2rem;
        }
        :global(.scrollable)::-webkit-scrollbar-thumb {
            background-color: #8883;
            border-radius: .25rem;
        }
    }

    .switch {
        display: inline-flex;
        background-color: var(--bg-1);
        border-radius: .7rem;
        padding: .15rem;
        vertical-align: middle;
        margin-left: 0.5ch;
    }
    .switch label {
        padding: .1rem;
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