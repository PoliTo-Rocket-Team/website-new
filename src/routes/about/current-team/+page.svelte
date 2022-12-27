<script>
    import Executive from "./Executive.svelte";
</script>

<main>
    <div>
        <h1>The Team</h1>
        <p class="stop-growth">At the beginning of the 2022-2023 Academic Year, the Team is composed of more than 70 between undergraduate students, graduate students, and PhD candidates. Most of the Team members come from the aerospace, mechanical, electronic and computer engineering courses of Politecnico di Torino.</p>
    </div>
    <section aria-labelledby="executive">
        <h2 id="executive">Executive</h2>
        <ul class="executive-list">
            <Executive name="Fabio Meloni" role="President" mail="president@politorocketteam.it" img="Meloni.jpg" linkedin="fabioski01">
                <p>Fabio has been the Team's President since its foundation in 2022, during his second year of undergraduate studies, and he is now a third-year Bachelor's student in Aerospace Engineering at Politecnico di Torino.</p>
                <p>During his presidency, Fabio expanded the Team from 6 to 75+ members, involving undergraduate, graduate, and doctoral students. Besides directing the Team, he manages the relations with academia, private partners, and other institutions.</p>
                <p>Fabio is also the Chief Engineering of the Cavour Project, where he leads a subteam of 50+ students to research and develop Cavour, a reusable experimental suborbital rocket with multiple apogee and payload configurations.</p>
            </Executive>
            <Executive name="Elena Dilorenzo" role="Chief Operating Officer" mail="elena.dilorenzo@studenti.polito.it" linkedin="elena-dilorenzo-294b5a20b" img="Dilorenzo.jpg">
                <p>Elena is responsible for the Operations Subteam, which is in charge of logistics, outreach, and mantaining relations with the Team's partners. In addition, her work focuses on achieving the operational excellence in the Team's technical and non-technical projects.</p>
                <p>She is now at her last year of the Master's in Aerospace Engineering at Politecnico di Torino, specializing in the Aeromechanical and Systems field.</p>
                <p>Elena was previously the president of AESA Torino - the Aerospace Engineering Students’ Association of Politecnico - a non-profit student group composed of 500+ members.</p>
            </Executive>
            <Executive name="Luca Santoro" role="Chief Technologist and Head of Strategy" mail="luca.santoro@polito.it" linkedin="luca-santoro-b16699151" img="Santoro.jpg">
                <p>Luca graduated in Mechanical Engineering at Politecnico di Torino, where he is now a PhD student at the Department of Mechanical and Aerospace Engineering. Immediately after the foundation of the Team, he provided the human resources, a strong strategy, and technical support to the project.</p>
                <p>As Chief Technologist, he is in charge of making decision for the technological infrastructure, in order to align it with the organization's goals.</p>
                <p>As Head of Strategy, he is in charge of all decisions concerning short and long term strategy, management, partnerships, cost-reduction, strategic initiatives and developing the Team's strategy and vision. The Head of Strategy is also the chairman of the Team's Advisor's board.</p>
            </Executive>
        </ul>
    </section>
</main>

<style>
    p {
        margin-top: 0.7rem;
    }
    @media (min-width: 70rem) {
        .executive-list {
            display: grid;
            grid-template-columns: repeat(3,1fr);
            gap: 2rem;
        }
    }
</style>