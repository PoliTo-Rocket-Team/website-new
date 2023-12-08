<script lang="ts">
    import type { Schema } from "yup";
    import { getErrs, label2name } from "./utils";

    export let value: any = undefined;
    export let schema: Schema;
    export let label: string;
    export let name: string = label2name(label);
    export let type: "text" | "number" | "textarea";
    export let null_on_empty = false;

    $: isnum = type === "number";
    let skip = true;
    let errors: string[] = [];
    async function oninput(this: HTMLInputElement | HTMLTextAreaElement) {
        if (skip) return;
        const v =
            null_on_empty && !this.value.length
                ? null
                : isnum
                  ? +this.value
                  : this.value;
        errors = await getErrs(schema, v);
    }
    async function startcheck(this: HTMLInputElement | HTMLTextAreaElement) {
        skip = false;
        errors = await getErrs(schema, this.value);
    }
</script>

<label>
    <span>{label}</span>
    {#if type === "textarea"}
        <textarea
            {name}
            {value}
            rows="10"
            on:input={oninput}
            on:change|once={startcheck}
        ></textarea>
    {:else}
        <input
            {type}
            {name}
            {value}
            on:input={oninput}
            on:change|once={startcheck}
        />
    {/if}
    <ul class="error">
        {#each errors as e}
            <li>{e}</li>
        {/each}
    </ul>
</label>

<style>
    label {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    textarea {
        resize: vertical;
    }
</style>
