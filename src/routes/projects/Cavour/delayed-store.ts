import { writable } from "svelte/store";

export function transitional(duration: number, startsUp = false) {
    let up = startsUp;
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
    return { subscribe, set }
}