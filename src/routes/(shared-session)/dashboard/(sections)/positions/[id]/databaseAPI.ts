export const addPosition = async (value, supabase) => {
    const {
        division,
        name,
        number,
        description,
        requiredSkills,
        desirableSkills,
        open,
        formLink,
    } = value;
    const dbRespose = await supabase.from("positions").insert({
        division: division,
        number: number,
        name: name,
        description: description,
        required: requiredSkills,
        desirable: desirableSkills,
        open: open,
        form: formLink,
    });

    return dbRespose;
};

export const getPositions = async (supabase, id) => {
    const positions = await supabase
        .from("positions")
        .select()
        .eq("division", id);
    return positions;
};

export const editPosition = async (value, supabase) => {
    const {
        id,
        division,
        name,
        number,
        description,
        requiredSkills,
        desirableSkills,
        open,
        formLink,
    } = value;
    const dbRespose = await supabase
        .from("positions")
        .update({
            division: division,
            number: number,
            name: name,
            description: description,
            required: requiredSkills,
            desirable: desirableSkills,
            open: open,
            form: formLink,
        })
        .eq("id", id);

    return dbRespose;
};

export const deletePosition = async (id, supabase) => {
    const dbRespose = await supabase.from("positions").delete().eq("id", id);

    return dbRespose;
};
