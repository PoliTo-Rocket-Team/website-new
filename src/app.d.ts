import type { SupabaseClient, Session } from "@supabase/supabase-js"

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	declare namespace App {
		interface Error {
			message: string;
			details: string;
		}
		interface Locals {
			supabase: SupabaseClient;
			session: Session|null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}
