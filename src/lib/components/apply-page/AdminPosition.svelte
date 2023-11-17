<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { position } from "./positionType";
  import ShowPositions from "./showPositions.svelte";
  import Base from "./Base.svelte";
  import Addmodal from "./Addmodal.svelte";
  import PositionsForm from "./positionsForm.svelte";
  let modify = false;
  export let code: string;
  export let position: position;
  const dispatch = createEventDispatcher();
  let showdelete = false;
  let editRequired: string[] = position.required ? [...position.required] : [];
  let editDesirable: string[] = position.desirable
    ? [...position.desirable]
    : [];

  const handeldelete = () => {
    dispatch("delete", { id: position.id });
  };
</script>

<Addmodal
  show={showdelete}
  on:close={() => {
    showdelete = false;
  }}
>
  <div class="delete-modal">
    <strong>Warning !</strong>
    <p>Are you sure you want to delete this item?</p>
    <p>This action cannot be undone.</p>
    <div class="delete-btn">
      <button
        on:click={() => {
          showdelete = false;
          handeldelete();
        }}
        class="btn">Delete</button
      >
      <button
        on:click={() => {
          showdelete = false;
        }}
        class="btn">Cancel</button
      >
    </div>
  </div>
</Addmodal>

<Base role={position.name} {code}>
  <svelte:fragment slot="header">
    <div>
      <button
        on:click={() => {
          showdelete = true;
        }}
        class="btn border">Delete</button
      >
    </div>
    <!-- ------------------------------------ -->

    <label class="switch">
      <input type="checkbox" checked />
      <span class="slider round" />
    </label>

    <!-- ------------------------------------ -->
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#if !modify}
      <ShowPositions pos={position} />
      <button
        on:click={() => {
          modify = true;
        }}
        class="btn">Edit</button
      >
    {:else}
      <PositionsForm
        on:close={() => {
          modify = false;
        }}
        name={position.name}
        positionNumber={position.number}
        endDate={position.close_at ?? ""}
        newDesirable={editDesirable}
        newRequired={editRequired}
        newDescription={position.description}
        formLink={position.form ?? ""}
        posid={position.id}
      />
    {/if}
  </svelte:fragment>
</Base>

<style>
  .delete-modal {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .delete-btn {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #1c852e;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #1c852e;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
