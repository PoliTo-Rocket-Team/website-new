<script lang="ts">
    import Wrapper from "./Wrapper.svelte";
    import Header from "./EditorHeader.svelte";
    import Content from "./Content.svelte";
    // import Form from "./Form.svelte";
    import type { ExtendedOrdersData } from "./validation";
    import { createEventDispatcher } from "svelte";


    export let data: ExtendedOrdersData;

    // let edit = false;

    // const dispatch = createEventDispatcher<{
    //     saved: ExtendedOrdersData;
    //     // delete: { id: number; name: string };
    // }>();

    // function del() {
    //     dispatch("delete", { id: data.id, name: data.name });
    // }


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
        <!-- {#if edit}
            <Form
                {data}
                on:saved={e => {
                    edit = false;
                    dispatch("saved", e.detail);
                }}
                on:cancel={() => (edit = false)}
            />
        {:else} -->
            <Content
                description={data.description}
                reason={data.reason}
                quote={data.quote}
                createdAt={data.createdAt}
            />
            <div class="btns">


                <!-- <button type="button" class="btn" on:click={() => (edit = true)}
                    >Edit</button -->
                >
                <!-- <button type="button" class="btn btn--low" on:click={del}>
                    Delete
                </button> -->

                <button type="button" class="btn btn--low" >
                    Reject
                </button>
                <button type="button" class="btn" >
                    Accept
                </button>
            </div>
        <!-- {/if} -->
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
