<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    import SkillsList from './skillsList.svelte';
    export let show = false;
    const dispatch = createEventDispatcher();
    let newDescription : string;
    let newRequired: string[];
    let newDesirable: string[];
    // let inputRequired: string;
    // let inputDesirable: string;
    // let indexRequired: number;
    // let indexDesirable: number;
    let name : string;
    let positionNumber : number;
    newRequired= [];
    newDesirable= [];


function handelClose(){

  show = false;
  dispatch("close");
}

</script>




<div class="content">
    <form action="">
        <label  for="name"><strong>Name :</strong>
            <input class="short-input-border short-input name" type="text" bind:value={name}>
        </label>
        <div class="row">                  
            <label for="name"><strong>Number :</strong>
                <input class="short-input-border short-input number" min="1" type="number" bind:value={positionNumber} >
            </label>
            <label for="name"><strong>End date :</strong>
                <input class="short-input-border short-input date" type="date">
            </label>
        </div>
        
        <label for="description"><strong>Description</strong>
            <textarea class="input border" name="" id="description"  bind:value={newDescription}></textarea>
        </label>

        <SkillsList  title="Required skills"  skills={newRequired} ></SkillsList>
        <SkillsList  title="Desirable skills"  skills={newDesirable} ></SkillsList>





        <div class="form-btns-container">
            <button type="submit" class="btn border">Save</button>
            <button on:click={handelClose} class="btn--low btn border ">Cancel</button>
        </div>
        

    </form>
    
</div>



<style>
    .content{
        padding: 1rem;
        display: flex ;
        flex-direction: column;

    }
    

    form{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .border {
        border-radius: 10px;
    }

    .input {
    min-width: 100%;
    min-height: 6rem;
    box-sizing: border-box;
    outline: none;
    padding: 10px 10px 10px 10px;
    resize: none;
    margin-top: 0.5rem;

    }

   .short-input {
        margin-left: 0.5rem;
    }
    .row{
        display: flex;
        gap: 1rem;
    }
    .number{
        width: 3rem;
        text-align: center;
    }
    .date{
        padding: 0.1rem;
        

    }
    .short-input-border{
        border-radius: 7px;
    }

    .form-btns-container{
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
</style>