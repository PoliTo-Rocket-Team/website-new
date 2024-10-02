<script lang="ts">
    import { page } from "$app/stores";
    import { writable } from "svelte/store";
    import { onMount, setContext } from "svelte";
    import { afterNavigate, goto } from "$app/navigation";
    import LinkCombo, { type ComboRoute } from "$lib/LinkCombo.svelte";
    import { throttle } from "$lib/timing";

    let currentYear = new Date().getFullYear(); // for footer
    import ThemeSelector from "$lib/ThemeSelector.svelte";

    const aboutCombo: ComboRoute[] = [
        { url: "mission-vision", name: "Mission" },
        { url: "current-team", name: "The Team" },
        { url: "past-teams", name: "Past Teams" },
    ];
    const projectsCombo: ComboRoute[] = [
        { url: "Cavour", name: "Cavour" },
        { url: "Efesto", name: "Efesto" },
        { url: "VES", name: "VES" },
    ];

    const OPEN_STATE = "PRT-nav-open";
    let open = false;
    let content: HTMLDivElement;

    function close() {
        if (history.state.navbar) history.back();
    }
    function toggle() {
        if (open) history.back();
        else goto($page.url, { state: { navbar: true } });
    }
    afterNavigate(() => (open = history.state.navbar === true));

    let lastY = 0;
    let down = lastY > 100;
    let hide = false;
    function onScroll() {
        let currentY = content.scrollTop;
        down = currentY > 100;
        if (Math.abs(currentY - lastY) < 10) return;
        hide = currentY > lastY;
        lastY = currentY;
    }

    const containerStore = writable<HTMLDivElement | null>(null);
    setContext("page-container", containerStore);
    onMount(() => {
        lastY = content.scrollTop;
        containerStore.set(content);
    });
</script>

<svelte:window on:popstate={() => (open = history.state.navbar === true)} />

<div class="nav-container">
    <nav id="page-nav" class:hide class:down>
        <div class="max-width-wrapper">
            <a href="/" class="logo">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 118.2842712"
                    width="50"
                    height="59.14213562"
                >
                    <g id="prt-logo">
                        <mask id="logo-mask-1">
                            <rect
                                x="0"
                                y="0"
                                width="100"
                                height="116.75"
                                fill="black"
                            />
                            <path
                                d="M0,0 L0,116.75,100,116.75,100,48.2842712,70,48.2842712 A68.2842712,68.2842712,90,0,0,1.71572875,-20"
                                fill="white"
                            />
                        </mask>
                        <mask id="logo-mask-2">
                            <rect
                                x="0"
                                y="0"
                                width="100"
                                height="116.75"
                                fill="black"
                            />
                            <path
                                d="M100,0 L100,116.75,0,116.75,0,48.2842712,30,48.2842712 A68.2842712,68.2842712,90,0,1,98.2842712,-20"
                                fill="white"
                            />
                        </mask>
                        <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="8"
                            mask="url(#logo-mask-2)"
                            d="M100,112.75 A66,66,90,0,1,34,48.2842712"
                        />
                        <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="8"
                            mask="url(#logo-mask-2)"
                            d="M100,096.75 A50,50,90,0,1,50,48.2842712 A48.2842712,48.2842712,90,0,0,1.71572875,0"
                        />
                        <path
                            fill="none"
                            stroke="currentColor"
                            stroke-width="8"
                            mask="url(#logo-mask-2)"
                            d="M100,080.75 A34,34,90,0,1,66,48.2842712 A64.2842712,64.2842712,90,0,0,1.71572875,-16"
                        />
                        <path
                            fill="none"
                            stroke="var(--accent-fig)"
                            stroke-width="8"
                            mask="url(#logo-mask-1)"
                            d="M0,112.75 A66,66,90,0,0,66,48.2842712 A32.2842712,32.2842712,90,0,1,98.2842712,16"
                        />
                        <path
                            fill="none"
                            stroke="var(--accent-fig)"
                            stroke-width="8"
                            mask="url(#logo-mask-1)"
                            d="M0,096.75 A50,50,90,0,0,50,48.2842712 A48.2842712,48.2842712,90,0,1,98.2842712,0"
                        />
                        <path
                            fill="none"
                            stroke="var(--accent-fig)"
                            stroke-width="8"
                            mask="url(#logo-mask-1)"
                            d="M0,080.75 A34,34,90,0,0,34,48.2842712 A64.2842712,64.2842712,90,0,1,98.2842712,-16"
                        />
                    </g>
                </svg>
            </a>
            <ul class="links" class:open>
                <li>
                    <a
                        data-sveltekit-replacestate={open || null}
                        class="nav-entry"
                        href="/">Home</a
                    >
                </li>
                <li>
                    <LinkCombo
                        replace={open}
                        base="about"
                        routes={aboutCombo}
                    />
                </li>
                <li>
                    <LinkCombo
                        replace={open}
                        base="projects"
                        routes={projectsCombo}
                    />
                </li>
                <li>
                    <a
                        data-sveltekit-replacestate={open || null}
                        class="nav-entry"
                        href="/outreach">Outreach</a
                    >
                </li>
                <li>
                    <a
                        data-sveltekit-replacestate={open || null}
                        class="nav-entry"
                        href="/partners">Partners</a
                    >
                </li>
                <li>
                    <a
                        data-sveltekit-replacestate={open || null}
                        class="nav-entry"
                        href="/apply">Apply</a
                    >
                </li>
            </ul>
            <ThemeSelector />
            <button
                class="burger on-sm"
                class:active={open}
                aria-hidden="true"
                data-nav-btn="main-nav"
                on:click={toggle}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    width="2.2em"
                    height="2.2em"
                >
                    <line
                        x1="10"
                        x2="54"
                        y1="32"
                        y2="32"
                        stroke-width="6"
                        stroke="var(--fg-0)"
                        stroke-linecap="round"
                        class="top"
                    />
                    <line
                        x1="10"
                        x2="54"
                        y1="32"
                        y2="32"
                        stroke-width="6"
                        stroke="var(--fg-0)"
                        stroke-linecap="round"
                        class="middle"
                    />
                    <line
                        x1="10"
                        x2="54"
                        y1="32"
                        y2="32"
                        stroke-width="6"
                        stroke="var(--fg-0)"
                        stroke-linecap="round"
                        class="bottom"
                    />
                </svg>
            </button>
        </div>
    </nav>
