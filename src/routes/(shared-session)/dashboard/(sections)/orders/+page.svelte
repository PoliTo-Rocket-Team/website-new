<script lang="ts">
    import Modal from "$lib/Modal.svelte";
    import { setContext } from "svelte";
    import type { PageData } from "./$types";
    import * as Order from "$lib/components/order";

    let newOrder: ReturnType<typeof Order.empty> | null = null;
    export let data: PageData;
    setContext("supabase", data.supabase);

    const orders = data.orders || [];    

</script>

<svelte:head>
    <title>Orders | PRT Admin Program</title>
</svelte:head>
<h1>Orders</h1>

{#if data.orders}
    <div class='title'>
        <h3 class='name'>Name</h3>
        <h3>Quantity</h3>
        <h3>Price</h3>
        <h3>Total</h3>
        <h3>Requester</h3>
        <h3>Status</h3>
    </div>
{/if}

<Modal bind:use={newOrder} empty={newOrder ? newOrder : Order.empty(data.requesterId)} let:data={orders_data}>

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
        data={{...order, requesterName: data.requesterName}}
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


<style>
    .title {
        padding: 1rem;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        align-items: center;
        column-gap: 1rem;
    }
    .name {
        min-width: 18rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .new-order {
        margin-bottom: 1rem;
        font-size: 1.7rem;
    }
    .center {
        margin: 2rem auto;
    }
</style>