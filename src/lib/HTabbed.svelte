<script lang="ts">
    // import type { ComponentType, SvelteComponentTyped } from "svelte";
    import Icon from "$lib/icons/Icon.svelte";

    export let expand: string = "100%";
    type T = $$Generic<object>;
    export let data: T[];
    interface $$Slots { default: T; }
    // export let component: ComponentType<SvelteComponentTyped<T>>;
    let selected = 0;

    function selectMe(this: HTMLElement, e: MouseEvent) {
        const i = +this.getAttribute("data-index")!;
        if(i !== selected) e.preventDefault(); // prevent link clicks
        selected = i;
    }
    function previous() {if(selected > 0) selected--;}
    function next() {if(selected < data.length-1) selected++;}
</script>

<div class="container">
    <div class="shift" style:--size={expand}>
        <div class="clip-zone">
            <div class="large" style:--num={data.length}>
                <div class="slider" style:--index={selected}>
                    {#each data as d,i}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="section" data-index={i} class:selected={selected === i} on:click={selectMe}>
                        <slot {...d} />
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <button style="left: 0;" on:click={previous} disabled={selected === 0}>
        <Icon icon="previous" />
    </button>
    <button style="right: 0;" on:click={next} disabled={selected === data.length-1}>
        <Icon icon="next" />
    </button>
</div>

<style>
    
    button {display: none;}

    .section + .section {
        margin-top: max(7rem, var(--pad));
    }

    @media (prefers-reduced-motion: no-preference) and (min-width: 50rem) {
        /* *{ outline: 1px solid red;} */
        .container {
            max-width: 100%;
            position: relative;
        }
        .shift {
            transform: translateX(calc(50% - 0.5*var(--size)));
            width: 100%;
            overflow-x: visible;
        }
        .clip-zone {
            overflow: hidden;
            display: flex;
            justify-content: center;
            width: var(--size);
        }
        .large {
            perspective: 18rem;
            width: calc(100% * var(--num));
        }
        .slider {
            margin-right: auto;
            margin-left: auto;
            width: max-content;
            display: grid;
            grid-template-columns: repeat(var(--num), 1fr);
            justify-items: center;
            align-items: center;

            transform-style: preserve-3d;
            transform: translateX(calc(50% - (50% + var(--index) * 100%) / var(--num)));
            transition: transform .2s ease;
        }
        .section + .section {
            margin-top: unset;
        }
        .section {
            width: max-content;
            cursor: pointer;
            opacity: 0.5;
            transform: translateZ(-6rem);
            transition: transform .2s ease, opacity .2s ease;
        }
        .section.selected {
            cursor: auto;
            opacity: 1;
            transform: translateZ(0px);
        }
        .section:not(.selected) {
            filter: blur(2px);
            user-select: none;
        }
        button {
            display: block;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) scale(1);
            font-size: 2rem;
            /* background-color: var(--bg-1); */
            padding: 0.5rem;
            border-radius: 50%;
            transition: opacity 70ms ease, transform 70ms ease;

            --icon-clr: var(--fg-1);
        }
        button:disabled {
            transform: translateY(-50%) scale(0);
            opacity: 0;
        }
    }
</style>