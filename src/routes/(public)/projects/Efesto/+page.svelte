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
            Project Efesto is developing the first Italian pressure-fed LOX
            Methane Liquid Rocket Engine.
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
    <li class="card">
        <h3 class="smudge">Green</h3>
        <p>
            LOX/bio-CH4 is the optimum compromise for power requirements,
            environment care, and modern trend
        </p>
    </li>
</ul>

<style>
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
</style>
