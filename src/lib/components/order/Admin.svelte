<script lang="ts">
    import Wrapper from "./Wrapper.svelte";
    import Header from "./EditorHeader.svelte";
    import Content from "./Content.svelte";
    import type { OrdersData } from "./validation";
    import { createEventDispatcher } from "svelte";

    export let data: OrdersData;
    type OrderStatus = "pending" | "accepted" | "rejected";
    export let isPresident: boolean;

    const dispatch = createEventDispatcher<{
        status: { status: OrderStatus; id: number };
    }>();

    function handleStatus(status: OrderStatus) {
        return () => {
            const information = { status, id: data.id };
            dispatch("status", information);
            data.status = status;
        };
    }
    
</script>

<Wrapper>
    <Header
        name={data.name}
        quantity={data.quantity}
        price={data.price}
        requester={data.requester}
        status={data.status}
        slot="header"
    />
    <svelte:fragment slot="content">
        <Content
            description={data.description}
            reason={data.reason}
            quoteName={data.quoteName}
            createdAt={data.createdAt}
        />
        {#if data.status === "pending" && isPresident}
            <div class="btns">
                <button
                    type="button"
                    on:click={handleStatus("rejected")}
                    class="btn btn--low"
                >
                    Reject
                </button>
                <button
                    type="button"
                    on:click={handleStatus("accepted")}
                    class="btn"
                >
                    Accept
                </button>
            </div>
        {/if}
    </svelte:fragment>
</Wrapper>

<style>
    .btns {
        display: flex;
        justify-content: center;
    }
    .btn {
        margin: 0.5rem;
    }
</style>
