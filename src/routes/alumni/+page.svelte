<script lang="ts">
    import Alumni from "./Alumni.svelte";
    import { leaders, cavour, efesto } from "./data";
    import DefineIcons from "$lib/icons/DefineIcons.svelte";

    // const extract = (p: Position) => p.start;
    // const dates = Array.prototype.concat.call(
    //     leaders.map(extract), 
    //     cavour.map(extract), 
    //     efesto.map(extract),
    // );

</script>

<main>
    <div class="padded">
        <h1>Alumni</h1>
        <hr class="subtle stop-growth">
    </div>

    <div class="grid-container">
        
        <div class="title">Time</div>
        <div class="time content">
            <ol class="timeline">
                <li>
                    October 2022
                </li>
                <li>
                    10 Agust 2023
                </li>
                <li>
                    2 October 2023
                </li>
                <li>
                    Today
                </li>
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

    .date {
        position: absolute;
        left: var(--left);

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


    .time {
        position: relative;
        display: flex;
        justify-content: stretch;
        align-items: center;
    }

    

    .timeline {
  position: relative;
  display: block;
  background-color: rgb(255, 132, 0);
  height: 4px;
  flex-grow: 1;
  margin-left: 20px;
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
  left: -20px;
}

.timeline::after {
  right: -10px;
  border: 10px solid transparent;
  border-radius: 30px;
  border-right: 0;
  border-left: 20px solid rgb(255, 132, 0);
}

.timeline li {
  position: relative;
  display: block;
  float: left;
  width: 110px;
  transform: rotate(-45deg);
  top: -65px;
 }

.timeline li::before {
  content: "";
  position: absolute;
  top: 3px;
  left: -30px;
  border: 3px solid rgb(255, 132, 0);
  border-radius: 15px;
  width: 10px;
  height: 10px;
  background: #F0F0F0;
}


</style>