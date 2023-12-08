<script lang="ts" generics="T">
    /** The modal is open only if `use` is truthy. The prop `data` passed to the slot is always the last truthy value of `use` */
    export let use: T | null;
    /** The initial (truthy) value that the prop `data` takes, in order to guarantee the construction of the slot  */
    export let empty: T;
    /** The width in ch of the modal (default 60) */
    export let ch = 60;

    let _d = empty;
    $: if (use) _d = use;

    let dialog: HTMLDialogElement;

    $: if (dialog) {
        if (use) dialog.showModal();
        else dialog.close();
    }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
    bind:this={dialog}
    on:close={() => (use = null)}
    on:click={e => {
        if (e.target === e.currentTarget) use = null;
    }}
>
    <div class="content" style="width: {ch}ch;">
        <div class="scrollable">
            <slot data={_d} />
        </div>
    </div>
</dialog>

<style>
    ::backdrop {
        background-color: #111;
        opacity: 0.8;
    }
    dialog {
        margin: auto;
        border: none;
        border-radius: 0.8rem;
        background-color: var(--bg-0);
        color: var(--fg-0);
    }
    :global([data-theme="light"]) dialog {
        box-shadow: 0 0 2rem #2a2a2a;
    }
    .content {
        /* width: 60ch; */
        max-width: 90vw;
        border-radius: 0.8rem;
        padding-right: 0.5rem;
        max-width: 100%;
        /* display: flex;
        justify-content: stretch;
        align-items: stretch; */
    }
    .scrollable {
        width: 100%;
        padding: 1rem;
        padding-right: 0.5rem;
        max-height: 90vh;
        overflow-y: auto;
        scrollbar-width: thin;
    }
</style>
