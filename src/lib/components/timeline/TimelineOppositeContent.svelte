<script lang="ts">
    import { getContext } from "svelte";
    import type { TimelineConfig, TimelinePosition } from "$lib/types.d.ts";

    export let style: string | null = null;

    const config = getContext<TimelineConfig>("TimelineConfig");
    const parentPosition = getContext<TimelinePosition>("ParentPosition");

    const itemPosition = parentPosition
        ? parentPosition
        : config?.rootPosition || "left";
</script>

<div class={`timeline-opposite-content ${itemPosition}`} {style}>
    <slot />
</div>

<style>
    .timeline-opposite-content {
        margin: 0;
        flex: 1;
        margin-right: auto;
        margin: 6px 16px;
    }

    .left {
        text-align: left;
    }

    .right {
        text-align: right;
    }
</style>