</div>
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    id="page-content"
    class:background={open}
    on:click={close}
    on:keydown={() => {}}
    on:scroll={throttle(20, onScroll)}
    bind:this={content}
>
    <div class="page-content-inner">
        <slot />
    </div>
    <svg
        class="divider"
        viewBox="0 0 1000 200"
        width="1000"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
    >
        <rect x="0" y="0" width="1000" height="200" fill="transparent"></rect>
        <path
            d="M0 125L13.8 126.2C27.7 127.3 55.3 129.7 83.2 128.7C111 127.7 139 123.3 166.8 110.8C194.7 98.3 222.3 77.7 250 73.8C277.7 70 305.3 83 333.2 90.8C361 98.7 389 101.3 416.8 94.2C444.7 87 472.3 70 500 65.3C527.7 60.7 555.3 68.3 583.2 78C611 87.7 639 99.3 666.8 100.3C694.7 101.3 722.3 91.7 750 97C777.7 102.3 805.3 122.7 833.2 129.3C861 136 889 129 916.8 129C944.7 129 972.3 136 986.2 139.5L1000 143L1000 201L986.2 201C972.3 201 944.7 201 916.8 201C889 201 861 201 833.2 201C805.3 201 777.7 201 750 201C722.3 201 694.7 201 666.8 201C639 201 611 201 583.2 201C555.3 201 527.7 201 500 201C472.3 201 444.7 201 416.8 201C389 201 361 201 333.2 201C305.3 201 277.7 201 250 201C222.3 201 194.7 201 166.8 201C139 201 111 201 83.2 201C55.3 201 27.7 201 13.8 201L0 201Z"
            fill="var(--bg-2)"
            stroke-linecap="round"
            stroke-linejoin="miter"
        ></path>
    </svg>
    <footer>
        <div class="center-lg">PoliTo Rocket Team &trade; {currentYear}</div>
    </footer>
</div>

<style lang="scss">
    :global(body) {
        overflow: hidden;
    }
    $nav-trans: 350ms ease;
    .nav-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 100;
        pointer-events: none;
    }
    .max-width-wrapper {
        max-width: 1280px;
        margin: 0 auto;
        display: flex;
    }
    nav {
        position: relative;
        width: 100%;
        pointer-events: auto;
        padding: 0.8rem;
        font-size: var(--fs-50);
        overflow-y: visible;
        background-color: var(--bg-0);
        transition:
            transform 200ms ease,
            background-color 350ms ease;

        &.hide {
            transform: translateY(-100%);
            overflow-y: hidden;
        }

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-bottom: 2px solid transparent;
            transition:
                filter $nav-trans,
                border-bottom-color $nav-trans;
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
        // height: 100%;
        // overflow-x: hidden;
        background-color: var(--bg-0);
        transition:
            transform $nav-trans,
            filter $nav-trans;
        min-height: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        overflow-x: hidden;
        position: relative;
    }
    .page-content-inner {
        display: flex;
        flex-direction: column;
        max-width: 1280px;
        margin: 0 auto;
    }
    #page-content.background {
        overflow-y: hidden;
        filter: blur(2px) brightness(0.8);
        // transform: translateX(-2rem);
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
    svg.divider,
    footer {
        z-index: 10;
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

        svg {
            display: block;
        }
        line {
            transform-origin: center center;
            transition:
                opacity 250ms ease 50ms,
                transform 350ms ease;

            &.top {
                transform: translateY(-25%);
            }
            &.bottom {
                transform: translateY(25%);
            }
        }
    }

    .burger.active {
        line.middle {
            transition: opacity 250ms ease;
            opacity: 0;
        }
        line.top {
            transform: rotate(-45deg);
        }
        line.bottom {
            transform: rotate(45deg);
        }
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

            & > li + li {
                margin-top: 1.25rem;
            }
            a {
                font-size: var(--fs-60);
            }
        }
        .links.open {
            transform: translateX(0);
        }
    }

    @media (min-width: 50rem) {
        #page-nav {
            padding: 1rem;
        }
        .burger {
            display: none;
        }
        .links {
            flex-direction: row;
            align-items: center;

            & > :global(li) {
                margin-right: 2ch;
            }
        }
    }
</style>
