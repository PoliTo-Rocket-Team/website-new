export function fiximg(this: HTMLImageElement) {
    const seed = this.dataset.seed;
    this.src = "https://api.dicebear.com/7.x/micah/svg?backgroundColor=transparent&seed="+seed;
}

const space = /\s/;
export function getEmailOf(first: string, last: string) {
    return `${first.toLowerCase().replace(space,'')}.${last.toLowerCase().replace(space,'')}@politorocketteam.it`;
}