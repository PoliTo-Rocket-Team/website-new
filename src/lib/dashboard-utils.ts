import { writable, type Readable } from "svelte/store";

export function fiximg(this: HTMLImageElement) {
    const seed = this.dataset.seed;
    this.src = "https://api.dicebear.com/7.x/micah/svg?backgroundColor=transparent&seed="+seed;
}

const space = /\s/;
export function getEmailOf(first: string, last: string) {
    return `${first.toLowerCase().replace(space,'')}.${last.toLowerCase().replace(space,'')}@politorocketteam.it`;
}

export interface PictureStore extends Readable<string> {
    refresh(): void;
}

export function createPictureStore(url: string): PictureStore {
    const { set, subscribe } = writable(url+"?t="+Date.now());
    return {
        subscribe,
        refresh() {
            set(url+"?t="+Date.now());
        }
    }
}
