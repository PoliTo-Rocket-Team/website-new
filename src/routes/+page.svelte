<script lang="ts">
    import "@fontsource/plus-jakarta-sans/400-italic.css";
    import rocket from "./rocket.ts?worker&url";
    import { createWorker, type Poster } from "$lib/conditional-worker";
    import type { HostMessage, WorkerMessage } from "$lib/three-msg";
    import { throttle } from "$lib/timing";
    import Event from "./Event.svelte";
    import { theme } from "$lib/theme";
    import Follow3D from "$lib/Follow3D.svelte";
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    let main: HTMLElement;
    const deltaH = browser ? document.documentElement.clientHeight - window.innerHeight : 0;
    let headerHeight = browser ? window.innerHeight : 100000;

    let post: Poster<HostMessage> = ()=>{};
    let progress = 0;
    function three_listener(msg: WorkerMessage) {
        switch(msg.type) {
            case "load":
                progress = msg.data;
                break;
            case "done":
                progress = 0;
                break;
        }
    }

    function rocketify(canvas: HTMLCanvasElement) {
        const supported = !!canvas.transferControlToOffscreen;
        const worker = createWorker<HostMessage, WorkerMessage>(supported, rocket, three_listener);
        post = worker.post;
        const destroy = theme.subscribe(t => post({type: "dark", data: t === "dark"}))
        const w = window.innerWidth, h = document.documentElement.clientHeight;
        if(worker.isWorker) {
            const c = canvas.transferControlToOffscreen();
            post({type: "canvas", data: [c,w,h, window.devicePixelRatio]}, [c]);
        } else {
            post({type: "canvas", data: [canvas,w,h, window.devicePixelRatio]});
        }
        return { destroy };
    } 
    function onResize() {
        const h = document.documentElement.clientHeight;
        post({type: "resize", data: [window.innerWidth,h]});
        headerHeight = h - deltaH;
    }
    // onMount(() => window.scrollTo(0,1400));
</script>

<svelte:window 
    on:resize={throttle(20, onResize)}
    on:scroll={throttle(10, () => post({type: "scroll", data: -window.scrollY/700}))}
></svelte:window>

<svelte:head>
    <title>PoliTo Rocket Team</title>
    <meta name="description" content="We are the rocket engineering student team of Politecnico di Torino, entirely dedicated to the design and construction of high-powered experimental rockets with scientific payload capability." />
</svelte:head>

<div class="scene-progress" style="--p: {progress};"></div>
<canvas use:rocketify></canvas>
<header style="--h: {headerHeight}px">
    <h1><span class="slide-up" style="animation-delay: 0ms;">PoliTo</span> <span class="slide-up" style="animation-delay: 75ms;">Rocket</span> <span class="slide-up" style="animation-delay: 150ms;">Team</span></h1>
    <p class="slide-down after-title">Born for Space</p>
    <button type="button" class="fade-in after-title" on:click={() => main.scrollIntoView({behavior: "smooth"})}>See more</button>
