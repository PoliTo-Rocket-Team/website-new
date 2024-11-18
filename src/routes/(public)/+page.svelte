<script lang="ts">
    import "@fontsource/plus-jakarta-sans/400-italic.css";
    import rocket from "./rocket.ts?worker&url";
    import {
        alleviateCanvas,
        type CanvasPoster,
    } from "$lib/conditional-worker";
    import { throttle } from "$lib/timing";
    import Event from "./Event.svelte";
    import { theme } from "$lib/theme";
    import { getContext, onDestroy } from "svelte";
    let main: HTMLElement;

    import type { HostMessageMap, WorkerMessageMap } from "./worker-msg";
    import type { Writable } from "svelte/store";
    let post: CanvasPoster<HostMessageMap>;
    let progress = 0;
    let canvas: HTMLCanvasElement;

    function rocketify(canvas: HTMLCanvasElement) {
        post = alleviateCanvas<HostMessageMap, WorkerMessageMap>(
            canvas,
            rocket,
            {
                done() {
                    progress = 0;
                },
                load(data) {
                    progress = data;
                },
            }
        );
        const destroy = theme.subscribe(t => post("dark", t === "dark"));
        return { destroy };
    }
    function onResize() {
        post("resize", [
            canvas.clientWidth,
            canvas.clientHeight,
            window.devicePixelRatio,
        ]);
    }

    // import { onMount } from "svelte";
    // onMount(() => window.scrollTo(0,2600));

    const content =
        getContext<Writable<HTMLDivElement | null>>("page-container");
    const onScroll = throttle(10, () =>
        post("scroll", -$content!.scrollTop / 700)
    );
    $: if ($content) $content.addEventListener("scroll", onScroll);
    onDestroy(
        () => $content && $content.removeEventListener("scroll", onScroll)
    );
</script>

<svelte:window on:resize={throttle(20, onResize)} />

<svelte:head>
    <title>PoliTo Rocket Team</title>
    <meta
        name="description"
        content="We are the rocket engineering student team of Politecnico di Torino, entirely dedicated to the design and construction of high-powered experimental rockets with scientific payload capability."
    />
</svelte:head>

<div class="scene-progress" style="--p: {progress};"></div>
<canvas use:rocketify bind:this={canvas}></canvas>
<header>
    <h1>
        <span class="slide-up" style="animation-delay: 0ms;">PoliTo</span>
        <span class="slide-up" style="animation-delay: 75ms;">Rocket</span>
        <span class="slide-up" style="animation-delay: 150ms;">Team</span>
    </h1>
    <p class="slide-down after-title">Born for Space</p>
    <button
        type="button"
        class="fade-in after-title"
        on:click={() => main.scrollIntoView({ behavior: "smooth" })}
        >See more</button
    >
