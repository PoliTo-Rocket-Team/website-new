<script lang="ts">
    import { createEventDispatcher } from 'svelte';

  import PositionsForm from './positionsForm.svelte';
    export let show = false;
    const dispatch = createEventDispatcher();
    // let newDescription : string;
    //  let newRequired: string[];
    //  let newDesirable: string[];
    //  let inputRequired: string;
    //  let inputDesirable: string;
    //  let indexRequired: number;
    //  let indexDesirable: number;
    //  let name : string;
    //  let positionNumber : number;
    //  newRequired= [];
    // newDesirable= [];


    function handelClose(){

        show = false;
        dispatch("close");
    }

</script>


{#if show}
<div class="modal-container">

    <div class="modal-content">

        <PositionsForm show={show} on:close={handelClose} ></PositionsForm>
       
    </div>

</div>
{/if}



<style>
    .modal-container{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-content{
        width: 50%;
        height: auto;
        background-color: white;
        border-radius: 10px;

    }

    /* .content{
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
    } */

</style>