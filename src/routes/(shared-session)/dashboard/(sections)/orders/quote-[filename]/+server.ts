// experimental file handler
import { error, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, locals }) => {
    const { filename } = params;
    if (!filename)
        throw error(400, {
            message: "Missing filename",
            details: "To retrieve a quote, you must specify its filename",
        });

    const res = await locals.supabase.storage.from("quotes").download(filename);

    if (res.error)
        throw error(404, {
            message: "Quote not found",
            details: "The filename of the quote you specified does not exists",
        });

    const fileBuffer = await res.data.arrayBuffer();
    const fileType = res.data.type;

    return new Response(new Uint8Array(fileBuffer), {
        status: 200,
        headers: {
            "Content-Type": fileType,
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    });
};
