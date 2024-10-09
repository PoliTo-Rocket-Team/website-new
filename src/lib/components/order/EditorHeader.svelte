<script lang="ts">
    import "@fontsource/anonymous-pro/400.css";
    import { expo } from "@slidy/easing";
    import { createEventDispatcher } from "svelte";
    export let name: string;
    export let quantity: number ;
    export let price: number;
    export let requester: number;
    export let status: string;

    export let total = 0;
    
</script>

<summary>
    <h3>{name}</h3>
    <h3>{quantity}</h3>
    <h3>{price}</h3>
    <h3>{total}</h3>
    <h3>{requester}</h3>
    <h3>{status}</h3>
    
</summary>

<style lang="scss">
    $marker-dim: 0.3rem;

    summary {
        padding: 0.6rem 0.8rem;
        display: grid;
        grid-template-columns: 1fr auto auto $marker-dim;
        grid-auto-flow: dense;
        align-items: center;
        column-gap: 1rem;
    }
    summary::-webkit-details-marker {
        display: none;
    }
    summary::after {
        content: "";
        width: 0;
        height: 0;
        border-right: $marker-dim solid currentColor;
        border-top: $marker-dim solid transparent;
        border-bottom: $marker-dim solid transparent;
        transform: translateX(-1px);
        transition: transform 150ms;
    }
    :global(details[open]) > summary::after {
        transform: translateX(1px) rotate(-90deg);
    }

   

    // .slider {
    //     position: absolute;
    //     cursor: pointer;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    //     bottom: 0;
    //     width: 100%;
    //     height: 100%;
    //     background-color: #ccc;
    //     border-radius: 3rem;
    //     transition: background-color 0.2s;
    // }

    // .slider:before {
    //     display: block;
    //     position: absolute;
    //     content: "";
    //     height: 1.4rem;
    //     width: 1.4rem;
    //     left: 0.2rem;
    //     top: 50%;
    //     background-color: white;
    //     transition: transform 0.2s;
    //     transform: translateY(-50%);
    //     border-radius: 34px;
    // }

    // input:checked + .slider {
    //     background-color: var(--accent-fig);
    // }

    // input:focus + .slider {
    //     box-shadow: 0 0 1px #1c852e;
    // }

    // input:checked + .slider:before {
    //     transform: translate(1.6rem, -50%);
    // }
</style>