</header>
<main bind:this={main}>
    <section aria-labelledby="identity-title">
        <h2 id="identity-title">Who are we?</h2>
        <div class="blur-behind">
            <p>
                We are the rocket engineering student team of Politecnico di
                Torino, entirely dedicated to the research, design, and
                construction of rocket engines and experimental rockets with
                scientific payload capability. We are a group of more than 150
                undergraduate, graduate and doctoral engineering students with
                great plans for the future.
            </p>
            <div class="btns">
                <a href="/projects" class="btn">Our Projects</a>
                <a href="/about/mission-vision" class="btn">Mission & Vision</a>
                <a href="/about/current-team" class="btn">The Team</a>
            </div>
        </div>
    </section>
    <section aria-labelledby="spac">
        <h2 id="spac">PRT at the European Rocketry Challenge!</h2>
        <div class="blur-behind">
            <img
                src="/img/EUROC.png"
                alt="European Rocketry Challenge logo"
                class="float"
            />
            <p>
                PoliTo Rocket Team was the first team from Politecnico di Torino to compete at the European Rocketry Challenge (<a href="https://euroc.pt/">EuRoC</a>) in October 2023, launching the <a href="https://www.politorocketteam.it/projects/Cavour">Cavour</a> rocket and winning the ANACOM award!
            </p>

            <p>
                We competed again in 2024 with <a href="https://www.politorocketteam.it/projects/VES">Project VES</a>, our biggest rocket. The Vittorio Emanuele II Rocket (VES) was launched on October 12 at 14:19 (UTC+1). The flight was nominal, reaching an apogee of approximately 3160m. The drogue parachute deployed at apogee, reducing the rocket’s descent velocity to about 30m/s. The main parachute separation was successful; however the upper and lower rocket sections, each equipped with their own parachute, were separated during the descent. Both sections were located and recovered, and VES is now back in Turin ready to be reused.
            </p>

            <p>
                With VES, the Team was at its 2nd EuRoC participation and ranked 4th out of 20 for vehicle quality, and 6th out of 20 participating teams and out of 55 total teams in the general ranking. PRT received a larger score than some of Europe’s most experienced teams, and improved on the 2023 performance. It was also the highest score ever from a team from Politecnico di Torino.
            </p>
        </div>
    </section>
    <section aria-labelledby="spac">
        <h2 id="spac">New Mexico: mission accomplished</h2>
        <div class="blur-behind">
            <img
                src="/img/Spaceport-America-Cup.png"
                alt="Spaceport America Cup logo"
                class="float"
            />
            <p>
                PoliTo Rocket Team was the first Italian rocketry team to have
                participated at the <a
                    href="https://spaceportamericacup.com/"
                    target="_blank"
                    rel="noreferrer">Spaceport America Cup</a
                >!
            </p>

            <p>
                The Team's first rocket, Cavour, was launched on Thursday June
                22nd from the launchpad B2 from the Vertical Launch Area of
                Spaceport America, at 9:20 local time. The launch was a success!
                The flight was nominal and the rocket was recovered in good
                conditions and it can be reused
            </p>

            <p>
                The Spaceport America Cup (SA Cup) is a competition for student
                rocketry teams from all over the world. With over 150 teams from
                colleges and universities in 24 countries from 6 continents, the
                SA Cup is the world's largest intercollegiate rocket engineering
                competition. At SA Cup, students launch solid, liquid, and
                hybrid rockets to target altitudes of 10,000 and 30,000 feet
                (3,000 and 9,100 m).
            </p>
            <p>
                PoliTo Rocket Team competed with the <a
                    href="/projects/Cavour">Cavour rocket</a
                > in the 10 ft apogee AGL COTS category with a target apogee of around
                3km.The Team ranked 13th in its category and 20th overall with 119
                teams participating and over 150 total teams. PRT also won the prestigious Dr. Gil Moore Technical Award for Innovation, one of the few technical awards, for its extensive use of 3D-printed internal components!
            </p>
        </div>
    </section>
    <section aria-labelledby="timeline-title">
        <h2 id="timeline-title">Our timeline</h2>
        <div class="timeline">
            <div class="timeline__track">
                <div class="base"></div>
            </div>
            <div class="timeline__body">
                <Event year={2021} month={10} ch={45} title="The beginning"
                    >Inspired by American and European rocketry teams, a group of friends started designing an experimental
                    sounding rocket.</Event
                >
                <Event
                    year={2022}
                    month={6}
                    day={7}
                    ch={41}
                    title="Team approval and start of Project Cavour"
                    >On June 7th 2022, Politecnico di Torino officially approved
                    the Team, which started working on <a
                        href="/projects/Cavour">Project Cavour</a
                    >.</Event
                >
                <Event
                    year={2023}
                    month={1}
                    ch={51}
                    title="Start of Project Efesto"
                    >After the first general recruitment, <a
                        href="/projects/Efesto">Project Efesto</a
                    > was started to research and develop a Liquid Rocket Engine
                    for the Team's rockets.</Event
                >
                <Event
                    year={2023}
                    month={4}
                    day={29}
                    ch={35}
                    title="First Cavour launch"
                >
                    Germany, 19:53:42 CET: test launch successful! First launch of a rocket built by students of Politecnico di Torino
                    <a
                        href="https://www.instagram.com/p/CroYBp9t8Sr/?igshid=ZWIzMWE5ZmU3Zg=="
                        target="_blank"
                        rel="noreferrer"
                        class="play"
                        title="See the video"
                        aria-label="See the video"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 10 10"
                        >
                            <path
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3.26795,2 L3.26795,8 L8.4641,5 Z"
                            />
                        </svg>
                    </a>
                </Event>
                <Event
                    year={2023}
                    month={6}
                    ch={55}
                    title="2023 Spaceport America Cup and second Cavour launch"
                    >With <a href="/projects/Cavour">Project Cavour</a>, we
                    represented Politecnico and Italy as the first Italian team
                    at the
                    <a
                        href="https://spaceportamericacup.com/"
                        target="_blank"
                        rel="noreferrer">Spaceport America Cup</a
                    >, the largest intercollegiate rocketry competition on the
                    planet. Cavour launch was a success!
                </Event>
                <Event
                    year={2023}
                    month={10}
                    ch={52}
                    title="2023 European Rocketry Challenge"
                    >We have been the first team from Politecnico to compete
                    with Project Cavour at the 2023 <a
                        href="https://euroc.pt/"
                        target="_blank"
                        rel="noreferrer">EuRoC</a
                    >, Europe’s major rocket engineering competition, winning the ANACOM award.
                </Event>
                <Event
                    year={2024}
                    month={10}
                    ch={45}
                    title="2024 European Rocketry Challenge"
                    >At our second participation we launched <a href="https://www.politorocketteam.it/projects/VES">VES </a>, our biggest rocket, improving our past year performance, ranking 4th in Europe for for vehicle design and 6th overall.
                </Event>
                <Event
                    year={2024}
                    month={10}
                    ch={45}
                    title="International Astronautical Congress 2024"
                    >At the world’s largest IAC, held in Milan, PRT showcased its projects and students presented multiple technical papers. PRT won the Geography, Generation and Gender+ award at the Student Challenge.
                </Event>
                <Event
                    year={2025}
                    month={6}
                    ch={45}
                    title="International Rocket Engineering Competition 2025"
                    >With an evolution of <a href="https://www.politorocketteam.it/projects/VES">Project VES </a>, we aim to represent Italy and Politecnico di Torino once again at the world's largest rocketry competition, and aim for the Italian altitude record!
                </Event>
            </div>
        </div>
    </section>
    <section aria-labelledby="contact-title">
        <h2 id="contact-title">Get in touch</h2>
        <div class="blur-behind">
            <p>
                We are eager to get in touch with you! Whether you want to join
                us, become our partner, or simply know something more about us,
                feel free to write us an email: <a
                    href="mailto:info@politorocketteam.it"
                    >info@politorocketteam.it</a
                >
            </p>
            <p>
                We are also on Instagram, LinkedIn, and Twitter: just one direct
                message away.
            </p>
            <div class="socials">
                <a
                    href="https://instagram.com/politorocketteam?igshid=YmMyMTA2M2Y="
                    target="_blank"
                    rel="noreferrer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                    >
                        <title>Instagram</title>
                        <radialGradient
                            id="insta-grad-1"
                            cx="19.38"
                            cy="42.035"
                            r="44.899"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0" stop-color="#fd5"></stop>
                            <stop offset=".328" stop-color="#ff543f"></stop>
                            <stop offset=".348" stop-color="#fc5245"></stop>
                            <stop offset=".504" stop-color="#e64771"></stop>
                            <stop offset=".643" stop-color="#d53e91"></stop>
                            <stop offset=".761" stop-color="#cc39a4"></stop>
                            <stop offset=".841" stop-color="#c837ab"></stop>
                        </radialGradient>
                        <path
                            fill="url(#insta-grad-1)"
                            d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                        ></path>
                        <radialGradient
                            id="insta-grad-2"
                            cx="11.786"
                            cy="5.54"
                            r="29.813"
                            gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0" stop-color="#4168c9"></stop>
                            <stop
                                offset=".999"
                                stop-color="#4168c9"
                                stop-opacity="0"
                            ></stop>
                        </radialGradient>
                        <path
                            fill="url(#insta-grad-2)"
                            d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
                        ></path>
                        <path
                            fill="#fff"
                            d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
                        ></path>
                        <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"
                        ></circle>
                        <path
                            fill="#fff"
                            d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
                        ></path>
                    </svg>
                </a>
                <a
                    href="https://www.linkedin.com/company/politorocketteam"
                    target="_blank"
                    rel="noreferrer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                    >
                        <title>Linkedin</title>
                        <path
                            fill="#0288D1"
                            d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
                        ></path>
                        <path
                            fill="#FFF"
                            d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
                        ></path>
                    </svg>
                </a>
                <a
                    href="https://twitter.com/PoliTo_RT"
                    target="_blank"
                    rel="noreferrer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0,0,256,256"
                    >
                        <title>Twitter</title>
                        <g
                            fill="none"
                            fill-rule="nonzero"
                            stroke="none"
                            stroke-width="1"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                            stroke-miterlimit="10"
                            stroke-dasharray=""
                            stroke-dashoffset="0"
                            font-family="none"
                            font-weight="none"
                            font-size="none"
                            text-anchor="none"
                            style="mix-blend-mode: normal"
                            ><g transform="scale(5.33333,5.33333)"
                                ><path
                                    d="M38,42h-28c-2.209,0 -4,-1.791 -4,-4v-28c0,-2.209 1.791,-4 4,-4h28c2.209,0 4,1.791 4,4v28c0,2.209 -1.791,4 -4,4z"
                                    fill="var(--fg-0)"
                                    fill-rule="evenodd"
                                ></path><path
                                    d="M34.257,34h-6.437l-13.991,-20h6.437zM28.587,32.304h2.563l-11.651,-16.608h-2.563z"
                                    fill="var(--bg-0)"
                                    fill-rule="nonzero"
                                ></path><path
                                    d="M15.866,34l7.203,-8.344l-0.942,-1.249l-8.304,9.593z"
                                    fill="var(--bg-0)"
                                    fill-rule="nonzero"
                                ></path><path
                                    d="M24.45,21.721l0.905,1.289l7.781,-9.01h-2z"
                                    fill="var(--bg-0)"
                                    fill-rule="nonzero"
                                ></path></g
                            ></g
                        >
                    </svg>
                </a>
            </div>
        </div>
    </section>