</header>
<main bind:this={main}>
    <section aria-labelledby="identity-title">
        <h2 id="identity-title">Who are we?</h2>
        <div class="blur-behind">
            <p>We are the rocket engineering student team of Politecnico di Torino, entirely dedicated to the design and construction of high-powered experimental rockets with scientific payload capability. We are a group of more than 85 undergraduate, graduate and doctoral engineering students with great plans for the future.</p>
            <div class="btns">
                <a href="/projects" class="btn">Our Projects</a>
                <a href="/about/mission-vision" class="btn">Mission & Vision</a>
                <a href="/about/current-team" class="btn">The Team</a>
            </div>
        </div>
    </section>
    <section aria-labelledby="iress">
        <div class="with-flyer">
            <div class="body blur-behind">
                <h2 id="iress">Italian Rocket Engineering Student Summit</h2>
                <p>PoliTo Rocket Team is pleased to invite you to the 1st IRESS &mdash; Italian Rocket Engineering Student Summit &mdash; that will be held on the 2<sup>nd</sup> of May 2023, from 3pm to 7pm in Aula Magna &ldquo;Giovanni Agnelli&rdquo; of Politecnico di Torino.</p>
                <p>The IRESS will gather for the first time Rocket Teams from major Italian Universities in order to present an overview of Rocket Engineering realities and challenges, from the intercollegiate point of view and more.</p>
                <p>Along with the students speeches, relevant personalities from aerospace companies will present their work as engineers concerning Propulsion and Rocket Engineering.</p>
            </div>
            <div class="flyer">
                <Follow3D tranform={(x,y) => `translate(${x*0.2}rem,${y*0.2}rem) rotate3d(${-y},${x},0,${-3*Math.hypot(x,y)}deg)`}>
                    <img src="/img/IRESS.jpg" alt="Flyer IRESS" style="width: 15rem; max-width: 100%;">
                </Follow3D>
            </div>
        </div>
        <div class="split">
            <ul class="center">
                <li>
                    <span class="semi-bold">PoliTo Rocket Team</span><br>
                    <span class="low">Politecnico di Torino</span>
                </li>
                <li>
                    <span class="semi-bold">DARE</span><br>
                    <span class="low"> Delft University of Technology</span>
                </li>
                <li>
                    <span class="semi-bold">Skyward Experimental Rocketry</span><br>
                    <span class="low">Politecnico di Milano</span>
                </li>
                <li>
                    <span class="semi-bold">THRUST</span><br>
                    <span class="low">Università degli Studi di Padova</span>
                </li>
                <li>
                    <span class="semi-bold">Icarus</span><br>
                    <span class="low">Politecnico di Torino</span>
                </li>
                <li>
                    <span class="semi-bold">Unina Rockets</span><br>
                    <span class="low">Università Federico II di Napoli</span>
                </li>
            </ul>
            <ul class="center">
                <li>
                    <span class="semi-bold">Ing. Marino Fragnito</span><br>
                    <span class="low">Senior Vice President Vega Business Unit at ArianeSpace</span>
                </li>
                <li>
                    <span class="semi-bold">Ing. Francesca Romana Alvino</span><br>
                    <span class="low">GNC engineer for VEGA launch vehicles at Avio</span>
                </li>
                <li>
                    <span class="semi-bold">Davide Barbero</span><br>
                    <span class="low">RCS Propulsion Lead Engineer for Space Rider Re-entry module</span>
                </li>
            </ul>
        </div>
    </section>
    <section aria-labelledby="spac">
        <h2 id="spac">New Mexico: here we come!</h2>
        <div class="blur-behind">
            <img src="/img/Spaceport-America-Cup.png" alt="Spaceport America Cup" class="float">
            <p>PoliTo Rocket Team will be the first Italian rocketry team to participate at the <a href="https://spaceportamericacup.com/" target="_blank" rel="noreferrer">Spaceport America Cup</a>!</p>
            <p>The Team's first rocket, Cavour, will be launched at the end of June 2023 from Spaceport America, a private commercial spaceport located in southern New Mexico (USA), during the Spaceport America Cup.</p>
            <p>The Spaceport America Cup (SA Cup) is designed for student rocketry teams from all over the world. With over 150 teams from colleges and universities in 24 countries from 6 continents, the SA Cup is the world's largest intercollegiate rocket engineering competition. At SA Cup, students launch solid, liquid, and hybrid rockets to target altitudes of 10,000 and 30,000 feet (3,000 and 9,100 m).</p>
            <p>PoliTo Rocket Team will be participating in the 10k-COTS All propulsion types, with a target apogee of around 3km. </p>
        </div>
    </section>
    <section aria-labelledby="timeline-title">
        <h2 id="timeline-title">Our timeline</h2>
        <div class="timeline">
            <div class="timeline__track">
                <div class="base"></div>
            </div>
            <div class="timeline__body">
                <Event year={2021} month={10} ch={45} title="The beginning">Inspired by <a href="https://www.uscrpl.com/" target="_blank" rel="noreferrer">USCRPL</a> and <a href="https://www.skywarder.eu/blog/" target="_blank" rel="noreferrer">Skyward Experimental Rocketry</a>, a group of friends started designing an experimental sounding rocket.</Event>
                <Event year={2022} month={6} ch={41} title="Team approval and start of Project Cavour">On June 7th 2022, Politecnico di Torino officially approved the Team, which started working on <a href="/projects/Cavour">Project Cavour</a>.</Event>
                <Event year={2023} month={1} ch={51} title="Start of Project Efesto">After the first general recruitment, <a href="/projects/Efesto">Project Efesto</a> was started to research and develop a Liquid Rocket Engine for the Team's rockets.</Event>
                <Event year={2023} month={4} ch={38} title="Cavour launch">Planned test launch of the Team's first rocket: <a href="/projects/Cavour">Cavour</a>.</Event>
                <Event year={2023} month={6} ch={53} title="2023 Spaceport America Cup">We will represent Politecnico and Italy as the first Italian team at the <a href="https://spaceportamericacup.com/" target="_blank" rel="noreferrer">Spaceport America Cup</a>, the largest intercollegiate rocketry competition on the planet.</Event>
            </div>
        </div>
    </section>
    <section aria-labelledby="contact-title">
        <h2 id="contact-title">Get in touch</h2>
        <div class="blur-behind">
            <p>We are eager to get in touch with you! Whether you want to join us, become our partner, or simply know something more about us, feel free to write us an email: <a href="mailto:info@politorocketteam.it">info@politorocketteam.it</a></p>
            <p>We are also on Instagram, LinkedIn, and Twitter: just one direct message away.</p>
            <div class="socials">
                <a href="https://instagram.com/politorocketteam?igshid=YmMyMTA2M2Y=" target="_blank" rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                        <title>Instagram</title>
                        <radialGradient id="insta-grad-1" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#fd5"></stop>
                            <stop offset=".328" stop-color="#ff543f"></stop>
                            <stop offset=".348" stop-color="#fc5245"></stop>
                            <stop offset=".504" stop-color="#e64771"></stop>
                            <stop offset=".643" stop-color="#d53e91"></stop>
                            <stop offset=".761" stop-color="#cc39a4"></stop>
                            <stop offset=".841" stop-color="#c837ab"></stop>
                        </radialGradient>
                        <path fill="url(#insta-grad-1)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path>
                        <radialGradient id="insta-grad-2" cx="11.786" cy="5.54" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#4168c9"></stop>
                            <stop offset=".999" stop-color="#4168c9" stop-opacity="0"></stop>
                        </radialGradient>
                        <path fill="url(#insta-grad-2)" d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"></path>
                        <path fill="#fff" d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"></path>
                        <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
                        <path fill="#fff" d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"></path>
                    </svg>
                </a>
                <a href="https://www.linkedin.com/company/politorocketteam" target="_blank" rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                        <title>Linkedin</title>
                        <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path>
                        <path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
                    </svg>
                </a>
                <a href="https://twitter.com/PoliTo_RT" target="_blank" rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                        <title>Twitter</title>
                        <path fill="#03A9F4" d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
                    </svg>
                </a>
            </div>
        </div>
    </section>
