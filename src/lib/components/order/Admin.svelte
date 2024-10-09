<script lang="ts">
    import Wrapper from "./Wrapper.svelte";
    import Header from "./EditorHeader.svelte";
    import Content from "./Content.svelte";
    import type { OrdersData } from "./validation";


    export let data: OrdersData;

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
                quote_url={data.quote_url}
                createdAt={data.createdAt}
            />
            <div class="btns">
                <button type="button" class="btn btn--low" >
                    Reject
                </button>
                <button type="button" class="btn" >
                    Accept
                </button>
            </div>
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
