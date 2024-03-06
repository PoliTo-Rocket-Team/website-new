<script lang="ts">
    import { page } from "$app/stores";
</script>

<div>
    <main>
        <span>{$page.status}</span>
        <h1>{$page.error?.message}</h1>
        <p>{$page.error?.details}</p>
    </main>
</div>

<style>
    div {
        height: 100vh;
        height: 100dvh;
        display: grid;
        place-items: center;
    }
    main {
        padding: var(--pad);
        position: relative;
    }
    span {
        color: var(--accent-text);
        font-size: 2.6rem;
        font-weight: 500;
    }
    @media (min-width: 50rem) {
        span {
            color: var(--accent-fig);
            font-weight: 700;
            font-size: 14rem;
            z-index: -1;
            opacity: 0.5;
            position: absolute;
            left: 0rem;
            bottom: 25%;
        }
    }
    h1 {
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.4rem;
        font-weight: 500;
    }
</style>