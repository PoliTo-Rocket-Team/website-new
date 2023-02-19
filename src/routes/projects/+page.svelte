<main>
    <div class="padded">
        <h1>Projects</h1>
        <div class="stop-growth">
            <hr class="subtle">
            <p>It's in the Team's goals to design and manufacture each year a new experimental rocket. In the 2022-2023 academic year, PoliTo Rocket Team has two active technical projects: Project Cavour and the Project Efesto. Project Cavour stands for the design and creation of PRT's first rocket, while Project Efesto concerns the research and development of a liquid rocket engine. In the upcoming months, the Team aims to start new projects to upgrade and modernize its technological capabilities, such as thrust vector control and active-fin control.</p>
        </div>
    </div>
    <div class="grid">
        <article>
            <img data-render="cavour" src="img/Render_Cavour.png" alt="Render of the Cavout rocket">
            <h2>Project Cavour</h2>
            <p>PRT's first rocket</p>
            <a href="projects/cavour">Explore</a>
        </article>
        <article>
            <h2>Project Efesto</h2>
            <p>Liquid rocket engine</p>
            <a href="projects/efesto">Explore</a>
        </article>
    </div>
</main>


<style lang="scss">
    .grid {
        margin-top: 6rem;
        display: flex;
    }
    $size: 25rem;
    article {
        background-color: var(--bg-1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        min-height: $size;
        max-height: $size;
        border-radius: .5rem;
        position: relative;
        overflow: hidden;
    }
    article > :not(img) {
        z-index: 1;
    }
    h2 {
        margin-bottom: 0;
    }
    a {
        display: block;
        margin-top: 4rem;
        font-size: 1.3rem;
        font-weight: 500;
        text-decoration: none;
        padding: .4rem .8rem;
        border-radius: .2rem;
        background-color: rgba(var(--bg-1-rgb), 0.6);
        backdrop-filter: blur(2px);
        box-shadow: 0 0 10px rgba(var(--bg-1-rgb), 0.6);
    }

    [data-render] {
        z-index: 0;
        position: absolute;
    }
    [data-render="cavour"] {
        bottom: 0;
        left: 0;
        width: 4rem;
        height: auto;
        transform-origin: bottom;
        transform: rotate(45deg) translateY(5rem);
    }

    @media (max-width: 50rem) {
        .grid {
            flex-direction: column;
            align-items: center;
        }
        article {
            margin-bottom: 4rem;
            width: $size;
            max-width: 100%;
        }
    }
    @media (min-width: 50rem) {
        .grid {
            flex-wrap: wrap;
        }
        article {
            margin: 2rem;
            max-width: $size;
            min-width: 18rem;
            flex-grow: 1;
        }
    }
</style>