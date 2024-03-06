<script lang="ts">
    import Modal from "$lib/Modal.svelte";
    import type { PageData } from "./$types";

    import * as Position from "$lib/components/position";
    import { setContext } from "svelte";

    export let data: PageData;
    setContext("supabase", data.supabase);
    let deleting: { id: number; name: string } | null = null;

    let newPos: null | ReturnType<typeof Position.empty> = null;

    async function handelDelete() {
        if (!deleting) return;
        const res = await data.supabase
            .from("positions")
            .delete()
            .eq("id", deleting.id);
        if (res.error)
            alert(
                `Could not delete position "${deleting.name}":\n\n${res.error.details}`
            );
        else {
            const i = data.positions.findIndex(v => v.id === deleting?.id);
            data.positions.splice(i, 1);
            data.positions = data.positions;
        }
        deleting = null;
    }
    async function handleOpen(
        event: CustomEvent<{ open: boolean; id: number }>
    ) {
        const res = await data.supabase
            .from("positions")
            .update({ open: event.detail.open })
            .eq("id", event.detail.id);

        if (res.error) {
            alert(
                `Could not open/close the position:\n\n${res.error.message}\n${res.error.details}`
            );
        }
    }
</script>

<svelte:head>
    <title>{data.division.code} Positions | PRT Admin Program</title>
</svelte:head>

<h1>{data.division.name} positions</h1>

<Modal
    bind:use={newPos}
    empty={Position.empty(data.division.id)}
    let:data={pos_data}
>
    <h3>Add a new position</h3>
    <Position.Form
        creating
        data={pos_data}
        on:cancel={() => (newPos = null)}
        on:saved={e => {
            console.log("saved");
            data.positions.splice(0, 0, e.detail);
            data.positions = data.positions;
            newPos = null;
        }}
    />
</Modal>

<Modal ch={32} bind:use={deleting} empty={{ id: -1, name: "" }} let:data>
    <h3>Confirm deletion</h3>
    <p>Are you sure you want to delete the position "{data.name}"?</p>
    <p>This action cannot be undone later.</p>
    <div class="btns">
        <button type="button" class="btn btn--low" on:click={handelDelete}
            >Delete</button
        >
        <button
            type="button"
            class="btn"
            on:click={() => {
                deleting = null;
            }}>Cancel</button
        >
    </div>
</Modal>

{#each data.positions as position, i (position.id)}
    <Position.Admin
        data={position}
        code={data.division.code}
        on:saved={e => {
            data.positions[i] = e.detail;
        }}
        on:delete={e => (deleting = e.detail)}
        on:open={handleOpen}
    />
{:else}
    <p>No positions found</p>
{/each}

<button
    class="btn center"
    on:click={() => {
        newPos = Position.empty(
            data.division.id,
            (data.positions.length && data.positions[0].number) + 1
        );
    }}>Add a new position</button
>

<style>
    h3 {
        margin-bottom: 1rem;
        font-size: 1.7rem;
    }
    .btns {
        display: flex;
        justify-content: end;
        column-gap: 1rem;
        margin-top: 1.5rem;
    }
    .center {
        margin: 2rem auto;
    }
</style>
