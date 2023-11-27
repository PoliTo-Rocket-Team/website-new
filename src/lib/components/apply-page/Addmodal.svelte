<script lang="ts">
    export let show = false;
</script>

{#if show}
    <div class="modal-container">
        <div class="modal-content">
            <slot />
        </div>
    </div>
{/if}

<style>
    .modal-container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-content {
        width: 50%;
        min-height: 10rem;
        min-width: 10rem;
        height: auto;
        max-height: 97vh;
        background-color: white;
        border-radius: 10px;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
