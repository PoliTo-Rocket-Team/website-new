<script lang="ts">
    import { page } from "$app/stores";
</script>

<main>
    <span>{$page.status}</span>
    <h1>{$page.error?.message}</h1>
    <p>{$page.error?.details}</p>
</main>