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
            margin-bottom: 0.7rem;
        }
        :global(ul + p),
        :global(p + p) {
            margin-top: 0.7em;
        }
        :global(p + ul) {
            margin-top: 0.5rem;
        }
        :global(li + li) {
            margin-top: 0.2rem;
        }
        :global(.m-top) {
            margin-top: $space;
        }
        :global(.list) {
            padding-left: 2.5ch;
        }
        :global(.list > ::marker) {
            color: var(--accent-fig);
        }
        :global(.card) {
            background-color: var(--bg-1);
            padding: 1rem 1rem;
            border-radius: 0.8rem;
        }
        :global(.smudge) {
            position: relative;
            padding-top: 8px;
        }
        :global(.smudge)::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            background-color: var(--accent-fig);
            width: 2.5rem;
            height: 4px;
            border-radius: 2px;
        }
    }
</style>
