<script lang="ts">
    import { browser } from "$app/environment";

    const query = browser ? window.matchMedia("(min-width: 70rem)") : null;

    function getElementIndex(element: HTMLElement) {
        return Array.prototype.indexOf.call(
            element.parentNode!.children,
            element
        );
    }

    function move(node: HTMLElement, order: number) {
        if (!browser) return;
        const parent = node.parentElement!;
        const original = getElementIndex(node);
        if (query!.matches)
            parent.insertBefore(node, parent.children.item(order));
        query!.addEventListener("change", ev => {
            parent.insertBefore(
                node,
                parent.children.item(ev.matches ? order : original + 1)
            );
        });
    }
</script>

<svelte:head>
    <title>Project Efesto - PoliTo Rocket Team</title>
    <meta
        name="description"
        content="Efesto is our fully reusable liquid rocket engine: discover its characteristics, and the technology behind it!"
    />
</svelte:head>

<h1>Project Efesto</h1>

<div class="split">
    <div>
        <h2><span>Context: </span>New Space Economy</h2>
        <p>
            The potential of Space 4.0 exploration for Italy, Europe and the
            world is enormous. Europe and the world are facing major global
            challenges which require equally global responses and imply
            responsibilities.
        </p>
        <p>
            According to ESA definitions, Space 4.0 era is a time when space is
            evolving from being the preserve of the governments of a few
            Spacefaring nations to a situation in which there is an increased
            number of diverse space actors around the world, including the
            emergence of private companies, participation with academia,
            industry and citizens, digitisation, and global interaction.
        </p>
    </div>
    <div>
        <h2>
            <span>Objective: </span>Improve the Italian heritage of Liquid
            Rocket Engines
        </h2>
        <p>
            Project Efesto aims to contribute in a strategic, dynamic, and
            innovative way to the New Space Economy, playing a role in the
            European mission: to shape the development of Italy’s space
            capability, and ensure that investment in space continues to deliver
            benefits to the citizens of Europe
        </p>
        <p>
            Liquid propulsion is a relatively new concept for Italy, originated
            thanks to AVIO's M10 engine development. In order to provide support
            to the Italian liquid rocket engine initiative, Polito Rocket Team's
            Project Efesto is developing the first Italian pressure-fed Liquid
            Rocket Engine.
        </p>
    </div>
</div>

<h2 class="m-top" style="margin-bottom: 1.8rem;">Characteristics</h2>
<ul>
    <li class="card">
        <h3 class="smudge">Reusability</h3>
        <p>
            Liquid rocket engines are known as one-mission engines. Nowadays, to
            reduce space pollution and cost per kg to orbit, important
            industries are focusing on the reusability of the first rocket
            stages. To pursue this goal, liquid rocket propulsion is one of the
            key factors.
        </p>
        <p>
            PoliTo Rocket Team has chosen to fully develop a regenerative liquid
            rocket engine, in order to propose a small and reusable propulsion
            system for the first stages of a general micro launcher.
        </p>
    </li>
    <li class="card">
        <h3 class="smudge">New Materials</h3>
        <p>
            The thrust chamber of a high-performance bi-propellant liquid rocket
            engine is a critical component of the launch vehicle because it is
            designed to operate in some of the most severe conditions seen in
            engineering practice.
        </p>
        <p>
            The requirement of reducing the temperature of the walls exposed to
            the hot gas can be met with high-thermal conductivity copper alloys,
            while mechanical stiffness is achieved by using high-strength steel
            or nickel alloys.
        </p>
        <p>
            Because the stress-strain behavior of a regeneratively-cooled thrust
            chamber is directly correlated with its temperature behavior, it is
            of primary importance to select the correct alloys.
        </p>
        <p>
            Thanks to the Politecnico R&D partnership, the Efesto Engine will be
            designed with some of the most recent copper-based metal matrix
            composite materials.
        </p>
    </li>
    <li class="card" use:move={1}>
        <h3 class="smudge">New technologies</h3>
        <p>
            Nowadays, manufacturing processes are playing an important role in
            the global space industry, with a particular emphasis for space
            propulsion.
        </p>
        <p>
            The Liquid Propulsion Project aims to produce the whole engine
            assembly via additive manufacturing. Thanks to this process, new
            geometries and potential mass optimization can be investigated,
            leading to novel design opportunities, cost reductions, and
            technological advancements.
        </p>
    </li>
    <li class="card">
        <h3 class="smudge">Static fire qualification program</h3>
        <p>
            The Efesto engine under development is being designed to be tested
            with a new test bench facility. Qualifications and integrations will
            be performed to meet mission requirements and targets
        </p>
    </li>
    <li class="card">
        <h3 class="smudge">Simplicity</h3>
        <p>
            The regenerative pressure-fed engine cycle can provide great results
            with more straightforward design efforts in comparison to more
            complex engine cycles, such as e-pump-fed or open engine cycles
        </p>
    </li>
</ul>

<h2
    class="m-top"
    style="margin-bottom: 1.8rem; text-align:center; margin-top: 4em"
