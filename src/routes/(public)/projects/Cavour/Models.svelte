<script lang="ts">
    import SmoothContidional from "$lib/SmoothConditional.svelte";
    import Field from "./Field.svelte";
    import { models, fields } from "./models.json";
    import { writable } from "svelte/store";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";

    export let view: string;

    type SpannedValue<T> = [value: T, count: number];

    const num = models.length;

    const I = writable(0);

    let isMobile = false;

    onMount(() => {
        const handleResize = () => {
            isMobile = window.innerWidth < 768; // adjust this breakpoint as needed
        };

        handleResize(); // check on mount
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    });

    function squish<T>(arr: T[]) {
        const res: SpannedValue<T>[] = [[arr[0], 1]];
        const len = arr.length;
        let j = 0;
        for (var i = 1; i < len; i++) {
            if (arr[i] === res[j][0]) res[j][1]++;
            else {
                res.push([arr[i], 1]);
                j++;
            }
        }
        return res;
    }

    const len = fields.length;
    const units: (null | SpannedValue<string | null>)[] = new Array(len);
    {
        let j = 0;
        units[0] = [fields[0].unit, 1];
        for (let i = 1; i < len; i++) {
            const u = fields[i].unit;
            // @ts-ignore
            if (u === units[j][0]) {
                units[i] = null;
                // @ts-ignore
                units[j][1]++;
            } else {
                units[(j = i)] = [u, 1];
            }
        }
    }

    const intersectionCallbacks = new Map<HTMLElement, (v: boolean) => void>();
    const observer = !browser
        ? null
        : new IntersectionObserver(
              entries =>
                  entries.forEach(entry => {
                      const cb = intersectionCallbacks.get(
                          entry.target as HTMLElement
                      );
                      cb && cb(entry.isIntersecting);
                  }),
              { rootMargin: "0px 0px -80px 0px" }
          );
    function observe(node: HTMLElement, cb: (v: boolean) => void) {
        intersectionCallbacks.set(node, cb);
        observer!.observe(node);
        return {
            destroy() {
                observer!.unobserve(node);
                intersectionCallbacks.delete(node);
            },
        };
    }
</script>

<SmoothContidional selection={view === "table"} ms={70}>
    <svelte:fragment slot="false">
        <div class="model-sel">
            <button
                title="previous"
                on:click={() => {
                    $I = ($I === 0 ? num : $I) - 1;
                }}
            >
                <span class="hidden">previous</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <path
                        fill="none"
                        stroke="#888"
                        stroke-width="15"
                        stroke-linecap="round"
                        d="M67.67767,7.32233 L32.32233,50 L67.67767,92.67767"
                    />
                </svg>
            </button>
            <div>{models[$I]}</div>
            <button
                title="next"
                on:click={() => {
                    $I = $I === num - 1 ? 0 : $I + 1;
                }}
            >
                <span class="hidden">next</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <path
                        fill="none"
                        stroke="#888"
                        stroke-width="15"
                        stroke-linecap="round"
                        d="M32.32233,7.32233 L67.67767,50 L32.32233,92.67767"
                    />
                </svg>
            </button>
        </div>
        <div class="fields">
            {#each fields as field}
                <Field {field} selection={I} {observe} />
            {/each}
        </div>
    </svelte:fragment>
    <div class="scrollable" slot="true">
        {#if isMobile}
            <div class="mobile-cards">
                {#each models as model, index}
                    <div class="model-card">
                        <h2 class="model-title">{model}</h2>
                        {#each fields as field, fieldIndex}
                            <div class="field">
                                <h3>{field.name}</h3>
                                <div class="values">
                                    {#if field.values.length > 1}
                                        <div class="value">
                                            {field.values[index]}
                                            {#if field.unit}
                                                <span
                                                    class="unit"
                                                    class:low={!field.unit}
                                                >
                                                    {field.unit}
                                                </span>
                                            {/if}
                                        </div>
                                    {:else}
                                        <div class="value">
                                            {field.values[0]}
                                            {#if field.unit}
                                                <span
                                                    class="unit"
                                                    class:low={!field.unit}
                                                >
                                                    {field.unit}
                                                </span>
                                            {/if}
                                        </div>
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        {:else}
            <table>
                <tr>
                    <td class="no-border"></td>
                    <th scope="col">CVR 100-75-3</th>
                    <th scope="col">CVR 100-75-4</th>
                    <th scope="col">CVR 100-54-6</th>
                    <th scope="col">Unit</th>
                </tr>
                {#each fields as f, i}
                    {@const unit = units[i]}
                    <tr>
                        <th scope="row" data-label="Field">{f.name}</th>
                        {#each squish(f.values) as sq}
                            <td data-label="Value" colspan={sq[1]}>{sq[0]}</td>
                        {/each}
                        {#if unit}
                            <td
                                rowspan={unit[1]}
                                class:low={!unit[0]}
                                data-label="Unit"
                            >
                                {unit[0] || "/"}
                            </td>
                        {/if}
                    </tr>
                {/each}
            </table>
        {/if}
    </div>
</SmoothContidional>

<style>
    .model-sel {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        margin-top: 1.5rem;
    }
    .model-sel > div {
        margin-left: 0.5ch;
        margin-right: 0.5ch;
        min-width: 12ch;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
    }
    .model-sel span {
        position: absolute;
        transform: scale(0);
        opacity: 0;
    }
    button {
        border-radius: 50%;
        padding: 0.5rem;
    }
    svg {
        display: block;
        width: 1rem;
        height: 1rem;
    }
    .fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        row-gap: 0.5rem;
        column-gap: 1ch;
        align-items: center;
    }
    table {
        border-collapse: collapse;
        font-size: 1.1rem;
        margin-left: auto;
        margin-right: auto;
        margin-top: 2rem;
    }
    th,
    td {
        padding: 0.125em 0.45em;
        border: 1px solid #8883;
    }
    th {
        text-align: right;
        font-weight: 500;
        width: max-content;
        white-space: nowrap;
    }
    td {
        text-align: center;
    }
    .no-border {
        border: none;
    }
    .low {
        opacity: 0.4;
    }

    .mobile-cards {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .model-card {
        border: 1px solid #8883;
        padding: 1rem;
        border-radius: 5px;
        background-color: --var;
    }

    .model-title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: --var;
        text-align: center;
    }

    .field {
        margin-top: 1rem;
    }

    .field h3 {
        margin-bottom: 0.5rem;
    }

    .values {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .value {
        display: inline-flex;
        align-items: center; /* Center align the value and unit */
    }

    .unit {
        margin-left: 0.5rem; /* Space between value and unit */
        font-weight: normal; /* Optional: make unit less prominent */
    }
</style>
