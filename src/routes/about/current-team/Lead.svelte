<script lang="ts">
    import Icon from "$lib/icons/Icon.svelte";

    export let name: string;
    export let role: string;
    export let scope: string|null = null;
    export let img: string;
    export let mail: string;
    export let linkedin: string;
    export let cofounder: boolean = false;
</script>


<li>
    <div class="img">
        <img src="/members/{img}" alt="Face of {name}">
    </div>
    <div class="info">
        <span class="name">{name}</span>
        <span class="title">{#if cofounder}Cofounder | {/if}{role}</span>
        {#if scope}
            <span>{scope}</span>
        {/if}
        <div class="socials">
            <a href="https://www.linkedin.com/in/{linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <Icon icon="linkedin" />
            </a>
            <a href="mailto:{mail}" target="_blank" rel="noreferrer" aria-label="Email" title="Email">
                <Icon icon="email" />
            </a>
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
        width: 6rem;
        height: 6rem;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 1rem;
        border: 2px solid #8884;
        flex-shrink: 0;
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
    }
    a {
        --icon-clr: rgba(160,160,160,0.7);
        --icon-size: 2.2rem;
        margin-left: .15rem;
        margin-right: .15rem;
    }
    a:hover {
        --icon-clr: var(--accent-fig);
        opacity: 0.9;
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