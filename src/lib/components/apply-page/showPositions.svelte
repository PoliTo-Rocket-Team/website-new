<script lang="ts">
  import type { position } from "./positionType";
  export let pos: position;
</script>

<div class="main-container">
  <h4>Description</h4>
  {#if Array.isArray(pos.description)}
    {#each pos.description as paragraph}
      {#if Array.isArray(paragraph)}
        <ul>
          {#each paragraph as item}
            <li>{item}</li>
          {/each}
        </ul>
      {:else}
        <p>{paragraph}</p>
      {/if}
    {/each}
  {:else}
    <p>{pos.description}</p>
  {/if}
  {#if pos.required}
    <h4>Required skills</h4>
    <ul>
      {#each pos.required as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}
  {#if pos.desirable}
    <h4>Desirable skills</h4>
    <ul>
      {#each pos.desirable as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}
  <a
    class="btn"
    href="https://forms.gle/{pos.form}"
    target="_blank"
    rel="noreferrer">Apply</a
  >
</div>

<style>
  .main-container {
    padding: 0.7rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  ul {
    padding-left: 2ch;
  }
</style>
