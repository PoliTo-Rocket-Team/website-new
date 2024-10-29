<script lang="ts">
    import type { Schema } from "yup";
    import { getErrs, label2name, type SignalSub } from "./utils";
    import { onDestroy } from "svelte";

    export let value: any = undefined;
    export let schema: Schema;
    export let label: string;
    export let name: string = label2name(label);
    export let type: "text" | "number" | "textarea" | "file";
    export let accept: string = "";
    export let placeholder: string = "";
    export let step: string = "";
    export let null_on_empty = false;
    export let resetter: SignalSub | undefined = undefined;

    $: isnum = type === "number";
    let skip = true;
    let errors: string[] = [];
    let file: File | null = null;

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

    async function onfileinput(this: HTMLInputElement) {
        if (skip) return;
        file = this.files ? this.files[0] : null;
        errors = await getErrs(schema, file);
    }

    async function startcheck(this: HTMLInputElement | HTMLTextAreaElement) {
        if (skip) errors = await getErrs(schema, this.value);
        skip = false;
    }

    if (resetter)
        onDestroy(
            resetter(() => {
                skip = true;
                errors = [];
                // need to set value to something different from "" since it's not binded
                value = undefined;
                value = "";
                file = null;
            })
        );
</script>

<label>
    <span>{label}</span>
    {#if type === "textarea"}
        <textarea
            {name}
            {value}
            rows="6"
            on:change={startcheck}
            on:input={oninput}
        ></textarea>
    {:else if type === "file"}
        <input type="file" {name} on:change={onfileinput} />
    {:else}
        <input
            {type}
            {name}
            {value}
            {accept}
            {placeholder}
            {step}
            autocomplete="off"
            on:input={oninput}
            on:change={startcheck}
            class="input-field"
        />
    {/if}
    <ul class="error">
        {#each errors as e}
            <li>{e}</li>
        {/each}
    </ul>
</label>

<style>
    span {
        font-weight: 500;
        font-size: 1rem;
        margin-bottom: 0.2rem;
    }
    label {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }
    textarea {
        resize: vertical;
        min-height: 4rem;
    }
    /* Remove the number input arrows */
    /* Chrome, Safari, Edge, Opera */
    .input-field::-webkit-outer-spin-button,
    .input-field::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    .input-field[type="number"] {
        -moz-appearance: textfield;
    }
</style>
