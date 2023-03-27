<main>
    <div>
        <slot />
    </div>
</main>

<style lang="scss">

    $space: 3.5rem;

    div {
        max-width: 90ch;
        margin: 7rem auto;
        --space: #{$space};

        // Idk better way to have scoped common style

        :global(h1) {
            text-align: center;
        }
        :global(h2) {
            font-size: 1.8rem;
            margin-bottom: .7rem;
        }
        :global(ul + p),
        :global(p + p) {
            margin-top: .7em;
        }
        :global(p + ul) {
            margin-top: .3rem;
        }
        :global(.m-top) {
            margin-top: $space;
        }
        :global(.list) {
            padding-left: 3ch;
        }
        :global(.list > ::marker) {
            color: var(--accent-fig);
        }
        :global(.card) {
            background-color: var(--bg-1);
            padding: 1rem 1rem;
            border-radius: .8rem;
        }
    }
</style>