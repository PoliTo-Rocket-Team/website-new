<script>
    // import "@fontsource/anonymous-pro/700.css";
    import Models from "./Models.svelte";
    let model_view = "showcase";
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
        <h2 class="m-top smudge">Technical characteristics</h2>
        <p>Cavour is a single-stage, 2.25m long, solid propelled rocket, with a variable target altitude and mission profile. It is composed of three compartments:</p>
        <ul class="list">
            <li>Motor bay, holding the COTS solid motor;</li>
            <li>Avionics bay with the electronics and the telemetry system;</li>
            <li>Recovery bay, which contains the parachutes and the other recovery components.</li>
        </ul>    
        <p>The airframe has an internal diameter of 100mm and makes extended use of novel composites materials and advanced additive-manufactured carbon-reinforced polymers.</p>
    </div>
    <div>
        <h2 class="m-top smudge">Current state</h2>
        <p>Cavour has completed its design and construction phases. Two twin prototypes have been built and are being ground tested. The mission objectives of Cavour’s first launch are the validation of flight simulations and the testing of the rocket's integrated systems.</p>
        <p>At the end of June 2023, Cavour will be launched in New Mexico’s desert during the Spaceport America Cup 2023, with a 4kg-heavy scientific payload. Project Cavour will evolve towards a future reusable rocket with a larger payload capacity, capable of conducting scientific experiments inexpensively and reliably at a precise predetermined apogee.</p>
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
            <p>Using a drogue chute and a main parachute, the rocket is designed to land without inflicting any damage to its airframe or to the environment. This allows the rocket to perform multiple launches without developing major structural damage, managing to be cheaper to operate and maintain, while maintaining the capability of a high-powered flight.</p>
        </li>
    </ul>
</section>
<section>
    <h2 class="smudge">
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
    </h2>
    <Models view={model_view} />
</section>

<style>
    @media (min-width: 50rem) {
        .cols {
            column-count: 2;
            column-gap: 3.5rem;
        }
        .cols > * {
            break-inside: avoid;
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