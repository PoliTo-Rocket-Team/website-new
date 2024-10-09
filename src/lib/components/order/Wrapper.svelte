<article>
    <details>
        <slot name="header" />
        <hr />
        <div class="content">
            <slot name="content" />
        </div>
    </details>
</article>

<style>
    article {
        background-color: var(--bg-1);
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }
    hr {
        border: none;
        border-bottom: 2px solid hsla(0, 0%, 80%, 0.5);
    }
    .content {
        padding: 0.8rem;
        padding-top: 0.6rem;
    }
</style>
