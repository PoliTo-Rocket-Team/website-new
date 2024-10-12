<script lang="ts">
    import "@fontsource/anonymous-pro/400.css";
    export let name: string | null;
    export let quantity: number | null;
    export let price: number | null;
    export let requesterName: string | null;
    export let status: string | null;

    // export let total = price * quantity;
    $: total = price * quantity;
</script>
    <summary>
        <h3>{name}</h3>
        <h3>{quantity}</h3>
        <h3>{price}€</h3>
        <h3>{total}€</h3>
        <h3>{requesterName}</h3>
        <h3>{status}</h3>
    </summary>

<style lang="scss">
    $marker-dim: 0.3rem;

    summary {
        padding: 1rem;
        display: grid;
        grid-template-columns: repeat(6, 1fr) $marker-dim;
        align-items: center;
        column-gap: 1rem;
        white-space: nowrap;

        
    }
    summary h3:last-child {
        margin-left: auto; 
        padding: 0; 
    }
    summary h3:first-child {
        min-width: 10rem; 
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis; 
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
</style>
