<!-- <script>
    import "@fontsource/anonymous-pro/700.css";
</script> -->

<svelte:head>
    <title>Project Cavour - PoliTo Rocket Team</title>
</svelte:head>

<h1>Project Cavour</h1>
<section class="cols">
    <div>
        <h2>Name and design</h2>
        <p>Camillo Benso, Count of Cavour, was one of the leading figures of the Italian Unification and the main promoter of Italy’s industrial and scientific development. He was born in Turin in 1810, and died in Turin in 1861, being the first prime minister of Italy. PoliTo Rocket Team's first project is named after him.</p>
        <p>In accord with the Team's <a href="/about/mission-vision">Mission & Vision</a>, Cavour's design is simple and pragmatic, thought to draw the way for future projects. It is also the first rocket of the <em>Founding Fathers</em> series.</p>
    </div>
    <div>
        <h2 class="m-top">Technical characteristics</h2>
        <p>Cavour is a single-stage, 2.25m long, solid propelled rocket, with a variable target altitude and mission profile. It is composed of three compartments:</p>
        <ul class="list">
            <li>Motor bay, holding the commercial solid motor;</li>
            <li>Avionics bay with the electronics and the telemetry system;</li>
            <li>Recovery bay, which contains the parachutes and the other recovery components.</li>
        </ul>    
        <p>The airframe has an internal diameter of 100mm and makes extended use of novel composites materials and advanced additive-manufactured carbon-reinforced polymers.</p>
    </div>
    <div>
        <h2 class="m-top">Current state</h2>
        <p>Cavour has completed its design phase and the Team has completed the construction of the first prototype. The mission objectives of Cavour’s first launch are the validation of flight simulations and the testing of the rocket's integrated systems.</p>
        <p>At the end of June 2023, Cavour will be launched in New Mexico’s desert during the Spaceport America Cup 2023, with a 4kg-heavy scientific payload. Project Cavour will evolve towards a future reusable rocket with a larger payload capacity, capable of conducting scientific experiments inexpensively and reliably at a precise predetermined apogee.</p>
    </div>
</section>
<section>
    <ul class="cards">
        <li>
            <h2>Cost-effective <br>and durable</h2> 
            <p>It is the first rocket of the Team, and it must be proven that with the least possible budget the group is capable of designing and manufacturing a durable rocket which can sustain a high-powered flight while fulfilling the mission objectives.</p>
        </li>
        <li>
            <h2>Reconfigurable</h2>
            <p>The Cavour Rocket structure design is modular, able to mount different motors, of different classes, lengths and diameters. Multiple versions of the rocket can be launched with different mission objectives, such as different apogee targets, payload launch and deployment, or system testing.</p>
        </li>
        <li>
            <h2>Reusable</h2>
            <p>Using a drogue chute and a main parachute, the rocket is designed to land without inflicting any damage to its airframe or to the environment. This allows the rocket to perform multiple launches without developing major structural damage, managing to be cheaper to operate and maintain, while maintaining the capability of a high-powered flight.</p>
        </li>
    </ul>
</section>
<section>
    <h2>The numbers</h2>
    <!-- <table>
        <tr>
            <td class="no-border"></td>
            <th scope="col">CVR 100-75-3</th>
            <th scope="col">CVR 100-75-4</th>
            <th scope="col">CVR 100-75-54</th>
        </tr>
        <tr>
            <th scope="row">Diameter</th>
            <td colspan="3">104mm</td>
        </tr>
        <tr>
            <th scope="row">Lenght</th>
            <td>2167mm</td>
            <td colspan="2">2347mm</td>
        </tr>
        <tr>
            <th scope="row">Dry mass (no motor case)</th>
            <td>8.2kg</td>
            <td>8.7kg</td>
            <td>5.5kg</td>
        </tr>
        <tr>
            <th scope="row">Wet mass</th>
            <td>11.8kg</td>
            <td>12.3kg</td>
            <td>6.9kg</td>
        </tr>
        <tr>
            <th scope="row">Motor manufacturer</th>
            <td colspan="2">Cesaroni Pro75</td>
            <td>Cesaroni Pro54</td>
        </tr>
        <tr>
            <th scope="row">Motor model</th>
            <td colspan="2">L1350</td>
            <td>K940</td>
        </tr>
        <tr>
            <th scope="row">Liftoff Thrust-Weight ratio</th>
            <td>12.3</td>
            <td>11.8</td>
            <td>14.9</td>
        </tr>
        <tr>
            <th scope="row">Target apogee</th>
            <td>3000m</td>
            <td>&gt;3000mm</td>
            <td>1500m</td>
        </tr>
    </table> -->
    <table>
        <tr>
            <td class="no-border"></td>
            <th scope="col">CVR 100-75-3</th>
            <th scope="col">CVR 100-75-4</th>
            <th scope="col">CVR 100-75-54</th>
            <th scope="col">Unit</th>
        </tr>
        <tr>
            <th scope="row">Diameter</th>
            <td colspan="3">104</td>
            <td rowspan="2">mm</td>
        </tr>
        <tr>
            <th scope="row">Lenght</th>
            <td>2167</td>
            <td colspan="2">2347</td>
        </tr>
        <tr>
            <th scope="row">Dry mass (no motor case)</th>
            <td>8.2</td>
            <td>8.7</td>
            <td>5.5</td>
            <td rowspan="2">kg</td>
        </tr>
        <tr>
            <th scope="row">Wet mass</th>
            <td>11.8</td>
            <td>12.3</td>
            <td>6.9</td>
        </tr>
        <tr>
            <th scope="row">Motor manufacturer</th>
            <td colspan="2">Cesaroni Pro75</td>
            <td>Cesaroni Pro54</td>
            <td rowspan="3"><span style="opacity: 0.4;">/</span></td>
        </tr>
        <tr>
            <th scope="row">Motor model</th>
            <td colspan="2">L1350</td>
            <td>K940</td>
        </tr>
        <tr>
            <th scope="row">Liftoff Thrust-Weight ratio</th>
            <td>12.3</td>
            <td>11.8</td>
            <td>14.9</td>
        </tr>
        <tr>
            <th scope="row">Target apogee</th>
            <td>3000</td>
            <td>&gt;3000</td>
            <td>1500</td>
            <td>m</td>
        </tr>
    </table>
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
    .cards > * {
        background-color: var(--bg-1);
        padding: 1rem 1rem;
        border-radius: .8rem;
        min-width: 25ch;
    }
    @media (max-width: 70rem) {
        .cards {
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
        .cards::-webkit-scrollbar {
            height: .5rem;
        }
        .cards::-webkit-scrollbar-track {
            background-color: transparent;
            margin-left: 2rem;
            margin-right: 2rem;
        }
        .cards::-webkit-scrollbar-thumb {
            background-color: #8883;
            border-radius: .25rem;
        }
    }
    h2 {
        font-size: 1.8rem;
        margin-bottom: .7rem;
        position: relative;
        padding-top: 8px;
    }
    h2::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--accent-fig);
        width: 2.5rem;
        height: 4px;
        border-radius: 2px;
    }
    table {
        border-collapse: collapse;
        font-size: 1.1rem;
    }
    th, td {
        padding: .125em .45em;
        border: 1px solid #8883;
    }
    th {
        text-align: right;
        font-weight: 500;
    }
    td { text-align: center; }
    .no-border {
        border: none;
    }
    /* .code {
        font-family: 'Anonymous Pro', monospace;
        color: var(--accent-text);
        font-size: 1.1em;
        font-weight: 700;
    } */
</style>