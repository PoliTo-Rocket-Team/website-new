<script lang="ts">
    export let role: string;
    export let code: string;

    import "@fontsource/anonymous-pro/400.css";
</script>

<article>
    <details>
        <summary>
            <h3>{role}</h3>
            <div class="color code">{code}</div>
            <slot name="header" />
        </summary>
        <hr />
        <div class="content">
            <slot name="content" />
            <p class="disclaimer">
                Please be informed that your work will be entirely voluntary. As
                we are a student team of Politecnico di Torino, we do not offer
                any paid employment.
            </p>
        </div>
    </details>
</article>

<style lang="scss">
    @use "./consts.scss" as *;

    summary {
        padding: $details-pad-y $details-pad-x;
    }
    article {
        background-color: var(--bg-1);
        border-radius: $details-radius;
        margin-bottom: 1rem;
    }
    hr {
        border: none;
        border-bottom: 2px solid hsla(0, 0%, 80%, 0.5);
    }
    .content {
        padding: 0.6rem 0.8rem;
    }
    .code {
        font-family: "Anonymous Pro", monospace;
        color: var(--accent-text);
        width: 11ch;
    }
    .disclaimer {
        margin-top: 1.5rem;
        font-size: 0.9rem;
        opacity: 0.9;
    }

    @media (max-width: 50rem) {
        summary {
            display: flex;
            flex-direction: column;
        }
        h3 {
            margin-bottom: 0.2rem;
        }
        h3::before {
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
        details[open] h3::before {
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
        details[open] summary::after {
            transform: translateX(1px) rotate(-90deg);
        }
        .disclaimer {
            max-width: 55ch;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
