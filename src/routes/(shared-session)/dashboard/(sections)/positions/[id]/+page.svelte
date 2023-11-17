<script lang="ts">
  import { invalidate, invalidateAll } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { createEventDispatcher } from "svelte";

  import type { position } from "$lib/components/apply-page/positionType";
  import SkillsList from "$lib/components/apply-page/skillsList.svelte";
  import AdminPosition from "$lib/components/apply-page/AdminPosition.svelte";
  import Addmodal from "../../../../../../lib/components/apply-page/Addmodal.svelte";
  import type { PageData, ActionData } from "./$types";

  //  variables
  const dispatch = createEventDispatcher();
  export let data: PageData;
  export let form: ActionData;
  let positions: position[] = data.positions;

  let modify = false;
  let showAdd = false;
  // functions
  async function handelDelete(event) {
    let data = event.detail;
    console.log("data", data);
    const response = await fetch(`/api/positions/${9}/delete/`, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "content-type": "application/json",
      },
    });

    let total = await response.json();
    data.positions = [...data.positions];
  }

  async function edit(event) {
    // console.log(event.detail.description);
    let data = event.detail;
    const response = await fetch(`/api/positions/${data.id}/add/`, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "content-type": "application/json",
      },
    });

    let total = await response.json();
    console.log("total", total);
  }

  // ----------------------------------------------------------------------------
  let newDescription: string;
  let newRequired: string[];
  let newDesirable: string[];
  let name: string;
  let formLink: string;
  let positionNumber: number;
  let endDate: string;
  newRequired = [];
  newDesirable = [];
  let required: string;
  let desirable: string;
  const stringListSeparator = "__~!!||_";
  let errEmtyRequired = false;

  export let show = false;

  function handelClose() {
    show = false;
    dispatch("close");
  }

  function handleRequiredChange(event) {
    newRequired = event.detail;
    required = newRequired.join(stringListSeparator);
    errEmtyRequired = false;
  }

  function handleDesirableChange(event) {
    newDesirable = event.detail;
    desirable = newDesirable.join(stringListSeparator);
  }

  function handelCancel() {
    showAdd = false;
    newDesirable = [];
    newRequired = [];
    name = "";
    positionNumber = 0;
    endDate = "";
    form = null;
    newDescription = "";
    formLink = "";

    console.log(form);
  }

  const handelsubmit = (input) => {
    if (newRequired.length === 0) {
      // console.log("required is empty");
      errEmtyRequired = true;
      input.cancel();
    }

    return async (options) => {
      await options.update();

      if (options.result.status === 200) {
        newDesirable = [];
        newRequired = [];
        showAdd = false;
      } else {
        errUnknown = true;
      }
    };
  };
  // ----------------------------------------------------------------------------
</script>

<svelte:head>
  <title>Positions | PRT Admin Program</title>
</svelte:head>

<h1>{data.divisions[0].name} positions</h1>
<p>Here you can add, edit, and delete the positions .</p>

<button
  class="btn"
  on:click={() => {
    showAdd = true;
  }}>Add</button
>

<Addmodal
  show={showAdd}
  on:close={() => {
    showAdd = false;
  }}
>
  <div class="add-form-container">
    <form
      id="addForm"
      method="POST"
      action="?/newPosition"
      use:enhance={handelsubmit}
    >
      {#if form?.data?.error?.unknown}
        <strong class="error">
          Error : Please check all input befor submit again</strong
        >
      {/if}
      {#if form?.data?.error?.number}
        <strong class="error"> {form?.data?.error?.number.message}</strong>
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

      {#if form?.data?.error?.description}
        <strong class="error"> {form?.data?.error?.description.message}</strong>
      {/if}
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
      <input
        name="required"
        type="hidden"
        id="required"
        bind:value={required}
      />

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
        <button on:click={handelCancel} class="btn border" type="reset"
          >Cancel</button
        >
      </div>
    </form>
  </div>
</Addmodal>

{#if !(data.positions?.length === 0)}
  {#each positions as position}
    <AdminPosition
      on:delete={handelDelete}
      {position}
      code={`${data.divisions[0].subteam.code}-${data.divisions[0].code}-${position.number}`}
    />
  {/each}
{:else}
  <p>No positions found</p>
{/if}

<style lang="scss">
  @use "$lib/components/apply-page/consts.scss" as *;

  section {
    max-width: 75ch;
    margin-left: auto;
    margin-right: auto;
  }

  .code-label {
    font-family: "Anonymous Pro", monospace;
    width: 11ch;
    max-width: 11ch;
    min-width: 11ch;
  }

  $text-margin: 0.5rem;
  .positions {
    h4:not(:first-child) {
      margin-top: 3 * $text-margin;
    }
    h4 {
      margin-bottom: $text-margin;
    }
    p + ul {
      margin-top: 0.5 * $text-margin;
    }
    ul + p,
    p + p {
      margin-top: $text-margin;
    }
    ul {
      padding-left: 2ch;
    }
  }
  .btn {
    display: block;
    padding: 0.4em 0.7em;
    border: 2px solid var(--accent-fig);
    width: fit-content;
    text-decoration: none;
    font-weight: 600;
    margin: 2rem auto;
  }
  .btn:focus {
    text-decoration: underline;
  }
  @media (min-width: 50rem) {
    h2 {
      text-align: center;
    }
    .position-labels {
      padding: $details-pad-y $details-pad-x;
      display: grid;
      grid-template-columns: $details-columns;
      grid-auto-flow: dense;
      align-items: center;
      column-gap: $gap;
    }
  }

  // --------------------------------------------
  .add-form-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
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
  .input-column {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
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
  // --------------------------------------------
</style>
