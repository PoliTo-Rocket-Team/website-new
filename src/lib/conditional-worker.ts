interface Connection<H, W> {
    toWorker(data: W): void;
    toHost(data: H): void;
    msgs: W[];
}

export type Poster<T> = (data: T, transfer?: globalThis.Transferable[]) => void;
export type Listener<R, S> = (data: R, post: Poster<S>, isWorker: boolean) => void;
export interface WorkerLike<T> {
    post: Poster<T>;
    isWorker: boolean;
}

export function createWorker<Send = any, Receive = any>(condition: boolean, url: string|URL, listener?: Listener<Receive, Send>): WorkerLike<Send> {
    if(condition) {
        try {
            const worker = new Worker(url, {type: "module"});
            //@ts-ignore
            const post: Poster<Send> = (data, transfer) => worker.postMessage(data, transfer);
            if(listener) worker.onmessage = (ev) => listener(ev.data, post, true);
            return { post, isWorker: true };
        }
        catch {}
    }
    const id = "worker-"+Math.random().toString(36).slice(2);
    const script = document.createElement("script");
    script.src = typeof url === "string" ? url : url.href;
    script.dataset.id = id;
    script.async = true;
    
    const post: Poster<Send> = (data) => connection.toWorker(data);
    var connection: Connection<Receive, Send> = {
        msgs: [],
        toWorker(data) { this.msgs.push(data); },
        toHost: listener ? data => listener(data, post, false) : ()=>{},
    }
    Object.assign(window, {[id]: connection});
    document.head.appendChild(script);

    return { post, isWorker: false };
}

export function getWorker<Send = any, Receive = any>(listener: Listener<Receive, Send>): WorkerLike<Send> {
    if(typeof window === "object") {
        try {
            const id = document.currentScript!.dataset.id!;
            //@ts-ignore
            const connection: Connection<Send, Receive> = window[id];
            //@ts-ignore
            delete window[id];
            
            const post = connection.toHost;
            const fn = (data: Receive) => listener(data, post, false);
            connection.toWorker = fn;
            setTimeout(() => {
                connection.msgs.forEach(fn);
                connection.msgs.length = 0;
            }, 1)
            return { post, isWorker: false };
        }
        catch(err) {
            // console.log(err);
            throw Error("Unable to get worker");
        }
    } else {
        //@ts-ignore
        const post: Poster<Send> = (data, transfer) => self.postMessage(data, transfer);
        self.onmessage = (ev) => listener(ev.data, post, true);
        return { post, isWorker: true };
    }
}