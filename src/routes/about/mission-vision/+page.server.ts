// import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

interface Word {
    parola: string;
    traduzione: string;
    descrizione: string; 
}

export const load = (async ({ fetch }) => {
    const res = await fetch("https://perinaldese.federicoguglielmi.it/api/dizionario/parola/caudu");
    const words: Word[] = await res.json();
    return words[0];
}) satisfies PageServerLoad;