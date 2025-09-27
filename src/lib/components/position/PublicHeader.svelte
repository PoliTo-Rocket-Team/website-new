<script lang="ts">
    import "@fontsource/anonymous-pro/400.css";

    export let role: string;
    export let code: string;
    export let subteam: string;
    export let division: string;

    function handleKey(event: KeyboardEvent) {
        if (event.key === "Enter" || event.key === " ") {
        }
    }

    function handleClick(event: MouseEvent) {
        trackSummaryClick(event);
    }

    function trackSummaryClick(event: MouseEvent | KeyboardEvent) {
        (window as any).umami?.track(`Header-${code}`);
    }
</script>

<summary
    on:click={handleClick}
    on:keydown={handleKey}
    tabindex="0"
    role="button"
>
    <h3>{role}</h3>
    <div class="code">{code}</div>
    <div><span class="on-sm">Department: </span>{subteam}</div>
    <div><span class="on-sm">Division: </span>{division}</div>
</summary>

<style lang="scss">
    $marker-dim: 0.3rem;
    $details-columns: 2.5fr 1fr 1fr auto $marker-dim;
    $gap: 1rem;

    summary {
        padding: 0.6rem 0.8rem;
    }
    summary::-webkit-details-marker {
        display: none;
    }
    .code {
        font-family: "Anonymous Pro", monospace;
        color: var(--accent-text);
        width: 11ch;
    }
    @media (max-width: 50rem) {
        summary {
            display: flex;
            flex-direction: column;
        }
        h3 {
            margin-bottom: 0.2rem;
        }
        summary::before {
            content: "";
            display: inline-block;
            width: 0;
            height: 0;
            vertical-align: middle;
            margin-bottom: 0.2rem;
            margin-right: 0.6ch;
            border-left: $marker-dim solid currentColor;
            border-top: $marker-dim solid transparent;
            border-bottom: $marker-dim solid transparent;
            transform: translateX(1px);
            transition: transform 150ms;
        }
        :global(details[open]) summary::before {
            transform: translateX(1px) rotate(90deg);
        }
    }

    @media (min-width: 50rem) {
        summary {
            display: grid;
            grid-template-columns: $details-columns;
            grid-auto-flow: dense;
            align-items: center;
            column-gap: $gap;
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
    }
</style>
