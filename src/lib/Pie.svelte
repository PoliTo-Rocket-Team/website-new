<script context="module" lang="ts">
    export interface PieSlice {
        value: number;
        label: string;
        color: string;
    }
</script>

<script lang="ts">
    import { trackmouse } from "./trackmouse";

    export let title: string;
    export let threshold: number;
    export let slices: PieSlice[];
    export let rotate = 0;
    export let radius = 10;
    export let scale = 1.1;

    const total = slices.reduce((acc, slice) => acc + slice.value, 0);
    const len = slices.length;
    const angles = new Array(len + 1);
    angles[0] = rotate/180*Math.PI;
    let i;
    for(i =0; i<len; i++) angles[i+1] = angles[i] + slices[i].value/total*Math.PI*2;
    const coss = angles.map(Math.cos);
    const sins = angles.map(Math.sin);
    const center = radius*scale;

    let mx = 0, my=0, left=0;
    let hovered: SVGElement|null = null;
    function enter(this: SVGElement) { hovered = this; }
    function leave(this: SVGElement) { if(hovered == this) hovered = null; }
    function move(x: number, y: number, rect: DOMRect) {
        if(!hovered) return;
        mx = x; my = y;
        left = x+rect.left;
    }
</script>

<div class="pie-chart">
    <div class="svg-wrapper" use:trackmouse={{move}}>
        <div class="label" style="--mx: {mx}px; --my: {my}px; --left: {left}px;" class:show={hovered}>{hovered?.getAttribute("data-label")}</div>
        <svg viewBox="0 0 {2*scale*radius} {2*scale*radius}" >
            {#each slices as slice, i}
                {@const p = slice.value/total}
                {@const p_str = (p*100).toFixed(1) + '%'}
                {@const d = `M${center},${center} L${radius*(scale + coss[i])},${radius*(scale + sins[i])} A${radius},${radius},${p*360},${+(p>0.5)},1,${radius*(scale + coss[i+1])},${radius*(scale + sins[i+1])}Z`}
                {#if slice.value < threshold}
                    <path {d} fill={slice.color} class="pie-slice" data-label="{slice.label} - {p_str}" style="--p: {p};" on:mouseenter={enter} on:mouseleave={leave} />
                {:else}
                    {@const df = 0.85*radius*(1 - Math.min(p*p*12, 0.5))}
                    <g class="pie-slice" data-label="{slice.label} - {p_str}" style="--p: {p};" on:mouseenter={enter} on:mouseleave={leave}>
                        <path {d} fill={slice.color} />
                        <text x={center + df*Math.cos(angles[i] + p*Math.PI)} y={center + df*Math.sin(angles[i] + p*Math.PI)} text-anchor="middle" dominant-baseline="central" fill="white">{p_str}</text>
                    </g>
                {/if}
            {/each}
            {#each {length: len} as _, i}   
                <line x1={center} y1={center} x2={scale*radius*(1+coss[i])} y2={scale*radius*(1+sins[i])} stroke-linecap="round" stroke-width=".2" stroke="var(--bg-0)" />
            {/each}
        </svg>
    </div>
    <div class="legend">
        <h3>{title}</h3>
        <ul>
            {#each slices as slice}
                <li style="--clr: {slice.color};">{slice.label}<span class="hidden"> {(slice.value/total*100).toFixed(1)}%</span></li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .pie-chart {
        display: flex;
        align-items: center;
    }
    .hidden {display: none;}
    h3 {
        font-size: 1.5rem;
        margin-bottom: .5rem;
    }
    ul {list-style: none;}
    li::after,
    li::before {
        display: inline-block;
        width: .8em;
        height: .6em;
        background-color: var(--clr);
    }
    li::before {
        --c: var(--reverse) unset;
        content: var(--c, '');
        margin-right: .5ch;
    }
    li::after {
        --c: var(--reverse) '';
        content: var(--c, unset);
        margin-left: .5ch;
    }

    .svg-wrapper {position: relative;}
    .svg-wrapper, svg {
        width: var(--pie-size, 16rem);
        height: var(--pie-size, 16rem);
        border-radius: 50%;
        flex-shrink: 0;
    }
    .pie-slice {
        transform-origin: center;
        transition: transform .15s ease;
    }
    svg:hover .pie-slice:not(:hover) {
        filter: saturate(.8);
        opacity: 0.4;
    }
    .pie-slice:hover {
        transform: scale(1.1);
    }
    text {font-size: clamp(1px, var(--p) * var(--p) * 100px, 1.5px);}
    .pie-slice:hover text {transform: scale(0);}

    .label {
        z-index: 1;
        position: absolute;
        left: 0;
        top: 0;
        width: max-content;
        transform: scale(0);
        background-color: var(--bg-1);
        color: var(--fg-0);
        font-weight: 500;
        padding: .3em .6em;
        border-radius: .3em;
    }


    @media (max-width: 50rem) {
        .pie-chart {
            flex-direction: column;
            margin: 3rem 0;
        }
        .legend {
            margin-top: 1rem;
            max-width: var(--pie-size, 16rem);
        }
        .label.show {
            transform: translate(
                calc(var(--mx) - min(50%, var(--left) - .5rem) - max(.1px, 50% + .5rem + var(--left) - 100vw)), 
                calc(var(--my) - 100% - 1rem)
            );
        }
    }
    @media (min-width: 50rem) {
        .pie-chart {
            --d: var(--reverse) row-reverse;
            flex-direction: var(--d, row);
        }
        .legend {
            --r: var(--reverse) right;
            text-align: var(--r, left);
            --mr: var(--reverse) 2rem;
            margin-right: var(--mr, 0rem);
            --ml: var(--reverse) 0rem;
            margin-left: var(--ml, 2rem);
        }
        .label.show {
            transform: translate(var(--mx), var(--my)) translate(1.5ch, -50%);
        }
    }
</style>