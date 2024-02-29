import type { Session } from "@supabase/supabase-js";

export * from "./types";
export * from "./config";

export function session2user(s: Session) {
    return {
        id: s.user.id,
        email: s.user.email,
        phone: s.user.phone,
        metadata: s.user.user_metadata,
    };
}

export interface PersonData {
    id: number;
    first_name: string;
    last_name: string;
    linkedin: string | null;
    has_pp: boolean;
    is_president: boolean;
    lead_of: Array<{
        id: number;
        code: string;
        name: string;
        acting: boolean;
    }>;
    chief_of: null | {
        id: number;
        code: string;
        name: string;
        title: string;
    };
}
