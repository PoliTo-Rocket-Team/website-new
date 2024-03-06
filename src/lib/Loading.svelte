<div class="wrapper">
    <div class="sizer">
        <slot>Loading</slot>
    </div>
    <div class="track">
        <div class="fluid"></div>
    </div>
</div>

<style>
    .wrapper {
        display: grid;
        grid-template-columns: 1fr;
        margin: var(--loading-margin, 0);
    }
    .sizer, .track {
        justify-self: var(--loading-justify);
        align-self: center;
        grid-column: 1;
        grid-row: 1;
    }
    .sizer {
        opacity: 0;
        user-select: none;
    }
    .track {
        margin: 0 var(--loading-inline-padding, 1ch);
        width: var(--loading-width, 15ch);
        background-color: #ccc;
        height: .125rem;
        border-radius: .25rem;
        overflow: hidden;
    }
    .fluid {
        background-color: var(--accent-fig);
        height: 100%;
        width: 100%;
        animation: brooom .5s ease-in-out infinite;
    }

    @keyframes brooom {
        0% {
            clip-path: inset(0 100% 0 0);
        }
        50% {
            clip-path: inset(0);
        }
        100% {
            clip-path: inset(0 0 0 100%);
        }
    }
</style>