<script>
    // import Lead from "../about/current-team/Lead.svelte";

</script>



<main>
    <h1>Alumni</h1>
       
     <hr class="subtle stop-growth">

    <section class="grid-container">
        
            <div class="time title">Time</div>
            <div class="time-content content ">time-content</div>

            <div class="team-leader title">Team leader</div>
            <div class="team-leader-content content">team-leader-content content
                <div class="team-leader-content1"></div>
            </div>

            <div class="chief-engineers title span-row-2">chief-engineers</div>
            <div class="chief-engineers-content content span-row-2">
                <div class="chief-engineers-content-1 growing">
                    
                    <div class="card">
                        <div class="card-img">
                            <img src="./Meloni.jpg" alt="fabio Meloni">
                        </div>
                        <div class="card-info">
                            <div class="card-name">fabio Meloni</div>
                            <div class="card-role">Cavour chief-engineers</div>
                        </div>
                    </div>
                    
                </div>
                <div class="chief-engineers-content-2 growing">chief-engineers-content-2</div>
            </div>

            <div class="notable-students title span-row-2">notable-students</div>
            <div class="notable-students-content content span-row-2">
                <div class="notable-students-content-1 growing">notable-students-content-1</div>
                <div class="notable-students-content-2 growing">notable-students-content-2</div>
            </div>
        
        
    </section>

</main>


<style>

    .grid-container {
        display: grid;
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr 1fr 1fr 1fr 1fr;
        /* gap: 20px 20px; */




        width: 84vw;
        height: 100vh;
        border: 2px solid rgb(85, 0, 255);
        border-radius: 25px;
        /* padding: 0; */
        
    }
    .title {
        writing-mode: vertical-rl;
        white-space: nowrap;
        border: 2px solid rgb(255, 72, 0);
        border-radius: 5px;
        
    }
    .content {
        /* border: 2px solid rgb(255, 72, 0);
        border-radius: 5px; */
    }

    .span-row-2{
        grid-row: span 2;
    }
    .notable-students-content , .chief-engineers-content , .team-leader-content{
        display: flex;
        flex-direction: column;
        border: 1.5px solid rgb(255, 132, 0);
        border-radius: 5px;
    }
    .growing{
        flex-grow: 1;
        border: 1.5px solid rgb(68, 255, 0);
        border-radius: 5px;

        display: flex;

    }
    .card{
        background: rgb(111, 86, 76);
        border-radius: 5px;
        display: flex;
        
        align-items: center;
     
    }


</style>