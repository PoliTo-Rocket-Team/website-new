<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit";
    import { fields, save, type OrdersData } from "./validation";
    import { enhance } from "$app/forms";

    import Field from "$lib/components/form/Field.svelte";
    import { signal } from "$lib/components/form/utils";
    import { createEventDispatcher, getContext } from "svelte";
    import type { SupabaseClient } from "@supabase/supabase-js";
    import type { Database } from "$lib/supabase";
    import { browser } from "$app/environment";
    import Loading from "$lib/Loading.svelte";

    const dispatch = createEventDispatcher<{
        cancel: void;
        saved: OrdersData;
    }>();

    const supabase = getContext<SupabaseClient<Database>>("supabase");
    if (!supabase && browser) alert("Supabase not passed by context");

    export let data: OrdersData;
    export let requester: {
        id: number;
        first_name: string;
        last_name: string;
    };

    let errors: string[] = [];
    let submitting = false;

    const submit: SubmitFunction = async ({ cancel, formData }) => {
        cancel();
        submitting = true;
        const res = await save(formData, supabase);
        console.log(res.errors);
        errors = res.errors;

        if (res.data) {
            resetter.notify();
            const savedData = { ...res.data, requester };
            // Dispatch event with proper typing
            dispatch("saved", savedData);
        }
        submitting = false;
    };
    const resetter = signal();
</script>

<form
    class="form-container"
    method="post"
    action="/dashboard/orders"
    use:enhance={submit}
>
    <input type="hidden" name="requester" value={requester.id} />
    <Field
        label="Item Name*"
        type="text"
        name="name"
        schema={fields.name}
        value={data.name}
        resetter={resetter.sub}
    />
    <div class="split">
        <Field
            label="Price*"
            type="number"
            placeholder="0.00€"
            schema={fields.price}
            name="price"
            resetter={resetter.sub}
            step="0.01"
        />
        <Field
            label="Quantity"
            type="number"
            schema={fields.quantity}
            name="quantity"
            value={data.quantity}
            resetter={resetter.sub}
        />
    </div>
    <Field
        label="Description*"
        type="textarea"
        name="description"
        schema={fields.description}
        value={data.description}
        resetter={resetter.sub}
    />
    <Field
        label="Reason*"
        type="textarea"
        name="reason"
        schema={fields.reason}
        value={data.reason}
        resetter={resetter.sub}
    />

    <!-- File Upload Section -->
    <Field
        label="Upload Quote"
        type="file"
        name="quote"
        schema={fields.quote}
        resetter={resetter.sub}
    />

    <ul class="error">
        {#each errors as e}
            <li>{e}</li>
        {/each}
    </ul>

    <div class="btns">
        {#if submitting}
            <Loading>
                <span class="btn">Loading...</span>
            </Loading>
        {:else}
            <button
                type="reset"
                class="btn btn--low"
                on:click={() => {
                    resetter.notify();
                    dispatch("cancel");
                }}>Cancel</button
            >
            <button type="submit" class="btn">Save</button>
        {/if}
    </div>
</form>

<style>
    .split {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
    }

    .btns {
        display: flex;
        justify-content: end;
        column-gap: 1rem;
        margin-top: 2rem;
    }
</style>
