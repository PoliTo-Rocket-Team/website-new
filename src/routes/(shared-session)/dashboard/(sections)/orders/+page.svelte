<script lang="ts">
    import Modal from "$lib/Modal.svelte";
    import { setContext } from "svelte";
    import type { PageData } from "./$types";
    import * as Order from "$lib/components/order";
    import DefineIcons from "$lib/icons/DefineIcons.svelte";
    import { goto } from "$app/navigation";

    let newOrder: null | ReturnType<typeof Order.empty> = null;
    export let data: PageData;
    setContext("supabase", data.supabase);

    const orders = data.orders || [];

    type OrderStatus = "pending" | "accepted" | "rejected";

    async function handleStatus(
        event: CustomEvent<{ status: OrderStatus; id: number }>
    ) {
        const res = await data.supabase
            .from("orders")
            .update({ status: event.detail.status })
            .eq("id", event.detail.id);

        if (res.error) {
            alert(
                `Could not reject/accept the order:\n\n${res.error.message}\n${res.error.details}`
            );
        }
    }
    const isPresident = data.person.is_president;
</script>

<svelte:head>
    <title>Orders | PRT Admin Program</title>
</svelte:head>
<h1>Orders</h1>
<p>
    Here you can request the team leader to place one or more orders. Keep in
    mind that you should use this page for big orders which cannot be done using
    the team credit card
</p>

<button
    class="btn"
    on:click={() => {
        newOrder = Order.empty(data.person);
    }}
>
    Add a new order
</button>

<Modal
    bind:use={newOrder}
    empty={Order.empty(data.person)}
    let:data={orders_data}
>
    <h3 class="new-order">Add a new Order</h3>
    <Order.Form
        requester={data.person}
        data={orders_data}
        on:cancel={() => (newOrder = null)}
        on:saved={e => {
            console.log("saved");
            orders.splice(0, 0, e.detail);
            data.orders = orders;
            newOrder = null;
            if (location.search) goto("/dashboard/orders");
        }}
    />
</Modal>

{#if data.orders.length}
    <h3>
        <span>Item name</span>
        <span>Requester</span>
        <span class="total">Price</span>
    </h3>
    {#each data.orders as order, i}
        <Order.Admin
            data={order}
            on:saved={e => {
                data.orders[i] = e.detail;
            }}
            on:status={handleStatus}
            {isPresident}
        />
    {/each}
{/if}
<div class="btns">
    {#if !data.latest}
        <a
            href={`/dashboard/orders?after=${data.orders[0].id}`}
            class="btn btn--low">Newer orders</a
        >
    {/if}
    {#if data.orders.length === 25}
        <a
            href={`/dashboard/orders?before=${
                data.orders[data.orders.length - 1].id
            }`}
            class="btn btn--low older">Older orders</a
        >
    {/if}
</div>

<DefineIcons />

<style>
    h3 {
        padding: 1rem;
        display: grid;
        grid-template-columns: 2fr 1fr 12rem 3.3rem;
        column-gap: 1.5rem;
    }
    p {
        max-width: 60ch;
    }
    .btn {
        margin: 2rem 0;
        text-decoration: none;
    }
    .total {
        text-align: right;
    }
    .new-order {
        margin-bottom: 1rem;
        font-size: 1.7rem;
    }
    .btns {
        display: flex;
    }
    .older {
        margin-left: auto;
    }
</style>
