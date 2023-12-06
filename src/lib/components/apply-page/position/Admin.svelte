<script lang="ts">
    import Wrapper from "./Wrapper.svelte";
    import Header from "./EditorHeader.svelte";
    import Content from "./Content.svelte";
    import Form from "./Form.svelte";
    import type { PositionData } from "./validation";

    export let data: PositionData;
    export let code: string;

    let edit = false;
</script>

<Wrapper>
    <Header
        role={data.name}
        code="{code}-{data.number.toString().padStart(3, '0')}"
        slot="header"
        open={data.open}
    />
    <svelte:fragment slot="content">
        {#if edit}
            <Form {data} on:save />
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
                <button type="button" class="btn btn--low">Delete</button>
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
