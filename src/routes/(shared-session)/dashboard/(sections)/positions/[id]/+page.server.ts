import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import type { position } from "$lib/components/apply-page/positionType";

export const load: PageServerLoad = async ({ params, locals }) => {
  const division = await locals.supabase
    .from("divisions")
    .select("*, subteam(*)")
    .eq("id", params.id);
  const positions = await locals.supabase
    .from("positions")
    .select()
    .eq("division", params.id);
  let positionsData: position[] = positions.data;

  return {
    positions: positionsData,
    // division: division.data[0],
  };
};

export const actions: Actions = {
  newPosition: async ({ request, locals, params }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const number = formData.get("number");
    let endDate = formData.get("endDate");
    const description = formData.get("description");
    let required = formData.get("required");
    let desirable = formData.get("desirable");
    const separator = formData.get("separator");
    const formLink = formData.get("formLink");

    if (desirable === "") desirable = [];
    else desirable = desirable.split(separator);
    if (required === "") required = [];
    else required = required.split(separator);

    if (endDate === "") endDate = null;

    const dbRespose = await locals.supabase.from("positions").insert({
      division: params.id,
      number: number,
      name: name,
      description: description,
      required: required,
      desirable: desirable,
      close_at: endDate,
      form: formLink,
    });
    if (dbRespose.error) {
      let error: Record<string, any> = {};
      console.log(dbRespose);

      if (
        dbRespose.status === 409 &&
        dbRespose.error.message.includes(
          'duplicate key value violates unique constraint "unique_position_code"'
        )
      ) {
        error.number = { message: "Position number already exists" };
      }

      if (
        dbRespose.status === 400 &&
        dbRespose.error.message.includes("positions_descripti")
      ) {
        error.description = { message: "Description is not acceptable" };
      }

      if (!error?.description || !error?.number) {
        error.unknown = { message: dbRespose.error.message };
      }

      const data = { error };

      return fail(400, {
        message: "Error creating position",
        problem: true,
        data,
      });
    }

    return {
      success: true,
    };
  },

  edit: async ({ request, locals, params }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const number = formData.get("number");
    let endDate = formData.get("endDate");
    const description = formData.get("description");
    let required = formData.get("required");
    let desirable = formData.get("desirable");
    const separator = formData.get("separator");
    const formLink = formData.get("formLink");
    const id = formData.get("posid");

    if (desirable === "") desirable = [];
    else desirable = desirable.split(separator);
    if (required === "") required = [];
    else required = required.split(separator);

    if (endDate === "") endDate = null;

    const dbRespose = await locals.supabase
      .from("positions")
      .update({
        division: params.id,
        number: number,
        name: name,
        description: description,
        required: required,
        desirable: desirable,
        close_at: endDate,
        form: formLink,
      })
      .eq("id", id);
    if (dbRespose.error) {
      let error: Record<string, any> = {};
      console.log(dbRespose);

      error.unknown = { message: dbRespose.error.message };
      const data = { error };

      return fail(400, {
        message: "Error editing position",
        problem: true,
        data,
      });
    }

    return {
      success: true,
    };
  },
};
