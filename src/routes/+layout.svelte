<script lang="ts">
    import { page } from "$app/stores";
    import { browser } from "$app/environment";
    import LinkCombo, { type ComboRoute } from "$lib/LinkCombo.svelte";
    import { preference, theme } from "$lib/theme"
    import { throttle } from "$lib/timing";

    const aboutCombo: ComboRoute[] = [
        {url: "mission-vision", name: "mission"},
        {url: "current-team", name: "the team"},
        {url: "past-teams", name: "past teams"}
    ];
    const projectsCombo: ComboRoute[] = [
        {url: "cavour", name: "Cavour"},
        {url: "liquid-propulsion", name: "Liquid Propulsion"}
    ];

    $: pathname = $page.url.pathname;

    const OPEN_STATE = "PRT-nav-open";
    let open = false;
    function close() {
        if(history.state === OPEN_STATE) history.back();
    }
    function toggle() {
        if(open) history.back();
        else {
            history.pushState(OPEN_STATE, '');
            open = true;
        }
    }

    let lastY = browser ? window.scrollY : 0;
    let down = lastY > 100;
    let hide = false;
    function onScroll() {
        let currentY = window.scrollY;
        down = currentY > 100;
        if(Math.abs(currentY - lastY) < 10) return;
        hide = currentY > lastY;
        lastY = currentY;
    }

    $: if(browser) document.body.dataset.theme = $theme;
</script>

<svelte:head>
    <link rel="stylesheet" href="/global.css">
</svelte:head>

<svelte:window on:scroll={throttle(20, onScroll)} on:popstate={() => open = history.state === OPEN_STATE} />

<div class="nav-container">
    <nav id="page-nav" class:hide class:down>
        <a href="/" class="logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 118.2842712" width="50" height="59.14213562">
                <mask id="logo-mask-1">
                    <rect x="0" y="0" width="100" height="116.75" fill="black" />
                    <path d="M0,0 L0,116.75,100,116.75,100,48.2842712,70,48.2842712 A68.2842712,68.2842712,90,0,0,1.71572875,-20" fill="white" />
                </mask>
                <mask id="logo-mask-2">
                    <rect x="0" y="0" width="100" height="116.75" fill="black" />
                    <path d="M100,0 L100,116.75,0,116.75,0,48.2842712,30,48.2842712 A68.2842712,68.2842712,90,0,1,98.2842712,-20" fill="white" />
                </mask>
                <path fill="none" stroke="currentColor" stroke-width="8" mask="url(#logo-mask-2)" d="M100,112.75 A66,66,90,0,1,34,48.2842712" />
                <path fill="none" stroke="currentColor" stroke-width="8" mask="url(#logo-mask-2)" d="M100,096.75 A50,50,90,0,1,50,48.2842712 A48.2842712,48.2842712,90,0,0,1.71572875,0" />
                <path fill="none" stroke="currentColor" stroke-width="8" mask="url(#logo-mask-2)" d="M100,080.75 A34,34,90,0,1,66,48.2842712 A64.2842712,64.2842712,90,0,0,1.71572875,-16" />
            
                <path fill="none" stroke="var(--accent-fig)" stroke-width="8" mask="url(#logo-mask-1)" d="M0,112.75 A66,66,90,0,0,66,48.2842712 A32.2842712,32.2842712,90,0,1,98.2842712,16" />
                <path fill="none" stroke="var(--accent-fig)" stroke-width="8" mask="url(#logo-mask-1)" d="M0,096.75 A50,50,90,0,0,50,48.2842712 A48.2842712,48.2842712,90,0,1,98.2842712,0" />
                <path fill="none" stroke="var(--accent-fig)" stroke-width="8" mask="url(#logo-mask-1)" d="M0,080.75 A34,34,90,0,0,34,48.2842712 A64.2842712,64.2842712,90,0,1,98.2842712,-16" />
            </svg>
        </a>
        <ul class="links" class:open>
            <li class:current={pathname === "/"}><a class="nav-entry" href="/">Home</a></li>
            <LinkCombo base="about" routes={aboutCombo} />
            <LinkCombo base="projects" routes={projectsCombo} />
            <li class:current={pathname === "/sponsors"}><a class="nav-entry" href="/sponsors">Sponsors</a></li>
            <li class:current={pathname === "/apply"}><a class="nav-entry" href="/apply">Apply</a></li>
        </ul>
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
        <button class="burger on-sm" class:active={open} aria-hidden="true" data-nav-btn="main-nav" on:click={toggle}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="2.2em" height="2.2em">
                <line x1="10" x2="54" y1="32" y2="32" stroke-width="6" stroke="var(--fg-0)" stroke-linecap="round" class="top" />
                <line x1="10" x2="54" y1="32" y2="32" stroke-width="6" stroke="var(--fg-0)" stroke-linecap="round" class="middle" />
                <line x1="10" x2="54" y1="32" y2="32" stroke-width="6" stroke="var(--fg-0)" stroke-linecap="round" class="bottom" />
            </svg>
        </button>
    </nav>
