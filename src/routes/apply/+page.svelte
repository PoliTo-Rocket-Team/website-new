<script lang="ts">
    import "@fontsource/anonymous-pro/400.css";
    import Position from "./Position.svelte";
</script>

<main>
    <h1>Apply</h1>
    <div class="stop-growth">
        <hr class="subtle">
        <p>Get Involved! PoliTo Rocket Team has numerous positions available for undergraduate and graduate students of Politecnico di Torino. Here you can find our Open Positions and some Frequently Asked Questions about our recruitment process or about the Team. If you still have some questions, don’t hesitate to reach out to us on social media or at <a href="mailto:recruitment@politorocketteam.it">recruitment@politorocketteam.it</a></p>
    </div>
    <section aria-labelledby="positions" class="positions">
        <h2 id="positions">Open positions</h2>
        <div class="position-labels on-lg" aria-hidden="true">
            <span>Role</span>
            <span>Subteam</span>
            <span>Division</span>
            <span>Group</span>
            <div class="code-label"><span>Code</span></div>
        </div>
        <Position role="Web Developer" subteam="Operations" division="IT" code="OPS-ITC-001">
            <h4>Description</h4>
            <p>The role of the web developer is to manage the website in all its aspects, in order to present the team at the best. In particular, you will work with web technologies (SCSS, TypeScript, Svelte) to design, create, and mantain all the website sections, based on the team directives.</p>
            <p>Short-mid term tasks would be:</p>
            <ul>
                <li>Migrate to SvelteKit</li>
                <li>Improve the projects page</li>
                <li>Create page transition effects</li>
                <li>Enhance the overall user experience and interactions</li>
            </ul>
            <p>A relatively big, possible future project could be the development of a backend that handles recruitment, renders pages based on information from (admin) lead engineers, and possibly receives and stores data collected during flights. </p>
            <h4>Required skills</h4>
            <ul>
                <li>Proficiency in CSS</li>
                <li>good knowledge of modern JavaScript (ECMAScript 2018)</li>
            </ul>
            <h4>Preferred knowledge</h4>
            <ul>
                <li>SCSS</li>
                <li>TypeScript</li>
                <li>Svelte</li>
                <li>Git</li>
            </ul>
            <h4>Desired knowledge</h4>
            <ul>
                <li>Vite</li>
                <li>Node.js</li>
                <li>SvelteKit</li>
                <li>Three.js library</li>
                <li>Accessible Rich Internet Applications (ARIA)</li>
            </ul>
            <a class="btn" href="https://forms.gle/arcXaamqyvxy4FYE7" target="_blank" rel="noreferrer">Apply</a>
        </Position>
        <Position role="Computer/Electronic Engineer" subteam="Efesto" division="Engine Control Strategy" code="EFS-ECS-001">
            <h4>Main tasks</h4>
            <ul>
                <li>Coding and designing the interfaces between software and hardware</li>
                <li>Developing the main engine control software</li>
                <li>Designing an integration system of sensors</li>
                <li>Testing and validating signals from sensors</li>
            </ul>
            
            <h4>Required skills</h4>
            <ul>
                <li>Programming skills</li>
                <li>Strong electronic knowledge</li>
                <li>Strong knowledge of theory of signals</li>
            </ul>
            <a class="btn" href="https://docs.google.com/forms/d/e/1FAIpQLSewYXBL7c3bV02y85bSRkuNjvNRHVfNVW3mHETOLfCgt9fwZQ/viewform?usp=sf_link" target="_blank" rel="noreferrer">Apply</a>
        </Position>
        <Position role="Graphics Designer" subteam="Operations" division="Media" code="OPS-MDA-001" >
            <h4>Description & Responsibilities</h4>
            <p>As a Graphic Designer, you will be in charge of designing the Team’s mission patches and logos, and help design the external coating of the Team’s rockets. You will design social media posts and website UI & UX in tight collaboration with photographers, video makers, rendering specialists, and web developers, leveraging modern design styles and patterns.</p>
            <h4>Skills & Experience (recommended, not required)</h4>
            <ul>
                <li>Knowledge of prototyping softwares and graphics softwares</li>
                <li>Attention to details and being up to date on the latest trends</li>
                <li>Collaboration with other IT & Media members</li>
                <li>Experience in design motion graphics (charts, lower-thirds, GIFs, Animations, animated social media ads)</li>
                <li>Proficiency with Adobe Creative Suite Professional products,such as Illustrator, Photoshop, After Effects, Premiere, and InDesign, or similar</li>
                <li>Intermediate English writing skills</li>
                <li>Knowledge of Google Suite</li>
            </ul>
            <a class="btn" href="https://forms.gle/YkbJ4NzrXGN8r1xc9" target="_blank" rel="noreferrer">Apply</a>
        </Position>
        <Position role="Social Media Manager" subteam="Operations" division="Media" code="OPS-MDA-002" >
            <h4>Description & Responsibilities</h4>
            <p>PoliTo Rocket Team is looking for one or more Social Media Manager(s), who will have the responsibility to maintain and enhance the team’s image by implementing social media platforms’ content strategies.</p>
            <p>This role will be required to run advertising campaigns and drive engagement by creating high-quality original content. The manager(s) should also oversee our community by managing interactions across all platforms.</p>
            <p>The Social Media Manager(s) will have to collaborate with the Sponsoring Managers and the Outreach Team.</p>
            <h4>Skills & Experience (recommended, not required)</h4>
            <ul>
                <li>Knowledge of the main social media platforms used by the Team (Instagram, LinkedIn, Twitter) and of additional social media platform to expand the Team's presence</li>
                <li>Professionalism and responsibility</li>
                <li>Attention to details and being up to date on the latest trends</li>
                <li>Previous experience in the media management and previous experience with paid content promotions</li>
                <li>Experience in design motion graphics (charts, lower-thirds, GIFs, Animations, animated social media ads)</li>
                <li>Proficiency with graphic design software such as Canva, Illustrator, Photoshop, After Effects, Premiere, and InDesign, or similar</li>
                <li>Intermediate/Advanced English writing skills</li>
                <li>Knowledge of Google Suite</li>
            </ul>
            <a class="btn" href="https://forms.gle/bzTseETDcFmjXek86" target="_blank" rel="noreferrer">Apply</a>
        </Position>
    </section>
</main>

<style lang="scss">
    @use "./consts.scss" as *;
    
    .position-labels {
        padding: $details-pad-y $details-pad-x;
        display: grid;
        grid-template-columns: $details-columns;
        grid-auto-flow: dense;
        align-items: center;
        column-gap: $gap;
    }
    .code-label {
        font-family: 'Anonymous Pro', monospace;
        width: 11ch;
        max-width: 11ch;
        min-width: 11ch;
    }
    
    $text-margin: 0.5rem;
    .positions {
        max-width: 75ch;
        margin-left: auto;
        margin-right: auto;

        h4:not(:first-child) { margin-top: 3*$text-margin; }
        h4 { margin-bottom: $text-margin; }
        p + ul { margin-top: 0.5*$text-margin; }
        ul + p, p + p { margin-top: $text-margin; }
        ul { padding-left: 2ch;}
    }
    .btn {
        display: block;
        padding: .4em .7em;
        border: 2px solid var(--accent-fig);
        width: fit-content;
        text-decoration: none;
        font-weight: 600;
        margin-top: 1rem;
    }
    .btn:focus {
        text-decoration: underline;
    }
    @media (min-width: 50rem) {
        h2 {text-align: center;}
    }
</style>