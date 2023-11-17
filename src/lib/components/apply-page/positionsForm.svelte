<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import SkillsList from "./skillsList.svelte";
  import { applyAction, enhance } from "$app/forms";

  const dispatch = createEventDispatcher();
  export let newDescription: string;
  export let newRequired: string[];
  export let newDesirable: string[];
  export let name: string;
  export let positionNumber: number;
  export let endDate: string;
  export let formLink: string;
  export let posid: number;

  let required: string;
  let desirable: string;
  const stringListSeparator = "__~!!||_";
  let errEmtyRequired = false;
  let errUnknown = false;

  export let show = false;
  // ----------------------------------------------------------------------------

  let editRequired: string[] = [...newRequired];
  required = editRequired.join(stringListSeparator);

  let editDesirable: string[] = [...newDesirable];
  desirable = editDesirable.join(stringListSeparator);

  // ----------------------------------------------------------------------------

  function handelCancel() {
    show = false;
    dispatch("close");
    editRequired = [...newRequired];

    editDesirable = [...newDesirable];
  }

  function handleRequiredChange(event) {
    editRequired = event.detail;
    required = editRequired.join(stringListSeparator);
    errEmtyRequired = false;
  }

  function handleDesirableChange(event) {
    editDesirable = event.detail;
    desirable = editDesirable.join(stringListSeparator);
  }

  let myform;
  const handesubmit = (input) => {
    if (editRequired.length === 0) {
      // console.log("required is empty");
      errEmtyRequired = true;
      input.cancel();
    }

    return async ({ result, update }) => {
      // console.log("result", result);
      // console.log("result.data.data : ", result.data.data);
      myform = result.data.data;

      if (result.status === 200) {
        editDesirable = [];
        editRequired = [];
        handelCancel();
        await update();
        // await applyAction(result);
      } else {
        errUnknown = true;
      }
    };
  };
</script>

<div class="add-form-container">
  <form id="addForm" method="POST" action="?/edit" use:enhance={handesubmit}>
    {#if myform?.error?.unknown}
      <strong class="error">
        Error : Please check all input befor submit again</strong
      >
    {/if}
    {#if myform?.error?.number}
      <strong class="error"> {myform?.error?.number.message}</strong>
    {/if}

    <div class="input-column">
      <label for="name">
        <strong>Name :</strong>
        <input
          id="name"
          name="name"
          class="short-input-border short-input name"
          type="text"
          bind:value={name}
          required
        />
      </label>

      <label for="formLink"
        ><strong>Form Link :</strong>
        <input
          id="formLink"
          name="formLink"
          class="short-input-border short-input name"
          type="text"
          bind:value={formLink}
        />
      </label>

      <label for="number"
        ><strong>Number :</strong>
        <input
          name="number"
          id="number"
          class="short-input-border short-input number"
          min="1"
          type="number"
          bind:value={positionNumber}
          required
        />
      </label>

      <label for="endDate"
        ><strong>End date :</strong>
        <input
          name="endDate"
          id="endDate"
          bind:value={endDate}
          class="short-input-border short-input date"
          type="date"
        />
      </label>
    </div>

    <!-- {#if form?.data?.error?.description}
      <strong class="error"> {form?.data?.error?.description.message}</strong>
    {/if} -->
    <label for="description"
      ><strong>Description</strong>
      <textarea
        id="description"
        class="input border"
        name="description"
        bind:value={newDescription}
      />
    </label>
    {#if errEmtyRequired}
      <p class="error">Required is empty</p>
    {/if}
    <SkillsList
      on:change={handleRequiredChange}
      title="Required skills"
      skills={editRequired}
    />
    <input name="required" type="hidden" id="required" bind:value={required} />

    <SkillsList
      on:change={handleDesirableChange}
      title="Desirable skills"
      skills={editDesirable}
    />
    <input
      name="desirable"
      type="hidden"
      id="desirable"
      bind:value={desirable}
    />
    <input type="hidden" name="separator" value={stringListSeparator} />
    <input type="hidden" name="posid" value={posid} />

    <div class="form-btns-container">
      <button type="submit" class="btn border">Save</button>
      <button on:click={handelCancel} class="btn border" type="reset"
        >Cancel</button
      >
    </div>
  </form>
</div>

<!-- <div class="content">
  <form method="POST" action="" use:enhance>

    <label for="name"
      ><strong>Name :</strong>
      <input
        id="name"
        name="name"
        class="short-input-border short-input name"
        type="text"
        bind:value={name}
        required
      />
    </label>
    
    <div class="row">
      <label for="number"
        ><strong>Number :</strong>
        <input
          name="number"
          id="number"
          class="short-input-border short-input number"
          min="1"
          type="number"
          bind:value={positionNumber}
          required
        />
      </label>
      <label for="endDate"
        ><strong>End date :</strong>
        <input
          name="endDate"
          id="endDate"
          bind:value={endDate}
          class="short-input-border short-input date"
          type="date"
        />
      </label>
    </div>

    <label for="description"
      ><strong>Description</strong>
      <textarea
        id="description"
        class="input border"
        name="description"
        bind:value={newDescription}
      />
    </label>
    {#if errEmtyRequired}
      <p class="error">Required is empty</p>
    {/if}
    <SkillsList
      on:change={handleRequiredChange}
      title="Required skills"
      skills={newRequired}
    />
    <input name="required" type="hidden" id="required" bind:value={required} />

    <SkillsList
      on:change={handleDesirableChange}
      title="Desirable skills"
      skills={newDesirable}
    />
    <input
      name="desirable"
      type="hidden"
      id="desirable"
      bind:value={desirable}
    />
    <input type="hidden" name="separator" value={stringListSeparator} />

    <div class="form-btns-container">
      <button type="submit" class="btn border">Save</button>
      <button on:click={handelClose} class="btn--low btn border">Cancel</button>
    </div>
  </form>
</div> -->

<style>
  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  .add-form-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  .input-column {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  form {
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
  .row {
    display: flex;
    gap: 1rem;
  }
  .number {
    width: 3rem;
    text-align: center;
  }
  .date {
    padding: 0.1rem;
  }
  .short-input-border {
    border-radius: 7px;
  }

  .form-btns-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .error {
    color: red;
  }
</style>
