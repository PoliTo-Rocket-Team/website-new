<script lang="ts">
    import SmoothContidional from "$lib/SmoothConditional.svelte";
    import Field from "./Field.svelte";
    import { models, fields } from "./models.json";
    import { writable } from "svelte/store";
    import { browser } from "$app/environment";

    export let view: string;

    type SpannedValue<T> = [value: T, count: number];

    const num = models.length;

    const I = writable(0);

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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 100 100"
                    ><path
                        fill="none"
                        stroke="#888"
                        stroke-width="15"
                        stroke-linecap="round"
                        d="M67.67767,7.32233 L32.32233,50 L67.67767,92.67767"
                    /></svg
                >
            </button>
            <div>{models[$I]}</div>
            <button
                title="next"
                on:click={() => {
                    $I = $I === num - 1 ? 0 : $I + 1;
                }}
            >
                <span class="hidden">next</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 100 100"
                    ><path
                        fill="none"
                        stroke="#888"
                        stroke-width="15"
                        stroke-linecap="round"
                        d="M32.32233,7.32233 L67.67767,50 L32.32233,92.67767"
                    /></svg
                >
            </button>
        </div>
        <div class="fields">
            {#each fields as field}
                <Field {field} selection={I} {observe} />
            {/each}
        </div>
    </svelte:fragment>
    <div class="scrollable" slot="true">
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
                    <th scope="row">{f.name}</th>
                    {#each squish(f.values) as sq}
                        <td colspan={sq[1]}>{sq[0]}</td>
                    {/each}
                    {#if unit}
                        <td rowspan={unit[1]} class:low={!unit[0]}
                            >{unit[0] || "/"}</td
                        >
                    {/if}
                </tr>
            {/each}
        </table>
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
    /* .code {
        font-family: 'Anonymous Pro', monospace;
        color: var(--accent-text);
        font-size: 1.1em;
        font-weight: 700;
    } */
</style>
