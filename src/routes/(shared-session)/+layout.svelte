<script>
    import ThemeSelector from "$lib/ThemeSelector.svelte";
</script>

<div>
    <ThemeSelector />
</div>

<slot />

<style>
    div {
        position: fixed;
        right: 1rem;
        top: 1rem;
    }
</style>