>
    Specs
</h2>

<div>
    <table>
        <tr>
            <th scope="col">Oxidizer</th>
            <th scope="col">Fuel</th>
            <th scope="col">Cycle</th>
            <th scope="col">Targer Thrust</th>
        </tr>
        <tr>
            <td>Nitrous Oxide (N2O)</td>
            <td>Ethanol</td>
            <td>Pressure-fed</td>
            <td>5 kN</td>
        </tr>
    </table>
</div>

<h2
    class="m-top"
    style="margin-bottom: 1.8rem; text-align:center; margin-top: 4em"
>
    Systems
</h2>
<p>
    The purpose of the Efesto project is to develop the liquid system needed for
    the first bi-liquid project of PoliTo Rocket Team. The project is working on
    5 different lines:
</p>
<div>
    <table class="sys-tbl">
        <tr>
            <th scope="col">TCA</th>
            <th scope="col">Thrust Chambe Assembly</th>
        </tr>
        <tr>
            <td>EC</td>
            <td>Engine Cycle</td>
        </tr>
        <tr>
            <td>LSA</td>
            <td>Liquid System Architecture</td>
        </tr>
        <tr>
            <td>TB</td>
            <td>Test Bench</td>
        </tr>
        <tr>
            <td>ECS</td>
            <td>Engine Control Strategy</td>
        </tr>
    </table>
</div>

<h2
    class="m-top"
    style="margin-bottom: 1.8rem; text-align:center; margin-top: 4em"
>
    Thrust Chamber Assembly
</h2>
<div class="two-column">
    <div>
        <p>
            The Thrust Chamber Assembly (TCA) division is responsible for the
            development of the components of the thrust chamber. Innovative
            additive manufacturing techniques allow us to push the limits of
            manufacturing in order to improve performances and reduce costs. The
            actual design of the engine includes two main components, the
            injector head and the combustion chamber, joined by a bolted
            connection. The design of the injector head has been presented at
            the 26th ESA PAC Symposium on European Rocket and Balloon Programmes
            and Related Research in Luzern on May 2024
        </p>
    </div>
    <img src="/img/ESA_PAC.png" alt="ESA PAC Symposium logo" class="float" />
</div>
<img src="/img/EFS.jpg" alt="Efesto Injector Head" class="float" />
<h2
    class="m-top"
    style="margin-bottom: 1.8rem; text-align:center; margin-top: 4em"
>
    Engine Cycle
</h2>
<div class="two-column">
    <p>
        The engine cycle division is developing a proprietary tool, named
        RocketForge, to manage all the engine aspects. An in-house calibrated
        software is essential in order to fast improve with the engine design
        and to quickly provide new reliable engine configurations. The division
        is also responsible for the engine cycle definition and for the support
        to the test data processing.
    </p>

    <img src="/img/RF.jpg" alt="RocketForge tool main page" class="float" />
</div>
<h2
    class="m-top"
    style="margin-bottom: 1.8rem; text-align:center; margin-top: 4em"
>
    Engine Control Strategy
</h2>
<p>
    Power is nothing without control, therefore the ECS division works on the
    development of the hardware/software system to control the valves and obtain
    the sensor readings needed to precisely control the valve system.
</p>

<style lang="scss">
    h2 {
        position: relative;
        padding-top: 1.2rem;
    }
    h2 > span {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 1.2rem;
        color: var(--accent-text);
    }
    ul {
        list-style: none;
        column-width: 25ch;
        column-gap: 2rem;
    }
    .card {
        margin-bottom: 2rem;
        break-inside: avoid;
    }
    h3 {
        margin-bottom: 0.5rem;
    }
    .split {
        margin-top: max(7rem, var(--pad));
        display: grid;
        grid-template-rows: auto auto;
        gap: var(--space);
    }
    @media (min-width: 50rem) {
        .split {
            grid-template-columns: 1fr 1fr;
        }
    }

    table {
        border-collapse: collapse;
        font-size: 1.1rem;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2rem;
    }
    th,
    td {
        padding: 0.6em 1em;
        border: 1px solid #8883;
    }
    th {
        text-align: left;
        font-weight: 500;
        width: max-content;
        white-space: nowrap;
    }
    td {
        text-align: center;
    }
    .sys-tbl th,
    .sys-tbl td {
        /* padding: 1em 2em; */
        padding-right: 10em;
        border: 1px solid #8883;
        text-align: left;
    }

    $contour: 1px;
    img.float {
        display: block;
        max-width: 100%;
        margin-bottom: 1rem;
        filter: drop-shadow($contour $contour 0 var(--light-bg-0))
            drop-shadow($contour (-$contour) 0 var(--light-bg-0))
            drop-shadow(-$contour $contour 0 var(--light-bg-0))
            drop-shadow(-$contour (-$contour) 0 var(--light-bg-0));
    }

    .two-column {
        display: flex;
        justify-content: center;
    }
    .two-column p {
        margin: 2em 3em;
    }
</style>
