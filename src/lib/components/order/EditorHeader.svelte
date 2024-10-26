<script lang="ts">
    import "@fontsource/anonymous-pro/400.css";
    import type { Database } from "$lib/supabase";
    import Icon from "$lib/icons/Icon.svelte";
    export let name: string;
    export let quantity: number;
    export let price: number;
    export let requesterName: string | null;
    export let status: Database["public"]["Enums"]["request_status"];

    // export let total = price * quantity;
    $: total = price * quantity;
</script>

<summary>
    <h3>{name}</h3>
    <span class="requester">{requesterName}</span>
    <span class="total">{total}€</span>
    <Icon
        title={status}
        icon={status === "accepted"
            ? "square_check"
            : status === "rejected"
              ? "square_cross"
              : "square_empty"}
    />
</summary>

<style>
    summary {
        padding: 0.8rem 1rem;
        display: grid;
        grid-template-columns: 2fr 10ch 1fr auto 0.3rem;
        align-items: center;
        column-gap: 1.5rem;
        white-space: nowrap;
        --icon-size: 1.5rem;
    }
    .total {
        text-align: right;
    }

    h3 {
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
        border-right: 0.3rem solid currentColor;
        border-top: 0.3rem solid transparent;
        border-bottom: 0.3rem solid transparent;
        transform: translateX(-1px);
        transition: transform 150ms;
    }
    :global(details[open]) > summary::after {
        transform: translateX(1px) rotate(-90deg);
    }
</style>
