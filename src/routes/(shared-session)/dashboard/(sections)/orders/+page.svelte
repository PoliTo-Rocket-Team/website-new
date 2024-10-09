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

<Modal bind:use={newOrder} empty={newOrder ? newOrder : Order.empty(data.requesterId)} let:data={orders_data}>

    <h3>Add a new Order</h3>
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


<!-- {#each data.orders as order, i}
    <Order.Admin
        data={order}
        on:saved={e => {
            data.orders[i] = e.detail;
        }}
    />
{:else}
    <p>No positions found</p>
{/each} -->

<button
    class="btn center"
    on:click={() => {
        newOrder = Order.empty(data.requesterId);
    }}
>
    Add a new order
</button>


<style>
</style>
