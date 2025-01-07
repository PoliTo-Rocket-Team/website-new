<script lang="ts">
    import IconLink from "$lib/icons/IconLink.svelte";
    import "@fontsource/plus-jakarta-sans/600.css";
    import { normalize } from "./mail";

    export let img: string | null = null;
    export let angle: number;
    export let firstname: string;
    export let lastname: string;
    export let role: string;
    export let linkedin: string;
    export let president = false;

    $: mail = president
        ? "president@politorocketteam.it"
        : `${normalize(firstname.toLowerCase())}.${normalize(
        lastname.toLowerCase()
    )}@politorocketteam.it`;
</script>

<div
    class="wrapper"
    class:oncircle={!president}
    style:--cos={Math.sin(angle)}
    style:--sin={Math.cos(angle)}
    style:--tilt="{-angle}rad"
>
    <div class="img">
        {#if img}
            <img class="img" src={img} alt="Face of {firstname} {lastname}" />
        {:else}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 118.2842712"
                width="50"
                height="59.14213562"
            >
                <use href="#prt-logo" />
            </svg>
        {/if}
    </div>

    <div class="info">
        <span class="name">{firstname} {lastname}</span>
        <span class="role">{role}</span>
        <div class="socials">
            {#if linkedin}
                <IconLink icon="LinkedIn" id={linkedin} />
            {/if}
            <IconLink icon="Email" id={mail} />
        </div>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: var(--pad);
    }
    .img {
        width: 7.2rem;
        height: 7.2rem;
        border-radius: 50%;
        flex-shrink: 0;
        text-align: center;
        position: relative;
        background-color: var(--bg-0);
    }
    .oncircle .img::after {
        content: "";
        z-index: -1;
        position: absolute;
        height: var(--radius);
        width: 0;
        border-left: 2px dashed #999c;
        top: 50%;
        left: 50%;
        transform-origin: bottom;
        transform: translate(-50%, -100%) rotate(var(--tilt, 0deg));
        clip-path: inset(12rem 0 0 0);
    }
    img {
        display: block;
        object-fit: cover;
    }
    svg {
        display: block;
        height: 6rem;
        width: auto;
        margin: auto;
        opacity: 0.8;
        filter: saturate(0.25);
        transform: translateY(1.4rem) translateY(-2px);
    }
    .info {
        display: flex;
        flex-direction: column;
        align-items: start;
        width: max-content;
        text-shadow: 0 0 6px var(--bg-0);
        padding-left: 1rem;
    }
    .name {
        font-size: var(--fs-60);
        font-weight: 700;
    }
    .role {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--accent-text);
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
        .wrapper {
            z-index: 2;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            flex-direction: column;
            margin-bottom: 0;
        }
        .wrapper.oncircle {
            z-index: 1;
            transform: translate(
                calc(-50% + var(--cos) * var(--radius)),
                calc(var(--sin) * var(--radius))
            );
        }
        .img {
            width: 9rem;
            height: 9rem;
        }
        .info {
            padding-left: 0;
            padding-top: 1rem;
            align-items: center;
        }
        .role {
            margin: 0.1rem 0;
        }
        .socials {
            padding-top: 0.5rem;
        }
    }
</style>
