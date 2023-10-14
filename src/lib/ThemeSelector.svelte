<script>
    import { browser } from "$app/environment";
    import { preference, theme } from "./theme";

    $: if(browser) document.body.dataset.theme = $theme;
</script>

<div class="theme">
    <label>
        <input type="radio" name="theme" value="system" bind:group={$preference}>
        <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>system theme</title>
            <path transform="scale(.85)" d="M19 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5zm-2 0V4H5v14h7V9a1 1 0 0 1 1-1h4zm-3 2v10h6V10h-6z"/>
        </svg>
    </label>
    <label>
        <input type="radio" name="theme" value="light" bind:group={$preference}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="40" height="40">
            <title>light theme</title>
            <path d="m256,105.5c-83.9,0-152.2,68.3-152.2,152.2 0,83.9 68.3,152.2 152.2,152.2 83.9,0 152.2-68.3 152.2-152.2 0-84-68.3-152.2-152.2-152.2zm0,263.5c-61.4,0-111.4-50-111.4-111.4 0-61.4 50-111.4 111.4-111.4 61.4,0 111.4,50 111.4,111.4 0,61.4-50,111.4-111.4,111.4z"/>
            <path d="m256,74.8c11.3,0 20.4-9.1 20.4-20.4v-23c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v23c2.84217e-14,11.3 9.1,20.4 20.4,20.4z"/>
            <path d="m256,437.2c-11.3,0-20.4,9.1-20.4,20.4v22.9c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-22.9c0-11.2-9.1-20.4-20.4-20.4z"/>
            <path d="m480.6,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h23c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4z"/>
            <path d="m54.4,235.6h-23c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h22.9c11.3,0 20.4-9.1 20.4-20.4 0.1-11.3-9.1-20.4-20.3-20.4z"/>
            <path d="M400.4,82.8L384.1,99c-8,8-8,20.9,0,28.9s20.9,8,28.9,0l16.2-16.2c8-8,8-20.9,0-28.9S408.3,74.8,400.4,82.8z"/>
            <path d="m99,384.1l-16.2,16.2c-8,8-8,20.9 0,28.9 8,8 20.9,8 28.9,0l16.2-16.2c8-8 8-20.9 0-28.9s-20.9-7.9-28.9,0z"/>
            <path d="m413,384.1c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2z"/>
            <path d="m99,127.9c8,8 20.9,8 28.9,0 8-8 8-20.9 0-28.9l-16.2-16.2c-8-8-20.9-8-28.9,0-8,8-8,20.9 0,28.9l16.2,16.2z"/>
        </svg>
    </label>
    <label>
        <input type="radio" name="theme" value="dark" bind:group={$preference}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="40" height="40">
            <title>dark theme</title>
            <path transform="scale(.8)" d="m275.4,500.7c-135,0-244.7-109.8-244.7-244.7 1.06581e-14-134.9 109.8-244.7 244.7-244.7 8.2,0 16.4,0.4 24.6,1.2 7.2,0.7 13.5,5.2 16.5,11.7s2.4,14.2-1.6,20.2c-23,33.8-35.2,73.3-35.2,114.2 0,105 78.7,192.2 183.2,202.6 7.2,0.7 13.5,5.2 16.5,11.7 3.1,6.5 2.4,14.2-1.6,20.2-45.8,67.4-121.4,107.6-202.4,107.6zm-12.5-448c-106.5,6.5-191.2,95.2-191.2,203.3 1.42109e-14,112.3 91.4,203.7 203.7,203.7 56.4,0 109.6-23.4 147.8-63.7-46.2-11.7-88.1-36.8-120.8-72.6-41.1-45.2-63.8-103.6-63.8-164.6 0.1-37.1 8.4-73.2 24.3-106.1z"/>
        </svg>
    </label>
</div>

<style>
    div {
        z-index: 110;
        background-color: var(--bg-1);
        border-radius: 1.5em;
        padding: .3em;
        display: flex;
        box-shadow: inset 0 0 10px var(--bg-0);
        width: fit-content;
    }
    label { cursor: pointer; }
    label + label {
        margin-left: .3em;
    }
    input { display: none; }
    svg {
        display: block;
        height: 1.5em;
        width: 1.5em;
        color: var(--fg-1);
        transition: color 200ms ease;
    }
    input:checked + svg {
        color: var(--accent-fig);
    }
    path {
        fill: currentColor;
        transform-origin: center;
    }
</style>