function NO_FN() {}

interface MouseTRackingOptions {
    move?(x: number, y: number, rect: DOMRect): void;
    enter?(): void;
    leave?(): void;
}

export default function trackmouse(element: Element, options: MouseTRackingOptions) {
    const onenter = options.enter || NO_FN;
    const onleave = options.leave || NO_FN;
    const onmove = options.move || NO_FN;

    element.addEventListener("mouseenter", enter);
    
    let x: number;
    let y: number;
    let req: number|null = null;

    function enter() {
        req = null;
        //@ts-ignore
        element.addEventListener("mousemove", mousemove);
        element.addEventListener("mouseleave", leave, { once: true });
        onenter();
    }
    function signal() {
        const rect = element.getBoundingClientRect();
        onmove(
            x - rect.left - window.scrollX,
            y - rect.top - window.scrollY,
            rect
        );
        req = null;
    }
    function mousemove(ev: MouseEvent) {
        x = ev.pageX;
        y = ev.pageY;
        if(req == null) req = requestAnimationFrame(signal);
    }
    function leave() {
        //@ts-ignore
        element.removeEventListener("mousemove", mousemove);
        if(req != null) cancelAnimationFrame(req);
        onleave();
    }
}