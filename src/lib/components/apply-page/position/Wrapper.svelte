<article>
    <details>
        <slot name="header" />
        <hr />
        <div class="content">
            <slot name="content" />
        </div>
    </details>
</article>

<style lang="scss">
    $marker-dim: 0.3rem;
    $details-radius: 0.5rem;
    $details-pad-x: 0.8rem;
    $details-pad-y: 0.5rem;
    $details-border: 2px solid #b3b3b3ba;

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
</style>
