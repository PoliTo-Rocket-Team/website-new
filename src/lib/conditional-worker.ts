interface Connection<H, W> {
  toWorker(data: W): void;
  toHost(data: H): void;
  msgs: W[];
}

export type Poster<T> = (data: T, transfer?: globalThis.Transferable[]) => void;
export type Listener<R, S> = (
  data: R,
  post: Poster<S>,
  isWorker: boolean,
) => void;
export interface WorkerLike<T> {
  post: Poster<T>;
  isWorker: boolean;
}

export function createWorker<Send = any, Receive = any>(
  condition: boolean,
  url: string | URL,
  listener?: Listener<Receive, Send>,
): WorkerLike<Send> {
  if (condition) {
    try {
      const worker = new Worker(url, { type: "module" });
      //@ts-ignore
      const post: Poster<Send> = (data, transfer) =>
        worker.postMessage(data, transfer);
      if (listener) worker.onmessage = (ev) => listener(ev.data, post, true);
      return { post, isWorker: true };
    } catch {}
  }
  const id = "worker-" + Math.random().toString(36).slice(2);
  const script = document.createElement("script");
  script.src = typeof url === "string" ? url : url.href;
  script.dataset.id = id;
  script.async = true;

  const post: Poster<Send> = (data) => connection.toWorker(data);
  var connection: Connection<Receive, Send> = {
    msgs: [],
    toWorker(data) {
      this.msgs.push(data);
    },
    toHost: listener ? (data) => listener(data, post, false) : () => {},
  };
  Object.assign(window, { [id]: connection });
  document.head.appendChild(script);

  return { post, isWorker: false };
}

export function getWorker<Send = any, Receive = any>(
  listener: Listener<Receive, Send>,
): WorkerLike<Send> {
  if (typeof window === "object") {
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
      }, 1);
      return { post, isWorker: false };
    } catch (err) {
      // console.log(err);
      throw Error("Unable to get worker");
    }
  } else {
    //@ts-ignore
    const post: Poster<Send> = (data, transfer) =>
      self.postMessage(data, transfer);
    self.onmessage = (ev) => listener(ev.data, post, true);
    return { post, isWorker: true };
  }
}

type CanvasMessageMap = Record<string | number, any>;
export type CanvasPoster<M extends CanvasMessageMap> = <T extends keyof M>(
  type: T,
  data: M[T],
  transfer?: Transferable[],
) => void;
type ReceiveCallbacks<M extends CanvasMessageMap> = {
  [T in keyof M]?: (data: M[T]) => void;
};
interface CanvasConnection<
  W extends CanvasMessageMap,
  H extends CanvasMessageMap,
> {
  toWorker: CanvasPoster<W>;
  toHost: CanvasPoster<H> | undefined;
  msgs: [keyof W, W[keyof W]][];
}
export interface CanvasData<O extends boolean> {
  canvas: O extends true
    ? HTMLCanvasElement | OffscreenCanvas
    : HTMLCanvasElement;
  width: number;
  height: number;
  pixelRatio: number;
}

export function alleviateCanvas<
  Send extends CanvasMessageMap,
  Receive extends CanvasMessageMap = CanvasMessageMap,
>(
  data: HTMLCanvasElement | CanvasData<false>,
  url: string | URL,
  listeners?: ReceiveCallbacks<Receive>,
): CanvasPoster<Send> {
  if (data instanceof HTMLElement) {
    const newData: CanvasData<false> = {
      canvas: data,
      pixelRatio: window.devicePixelRatio,
      width: data.clientWidth,
      height: data.clientHeight,
    };
    data = newData;
  }

  const supported = !!data.canvas.transferControlToOffscreen;
  if (supported) {
    try {
      const worker = new Worker(url, { type: "module" });
      const c = data.canvas.transferControlToOffscreen();
      //@ts-ignore
      data.canvas = c;
      worker.postMessage(["_start_", data], [c]);
      if (listeners)
        worker.onmessage = (ev) => {
          const [type, data] = ev.data;
          const fn = listeners[type];
          fn && fn(data);
        };
      //@ts-ignore
      return (type, data, transfer) =>
        worker.postMessage([type, data], transfer);
    } catch {
      console.warn(
        `Could not load worker at ${typeof url === "string" ? url : url.href}`,
      );
    }
  }
  const id = "worker-" + Math.random().toString(36).slice(2);
  const script = document.createElement("script");
  script.src = typeof url === "string" ? url : url.href;
  script.dataset.id = id;
  script.async = true;

  const connection: CanvasConnection<Send, Receive> = {
    msgs: [],
    toWorker(type, data) {
      this.msgs.push([type, data]);
    },
    toHost:
      listeners &&
      ((type, data) => {
        const fn = listeners[type];
        fn && fn(data);
      }),
  };
  Object.assign(window, { [id]: connection });
  document.head.appendChild(script);
  return (type, data) => connection.toWorker(type, data);
}

export function getCanvasWorker<
  Send extends CanvasMessageMap,
  Receive extends CanvasMessageMap = CanvasMessageMap,
>(
  start: (data: CanvasData<true>) => void,
  listeners: ReceiveCallbacks<Receive>,
): CanvasPoster<Send> {
  if (typeof window === "object") {
    try {
      const id = document.currentScript!.dataset.id!;
      //@ts-ignore
      const connection: CanvasConnection<Receive, Send> = window[id];
      //@ts-ignore
      delete window[id];

      const cb: CanvasPoster<Receive> = (type, data) => {
        if (type === "_start_") return start(data);
        const fn = listeners[type];
        fn && fn(data);
      };
      setTimeout(() => {
        connection.msgs.forEach((v) => cb(v[0], v[1]));
        connection.msgs.length = 0;
      }, 1);
      connection.toWorker = cb;
      return connection.toHost || (() => {});
    } catch (err) {
      // console.log(err);
      throw Error("Unable to get worker");
    }
  } else {
    self.onmessage = (ev) => {
      const [type, data] = ev.data;
      if (type === "_start_") return start(data);
      const fn = listeners[type];
      fn && fn(data);
    };
    //@ts-ignore
    return (type, data, transfer) => self.postMessage([type, data], transfer);
  }
}
