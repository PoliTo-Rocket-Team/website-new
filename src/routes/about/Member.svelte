<script lang="ts">
    import IconLink from "$lib/icons/IconLink.svelte";
    import "@fontsource/plus-jakarta-sans/400-italic.css";
    export let name: string;
    export let role: string;
    export let linkedin: string | null = null;
</script>

<li>
    {#if linkedin}
        <div class="float">
            <IconLink icon="LinkedIn" id={linkedin} />
        </div>
    {/if}
    <span class="name">{name}</span>
    <span class="desc">{role}</span>
</li>

<style>
    li {
        break-inside: avoid;
        background-color: var(--bg-1);
        padding: 0.4rem 0.7rem;
        border-radius: 0.45rem;
        margin-bottom: 1rem;
    }
    .name {
        font-size: 1.1rem;
        font-weight: 500;
        display: block;
        margin-right: -0.3rem;
    }
    .desc {
        color: var(--fg-1);
        font-style: italic;
    }
    .float {
        float: right;
        margin-right: -0.3rem;
        margin-left: -0.2rem;

        --icon-size: 1.8rem;
        --icon-clr: #b3b3b3b3;
        --icon-hover: var(--fg-1);
    }
</style>
