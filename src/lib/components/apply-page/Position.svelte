<script lang="ts">
  import { expo } from "@slidy/easing";
    import Base from "../../../lib/components/apply-page/Base.svelte";
    import { createEventDispatcher } from 'svelte';

    export let role: string;
    export let code: string;
    export let subteam: string;
    export let division: string;
    let modify: boolean = false;
    export let description: string;
    export let required: string[];
    export let desirable: string[];
    export let id: number;

     let newDescription = description.toString();
     let newRequired= [...required];
     let newDesirable= [...desirable];
     let inputRequired: string;
     let inputDesirable: string;
     let indexRequired: number;
     let indexDesirable: number;

     function removeElementFromList(index: number , list: string[] , id: string = ""){
        index = index -1;
        if (index > -1 && index < list.length) {
            list.splice(index, 1);
            

            
        }
        document.getElementById(id).value = ''
     }


    const dispatch = createEventDispatcher();
    function handelSubmit() {
		dispatch('submitEdit', {
			description: newDescription,
            required: newRequired,
            desirable: newDesirable,
            id: id
		});

        description = newDescription.toString();
        required= [...newRequired];
        desirable= [...newDesirable];
        modify = !modify;
	}

    const handleCancel=()=>{

        newDescription = description.toString();
        newRequired= [...required];
        newDesirable= [...desirable];
        modify = !modify;


    };

</script>

<Base {role} {code} >
    <svelte:fragment slot="header">
        <div><span class="on-sm">Subteam: </span>{subteam}</div>
        <div><span class="on-sm">Division: </span>{division}</div>
    </svelte:fragment>
    <svelte:fragment slot="content">
    <!-- ------------------------------ -->
    <div class="content">
    {#if ! modify}

        <h4>Description</h4>
        {#if Array.isArray(description)}
            {#each description as paragraph}
                {#if Array.isArray(paragraph)}
                    <ol>
                        {#each paragraph as item}
                            <li>{item}</li>
                        {/each}
                    </ol>
                {:else}
                    <p>{paragraph}</p>
                {/if}
            {/each}
        {:else}
            <p>{description}</p>
        {/if}




        
        {#if required}
            <h4>Required skills</h4>
            <ol>
                {#each required as item}
                    <li>{item}</li>
                {/each}
            </ol>
        {/if}

        {#if desirable}
            <h4>Desirable skills</h4>
            <ol>
                {#each desirable as item}
                    <li>{item}</li>
                {/each}
            </ol>
        {/if}
        <button on:click={()=>{modify=!modify}} class="btn border">Edit</button>

    {:else}
    <!-- ---------------------------------------------------------------- -->
    <!-- Modifying View -->
    <div class="sections-flex">
    <h4>Description</h4>
        <textarea bind:value={newDescription} class="input border"></textarea>
    </div >
    <br>
    <div class="sections-flex">
       <div class="position-content-header">
        <h4>Required skills</h4>
        <div class="skill-input ">
            
            <input bind:value={indexRequired} type="number" id="removeRequired" class="border rm" placeholder="Enter a number to remove">
            <button  class="btn border" on:click={()=>{removeElementFromList(indexRequired,newRequired,"removeRequired");newRequired=newRequired;}}>Remove</button>

        </div>
        </div>
         {#if newRequired}        
        <ol>
            {#each newRequired as item}
                <li>{item}</li>
            {/each}
        </ol>
        <div class="skill-input">
            
            <input bind:value={inputRequired} type="text" class="border add" placeholder="Add new required skill in here!">
            <button  class="btn border" on:click={()=>{newRequired=[...newRequired,inputRequired]; inputRequired=""}}>Add</button>

        </div>
        {:else}
        <strong>Nothing to show</strong>
    
        {/if}

    </div> 

    <br>

    <div class="sections-flex">  
        <div class="position-content-header">
            <h4>Desirable skills</h4>
            <!-- <button class="btn" on:click={()=>{desirable=[...desirable, ""]}}>Add</button> -->
            <div class="skill-input">           
                <input bind:value={indexDesirable} type="number" id="removeDesirable"  class="border rm" placeholder="Enter a number to remove">
                <button class="btn border" on:click={()=>{removeElementFromList(indexDesirable,newDesirable,"removeDesirable");newDesirable=newDesirable;}}>Remove</button>
            </div>
        </div>
        {#if newDesirable}        
            <ol>
                {#each newDesirable as item}
                    <li>{item}</li>
                {/each}
            </ol>

        {:else}
            <strong>Nothing to show</strong>
        
        {/if}
        <div class="skill-input">           
            <input bind:value={inputDesirable} type="text"  class="border add" placeholder="Add new desirable skill in here!">
            <button class="btn border" on:click={()=>{newDesirable=[...newDesirable,inputDesirable];inputDesirable="";}}>Add</button>
        </div>
    </div> 


        <div class="edit-btns-view">
            <button on:click={handleCancel} class="btn btn--low border">Cancel</button>
            <button on:click={handelSubmit} class="btn border">Submit</button>
        </div>


    {/if}
</div>
    </svelte:fragment>

    <!-- ------------------------------ -->
</Base>


<style >
        .content {
        padding: .6rem .8rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    ol {
        padding-left: 2ch;
    }
    .position-content-header {
        display: flex;
        justify-content: space-between ;
        /* gap: 2rem; */
    }
    .skill-input {
        display: flex;
        gap: 0.7rem;
        /* justify-content: space-between; */
    }


    .input {
    /* display: inline-block; */
    min-width: 100%;
    min-height: 10rem;
    box-sizing: border-box;
    outline: none;
    border-radius: 3px;
    padding: 10px 10px 10px 10px;
    resize: none;

    }
    .edit-btns-view{
        display: flex;
        justify-content:center;
        gap: 1rem;
    }

    .border {
        /* border: 1px solid black; */
        border-radius: 10px;
    }
    .rm{
        width: 13.7rem;
        padding-left: 0.5rem;
    }
    .add{
        flex-grow: 1;
    }
    .sections-flex{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    /* -------------------------------------- */
  

</style>