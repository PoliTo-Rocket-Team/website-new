<script lang="ts">
    import { flip } from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";
    import { getErrs, label2name, type SignalSub } from "./utils";
    import type { Schema } from "yup";
    import type { Readable } from "svelte/store";
    import { onDestroy } from "svelte";

    export let name: string;
    export let values: string[] = [];
    export let schema: Schema;
    export let resetter: SignalSub | undefined = undefined;

    const flipDurationMs = 300;

    let next_id = values.length;
    let items = values.map((value, id) => ({ id, value }));

    function move(e: CustomEvent) {
        items = e.detail.items;
    }
    function add() {
        items.push({ id: next_id++, value: "" });
        items = items;
    }
    function remove(this: HTMLButtonElement) {
        const i = +(this.dataset.index || 0);
        items.splice(i, 1);
        items = items;
    }

    if (resetter)
        onDestroy(
            resetter(() => {
                items = [];
            })
        );
</script>

<div class="wrap">
    <ul
        use:dndzone={{ items, type: name, flipDurationMs }}
        on:consider={move}
        on:finalize={move}
    >
        {#each items as item, i (item.id)}
            <li class="item" animate:flip={{ duration: flipDurationMs }}>
                <input
                    type="text"
                    autocomplete="off"
                    {name}
                    bind:value={item.value}
                />
                <button
                    type="button"
                    class="del"
                    data-index={i}
                    on:click={remove}
                >
                    <div></div>
                    <span>delete</span>
                    <div></div>
                </button>
            </li>
        {/each}
    </ul>
    <button type="button" class="btn btn--low add" on:click={add}>Add</button>
    <ul class="error">
        {#await getErrs( schema, items.map(v => v.value) ) then errs}
            {#each errs as e}
                <li>{e}</li>
            {/each}
        {/await}
    </ul>
</div>

<style>
    .wrap {
        margin: 0.5rem 0;
    }
    .item {
        display: flex;
        align-items: center;
        justify-content: stretch;
        gap: 1ch;
        padding: 0.2rem;
    }
    .item::before {
        content: "";
        height: 1.2rem;
        width: 1.2rem;
        background-image: radial-gradient(currentColor 0.06rem, transparent 0);
        background-size: 0.3rem 0.3rem;
        /* background-position: -0.15rem -0.15rem; */
    }
    input {
        flex-grow: 1;
    }
    .del {
        width: 1.5rem;
        height: 1.5rem;
        position: relative;
        border-radius: 0.2rem;
        opacity: 0.5;
        transition:
            background-color 0.1s,
            opacity 0.1s;
    }
    .del:hover {
        background-color: #8883;
        opacity: 1;
    }
    .del span {
        position: absolute;
        transform: scale(0);
    }
    .del div {
        position: absolute;
        top: 50%;
        left: 10%;
        width: 80%;
        height: 0.15rem;
        border-radius: 0.1rem;
        background-color: currentColor;
    }
    .del div:first-child {
        transform: translateY(-50%) rotate(-45deg);
    }
    .del div:last-child {
        transform: translateY(-50%) rotate(45deg);
    }
    .add {
        margin-top: 0.5rem;
    }
</style>
