<script lang="ts">
    import "@fontsource/anonymous-pro";
    import "@fontsource/plus-jakarta-sans/400-italic.css";
    import Modal from "$lib/Modal.svelte";

    import Field from "$lib/components/form/Field.svelte";
    import { schema_name, schema_code } from "./logic";
    import { enhance } from "$app/forms";
    import { askAddition } from "./logic";

    export let data;

    let error: string | null = null;
    let create = false;
</script>

<svelte:head>
    <title>{data.subteam.name} | PRT Admin Program</title>
</svelte:head>

<h1>{data.subteam.name}</h1>

<h2>Open divisions</h2>

<table>
    <tr>
        <th></th>
        <th>Name</th>
        <th>Lead</th>
        <!-- <th>Actions</th> -->
    </tr>
    {#each data.open as d}
        <tr>
            <td class="code">{d.code}</td>
            <td>
                <a href="/dashboard/positions/{d.id}">
                    {d.name}
                </a>
            </td>
            <td>
                {#if d.lead}
                    {d.lead.first_name} {d.lead.last_name}
                {:else}
                    <span class="low">Pending request</span>
                {/if}
            </td>
        </tr>
    {/each}
</table>

<button
    type="button"
    class="btn"
    on:click={() => {
        create = true;
    }}>Create a new division</button
>
<Modal bind:use={create} ch={50} empty={false}>
    <h3>Create new division</h3>
    <p>
        Name and code can only be changed later by the president or IT lead:
        please pay attention and write them down correctly.
    </p>
    <form
        action="/dashboard/subteam/{data.subteam.id}"
        method="post"
        use:enhance={async ({ formData, cancel }) => {
            cancel();
            error = await askAddition(data.subteam.id, formData, data.supabase);
        }}
    >
        <div class="split">
            <Field
                type="text"
                label="Name"
                name="name"
                schema={schema_name}
                value=""
            />
            <Field
                type="text"
                label="Code"
                name="code"
                schema={schema_code}
                value=""
            />
        </div>
        <div class="btns">
            <button
                type="button"
                class="btn btn--low"
                on:click={() => (create = false)}>Cancel</button
            >
            <button type="submit" class="btn">Save</button>
        </div>
        {#if error}
            <p class="error">
                {error}
            </p>
        {/if}
    </form>
</Modal>

<h2>Closed divisions</h2>

{#if data.closed.length}
    <table>
        <tr>
            <th></th>
            <th>Name</th>
            <th>End date</th>
        </tr>
        {#each data.closed as d}
            <tr>
                <td class="code">{d.code}</td>
                <td>{d.name}</td>
                <td>{d.end}</td>
            </tr>
        {/each}
    </table>
{:else}
    <p>There are no closed division yet.</p>
{/if}

<style>
    h2:first-child {
        margin-top: 0;
    }
    h3 {
        font-size: 1.5rem;
        margin-bottom: 0.8rem;
        margin-top: -0.2rem;
    }
    table {
        border-collapse: collapse;
        margin-bottom: 2rem;
    }
    th {
        text-align: left;
        font-weight: 600;
    }
    th,
    td {
        padding: 0.2rem 0.5rem;
    }
    tr:nth-child(2n) td {
        background-color: #8787871a;
    }
    td:first-child {
        border-top-left-radius: 0.3rem;
        border-bottom-left-radius: 0.3rem;
    }
    td:last-child {
        border-top-right-radius: 0.3rem;
        border-bottom-right-radius: 0.3rem;
    }
    .code {
        color: var(--accent-text);
        font-family: "Anonymous Pro", monospace;
        font-size: 1.2rem;
        font-weight: 400;
    }
    a {
        /* display: inline-block; */
        text-decoration: none;
        color: currentColor;
        /* padding: 0.15rem 0.35rem; */
        width: 100%;
        border-radius: 0.3rem;
    }
    a:hover {
        /* background-color: #8787871a; */
        text-decoration: underline dashed var(--accent-fig);
    }
    .low {
        font-style: italic;
        opacity: 0.7;
    }
    form {
        margin-top: 1rem;
    }
    .split {
        display: grid;
        grid-template-columns: 1fr 10ch;
        column-gap: 2rem;
    }
    .btns {
        display: flex;
        justify-content: end;
        column-gap: 1rem;
        margin-top: 1rem;
    }
    .error {
        margin-top: 1rem;
    }
</style>
