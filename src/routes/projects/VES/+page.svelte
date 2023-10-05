<script>
    import "@fontsource/plus-jakarta-sans/400-italic.css";
</script>

<svelte:head>
    <title>Project Vittorio Emanuele II - PoliTo Rocket Team</title>
    <meta name="description" content="rocket specifically designed for the international competitions and with more challenging objectives" />
</svelte:head>



    <h1>Project Vittorio Emanuele II</h1>
    <section class="cols">
        <div>
            <h2 class="smudge">Name and design</h2>
            <p>Vittorio Emanuele II, code name VES, is the second rocketry project undertaken by our team.</p>
            <p>The project is named after the first King of Italy, born in Turin in 1820. Vittorio Emanuele II, although already King of Sardinia and Piedmont, fought tirelessly for a united Italy.</p>
            <p>His unwavering determination to never settle for mere accomplishments and always strive for greater heights serves as an inspiration for the second rocket of the Founding Fathers series.</p>
            <p>The PoliTo Rocket Team is propelled by this spirit, refusing to rest on the laurels of the remarkable achievements of the Cavour Project. Instead develops another rocket specifically designed for the international competitions and with more challenging objectives.</p>
        </div>

        <div>
            <h2 class="smudge">Technical characteristics and goals</h2>
            <p>VES is a single-stage rocket equipped with a solid Commercial Off-The-Shelf (COTS) motor and the following technical characteristics:</p>
            <ul class="list">
                <li>Target apogee of 10000 m </li>
                <li>Able to sustain Supersonic regime</li>
                <li>Integrated and innovative Airbrakes system</li>
                <li>CO2-based recovery system</li>
                <li>Advanced Avionics and Cubesat-type Payload subsystem</li>
            </ul>
            <p>The ultimate goal will be the participation to EuRoC 2024 in the 9 km COTS Category.</p>

            <p>The development of the VES will pave the way for any project of the team, and in particular for the future integration of the Efesto engine within a launch vehicle.</p>
            <p>With these prospects, the Vittorio Emanuele II Project stands out as one of the most stimulating student-led projects in the field of rocketry.</p>
        </div>
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


</style>