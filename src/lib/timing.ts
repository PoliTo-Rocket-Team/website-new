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