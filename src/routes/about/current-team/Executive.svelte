<script lang="ts">
    import { trackmouse } from "$lib/trackmouse";
    import { spring } from "svelte/motion";
    import Icon from "$lib/icons/Icon.svelte";

    export let name: string;
    export let role: string;
    export let mail: string;
    export let linkedin: string;
    export let img: string;

    export let inverse = false;
</script>

<div class="container" class:inverse>
    <div class="text">
        <h3>{name}</h3>
        <span class="role">{role}</span>
        <slot />
    </div>
    <div class="side">
        <img src="/members/{img}" alt="{name} nicely dressed">
        <ul class="contacts">
            <li>
                <a href="https://www.linkedin.com/in/{linkedin}" target="_blank" rel="noreferrer"><Icon icon="LinkedIn" /><span>LinkedIn</span></a>
            </li>
            <li>
                <a href="mailto:{mail}" target="_blank" rel="noreferrer"><Icon icon="Email" /><span>Email</span></a>
            </li>
        </ul>
    </div>
</div>

<style>
    img {
        max-width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: .4rem;
    }
    h3 {
        font-size: var(--fs-65);
    }
    .role {
        font-size: var(--fs-50);
        font-weight: 600;
        color: var(--accent-text);
    }
    .contacts {
        margin-top: .7rem;
        list-style: none;
        --icon-clr: var(--fg-1);
        --icon-size: 2.2rem;
    }
    .contacts span {
        margin-left: .2ch;
    }
    a {
        display: flex;
        align-items: center;
        width: fit-content;
    }
    a:hover {
        --icon-clr: var(--accent-fig)
    }
    a:hover > :global(svg) {
        animation: shake .25s ease;
    }
    @media (max-width: 40rem) {
        .side {
            margin-top: 1rem;
        }
    }
    @media (min-width: 40rem) {
        .container {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1.3rem;
        }
        .text {
            max-width: 40ch;
        }
        :not(.inverse) .text {
            text-align: right;
            margin-left: auto;
        }

        .inverse {
            grid-template-columns: 1fr 2fr;
        }
        .inverse .side { 
            grid-row: 1;
            grid-column: 1; 
        }
        .inverse .text { 
            grid-row: 1;
            grid-column: 2; 
        }
        .inverse a {
            flex-direction: row-reverse;
            margin-left: auto;
        }
    }
</style>