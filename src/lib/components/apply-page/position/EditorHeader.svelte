<script lang="ts">
    import "@fontsource/anonymous-pro/400.css";
    export let role: string;
    export let code: string;
    export let open: boolean;
</script>

<summary>
    <h3>{role}</h3>
    <div class="code">{code}</div>
    <label class="switch">
        <input type="checkbox" bind:checked={open} />
        <span class="slider" />
    </label>
</summary>

<style lang="scss">
    $marker-dim: 0.3rem;

    summary {
        padding: 0.8rem 0.5rem;
        display: grid;
        grid-template-columns: 1fr auto auto $marker-dim;
        grid-auto-flow: dense;
        align-items: center;
        column-gap: 1rem;
    }

    .code {
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
        width: 60px;
        height: 34px;
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
        background-color: #ccc;
        transition:
            transform 0.4s,
            background-color 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 1.2rem;
        width: 1.2rem;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: 0.4s;
        border-radius: 34px;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: #1c852e;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #1c852e;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }
</style>
