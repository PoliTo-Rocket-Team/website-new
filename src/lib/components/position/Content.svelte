<script lang="ts">
    export let description: string;
    export let required: string[] | null;
    export let desirable: string[];
    export let form: string | null;

    $: paragraphs = description.split("\n\n");
</script>

<h4>Description</h4>
{#each paragraphs as p}
    <p>{p}</p>
{/each}

{#if required && required.length}
    <h4>Required skills</h4>
    <ul>
        {#each required as s}
            <li>{s}</li>
        {/each}
    </ul>
{/if}

<h4>Desirable skills</h4>
<ul>
    {#each desirable as s}
        <li>{s}</li>
    {/each}
</ul>

{#if form}
    <a
        class="btn"
        href="https://forms.gle/{form}"
        target="_blank"
        rel="noreferrer">Apply</a
    >
{:else}
    <span>(No google form is linked)</span>
{/if}

<style>
    a {
        display: block;
        padding: 0.4em 0.7em;
        border: 2px solid var(--accent-fig);
        width: fit-content;
        text-decoration: none;
        font-weight: 600;
        margin: 2rem auto;
    }
    a:focus {
        text-decoration: underline;
    }
    ul {
        padding-left: 2ch;
    }
    h4:not(:first-child) {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
    }
    p {
        margin-top: 0.5rem;
    }
    span {
        display: inline-block;
        margin-top: 1.5rem;
        opacity: 0.7;
    }
</style>