</main>

<style lang="scss">
    .scene-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: var(--accent-fig);
        clip-path: inset(0 calc(100% * (1 - var(--p,0))) 0 0);
    }
    canvas {
        z-index: 0;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    header, main {
        z-index: 1;
    }
    header {
        height: min(100vh, var(--h));
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

    main {
        max-width: 50rem;
        margin: 0 auto;
        padding: var(--pad);
    }
    .split,
    main p + p {
        margin-top: 1rem;
    }
    $sec-space: 0.9rem;
    .blur-behind {position: relative;}
    .blur-behind::before {
        content: '';
        z-index: -1;
        position: absolute;
        inset: -$sec-space;
        width: calc(100% + 2*$sec-space);
        height: calc(100% + 2*$sec-space);
        background-color: rgba(var(--bg-0-rgb), 0.6);
        // box-shadow: 0 0 1rem rgba(var(--bg-0-rgb), 1);
        // backdrop-filter: blur(2px);
        filter: blur(1rem);
        border-radius: 1.5*$sec-space;
    }
    .btns {
        display: flex;
        flex-wrap: wrap;
    }
    a.btn {
        display: block;
        padding: .4em .7em;
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

    .with-flyer {
        display: grid;
        column-gap: 2ch;
        row-gap: 1rem;
    }
    .flyer img { 
        display: block;
        border-radius: .6rem;
    }
    ul.center {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    ul li + li {
        margin-top: 0.75rem;
    }
    .semi-bold {
        font-weight: 500;
    }
    .low {
        color: rgba(var(--fg-1-rgb), 0.85);
        font-style: italic;
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

    $point-radius: .75rem;
    $extreme-radius: .5rem;

    .timeline {
        display: grid;
        grid-template-columns: 2*$point-radius 1fr;
        column-gap: 1rem;
    }
    %extreme {
        content: '';
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
            height: calc(100% - 2*$point-radius);
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
    .socials {
        display: flex;
        justify-content: center;
        margin-top: 1rem;

        a + a { margin-left: 2ch; }

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
        .split > * {
            margin-bottom: 1rem;
        }
        .flyer {
            justify-self: center;
        }
    }
    @media (min-width: 50rem) {
        main {
            padding: 0;
        }
        img.float {
            float: right;
            max-width: 45%;
            margin-bottom: 1ch;
            margin-left: 1ch;
        }
        .timeline {
            padding-left: .5ch;
            // column-gap: max(1rem, 3vw);
        }
        .with-flyer {
            display: grid;
            grid-template-columns: 1fr auto;
            column-gap: 2ch;
        }
        .split {
            column-count: 2;
            column-gap: 4rem;
            column-rule: 2px dashed #8888;
            margin-top: 2.5rem;
        }
        .split > * {
            break-inside: avoid;
        }
    }
</style>