// experimental file handler
import type { RequestHandler } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const GET: RequestHandler = async ({ params }) => {
    const { filename } = params;

    const { data, error } = await supabase
        .storage
        .from('quotes')
        .download(filename);

    if (error) {
        return {
            status: 404,
            body: 'File not found'
        };
    }

    const fileBuffer = await data.arrayBuffer();
    const fileType = data.type;

    return {
        status: 200,
        headers: {
            'Content-Type': fileType,
            'Content-Disposition': `attachment; filename="${filename}"`
        },
        body: new Uint8Array(fileBuffer)
    };
};