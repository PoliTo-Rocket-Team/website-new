import { frameThrottle } from "./timing"
import { writable, type Writable } from "svelte/store";

function distanceFromCenterScreen(el: HTMLElement, threshold = 0.5) {
    return Math.abs(el.offsetTop + el.offsetHeight/2 - window.scrollY - window.innerHeight*threshold); 
}

type OnFocus = (el: HTMLElement, focus: boolean) => void;

export class MiddleScreenPool {
    private children = new Set<HTMLElement>();
    private nearest: HTMLElement|null = null;
    private nearestDistance: number = +Infinity;
    private threshold: number;
    private callback: OnFocus;
    private running = false;
    readonly focusNearest: () => void;

    constructor(onFocus: OnFocus, threshold: number = 0.5) {
        this.callback = onFocus;
        this.threshold = threshold;
        this.focusNearest = frameThrottle(() => this.calcNearest());
    }
    run(flag: boolean) {
        if(this.running === flag) return; 
        this.running = flag;
        if(flag) window.addEventListener("scroll", this.focusNearest);
        else window.removeEventListener("scroll", this.focusNearest);
    }
    add(el: HTMLElement, recalc = true) {
        this.children.add(el);
        this.running && recalc && this.focusNearest();
    }
    remove(el: HTMLElement, recalc = true) {
        this.children.delete(el) && this.running && (this.nearest === el) && recalc && this.focusNearest();
    }
    clear() {
        this.children.clear();
        if(this.running) {
            this.running = false;
            window.removeEventListener("scroll", this.focusNearest);
        }
    }
    private calcNearest() {
        let dist = this.nearestDistance;
        let res = this.nearest;
        let d: number;
        for(let el of this.children) {
            d = distanceFromCenterScreen(el, this.threshold);
            if(d < dist) {
                dist = d;
                res = el;
            }
        }
        if(res !== this.nearest) {
            this.nearest !== null && this.callback(this.nearest, false);
            res !== null && this.callback(res, true);
            this.nearest = res;
            this.nearestDistance = dist;
        }
    }
}

export class visibility {
    private readonly observer: IntersectionObserver;
    private el: HTMLElement|null = null;
    readonly subscribe: Writable<boolean>["subscribe"];

    constructor(rootMargin: string, element?: HTMLElement) {
        const store = writable(false, () => {
            this.el && this.observer.observe(this.el);
            return () => this.el && this.observer.unobserve(this.el);
        });
        const set = store.set;
        this.observer = new IntersectionObserver(entries => entries.forEach(entry => set(entry.isIntersecting)), { rootMargin });
        this.subscribe = store.subscribe
        if(element) this.el = element;
    }
    observe(element: HTMLElement) {
        if(this.el === null) this.el = element;
        else if(this.el !== element) throw Error("Visibility store already observes an element");
    }
}

export function whenVisible(rootMargin: string, element: HTMLElement, callback: (visible: boolean) => void) {
    const obs = new IntersectionObserver(entries => entries.forEach(entry => callback(entry.isIntersecting)), { rootMargin });
    obs.observe(element);
    return {
        destroy() {
            obs.unobserve(element);
        }
    }
}
