<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit";
    import { fields, save, type PositionData } from "./validation";
    import { enhance } from "$app/forms";

    import Field from "$lib/components/form/Field.svelte";
    import List from "$lib/components/form/List.svelte";
    import { createEventDispatcher, getContext } from "svelte";
    import type { SupabaseClient } from "@supabase/supabase-js";
    import type { Database } from "$lib/supabase";
    import { browser } from "$app/environment";

    const dispatch = createEventDispatcher<{
        cancel: void;
        saved: PositionData;
        open: boolean;
    }>();

    const supabase = getContext<SupabaseClient<Database>>("supabase");
    if (!supabase && browser) alert("Supabse not passed by context");

    /** If the division is passed, creation of position is assumed */
    export let creating = false;
    export let data: PositionData;

    let errors: string[] = [];
    const submit: SubmitFunction = async ({ cancel, formData }) => {
        cancel();
        const res = await save(formData, supabase);
        console.log(res.errors);
        errors = res.errors;
        if (res.data) dispatch("saved", res.data);
    };
</script>

<form
    class="form-container"
    method="post"
    action="/dashboard/positions"
    use:enhance={submit}
>
    {#if data.id > 0}
        <input type="hidden" name="id" value={data.id} />
    {/if}
    {#if creating}
        <input type="hidden" name="division" value={data.division} />
        <input type="hidden" name="number" value={data.number} />
    {/if}

    <div class="split">
        <Field
            label="Name"
            type="text"
            schema={fields.name}
            value={data.name}
        />
        <Field
            label="Form ID"
            type="text"
            schema={fields.form}
            name="form"
            value={data.form}
            null_on_empty
        />
    </div>
    <Field
        label="Description"
        type="textarea"
        schema={fields.description}
        value={data.description}
    />

    <h4>Required skills</h4>
    <p>
        Please, put here only the skills that it is impossible for a new member
        to learn.
    </p>
    <List
        name="required"
        schema={fields.desirable}
        values={data.required || []}
    />
    <h4>Desirable skills</h4>
    <List name="desirable" schema={fields.desirable} values={data.desirable} />
    <ul class="error">
        {#each errors as e}
            <li>{e}</li>
        {/each}
    </ul>

    <div class="btns">
        <button
            type={creating ? "reset" : "button"}
            class="btn btn--low"
            on:click={() => dispatch("cancel")}>Cancel</button
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
    }
    h4 {
        font-weight: 500;
        margin-top: 1.5rem;
    }
    .btns {
        display: flex;
        justify-content: end;
        column-gap: 1rem;
        margin-top: 2rem;
    }
</style>
