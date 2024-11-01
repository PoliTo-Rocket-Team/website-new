<script lang="ts">
    import "@fontsource/anonymous-pro/400.css";
    import type { Database } from "$lib/supabase";
    import Icon from "$lib/icons/Icon.svelte";
    export let name: string;
    export let quantity: number;
    export let price: number;
    export let requester: { first_name: string; last_name: string };
    export let status: Database["public"]["Enums"]["request_status"];

    const fmt = new Intl.NumberFormat("en-UK", {
        style: "currency",
        currency: "EUR",
    });
</script>

<summary>
    <h3>{name}</h3>
    <span class="requester">{requester.first_name} {requester.last_name}</span>
    <span class="price">
        {fmt.format(price)}
        {#if quantity > 1}
            <span class="op">&#10005;</span>{quantity}<span class="op">=</span
            >{fmt.format(price * quantity)}
        {/if}
    </span>
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
        grid-template-columns: 2fr 1fr minmax(12rem, 1fr) 1.5rem 0.3rem;
        align-items: center;
        column-gap: 1.5rem;
        white-space: nowrap;
        --icon-size: 1.5rem;
    }
    .price {
        text-align: right;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .op {
        opacity: 0.5;
        font-family: "Anonymous Pro", monospace;
        padding-inline: 0.4ch;
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
