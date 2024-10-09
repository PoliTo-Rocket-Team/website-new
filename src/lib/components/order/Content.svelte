<script lang="ts">
    export let description: string;
    export let reason: string | null;
    export let quote_url: string | null;
    export let createdAt: string | null;

    $: paragraphs = description.split("\n\n");
    $: reasonParagraphs = reason.split("\n\n");


    $: formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A';
    
</script>

<h4>Description</h4>
{#each paragraphs as p}
    <p>{p}</p>
{/each}
<h4>Reason</h4>
{#each reasonParagraphs as p}
    <p>{p}</p>
{/each}

{#if quote_url}
    <h4>Quote</h4>
    <a href={quote_url} target="_blank">Quote</a>
    <!-- Optionally, embed the file if it's a viewable type -->
{/if}

{#if createdAt}
    <h4>Created At</h4>
    <p>{formattedDate}</p>
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

    h4:not(:first-child) {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
    }
    p {
        margin-top: 0.5rem;
    }

</style>