</main>

<style lang="scss">
    .scene-progress {
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: var(--accent-fig);
        clip-path: inset(0 calc(100% * (1 - var(--p, 0))) 0 0);
    }
    canvas {
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        min-height: 100vh;
        position: sticky;
        margin-bottom: -100vh;
    }
    header,
    main {
        z-index: 1;
    }
    header {
        min-height: 90vh;
        display: grid;
        grid-template-rows: 1fr auto auto 3fr auto;
        padding: var(--pad);
        justify-items: center;
    }
    h1 {
        grid-row: 2;
        margin-bottom: 1rem;
        span {
            display: inline-block;
        }
    }
    header p {
        grid-row: 3;
        font-size: var(--fs-70);
        font-weight: 500;
    }
    header button {
        grid-row: 5;
    }
    .after-title {
        animation-delay: 630ms;
    }
    .slide-up,
    .slide-down,
    .fade-in {
        animation-duration: 500ms;
        animation-fill-mode: both;
        animation-timing-function: ease-out;
    }
    .slide-up,
    .slide-down {
        position: relative;
    }
    .slide-up {
        animation-name: slide-up;
    }
    .slide-down {
        animation-name: slide-down;
    }
    .fade-in {
        animation-name: fade-in;
    }

    @keyframes slide-up {
        0% {
            opacity: 0;
            transform: translateY(80%);
            clip-path: inset(0 0 80% 0);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
            clip-path: inset(0 0 0 0);
        }
    }
    @keyframes slide-down {
        0% {
            opacity: 0;
            transform: translateY(-80%);
            clip-path: inset(80% 0 0 0);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
            clip-path: inset(0 0 0 0);
        }
    }
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    main section {
        max-width: 50rem;
        margin-left: auto;
        margin-right: auto;
    }
    main p + p {
        margin-top: 1rem;
    }
    $sec-space: 0.9rem;
    .blur-behind {
        position: relative;
    }
    .blur-behind::before {
        content: "";
        z-index: -1;
        position: absolute;
        inset: -$sec-space;
        width: calc(100% + 2 * $sec-space);
        height: calc(100% + 2 * $sec-space);
        background-color: rgba(var(--bg-0-rgb), 0.6);
        // box-shadow: 0 0 1rem rgba(var(--bg-0-rgb), 1);
        // backdrop-filter: blur(2px);
        filter: blur(1rem);
        border-radius: 1.5 * $sec-space;
    }
    .btns {
        display: flex;
        flex-wrap: wrap;
    }
    a.btn {
        display: block;
        padding: 0.4em 0.7em;
        border: 2px solid var(--accent-fig);
        width: fit-content;
        text-decoration: none;
        font-weight: 600;
        margin-right: 1.5rem;
        margin-top: 1.5rem;

        &:focus {
            text-decoration: underline;
            // outline: 2px solid var(--accent-fig);
            // outline-offset: 3px;
        }
    }

    $contour: 1px;
    img.float {
        display: block;
        max-width: 100%;
        margin-bottom: 1rem;
        filter: drop-shadow($contour $contour 0 var(--light-bg-0))
            drop-shadow($contour (-$contour) 0 var(--light-bg-0))
            drop-shadow(-$contour $contour 0 var(--light-bg-0))
            drop-shadow(-$contour (-$contour) 0 var(--light-bg-0));
    }

    $point-radius: 0.75rem;
    $extreme-radius: 0.5rem;

    .timeline {
        display: grid;
        grid-template-columns: 2 * $point-radius 1fr;
        column-gap: 1rem;
    }
    %extreme {
        content: "";
        position: absolute;
        z-index: 10;
        left: 50%;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: var(--accent-fig);
        transform: translateX(-50%);
    }
    .timeline__track {
        position: relative;

        &::before {
            @extend %extreme;
            top: $point-radius - $extreme-radius;
        }
        &::after {
            @extend %extreme;
            bottom: $point-radius - $extreme-radius;
        }

        .base {
            position: absolute;
            left: 50%;
            top: $point-radius;
            bottom: $point-radius;
            height: calc(100% - 2 * $point-radius);
            outline: 1px solid var(--accent-fig);
            transform: translateX(-50%);
        }

        // .now {
        //     position: sticky;
        //     top: 45vh;
        //     z-index: 20;

        //     width: 2*$point-radius;
        //     height: 2*$point-radius;
        //     background-color: var(--bg-0);
        //     border: 2px solid var(--accent-fig);
        //     border-radius: 50%;
        // }
    }
    .play {
        color: var(--accent-fig);
        text-decoration: none;
        vertical-align: middle;

        svg {
            display: inline-block;
            height: 1rem;
            width: auto;
        }
    }
    .socials {
        display: flex;
        justify-content: center;
        margin-top: 1rem;

        a + a {
            margin-left: 2ch;
        }

        svg {
            display: block;
            width: 3.5rem;
            height: auto;
        }
    }

    @media (max-width: 50rem) {
        header h1,
        header p {
            justify-self: start;
        }
        header button {
            margin-bottom: 1.5rem;
        }
    }
    @media (min-width: 50rem) {
        canvas {
            position: fixed;
        }
        img.float {
            float: right;
            max-width: 45%;
            margin-bottom: 1ch;
            margin-left: 1ch;
        }
        .timeline {
            padding-left: 0.5ch;
            // column-gap: max(1rem, 3vw);
        }
    }
</style>
