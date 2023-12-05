<script lang="ts">
    export let description: string;
    export let required: string[];
    export let desirable: string[];
    export let form: string;
</script>

<h4>Description</h4>
<p>{description}</p>

{#if required.length}
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

<a class="btn" href="https://forms.gle/{form}" target="_blank" rel="noreferrer"
    >Apply</a
>

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
</style>
