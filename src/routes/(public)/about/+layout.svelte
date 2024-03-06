<script>
    import DefineIcons from "$lib/icons/DefineIcons.svelte";
</script>

<slot />
<DefineIcons />

<style>
    @keyframes icon-shake {
        0% {
            transform: rotate(0);
        }
        25% {
            transform: rotate(-10deg);
        }
        50% {
            transform: rotate(0);
        }
        75% {
            transform: rotate(10deg);
        }
        100% {
            transform: rotate(0);
        }
    }
</style>
