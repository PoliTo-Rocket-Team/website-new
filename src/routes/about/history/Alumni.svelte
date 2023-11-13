<script lang="ts">
    import Icon from "$lib/icons/Icon.svelte";
    import { scale, beginning, type Alumni } from "./data";
    export let data: Alumni;
    export let start: number;
    export let end = Date.now() + 40/scale;
</script>

<div class="track" style:--left="{(start-beginning)*scale}rem" style:--width="{(end-start)*scale}rem">
    <div class="card">
        <img src="/members/{data.img}" alt="">
        <div class="text">
            <a href="http://www.linkedin.com/in/{data.linkedin}" target="_blank" rel="noreferrer">
                <Icon icon="LinkedIn" />
            </a>
            <span>{data.name}</span>
            <p>{data.description}</p>
        </div>
    </div>
</div>

<style>
    .track {
        grid-column: 1;
        grid-row: 1;
        margin-left: var(--left);
        width: var(--width);
        padding: .5rem;
    }
    .card {
        z-index: 2;
        position: sticky; 
        left: 3.4rem;
        background-color: var(--bg-1);
        width: 28rem;
        border-radius: .4rem;

        display: grid;
        grid-template-columns: auto 1fr;
    }
    img {
        height: 12rem;
        width: 12rem;
        display: block;
        border-top-left-radius: .4rem;
        border-bottom-left-radius: .4rem;
    }
    .text {
        padding: .3rem .6rem;
    }
    a {
        float: right;
        display: block;
        --icon-size: 1.8rem;
        --icon-clr: currentColor;
        margin-right: -.3rem;
    }
    span {
        font-weight: 500;
        font-size: 1.1rem;
    }
    p {
        grid-area: desc;

    }
</style>