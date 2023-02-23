<svelte:head>
    <title>Projects - PoliTo Rocket Team</title>
</svelte:head>

<main>
    <div class="padded">
        <h1>Projects</h1>
        <div class="stop-growth">
            <hr class="subtle">
            <p>It's in the Team's goals to design and manufacture each year a new experimental rocket. In the 2022-2023 academic year, PoliTo Rocket Team has two active technical projects: Project Cavour and the Project Efesto. Project Cavour stands for the design and creation of PRT's first rocket, while Project Efesto concerns the research and development of a liquid rocket engine. In the upcoming months, the Team aims to start new projects to upgrade and modernize its technological capabilities, such as thrust vector control and active-fin control.</p>
        </div>
    </div>
    <article class="with-rocket">
        <h2>Project Cavour</h2>
        <div class="rocket"><img src="img/Render_Cavour.png" alt="Render of the Cavour Rocket" width="429" height="3628" loading="lazy"></div>
        <div class="main">
            <p>Camillo Benso, Count of Cavour, was one of the leading figures of the Italian Unification and the main promoter of Italy’s industrial and scientific development. He was born in Turin in 1810, and died in Turin in 1861, being the first prime minister of Italy. PoliTo Rocket Team's first project is named after him.</p>
            <p>In accord with the Team's <a href="https://www.politorocketteam.it/about/mission">Mission & Vision</a>, Cavour's design is simple and pragmatic, thought to draw the way for future projects. It is also the first rocket of the <em>Founding Fathers</em> series.</p>
            <p>Cavour is a single-stage, 2.25m long, solid propelled rocket, with a variable target altitude and mission profile. It is composed of three compartments, the motor bay, which holds the commercial solid motor, the avionics bay, which includes the electronics and the telemetry system, and the recovery bay, which contains the parachutes and the other recovery components. The airframe has an internal diameter of 100mm and makes extended use of novel composites materials and advanced additive-manufactured carbon-reinforced polymers.</p>
            <p>Cavour has completed its design phase and the Team has completed the construction of the first prototype. The mission objectives of Cavour’s first launch are the validation of flight simulations and the testing of the rocket's integrated systems. At the end of June 2023, Cavour will be launched in New Mexico’s desert during the Spaceport America Cup 2023, with a 4kg-heavy scientific payload. Project Cavour will evolve towards a future reusable rocket with a larger payload capacity, capable of conducting scientific experiments inexpensively and reliably at a precise predetermined apogee.</p>
        </div>
        <aside>
            <h3>Characteristics</h3>
            <!-- <p>Made from both COTS and in-house parts, Cavour is designed to be:</p> -->
            <ol>
                <li>Cost-effective and durable: It is the first rocket of the Team, and it must be proven that with the least possible budget the group is capable of designing and manufacturing a durable rocket which can sustain a high-powered flight while fulfilling the mission objectives;</li>
                <li>Reconfigurable: The Cavour Rocket structure design is modular, able to mount different motors, of different classes, different lengths (ranging from around 300mm to 700mm) and different diameters. It will be possible to launch the rocket with COTS motors of 38mm, 54mm and 75mm diameters. It could be possible to perform a 98mm permanent motor integration. Multiple versions of the rocket can be launched with different mission objectives, such as different apogee targets, payload launch and deployment, or system testing;</li>
                <li>Reusable: The rocket is designed to safely descend with the drogue chute, after reaching the apogee, with a planned velocity of around 25 m/s, and to deploy the main parachute at the designated altitude. It is planned to land with a velocity of approximately 6 m/s without inflicting any damage to its airframe or to the environment, so that the rocket is capable of being flown again without any major repair after just some refueling. By being a fully reusable rocket, it is capable of performing multiple launches without developing major structural damage, managing to be cheaper to operate and maintain, while maintaining the capability of a high-powered flight.</li>
            </ol>
        </aside>
    </article>
    <article>
        <h2>Project Efesto</h2>
        <div class="two-cols">
            <h3>Context: the New Space Economy</h3>
            <p>The potential of Space 4.0 exploration for Italy, Europe and the world is enormous. Europe and the world are facing major global challenges which require equally global responses and imply responsibilities. According to ESA definitions, Space 4.0 era is a time when space is evolving from being the preserve of the governments of a few Spacefaring nations to a situation in which there is an increased number of diverse space actors around the world, including the emergence of private companies, participation with academia, industry and citizens, digitisation, and global interaction.</p>
            <h3>Objective: to improve the Italian heritage of Liquid Rocket Engines</h3>
            <p>Project Efesto aims to contribute in a strategic, dynamic, and innovative way to the New Space Economy, playing a role in the European mission: to shape the development of Italy’s space capability, and ensure that investment in space continues to deliver benefits to the citizens of Europe.</p>
            <p>Liquid propulsion is a relatively new concept for Italy, originated thanks to AVIO's M10 engine development. In order to provide support to the Italian liquid rocket engine initiative, Polito Rocket Team's Project Efesto is developing the first Italian pressure-fed LOX Methane Liquid Rocket Engine.</p>
            <h3>Characteristics</h3>
            <ol>
                <li>Reusability: liquid rocket engines are known as one-mission engines. Nowadays, to reduce space pollution and cost per kg to orbit, important industries are focusing on the reusability of the first rocket stages. To persue this goal, liquid rocket propulsion is one of the key factors. PoliTo Rocket Team has chosen to fully develop a regenerative liquid rocket engine, in order to propose a small and reusable propulsion system for the first stages of a general micro launcher;</li>
                <li>New Materials: The thrust chamber of a high-performance bi-propellant iquid rocket engine is a critical component of the launch vehicle because it is designed to operate in some of the most severe conditions seen in engineering practice. The requirement of reducing the temperature of the walls exposed to the hot gas can be met with high-thermal conductivity copper alloys, while mechanical stiffness is achieved by using high-strength steel or nickel alloys. Because the stress–strain behaviour of a regeneratively-cooled thrust chamber is directly correlated with its temperature behaviour, it is of primary importance to select the correct alloys. Thanks to the Politecnico R&D partnership, the Efesto Engine will be designed with some of the most recent copper-based metal matrix composite materials;</li>
                <li>New technologies: nowadays, manufacturing processes are playing an important role in the global space industry, with a particular emphasis for space propulsion. The Liquid Propulsion Project aims to produce the whole engine assembly via additive manufacturing. Thanks to this process, new geometries and potential mass optimization can be investigated, leading to novel design opportunities, cost reductions, and technological advancements;</li>
                <li>Static fire qualification program: the Efesto engine under development is being designed to be tested with a new test bench facility. Qualifications and integrations will be performed to meet mission requirements and targets;</li>
                <li>Simplicity: the regenerative pressure-fed engine cycle can provide great results with more straightforward design efforts in comparison to more complex engine cycles, such as e-pump-fed or open engine cycles;</li>
                <li>Green: LOX/bio-CH4 is the optimum compromise for power requirements, environment care, and modern trend;</li>
            </ol>
        </div>
    </article>
