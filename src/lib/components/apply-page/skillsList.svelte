<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let skills: string[];
    export let title : string;
    let inputSkill : string;
    const dispatch = createEventDispatcher();

   
    function handleChange(){
        
        if (inputSkill.length > 0) {
                                skills = [...skills, inputSkill];
                                inputSkill = "";
                            }
        dispatch("change", skills);
                        
    }


</script>

<div class="container">
            <strong>{title}</strong>

            {#if  skills.length > 0 }
                    <ol>

                        {#each skills as item }
                        <div class="list-items">
                            <span class="" on:click={()=>{
                                let index = skills.indexOf(item);
                                skills.splice(index, 1);
                                skills = [...skills];
                            
                            }}>&cross;</span>
                            <li> {item}</li>
                        </div>
                            
                        {/each}
                    </ol>
                {:else}
                    <p>No skills</p>
                {/if}
                

                <label for="required"> 
                    <div class="list-input">
                        <input class="border" type="text" id="required" bind:value={inputSkill} />
                        <a class="btn border" on:click={handleChange}>Add</a>
                    </div>
                </label>

</div>

<style>

    .container {
        display: flex;
        flex-direction: column;
        
    }

    

    .list-input{
        display: flex;
        gap: 0.7rem;
    }
    .list-input input{
        flex-grow: 1;
    }
    .border {
        border-radius: 10px;
    }

    ol , p {
        padding: 0.5rem 0;
    }
    

    .list-items{
        display: flex;
        gap: 2rem;
    }
    span{
        cursor: pointer;
    }
    
</style>