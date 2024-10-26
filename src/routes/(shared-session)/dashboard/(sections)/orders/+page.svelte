<script lang="ts">
    import Modal from "$lib/Modal.svelte";
    import { setContext } from "svelte";
    import type { PageData } from "./$types";
    import * as Order from "$lib/components/order";
    import DefineIcons from "$lib/icons/DefineIcons.svelte";

    let newOrder: null | ReturnType<typeof Order.empty> = null;
    export let data: PageData;
    setContext("supabase", data.supabase);

    const orders = data.orders || [];
</script>

<svelte:head>
    <title>Orders | PRT Admin Program</title>
</svelte:head>
<h1>Orders</h1>

{#if data.orders}
    <h3>
        <span>Item name</span>
        <span>Requester</span>
        <span class="total">Price</span>
    </h3>
{/if}

<Modal
    bind:use={newOrder}
    empty={Order.empty(data.requesterId)}
    let:data={orders_data}
>
    <h3 class="new-order">Add a new Order</h3>
    <Order.Form
        creating
        requester={data.requesterId}
        data={orders_data}
        on:cancel={() => (newOrder = null)}
        on:saved={e => {
            console.log("saved");
            orders.splice(0, 0, e.detail);
            data.orders = orders;
            newOrder = null;
        }}
    />
</Modal>

{#each data.orders as order, i}
    <Order.Admin
        data={{
            ...order,
            requesterName: data.requesterName,
            fileName: data.fileName,
        }}
        on:saved={e => {
            data.orders[i] = e.detail;
        }}
    />
{:else}
    <p>No orders found</p>
{/each}

<button
    class="btn center"
    on:click={() => {
        newOrder = Order.empty(data.requesterId);
    }}
>
    Add a new order
</button>

<DefineIcons />

<style>
    h3 {
        padding: 1rem;
        display: grid;
        grid-template-columns: 2fr 1fr 12rem 3.3rem;
        column-gap: 1.5rem;
    }
    .total {
        text-align: right;
    }
    .new-order {
        margin-bottom: 1rem;
        font-size: 1.7rem;
    }
    .center {
        margin: 2rem auto;
    }
</style>
