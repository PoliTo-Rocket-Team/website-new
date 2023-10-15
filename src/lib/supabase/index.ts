import type { Session } from "@supabase/supabase-js";

export * from "./types";
export * from "./config";

export function session2user(s: Session) {
    return ({
        id: s.user.id,
        email: s.user.email,
        phone: s.user.phone,
        metadata: s.user.user_metadata
    });
}