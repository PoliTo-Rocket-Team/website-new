<script lang="ts">
    import Wrapper from "./Wrapper.svelte";
    import Header from "./EditorHeader.svelte";
    import Content from "./Content.svelte";
    import Form from "./Form.svelte";
    import type { PositionData } from "./validation";
    import { createEventDispatcher } from "svelte";

    export let data: PositionData;
    export let code: string;

    let edit = false;

    const dispatch = createEventDispatcher<{
        saved: PositionData;
        delete: { id: number; name: string };
        open: { open: boolean; id: number };
    }>();

    function del() {
        dispatch("delete", { id: data.id, name: data.name });
    }
    function handelOpen() {
        data.open = !data.open;
        let information = { open: data.open, id: data.id };

        dispatch("open", information);
    }
</script>

<Wrapper>
    <Header
        role={data.name}
        code="{code}-{data.number.toString().padStart(3, '0')}"
        slot="header"
        open={data.open}
        on:open={handelOpen}
    />
    <svelte:fragment slot="content">
        {#if edit}
            <Form
                {data}
                on:saved={e => {
                    edit = false;
                    dispatch("saved", e.detail);
                }}
                on:cancel={() => (edit = false)}
            />
        {:else}
            <Content
                description={data.description}
                required={data.required}
                desirable={data.desirable}
                form={data.form}
            />
            <div class="btns">
                <button type="button" class="btn" on:click={() => (edit = true)}
                    >Edit</button
                >
                <button type="button" class="btn btn--low" on:click={del}>
                    Delete
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
