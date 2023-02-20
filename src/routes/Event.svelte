<script context="module">
    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
</script>

<script lang="ts">
    export let year: number;
    export let month: number;
    export let title: string;
    export let ch: number;
</script>

<article>
    <time datetime="{year}-{month}">{formatter.format(new Date(year, month-1))}</time>
    <div style="max-width: {ch}ch;">
        <h3>{title}</h3>
        <p><slot /></p>
    </div>
</article>

<style>
    article {
        position: relative;
        margin-top: 1.5rem;
        margin-bottom: 2rem;
    }
    article::before {
        content: '';
        position: absolute;
        top: 0;
    }
    time {
        display: block;
        color: var(--fg-1);
        padding-left: 1rem;
        margin-bottom: .3rem;
    }
    div {
        background-color: var(--bg-1);
        padding: .7rem 1rem;
        border-radius: 1rem;
    }
    h3 {
        margin-bottom: .3em;
    }
</style>