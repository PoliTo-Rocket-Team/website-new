import { spring } from "svelte/motion";

function NO_FN() {}

interface MouseTRackingOptions<T extends HTMLElement> {
    move?(this: T, x: number, y: number, rect: DOMRect): void;
    enter?(this: T): void;
    leave?(this: T): void;
}

export function trackmouse<E extends HTMLElement>(
    element: E,
    options: MouseTRackingOptions<E>
) {
    const onenter = options.enter || NO_FN;
    const onleave = options.leave || NO_FN;
    const onmove = options.move || NO_FN;

    element.addEventListener("mouseenter", enter);

    let x: number;
    let y: number;
    let req: number | null = null;

    function enter() {
        req = null;
        element.addEventListener("mousemove", mousemove);
        element.addEventListener("mouseleave", leave, { once: true });
        onenter.call(element);
    }
    function signal() {
        const rect = element.getBoundingClientRect();
        onmove.call(
            element,
            x - rect.left - window.scrollX,
            y - rect.top - window.scrollY,
            rect
        );
        req = null;
    }
    function mousemove(ev: MouseEvent) {
        x = ev.pageX;
        y = ev.pageY;
        if (req == null) req = requestAnimationFrame(signal);
    }
    function leave() {
        element.removeEventListener("mousemove", mousemove);
        if (req != null) cancelAnimationFrame(req);
        onleave.call(element);
    }
}

interface SpringOptions {
    stiffness?: number;
    damping?: number;
    precision?: number;
}

export function springytrack(element: HTMLElement, options: SpringOptions) {
    const x = spring(0, options);
    const y = spring(0, options);
    trackmouse(element, {
        leave() {
            x.set(0);
            y.set(0);
        },
        move(_x, _y, rect) {
            x.set((2 * _x) / rect.width - 1);
            y.set((2 * _y) / rect.height - 1);
        },
    });
    const ux = x.subscribe(v => element.style.setProperty("--x", v.toFixed(5)));
    const uy = y.subscribe(v => element.style.setProperty("--y", v.toFixed(5)));
    return {
        destroy() {
            ux();
            uy();
        },
    };
}
