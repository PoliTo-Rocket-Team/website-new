<script lang="ts">
    import IconLink from "$lib/icons/IconLink.svelte";
    
    export let img: string | undefined = undefined;
    export let angle: number;
    export let firstname: string;
    export let lastname: string;
    export let role: string;
    export let linkedin: string;

    const re = / /;
    $: mail = `${firstname.replace(re,'').toLowerCase()}.${lastname.replace(re,'').toLowerCase()}@politorocketteam.it`;

</script>

<div class="wrapper" style:--cos={Math.sin(angle)} style:--sin={Math.cos(angle)} style:--tilt="{-angle}rad">
    {#if img}
    <img class="img" src="/members/{img}" alt="Face of {firstname} {lastname}">
    {:else}
        <div class="img">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 118.2842712" width="50" height="59.14213562">
                <use href="#prt-logo" />
            </svg>
        </div>
    {/if}
    <div class="info">
        <span class="name">{firstname} {lastname}</span>
        <span class="role">{role}</span>
        <div class="socials">
            <IconLink icon="LinkedIn" id={linkedin} />
            <IconLink icon="Email" id={mail} />
        </div>
    </div>
</div>

<style>
    .wrapper {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(
            calc(-50% + var(--cos) * var(--radius)),
            calc(var(--sin) * var(--radius))
        );
    }
    .wrapper:after {
        content: "";
        position: absolute;
        height: var(--radius);
        width: 0;
        border-left: 2px dashed #ccc;
        top: 50%;
        left: 50%;
        transform-origin: bottom;
        transform: 
            translate(-50%, -100%)
            rotate(var(--tilt,0deg));
        clip-path: inset(31% 0%);
    }
    .img {
        width: 9rem;
        height: 9rem;
        object-fit: cover;
        border-radius: 50%;
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
        filter: saturate(0.25) ;
        transform: translateY(1.4rem) translateY(-2px);
    }
    .info {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        padding-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: max-content;
    }
    .name {
        font-size: var(--fs-60);
        font-weight: 700;
    }
    .role {
        font-weight: 600;
        color: var(--accent-text);
    }
    .socials {
        padding-top: .5rem;
        display: flex;

        --icon-clr: rgba(160,160,160,0.7);
        --icon-size: 2.2rem;
        --icon-hover: var(--accent-fig);
    }
</style>