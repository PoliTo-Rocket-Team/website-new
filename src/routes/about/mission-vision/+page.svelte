<script>
    import "@fontsource/plus-jakarta-sans/400-italic.css";
</script>

<svelte:head>
    <title>Mission & Vision - PoliTo Rocket Team</title>
    <meta name="description" content="The Mission and Vision of the PoliTo Rocket Team" />
</svelte:head>

<main>
    <h1>Mission & Vision</h1>
    <div class="text-cols">
        <p>With government space agencies and private companies planning multiple missions to the Moon and Mars in the forthcoming years, the rate of innovation in space-related technologies is steadily rising. Italy, since the inception of the space age, has always had a leading role, initially acting as a valuable partner of the major world space actors and, over the years, establishing a space industry that covers the whole space supply chain, with excellent results in all application sectors, also thanks to the academic and research community and the support of the government and the Italian Space Agency.</p>
        <p>PoliTo Rocket Team’s mission is to contribute to Italy's space innovation, with the study of next-generation space exploration technologies in a student-driven context. The Team wants to provide students with the possibility to complete the theoretical knowledge learnt in the classroom with projects that involve considerable challenges and solid results. That is why we believe that Politecnico students must have a solid understanding of the challenges associated with space exploration and the systems involved in missiles, rockets, and spacecraft. With both technical and non-technical roles available, there are numerous prospects for students of all backgrounds to develop their skills and passion for space exploration. In addition, the Team wants to provide an environment where students from different courses and levels of experience can undergo academic and personal growth.</p>
        <p>Furthermore, PoliTo Rocket Team is dedicated to providing Politecnico di Torino students and researchers with the ability to design, build and launch their own experimental rockets. Launching sounding rockets also provides an excellent opportunity to carry out otherwise impossible technical, scientific and medical research.</p>
        <p>By starting simple with our first rocket, <a href="https://www.politorocketteam.it/projects">Cavour</a>, we will validate our flight simulations and learn about rocket dynamics. In the future, with the evolution of Cavour's design, the Team will conceive a reusable rocket with payload capacity, capable of conducting scientific experiments inexpensively and reliably.</p>
        <ul>
            <li>We are constantly focused on progress.</li>
            <li>We believe in the simple, not the complex.</li>
            <li>We are engineers: if it works...</li>
        </ul>
        <p class="signature">Fabio Meloni, 2022</p>
    </div>
</main>

<style>
    .text-cols {
        column-width: 35ch;
        column-gap: 4rem;
    }
    p, 
    ul {
        margin-bottom: 1rem;
    }
    /* p::first-letter {
        font-size: 3rem;
        font-weight: 600;
        float: left;
        margin-right: .2ch;
    } */
    ul {
        list-style: decimal-leading-zero;
        list-style-position: inside;
    }
    li::marker {
        color: var(--accent-fig);
        font-weight: 500;
    }
    .signature {
        margin-top: 2.5rem;
        font-style: italic;
        text-align: right;
    }
</style>