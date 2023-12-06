<script lang="ts">
    import { flip } from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";
    import { getErrs, label2name } from "./utils";
    import type { Schema } from "yup";

    export let name: string;
    export let values: string[] = [];
    export let schema: Schema;

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
</script>

<div>
    <ul
        use:dndzone={{ items, type: name, flipDurationMs }}
        on:consider={move}
        on:finalize={move}
    >
        {#each items as item, i (item.id)}
            <li animate:flip={{ duration: flipDurationMs }}>
                <input type="text" {name} bind:value={item.value} />
                <button type="button" data-index={i} on:click={remove}
                    >delete</button
                >
            </li>
        {/each}
    </ul>
    <button type="button" on:click={add}>Add</button>
    <ul class="error">
        {#await getErrs( schema, items.map(v => v.value) ) then errs}
            {#each errs as e}
                <li>{e}</li>
            {/each}
        {/await}
    </ul>
</div>
