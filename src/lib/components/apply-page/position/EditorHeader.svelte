<script lang="ts">
    import "@fontsource/anonymous-pro/400.css";
    import { createEventDispatcher } from "svelte";
    export let role: string;
    export let code: string;
    export let open: boolean;
    const dispatch = createEventDispatcher<{
        open: boolean;
    }>();

    function onchange(this: HTMLInputElement) {
        dispatch("open", this.checked);
    }
</script>

<summary>
    <h3>{role}</h3>
    <div class="code">{code}</div>
    <label class="switch">
        <input type="checkbox" bind:checked={open} on:change={onchange} />
        <span class="slider" />
    </label>
</summary>

<style lang="scss">
    $marker-dim: 0.3rem;

    summary {
        padding: 0.6rem 0.8rem;
        display: grid;
        grid-template-columns: 1fr auto auto $marker-dim;
        grid-auto-flow: dense;
        align-items: center;
        column-gap: 1rem;
    }

    .code {
        font-family: "Anonymous Pro", monospace;
        color: var(--accent-text);
        grid-column: -3/-2;
    }
    summary::after {
        content: "";
        width: 0;
        height: 0;
        border-right: $marker-dim solid currentColor;
        border-top: $marker-dim solid transparent;
        border-bottom: $marker-dim solid transparent;
        transform: translateX(-1px);
        transition: transform 150ms;
    }
    :global(details[open]) > summary::after {
        transform: translateX(1px) rotate(-90deg);
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 3.5rem;
        height: 1.8rem;
        border-radius: 3rem;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #ccc;
        border-radius: 3rem;
        transition: background-color 0.2s;
    }

    .slider:before {
        display: block;
        position: absolute;
        content: "";
        height: 1.4rem;
        width: 1.4rem;
        left: 0.2rem;
        top: 50%;
        background-color: white;
        transition: transform 0.2s;
        transform: translateY(-50%);
        border-radius: 34px;
    }

    input:checked + .slider {
        background-color: var(--accent-fig);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #1c852e;
    }

    input:checked + .slider:before {
        transform: translate(1.6rem, -50%);
    }
</style>
