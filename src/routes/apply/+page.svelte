<script lang="ts">
    import "@fontsource/anonymous-pro/400.css";
    import Position from "./Position.svelte";
    import FAQs from "./FAQs.svelte";
</script>

<svelte:head>
    <title>Apply - PoliTo Rocket Team</title>
</svelte:head>

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
        <Position role="Hardware/Embedded Software Engineer" subteam="Cavour" division="Avionics" code="CVR-AVN-001">
            <h4>Description</h4>
            <ul>
                <li>Design, prototyping, manufacture and testing of printed circuit boards and electrical circuits</li>
                <li>Design, development and testing of on-board software</li>
            </ul>
            <h4>Desireable skills</h4>
            <ul>
                <li>Knowledge in circuit theory and electronics</li>
                <li>Prior experience with embedded systems and microcontrollers</li>
                <li>Familiarity with PCB CAD software (e.g. KiCAD)</li>
                <li>Good programming skills in C/C++</li>
                <li>Good interdisciplinary communication skills</li>
            </ul>
            <a class="btn" href="https://forms.gle/JtC9MrEwYkUEYk7t5" target="_blank" rel="noreferrer">Apply</a>
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
    <section aria-labelledby="faqs">
        <h2 id="faqs" class="section-title"><abbr title="Frequently Asked Questions">FAQs</abbr></h2>
        <FAQs />
        <!-- <FAQ question="How can I join the Team?">
            <p>If there are <em>open positions</em>, there is the possibility of joining the Team. More details can be found by reading the open positions' descriptions and apply procedures.</p>
            <p>The general recruitment process was held at the beginning of the academic year. The next general recruitment will probably happen at the beginning of the next academic year: look out for any updates on our social medias and on our website.</p>
        </FAQ>
        <FAQ question="Are there any requirements for joining the team?">
            <p>Candidates must have <em>time to dedicate to our projects</em>, and an intermediate <em>English</em> proficiency level is preferred. We accept all PoliTo students regardless of program and year (undergraduate, graduate and PhD). Students are not required to have any prior experience or knowledge.</p>
        </FAQ>
        <FAQ question="Can I join as a *first-year* student?">
            <p>Yes, and we encourage you to! Theoretical knowledge and previous experience are appreciated, but they are not everything. Young and motivated students can learn and acquire real experience while working on our projects.</p>
            <p>As of Fall 2022, more than half of the Team's members are Bachelor's students, and many of them are first-year students!</p>
        </FAQ>
        <FAQ question="Can I join the team as an *international student*?">
            <p>Of course! As of Fall 2022, more than 20% of the Team's members are international students. The selection process is the same for international and Italian students. As for any other student, good English knowledge is preferred. Italian language proficiency is not required, but appreciated.</p>
        </FAQ>
        <FAQ question="Can I join the Team with a low level English proficiency?">
            <p>The Team's official language is English, and it is preferred that candidates have at least an intermediate language proficiency. Candidates with advanced English proficiency will have an advantage. Exceptions can be made for candidates with a particular set of skills or with important prior experience.</p>
        </FAQ>
        <FAQ question="How much *time* do I need to put into the team every week?">
            <p>There is not a rule for how much time you need to put in. There can be weeks where you will not work at all, but there will be days where you will need to work many hours. The Team is young and does not have a large number of members, so it is expected that the members of the Team put a considerable amount of work into our projects.</p>
            <p>In general, we expect that students can provide <em>at the very least 6 hours</em> of work for the Team per week. Exceptions can be made for particular positions, such as those which require particular skills or prior experience.</p>
        </FAQ>
        <FAQ question="Can I join the Team if I am *not* an engineering student?">
            <p>Yes, the Team accepts students coming from <em>all programs</em> offered at Politecnico. There are many positions available in the Team, especially in the Operations subteam, which are suited also for students coming from non-engineering programs.</p>
        </FAQ>
        <FAQ question="Do you recruit only aerospace engineering students?">
            <p>Of course not! Even if as of now the majority of the Team's members come from the aerospace engineering program (around 68% as of Fall 2022), some of the Team's positions are suited for students of the computer science, electronic, mechanical, management, or energy engineering programs, as well as many others.</p>
            <p>Furthermore, due to competition, the acceptance rate for aerospace engineering students is probably going to be lower than the one for students coming from other programs. This means that if you do not study aerospace engineering, you might face less competition in your application for certain positions than your aerospace engineering colleagues.</p>
        </FAQ>
        <FAQ question="What is the *acceptance rate* onto the team?">
            <p>Fall 2022 was the first general recruitment of the Team and we had an acceptance rate of around 15%. As much as we would love to accept every application, the Team can not manage the work of hundreds of members. Do not let this discourage you: we are always looking for motivated and talented young students.</p>
        </FAQ>
        <FAQ question="Do you recruit at the beginning of the 2nd semester?">
            <p>We do not know yet, but <em>it is unlikely</em>. Training new members takes time, and if students join in the winter semester they will start working towards the end of the academic year, which is not ideal.</p>
            <p>Students could be recruited at the beginning of the 2nd semester if they possess a particular set of skills or experience which matches the Team's needs.</p>
        </FAQ>
        <FAQ question="Can I join the Team if I am *not* a Politecnico di Torino student, or if I am a high school student?">
            <p>PoliTo Rocket Team is a student team which gets its resources from the Dept. of Mechanical and Aerospace engineering of Politecnico di Torino. For this reason, we can't accept students outside Politecnico. However, it is possible to cooperate and work together on some particular projects. If are working on a rocketry-related project and you want to collaborate with us, contact us.</p>
        </FAQ> -->
    </section>
</main>

<style lang="scss">
    @use "./consts.scss" as *;
    
    section {
        max-width: 75ch;
        margin-left: auto;
        margin-right: auto;
    }

    .code-label {
        font-family: 'Anonymous Pro', monospace;
        width: 11ch;
        max-width: 11ch;
        min-width: 11ch;
    }
    
    $text-margin: 0.5rem;
    .positions {
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
        margin: 2rem auto;
    }
    .btn:focus {
        text-decoration: underline;
    }
    @media (min-width: 50rem) {
        h2 {text-align: center;}
        .position-labels {
            padding: $details-pad-y $details-pad-x;
            display: grid;
            grid-template-columns: $details-columns;
            grid-auto-flow: dense;
            align-items: center;
            column-gap: $gap;
        }
    }
</style>