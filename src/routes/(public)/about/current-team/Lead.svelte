<script lang="ts">
    import IconLink from "$lib/icons/IconLink.svelte";
    import "@fontsource/plus-jakarta-sans/400-italic.css";
    import { normalize } from "./mail";

    export let firstname: string;
    export let lastname: string;
    export let mail = `${normalize(firstname.toLowerCase())}.${normalize(
        lastname.toLowerCase()
    )}@politorocketteam.it`;
    export let role: string;
    export let img: string | null = null;
    export let linkedin: string;
    export let cofounder: boolean = false;
    export let highlight = false;
</script>

<li class="wrapper">
    {#if img}
        <img class="img" src={img} alt="Face of {firstname} {lastname}" />
    {:else}
        <div class="img">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 118.2842712"
                width="50"
                height="59.14213562"
            >
                <use href="#prt-logo" />
            </svg>
        </div>
    {/if}
    <div class="info">
        <span class="name">{firstname} {lastname}</span>
        <span class="title" class:colored={highlight}
            >{#if cofounder}<em>Cofounder</em> <span class="divisor">|</span>
            {/if}{role}</span
        >
        <div class="socials">
            <IconLink icon="LinkedIn" id={linkedin} />
            <IconLink icon="Email" id={mail} />
        </div>
    </div>
</li>

<style lang="scss">
    .wrapper {
        display: flex;
        align-items: center;
        max-width: 100%;
    }
    .img {
        width: 7.2rem;
        height: 7.2rem;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 1rem;
        border: 2px solid #8884;
        flex-shrink: 0;
        text-align: center;
        display: block;
    }
    svg {
        display: block;
        height: 4rem;
        width: auto;
        margin: auto;
        opacity: 0.8;
        filter: saturate(0.25);
        transform: translateY(1.4rem) translateY(-2px);
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
            margin-top: 0.1rem;
            margin-bottom: 0.1rem;
        }
    }
    .name {
        font-weight: 600;
        font-size: 1.2rem;
    }
    .socials {
        display: flex;
        margin-left: -0.22rem;
        margin-right: -0.22rem;

        --icon-clr: rgba(160, 160, 160, 0.7);
        --icon-size: 2.2rem;
        --icon-hover: var(--accent-fig);
    }
    @media (min-width: 50rem) {
        .wrapper:nth-child(2n + 1) {
            flex-direction: row-reverse;

            .img {
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
