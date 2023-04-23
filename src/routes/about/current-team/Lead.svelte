<script lang="ts">
    import IconLink from "$lib/icons/IconLink.svelte";
    import "@fontsource/plus-jakarta-sans/400-italic.css";

    export let name: string;
    export let role: string;
    export let scope: string|null = null;
    export let img: string | null = null;
    export let mail: string;
    export let linkedin: string;
    export let cofounder: boolean = false;
    export let highlight = false;

    $: src = img ? "/members/"+img : "https://api.dicebear.com/6.x/open-peeps/svg?face=cute,smile,contempt&seed="+name;
</script>


<li>
    <img {src} alt="Face of {name}">
    <div class="info">
        <span class="name">{name}</span>
        <span class="title" class:colored={highlight}>{#if cofounder}<em>Cofounder</em> <span class="divisor">|</span> {/if}{role}</span>
        {#if scope}
            <span>{scope}</span>
        {/if}
        <div class="socials">
            <IconLink icon="LinkedIn" id={linkedin} />
            <IconLink icon="Email" id={mail} />
        </div>
    </div>
</li>

<style lang="scss">
    li {
        display: flex;
        align-items: center;
        max-width: 100%;
    }
    img {
        width: 7.2rem;
        height: 7.2rem;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 1rem;
        border: 2px solid #8884;
        flex-shrink: 0;
        text-align: center;
        vertical-align: middle;
    }
    .colored {
        color: var(--accent-text);
    }
    .divisor {
        opacity: 0.4;
        font-weight: 700;
    }
    .info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        & > * {
            margin-top: .1rem;
            margin-bottom: .1rem;
        }
    }
    .name {
        font-weight: 600;
        font-size: 1.2rem;
    }
    .socials {
        display: flex;
        margin-left: -.22rem;
        margin-right: -.22rem;

        --icon-clr: rgba(160,160,160,0.7);
        --icon-size: 2.2rem;
        --icon-hover: var(--accent-fig);
    }
    @media (min-width: 50rem) {
        li:global(:nth-child(2n-1)) {
            flex-direction: row-reverse;
            
            img {
                margin-right: 0;
                margin-left: 1rem;
            }
            .info {
                align-items: flex-end;
                text-align: right;
            }
            .socials {
                flex-direction: row-reverse;
            }
        }
    }
</style>