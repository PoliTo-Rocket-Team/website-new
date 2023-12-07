<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit";
    import { fields, save, type PositionData } from "./validation";
    import { enhance } from "$app/forms";

    import Field from "$lib/components/form/Field.svelte";
    import List from "$lib/components/form/List.svelte";
    import { createEventDispatcher } from "svelte";
    import type { SupabaseClient } from "@supabase/supabase-js";
    import type { Database } from "$lib/supabase";

    const dispatch = createEventDispatcher<{
        cancel: void;
        saved: PositionData;
    }>();

    /** If the division is passed, creation of position is assumed */
    export let division: number | null = null;
    export let supabase: SupabaseClient<Database>;
    export let data: PositionData = {
        id: -1,
        name: "",
        description: "",
        desirable: [],
        required: [],
        number: 0,
        form: "",
        open: true,
    };

    let errors: string[] = [];
    const submit: SubmitFunction = async ({ cancel, formData }) => {
        cancel();
        const res = await save(formData, supabase);
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
    <Field label="Name" type="text" schema={fields.name} value={data.name} />
    {#if division}
        <input type="hidden" name="division" value={division} />
        <Field
            label="Number"
            type="number"
            schema={fields.number}
            value={data.number}
        />
    {/if}
    <Field
        label="Form ID"
        type="text"
        schema={fields.form}
        name="form"
        value={data.form}
    />
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
            type="button"
            class="btn btn--low"
            on:click={() => dispatch("cancel")}>Cancel</button
        >
        <button type="submit" class="btn">Save</button>
    </div>
</form>
