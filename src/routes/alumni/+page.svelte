<script>
    import Alumni from "./Alumni.svelte";
    import { leaders, cavour, efesto } from "./data";
    import DefineIcons from "$lib/icons/DefineIcons.svelte";

    const beginning = Date.parse("2022-6-7");
</script>

<main>
    <div class="padded">
        <h1>Alumni</h1>
        <hr class="subtle stop-growth">
    </div>

    <div class="grid-container">
        
        <div class="time title">Time</div>
        <div class="time-content content ">time-content</div>

        <h2 class="title">Team Leader</h2>
        <div class="content">
            {#each leaders as data, i}
                <Alumni {data} start={data.start} end={leaders[i+1]?.start} />
            {/each}
        </div>

        <h2 class="title span-rows">Chief Engineers</h2>
        <div class="rows span-rows">
            <div class="content">
                <h3>Cavour Chief Engineers</h3>
                {#each cavour as data, i}
                    <Alumni {data} start={data.start} end={cavour[i+1]?.start} />
                {/each}
            </div>
            <div class="content">
                <h3>Efesto Chief Engineers</h3>
                {#each efesto as data, i}
                    <Alumni {data} start={data.start} end={efesto[i+1]?.start} />
                {/each}
            </div>
        </div>

        <h2 class="title span-rows" style:--rows={3}>Notable students</h2>
        <div class="rows span-rows" style:--rows={3}>
            <div class="content">notable-students-content-1</div>
            <div class="content">notable-students-content-2</div>
            <div class="content">notable-students-content-3</div>
        </div>
    </div>

</main>

<DefineIcons />


<style>
    main {
        padding: 0;
    }
    .padded {
        padding: var(--pad);
        padding-top: max(6.5rem, var(--pad));
    }

    .grid-container {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr 1fr 1fr 1fr 1fr 1fr;

        max-width: 100%;
        overflow-x: scroll;
        /* outline: 2px solid rgb(85, 0, 255); */
        /* border-radius: 25px; */
        /* padding: 0; */
        padding-bottom: 2rem;
        scrollbar-width: thin;
        
    }
    h2 {
        margin-bottom: 0;
    }
    h3 {
        position: absolute;
        transform: scale(0);
        opacity: 0;
    }
    .title {
        z-index: 2;
        position: sticky;
        left: 0;
        writing-mode: vertical-rl;
        white-space: nowrap;
        border-radius: 5px;
        text-align: center;
        font-size: var(--fs-60);
        font-weight: 500;
        padding: 1.2rem .4rem;
        transform: rotate(180deg);
    }

    .span-rows {
        grid-row: span var(--rows, 2);
    }
    .rows {
        display: grid;
        grid-template-columns: 1fr;
    }
    .content {
        border: 1.5px solid rgb(255, 132, 0);
        border-radius: 5px;
        padding: .5rem;
        display: grid;
        grid-template-columns: 1fr;
        /* padding-right: 80vw; */
    }

</style>