interface MessageMap {
    canvas: [canvas: OffscreenCanvas|HTMLCanvasElement, width: number, height: number, ratio: number];
    resize: [width: number, height: number],
    scroll: number;
    dark: boolean;
    load: number;
    done: null;
}

interface U<T extends keyof MessageMap> {
    type: T;
    data: MessageMap[T];
}

export type HostMessage = U<"canvas">|U<"resize">|U<"scroll">|U<"dark">;
export type WorkerMessage = U<"load">|U<"done">;