</main>


<style lang="scss">
    img {
        max-width: 100%;
        height: auto;
    }
    p + p {
        margin-top: .9rem;
    }

    h2 {
        margin-bottom: .5em;
    }
    h3 {
        font-size: var(--fs-60);
        margin-bottom: .5em;
    }
    h3:not(:first-child) {
        margin-top: 1em;
    }
    article {
        margin-top: 8rem;
    }
    ol {
        padding-left: 2ch;
    }
    li {
        margin-top: 1rem;
    }
    li::marker {
        color: var(--accent-text);
        font-weight: 700;
    }
    $rocket-width: 5rem;
    .with-rocket {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas: 
            "title title"
            "main img"
            "aside aside";
        column-gap: .7rem;

        h2 { grid-area: title; }
        .main { grid-area: main; }
        aside { grid-area: aside; }
        .rocket { grid-area: img; }
        img {
            position: sticky;
            top: 15vh;
            max-height: 70vh;
            max-width: 4rem;
        }
    }
    @media (min-width: 50rem) {
        .with-rocket {
            grid-template-areas: 
                "title title"
                "main img"
                "aside img";
            column-gap: 2rem;
            
            .rocket {
                position: relative;
                width: $rocket-width;
            }
            img {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 100%;
                height: auto;
                max-width: $rocket-width;
            }
        }
        .two-cols {
            column-count: 2;
            column-gap: 3rem;
            
            p, li {
                break-inside: avoid;
            }
        }
    }

    @media (min-width: 70rem) {
        article {
            max-width: 100ch;
            margin-left: auto;
            margin-right: auto;
        }
        .with-rocket {
            grid-template-columns: minmax(25ch, 1fr) $rocket-width minmax(25ch, 1fr);
            grid-template-areas: 
                "title title title"
                "main img aside";
            h3 { margin-top: 0; }
        }
    }
</style>