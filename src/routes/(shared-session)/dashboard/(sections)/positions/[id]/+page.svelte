<script lang="ts">
    import { addPosition, getPositions } from "./databaseAPI";
    import AdminPosition from "$lib/components/apply-page/AdminPosition.svelte";
    import PositionForm from "$lib/components/apply-page/positionsForm.svelte";
    import Addmodal from "$lib/components/apply-page/Addmodal.svelte";
    import type { PageData } from "./$types";
    import { onMount } from "svelte";
    export let data: PageData;
    let positions = [];

    let showAdd = false;

    onMount(async () => {
        const response = await getPositions(
            data.supabase,
            data.divisions[0].id
        );
        positions = response.data;
    });
    const handelupdatePositions = async () => {};
    const handelsubmitAdd = async values => {
        let res = await addPosition(values, data.supabase);
        let data = getPositions(data.supabase, data.divisions[0].id);
        if (res.error) {
            alert(res.error.message);
        } else {
            showAdd = false;
            alert("Position added successfully");
        }
    };
    async function handelDelete(event) {
        let data = event.detail;

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
        let data = event.detail;
        const response = await fetch(`/api/positions/${data.id}/add/`, {
            method: "POST",
            body: JSON.stringify({ data }),
            headers: {
                "content-type": "application/json",
            },
        });
    }
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

<Addmodal show={showAdd}>
    <PositionForm
        division={data.divisions[0].id}
        positions={data.positions}
        customSubmitForm={handelsubmitAdd}
        on:close={() => {
            showAdd = !showAdd;
        }}
    ></PositionForm>
</Addmodal>

{#if !(positions.length === 0)}
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
