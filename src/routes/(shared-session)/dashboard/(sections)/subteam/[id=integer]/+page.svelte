<script>
    import "@fontsource/anonymous-pro";
    import "@fontsource/plus-jakarta-sans/400-italic.css";
    import Modal from "$lib/Modal.svelte";

    export let data;

    let create = false;
</script>

<svelte:head>
    <title>{data.subteam.name} | PRT Admin Program</title>
</svelte:head>

<h1>{data.subteam.name} overview</h1>

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
<Modal bind:use={create} ch={50}>
    <h2>New division</h2>
    <p>
        Name and code can only be changed later by the presidenti or IT lead: so
        please pay attention and write them down correctly.
    </p>
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
    table {
        border-collapse: collapse;
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
    button {
        margin-top: 2rem;
    }
</style>
