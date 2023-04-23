<script lang="ts">
    import { onDestroy } from "svelte";
    import { tweened } from "svelte/motion";
    import type { Readable, Unsubscriber } from "svelte/store";
    
    export let field: {
        name: string;
        unit: string|null;
        values: any[];
    }
    export let observe: (node: HTMLElement, cb: (visible: boolean) => void) => void;
    export let selection: Readable<number>;

    const numeric = field.values.every(v => typeof v === "number");
    const decimals = numeric ? Math.max.apply(Math, field.values.map(countDecimals)) : 0;
    const smooth = numeric ? tweened(0) : null;
    
    let unsub: Unsubscriber | null = null;
    onDestroy(() => unsub && unsub());

    function onvisible(visible: boolean) {
        if(!numeric) return;
        unsub && unsub();
        if(visible) unsub = selection.subscribe(i => smooth!.set(field.values[i]));
        else {
            smooth!.set(0);
            unsub = null;
        }
    }


    function countDecimals(n: number) {
        return Math.floor(n) === n ? 0 : n.toString().split('.')[1].length || 0;
    }
</script>

<span class="name" use:observe={onvisible}>{field.name}</span>
<!-- svelte-ignore -->
<span class="value">{#if numeric}{$smooth.toFixed(decimals)}{:else}{field.values[$selection]}{/if} {#if field.unit}{field.unit}{/if}</span>

<style>
    .name {
        text-align: right;
    }
    .value {
        font-size: 1.2em;
        font-weight: 500;
    }
</style>