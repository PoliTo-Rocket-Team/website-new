<script lang="ts">
    import "@fontsource/plus-jakarta-sans/400-italic.css"
    export let name: string;
    export let role: string;
</script>

<li>
    <span class="name">{name}</span>
    <span class="desc">{role}</span>
</li>

<style>
    li {
        break-inside: avoid;
        background-color: var(--bg-1);
        padding: .4rem .7rem;
        border-radius: .45rem;
        margin-bottom: 1rem;
    }
    .name {
        font-size: 1.1rem;
        font-weight: 500;
        display: block;
        margin-right: -.3rem;
    }
    .desc {
        color: var(--fg-1);
        font-style: italic;
    }
</style>