<script lang="ts">
    import type { SubmitFunction } from "@sveltejs/kit";
    import { fields, type PositionData } from "./validation";
    import { enhance } from "$app/forms";

    import Field from "$lib/components/form/Field.svelte";
    import List from "$lib/components/form/List.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{
        cancel: void;
        save: PositionData;
    }>();

    // export let supabase: SupabaseClient;
    
    export let creating: number | null = null;
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

    const submit: SubmitFunction = ({ cancel }) => {
        cancel();
        // dispatch("confirm");
    };
</script>

<form class="form-container" method="post" action="./" use:enhance={submit}>
    {#if data.id > 0}
        <input type="hidden" name="id" value={data.id} />
    {/if}
    <Field label="Name" type="text" schema={fields.name} value={data.name} />
    {#if creating}
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

    <div class="btns">
        <button
            type="button"
            class="btn btn--low"
            on:click={() => dispatch("cancel")}>Cancel</button
        >
        <button type="submit" class="btn">Save</button>
    </div>
</form>
