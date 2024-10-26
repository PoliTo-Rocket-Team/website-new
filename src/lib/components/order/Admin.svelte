<script lang="ts">
    import Wrapper from "./Wrapper.svelte";
    import Header from "./EditorHeader.svelte";
    import Content from "./Content.svelte";
    import type { OrdersData } from "./validation";

    export let data: OrdersData & { requesterName: string };
</script>

<Wrapper>
    <Header
        name={data.name}
        quantity={data.quantity}
        price={data.price}
        requesterName={data.requesterName}
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
        {#if data.status === "pending"}
            <div class="btns">
                <button type="button" class="btn btn--low"> Reject </button>
                <button type="button" class="btn"> Accept </button>
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