</div>
<div id="page-content" class:unfocus={open} on:click={close} on:keydown={() => {}}>
    <slot></slot>
    <svg class="divider" viewBox="0 0 1000 200" width="1000" height="200" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
        <rect x="0" y="0" width="1000" height="200" fill="transparent"></rect>
        <path d="M0 125L13.8 126.2C27.7 127.3 55.3 129.7 83.2 128.7C111 127.7 139 123.3 166.8 110.8C194.7 98.3 222.3 77.7 250 73.8C277.7 70 305.3 83 333.2 90.8C361 98.7 389 101.3 416.8 94.2C444.7 87 472.3 70 500 65.3C527.7 60.7 555.3 68.3 583.2 78C611 87.7 639 99.3 666.8 100.3C694.7 101.3 722.3 91.7 750 97C777.7 102.3 805.3 122.7 833.2 129.3C861 136 889 129 916.8 129C944.7 129 972.3 136 986.2 139.5L1000 143L1000 201L986.2 201C972.3 201 944.7 201 916.8 201C889 201 861 201 833.2 201C805.3 201 777.7 201 750 201C722.3 201 694.7 201 666.8 201C639 201 611 201 583.2 201C555.3 201 527.7 201 500 201C472.3 201 444.7 201 416.8 201C389 201 361 201 333.2 201C305.3 201 277.7 201 250 201C222.3 201 194.7 201 166.8 201C139 201 111 201 83.2 201C55.3 201 27.7 201 13.8 201L0 201Z" fill="var(--bg-2)" stroke-linecap="round" stroke-linejoin="miter"></path>
    </svg>
    <footer>
        <div class="center-lg">
            PoliTo Rocket Team &trade; 2022
        </div>
    </footer>
</div>

<style lang="scss">
    @use "$lib/consts";

    $nav-trans: 350ms ease;
    .nav-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
        pointer-events: none;
        height: 30vh;
    }
    nav {
        position: relative;
        width: 100%;
        pointer-events: auto;
        display: flex;
        align-items: center;
        justify-content: end;
        padding: .8rem;
        font-size: var(--fs-50);
        overflow-y: visible;
        background-color: var(--bg-0);
        transition: transform 200ms ease, background-color 350ms ease;

        &.hide {
            transform: translateY(-100%);
            overflow-y: hidden;
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-bottom: 2px solid transparent;
            transition: filter $nav-trans, border-bottom-color $nav-trans;
        }
        &.down::before {
            border-bottom-color: #7777;
        }

        .logo {
            z-index: 1;
            color: var(--fg-0);
            text-decoration: none;
            margin-right: auto;
            svg {
                display: block;
                height: 2.2em;
                width: auto;
            }
        }
    }

    #page-content {
        // overflow-x: hidden;
        background-color: var(--bg-0);
        transition: transform $nav-trans, filter $nav-trans;
        &.unfocus {
            transform: translateX(calc(-3 * var(--pad)));
            filter: brightness(.75);
        }

        min-height: 100%;
        display: flex;
        flex-direction: column;
        
    }

    svg.divider {
        display: block;
        width: 100%;
        height: auto;
        flex-shrink: 0;
        margin-top: auto;
    }

    footer {
        background-color: var(--bg-2);
        color: var(--fg-2);
        padding: var(--pad);
        padding-top: 0;
        text-align: center;
    }

    .theme {
        z-index: 110;
        background-color: var(--bg-1);
        border-radius: 1.5em;
        padding: .3em;
        display: flex;
        box-shadow: inset 0 0 10px var(--bg-0);

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
    }

    .links {
        z-index: 1;
        list-style: none;
        display: flex;
    }
    .divider {
        min-width: 100%;
        max-width: 100%;
    }
    .burger {
        padding: 0;
        z-index: 110;
        margin-left: 1ch;

        svg { display: block; }
        line {
            transform-origin: center center;
            transition: opacity 250ms ease 50ms, transform 350ms ease;

            &.top { transform: translateY(-25%); }
            &.bottom { transform: translateY(25%); }
        }
    }


    .burger.active {
        line.middle {
            transition: opacity 250ms ease;
            opacity: 0;
        }
        line.top { transform: rotate(-45deg); }
        line.bottom { transform: rotate(45deg); }
    }

    @media (max-width: 50rem) {
        .links {
            position: fixed;
            right: 0;
            top: 0;
            height: 100%;
            z-index: 102;

            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
            padding: 2rem;
            background-color: var(--bg-1);
            
            transform: translateX(100%);
            transition: transform $nav-trans;

            & > li + li { margin-top: 1.25rem; }
            a { font-size: var(--fs-60); }
        }
        .links.open { transform: translateX(0); }
    }

    @media (min-width: 50rem) {
        #page-nav { padding: 1rem; }
        .burger { display: none; }
        .links {
            flex-direction: row;
            align-items: center;

            & > :global(li) { margin-right: 2ch; }
        }
    }
</style>