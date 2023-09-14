export interface Alumni {
    name: string;
    img: string;
    linkedin: string;
    description: string;
}

export interface Position extends Alumni {
    start: number;
}

export interface Notable extends Alumni {
    year: number;
}

export const leaders: Position[] = [
    {
        start: Date.parse("2022-6-7"),
        name: "Fabio Meloni",
        description: "long description...",
        img: "Meloni.jpg",
        linkedin: "fabioski01"
    },{
        start: Date.parse("2023-10-2"),
        name: "Elena Dilorenzo",
        description: "long description...",
        img: "Dilorenzo.jpg",
        linkedin: "elena-dilorenzo-294b5a20b"
    }
];

export const cavour: Position[] = [
    {
        start: Date.parse("2022-6-7"),
        name: "Fabio Meloni",
        description: "long description...",
        img: "Meloni.jpg",
        linkedin: "fabioski01"
    },{
        start: Date.parse("2023-8-17"),
        name: "Edoardo Viglietti",
        description: "long description...",
        img: "Viglietti.jpg",
        linkedin: "edoardoviglietti"
    }
];

export const efesto: Position[] = [
    {
        start: Date.parse("2023-1-10"),
        name: "Matteo Crachi",
        description: "long description...",
        img: "Crachi.jpg",
        linkedin: "matteo-crachi-37a060161"
    }
];

export const scale = 1e-3/3600/24/5;
export const beginning = Date.parse("2022-6-7");
