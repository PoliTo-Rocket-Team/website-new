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

    const dispatch = createEventDispatcher<{
        cancel: void;
        saved: OrdersData;
    }>();



    const supabase = getContext<SupabaseClient<Database>>("supabase");
    if (!supabase && browser) alert("Supabase not passed by context");

    /** If the requester is passed, creation of position is assumed */
    export let creating = false;
    export let data: OrdersData;

    let errors: string[] = [];
    // const submit: SubmitFunction = async ({ cancel, formData }) => {
    //     cancel();
    //     const res = await save(formData, supabase);
    //     console.log(res.errors);
    //     errors = res.errors;
    //     if (res.data) {
    //         resetter.notify();
    //         dispatch("saved", {
    //             ...res.data,
    //             quote: (formData.get("quote") as File) || null,
    //         });
    //     }
    // };

    type OrderSaveData = OrdersData & { quote: File | null };

    const submit: SubmitFunction = async ({ cancel, formData }) => {
        cancel();
        const res = await save(formData, supabase);
        console.log(res.errors);
        errors = res.errors;

        if (res.data) {
            resetter.notify();

            const quote = (formData.get("quote") as File) || null;
            const savedData: OrderSaveData = { ...res.data, quote };

            // Dispatch event with proper typing
            dispatch("saved", savedData);
        }
    };

    const resetter = signal();

    // a bit of hack: assuming empty data when number is zero
    // $: if (data.number === 0) resetter.notify();

    export let requester;
</script>

<form
    class="form-container"
    method="post"
    action="/dashboard/orders"
    use:enhance={submit}
>
    {#if creating}
        <input type="hidden" name="requester" value={requester} />
    {/if}

    <div class="split">
        <Field
            label="Item Name"
            type="text"
            name="name"
            schema={fields.name}
            value={data.name}
            resetter={resetter.sub}
        />
        <div>
            <Field
                label="Price"
                type="text"
                schema={fields.price}
                name="price"
                value={data.price}
                resetter={resetter.sub}
            />
            <Field
                label="Quantity"
                type="text"
                schema={fields.quantity}
                name="quantity"
                value={data.quantity}
                resetter={resetter.sub}
            />
        </div>
    </div>
    <Field
        label="Description"
        type="textarea"
        name="description"
        schema={fields.description}
        value={data.description}
        resetter={resetter.sub}
    />
    <Field
        label="Reason"
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
        value={data.quote}
        resetter={resetter.sub}
    />

    <ul class="error">
        {#each errors as e}
            <li>{e}</li>
        {/each}
    </ul>

    <div class="btns">
        <button
            type={creating ? "reset" : "button"}
            class="btn btn--low"
            on:click={() => {
                resetter.notify();
                dispatch("cancel");
            }}>Cancel</button
        >
        <button type="submit" class="btn">Save</button>
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
