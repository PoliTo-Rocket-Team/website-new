import { writable } from "svelte/store";

export function wait(ms: number) { return new Promise<void>(res => setTimeout(res,ms)) }

export function throttle( ms: number, fn: () => any) {
    let will_call = false;
    return function() {
        if(will_call) return;
        will_call = true;
        setTimeout(() => { fn(); will_call = false }, ms);
    }
}

export function frameThrottle(fn: () => any) {
    let req: number|null;
    function onFrame() { fn(); req=null; }
    return function() {
        if(req) return;
        req = requestAnimationFrame(onFrame);
    }
}

export function transitional(duration: number, initial = false) {
    let up = initial;
    let start = 0;
    let position = (+up)*duration;
    let request: number | null = null;
    const { subscribe, set: _set } = writable<-2|-1|1|2>(4*(+up)-2 as -2|2);
    function onend() {
        _set(4*(+up)-2 as -2|2);
        position = (+up) * duration;
        request = null;
    }
    function set(completed: boolean) {
        if(completed === up) return;
        if(request) {
            clearTimeout(request);
            const elapsed = performance.now() - start;
            const c = 2*(+up) - 1;
            position += c*elapsed;
        }
        up = !up;
        const ms = up ? (duration - position) : position;
        if(ms <= 0) return onend();
        _set(2*(+up)-1 as -1|1);
        start = performance.now();
        request = window.setTimeout(onend, ms);
    }
    function dur(ms: number) {
        if(duration === ms) return;
        duration = ms;
        if(request) {
            clearTimeout(request);
            const now = performance.now();
            const elapsed = now - start;
            start = now;
            const c = 2*(+up) - 1;
            position += c*elapsed;
            const ms = up ? (duration - position) : position;
            if(ms <= 0) return onend();
            start = window.setTimeout(onend, ms);
        }
    }
    return { subscribe, set, dur }
}