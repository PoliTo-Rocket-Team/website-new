<script lang="ts">
    import Project from "./Project.svelte";
</script>

<h1>Projects</h1>
<div class="grid">
    <Project name="Cavour" desc="The team's first rocket" href="projects/Cavour">
        <img class="cavour" src="/img/Render_Cavour.png" alt="Rendering of Cavour">
    </Project>
    <Project name="Efesto" desc="Liquid propulsion engine" href="projects/Efesto" />
</div>

<style>
    .grid {
        margin-top: 8rem;
        display: grid;
        gap: 3.5rem;
    }

    @media (min-width: 50rem) {
        .grid {
            grid-template-columns: 1fr 1fr;
        }
    }
    .cavour {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 100%;
        transform-origin: center;
        transform: translate(1rem, -6rem) rotate(35deg);
    }
</style>