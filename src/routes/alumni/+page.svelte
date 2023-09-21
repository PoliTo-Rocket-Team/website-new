<script lang="ts">
    import Alumni from "./Alumni.svelte";
    import { leaders, cavour, efesto ,beginning ,scale } from "./data";
    import DefineIcons from "$lib/icons/DefineIcons.svelte";
    const complete = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "long", year: "numeric" });

    // const extract = (p: Position) => p.start;
    // const dates = Array.prototype.concat.call(
    //     leaders.map(extract), 
    //     cavour.map(extract), 
    //     efesto.map(extract),
    // );


    const timestamps = [...leaders, ...cavour, ...efesto].map(p => p.start);
    const dates = [...new Set(timestamps)];

 


</script>

<main>
    <div class="padded">
        <h1>Alumni</h1>
        <hr class="subtle stop-growth">
    </div>

    <div class="grid-container">
        
        <div class="title">Time</div>
        <div class="time content">
            <div class="timeline"></div>
            <ol>
                {#each dates as date}
                    <li class="date" style:--left="{(date-beginning)*scale}rem">{complete.format(new Date(date))}</li>
                {/each}
                
            </ol>
        </div>

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
        <div class="verticals">
            {#each dates as date}
                <div style:--left="{(date-beginning)*scale}rem"></div>
            {/each}
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
        grid-template-columns: auto auto 1fr;
        grid-template-rows: auto 1fr 1fr 1fr 1fr 1fr 1fr;

        max-width: 100%;
        overflow-x: scroll;
        overflow-y: visible;
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
        z-index: 4;
        position: sticky;
        left: 0;
        writing-mode: vertical-rl;
        white-space: nowrap;
        text-align: center;
        font-size: var(--fs-60);
        font-weight: 500;
        padding: 1.2rem .4rem;
        transform: rotate(180deg);
        background-color: var(--bg-0);
    }
    .title:first-child {
        text-align: start;
    }
    .span-rows {
        grid-row: span var(--rows, 2);
    }
    .rows {
        display: grid;
        grid-template-columns: 1fr;
    }
    .content {
        position: relative;
        border-radius: 5px;
        padding: .5rem;
        display: grid;
        grid-template-columns: 1fr;
        /* padding-right: 80vw; */
    }
    .content::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        height: 2px;
        width: 100%;
        background-color: #9090907f;
        transform: translateY(-1px);
    }

    .time {
        position: relative;
        height: 12ch;
    }
    .timeline {
        z-index: 2;
        position: absolute;
        left: .5rem;
        right: .5rem;
        bottom: 1.5rem;
        width: calc(100% - 1rem);
        transform: translateY(50%);
        background-color: rgb(255, 132, 0);
        height: 4px;
    }

    .timeline::before, .timeline::after {
        content: "";
        position: absolute;
        top: -8px;
        display: block;
        width: 0;
        height: 0;
        border-radius: 10px;
        border: 10px solid rgb(255, 132, 0);
    }

    .timeline::before {
        left: -5px;
    }

    .timeline::after {
        right: -5px;
        border: 10px solid transparent;
        border-radius: 30px;
        border-right: 0;
        border-left: 20px solid rgb(255, 132, 0);
    }

    .date {
        z-index: 3;
        display: block;
        position: absolute;
        left: var(--left);
        bottom: 1.5rem;
        width: max-content;
        transform-origin: left center;
        padding-left: 1.5ch;
        transform: translateY(50%) rotate(-45deg);
    }
    .date:first-child {
        margin-left: .8rem;
    }

    .date::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        border: 3px solid rgb(255, 132, 0);
        border-radius: 15px;
        width: 10px;
        height: 10px;
        background: #F0F0F0;
    }

    .verticals {
        width: 0;
        height: 100%;
        grid-row: 1/-1;
        grid-column: 2;
        position: relative;
        overflow-x: visible;
    }
    .verticals > div {
        position: absolute;
        z-index: 1;
        top: calc(12ch - 1.5rem);
        left: var(--left);
        height: calc(100% - 12ch + 1.5rem);
        width: 2px;
        background-color: #9090907f;
        transform: translateX(-1px);
    }
</style>