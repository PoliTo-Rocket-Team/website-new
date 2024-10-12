<script lang="ts">
    export let description: string;
    export let reason: string | null;
    export let quote_url: string | null;
    export let createdAt: string | null;
    export let fileName: string | null;

    $: paragraphs = description.split("\n\n");
    $: reasonParagraphs = reason ? reason.split("\n\n") : [];

    $: formattedDate = createdAt
        ? `${new Date(createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })}, ${new Date(createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // 24-hour format
          })}`
        : "N/A";


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
    
    <a href={quote_url} target="_blank">{fileName}</a>
{/if}

{#if createdAt}
    <h4>Created At</h4>
    <p>{formattedDate}</p>
{/if}

<style>

    h4:not(:first-child) {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
    }
    p {
        margin-top: 0.5rem;
    }
</style>
