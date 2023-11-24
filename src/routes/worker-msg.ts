export interface HostMessageMap {
    resize: [width: number, height: number, ratio: number];
    scroll: number;
    dark: boolean;
}

export interface WorkerMessageMap {
    load: number;
    done: void;
}
